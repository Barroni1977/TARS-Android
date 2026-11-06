import {StyleSheet} from 'react-native';
import type {Theme} from '../../../../utils/types';

const GREEN = '#4FE6A5';
const AMBER = '#E9A13D';

export const createStyles = (
  theme: Theme,
  selected: boolean,
  recommended: boolean,
) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.s,
      borderWidth: 1,
      borderColor: selected ? GREEN : recommended ? AMBER : '#354A45',
      backgroundColor: selected ? '#17372E' : '#162123',
      marginBottom: theme.spacing.s,
    },
    radio: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: selected ? GREEN : '#718882',
      backgroundColor: '#0A1516',
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: GREEN,
    },
    body: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.s,
    },
    title: {
      fontFamily: 'JetBrainsMono-Medium',
      fontSize: 14,
      color: '#F1F5F4',
    },
    subtitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    subtitle: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: '#B2C2BC',
    },
    badge: {
      paddingHorizontal: theme.spacing.s,
      paddingVertical: theme.spacing.xxs,
      borderRadius: theme.radius.xs,
      backgroundColor: AMBER,
    },
    badgeText: {
      fontFamily: 'JetBrainsMono-Medium',
      fontSize: 11,
      color: '#101515',
    },
  });
