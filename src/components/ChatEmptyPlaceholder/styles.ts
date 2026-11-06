import {StyleSheet} from 'react-native';
import {Theme} from '../../utils/types';

const METAL = '#354247';
const AMBER = '#F4AF5E';
const SIGNAL = '#8FDCB2';
const SLATE = '#A6B3B6';

export const createStyles = ({theme}: {theme: Theme}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 18,
      paddingVertical: 16,
      gap: 16,
    },
    console: {
      width: '100%',
      maxWidth: 480,
      backgroundColor: theme.dark ? '#11171B' : theme.colors.surface,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.dark ? METAL : theme.colors.outline,
      overflow: 'hidden',
      padding: 18,
      gap: 18,
    },
    topLine: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 8,
    },
    eyebrow: {
      color: AMBER,
      fontFamily: 'monospace',
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.8,
    },
    revisionTag: {
      backgroundColor: '#202A2C',
      borderWidth: 1,
      borderColor: '#485557',
      borderRadius: 2,
      paddingHorizontal: 7,
      paddingVertical: 4,
    },
    revisionText: {
      color: '#BFC8C8',
      fontSize: 10,
      fontFamily: 'monospace',
    },
    brandRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      minHeight: 98,
    },
    brandTitle: {
      flex: 1,
      gap: 6,
    },
    wordmark: {
      color: AMBER,
      fontSize: 42,
      lineHeight: 46,
      fontWeight: '900',
      letterSpacing: 4,
    },
    submark: {
      color: theme.dark ? SLATE : theme.colors.onSurfaceVariant,
      fontFamily: 'monospace',
      fontSize: 10,
      lineHeight: 15,
      letterSpacing: 0.5,
    },
    separator: {
      height: 1,
      backgroundColor: METAL,
    },
    moduleHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 9,
    },
    moduleLabel: {
      color: theme.dark ? SLATE : theme.colors.onSurfaceVariant,
      fontSize: 10,
      fontFamily: 'monospace',
      letterSpacing: 0.8,
    },
    signalStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
    },
    signalDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
    },
    signalSelected: {
      backgroundColor: SIGNAL,
    },
    signalAwaiting: {
      backgroundColor: AMBER,
    },
    signalText: {
      color: theme.dark ? '#E5EDEA' : theme.colors.onSurface,
      fontFamily: 'monospace',
      fontSize: 10,
      fontWeight: '600',
      letterSpacing: 0.4,
    },
    modelWell: {
      backgroundColor: theme.dark ? '#080B0D' : theme.colors.background,
      borderLeftWidth: 3,
      borderLeftColor: AMBER,
      paddingHorizontal: 13,
      paddingVertical: 15,
      gap: 8,
    },
    modelKey: {
      color: theme.dark ? SLATE : theme.colors.onSurfaceVariant,
      fontFamily: 'monospace',
      letterSpacing: 0.8,
      fontSize: 10,
    },
    modelName: {
      color: theme.colors.onSurface,
      fontWeight: '700',
      fontSize: 17,
      lineHeight: 24,
    },
    instruction: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'flex-start',
    },
    instructionRail: {
      width: 2,
      minHeight: 40,
      backgroundColor: '#50625F',
    },
    instructionText: {
      flex: 1,
      color: theme.dark ? '#D6DEDB' : theme.colors.onSurface,
      fontSize: 14,
      lineHeight: 21,
    },
    footerLine: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 8,
      borderTopWidth: 1,
      borderTopColor: METAL,
      paddingTop: 12,
    },
    footerText: {
      color: theme.dark ? '#839396' : theme.colors.onSurfaceVariant,
      fontFamily: 'monospace',
      fontSize: 9,
      letterSpacing: 0.6,
    },
    button: {
      minWidth: 200,
      maxWidth: 320,
      width: '100%',
      borderRadius: 4,
    },
  });
