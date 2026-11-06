# TARS-AI — next-session handover

**Last updated:** 2026-11-06 (UK time)  
**Owner request:** Stop work for now. Continue only when asked.  
**Resume phrase:** "Continue TARS".

## Where to work

- **Repository:** https://github.com/Barroni1977/TARS-Android
- **Active development branch:** `feature/tars-onboarding-debrand-no-build`
- **Head before this handover note:** `54e419719e47d65d57098a7bb481a0464a3ec0e8`
- **Earlier working preview branch:** `feature/tars-approved-startup-art-no-build`
- **Existing preview PR:** #5 is for the *earlier* startup-art branch, **not** these newer debranding changes.
- **Main branch:** do not merge to main without the user's explicit go-ahead.

**Hard rule:** DO NOT start an Android APK build or merge a PR until the user
specifically says **"build"** or approves the action. Changes should remain
on a separate feature branch. Do not overwrite the working installation,
delete models or user data, or alter signing/application ID casually.

## Product and style decisions

We are building a local-first Android AI assistant named **TARS-AI**, primarily
for a Samsung Galaxy S26 Ultra, using PocketPal AI open-source foundations.

- The user approved the metallic **TARS-AI** visual design and instructed us
  not to change its appearance. Dark gunmetal with green system text, amber
  branding and original monolith-like machinery.
- Startup animation includes the green waveform and segmented
  **INITIALISING** progress bar, approximately 2.5 seconds, full-screen.
- Original approved PNG:
  `android/app/src/prod/res/drawable-nodpi/tars_boot_approved.png`
  (941 × 1672). Preserve its original pixels.
- Current Android preview ID `com.barroni1977.tarsai.preview` is intentionally
  different from the earlier installed TARS version. CI preview signing keys
  are temporary: do not assume upgrades can install over older APKs.
- **Primary task now is total *visible debranding*, not debloating.**
  User clarified that "defraud" meant "debrand". Do not remove cloud/
  marketplace features or native libraries as part of this task; assess
  debloating separately with user approval.
- Preserve third-party licence credits, named external integrations and true
  descriptions of online data transfers. Do not claim all functionality is
  offline. Do not blindly rename native namespaces, persistence keys, bridge
  identifiers or vendor package names.

## Changes made and saved

- Working previous APK: GitHub Actions
  https://github.com/Barroni1977/TARS-Android/actions/runs/42271176280
  produced an `android-release-apk` artifact; its Android build succeeded,
  although the overall workflow ended unsuccessfully due to iOS cancellation.
  The user confirmed **the loading screen and main UI looked good**.
- First-run PocketPal welcome illustrations replaced with native
  TARS diagnostic panels:
  `TarsOnboardingHero.tsx`, `TarsOnboardingIntro.tsx`,
  `TarsOnboardingStepper.tsx`.
- Screens 1–4 redesigned; screens 5–6 (mission and model selection) restyled,
  retaining existing model selection/download/back/skip functionality.
- English labels changed from generic Pal/Pals to Profile/Profiles where
  appropriate. `README.md` and some store metadata now show TARS-AI
  descriptions, with upstream attribution kept.
- Language audit: 16 other locale files' outdated first-run marketing/profile
  overrides were removed, intentionally falling back to accurate English
  onboarding text until translations can be verified. Do not call the
  onboarding translated into all languages.
- Old mascot icon generator guarded so it cannot overwrite approved TARS
  production assets. A legacy asset reference inventory was introduced.
- Main audit script: `scripts/audit-tars-branding.js`, five areas (copy,
  screen wiring, assets, Android resources, repository/attribution).
- Supporting documentation:
  `docs/TARS_BOOT.md`, `docs/TARS_ONBOARDING.md`,
  `docs/TARS_PREVIEW_BUILD.md`, `docs/TARS_UI_BLUEPRINT.md`.
- Last changes before the pause included adapting 11 old onboarding/profile
  copy test assertions to the new visible branding.

## Current verification status — do not overclaim

There **has been no APK built from the new debranding branch**.

No-APK CI was started for that branch. The most recent run examined was
https://github.com/Barroni1977/TARS-Android/actions/runs/42304249707 .
It shows **failure** at `Unit tests (no native build)`, yet the final Jest
summary reports **438 suites passed, 8,865 tests passed, 2 skipped, 310
snapshots passed**. The process nevertheless exits with code 1: **root cause
not yet determined**; inspect CI configuration and complete logs, including
potential coverage/reporting/cleanup issues, before claiming success.

The five-pass audit script exists, but a *complete, certified* five-pass
branding clearance and Android device visual check have **not** been
confirmed. Do not describe the whole repo as 100% debranded.

## Next steps (in order)

1. **Check GitHub branch/head and logs again** in case anything changed since
   this note. Determine why the latest no-APK Jest step returned code 1 despite
   all tests passing; fix only the relevant issue.
2. **Five-pass visible branding audit:** inspect UI strings and React
   components; image/vector assets and usages; Android launcher/splash/
   notifications; every supported locale; README, store screenshots,
   metadata, icons, app name, Settings and About. Distinguish live bundled
   assets from historical documentation and unused archive files.
3. **Review all image references** before renaming/removing old graphics.
   Never delete an upstream asset without checking where it is imported.
   For binary assets and launcher resources, verify they render correctly.
4. **Audit and improve non-English strings** with accurate translations where
   possible, rather than leaving inconsistent legacy PocketPal copy.
5. **Safety checks:** retain online-provider names/credits, licence notices,
   persisted local data, backend GGUF/inference/downloads, accessible
   navigation, and the approved boot artwork. Avoid unverified absolute
   privacy promises.
6. Run audit, `yarn lint`, `yarn typecheck`, localisation checks and
   relevant unit tests through a **no-APK** workflow or local setup.
   Repair failures, keep detailed evidence, and do not trigger an Android
   release build without permission.
7. Show the user a precise list of changes and any remaining blockers. Ask
   before creating a PR that would trigger an APK build, merging, or running
   Android compilation. When authorized to build, verify the APK artifact and
   perform real-device visual checks including first-run screens.

## User communication

Be informal, accurate and concise; give progress updates during lengthy
work. The user wants a thorough audit ("check 5 times"), not an unsupported
claim. The user also explicitly asked us to **stop for now**, and this note is
the only change requested for the current turn.
