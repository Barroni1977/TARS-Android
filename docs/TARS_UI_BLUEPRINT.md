# TARS AI — Interface Blueprint v1

Design status: working specification for the independent Android assistant.
This is **original** TARS-inspired industrial design, not film artwork, a clone
of a screen from *Interstellar*, or a copy of an actor's voice.

## Intent

Create a visually striking *useful* on-device companion: quiet confidence,
black alloy panels, precise amber controls, green local-engine telemetry.
Avoid fake holograms, excessive glow, tiny unreadable text and permanent
animation that wastes battery. The chat and model engine must work unchanged.

### Design tokens

| Role | Colour | Use |
| --- | --- | --- |
| Void | `#080B0D` | app background |
| Charcoal | `#11171B` | cards and console modules |
| Alloy | `#1D272B` | raised panels |
| Border | `#354247` | restrained structural outlines |
| Warm amber | `#F4AF5E` | focus, labels and identity |
| Pale ivory | `#EFF2EE` | reading text |
| Muted slate | `#A6B3B6` | secondary information |
| Signal green | `#8FDCB2` | **verified** operational status |
| Warning | `#F5B76B` | attention, not failure |
| Error | `#FF7E75` | errors only |

Use existing Inter for legibility; bundled monospace only for short telemetry.
Cards use 8–12 dp radii; identity panels use 2–4 dp. 1 dp dividers, 12–20 dp
inner spacing, 44 dp minimum interactive targets, native scaling, screen-reader
labels and safe-area insets. Never encode state with colour alone.

## Screens

### 01 / Command Deck (chat empty state)

- `TARS AI` wordmark at 38–44sp with small `PERSONAL / LOCAL INTELLIGENCE`.
- Reusable metal-module emblem, not copyrighted frame art.
- Left vertical amber rail; right restrained schematic stripes.
- Live model status only from `modelStore`: **MODEL SELECTED** only when
  `activeModelId` is set; **INITIALISING** only while context is loading;
  otherwise **AWAITING MODEL**. Don't claim a model is running solely
  because the app has opened.
- Model name in a one-line truncating chip.
- One primary action when no model is active: `Choose model` / `Activate`.
  When a model is selected, the existing chat composer remains the CTA.
- Don't show fictional CPU, network, microphone or storage telemetry.
- New empty chat only: never place the command deck over a conversation.

### 02 / Chat Console

- Header with TARS identity, current conversation and selected model.
- Reading-first transcript, not giant rectangular text bubbles or dense
  animation. Assistant replies on dark background with a slim amber signal
  rail; user text in raised dark cards.
- Existing copy, regenerate, markdown, streaming, image, TTS and attachments
  remain functional. No fetching or cloud dependency introduced.
- Input retains native keyboard/safe-area handling and minimum 44 dp controls.
- Long answers must be comfortably readable (at least 15–16sp).

### 03 / Core Models

- Display selected/installed model prominently, grouped from modelStore.
- Keep GGUF download/import/activation/progress/error and remote-server
  features wired exactly as they currently work.
- A model state must reflect real download and load status, not decorative
  green check marks.

### 04 / Systems Settings

- Top-level groups: Behaviour (future), Voice, Local Core, Device,
  Privacy/Online Integrations, About.
- Avoid adding nonfunctional humour/honesty/sarcasm sliders until their values
  are persisted and applied to the system prompt at conversation start.
- Preserve original settings underneath during phased redesign.
- Online/remote options must be clearly labelled as non-offline.

### 05 / Voice Console

- Small microphone and audio states, not a continuous fake voice waveform.
- Use the existing ASR/TTS engine initially; label voice output only when
  a voice engine is installed and selected.
- Speech engine, capture permission, mute, cancel and barge-in must be explicit.
- Voice timbre must be original, not actor audio or extracted movie lines.

### 06 / Navigation and About

- Drawer branded as `TARS AI // COMMAND SYSTEM`; navigation routes preserved.
- About credited as a modified PocketPal AI fork; preserve MIT licence and
  all third-party notices, with clear source links.
- No PocketPal terms/privacy links presented as policies for TARS AI.
- Do not send analytics, feedback or account information to a different
  service while implying the assistant is universally offline.

### 07 / Launch and Icon

- React Native boot is a 2.5 s decorative animation; it does not assert model readiness.
- The command deck has a short entrance animation and a loading-only status pulse.
- Respect Android Reduce Motion; static visuals remain fully readable.
- Android's initial native frame remains static black by design.
- Adaptive icon: original alloy/amber emblem with safe inset; planned
  raster launcher replacements remain separate until approved artwork
  can be imported as proper binary assets.

## Build and review gates

1. TypeScript, ESLint, Jest, perf and Android release build all pass.
2. Verify fresh install and update from the **existing independent**
   `com.barroni1977.tarsai` package ID.
3. Check light/dark theme migration; TARS defaults dark but respects saved
   user settings until a fully accessible alternative ships.
4. Test on a real Galaxy S26 Ultra, including keyboard, accessibility text
   scaling, model selection, offline chat, downloads, chat history and voice.
5. CI test keystore is temporary — not a production signing solution.
6. No copyrighted film artwork/recordings, no upstream credit removal.

## Scope checkpoints

**v1 implement now:** design foundation, proper first-chat command deck,
persistent app name, visible drawer and About branding, dark accent palette.

**v2:** full transcript/message and composer treatment, model-card surfaces,
settings grouping, finished approved binary launcher artwork.

**v3:** wired behaviour controls, offline TTS voice, live audio state and
adjustable-motion controls. Each needs tests; none are implied to exist in v1.

## Build note: launcher artwork

The launcher images are generated by `scripts/generate-app-icons.js` from
`scripts/app-icon/*.svg`, including **all** legacy Android PNG densities
and iOS assets. v1 retains those generated files rather than modifying only
the XML adaptive foreground: partial replacements fail the repository's
reproducibility tests and leave old launcher bitmaps on older devices.

The in-app command deck and onboarding use the new original TARS brand mark.
A future icon pass must update the SVG sources, regenerate every binary asset
and keep the existing icon tests intact. No icon tests are skipped.
