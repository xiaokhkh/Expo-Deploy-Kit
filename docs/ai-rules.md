# AI Rules for Expo Router + i18n Starter

## 0. Working Constraints
- Make minimal changes unless refactor is explicitly requested.
- Any new mechanism (new env, channel, release type) must update:
  - docs/rules.md
  - docs/release.md
  - scripts/
- Do not add unnecessary dependencies.

## 1. File Placement Rules
### 1.1 Routing and Pages (expo-router)
- All route pages live in app/.
- app/** files are limited to:
  - UI composition
  - Route params
  - Page-level analytics or access checks
- app/** must not:
  - Perform HTTP requests
  - Manipulate business stores or complex business logic
- Business logic must live in src/features/**

### 1.2 Feature Domains
New domains must use the standard structure:
- src/features/<domain>/api.ts
- src/features/<domain>/store.ts
- src/features/<domain>/hooks.ts
- src/features/<domain>/components/
- src/features/<domain>/types.ts

Pages only call src/features/<domain>/hooks.ts.

### 1.3 Components and Styles
- src/components/ui: base UI components without business meaning.
- src/components/biz: cross-domain reusable business components.
- src/style/**: tokens/theme only; no hard-coded colors or spacing.

## 2. SWR + Zustand Boundaries
- SWR is for reconstructable server data.
- Requests go through src/services/http.
- Keys live in features/<domain>/api.ts only.
- Zustand is for session/UI/draft/transient client state.
- Do not duplicate SWR data in stores.

## 3. i18n Rules
- All user-facing strings must use i18n (except debug).
- Key naming: domain.section.item.
- Update both locales on new keys:
  - src/i18n/resources/en/common.json
  - src/i18n/resources/zh-CN/common.json
- Avoid heavy runtime computation for visible text.

## 4. Version, Environment, Channel, Release Type
- TARGET_ENV only dev | prod.
- CHANNEL defaults to production and can be extended.
- RELEASE_TYPE only PACKAGE | OTA | HOTPATCH.
- No fourth type without updating docs and scripts.

## 5. OTA / HOTPATCH Red Lines
- OTA/HOTPATCH are JS/assets only.
- Native capability, permission, or schema changes require PACKAGE.
- HOTPATCH must specify a version range and generate a rollback point.

## 6. CI/CD (Jenkins)
- Jenkinsfile is orchestration only; business logic belongs in scripts/.
- CI commands must be runnable locally.
- Keep Jenkins parameters stable:
  - BRANCH_TO_BUILD
  - TARGET_ENV
  - CHANNEL
  - PLATFORM
  - RELEASE_TYPE
  - ANDROID_ARTIFACT
  - ROLLBACK_TO (optional)

## 7. Git/Commit Rules
- Use Conventional Commits:
  - feat(scope): ...
  - fix(scope): ...
  - chore(scope): ...
- Suggested scopes: router | i18n | ci | ota | hotpatch | build | feature-xxx

## 8. Prohibited Actions
- Do not put business logic in app/**
- Do not fetch directly in pages
- Do not duplicate SWR data in Zustand
- Do not hard-code visible text
- Do not put CI logic in Jenkinsfile
- Do not change release parameter semantics

## 9. Minimal Task Prefix
Use the following prefix for AI tasks:

"""
Goal: Complete the request without breaking starter rules.
Follow docs/ai-rules.md and docs/rules.md.
Pages only compose UI; logic lives in src/features/**; requests go through src/services/http.
All release changes must be traceable (version/build/env/channel/sha) and rollback-safe.
Native module support must use expo-module.
"""
