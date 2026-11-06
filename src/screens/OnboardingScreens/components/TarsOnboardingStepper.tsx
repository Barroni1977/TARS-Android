import React from 'react';
import {I18nManager, StyleSheet, View} from 'react-native';

/** TARS amber-on-metal onboarding progress; IDs match the E2E contract. */
export const TarsOnboardingStepper: React.FC<{current: number}> = ({
  current,
}) => (
  <View
    testID="ui-stepper"
    accessibilityRole="progressbar"
    accessibilityLabel={`Step ${current} of 4`}
    accessibilityValue={{min: 1, max: 4, now: current}}
    style={[styles.root, I18nManager.isRTL && styles.rtl]}>
    {[1, 2, 3, 4].map(n => (
      <View
        key={n}
        testID={`ui-stepper-dot-${n}`}
        style={[
          styles.segment,
          n === current ? styles.active : styles.inactive,
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rtl: {
    flexDirection: 'row-reverse',
  },
  segment: {
    height: 4,
    borderRadius: 2,
  },
  active: {
    width: 42,
    backgroundColor: '#FFB140',
  },
  inactive: {
    width: 19,
    backgroundColor: '#344343',
  },
});
