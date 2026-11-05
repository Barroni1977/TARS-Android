# TARS AI — animated boot screen

This fork adds a **code-driven offline boot animation** to the React Native app.

## Behaviour

- The first ~3.3 seconds after the React Native app mounts display a black,
  modular, steel-panel TARS-inspired screen.
- Green diagnostic lines scroll continuously inside a display on the robot.
- An amber TARS AI title, a pulsing green indicator and a moving waveform
  bring the display to life.
- The loading caption progresses through four scripted startup messages.
- No network, streamed video, microphone, or extra model is required.
- Automated E2E builds skip the animation to avoid interrupting navigation.

The diagnostics and waveform are **visual effects**, not live hardware or
voice-activity telemetry. The screen does not claim to have loaded the LLM.

## Android splash limitation

Android displays a **static native launch window** until the React Native
JavaScript runtime is ready. We set that window's background to black to
minimise the flash, then render the animated boot component above the normal
application. The animation begins **after JS startup**, not before it.

## Implementation

- `src/components/TarsBootScreen.tsx` contains the moving display.
- `App.tsx` controls how long it is visible.
- `android/app/src/main/res/values/styles.xml` sets the native black backdrop.
- `android/app/src/main/res/values/strings.xml` and `app.json` display
  the `TARS AI` app name.

The underlying Android package ID is still `com.pocketpalai`; a separate
installable app ID and custom launcher icon require a later change. Do not
install a build of this fork over an existing PocketPal installation before
app IDs are separated.

## Next steps

1. Check CI: TypeScript, lint, Jest, and Android build.
2. Test the animation on an actual Galaxy S26 Ultra.
3. Replace the provisional vector steel panels with the approved artwork.
4. Add optional real diagnostics after the underlying model-loading events
   are observable.
