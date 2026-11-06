#!/usr/bin/env node
/**
 * Five independent TARS-AI brand checks. Read-only: no files modified.
 * Run: node scripts/audit-tars-branding.js
 *
 * Report residual upstream identifiers separately from user-visible branding:
 * vendor package names, persisted keys, licence credits and external services
 * cannot be removed by a naive search/replace.
 */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const exists = p => fs.existsSync(path.join(root, p));
const walk = dir => {
  if (!exists(dir)) return [];
  return fs.readdirSync(path.join(root, dir), {withFileTypes: true})
    .flatMap(entry => {
      const p = path.posix.join(dir, entry.name);
      return entry.isDirectory() ? walk(p) : [p];
    });
};
const failures = [];
const observations = [];
const pass = (label, ok, message) => {
  (ok ? observations : failures).push(`${label}: ${message}`);
};
const includes = (p, needle) => exists(p) && read(p).includes(needle);

// PASS 1: first-run copy and local-first claims
const en = JSON.parse(read('src/locales/en.json'));
const intro = [1, 2, 3, 4].map(i => en.onboarding[`screen${i}`]);
const introCopy = intro.map(x => [x.title, x.body, x.eyebrow, x.cta].join(' ')).join(' ');
pass('1 / Copy', !/pocketpal|meet your pals|nothing leaves your phone|no tracking/i.test(introCopy),
  'first-run screens contain no old marketing or unconditional privacy guarantees');
pass('1 / Copy', /after downloading a model/i.test(en.onboarding.screen2.body),
  'offline operation correctly requires a downloaded model');
// Examine translated user-visible VALUES, not JSON schema keys such as
// onboarding.screen6.pal or palSheet, which are compatibility identifiers.
const visibleStrings = obj => {
  if (typeof obj === 'string') return [obj];
  if (!obj || typeof obj !== 'object') return [];
  return Object.values(obj).flatMap(visibleStrings);
};
const visibleEnglish = visibleStrings(en).map(x => x.replace(/PalsHub/gi, '')).join(' ');
pass('1 / Copy', !/\\bpal(s)?\\b/i.test(visibleEnglish),
  'English interface values contain no generic pal/pals copy');
for (const lang of [
  'ar', 'es', 'fa', 'he', 'id', 'ja', 'ko', 'ms', 'pl', 'pt',
  'pt_BR', 'ru', 'uk', 'zh', 'zh_Hant', 'de',
]) {
  const translated = JSON.parse(read(`src/locales/${lang}.json`));
  pass('1 / Locales', [1, 2, 3, 4].every(i =>
    !Object.prototype.hasOwnProperty.call(translated.onboarding || {}, `screen${i}`)),
  `${lang} uses updated TARS introduction instead of stale PocketPal translations`);
}

// PASS 2: screen components, startup, navigation and model picker
for (const n of [1, 2, 3, 4]) {
  const p = n < 3
    ? `src/screens/OnboardingScreens/Onboarding${n}Screen.tsx`
    : `src/screens/OnboardingScreens/Onboarding${n}Screen/Onboarding${n}Screen.tsx`;
  pass('2 / Screens', includes(p, `<TarsOnboardingIntro step={${n}} />`),
    `intro page ${n} uses the TARS view`);
}
pass('2 / Screens', includes('src/screens/OnboardingScreens/Onboarding6Screen/Onboarding6Screen.tsx',
  '<TarsOnboardingHero variant="model" compact />'), 'model selection uses TARS hardware art');
pass('2 / Screens', includes('src/screens/OnboardingScreens/SplashScreen/SplashScreen.tsx',
  '<TarsBrandMark size={112} />'), 'splash uses the TARS mark');

// PASS 3: image and icon resources (including unused upstream archive)
const images = ['src/assets', 'assets', 'android/app/src/main/res',
  'android/app/src/prod/res', 'fastlane/metadata'].flatMap(walk)
  .filter(p => /\.(svg|png|webp|jpg|jpeg|gif|xml)$/i.test(p));
const legacyNamed = images.filter(p => /pocketpal|pals-ai/i.test(p));
observations.push(`3 / Assets: scanned ${images.length} image/vector/resource paths`);
if (legacyNamed.length) observations.push(
  `3 / Assets: ${legacyNamed.length} upstream-named archive files require manual usage/visual review: ${legacyNamed.join(', ')}`);
pass('3 / Assets', exists('android/app/src/prod/res/drawable-nodpi/tars_boot_approved.png'),
  'approved Android startup PNG exists');

// PASS 4: Android production identity and launcher
const prod = read('android/app/src/prod/AndroidManifest.xml');
const gradle = read('android/app/build.gradle');
pass('4 / Android', /tars_launcher/.test(prod), 'prod manifest uses TARS launcher icon');
pass('4 / Android', /com\.barroni1977\.tarsai\.preview/.test(gradle),
  'preview package stays isolated from the original installation');
pass('4 / Android', includes('android/app/src/main/res/values/strings.xml',
  'TARS AI Preview'), 'Android app label is TARS');
pass('4 / Android', !/android:fillColor="none"/.test(
  read('android/app/src/prod/res/drawable/tars_launcher_monochrome.xml')),
  'Android vector icon uses valid fills');

// PASS 5: repository branding, attribution and compatibility boundaries
const readme = read('README.md');
pass('5 / Repository', readme.startsWith('# TARS-AI'), 'repository introduction uses TARS');
pass('5 / Repository', /based on|fork|PocketPal AI/i.test(readme),
  'upstream open-source attribution is retained');
pass('5 / Repository', JSON.parse(read('app.json')).displayName === 'TARS AI',
  'React Native displayName is TARS AI');
observations.push('5 / Repository: native registration names, dependency names, persisted IDs, ' +
  'historical screenshots and third-party licences require a separate compatibility audit');

for (const msg of observations) console.log('INFO ' + msg);
for (const msg of failures) console.error('FAIL ' + msg);
console.log(`TARS branding audit: ${failures.length} failures across five passes`);
if (failures.length) process.exitCode = 1;
