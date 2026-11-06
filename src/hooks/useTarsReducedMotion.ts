import React from 'react';
import {AccessibilityInfo} from 'react-native';

/**
 * Respect the device's Reduce Motion preference for TARS-only decoration.
 * Inference, downloads and navigation are intentionally unaffected.
 */
export const useTarsReducedMotion = (): boolean => {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    const update = (enabled: boolean) => {
      if (mounted) {
        setReducedMotion(enabled);
      }
    };

    // Some test/native environments provide only a subset of AccessibilityInfo.
    const preference = AccessibilityInfo.isReduceMotionEnabled?.();
    preference?.then(update).catch(() => {
      // Unsupported platforms retain the ordinary motion setting.
    });

    const subscription = AccessibilityInfo.addEventListener?.(
      'reduceMotionChanged',
      update,
    );

    return () => {
      mounted = false;
      subscription?.remove();
    };
  }, []);

  return reducedMotion;
};
