import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';

import {TarsBootScreen, TARS_BOOT_DURATION_MS} from '../TarsBootScreen';

describe('TarsBootScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders a full-screen TARS display with readable diagnostics', () => {
    const screen = render(<TarsBootScreen />);

    expect(screen.getByTestId('tars-boot-screen')).toBeTruthy();
    expect(screen.getByText('TARS AI')).toBeTruthy();
    expect(screen.getByText('HUMOUR 90%')).toBeTruthy();
    expect(screen.getByText('HONESTY 95%')).toBeTruthy();
    expect(screen.getByText('SARCASM 85%')).toBeTruthy();
    expect(screen.getByText('INITIALISING')).toBeTruthy();
    expect(screen.getByTestId('tars-boot-progress')).toBeTruthy();
    expect(screen.queryByText('OFFLINE CO-PILOT')).toBeNull();

    screen.unmount();
  });

  it('advances the decorative boot sequence without networking', () => {
    const screen = render(<TarsBootScreen />);
    act(() => {
      jest.advanceTimersByTime(1900);
    });
    expect(screen.getByText('INTERFACE INITIALISED')).toBeTruthy();
    // The visual boot finishing is not proof that a GGUF model has loaded.
    expect(screen.queryByText('SYSTEM READY')).toBeNull();
    expect(TARS_BOOT_DURATION_MS).toBe(2500);
    screen.unmount();
  });

  it('animates the approved art in place when the native Android asset loads', () => {
    const screen = render(<TarsBootScreen />);
    const originalArtwork = screen.queryByTestId('tars-boot-approved-artwork');

    // Android reads drawable-nodpi/tars_boot_approved.png by resource name.
    // Other platforms retain the working native-view startup fallback.
    if (originalArtwork) {
      act(() => {
        fireEvent(originalArtwork, 'load');
      });

      expect(screen.getByTestId('tars-approved-waveform')).toBeTruthy();
      expect(screen.getByTestId('tars-approved-progress')).toBeTruthy();
      expect(screen.getByTestId('tars-approved-progress-fill')).toBeTruthy();
      expect(screen.getByTestId('tars-approved-wave-9')).toBeTruthy();
      // The original art still provides all text and metal framing.
      expect(screen.queryByTestId('tars-boot-progress')).toBeNull();
    }
    screen.unmount();
  });

  it('falls back to the prior animated screen if the Android art is missing', () => {
    const screen = render(<TarsBootScreen />);
    const originalArtwork = screen.queryByTestId('tars-boot-approved-artwork');
    if (originalArtwork) {
      act(() => {
        fireEvent(originalArtwork, 'error');
      });
    }
    expect(screen.getByTestId('tars-boot-progress')).toBeTruthy();
    screen.unmount();
  });

  it('allows the user to skip the opening screen', () => {
    const onSkip = jest.fn();
    const screen = render(<TarsBootScreen onSkip={onSkip} />);

    fireEvent.press(screen.getByTestId('tars-boot-screen'));

    expect(onSkip).toHaveBeenCalledTimes(1);
    screen.unmount();
  });
});
