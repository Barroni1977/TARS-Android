import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {TarsBrandMark} from '../../../components/TarsBrandMark/TarsBrandMark';
import {useTheme} from '../../../hooks';
import {ROUTES} from '../../../utils/navigationConstants';
import {createStyles} from './styles';

const SPLASH_MIN_DWELL_MS = 600;

/**
 * Brand splash — post-hydration, pre-Onboarding-1. Renders the
 * original TARS AI alloy icon then transitions after
 * `SPLASH_MIN_DWELL_MS`.
 */
export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const styles = createStyles(theme);

  React.useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace(ROUTES.ONBOARDING.STEP_1);
    }, SPLASH_MIN_DWELL_MS);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View testID="onboarding-splash" style={styles.root}>
      <TarsBrandMark size={112} />
    </View>
  );
};
