# TARS-AI

**A local-first AI assistant for Android, with a TARS-inspired interface.**

TARS-AI is an independent, modified fork of the open-source PocketPal AI project.
It uses local GGUF models for on-device text inference. After a model has been
downloaded, local text chat can work without an internet connection.

> **Preview build:** This project is in development. The Android preview uses
> the separate application ID `com.barroni1977.tarsai.preview`. Do not remove
> an existing installation containing models or chat history without backing
> up your data.

## The TARS experience

- Dark metallic TARS interface, amber branding and green diagnostics.
- Animated full-screen startup and a redesigned activation sequence.
- Local GGUF model selection, download and management.
- Offline text chat after a compatible model is installed.
- Configurable AI profiles, saved conversations and optional voice features.

The boot display's humour, honesty and sarcasm percentages are decorative.
They are not evidence that the underlying language model obeys those settings.
Voice features depend on the installed engines and models.

## Privacy and connectivity

Local text inference runs on the phone. Model downloads, optional web search,
remote servers, system voice services, feedback, external accounts, marketplace
features and certain other enabled integrations can use the network. Do not
assume that **every** feature works offline or that no information is ever sent
off-device. Review settings and permissions before enabling online features.

## Building and testing

This repository retains the upstream React Native native-module and codegen
identifiers where changing them would require a compatibility migration.
Those internal identifiers are not the app's displayed branding.

Typical development commands:

```sh
yarn install
yarn lint
yarn typecheck
yarn test --runInBand
```

Android release builds are produced by the GitHub Actions workflow only when
explicitly requested. Work-in-progress branches are not automatically APKs.

## Open-source attribution

TARS-AI is based on [PocketPal AI](https://github.com/a-ghorbani/pocketpal-ai)
and uses components including [llama.cpp](https://github.com/ggml-org/llama.cpp)
and [llama.rn](https://github.com/mybigday/llama.rn).
The original software and modifications are governed by their respective
licences. See [LICENSE](LICENSE) and third-party notices in the repository.
PocketPal AI, PalsHub and other provider names refer to separate upstream or
third-party projects, not TARS-AI branding.

## Repository

[Source code and development](https://github.com/Barroni1977/TARS-Android)

See [onboarding redesign notes](docs/TARS_ONBOARDING.md) for the first-run
experience and its compatibility boundaries.
