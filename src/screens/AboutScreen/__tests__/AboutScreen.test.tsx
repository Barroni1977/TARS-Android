import React from 'react';
import {Alert, Linking} from 'react-native';
import {act, fireEvent, render as baseRender} from '../../../../jest/test-utils';

import {AboutScreen} from '../AboutScreen';
import {l10n} from '../../../locales';

const render = (ui: React.ReactElement, options: any = {}) =>
  baseRender(ui, {withBottomSheetProvider: true, ...options});

jest.mock('react-native-device-info', () => ({
  getVersion: jest.fn().mockReturnValue('1.0.0'),
  getBuildNumber: jest.fn().mockReturnValue('100'),
}));

jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}));

const mockOpenURL = jest.fn().mockResolvedValue(undefined);
jest.spyOn(Linking, 'openURL').mockImplementation(mockOpenURL);

jest.mock('../../../api/feedback', () => ({
  submitFeedback: jest.fn().mockResolvedValue(undefined),
}));

jest.spyOn(Alert, 'alert');

describe('TARS-AI About screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows TARS-AI identity and version', () => {
    const {getByText} = render(<AboutScreen />);
    expect(getByText('TARS AI')).toBeTruthy();
    expect(getByText('v1.0.0 (100)')).toBeTruthy();
    expect(getByText(l10n.en.about.githubButton)).toBeTruthy();
  });

  it('copies the app version', () => {
    const {getByText} = render(<AboutScreen />);
    fireEvent.press(getByText('v1.0.0 (100)'));
    expect(Alert.alert).toHaveBeenCalledWith(
      l10n.en.about.versionCopiedTitle,
      l10n.en.about.versionCopiedDescription,
    );
  });

  it('shows open-source notices locally', () => {
    const {getByTestId, getByText} = render(<AboutScreen />);
    fireEvent.press(getByTestId('about-open-source-notices'));
    expect(getByTestId('about-open-source-notices-sheet')).toBeTruthy();
    expect(getByText(l10n.en.about.phononNoticesCredit)).toBeTruthy();
    expect(Linking.openURL).not.toHaveBeenCalled();
  });

  it('gives a truthful TARS-AI data explanation rather than linking upstream privacy terms', () => {
    const {getByRole} = render(<AboutScreen />);
    const privacy = getByRole('button', {
      name: l10n.en.about.privacyPolicy,
    });
    const upstream = getByRole('link', {
      name: l10n.en.about.termsOfService,
    });
    const notices = getByRole('button', {
      name: l10n.en.about.openSourceNotices,
    });

    for (const target of [privacy, upstream, notices]) {
      expect(target).toHaveStyle({minHeight: 44});
    }
    fireEvent.press(privacy);
    expect(Alert.alert).toHaveBeenCalledWith(
      'TARS-AI data handling',
      expect.stringContaining('Local text chat'),
    );
    fireEvent.press(upstream);
    expect(Linking.openURL).toHaveBeenCalledWith(
      'https://github.com/a-ghorbani/pocketpal-ai',
    );
    expect(Linking.openURL).not.toHaveBeenCalledWith(
      'https://pocketpal.dev/terms',
    );
  });

  it('maintains separator alignment when a legal link wraps', () => {
    const {getByTestId, getAllByText} = render(<AboutScreen />);
    const layoutAt = (i: number, y: number) =>
      fireEvent(getByTestId(`about-legal-item-${i}`), 'layout', {
        nativeEvent: {layout: {x: 0, y, width: 100, height: 16}},
      });
    act(() => {
      layoutAt(0, 0);
      layoutAt(1, 0);
      layoutAt(2, 20);
    });
    const [first, second] = getAllByText('·', {
      includeHiddenElements: true,
    });
    expect(first).not.toHaveStyle({opacity: 0});
    expect(second).toHaveStyle({opacity: 0});
  });

  it('opens this TARS-AI repository instead of upstream store links', () => {
    const {getByText} = render(<AboutScreen />);
    fireEvent.press(getByText(l10n.en.about.githubButton));
    expect(Linking.openURL).toHaveBeenCalledWith(
      'https://github.com/Barroni1977/TARS-Android',
    );
  });

  it('opens TARS-AI issue reporting instead of inherited feedback submission', () => {
    const {getByText} = render(<AboutScreen />);
    fireEvent.press(getByText('Send TARS-AI feedback'));
    expect(Linking.openURL).toHaveBeenCalledWith(
      'https://github.com/Barroni1977/TARS-Android/issues/new/choose',
    );
  });
});
