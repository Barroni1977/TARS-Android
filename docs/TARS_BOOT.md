# TARS-AI — Full-screen animated boot

## Clean approved startup artwork — 2026-11-06 (no APK build)

The exact clean artwork approved for animation is now **bundled** on the
`feature/tars-approved-startup-art-no-build` branch as:

`android/app/src/prod/res/drawable-nodpi/tars_boot_approved.png`

- Dimensions: 941 × 1672 PNG (portrait, `drawable-nodpi` so Android does
  not apply an additional density scaling).
- Git blob SHA: `ceddbe5704fc1a3f63e5a78b3bc1d20fc3d90bb4`.
- SHA-256: `0cc6b52856ec84f7a7de0a5a3dea55c542988d4facd34147ed1024ced0133e40`.
- The image is intentionally **blank** inside the green diagnostic screen
  and has an **empty**, outlined loading bar. The TARS AI amber brand mark,
  metalwork, corners and panel borders are part of the PNG and remain untouched.
- The uploaded GitHub temporary filename was corrected using the exact
  existing Git blob; there was no re-encoding or change to image bytes.

### Animated live overlays

`src/components/TarsApprovedArtOverlay.tsx` renders *inside the artwork
coordinates* and restores the decorative display content that was removed
from the image:

- HUMOUR 90%, HONESTY 95%, SARCASM 85%.
- Green centre divider and LOCAL CORE / READY, VOICE SYSTEM / STANDBY,
  MEMORY CHECK / NOMINAL.
- Ten moving green waveform bars in the top-right of the display.
- Subtle moving scanline limited to the green display.
- INITIALISING text above the existing outlined loading bar.
- A 16-segment bar that fills 0–100% inside the original image outline.

The annotated layout anchors are measured in the 941 × 1672 artwork:
waveform `x=516,y=324,w=132,h=46`; loading-bar **interior**
`x=267,y=1275,w=415,h=24`. In particular, do **not** place the fill
at the previous y=1291 or y=1257, both of which were wrong for this PNG.

All coordinates scale with the source image to avoid distortion and do not
move relative to the graphic when the device changes width. The image is
contained rather than cropped. The terminal readouts are **decorative**; they
must not be interpreted as live AI readiness or health checks.

`src/components/TarsBootScreen.tsx` retains the Android picture-loading
fallback, the 2.5-second timed sequence, tap-to-skip and Reduce Motion
handling. The original native view remains the fallback on iOS or if the
Android image fails to load.

### Verification and safety

- `scripts/__tests__/tars-boot-approved-art.test.js` verifies the binary
  file, size, dimensions and SHA-256.
- `src/components/__tests__/TarsApprovedArtOverlay.test.tsx` verifies
  diagnostic text and placement, including the corrected bar coordinates.
- Android 17 Galaxy S26 Ultra **on-device alignment is still unverified**.
  Run lint, TypeScript, Jest and Android visual checks *only when a build
  is approved*. Do not claim device testing before it has happened.
- This is a development-only branch with no PR to `main`, and no
  GitHub Actions build has been requested.

## Updated 2026-11-06

This standalone work branch **does not start any GitHub Actions build** and
does not create a pull request. An APK is built only after explicit approval.

### Animation polish added 2026-11-06

- Boot waveform now oscillates while the decorative CRT scanline sweeps the terminal.
- The empty-chat Command Deck now fades and rises into view over 550 ms.
- The Command Deck status indicator pulses **only** while the real local model context is loading; it does not imply that audio capture or inference is running.
- Android's Reduce Motion accessibility preference disables decorative TARS animations while preserving the app's underlying interactions.
- When the presentation finishes, the label reads `INTERFACE INITIALISED` rather than claiming that the model is `SYSTEM READY`.
- Added a regression test to catch old product names and `co-pilot` branding in all translated user-facing copy.
- No GitHub Actions run or APK build is requested by this set of changes.

### Behaviour now implemented

- An immersive **full-screen** metal-monolith boot interface, with the
  Android status bar hidden while booting.
- **2.5 second** timed presentation, with tap anywhere to skip immediately.
- Simulated green diagnostic readouts and a pulsing waveform; these are
  decorative and never claim that model inference, microphone or network
  connections are actually running.
- **TARS AI** glows amber in a horizontal central identity plaque.
- A segmented `INITIALISING` progress bar animates smoothly before the app
  transitions to the existing chat interface.
- No `OFFLINE CO-PILOT` slogan.
- Existing working local GGUF model engine, conversations and model downloads
  remain unchanged.

### Visual artwork parity

The approved clean bitmap is now bundled and animated overlays use its
measured coordinates. This replaces the earlier approximation built from
React Native gradient panels. Final visual parity must still be checked
on-device, particularly the waveform and the bar's border alignment.

### Brand cleanup

Visible translations in `src/locales/` now use **TARS-AI**, including the
English welcome screens and camera prompts. The empty video placeholder
uses the new original TARS mark rather than the previous project logo.
The About screen identifies TARS AI independently and its GitHub button
points to the TARS fork.

Original open-source licence and third-party credits are preserved, as
required by the upstream MIT licence. Links to upstream privacy/terms
are identified as **upstream policies**, not as TARS-AI policies.
Third-party paid services are labelled as upstream subscriptions rather
than falsely renamed as services operated by TARS-AI.

### Validation required before APK

- ESLint / Prettier, TypeScript, locale-validator and Jest tests.
- Android 17 / Samsung Galaxy S26 Ultra visual verification.
- Test Android dark/light mode, device rotation, text scaling and TalkBack.
- Confirm no clipped text at any supported phone width and that tap-to-skip
  immediately reveals the working application.
- Integrate the approved high-resolution bitmap before final visual signoff.
- Never uninstall the existing original TARS installation merely to test a
  preview with a new ephemeral CI signing key.

### Source

- `src/components/TarsBootScreen.tsx` — visual sequence and tap target.
- `App.tsx` — visibility duration, status bar and dismissal.
- `src/components/__tests__/TarsBootScreen.test.tsx` — basic UI behaviour.
