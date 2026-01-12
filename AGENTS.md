# AGENTS.md

This file provides guidelines for AI agents working in this repository.

## Project Overview

Expo Router + i18n + OTA Updates + CI/CD starter project.

## Build Commands

```bash
# Development
pnpm run dev              # Start Expo dev server
pnpm run dev:client       # Start with dev client (required for native modules)
pnpm run android          # Run on Android device/emulator
pnpm run ios              # Run on iOS simulator
pnpm run web              # Run in web browser

# Type checking
pnpm run typecheck        # Run TypeScript compiler (tsc --noEmit)

# Release commands
pnpm run release:version -- --bump <major|minor|patch>  # Bump version
pnpm run release:package                              # Create app package
pnpm run release:update                               # Create OTA update
```

## Testing

This project does not currently have a test framework configured. When adding tests:
- Place test files alongside source files with `.test.ts` or `.test.tsx` extension
- Use Vitest for unit tests
- Run a single test: `vitest run <file-path>`

## Code Style Guidelines

### TypeScript
- Strict mode is enabled in `tsconfig.json`
- Use explicit types for function parameters and return values
- Use `unknown` instead of `any` for uncertain types
- Define domain types in `src/features/<domain>/types.ts`

### Imports
- Use path aliases: `@/*` maps to project root
- Group imports in this order:
  1. React/React Native imports
  2. Third-party library imports
  3. Internal imports (grouped by directory depth)

```typescript
import { useEffect, useState, type ReactNode } from "react";
import { View, ActivityIndicator } from "react-native";
import { I18nextProvider } from "react-i18next";

import { fetchJson } from "../../services/http/fetcher";
import { ThemeProvider } from "../../style/theme";
```

### Naming Conventions
- **Files**: kebab-case for non-components (`store.ts`), PascalCase for components (`Screen.tsx`)
- **Types**: PascalCase (`InAppUpdateStatus`, `PlayUpdateInfo`)
- **Variables/functions**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE
- **i18n keys**: `domain.section.item` format (e.g., `auth.signIn.button`)

### Component Structure
- Use functional components with TypeScript props
- Props type defined as `type Props = { children?: ReactNode; ... }`
- Components split into:
  - `src/components/ui/`: Base UI (buttons, inputs, etc.)
  - `src/components/biz/`: Cross-domain business components
  - `src/features/<domain>/components/`: Domain-specific components

### State Management
- **SWR**: Server state (API data, cacheable queries)
- **Zustand**: Client state (session, UI state, drafts, transient state)
- Never duplicate SWR data in Zustand stores
- SWR keys defined in `src/features/<domain>/api.ts`

### Error Handling
- Create custom error classes extending `Error` for domain errors
- Include `status`, `code`, and `payload` properties
- Example: `src/services/http/error.ts`

```typescript
export class HttpError extends Error {
  status: number;
  code: string;
  payload?: unknown;

  constructor(status: number, code: string, message: string, payload?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}
```

### i18n
- All user-facing text must use i18n (except debug messages)
- Update both locales when adding new keys:
  - `src/i18n/resources/en/common.json`
  - `src/i18n/resources/zh-CN/common.json`

### File Placement Rules

**app/ (Expo Router)**
- UI composition only
- Allowed: layouts, routing params, page-level analytics, access checks
- Forbidden: HTTP calls, business stores, complex logic

**src/features/<domain>/**
- `api.ts`: SWR keys + request functions
- `store.ts`: Zustand slice for domain state
- `hooks.ts`: Page entry combining SWR + store
- `components/`: Domain-specific components
- `types.ts`: Domain type definitions

**src/services/**
- HTTP, storage, config utilities

**src/style/**
- Design tokens and theme only (no hardcoded values in components)

## Environment Variables

- `TARGET_ENV`: `dev` | `prod`
- `CHANNEL`: `production` | custom channel name
- `EXPO_PUBLIC_API_BASE_URL`: Backend API base URL
- `EXPO_PUBLIC_ANDROID_APK_URL`: Direct APK download URL

## Release Types

- `PACKAGE`: Native changes, permissions, schema changes
- `HOTPATCH`: JavaScript/assets updates (optional version range)

## Git Conventions

Use Conventional Commits:
```
feat(scope): add new sign-in flow
fix(i18n): correct translation key
chore(ci): update Jenkins pipeline
```

Suggested scopes: `router`, `i18n`, `ci`, `ota`, `hotpatch`, `build`, `feature-xxx`

## Prohibited Actions

- Do not put business logic in `app/**`
- Do not fetch directly in pages
- Do not duplicate SWR data in Zustand
- Do not hard-code visible text
- Do not put CI logic in Jenkinsfile
- Do not change release parameter semantics
