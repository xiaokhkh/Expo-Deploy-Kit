# Expo Router i18n Starter

Expo Router + i18next + SWR/Zustand + OTA/Hotpatch + Jenkins CI/CD.

## What this starter does
- Expo Router app with dev-client support.
- i18n with persistent language setting.
- SWR + Zustand boundaries enforced with sample feature.
- Release scripts for PACKAGE/OTA/HOTPATCH with audit records.
- Jenkins pipeline parameters standardized.

## Quick start
1) Update app identity in `app.json`:
   - expo.name
   - expo.slug
   - expo.ios.bundleIdentifier
   - expo.android.package
2) Copy `.env.example` to `.env` and fill in values for local dev.
3) Set build metadata in `build.json` if needed.
4) Install deps and run:
   - pnpm install
   - pnpm run dev:client

## Environment and channel
- TARGET_ENV: dev | prod
- CHANNEL: production | pay | ...
## Local env
- `.env` is loaded by `app.config.ts` for local development.

Example:
- TARGET_ENV=dev CHANNEL=production pnpm run dev

## Native modules (expo-module)
- Local module scaffold lives at `modules/native-example`.
- Use `npx create-expo-module <name> --local` to add new modules.
- Dev client is required to test native modules (`pnpm run dev:client`).

## Android in-app update (APK)
- Configure `EXPO_PUBLIC_ANDROID_APK_URL` to enable APK download/install.
- Requires Android permission `REQUEST_INSTALL_PACKAGES` (already declared).
- Not related to OTA: APK install is native-only and must be distributed separately.

## Play Store in-app update
- Requires the app to be distributed via Google Play.
- Exposes immediate/flexible update flows via the in-app update module.
- Not available on debug/sideload builds.

## Directory layout (summary)
- app/: expo-router pages and layouts
- src/i18n: i18n setup and locale resources
- src/services: http, storage, config
- src/features: domain logic (SWR keys, hooks, zustand)
- scripts/: versioning and release automation
- docs/: rules and release governance

## Release commands
- Version bump:
  - pnpm run release:version -- --bump patch
- Package:
  - TARGET_ENV=prod CHANNEL=production PLATFORM=both RELEASE_TYPE=PACKAGE \
    ANDROID_ARTIFACT=AAB pnpm run release:package -- --notes "release notes"
- OTA:
  - TARGET_ENV=prod CHANNEL=production PLATFORM=ios RELEASE_TYPE=OTA \
    RELEASE_NOTES="release notes" pnpm run release:ota
- Hotpatch:
  - TARGET_ENV=prod CHANNEL=production PLATFORM=ios RELEASE_TYPE=HOTPATCH \
    VERSION_RANGE="1.2.x" RELEASE_NOTES="hotfix notes" pnpm run release:hotpatch

## Governance docs
- docs/rules.md
- docs/release.md
- docs/branching.md
- docs/ai-rules.md
