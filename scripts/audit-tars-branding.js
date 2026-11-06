const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const bytes = file => fs.readFileSync(path.join(root, file));
const assert = (ok, message) => {
  if (!ok) {
    throw new Error('TARS-AI branding audit: ' + message);
  }
};
const blobSHA = data =>
  crypto
    .createHash('sha1')
    .update(`blob ${data.length}\0`)
    .update(data)
    .digest('hex');
const verifyBlob = (file, expectedSHA) =>
  assert(blobSHA(bytes(file)) === expectedSHA, file + ' changed unexpectedly');

const checkRegistration = () => {
  const app = JSON.parse(read('app.json'));
  assert(app.name === 'TarsAI', 'React Native component name is not TarsAI');
  assert(app.displayName === 'TARS AI', 'wrong app display name');
  assert(
    read('android/app/src/main/java/com/pocketpalai/MainActivity.kt').includes(
      'getMainComponentName(): String = "TarsAI"',
    ),
    'Android native root does not match JS component',
  );
  assert(
    read('ios/PocketPal/AppDelegate.swift').includes(
      'withModuleName: "TarsAI"',
    ),
    'iOS native root does not match JS component',
  );
  assert(
    read('ios/PocketPal/Info.plist').includes(
      '<key>CFBundleDisplayName</key>\n\t<string>TARS AI</string>',
    ),
    'iOS display name not TARS',
  );
  assert(
    !/PocketPal|LLM Ventures/.test(
      read('ios/PocketPal/LaunchScreen.storyboard'),
    ),
    'legacy startup label is visible on iOS',
  );
};

const checkFirstRun = () => {
  for (const i of [1, 2, 3, 4]) {
    const pathForStep =
      i <= 2
        ? `src/screens/OnboardingScreens/Onboarding${i}Screen.tsx`
        : `src/screens/OnboardingScreens/Onboarding${i}Screen/Onboarding${i}Screen.tsx`;
    assert(
      read(pathForStep).includes(`<TarsOnboardingIntro step={${i}} />`),
      'legacy welcome art active in screen ' + i,
    );
  }
  assert(
    read(
      'src/screens/OnboardingScreens/Onboarding6Screen/Onboarding6Screen.tsx',
    ).includes('<TarsOnboardingHero variant="model" compact />'),
    'legacy mascot active in model setup',
  );
  const onboarding = read('src/store/onboarding/onboardingPals.ts');
  for (const name of [
    "name: 'TARS'",
    "name: 'TARS / CODE'",
    "name: 'TARS / LEARN'",
    "name: 'TARS / STORY'",
    "name: 'TARS / WRITE'",
  ]) {
    assert(onboarding.includes(name), 'missing TARS profile identity ' + name);
  }
  const store = read('src/store/PalStore.ts');
  assert(store.includes('migrateLegacyMascotProfiles'), 'migration missing');
  assert(store.includes("name: 'TARS'"), 'legacy assistant still seeded');
  assert(store.includes("name: 'TARS / VISION'"), 'legacy video mascot still seeded');
};

const checkText = () => {
  const en = JSON.parse(read('src/locales/en.json'));
  const values = [];
  const visit = node => {
    if (typeof node === 'string') {
      values.push(node);
    } else if (node && typeof node === 'object') {
      Object.values(node).forEach(visit);
    }
  };
  visit(en);
  assert(
    values.every(s => !/pocketpal|pocket pal|\bpal(s)?\b/i.test(s)),
    'inherited name/mascot wording is visible in English strings',
  );
  const readme = read('README.md');
  assert(readme.startsWith('<div align="center">'), 'README header changed');
  assert(readme.includes('# TARS-AI'), 'README has old project title');
  assert(
    !/apps\.apple\.com\/us\/app\/pocketpal|play\.google\.com\/store\/apps\/details\?id=com\.pocketpalai/.test(
      readme,
    ),
    'README points to upstream app-store download',
  );
  assert(
    read('fastlane/metadata/android/en-US/title.txt').trim() === 'TARS-AI',
    'store listing has wrong title',
  );
};

