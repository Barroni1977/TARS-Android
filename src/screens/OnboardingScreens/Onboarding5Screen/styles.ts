import {StyleSheet} from 'react-native';
import type {Theme} from '../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      width: '100%',
      maxWidth: 350,
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    title: {
      fontFamily: 'JetBrainsMono-Medium',
      fontSize: 22,
      lineHeight: 29,
      color: '#4AE6A6',
      letterSpacing: 0.8,
      textAlign: 'center',
    },
    body: {
      fontFamily: 'Inter-Regular',
      fontSize: 15,
      lineHeight: 23,
      color: '#B3C3BF',
      textAlign: 'center',
    },
  });
