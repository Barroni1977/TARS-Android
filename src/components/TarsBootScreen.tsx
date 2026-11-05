import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// A React Native animation, not a video or an internet-hosted image.
// It starts once the JavaScript runtime is ready and requires no connection.
export const TARS_BOOT_DURATION_MS = 3300;

const DIAGNOSTICS = [
  'CPU  LOCAL /  READY',
  'LLM  QWEN  /  LOADING',
  'MEM  SECURE /  OK',
  'VOICE BUS   /  STANDBY',
  'NET  OFFLINE /  LOCKED',
  'PROCESSING  /  LOCAL',
  'SENSOR GRID /  READY',
  'CORE STATUS /  NOMINAL',
];

const BOOT_PHASES = [
  'INITIALISING CORE',
  'LOADING LOCAL SYSTEMS',
  'VOICE SYSTEM STANDBY',
  'TARS AI  /  SYSTEM ONLINE',
];

const METAL = ['#66696b', '#393b3e', '#202225', '#44464a'];
const WAVE_HEIGHTS = [7, 12, 17, 10, 24, 12, 19, 8, 13];

const MetalPanel = ({style}: {style?: object}) => (
  <LinearGradient
    colors={METAL}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0.65}}
    style={[styles.metal, style]}
  />
);

/**
 * Fan-made modular robot boot screen, inspired by a cinematic monolith.
 * The green diagnostics really scroll and the waveform really animates.
 * No microphone is used: the waveform represents a system self-test.
 *
 * Only rendered on app startup; the Android native launch surface is still
 * static because React Native cannot animate before the JS runtime starts.
 */
export const TarsBootScreen: React.FC = React.memo(() => {
  const {width, height} = useWindowDimensions();
  const scroll = React.useRef(new Animated.Value(0)).current;
  const breathe = React.useRef(new Animated.Value(0)).current;
  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    const scrolling = Animated.loop(
      Animated.timing(scroll, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    const breathing = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1,
          duration: 430,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 0,
          duration: 430,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    scrolling.start();
    breathing.start();

    // Advance through authentic-looking diagnostic states. Nothing here
    // claims that a background service or model has actually finished loading.
    const interval = setInterval(() => {
      setPhase(previous => Math.min(previous + 1, BOOT_PHASES.length - 1));
    }, 800);
    return () => {
      clearInterval(interval);
      scrolling.stop();
      breathing.stop();
    };
  }, [scroll, breathe]);

  const scrollY = scroll.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -DIAGNOSTICS.length * 18],
  });
  const glow = breathe.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const robotWidth = Math.min(width * 0.84, 410);
  const robotHeight = Math.min(height * 0.72, 660);

  return (
    <View
      testID="tars-boot-screen"
      accessibilityLabel="TARS AI launching"
      style={styles.root}>
      <View style={[styles.robot, {width: robotWidth, height: robotHeight}]}>
        <MetalPanel style={styles.outerLeg} />
        <View style={styles.inner}>
          <View style={styles.topPair}>
            <MetalPanel style={styles.flexPanel} />
            <MetalPanel style={styles.flexPanel} />
          </View>

          <View style={styles.hud}>
            <View style={styles.statusColumn}>
              <Animated.View style={[styles.statusLight, {opacity: glow}]} />
              <Text style={styles.hudLabel}>HUMOUR 90%</Text>
              <Text style={styles.hudLabel}>HONESTY 95%</Text>
              <Text style={styles.hudLabel}>SARCASM 85%</Text>
            </View>
            <View style={styles.diagnosticColumn}>
              <View style={styles.waveform}>
                {WAVE_HEIGHTS.map((barHeight, index) => (
                  <Animated.View
                    key={index}
                    style={[
                      styles.waveBar,
                      {
                        height: barHeight,
                        opacity: glow,
                        transform: [
                          {
                            scaleY: breathe.interpolate({
                              inputRange: [0, 1],
                              outputRange: [
                                index % 2 === 0 ? 0.55 : 0.9,
                                index % 2 === 0 ? 1 : 0.55,
                              ],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                ))}
              </View>
              <View style={styles.diagnosticClip}>
                <Animated.View style={{transform: [{translateY: scrollY}]}}>
                  {[...DIAGNOSTICS, ...DIAGNOSTICS].map((line, index) => (
                    <Text key={index} style={styles.diagnosticLine}>
                      {line}
                    </Text>
                  ))}
                </Animated.View>
              </View>
            </View>
          </View>

          <View style={styles.middlePair}>
            <LinearGradient
              colors={METAL}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0.65}}
              style={[styles.metal, styles.verticalBrandPanel]}>
              <Text style={styles.verticalBrand}>TARS</Text>
            </LinearGradient>
            <MetalPanel style={styles.flexPanel} />
          </View>

          <View style={styles.startupStrip}>
            <Text style={styles.appName}>TARS AI</Text>
            <Text
              accessibilityLiveRegion="polite"
              testID="tars-boot-phase"
              style={styles.phaseText}>
              {BOOT_PHASES[phase]}
            </Text>
          </View>

          <View style={styles.bottomPair}>
            <MetalPanel style={styles.flexPanel} />
            <MetalPanel style={styles.flexPanel} />
          </View>
        </View>
        <MetalPanel style={styles.outerLeg} />
      </View>
      <Text style={styles.footer}>OFFLINE CO-PILOT</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    elevation: 100,
  },
  robot: {
    flexDirection: 'row',
    gap: 7,
  },
  outerLeg: {
    flex: 0.8,
    borderRadius: 2,
  },
  inner: {
    flex: 1.6,
    gap: 7,
  },
  metal: {
    borderColor: '#55585a',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#2c2e30',
    borderRadius: 2,
  },
  flexPanel: {
    flex: 1,
  },
  topPair: {
    height: '16%',
    flexDirection: 'row',
    gap: 7,
  },
  hud: {
    height: 116,
    backgroundColor: '#020504',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#111e18',
    paddingVertical: 7,
    paddingHorizontal: 5,
    gap: 4,
    overflow: 'hidden',
  },
  statusColumn: {
    flex: 1,
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  statusLight: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#43f3c4',
    marginLeft: 3,
  },
  hudLabel: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 8,
    color: '#4ad9ac',
  },
  diagnosticColumn: {
    flex: 1,
    overflow: 'hidden',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: '#16483a',
    paddingLeft: 5,
  },
  diagnosticClip: {
    height: 70,
    overflow: 'hidden',
  },
  diagnosticLine: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 6,
    color: '#36a988',
    height: 18,
    includeFontPadding: false,
  },
  waveform: {
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    overflow: 'hidden',
  },
  waveBar: {
    width: 2,
    backgroundColor: '#31dcb0',
    borderRadius: 2,
  },
  middlePair: {
    flex: 1,
    minHeight: 80,
    flexDirection: 'row',
    gap: 7,
  },
  verticalBrandPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  verticalBrand: {
    transform: [{rotate: '-90deg'}],
    color: '#ff9a16',
    fontSize: 30,
    letterSpacing: 4,
    fontWeight: '700',
  },
  startupStrip: {
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#020304',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2b2d2e',
  },
  appName: {
    fontSize: 22,
    color: '#ff9a16',
    fontWeight: '700',
    letterSpacing: 3,
  },
  phaseText: {
    color: '#4be7b2',
    fontSize: 8,
    letterSpacing: 1,
    marginTop: 4,
    textAlign: 'center',
  },
  bottomPair: {
    height: '10%',
    flexDirection: 'row',
    gap: 7,
  },
  footer: {
    color: '#747474',
    fontSize: 10,
    letterSpacing: 4,
    marginTop: 18,
  },
});
