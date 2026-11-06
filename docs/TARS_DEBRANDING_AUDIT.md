# TARS-AI full debranding — five-pass review

## Goal

Remove inherited user-facing PocketPal identity from the independent TARS-AI
application without touching the approved TARS startup illustration, saved
models, chat history, legal attribution, third-party package contracts or
existing persisted data IDs.

This source-only branch does **not** trigger an APK build and does not modify
`main`. Validation of the source alone is not a substitute for executing
the Android, iOS, Jest, TypeScript and on-device test suites.

## Pass 1 — display copy and navigation

The four illustrated welcome screens now display TARS diagnostic artwork.
The English localisation uses "AI profiles", not "pals"; model selection
retains its working download path. The About page uses local-first, conditional
privacy descriptions and links feedback to the TARS-AI GitHub issues instead
of sending it to upstream's feedback service.

## Pass 2 — runtime screens and default profiles

New default profiles are **TARS**, **TARS / CODE**, **TARS / LEARN**,
**TARS / STORY**, **TARS / WRITE** and **TARS / VISION**.
Existing unmodified legacy profiles are migrated **without changing their
database IDs or model bindings**. User-customised prompts/names are preserved,
and migration can safely retry. Internal keys `pip` and `Lookie` are kept
where needed for compatibility and tests.

## Pass 3 — images and icons

Original Android TARS vector resources and new TARS raster assets are used for
the active/fallback launchers; the three iOS AppIcon images and the store icon
also use the original TARS emblem design. Inherited fallback splash mascot
images and the old GIF no longer display old branding. The six upstream
release screenshots were removed. Historical marketing assets moved to
`docs/upstream-legacy-media/` and are labelled as archive-only.

The **approved 941 × 1672 startup image** remains exactly unchanged:
Git blob `ceddbe5704fc1a3f63e5a78b3bc1d20fc3d90bb4`. Its animated
overlay component also remains untouched.

## Pass 4 — platform, app metadata, release and documents

The React Native registration and Android/iOS native module entry point
all use `TarsAI`. iOS native app label and launch screen now display TARS-AI.
The README and future store metadata describe the TARS project truthfully,
rather than linking to upstream's app store listing.

Not all native source identifiers can safely be changed: `com.pocketpal`,
`ios/PocketPal`, `pocketpal` deep-link schemes, third-party
`@pocketpalai/*` packages, `pocketpalai.db`, stored preference keys,
vendor names, source licences and upstream acknowledgements remain where
changing them would break compatibility, attribution or user data. These
internal names must not be confused with user-visible TARS branding.

## Pass 5 — automated and manual verification

A five-part audit is committed at `scripts/audit-tars-branding.js` and
run as a Jest test in
`scripts/__tests__/tars-five-pass-branding.test.js`.
Invoke `yarn audit:branding` to check identity, first-run screens, English
strings, original image checksums and platform launcher resources.

Static GitHub checks were performed, but **no Jest, TypeScript, lint,
Android resource compilation, installation or iOS signing checks were run**
as part of this no-build request.

### Verification needed before marking complete

1. Run five-pass branding audit and the full lint, TypeScript and unit tests.
2. Build Android only after explicit approval, inspecting any CI failures.
3. Review fresh-install onboarding, the original 2.5 second animated startup,
   chat, model downloads, vision, voice, model import and conversations.
4. Confirm existing preview installation retains its model files/history.
5. Capture fresh TARS-AI store screenshots only after on-device validation.

Some translations in non-English locale files still use historical translated
terminology. A separate localisation review is needed before releasing
multi-language TARS-AI. The upstream external marketplace name **PalsHub**
must remain attributed properly while its optional functionality exists.
