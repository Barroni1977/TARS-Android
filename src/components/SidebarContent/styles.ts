import {StyleSheet} from 'react-native';

import {MD3Theme} from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    sidebarContainer: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    brandHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginHorizontal: 14,
      marginTop: 12,
      marginBottom: 15,
      padding: 10,
      backgroundColor: theme.dark ? '#11171B' : theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.dark ? '#354247' : theme.colors.outline,
      borderRadius: 5,
    },
    brandNameStack: {
      flex: 1,
      gap: 3,
    },
    brandTitle: {
      color: theme.dark ? '#F4AF5E' : theme.colors.primary,
      fontWeight: '900',
      fontSize: 21,
      letterSpacing: 2,
    },
    brandSubtitle: {
      color: theme.dark ? '#A6B3B6' : theme.colors.onSurfaceVariant,
      fontFamily: 'monospace',
      fontSize: 9,
      letterSpacing: 0.5,
    },
    brandRule: {
      height: 2,
      backgroundColor: theme.dark ? '#F4AF5E' : theme.colors.primary,
      marginHorizontal: 18,
      opacity: 0.75,
      marginBottom: 10,
    },

    divider: {
      marginHorizontal: 16,
      backgroundColor: theme.colors.onSurfaceVariant,
      height: 1,
      opacity: 0.1,
    },
    contentWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    sessionDrawerItem: {
      height: 40,
    },
    menuDrawerItem: {
      height: 44,
    },
    versionText: {
      color: theme.colors.onSurfaceVariant,
      opacity: 0.7,
      fontSize: 12,
      fontWeight: '500',
    },
    drawerSection: {
      marginTop: 10,
    },
    dateLabel: {
      paddingLeft: 16,
      paddingVertical: 10,
    },
    scrollViewContent: {
      flexGrow: 1,
      minHeight: '100%',
    },
    mainContent: {
      flex: 1,
    },
    menu: {
      width: 170,
    },
    sessionItem: {
      position: 'relative',
    },
    sessionTouchable: {
      flex: 1,
    },
    // Selection mode styles
    selectionModeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
      backgroundColor: theme.colors.surface,
    },
    selectedCountText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.onSurface,
      flex: 1,
      textAlign: 'center',
    },
    sessionItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    sessionCheckbox: {
      marginLeft: 8,
      marginRight: 4,
    },
    menuDivider: {
      marginVertical: 4,
    },
    // Header action buttons (export, delete icons)
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    headerActionButton: {
      padding: 4,
    },
    headerActionButtonDisabled: {
      opacity: 0.4,
    },
    // Select all row
    selectAllRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.surface,
    },
    selectAllCheckbox: {
      marginRight: 12,
    },
    selectAllText: {
      fontSize: 16,
      color: theme.colors.onSurface,
    },
    selectAllDivider: {
      backgroundColor: theme.colors.outline,
      opacity: 0.3,
    },
  });
