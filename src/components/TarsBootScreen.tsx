import React from 'react';
import {
  Animated,
  Easing,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTarsReducedMotion} from '../hooks/useTarsReducedMotion';
import {TarsApprovedArtOverlay} from './TarsApprovedArtOverlay';

// Startup is a timed visual sequence, not a report that model inference,
// microphone capture or any network service has actually been started.
export const TARS_BOOT_DURATION_MS = 2500;

const METAL = ['#707479', '#3A3E43', '#14191D', '#40464C'];
const DARK_METAL = ['#3E454A', '#171C20', '#080C0F', '#343C41'];
const WAVE_HEIGHTS = [11, 21, 29, 13, 37, 18, 31, 15, 26, 12];

const MetalPanel = ({
  style,
  dark = false,
}: {
  style?: object;
  dark?: boolean;
}) => (
  <LinearGradient
    colors={dark ? DARK_METAL : METAL}
    start={{x: 0, y: 0.13}}
    end={{x: 1, y: 0.83}}
    style={[styles.metal, style]}>
    <View style={styles.metalTopHighlight} />
    <View style={styles.metalBottomShadow} />
  </LinearGradient>
);

/**
 * A TARS-inspired full-screen boot display.
 *
 * This uses an original, articulated metal console; the approved image is
 * the visual direction for the boot artwork. We keep all diagnostics visible,
 * use horizontal TARS AI lettering, and keep the boot skippable and offline.
 *
 * The green waveform, model labels and loading bar are explicitly an
 * animation, never a claim that the local LLM is actually ready.
 */
