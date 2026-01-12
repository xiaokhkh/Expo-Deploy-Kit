# Release Guide

## Versioning
- version: semantic version (e.g., 1.2.3).
- iOS buildNumber: string value, increments every release.
- Android versionCode: integer, increments every release.

## Release Types
- PACKAGE: app store build (apk/aab/ipa).
- HOTPATCH: JS/asset update with optional version range.

## HOTPATCH Boundaries
- HOTPATCH is for JS/assets only.
- Without VERSION_RANGE: updates all versions on the channel.
- With VERSION_RANGE: targets specific version range (requires rollback point).
- Any native capability changes must use PACKAGE.
- OTA/HOTPATCH are for JS/assets only.
- Any native capability changes must use PACKAGE.

## Android In-App Update (APK)
- APK download/install is native-only and separate from UPDATE/HOTPATCH.
- Host the APK and set `EXPO_PUBLIC_ANDROID_APK_URL` for Android builds.

## Play Store In-App Update
- Requires Play Store distribution.
- Works only on Play builds and uses Google Play update flows (immediate/flexible).

## Required Inputs
- TARGET_ENV: dev | prod
- CHANNEL: production | pay | ...
- PLATFORM: android | ios | both
- RELEASE_TYPE: PACKAGE | HOTPATCH
- ANDROID_ARTIFACT: APK | AAB (PACKAGE only)

## Hotpatch Requirements
- Version range required (VERSION_RANGE or --range).
- Release notes required (RELEASE_NOTES or --notes/--notes-file).
- Rollback point required (ROLLBACK_TO or last release record).

## Release Records
- Each release appends to release/records.json.
- Use this as the source of truth for rollback and audit.

## Commands
- Version bump:
  - pnpm run release:version -- --bump patch
  - pnpm run release:version -- --set 1.2.3

- Package:
  - TARGET_ENV=prod CHANNEL=production PLATFORM=ios RELEASE_TYPE=PACKAGE \
    ANDROID_ARTIFACT=AAB pnpm run release:package -- --notes "release notes"

- Hotpatch (normal update):
  - TARGET_ENV=prod CHANNEL=production PLATFORM=both \
    RELEASE_NOTES="release notes" pnpm run release:update

- Hotpatch (version-constrained):
  - TARGET_ENV=prod CHANNEL=production PLATFORM=both RELEASE_TYPE=HOTPATCH \
    VERSION_RANGE="1.2.x" RELEASE_NOTES="hotfix notes" pnpm run release:update

## Rollback
- Use the previous release record ID as ROLLBACK_TO.
- Required for version-constrained HOTPATCH.
