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

  it('renders the approved PNG on Android and keeps other platforms safe', () => {
    const screen = render(<TarsBootScreen />);
    expect(screen.getByTestId('tars-boot-screen')).toBeTruthy();
    const picture = screen.queryByTestId('tars-boot-approved-artwork');

    if (picture) {
      // Do not flash the older metal panels while the PNG decodes.
      expect(screen.queryByTestId('tars-boot-progress')).toBeNull();
      act(() => {
        fireEvent(picture, 'load');
      });
      expect(screen.getByTestId('tars-approved-overlay')).toBeTruthy();
      expect(screen.getByText('HUMOUR')).toBeTruthy();
      expect(screen.getByText('90%')).toBeTruthy();
      expect(screen.getByText('INITIALISING')).toBeTruthy();
      expect(screen.getByTestId('tars-approved-progress')).toBeTruthy();
      expect(screen.queryByTestId('tars-boot-progress')).toBeNull();
    } else {
      // iOS continues using the existing native-view fallback boot.
      expect(screen.getByText('TARS AI')).toBeTruthy();
      expect(screen.getByText('HUMOUR 90%')).toBeTruthy();
      expect(screen.getByText('HONESTY 95%')).toBeTruthy();
      expect(screen.getByText('SARCASM 85%')).toBeTruthy();
      expect(screen.getByText('INITIALISING')).toBeTruthy();
      expect(screen.getByTestId('tars-boot-progress')).toBeTruthy();
    }
    expect(screen.queryByText('OFFLINE CO-PILOT')).toBeNull();
    screen.unmount();
  });

  it('advances the decorative boot sequence without networking', () => {
    const screen = render(<TarsBootScreen />);
    const picture = screen.queryByTestId('tars-boot-approved-artwork');
    if (picture) {
      act(() => {
        fireEvent(picture, 'load');
      });
    }
    act(() => {
      jest.advanceTimersByTime(1900);
    });

    if (picture) {
      // The approved image retains INITIALISING until the timed transition.
      expect(screen.getByText('INITIALISING')).toBeTruthy();
    } else {
      expect(screen.getByText('INTERFACE INITIALISED')).toBeTruthy();
    }
    expect(screen.queryByText('SYSTEM READY')).toBeNull();
    expect(TARS_BOOT_DURATION_MS).toBe(2500);
    screen.unmount();
  });

  it('displays live animated diagnostics when the Android artwork loads', () => {
    const screen = render(<TarsBootScreen />);
    const picture = screen.queryByTestId('tars-boot-approved-artwork');

    if (picture) {
      act(() => {
        fireEvent(picture, 'load');
      });
      expect(screen.getByTestId('tars-approved-waveform')).toBeTruthy();
      expect(screen.getByTestId('tars-approved-progress-fill')).toBeTruthy();
      expect(screen.getByTestId('tars-approved-wave-9')).toBeTruthy();
      expect(screen.getByText('VOICE SYSTEM')).toBeTruthy();
      expect(screen.getByText('STANDBY')).toBeTruthy();
      expect(screen.queryByTestId('tars-boot-progress')).toBeNull();
    }
    screen.unmount();
  });

  it('shows the earlier native boot if the Android PNG fails to load', () => {
    const screen = render(<TarsBootScreen />);
    const picture = screen.queryByTestId('tars-boot-approved-artwork');
    if (picture) {
      act(() => {
        fireEvent(picture, 'error');
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
