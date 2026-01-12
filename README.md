# Expo Deploy Kit

<div align="center">

**[English](#expo-deploy-kit)** | **[中文](#expo-deploy-kit-1)**

Production-ready React Native starter with enterprise deployment capabilities.

[Expo Router](#) • [i18n](#) • [OTA Updates](#) • [CI/CD](#)

</div>

---

## Expo Deploy Kit

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

---

## Expo Deploy Kit

生产级 React Native 启动模板，专为企业级移动应用设计。基于 Expo 构建，提供完整的基础架构，支持可扩展应用开发、国际化支持、无缝 OTA 更新和自动化 CI/CD 流程。

### 核心特性

| 特性 | 说明 |
|------|------|
| **Expo Router 3** | 基于文件的路由，支持类型安全的导航 |
| **国际化 (i18n)** | 内置英语和中文支持，语言设置持久化 |
| **OTA 更新** | EAS Update 集成，无需应用商店审核即可即时部署热修复 |
| **CI/CD 流水线** | Jenkins 自动化，支持版本管理、打包和发布 |
| **状态管理** | SWR 管理服务端状态 + Zustand 管理客户端状态 |
| **原生模块** | Expo Module 支持自定义原生功能 |
| **应用内更新** | Google Play immediate/flexible 更新流程 |

### 为什么选择这个启动器？

```
┌─────────────────────────────────────────────────────────────┐
│                    传统开发模式                               │
├─────────────────────────────────────────────────────────────┤
│  代码 → 构建 → 上传 → 审核 → 批准 → 发布                      │
│  周期：每次更新需要数天至数周                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   使用 Expo Deploy Kit                        │
├─────────────────────────────────────────────────────────────┤
│  代码 → OTA 更新 → 即时部署                                   │
│  关键修复：几分钟内完成，而非数天                              │
└─────────────────────────────────────────────────────────────┘
```

### 快速开始

```bash
# 克隆并安装依赖
git clone https://github.com/your-org/expo-deploy-kit.git
cd expo-deploy-kit
pnpm install

# 配置环境变量
cp .env.example .env

# 启动开发服务器
pnpm run dev:client
```

### 必需配置

**应用标识** (`app.json`):
```json
{
  "expo": {
    "name": "你的应用",
    "slug": "your-app-slug",
    "ios": { "bundleIdentifier": "com.your.app" },
    "android": { "package": "com.your.app" }
  }
}
```

**环境变量** (`.env`):
```bash
TARGET_ENV=prod
CHANNEL=production
EXPO_PUBLIC_API_BASE_URL=https://api.your-domain.com
EXPO_PUBLIC_ANDROID_APK_URL=https://your-apk-url.apk
```

### 目录结构

```
expo-deploy-kit/
├── app/                    # Expo Router 页面（仅 UI 组合）
│   ├── (auth)/            # 认证流程
│   ├── (tabs)/            # 主导航标签页
│   └── _layout.tsx        # 根布局
├── src/
│   ├── i18n/              # 国际化资源
│   │   ├── resources/en/common.json
│   │   └── resources/zh-CN/common.json
│   ├── services/          # 核心服务
│   │   ├── http/          # API 客户端（含错误处理）
│   │   ├── storage/       # 持久化存储封装
│   │   └── config/        # 环境配置
│   ├── features/          # 领域驱动模块
│   │   └── <domain>/      # 每个功能模块包含：
│   │       ├── api.ts     # SWR keys + 请求函数
│   │       ├── store.ts   # Zustand 状态切片
│   │       ├── hooks.ts   # 页面入口
│   │       ├── types.ts   # 领域类型
│   │       └── components/# 功能组件
│   ├── components/        # 共享组件
│   │   ├── ui/            # 基础 UI（按钮、输入框、卡片）
│   │   ├── biz/           # 业务组件
│   │   └── providers/     # 上下文提供者
│   └── style/             # 设计系统
│       ├── tokens.ts      # 设计令牌（颜色、间距）
│       └── theme.tsx      # 主题提供者
├── scripts/               # 发布自动化脚本
│   ├── version.ts         # 语义化版本管理
│   ├── release.ts         # 发布流程编排
│   ├── package.ts         # 原生构建脚本
│   └── hotpatch.ts        # OTA 更新创建
├── modules/               # 原生模块 (expo-module)
│   └── in-app-update/     # Android 应用内更新模块
├── docs/                  # 文档
│   ├── rules.md           # 项目规范
│   ├── release.md         # 发布流程
│   └── branching.md       # Git 分支策略
├── release/               # 发布审计记录
├── build.json             # 构建元数据
├── eas.json               # EAS 配置
└── tsconfig.json          # TypeScript 配置
```

### 设计原则

| 层级 | 职责 | 规范 |
|------|------|------|
| **app/** | UI 组合 | 路由、布局、埋点。**不允许业务逻辑或 API 调用** |
| **src/features/** | 领域逻辑 | 所有业务规则、API 调用、状态管理 |
| **src/services/** | 基础设施 | HTTP、存储、配置。纯工具函数 |
| **src/components/** | UI 原语 | 可复用组件，尽量无状态 |

### 状态管理

```
┌─────────────────────────────────────────────────────────────┐
│                     服务端状态 (SWR)                          │
├─────────────────────────────────────────────────────────────┤
│ • 可缓存的 API 响应                                           │
│ • 定期刷新的数据                                             │
│ • 跨组件共享的数据                                           │
│ 示例：用户资料、产品列表、通知                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    客户端状态 (Zustand)                        │
├─────────────────────────────────────────────────────────────┤
│ • 会话/认证状态                                              │
│ • UI 状态（模态框、主题、草稿）                               │
│ • 临时/瞬时状态                                              │
│ 示例：认证令牌、选中的标签页、表单草稿                         │
└─────────────────────────────────────────────────────────────┘
```

### 发布类型

| 类型 | 使用场景 | 分发方式 |
|------|----------|----------|
| **PACKAGE** | 原生代码变更、权限、架构更新 | App Store、Play Store |
| **HOTPATCH** | JS/资源修复、UI 更新、业务逻辑 | OTA (EAS Update) |

### 发布流程

```bash
# 版本号升级
pnpm run release:version -- --bump major    # 1.0.0 → 2.0.0
pnpm run release:version -- --bump minor    # 1.0.0 → 1.1.0
pnpm run release:version -- --bump patch    # 1.0.0 → 1.0.1

# 打包（原生构建）
pnpm run release:package

# OTA 热更新
pnpm run release:update --range "1.2.x" --rollback-to "1.1.0"
```

### Android 应用内更新

**APK 下载模式**（直接分发）:
```bash
EXPO_PUBLIC_ANDROID_APK_URL=https://your-server.com/app.apk
```

**Play Store 模式**（应用内更新检查）:
```typescript
import { useInAppUpdate } from "@starter/in-app-update";

function App() {
  const { checkUpdate, status } = useInAppUpdate();
  useEffect(() => { checkUpdate(); }, []);
}
```

### 脚本命令

| 命令 | 说明 |
|------|------|
| `pnpm run dev` | 启动 Expo 开发服务器 |
| `pnpm run dev:client` | 启动 dev-client（原生模块必需） |
| `pnpm run typecheck` | 运行 TypeScript 类型检查 |
| `pnpm run release:version -- --bump <type>` | 升级语义化版本 |
| `pnpm run release:package` | 创建原生构建包 |
| `pnpm run release:update` | 创建 OTA 更新 |

### 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | [Expo](https://expo.dev) + [React Native](https://reactnative.dev) |
| 路由 | [Expo Router](https://docs.expo.dev/router/introduction/) |
| 国际化 | [i18next](https://www.i18next.com) + [react-i18next](https://react.i18next.com) |
| 状态（服务端） | [SWR](https://swr.vercel.app) |
| 状态（客户端） | [Zustand](https://zustand-demo.pmnd.rs) |
| OTA 更新 | [EAS Update](https://docs.expo.dev/eas-update/introduction/) |
| CI/CD | [Jenkins](https://www.jenkins.io) |
| 原生模块 | [Expo Modules](https://docs.expo/modules/overview) |

### 文档

- [项目规范](./docs/rules.md) - 代码约定和最佳实践
- [发布流程](./docs/release.md) - 完整发布指南
- [Git 分支策略](./docs/branching.md) - 分支命名和工作流
- [AI 代理指南](./docs/ai-rules.md) - AI 辅助开发指南
