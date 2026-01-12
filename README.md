# Expo Deploy Kit

<div align="center">

**[English](./README.md)** | **[中文](./README.zh-CN.md)**

Production-ready React Native starter with enterprise deployment capabilities.

[Expo Router](#) • [i18n](#) • [OTA Updates](#) • [CI/CD](#)

</div>

---

## English

A production-grade React Native starter template designed for enterprise mobile applications. Built with Expo, it provides a complete foundation for building scalable, internationalized apps with seamless over-the-air update capabilities and automated CI/CD pipelines.

### Core Features

| Feature | Description |
|---------|-------------|
| **Expo Router 3** | File-based routing with type-safe navigation |
| **Internationalization (i18n)** | Built-in support for English and Chinese with persistent language preferences |
| **OTA Updates** | EAS Update integration for instant hotfix deployment without app store review |
| **CI/CD Pipeline** | Jenkins-ready automation for versioning, packaging, and releases |
| **State Management** | SWR for server state + Zustand for client state |
| **Native Modules** | Expo Module support for custom native functionality |
| **In-App Updates** | Google Play immediate/flexible update flows |

### Why This Starter?

```
┌─────────────────────────────────────────────────────────────┐
│                    Traditional Development                   │
├─────────────────────────────────────────────────────────────┤
│  Code → Build → Upload → Review → Approve → Release         │
│  Cycle time: Days to weeks per update                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   With Expo Deploy Kit                       │
├─────────────────────────────────────────────────────────────┤
│  Code → OTA Update → Instant Deployment                      │
│  Critical fixes: Minutes, not days                          │
└─────────────────────────────────────────────────────────────┘
```

### Quick Start

```bash
# Clone and install dependencies
git clone https://github.com/your-org/expo-deploy-kit.git
cd expo-deploy-kit
pnpm install

# Configure environment
cp .env.example .env

# Start development server
pnpm run dev:client
```

### Required Configuration

**App Identity** (`app.json`):
```json
{
  "expo": {
    "name": "Your App",
    "slug": "your-app-slug",
    "ios": { "bundleIdentifier": "com.your.app" },
    "android": { "package": "com.your.app" }
  }
}
```

**Environment Variables** (`.env`):
```bash
TARGET_ENV=prod
CHANNEL=production
EXPO_PUBLIC_API_BASE_URL=https://api.your-domain.com
EXPO_PUBLIC_ANDROID_APK_URL=https://your-apk-url.apk
```

### Architecture

```
expo-deploy-kit/
├── app/                    # Expo Router pages (UI composition only)
│   ├── (auth)/            # Authentication flows
│   ├── (tabs)/            # Main navigation tabs
│   └── _layout.tsx        # Root layout
├── src/
│   ├── i18n/              # Internationalization resources
│   │   ├── resources/en/common.json
│   │   └── resources/zh-CN/common.json
│   ├── services/          # Core services
│   │   ├── http/          # API client with error handling
│   │   ├── storage/       # Persistent storage wrapper
│   │   └── config/        # Environment configuration
│   ├── features/          # Domain-driven modules
│   │   └── <domain>/      # Each feature contains:
│   │       ├── api.ts     # SWR keys + request functions
│   │       ├── store.ts   # Zustand state slice
│   │       ├── hooks.ts   # Page entry points
│   │       ├── types.ts   # Domain types
│   │       └── components/# Feature-specific components
│   ├── components/        # Shared components
│   │   ├── ui/            # Base UI (buttons, inputs, cards)
│   │   ├── biz/           # Business components
│   │   └── providers/     # Context providers
│   └── style/             # Design system
│       ├── tokens.ts      # Design tokens (colors, spacing)
│       └── theme.tsx      # Theme provider
├── scripts/               # Release automation
│   ├── version.ts         # Semantic versioning
│   ├── release.ts         # Release workflow orchestrator
│   ├── package.ts         # Native build script
│   └── hotpatch.ts        # OTA update creator
├── modules/               # Native modules (expo-module)
│   └── in-app-update/     # Android in-app update module
├── docs/                  # Documentation
│   ├── rules.md           # Project conventions
│   ├── release.md         # Release workflow
│   └── branching.md       # Git strategy
├── release/               # Release audit records
├── build.json             # Build metadata
├── eas.json               # EAS configuration
└── tsconfig.json          # TypeScript configuration
```

### Design Principles

| Layer | Responsibility | Rules |
|-------|---------------|-------|
| **app/** | UI composition | Routing, layouts, analytics. **No business logic or API calls** |
| **src/features/** | Domain logic | All business rules, API calls, and state management |
| **src/services/** | Infrastructure | HTTP, storage, config. Pure utilities |
| **src/components/** | UI primitives | Reusable, stateless where possible |

### State Management

```
┌─────────────────────────────────────────────────────────────┐
│                     Server State (SWR)                       │
├─────────────────────────────────────────────────────────────┤
│ • API responses that can be cached                          │
│ • Data that refreshes periodically                          │
│ • Shared data across components                             │
│ Example: User profile, product list, notifications          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Client State (Zustand)                    │
├─────────────────────────────────────────────────────────────┤
│ • Session/authentication state                              │
│ • UI state (modals, themes, drafts)                         │
│ • Ephemeral/transient state                                 │
│ Example: Auth token, selected tab, form draft               │
└─────────────────────────────────────────────────────────────┘
```

### Release Types

| Type | Use Case | Distribution |
|------|----------|--------------|
| **PACKAGE** | Native code changes, permissions, schema updates | App Store, Play Store |
| **HOTPATCH** | JavaScript/assets fixes, UI updates, business logic | OTA (EAS Update) |

### Release Flow

```bash
# Bump version
pnpm run release:version -- --bump major    # 1.0.0 → 2.0.0
pnpm run release:version -- --bump minor    # 1.0.0 → 1.1.0
pnpm run release:version -- --bump patch    # 1.0.0 → 1.0.1

# Package (native build)
pnpm run release:package

# OTA hotpatch
pnpm run release:update --range "1.2.x" --rollback-to "1.1.0"
```

### Android In-App Updates

**APK Download Mode** (direct distribution):
```bash
EXPO_PUBLIC_ANDROID_APK_URL=https://your-server.com/app.apk
```

**Play Store Mode** (in-app update checks):
```typescript
import { useInAppUpdate } from "@starter/in-app-update";

function App() {
  const { checkUpdate, status } = useInAppUpdate();
  useEffect(() => { checkUpdate(); }, []);
}
```

### Scripts Reference

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start Expo dev server |
| `pnpm run dev:client` | Start with dev client (required for native) |
| `pnpm run typecheck` | Run TypeScript compiler |
| `pnpm run release:version -- --bump <type>` | Bump semantic version |
| `pnpm run release:package` | Create native build |
| `pnpm run release:update` | Create OTA update |

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Expo](https://expo.dev) + [React Native](https://reactnative.dev) |
| Router | [Expo Router](https://docs.expo.dev/router/introduction/) |
| i18n | [i18next](https://www.i18next.com) + [react-i18next](https://react.i18next.com) |
| State (Server) | [SWR](https://swr.vercel.app) |
| State (Client) | [Zustand](https://zustand-demo.pmnd.rs) |
| OTA Updates | [EAS Update](https://docs.expo.dev/eas-update/introduction/) |
| CI/CD | [Jenkins](https://www.jenkins.io) |
| Native Modules | [Expo Modules](https://docs.expo/modules/overview) |

### Documentation

- [Project Rules](./docs/rules.md) - Code conventions
- [Release Workflow](./docs/release.md) - Release process
- [Git Branching Strategy](./docs/branching.md) - Branch workflow
- [AI Agent Guidelines](./docs/ai-rules.md) - AI-assisted development
