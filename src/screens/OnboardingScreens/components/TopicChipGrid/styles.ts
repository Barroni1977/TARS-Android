import {StyleSheet} from 'react-native';
import type {Theme} from '../../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      maxWidth: 354,
      gap: theme.spacing.s,
      justifyContent: 'center',
    },
    cell: {
      width: '47%',
      height: 128,
    },
    chip: {
      flex: 1,
      borderRadius: theme.radius.s,
      backgroundColor: '#152124',
      borderWidth: 1,
      borderColor: '#304641',
      paddingHorizontal: theme.spacing.s,
      paddingVertical: theme.spacing.s,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.s,
    },
    chipElse: {
      backgroundColor: 'transparent',
      borderColor: '#436A57',
    },
    chipSelected: {
      backgroundColor: '#163B31',
      borderColor: '#49DC9D',
    },
    label: {
      fontFamily: 'JetBrainsMono-Medium',
      fontSize: 13,
      lineHeight: 18,
      color: '#F1F5F4',
      textAlign: 'center',
      width: '100%',
    },
    description: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      lineHeight: 16,
      color: '#B3C3BF',
      textAlign: 'center',
      width: '100%',
    },
    textBlock: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.xs,
      width: '100%',
    },
  });
