import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {OnboardingBottomBar} from './OnboardingBottomBar';
import {OnboardingScaffold} from './OnboardingScaffold';
import {TarsOnboardingHero} from './TarsOnboardingHero';
import {useOnboardingHandlers} from '../useOnboardingHandlers';

type IntroStep = 1 | 2 | 3 | 4;

/**
 * TARS setup presentation only. Navigation and persistence stay with the
 * existing useOnboardingHandlers so first-run model installation is intact.
 */
export const TarsOnboardingIntro: React.FC<{step: IntroStep}> = ({step}) => {
  const {l10n, next, goBack} = useOnboardingHandlers(step);
  const t = l10n.onboarding;
  const copy = [t.screen1, t.screen2, t.screen3, t.screen4][step - 1];

  return (
    <OnboardingScaffold
      step={step}
      illustration={<TarsOnboardingHero variant={step} />}
      content={
        <View style={styles.content}>
          <Text style={styles.eyebrow}>{copy.eyebrow}</Text>
          <Text style={styles.title}>{copy.title}</Text>
          <View style={styles.rule} />
          <Text style={styles.body}>{copy.body}</Text>
        </View>
      }
      bottomBar={
        <OnboardingBottomBar
          primaryLabel={copy.cta}
          onPrimary={next}
          showBack={step !== 1}
          onBack={goBack}
          backAccessibilityLabel={t.back}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    maxWidth: 330,
    paddingHorizontal: 9,
  },
  eyebrow: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 12,
    letterSpacing: 1.3,
    color: '#43F5A1',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: '#F0F5F4',
    textAlign: 'center',
  },
  rule: {
    height: 1,
    width: 78,
    backgroundColor: '#D98D32',
  },
  body: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#B7C7C3',
    textAlign: 'center',
  },
});
