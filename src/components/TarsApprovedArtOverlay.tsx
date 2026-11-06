import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

/**
 * Pixel-aligned overlays for the clean, approved 941 × 1672 Android PNG.
 * The PNG contains the brushed-metal frame, green screen borders, amber
 * TARS AI logo, empty display and empty progress-bar outline. Never redraw
 * or reposition those portions: only add the diagnostics, waveform,
 * INITIALISING caption and interior progress cells.
 *
 * Coordinates refer to the PNG's original pixels, NOT phone pixels.
 * They scale together with the aspect-ratio-preserved source image.
 * The boot readouts are decorative and do not claim actual model readiness.
 */
export const TARS_ARTWORK_SIZE = {width: 941, height: 1672} as const;

export const TARS_ARTWORK_REGIONS = {
  scan: {x: 253, y: 319, width: 426, height: 256},
  separator: {x: 485, y: 320, height: 251},
  settings: {x: 263, y: 367, width: 199, rowGap: 63},
  waveform: {x: 516, y: 324, width: 132, height: 46},
  core: {x: 513, y: 389, width: 162},
  voice: {x: 513, y: 455, width: 162},
  memory: {x: 513, y: 521, width: 162},
  caption: {x: 263, y: 1208, width: 414, height: 43},
  progress: {x: 264, y: 1257, width: 408, height: 24},
} as const;

const WAVE_HEIGHTS = [9, 17, 25, 34, 43, 35, 27, 19, 13, 8];
const SEGMENTS = 16;
const GREEN = '#30FCA0';

interface Props {
  artworkWidth: number;
  artworkHeight: number;
  progress: Animated.Value;
  waveform: Animated.Value;
  pulse: Animated.Value;
  scan: Animated.Value;
  reduceMotion: boolean;
}

