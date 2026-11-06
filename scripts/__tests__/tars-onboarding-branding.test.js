const fs = require('fs');
const path = require('path');

const read = relative =>
  fs.readFileSync(path.resolve(__dirname, '..', '..', relative), 'utf8');

describe('TARS-AI first-run onboarding debrand', () => {
  const onboarding = require('../../src/locales/en.json').onboarding;

  it('replaces old welcome copy and unrealistic privacy promises', () => {
    const introductoryScreens = [
      onboarding.screen1,
      onboarding.screen2,
      onboarding.screen3,
      onboarding.screen4,
    ];
    const visibleCopy = introductoryScreens
      .flatMap(screen => [screen.eyebrow, screen.title, screen.body, screen.cta])
      .join(' ');

    expect(visibleCopy).toContain('TARS-AI');
    expect(visibleCopy).not.toMatch(
      /pocketpal|meet your pals|your pals|no tracking|no accounts|nothing leaves your phone/i,
    );
    expect(onboarding.screen4.body).toMatch(/optional online tools/i);
    expect(onboarding.screen2.body).toMatch(/after downloading a model/i);
  });

  it('routes the four intro screens through TARS artwork', () => {
    for (let i = 1; i <= 4; i++) {
      const filename =
        i < 3
          ? `src/screens/OnboardingScreens/Onboarding${i}Screen.tsx`
          : `src/screens/OnboardingScreens/Onboarding${i}Screen/Onboarding${i}Screen.tsx`;
      const source = read(filename);
      expect(source).toContain(`<TarsOnboardingIntro step={${i}} />`);
    }
    const source = read(
      'src/screens/OnboardingScreens/Onboarding6Screen/Onboarding6Screen.tsx',
    );
    expect(source).toContain('<TarsOnboardingHero variant="model" compact />');
    expect(source).not.toContain('<PipMascot');
  });

  it('keeps the onboarding model setup and skip/navigation behaviour intact', () => {
    const handlers = read('src/screens/OnboardingScreens/useOnboardingHandlers.ts');
    expect(handlers).toContain('checkSpaceAndDownload');
    expect(handlers).toContain('completeOnboarding');
    expect(handlers).toContain('setOnboardingTopic');
  });
});
