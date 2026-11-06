# TARS-AI — Full-screen animated boot

## Exact approved artwork integration — 2026-11-06 (no build)

**Artwork policy:** Preserve the exact approved portrait image. Do not regenerate,
redraw, relabel, crop or recolour the metal panels, text or amber TARS AI logo.
The image is 941 × 1672 pixels, SHA-256:
`20354469f090bd470c0a37cf947ee527e3e7b6d689573ed5a7bef9823737877b`.

This branch provides an Android drawable-based **image-backed boot** plus
a separate animated overlay in `src/components/TarsApprovedArtOverlay.tsx`.
The aspect ratio is preserved and the image is fully contained on the screen.

To finish this integration, **upload the original, unmodified binary image** to:

`android/app/src/prod/res/drawable-nodpi/tars_boot_approved.png`

That file is not included in this source-only commit, because the available
GitHub code-writing connection cannot transfer the original image bytes.
The reserved folder already exists. Until the image is uploaded, Android
automatically falls back to the previously implemented boot artwork.

### Precisely positioned animations

- Green display: a moving, subtle scanline across the existing diagnostics,
  and a 10-bar oscillating waveform in the exact original waveform area.
- Initialising: an independent 16-cell progress bar empties and refills over
  the image's existing progress-track area, leaving the green outline intact.
- All other artwork is drawn from the original bitmap, not reconstructed.
- Both animations respect Android Reduce Motion and do not simulate model
  readiness. The image's decorative text is not a live telemetry report.
- The existing tap-to-skip control and 2.5-second startup remain unchanged.

### Validation and change policy

No CI/APK build is triggered from this standalone branch; the workflow runs
on pull requests to `main` or pushes to `main`, neither of which we performed.
Do not open a pull request or trigger a build until the user says **build**.
After bundling the bitmap, verify the full composition and overlay alignment
on the user's Galaxy S26 Ultra; the proportions have not yet been device-tested.

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

The approved portrait reference image is available in this conversation,
but is **not** yet packaged as an image asset inside the GitHub repository.
The newly committed React Native layout animates the approved composition
using native gradient panels and text. It is not a pixel-identical raster
reproduction. Adding the exact approved art as an offline bundled image and
layering the live progress/waveform over it is still an outstanding artwork
integration step.

We must not claim exact image parity before that asset is shipped.

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