export const TarsApprovedArtOverlay: React.FC<Props> = ({
  artworkWidth,
  artworkHeight,
  progress,
  waveform,
  pulse,
  scan,
  reduceMotion,
}) => {
  const px = (value: number) =>
    (value / TARS_ARTWORK_SIZE.width) * artworkWidth;
  const py = (value: number) =>
    (value / TARS_ARTWORK_SIZE.height) * artworkHeight;

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const textStyle = {
    color: GREEN,
    fontFamily: 'JetBrainsMono-Medium',
    textShadowColor: 'rgba(23,255,157,0.4)',
    textShadowRadius: px(4),
    includeFontPadding: false,
  } as const;

  const systemReading = (
    label: string,
    value: string,
    position: {x: number; y: number; width: number},
  ) => (
    <View
      style={{
        position: 'absolute',
        left: px(position.x),
        top: py(position.y),
        width: px(position.width),
      }}>
      <Text
        allowFontScaling={false}
        style={[textStyle, {fontSize: px(18), lineHeight: py(23)}]}>
        {label}
      </Text>
      <Text
        allowFontScaling={false}
        style={[textStyle, {fontSize: px(18), lineHeight: py(23)}]}>
        {value}
      </Text>
    </View>
  );

  return (
    <View
      testID="tars-approved-overlay"
      pointerEvents="none"
      style={StyleSheet.absoluteFill}>
      {/* Restrict the subtle moving scan to the inside of the real display. */}
      {!reduceMotion && (
        <View
          testID="tars-approved-display"
          style={[
            styles.scanClip,
            {
              left: px(TARS_ARTWORK_REGIONS.scan.x),
              top: py(TARS_ARTWORK_REGIONS.scan.y),
              width: px(TARS_ARTWORK_REGIONS.scan.width),
              height: py(TARS_ARTWORK_REGIONS.scan.height),
            },
          ]}>
          <Animated.View
            testID="tars-approved-scanline"
            style={{
              width: '100%',
              height: Math.max(py(1), 0.5),
              backgroundColor: 'rgba(45,255,158,0.20)',
              transform: [
                {
                  translateY: scan.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, py(TARS_ARTWORK_REGIONS.scan.height - 1)],
                  }),
                },
              ],
            }}
          />
        </View>
      )}

      {/* The clean image deliberately has no text or divider in this screen. */}
      <View
        style={[
          styles.divider,
          {
            left: px(TARS_ARTWORK_REGIONS.separator.x),
            top: py(TARS_ARTWORK_REGIONS.separator.y),
            width: Math.max(px(1.5), 0.5),
            height: py(TARS_ARTWORK_REGIONS.separator.height),
          },
        ]}
      />

      {(['HUMOUR', 'HONESTY', 'SARCASM'] as const).map((label, index) => (
        <View
          key={label}
          style={{
            position: 'absolute',
            left: px(TARS_ARTWORK_REGIONS.settings.x),
            top: py(
              TARS_ARTWORK_REGIONS.settings.y +
                index * TARS_ARTWORK_REGIONS.settings.rowGap,
            ),
            width: px(TARS_ARTWORK_REGIONS.settings.width),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            allowFontScaling={false}
            style={[textStyle, {fontSize: px(22), lineHeight: py(29)}]}>
            {label}
          </Text>
          <Text
            allowFontScaling={false}
            style={[textStyle, {fontSize: px(22), lineHeight: py(29)}]}>
            {['90%', '95%', '85%'][index]}
          </Text>
        </View>
      ))}

      <View
        testID="tars-approved-waveform"
        style={[
          styles.waveform,
          {
            left: px(TARS_ARTWORK_REGIONS.waveform.x),
            top: py(TARS_ARTWORK_REGIONS.waveform.y),
            width: px(TARS_ARTWORK_REGIONS.waveform.width),
            height: py(TARS_ARTWORK_REGIONS.waveform.height),
          },
        ]}>
        {WAVE_HEIGHTS.map((height, index) => (
          <Animated.View
            key={index}
            testID={`tars-approved-wave-${index}`}
            style={{
              width: Math.max(px(6), 1),
              height: py(height),
              backgroundColor: GREEN,
              opacity: reduceMotion ? 1 : pulse,
              transform: [
                {
                  scaleY: reduceMotion
                    ? 1
                    : waveform.interpolate({
                        inputRange: [0, 1],
                        outputRange:
                          index % 2 === 0 ? [0.5, 1.08] : [1.08, 0.5],
                      }),
                },
              ],
            }}
          />
        ))}
      </View>

      {systemReading('LOCAL CORE', 'READY', TARS_ARTWORK_REGIONS.core)}
      {systemReading('VOICE SYSTEM', 'STANDBY', TARS_ARTWORK_REGIONS.voice)}
      {systemReading('MEMORY CHECK', 'NOMINAL', TARS_ARTWORK_REGIONS.memory)}

      {/* The user-approved PNG has a blank lower display. Draw the lettering
          above the *existing* green outline, never across the amber nameplate. */}
      <View
        style={[
          styles.caption,
          {
            left: px(TARS_ARTWORK_REGIONS.caption.x),
            top: py(TARS_ARTWORK_REGIONS.caption.y),
            width: px(TARS_ARTWORK_REGIONS.caption.width),
            height: py(TARS_ARTWORK_REGIONS.caption.height),
          },
        ]}>
        <Text
          testID="tars-approved-initialising"
          allowFontScaling={false}
          style={[
            textStyle,
            {
              fontSize: px(29),
              lineHeight: py(37),
              letterSpacing: px(5),
              textAlign: 'center',
            },
          ]}>
          INITIALISING
        </Text>
      </View>

      {/* Leave the approved PNG's progress border visible. The animated
          fill starts at 0% and moves ONLY inside that existing outline. */}
      <View
        testID="tars-approved-progress"
        style={[
          styles.progress,
          {
            left: px(TARS_ARTWORK_REGIONS.progress.x),
            top: py(TARS_ARTWORK_REGIONS.progress.y),
            width: px(TARS_ARTWORK_REGIONS.progress.width),
            height: py(TARS_ARTWORK_REGIONS.progress.height),
          },
        ]}>
        <Animated.View
          testID="tars-approved-progress-fill"
          style={[styles.progressFill, {width: progressWidth}]}
        />
        {Array.from({length: SEGMENTS - 1}).map((_, index) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: px(
                ((index + 1) * TARS_ARTWORK_REGIONS.progress.width) / SEGMENTS,
              ),
              width: Math.max(px(2.5), 0.5),
              backgroundColor: 'rgba(0,15,10,0.95)',
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scanClip: {
    position: 'absolute',
    overflow: 'hidden',
  },
  divider: {
    position: 'absolute',
    backgroundColor: '#24F9A0',
    opacity: 0.8,
  },
  waveform: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  caption: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    position: 'absolute',
    backgroundColor: '#04160E',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5DFAA1',
  },
});
