import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Variant = 1 | 2 | 3 | 4 | 'model';

const CODES: Record<
  Variant,
  {heading: string; status: string; rows: string[]}
> = {
  1: {
    heading: 'TARS // STARTUP',
    status: 'LOCAL CORE',
    rows: [
      'HUMOUR          90%',
      'HONESTY          95%',
      'SARCASM          85%',
    ],
  },
  2: {
    heading: 'TARS // OFFLINE',
    status: 'LOCAL INFERENCE',
    rows: [
      'MODEL       ON DEVICE',
      'NETWORK      OPTIONAL',
      'STATUS         STANDBY',
    ],
  },
  3: {
    heading: 'TARS // MODELS',
    status: 'CORE SELECTION',
    rows: [
      'QUICK          LIGHT',
      'BALANCED       READY',
      'BEST         CAPABLE',
    ],
  },
  4: {
    heading: 'TARS // CONTROL',
    status: 'USER CONTROL',
    rows: [
      'TEXT CHAT       LOCAL',
      'WEB TOOLS      OPT-IN',
      'MODEL DATA   ON DEVICE',
    ],
  },
  model: {
    heading: 'TARS // AI CORE',
    status: 'SELECT A MODEL',
    rows: [
      'DEVICE MEMORY   CHECK',
      'MODEL SIZE     CHECK',
      'DOWNLOAD    OPTIONAL',
    ],
  },
};

/**
 * Original vector-style TARS hardware illustration. No PocketPal mascots,
 * film art, external network resources or decorative readiness assertions.
 * It is a visual panel, not live system telemetry.
 */
export const TarsOnboardingHero: React.FC<{
  variant: Variant;
  compact?: boolean;
}> = ({variant, compact = false}) => {
  const cfg = CODES[variant];
  return (
    <View
      testID={`tars-onboarding-hero-${variant}`}
      accessibilityLabel={`TARS AI illustration: ${cfg.heading}`}
      style={[styles.outer, compact && styles.compact]}>
      <View style={styles.rail} />
      <View style={styles.inner}>
        <View style={styles.topRow}>
          <View style={styles.metalTile} />
          <View style={styles.metalTile} />
          <View style={styles.metalTile} />
        </View>
        <View style={styles.screen}>
          <View style={styles.header}>
            <Text style={[styles.micro, compact && styles.compactMicro]}>
              {cfg.heading}
            </Text>
            <View style={styles.indicator} />
          </View>
          <View style={styles.divider} />
          {cfg.rows.map(row => (
            <Text
              key={row}
              style={[styles.data, compact && styles.compactData]}
              numberOfLines={1}>
              {row}
            </Text>
          ))}
          <Text style={[styles.status, compact && styles.compactMicro]}>
            {cfg.status}
          </Text>
        </View>
        <View style={styles.brandStrip}>
          <View style={styles.amberRule} />
          <Text style={[styles.brand, compact && styles.compactBrand]}>
            TARS AI
          </Text>
          <View style={styles.amberRule} />
        </View>
        <View style={styles.lowerRow}>
          <View style={styles.metalTile} />
          <View style={styles.metalTile} />
        </View>
      </View>
      <View style={styles.rail} />
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    width: 286,
    height: 226,
    backgroundColor: '#050809',
    borderColor: '#465156',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 5,
    gap: 5,
  },
  compact: {
    width: 152,
    height: 120,
    alignSelf: 'center',
  },
  compactMicro: {
    fontSize: 5.5,
  },
  compactData: {
    fontSize: 6,
    lineHeight: 11,
  },
  compactBrand: {
    fontSize: 11,
    letterSpacing: 1,
  },
  rail: {
    width: '15%',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#566167',
    backgroundColor: '#272E33',
  },
  inner: {
    flex: 1,
    gap: 5,
  },
  topRow: {
    height: '14%',
    flexDirection: 'row',
    gap: 4,
  },
  metalTile: {
    flex: 1,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#5C666E',
    backgroundColor: '#303840',
  },
  screen: {
    flex: 1,
    minHeight: 0,
    backgroundColor: '#02110E',
    borderWidth: 1,
    borderColor: '#187A55',
    borderRadius: 2,
    paddingHorizontal: 9,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  micro: {
    color: '#43F5A1',
    fontSize: 8,
    fontFamily: 'JetBrainsMono-Medium',
    letterSpacing: 0.7,
  },
  indicator: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#42EAA1',
  },
  divider: {
    marginTop: 4,
    marginBottom: 6,
    height: 1,
    backgroundColor: '#185B45',
  },
  data: {
    color: '#6BF3B7',
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 9,
    lineHeight: 17,
  },
  status: {
    marginTop: 'auto',
    textAlign: 'right',
    color: '#43F5A1',
    fontSize: 8,
    fontFamily: 'JetBrainsMono-Regular',
    letterSpacing: 0.6,
  },
  brandStrip: {
    height: '19%',
    backgroundColor: '#151716',
    borderWidth: 1,
    borderColor: '#85531D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  amberRule: {
    width: 2,
    height: '60%',
    backgroundColor: '#FFA92D',
  },
  brand: {
    fontSize: 18,
    color: '#FFB136',
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  lowerRow: {
    height: '11%',
    flexDirection: 'row',
    gap: 4,
  },
});
