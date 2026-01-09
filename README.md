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
2) Set build metadata in `build.json` if needed.
3) Install deps and run:
   - npm install
   - npm run dev:client

## Environment and channel
- TARGET_ENV: dev | prod
- CHANNEL: production | pay | ...

Example:
- TARGET_ENV=dev CHANNEL=production npm run dev

## Native modules (expo-module)
- Local module scaffold lives at `modules/native-example`.
- Use `npx create-expo-module <name> --local` to add new modules.
- Dev client is required to test native modules (`npm run dev:client`).

## Directory layout (summary)
- app/: expo-router pages and layouts
- src/i18n: i18n setup and locale resources
- src/services: http, storage, config
- src/features: domain logic (SWR keys, hooks, zustand)
- scripts/: versioning and release automation
- docs/: rules and release governance

## Release commands
- Version bump:
  - npm run release:version -- --bump patch
- Package:
  - TARGET_ENV=prod CHANNEL=production PLATFORM=both RELEASE_TYPE=PACKAGE \
    ANDROID_ARTIFACT=AAB npm run release:package -- --notes "release notes"
- OTA:
  - TARGET_ENV=prod CHANNEL=production PLATFORM=ios RELEASE_TYPE=OTA \
    RELEASE_NOTES="release notes" npm run release:ota
- Hotpatch:
  - TARGET_ENV=prod CHANNEL=production PLATFORM=ios RELEASE_TYPE=HOTPATCH \
    VERSION_RANGE="1.2.x" RELEASE_NOTES="hotfix notes" npm run release:hotpatch

## Governance docs
- docs/rules.md
- docs/release.md
- docs/branching.md
- docs/ai-rules.md
