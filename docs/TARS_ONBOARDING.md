# TARS-AI first-run onboarding redesign

## What changed

The four inherited PocketPal illustrated welcome screens now render one shared
TARS-AI activation view backed by original native React Native artwork, not
external images or copied mascots. The existing 941 × 1672 TARS startup PNG,
startup waveform, progress bar and command-deck implementation are unchanged.

- **1 / System Setup:** introduce the TARS-AI local assistant and explain that
  downloading a model is required before offline text inference.
- **2 / Local Core:** explain which part of the app works without internet after
  a model is downloaded and distinguish optional online features.
- **3 / Model Control:** explain speed/capability, memory/storage and limits.
- **4 / User Control:** local-first privacy explanation without blanket claims
  such as "No tracking" or "Nothing leaves your phone".
- **5 / Choose Your Mission:** existing selection logic and topic IDs remain,
  but labels and cards now match the TARS styling.
- **6 / AI Core:** the existing local model picker still performs the real
  download/register operation; its visible mascot and headings now use TARS
  branding. Internal `pip/codie/sage/echo/muse` topic keys are intentionally
  preserved to avoid disrupting stored profiles, downloads and E2E tests.

Colors and shapes follow the approved boot artwork: black/gunmetal panels,
signal-green diagnostics and amber indicator accents. Intro panel content is
decorative; it does **not** claim a model is actually loaded.

## Behaviour intentionally preserved

- Step navigation, skip/back buttons, existing screen and model test IDs.
- Device storage/RAM checks, model selection, downloads and conversations.
- First-run-only onboarding and subsequent restart bypass.
- External provider credentials, licence notices and upstream attribution.

## Rebranding boundary

Visible generic "Pals" navigation labels have been changed to "AI Profiles".
The distinct, optional **PalsHub** service keeps its original name and is
identified as external. Internal Java/Kotlin package identifiers, vendor
libraries and persisted IDs are not blindly renamed: doing so could break
backwards compatibility or erase existing data. A separate compatibility and
data-migration plan is required before deeper code or product-feature removal.

## Verification still needed

- Run `yarn lint`, `yarn typecheck` and the Jest suites.
- Run the existing first-run E2E onboarding journey for steps 1–6, including
  topic choice, model selection, skip and restart.
- Check Android font rendering, dark system status bar, button access and
  layout on Galaxy S26 Ultra before release.
- This **no-build** branch has no PR and should not produce an APK until
  explicitly requested.