export const TarsBootScreen: React.FC<{onSkip?: () => void}> = React.memo(
  ({onSkip}) => {
    const {width, height} = useWindowDimensions();
    const progress = React.useRef(new Animated.Value(0)).current;
    const reveal = React.useRef(new Animated.Value(0)).current;
    const pulse = React.useRef(new Animated.Value(0.3)).current;
    const waveform = React.useRef(new Animated.Value(0)).current;
    const scan = React.useRef(new Animated.Value(0)).current;
    const reduceMotion = useTarsReducedMotion();
    const [phase, setPhase] = React.useState(0);
    const [approvedArtLoaded, setApprovedArtLoaded] = React.useState(false);

    React.useEffect(() => {
      if (reduceMotion) {
        reveal.setValue(1);
        progress.setValue(1);
        pulse.setValue(1);
        waveform.setValue(0.5);
        scan.setValue(0);
        setPhase(3);
        return;
      }

      const intro = Animated.timing(reveal, {
        toValue: 1,
        duration: 450,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      });
      const loading = Animated.timing(progress, {
        toValue: 1,
        duration: TARS_BOOT_DURATION_MS - 150,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false,
      });
      const light = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1,
            duration: 410,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 0.35,
            duration: 410,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      );
      // Continuously animate the boot waveform and a clipped CRT-style scan.
      // These are purely decorative, not simulated model or audio activity.
      const waveMotion = Animated.loop(
        Animated.sequence([
          Animated.timing(waveform, {
            toValue: 1,
            duration: 390,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(waveform, {
            toValue: 0,
            duration: 390,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      );
      const scanMotion = Animated.loop(
        Animated.timing(scan, {
          toValue: 1,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      intro.start();
      loading.start();
      light.start();
      waveMotion.start();
      scanMotion.start();

      const phaseInterval = setInterval(() => {
        setPhase(previous => Math.min(previous + 1, 3));
      }, 600);

      return () => {
        clearInterval(phaseInterval);
        intro.stop();
        loading.stop();
        light.stop();
        waveMotion.stop();
        scanMotion.stop();
      };
    }, [progress, pulse, reveal, waveform, scan, reduceMotion]);

    // The original, unedited artwork is 941x1672. Contain it rather than
    // cropping, distorting or redesigning any of the approved panels.
    const artworkWidth = Math.min(width, height * (941 / 1672));
    const artworkHeight = artworkWidth * (1672 / 941);
    const robotWidth = Math.min(width * 0.96, height * 0.62);
    const robotHeight = Math.min(height * 0.97, robotWidth * 2.28);
    const progressWidth = progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <Pressable
        testID="tars-boot-screen"
        accessibilityRole="button"
        accessibilityLabel="TARS-AI initialising. Double tap to skip startup animation."
        onPress={onSkip}
        style={styles.root}>
        {/* Bundled Android drawable: prod/res/drawable-nodpi/tars_boot_approved.png.
            The previous functional boot remains a fallback until the exact
            original PNG has been uploaded to that resource path. */}
        {Platform.OS === 'android' && (
          <View
            pointerEvents="none"
            style={[
              styles.approvedArtworkFrame,
              {
                width: artworkWidth,
                height: artworkHeight,
                top: (height - artworkHeight) / 2,
                left: (width - artworkWidth) / 2,
                opacity: approvedArtLoaded ? 1 : 0,
              },
            ]}>
            <Image
              testID="tars-boot-approved-artwork"
              source={{uri: 'tars_boot_approved'}}
              resizeMode="stretch"
              accessibilityIgnoresInvertColors
              onLoad={() => setApprovedArtLoaded(true)}
              onError={() => setApprovedArtLoaded(false)}
              style={styles.approvedArtworkImage}
            />
            {approvedArtLoaded && (
              <TarsApprovedArtOverlay
                artworkWidth={artworkWidth}
                artworkHeight={artworkHeight}
                progress={progress}
                waveform={waveform}
                pulse={pulse}
                scan={scan}
                reduceMotion={reduceMotion}
              />
            )}
          </View>
        )}
        {!approvedArtLoaded && (
        <Animated.View
          style={[
            styles.robot,
            {width: robotWidth, height: robotHeight, opacity: reveal},
          ]}>
          <View style={styles.outerRail}>
            <MetalPanel style={styles.railUpper} />
            <MetalPanel style={styles.railJoint} dark />
            <MetalPanel style={styles.railLower} />
          </View>

          <View style={styles.centerColumn}>
            <View style={styles.topModules}>
              <MetalPanel style={styles.module} />
              <MetalPanel style={styles.module} />
            </View>

            <View style={styles.terminal}>
              <View style={styles.terminalUpperLine}>
                <Text style={styles.smallGreen}>TARS-AI</Text>
                <Animated.View style={[styles.signalDot, {opacity: pulse}]} />
              </View>
              <View style={styles.terminalColumns}>
                <View style={styles.readoutColumn}>
                  <Text style={styles.terminalText}>HUMOUR 90%</Text>
                  <Text style={styles.terminalText}>HONESTY 95%</Text>
                  <Text style={styles.terminalText}>SARCASM 85%</Text>
                  <View style={styles.waveform}>
                    {WAVE_HEIGHTS.map((bar, index) => (
                      <Animated.View
                        key={index}
                        style={[
                          styles.waveBar,
                          {
                            height: bar,
                            opacity: pulse,
                            transform: [
                              {
                                scaleY: waveform.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [
                                    index % 2 === 0 ? 0.55 : 1.05,
                                    index % 2 === 0 ? 1.15 : 0.55,
                                  ],
                                }),
                              },
                            ],
                          },
                        ]}
                      />
                    ))}
                  </View>
                </View>
                <View style={styles.readoutColumn}>
                  <Text style={styles.terminalText}>LOCAL CORE</Text>
                  <Text style={styles.terminalValue}>STANDBY</Text>
                  <Text style={styles.terminalText}>VOICE SYSTEM</Text>
                  <Text style={styles.terminalValue}>STANDBY</Text>
                  <Text style={styles.terminalText}>MEMORY CHECK</Text>
                  <Text style={styles.terminalValue}>NOMINAL</Text>
                </View>
              </View>
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.scanline,
                  {
                    transform: [
                      {
                        translateY: scan.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 175],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>

            <View style={styles.middleModules}>
              <MetalPanel style={styles.module} dark />
              <MetalPanel style={styles.module} />
            </View>

            <View style={styles.identityPanel}>
              <Text style={styles.brand} numberOfLines={1}>
                TARS AI
              </Text>
              <View style={styles.brandUnderline} />
            </View>

            <View style={styles.progressPanel}>
              <Text testID="tars-boot-phase" style={styles.progressLabel}>
                {phase < 3 ? 'INITIALISING' : 'INTERFACE INITIALISED'}
              </Text>
              <View style={styles.progressTrack}>
                <Animated.View
                  testID="tars-boot-progress"
                  style={[styles.progressFill, {width: progressWidth}]}
                />
                <View style={styles.progressSegments}>
                  {Array.from({length: 13}).map((_, index) => (
                    <View key={index} style={styles.progressDivider} />
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.bottomModules}>
              <MetalPanel style={styles.module} />
              <MetalPanel style={styles.module} dark />
            </View>
          </View>

          <View style={styles.outerRail}>
            <MetalPanel style={styles.railUpper} />
            <MetalPanel style={styles.railJoint} dark />
            <MetalPanel style={styles.railLower} />
          </View>
        </Animated.View>
        )}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  approvedArtworkFrame: {
    position: 'absolute',
  },
  approvedArtworkImage: {
    height: '100%',
    width: '100%',
  },
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
    gap: 6,
    paddingHorizontal: 2,
    paddingVertical: 6,
  },
  outerRail: {
    flex: 0.76,
    gap: 5,
  },
  railUpper: {
    flex: 1.35,
  },
  railJoint: {
    flex: 0.12,
  },
  railLower: {
    flex: 1,
  },
  centerColumn: {
    flex: 1.55,
    gap: 6,
  },
  metal: {
    overflow: 'hidden',
    borderColor: '#4B5356',
    borderWidth: 1,
    borderRadius: 2,
  },
  metalTopHighlight: {
    position: 'absolute',
    top: 2,
    left: 3,
    right: 3,
    height: 2,
    backgroundColor: 'rgba(207,217,216,0.14)',
  },
  metalBottomShadow: {
    position: 'absolute',
    bottom: 3,
    left: 3,
    right: 3,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },
  module: {
    flex: 1,
  },
  topModules: {
    flex: 0.47,
    flexDirection: 'row',
    gap: 6,
    minHeight: 36,
  },
  terminal: {
    flex: 0.95,
    minHeight: 152,
    paddingHorizontal: 8,
    paddingVertical: 9,
    backgroundColor: '#020D0C',
    borderWidth: 1,
    borderColor: '#245245',
    overflow: 'hidden',
    gap: 8,
  },
  terminalUpperLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#23694E',
    paddingBottom: 5,
  },
  smallGreen: {
    color: '#65CFA8',
    fontSize: 9,
    fontFamily: 'JetBrainsMono-Regular',
    letterSpacing: 1,
  },
  signalDot: {
    height: 6,
    width: 6,
    backgroundColor: '#66F6B8',
    borderRadius: 3,
  },
  terminalColumns: {
    flex: 1,
    flexDirection: 'row',
    gap: 7,
  },
  readoutColumn: {
    flex: 1,
    justifyContent: 'space-around',
    overflow: 'hidden',
    gap: 4,
  },
  terminalText: {
    fontFamily: 'JetBrainsMono-Regular',
    color: '#67D6AC',
    fontSize: 8,
    lineHeight: 13,
  },
  terminalValue: {
    fontFamily: 'JetBrainsMono-Regular',
    color: '#3EAA87',
    fontSize: 8,
    lineHeight: 12,
  },
  waveform: {
    minHeight: 37,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    overflow: 'hidden',
  },
  waveBar: {
    width: 2,
    backgroundColor: '#79E5B9',
  },
  scanline: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#24684D',
    height: 1,
    opacity: 0.5,
  },
  middleModules: {
    flex: 1.36,
    flexDirection: 'row',
    minHeight: 60,
    gap: 6,
  },
  identityPanel: {
    flex: 0.55,
    minHeight: 65,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    gap: 8,
    backgroundColor: '#070B0D',
    borderWidth: 1,
    borderColor: '#6C522A',
  },
  brand: {
    color: '#F5A532',
    fontWeight: '900',
    fontSize: 29,
    letterSpacing: 1.3,
    textAlign: 'center',
    textShadowColor: 'rgba(246,149,36,0.56)',
    textShadowRadius: 12,
  },
  brandUnderline: {
    width: '75%',
    height: 1,
    backgroundColor: '#764B1E',
  },
  progressPanel: {
    flex: 0.4,
    minHeight: 60,
    justifyContent: 'center',
    paddingHorizontal: 13,
    gap: 12,
    backgroundColor: '#030807',
    borderColor: '#254C3B',
    borderWidth: 1,
  },
  progressLabel: {
    color: '#7DF6B9',
    fontFamily: 'JetBrainsMono-Regular',
    textAlign: 'center',
    fontSize: 10,
    letterSpacing: 1.8,
  },
  progressTrack: {
    height: 9,
    backgroundColor: '#153529',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#466C55',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6DEFAD',
  },
  progressSegments: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  progressDivider: {
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.74)',
  },
  bottomModules: {
    flex: 0.65,
    flexDirection: 'row',
    minHeight: 48,
    gap: 6,
  },
});
