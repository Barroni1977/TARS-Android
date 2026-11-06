# TARS-AI — Full-screen animated boot

## Updated 2026-11-06

This standalone work branch **does not start any GitHub Actions build** and
does not create a pull request. An APK is built only after explicit approval.

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
