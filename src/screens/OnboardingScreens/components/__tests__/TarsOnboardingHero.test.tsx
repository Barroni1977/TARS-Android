import React from 'react';
import {render} from '@testing-library/react-native';

import {TarsOnboardingHero} from '../TarsOnboardingHero';

describe('TARS-AI onboarding display', () => {
  it('presents an original diagnostic panel for each intro step', () => {
    for (const step of [1, 2, 3, 4] as const) {
      const screen = render(<TarsOnboardingHero variant={step} />);
      expect(screen.getByTestId(`tars-onboarding-hero-${step}`)).toBeTruthy();
      expect(screen.getByText('TARS AI')).toBeTruthy();
      screen.unmount();
    }
  });

  it('uses the same TARS identity for offline model setup', () => {
    const screen = render(<TarsOnboardingHero variant="model" compact />);
    expect(screen.getByText('TARS // AI CORE')).toBeTruthy();
    expect(screen.getByText('TARS AI')).toBeTruthy();
  });
});