const checkImages = () => {
  const approved = 'android/app/src/prod/res/drawable-nodpi/tars_boot_approved.png';
  verifyBlob(approved, 'ceddbe5704fc1a3f63e5a78b3bc1d20fc3d90bb4');
  for (const file of [
    'ios/PocketPal/Images.xcassets/AppIcon.appiconset/AppIcon.png',
    'ios/PocketPal/Images.xcassets/AppIcon.appiconset/AppIcon-dark.png',
    'ios/PocketPal/Images.xcassets/AppIcon.appiconset/AppIcon-tinted.png',
    'src/assets/pocketpal-dark-v2.png',
    'src/assets/pocketpal-dark.png',
    'src/assets/pocketpal-light.png',
    'src/assets/onboarding/screen-3-cards.png',
  ]) {
    verifyBlob(file, '031a7d08782ea6c6f4bd70d59c9dd45f1cab43b9');
  }
  verifyBlob(
    'fastlane/metadata/android/en-US/images/icon.png',
    '87b659ce9cbeea46398f06f08d2ec2a7abfb5ce7',
  );
  verifyBlob(
    'src/assets/pocketpal.gif',
    '1509796307535f4fa71b5908f497915710285dd5',
  );
  assert(
    !fs.existsSync(path.join(root, 'assets/images and logos')),
    'legacy marketing folder still active instead of archived',
  );
  const releaseShots = path.join(
    root,
    'fastlane/metadata/android/en-US/images/phoneScreenshots',
  );
  assert(
    !fs.existsSync(releaseShots) ||
      fs.readdirSync(releaseShots).filter(name => /\.png$/.test(name)).length ===
        0,
    'old PocketPal store screenshots remain in release metadata',
  );
};

const checkPlatformResources = () => {
  const manifest = read('android/app/src/main/AndroidManifest.xml');
  assert(manifest.includes('android:icon="@mipmap/tars_launcher"'), 'old Android icon active');
  assert(
    manifest.includes('android:roundIcon="@mipmap/tars_launcher_round"'),
    'old round icon active',
  );
  for (const density of ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi']) {
    for (const suffix of ['', '_round']) {
      verifyBlob(
        `android/app/src/main/res/mipmap-${density}/ic_launcher${suffix}.png`,
        '87b659ce9cbeea46398f06f08d2ec2a7abfb5ce7',
      );
    }
  }
  verifyBlob(
    'android/app/src/main/res/drawable/ic_launcher_foreground.xml',
    '3fb13af55d9340b8bcdd1e53407c06b4a4b7dffc',
  );
  verifyBlob(
    'android/app/src/main/res/drawable/ic_launcher_monochrome.xml',
    'e4fc434e07e2267389beb87fcc367659179fa0c2',
  );

  for (const folder of ['main', 'prod']) {
    const prefix = `android/app/src/${folder}/res/`;
    assert(
      fs.existsSync(path.join(root, prefix + 'drawable/tars_launcher_foreground.xml')),
      'missing TARS foreground for ' + folder,
    );
    assert(
      fs.existsSync(path.join(root, prefix + 'drawable/tars_launcher_monochrome.xml')),
      'missing monochrome icon for ' + folder,
    );
    assert(
      !read(prefix + 'drawable/tars_launcher_monochrome.xml').includes(
        'android:fillColor="none"',
      ),
      'invalid vector fill reintroduced in ' + folder,
    );
  }
};

const audit = () => {
  const passes = [
    ['native app registration', checkRegistration],
    ['first-run screens & profiles', checkFirstRun],
    ['visible copy and release text', checkText],
    ['bundled graphics and screenshot assets', checkImages],
    ['Android/iOS platform resources', checkPlatformResources],
  ];
  for (const [name, fn] of passes) {
    fn();
    console.log('PASS: ' + name);
  }
  return passes.length;
};

if (require.main === module) {
  audit();
}

module.exports = {audit};
