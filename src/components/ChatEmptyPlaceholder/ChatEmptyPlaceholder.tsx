import React, {useContext} from 'react';
import {Animated, Easing, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {observer} from 'mobx-react';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {useTheme} from '../../hooks';
import {createStyles} from './styles';
import {modelStore, palStore} from '../../store';
import {L10nContext} from '../../utils';
import {TarsBrandMark} from '../TarsBrandMark/TarsBrandMark';
import {useTarsReducedMotion} from '../../hooks/useTarsReducedMotion';

interface ChatEmptyPlaceholderProps {
  onSelectModel: () => void;
  bottomComponentHeight: number;
}

/**
 * TARS command deck. This is the empty chat's real interactive state, not
 * another splash screen. It never covers an ongoing conversation.
 *
 * Only modelStore-derived statuses are shown; the display does not fabricate
 * CPU, microphone, network or inference telemetry.
 */
export const ChatEmptyPlaceholder = observer(
  ({onSelectModel, bottomComponentHeight}: ChatEmptyPlaceholderProps) => {
    const theme = useTheme();
    const navigation = useNavigation<NavigationProp<any>>();
    const l10n = useContext(L10nContext);
    const styles = createStyles({theme});

    const hasAvailableModels = modelStore.availableModels.length > 0;
    const hasActiveModel = modelStore.activeModelId !== undefined;
    const activeModelName = modelStore.activeModel?.name;

    const pendingPalDownload = modelStore.activeDownloads
      .map(download =>
        palStore.pals.find(
          pal =>
            pal.source === 'local' &&
            pal.defaultModel &&
            pal.defaultModel.id === download.modelId,
        ),
      )
      .find(pal => pal !== undefined);

    const getContent = () => {
      if (pendingPalDownload && !hasActiveModel) {
        return {
          description:
            l10n.components.chatEmptyPlaceholder.gettingReadyDescription ??
            'Your model is downloading. Check the banner above for progress.',
          buttonText: null,
          onPress: () => {},
        };
      }

      if (!hasAvailableModels) {
        return {
          description: l10n.components.chatEmptyPlaceholder.noModelsDescription,
          buttonText: l10n.components.chatEmptyPlaceholder.noModelsButton,
          onPress: () => navigation.navigate('Models'),
        };
      }

      return {
        description:
          l10n.components.chatEmptyPlaceholder.activateModelDescription,
        buttonText: l10n.components.chatEmptyPlaceholder.activateModelButton,
        onPress: onSelectModel,
      };
    };

    const {description, buttonText, onPress} = getContent();
    const isLoading = modelStore.isContextLoading;
    const reducedMotion = useTarsReducedMotion();
    const reveal = React.useRef(new Animated.Value(0)).current;
    const rise = React.useRef(new Animated.Value(12)).current;
    const corePulse = React.useRef(new Animated.Value(1)).current;

    // A short entrance gives the command deck a real interface transition,
    // without animating messages, controls or the local inference process.
    React.useEffect(() => {
      if (reducedMotion) {
        reveal.setValue(1);
        rise.setValue(0);
        return;
      }
      const entrance = Animated.parallel([
        Animated.timing(reveal, {
          toValue: 1,
          duration: 550,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rise, {
          toValue: 0,
          duration: 550,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]);
      entrance.start();
      return () => entrance.stop();
    }, [reducedMotion, reveal, rise]);

    // Pulse only while the real local model context is loading.
    React.useEffect(() => {
      corePulse.stopAnimation();
      if (reducedMotion || !isLoading) {
        corePulse.setValue(1);
        return;
      }
      const activity = Animated.loop(
        Animated.sequence([
          Animated.timing(corePulse, {
            toValue: 0.4,
            duration: 450,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(corePulse, {
            toValue: 1,
            duration: 450,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      );
      activity.start();
      return () => activity.stop();
    }, [isLoading, reducedMotion, corePulse]);

    const selected = hasActiveModel && !isLoading;
    const status = isLoading
      ? 'INITIALISING LOCAL CORE'
      : hasActiveModel
        ? 'MODEL SELECTED'
        : pendingPalDownload
          ? 'MODEL DOWNLOAD IN PROGRESS'
          : 'AWAITING LOCAL MODEL';

    return (
      <View
        testID="tars-command-deck"
        style={[styles.container, {marginBottom: bottomComponentHeight + 24}]}>
        <Animated.View
          style={[
            styles.console,
            {opacity: reveal, transform: [{translateY: rise}]},
          ]}>
          <View style={styles.topLine}>
            <Text style={styles.eyebrow}>TARS AI / COMMAND DECK</Text>
            <View style={styles.revisionTag}>
              <Text style={styles.revisionText}>01 / CORE</Text>
            </View>
          </View>

          <View style={styles.brandRow}>
            <TarsBrandMark size={84} />
            <View style={styles.brandTitle}>
              <Text style={styles.wordmark}>TARS</Text>
              <Text style={styles.submark}>PERSONAL INTELLIGENCE</Text>
              <Text style={styles.submark}>ON-DEVICE ASSISTANT</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.moduleHeader}>
            <Text style={styles.moduleLabel}>LOCAL MODEL STATUS</Text>
            <View accessibilityLabel={status} style={styles.signalStatus}>
              <Animated.View
                testID="tars-model-signal"
                style={[
                  styles.signalDot,
                  selected ? styles.signalSelected : styles.signalAwaiting,
                  {opacity: corePulse},
                ]}
              />
              <Text style={styles.signalText}>{status}</Text>
            </View>
          </View>

          <View style={styles.modelWell}>
            <Text style={styles.modelKey}>SELECTED CORE</Text>
            <Text style={styles.modelName} numberOfLines={2}>
              {activeModelName || 'NO MODEL SELECTED'}
            </Text>
          </View>

          <View style={styles.instruction}>
            <View style={styles.instructionRail} />
            <Text style={styles.instructionText}>
              {hasActiveModel
                ? 'Your local model is selected. Enter a message below to begin.'
                : description}
            </Text>
          </View>

          <View style={styles.footerLine}>
            <Text style={styles.footerText}>LOCAL INFERENCE / GGUF</Text>
            <Text style={styles.footerText}>SYSTEM UI 01</Text>
          </View>
        </Animated.View>

        {!hasActiveModel && buttonText ? (
          <Button
            mode="contained"
            onPress={onPress}
            style={styles.button}
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            loading={isLoading}
            disabled={isLoading}>
            {isLoading
              ? l10n.components.chatEmptyPlaceholder.loading
              : buttonText}
          </Button>
        ) : null}
      </View>
    );
  },
);
