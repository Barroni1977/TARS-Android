import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

/**
 * Original modular alloy emblem for TARS AI.
 *
 * Uses native views instead of movie artwork or downloaded image assets.
 * Scales cleanly on high-density Android screens and works without a network.
 */
export const TarsBrandMark: React.FC<{size?: number}> = ({size = 96}) => (
  <View
    accessibilityRole="image"
    accessibilityLabel="TARS AI modular emblem"
    style={[styles.root, {width: size, height: size}]}>
    <View style={styles.outerRail} />
    <View style={styles.innerFrame}>
      <View style={styles.topPanels}>
        <View style={styles.topPanel} />
        <View style={styles.topPanel} />
      </View>
      <View style={styles.display}>
        <View style={styles.displaySignal} />
        <Text style={styles.markText} adjustsFontSizeToFit numberOfLines={1}>
          TARS
        </Text>
      </View>
      <View style={styles.lowerPanels}>
        <View style={styles.lowerPanel} />
        <View style={styles.lowerPanel} />
      </View>
    </View>
    <View style={styles.outerRail} />
  </View>
);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 4,
    borderWidth: 1,
    borderColor: '#536066',
    backgroundColor: '#080B0D',
    padding: 5,
  },
  outerRail: {
    width: '17%',
    backgroundColor: '#293237',
    borderLeftWidth: 2,
    borderLeftColor: '#667175',
    borderRightWidth: 1,
    borderRightColor: '#11191B',
  },
  innerFrame: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 4,
  },
  topPanels: {
    flexDirection: 'row',
    flex: 1,
    gap: 3,
  },
  topPanel: {
    flex: 1,
    backgroundColor: '#3A464B',
    borderTopWidth: 2,
    borderTopColor: '#798084',
  },
  display: {
    minHeight: '31%',
    paddingHorizontal: 3,
    backgroundColor: '#101E20',
    borderWidth: 1,
    borderColor: '#52615B',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  displaySignal: {
    height: 2,
    width: '80%',
    backgroundColor: '#8FDCB2',
  },
  markText: {
    color: '#F4AF5E',
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 1,
  },
  lowerPanels: {
    flex: 1,
    flexDirection: 'row',
    gap: 3,
  },
  lowerPanel: {
    flex: 1,
    backgroundColor: '#293337',
    borderTopWidth: 2,
    borderTopColor: '#5B676B',
  },
});
