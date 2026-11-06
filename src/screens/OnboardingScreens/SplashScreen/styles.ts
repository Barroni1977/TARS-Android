import {StyleSheet} from 'react-native';

import type {Theme} from '../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      // Figma `Color/Background/Muted` (#fafafa) — maps to `colors.surfaceVariant`.
      backgroundColor: '#090F12',
      borderColor: theme.colors.surfaceVariant,
      borderWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
