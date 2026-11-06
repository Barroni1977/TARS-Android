# TARS AI Preview — safe parallel installation

This branch exists solely to test Command Deck v1 on Android without
removing the first working TARS AI installation.

- Production prototype: `com.barroni1977.tarsai` — leave installed.
- This preview: `com.barroni1977.tarsai.preview` — separately installed app,
  visible on the launcher as **TARS AI Preview**.
- The preview has its own private app storage. It will not inherit the
  previously downloaded model, chat sessions or TARS settings.
- The Android native Kotlin package and namespace are intentionally unchanged.

## IMPORTANT: CI signing is ephemeral

The CI release workflow creates a fresh dummy signing key on **every run**.
Therefore a later CI APK with the same package ID **cannot reliably replace**
a previously installed CI APK. For another preview, first export anything
you want to keep and understand that uninstalling loses private app data.

A proper production update path requires a persistent release keystore,
protected GitHub Actions secrets and an appropriate signing job.
Do not commit the keystore to this public repository.

This is a temporary local-device preview, not a production release and not
a replacement for the original working `com.barroni1977.tarsai` installation.
