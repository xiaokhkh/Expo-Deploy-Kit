# Project Rules

## File Placement
- app/** (expo-router): UI composition only.
  - Allowed: layout, routing params, page-level analytics, access checks.
  - Forbidden: HTTP calls, direct business stores, heavy business logic.
- src/features/<domain> must use the standard structure:
  - api.ts: SWR keys + request functions (via services/http).
  - store.ts: zustand slice (domain-only state).
  - hooks.ts: page entry (combines SWR + store).
  - components/: reusable domain components.
  - types.ts: domain types.
- Pages only call src/features/<domain>/hooks.ts.
- src/components/ui: base UI components without business meaning.
- src/components/biz: cross-domain business components.
- src/style/**: tokens/theme. No hard-coded colors or spacing in components.
- Native modules must be created with expo-module (see modules/native-example).

## SWR + Zustand Boundaries
- SWR is for server data: query, cache, revalidate.
- All SWR keys live in features/<domain>/api.ts.
- HTTP requests must use src/services/http.
- Zustand is for client state: session, UI state, drafts, transient cross-page state.
- Do not duplicate SWR data in Zustand.

## i18n Rules
- All user-facing strings must go through i18n.
- Key naming: domain.section.item.
- New keys must update both:
  - src/i18n/resources/en/common.json
  - src/i18n/resources/zh-CN/common.json
- Do not build runtime-only strings that cannot be statically audited.

## Environment, Channel, Release Type
- TARGET_ENV is only dev or prod.
- CHANNEL defaults to production and can be extended (e.g., pay).
- RELEASE_TYPE is only PACKAGE, OTA, HOTPATCH.
- Do not introduce a fourth type unless you also update:
  - docs/rules.md
  - docs/release.md
  - scripts/*
  - Jenkinsfile

## OTA / HOTPATCH Red Lines
- OTA and HOTPATCH are JS/assets only.
- Any native capability changes, permission changes, or schema-breaking changes require PACKAGE.
- HOTPATCH must specify a version range and generate a rollback point.

## CI/CD (Jenkins)
- Jenkinsfile only orchestrates; business logic lives in scripts/.
- CI commands must be runnable locally.
- Jenkins parameters must stay stable:
  - BRANCH_TO_BUILD
  - TARGET_ENV
  - CHANNEL
  - PLATFORM
  - RELEASE_TYPE
  - ANDROID_ARTIFACT
  - ROLLBACK_TO (optional)

## Git Conventions
- Use Conventional Commits:
  - feat(scope): ...
  - fix(scope): ...
  - chore(scope): ...
- Suggested scopes: router, i18n, ci, ota, hotpatch, build, feature-xxx.
