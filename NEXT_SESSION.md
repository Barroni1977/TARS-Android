# TARS-AI — NEXT SESSION HANDOVER

**Last checked:** 2026-11-06 (UK time)  
**Status:** PAUSED at user's request. **Do not start work, merge, or build an APK until the user explicitly asks.**  
**Working branch:** `feature/tars-onboarding-debrand-no-build`  
**Branch HEAD before this handover:** `54e419719e47d65d57098a7bb481a0464a3ec0e8`  
**Repository:** https://github.com/Barroni1977/TARS-Android

## Read this first

The user is building a **local-first TARS-AI app for their Samsung Galaxy S26 Ultra**, based on PocketPal's open-source code, with a distinctive metallic TARS interface. They explicitly clarified that the current objective is **complete DEBRANDING, not debloating**. They want all *user-visible* PocketPal/Pals mascot/promotional identity replaced with TARS-AI, including onboarding, UI text, assets, translations, icons, About/settings and ancillary screens. They requested a five-pass review of the whole repository, including image assets, and progress updates while working.

**Rules from the user:**
- Preserve the exact already-approved TARS startup artwork and working animation. Do not redesign or regenerate it.
- Preserve local model inference, model downloading, chats, settings, working navigation and existing data.
- Do not casually rename native packages, module identifiers, persistent database keys, third-party dependencies or test IDs; these may require migrations.
- Preserve copyright/licence/third-party attribution, including honest references to upstream PocketPal where legally or contextually necessary. Third-party services such as PalsHub may be named accurately as external services.
- **NO APK BUILD until the user says “build”.** Avoid merging into `main` or opening a PR that triggers full Android CI.
- Most recent explicit instruction was to **stop**, followed by a request to save this note. Resume only when asked.

## Known-good earlier Android preview

- Approved portrait startup PNG at `android/app/src/prod/res/drawable-nodpi/tars_boot_approved.png` (941 × 1672).
- Startup overlay at `src/components/TarsApprovedArtOverlay.tsx`; boot at `src/components/TarsBootScreen.tsx`. Green diagnostics and waveform, scanning line, animated 16-cell INITIALISING bar, 2.5-second/tap-to-skip sequence.
- User installed an earlier Android preview and **confirmed the loading screen and main UI looked good**.
- Earlier successful Android artifact: https://github.com/Barroni1977/TARS-Android/actions/runs/42271176280/artifacts/13537155084 . This artifact **does not** include the newer debranding branch changes.
- Earlier image/animation branch: `feature/tars-approved-startup-art-no-build`; draft PR #5 is against `main`, but is **not** the newer debranding branch. Do not confuse them.

## Newer debranding work already committed to current branch

- Four first-run welcome pages refactored to `TarsOnboardingIntro` and `TarsOnboardingHero`: metal, signal-green readouts, amber accent, no cartoon Pals.
- TARS-styled first-run stepper, dark control styles, topic selection and offline model-selection layout, while preserving functional onboarding handlers and registration/download behavior.
- English labels updated to TARS-AI and generic `Pal/Pals` copy renamed `Profile/Profiles`; README and store metadata updated for TARS identity with appropriate upstream attribution.
- All 16 non-English locales reviewed for legacy first-run branding. Stale translated onboarding overrides removed where necessary, so *new English TARS copy falls back for those messages* pending verified translations. **Do not describe these pages as fully translated.**
- Retired onboarding mascot import/export removed; legacy icon generator guarded to avoid replacing production TARS icon; old image references inventoried rather than deleted indiscriminately.
- Audit scripts and no-APK GitHub Actions workflow present: `scripts/audit-tars-branding.js` and `.github/workflows/tars-brand-audit.yml`.
- Further detail: `docs/TARS_ONBOARDING.md`, `docs/TARS_BOOT.md`, and recent branch commits.

## Very important latest CI state — NOT FULLY GREEN

The most recent **no-APK** audit run on this branch is:
https://github.com/Barroni1977/TARS-Android/actions/runs/42304249707

- Overall run conclusion: **failure**.
- The job's failed step was **Unit tests (no native build)**, step 12.
- The output nevertheless says **438/438 Jest suites passed**, **8,865 tests passed**, **2 skipped**, **310 snapshots passed**, then `yarn test --runInBand` exited with code 1. **Investigate why** (e.g., process exit, async teardown, coverage or another non-test exit condition); do not declare a clean pass based on suite counts alone.
- Prior steps in that job reportedly passed, but inspect the current run details again rather than assume.
- No APK was built by this workflow; it explicitly runs JavaScript checks only.
- Several earlier no-APK audit runs also failed while formatting, asset references, translations and legacy tests were being corrected.

## Next session: exact suggested sequence

1. **Confirm GitHub HEAD** on `feature/tars-onboarding-debrand-no-build` and read latest run logs/commit diff first. Another commit or audit run may have happened after this note.
2. **Resolve the nonzero Jest exit** in the latest no-APK audit run, without triggering Android builds. Inspect log end and workflow command. Make targeted, regression-safe fixes.
3. **Complete five-part debranding review**:
   - User-visible text across all screens and locale values (not schema/property names).
   - Screens/components, first-run/model-picker/menus/Settings/About/error dialogs, including dynamic hardcoded copy.
   - Images/SVGs/bitmaps, app icons, splash and old screenshot archives; distinguish bundled/live assets from unused historical docs. Remove/replace only confidently unused upstream-brand imagery.
   - Android production resources, app title/launchers/notification labels; iOS assets only with migration awareness.
   - Automated auditing and regression checks on *current branch* after fixing any findings.
4. Check upstream URLs visible in About (currently explains they are upstream policies; do not misrepresent upstream privacy policies as TARS's own), feedback routing and other optional external branding. No functionality removal without user approval; debranding is **not** a request to debloat.
5. Confirm all new TARS screens are visually consistent on Galaxy S26 Ultra when the user next requests an APK. Existing boot art must remain unchanged.
6. Provide a concise progress report distinguishing **code committed**, **checks passed**, **checks failed/pending**, **visual testing pending**. Only start a build when explicitly asked.

## Essential technical pointers

- Root README and `src/locales/en.json` contain visible product copy.
- `src/screens/OnboardingScreens/` includes TARS intro and retained onboarding model selection.
- `src/store/onboarding/onboardingPals.ts` and persisted `pal` identifiers are **internal compatibility constructs**; wholesale rename is unsafe.
- Native Android paths such as `com.pocketpal` / `com.pocketpalai`, iOS PocketPal project names and dependencies such as `@pocketpalai/react-native-speech` are also **not user-facing branding** and should not be renamed blindly.
- `LICENSE`, open-source notices, dependencies and upstream acknowledgments must remain accurate.
- Project's Android app ID for preview: `com.barroni1977.tarsai.preview`, intended to install separately.
- The current no-APK audit workflow automatically runs on **pushes to this branch** (including this note-only commit). It does **not** compile an APK. Re-check current run status on resume; don't accidentally merge/open a PR.
- The user explicitly said **“Let's stop for now”** before requesting the handover, so stop after verifying this file's commit.

## Resume phrase

When the user says **“Continue TARS”**, start from this file and the current GitHub branch, inspect current audit status, then continue the unfinished debranding verification. Do not ask the user to re-explain the project.
