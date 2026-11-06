import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';

/**
 * Live overlays for the *unmodified* 941 x 1672 approved startup image.
 *
 * Every coordinate is measured against that original image and scales with
 * the art, rather than against the device viewport. The portrait artwork is
 * always displayed in full with its native aspect ratio.
 *
 * This presentation is decorative: its diagnostics and loading bar do NOT
 * report the state of an LLM, microphone or network connection.
 */
const ORIGINAL_WIDTH = 941;
const ORIGINAL_HEIGHT = 1672;

const WAVE_HEIGHTS = [12, 18, 26, 35, 43, 33, 25, 18, 12, 8];
const SEGMENT_COUNT = 16;

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
  const px = (x: number) => (x / ORIGINAL_WIDTH) * artworkWidth;
  const py = (y: number) => (y / ORIGINAL_HEIGHT) * artworkHeight;

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {/* Almost invisible CRT scan passing through the existing display.
          Neither its green diagnostic text nor its proportions are replaced. */}
      {!reduceMotion && (
        <View
          testID="tars-approved-display"
          style={[
            styles.displayClip,
            {
              left: px(247),
              top: py(295),
              width: px(445),
              height: py(310),
            },
          ]}>
          <Animated.View
            testID="tars-approved-scanline"
            style={[
              styles.scanline,
              {
                height: Math.max(0.5, py(1)),
                transform: [
                  {
                    translateY: scan.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, py(305)],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      )}

      {/* The photograph's original *static* waveform must be covered in its
          small rectangle so the bars can genuinely move, not just pulse on
          top of a second, frozen set of bars. No other picture pixels change. */}
      <View
        testID="tars-approved-waveform"
        style={[
          styles.waveMask,
          {
            left: px(529),
            top: py(328),
            width: px(135),
            height: py(49),
          },
        ]}>
        <View style={styles.waveRow}>
          {WAVE_HEIGHTS.map((height, index) => (
            <Animated.View
              key={index}
              testID={`tars-approved-wave-${index}`}
              style={[
                styles.waveBar,
                {
                  height: py(height),
                  width: Math.max(1, px(6)),
                  opacity: reduceMotion ? 1 : pulse,
                  transform: [
                    {
                      scaleY: reduceMotion
                        ? 1
                        : waveform.interpolate({
                            inputRange: [0, 1],
                            outputRange:
                              index % 2 === 0 ? [0.52, 1] : [1, 0.52],
                          }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* The original outline remains untouched. Only the 16 illuminated
          interior cells are dynamically redrawn from empty to full. */}
      <View
        testID="tars-approved-progress"
        style={[
          styles.progressMask,
          {
            left: px(273),
            top: py(1291),
            width: px(393),
            height: py(22),
          },
        ]}>
        <Animated.View
          testID="tars-approved-progress-fill"
          style={[styles.progressFill, {width: progressWidth}]}
        />
        <View style={styles.progressDividers}>
          {Array.from({length: SEGMENT_COUNT - 1}).map((_, index) => (
            <View key={index} style={styles.progressDivider} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  displayClip: {
    position: 'absolute',
    overflow: 'hidden',
  },
  scanline: {
    width: '100%',
    backgroundColor: 'rgba(45,255,158,0.23)',
  },
  waveMask: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: '#00100C',
    justifyContent: 'center',
  },
  waveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
  },
  waveBar: {
    backgroundColor: '#36FF9D',
    shadowColor: '#36FF9D',
    shadowOpacity: 0.55,
    shadowRadius: 3,
  },
  progressMask: {
    position: 'absolute',
    backgroundColor: '#04140F',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#57FCA0',
  },
  progressDividers: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  progressDivider: {
    backgroundColor: 'rgba(1, 18, 12, 0.88)',
    height: '100%',
    width: 1.5,
  },
});
