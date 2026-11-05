import React from 'react';
import {act, render} from '@testing-library/react-native';

import {TarsBootScreen, TARS_BOOT_DURATION_MS} from '../TarsBootScreen';

describe('TarsBootScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('shows TARS AI and the local diagnostic display', () => {
    const screen = render(<TarsBootScreen />);

    expect(screen.getByTestId('tars-boot-screen')).toBeTruthy();
    expect(screen.getByText('TARS AI')).toBeTruthy();
    expect(screen.getByText('HUMOUR  90%')).toBeTruthy();
    expect(screen.getByText('HONESTY 95%')).toBeTruthy();
    expect(screen.getByText('SARCASM 85%')).toBeTruthy();
    expect(screen.getByText('INITIALISING CORE')).toBeTruthy();

    screen.unmount();
  });

  it('advances its boot status locally, without external requests', () => {
    const screen = render(<TarsBootScreen />);

    act(() => {
      jest.advanceTimersByTime(2400);
    });

    expect(screen.getByText('TARS AI  /  SYSTEM ONLINE')).toBeTruthy();
    expect(TARS_BOOT_DURATION_MS).toBeGreaterThan(2400);

    screen.unmount();
  });
});
