import React from 'react';
import {Animated} from 'react-native';
import {render} from '@testing-library/react-native';

import {
  TarsApprovedArtOverlay,
  TARS_ARTWORK_REGIONS,
  TARS_ARTWORK_SIZE,
} from '../TarsApprovedArtOverlay';

const renderOverlay = (reducedMotion = false) =>
  render(
    <TarsApprovedArtOverlay
      artworkWidth={TARS_ARTWORK_SIZE.width}
      artworkHeight={TARS_ARTWORK_SIZE.height}
      progress={new Animated.Value(0)}
      waveform={new Animated.Value(0)}
      pulse={new Animated.Value(1)}
      scan={new Animated.Value(0)}
      reduceMotion={reducedMotion}
    />,
  );

describe('approved TARS AI startup artwork overlay', () => {
  it('restores the text intentionally removed from the clean PNG', () => {
    const screen = renderOverlay();

    expect(screen.getByText('HUMOUR')).toBeTruthy();
    expect(screen.getByText('90%')).toBeTruthy();
    expect(screen.getByText('HONESTY')).toBeTruthy();
    expect(screen.getByText('95%')).toBeTruthy();
    expect(screen.getByText('SARCASM')).toBeTruthy();
    expect(screen.getByText('85%')).toBeTruthy();
    expect(screen.getByText('LOCAL CORE')).toBeTruthy();
    expect(screen.getByText('READY')).toBeTruthy();
    expect(screen.getByText('VOICE SYSTEM')).toBeTruthy();
    expect(screen.getByText('STANDBY')).toBeTruthy();
    expect(screen.getByText('MEMORY CHECK')).toBeTruthy();
    expect(screen.getByText('NOMINAL')).toBeTruthy();
    expect(screen.getByText('INITIALISING')).toBeTruthy();
  });

  it('keeps the moving waveform inside the top display', () => {
    const screen = renderOverlay();
    const waveform = screen.getByTestId('tars-approved-waveform').props.style;
    expect(waveform[1]).toMatchObject({
      left: 516,
      top: 324,
      width: 132,
      height: 46,
    });

    expect(screen.getByTestId('tars-approved-wave-0')).toBeTruthy();
    expect(screen.getByTestId('tars-approved-wave-9')).toBeTruthy();
    expect(screen.getByTestId('tars-approved-scanline')).toBeTruthy();
  });

  it('fills the empty PNG progress bar, not the space above it', () => {
    const screen = renderOverlay();
    const progress = screen.getByTestId('tars-approved-progress').props.style;
    expect(progress[1]).toEqual({
      left: 267,
      top: 1275,
      width: 415,
      height: 24,
    });
    expect(screen.getByTestId('tars-approved-progress-fill')).toBeTruthy();
    expect(TARS_ARTWORK_REGIONS.caption.y).toBeLessThan(
      TARS_ARTWORK_REGIONS.progress.y,
    );
  });

  it('respects reduced motion and still displays all information', () => {
    const screen = renderOverlay(true);
    expect(screen.queryByTestId('tars-approved-scanline')).toBeNull();
    expect(screen.getByTestId('tars-approved-waveform')).toBeTruthy();
    expect(screen.getByText('INITIALISING')).toBeTruthy();
  });
});
