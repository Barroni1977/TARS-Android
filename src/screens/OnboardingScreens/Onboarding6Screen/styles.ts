import {StyleSheet} from 'react-native';

import type {Theme} from '../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.m,
      width: '100%',
    },
    title: {
      fontFamily: 'JetBrainsMono-Medium',
      fontSize: 22,
      color: '#4AE6A6',
      letterSpacing: 1.2,
    },
    palBody: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      lineHeight: 20,
      color: '#BBCBC7',
      textAlign: 'center',
      maxWidth: 350,
    },
    subtitle: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      lineHeight: 20,
      color: '#BBCBC7',
      textAlign: 'center',
      marginTop: theme.spacing.s,
      marginBottom: theme.spacing.s,
    },
    options: {
      width: '100%',
      maxWidth: 350,
      alignSelf: 'center',
    },
  });
