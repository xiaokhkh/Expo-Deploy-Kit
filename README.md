# Expo OTA Starter

<div align="center">

**English** | [中文](./README.zh-CN.md)

Expo Router + i18n + OTA Updates + CI/CD.

</div>

## What This Starter Does

A production-ready Expo Router starter with:

- **Expo Router** with dev-client support
- **i18n** with persistent language setting (i18next)
- **SWR + Zustand** for data and state management
- **PACKAGE / HOTPATCH** release workflow with audit records
- **Jenkins CI/CD** with standardized parameters
- **Native Module** support via expo-module

## Quick Start

1. Update app identity in `app.json`:
   - `expo.name`
   - `expo.slug`
   - `expo.ios.bundleIdentifier`
   - `expo.android.package`

2. Copy `.env.example` to `.env` and fill in values:
   ```bash
   cp .env.example .env
   ```

3. Set build metadata in `build.json` if needed.

4. Install dependencies and run:
   ```bash
   pnpm install
   pnpm run dev:client
   ```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `TARGET_ENV` | `dev` or `prod` |
| `CHANNEL` | Release channel (default: `production`) |
| `EXPO_PUBLIC_API_BASE_URL` | Backend API base URL |
| `EXPO_PUBLIC_ANDROID_APK_URL` | Direct APK download URL (optional) |

## Release Types

| Type | Description |
|------|-------------|
| `PACKAGE` | App store build (apk/aab/ipa). Required for native changes. |
| `HOTPATCH` | OTA update. Optional version range support. |

### Release Commands

```bash
# Bump version
pnpm run release:version -- --bump patch

# Package (native build)
pnpm run release:package

# Hotpatch (OTA update)
pnpm run release:update

# Hotpatch with version range
pnpm run release:update --range "1.2.x" --rollback-to "20240101120000"
```

## Directory Layout

```
├── app/                 # Expo Router pages and layouts
├── src/
│   ├── i18n/           # i18n setup and resources
│   ├── services/       # HTTP, storage, config
│   ├── features/       # Domain logic (api, store, hooks, components)
│   ├── components/     # UI and business components
│   └── style/          # Design tokens and theme
├── scripts/            # Versioning and release automation
├── modules/            # Native modules (expo-module)
├── docs/               # Project documentation
└── release/            # Release audit records
```

## Architecture

### File Placement Rules

- **app/**: UI composition only. No HTTP calls or business logic.
- **src/features/<domain>/**:
  - `api.ts`: SWR keys + request functions
  - `store.ts`: Zustand slice
  - `hooks.ts`: Page entry point
  - `types.ts`: Domain types
  - `components/`: Reusable components

### State Management

- **SWR**: Server state (API data, cacheable queries)
- **Zustand**: Client state (session, UI, drafts, transient state)

### i18n

All user-facing strings must use i18n. Key naming: `domain.section.item`.

Add new keys to both locales:
- `src/i18n/resources/en/common.json`
- `src/i18n/resources/zh-CN/common.json`

## Native Modules

Local modules scaffold at `modules/native-example`.

```bash
# Create new native module
npx create-expo-module <name> --local

# Dev client required for testing native modules
pnpm run dev:client
```

## Android In-App Update

### APK Download
Configure `EXPO_PUBLIC_ANDROID_APK_URL` to enable direct APK download/install. Native only, distributed separately from OTA.

### Play Store Update
Requires Google Play distribution. Uses immediate/flexible update flows via in-app update module.

## Documentation

- [docs/rules.md](./docs/rules.md) - Project rules and conventions
- [docs/release.md](./docs/release.md) - Release workflow guide
- [docs/branching.md](./docs/branching.md) - Git branching strategy
- [docs/ai-rules.md](./docs/ai-rules.md) - AI agent guidelines

## Tech Stack

- [Expo](https://expo.dev) + [Expo Router](https://docs.expo.dev/router/introduction/)
- [i18next](https://www.i18next.com) + [react-i18next](https://react.i18next.com)
- [SWR](https://swr.vercel.app) + [Zustand](https://zustand-demo.pmnd.rs)
- [Jenkins](https://www.jenkins.io) for CI/CD

---

# Expo OTA Starter

<div align="center">

[English](./README.md) | **中文**

Expo Router + 国际化 + OTA 更新 + CI/CD。

</div>

## 本项目功能

生产级 Expo Router 启动模板，包含：

- **Expo Router** 路由框架，支持 dev-client
- **i18n 国际化**，语言设置持久化 (i18next)
- **SWR + Zustand** 数据与状态管理
- **PACKAGE / HOTPATCH** 发布流程，带审计记录
- **Jenkins CI/CD**，参数标准化
- **原生模块** 支持 via expo-module

## 快速开始

1. 在 `app.json` 中更新应用标识：
   - `expo.name`
   - `expo.slug`
   - `expo.ios.bundleIdentifier`
   - `expo.android.package`

2. 复制 `.env.example` 到 `.env` 并填写配置：
   ```bash
   cp .env.example .env
   ```

3. 如需更改构建元数据，编辑 `build.json`。

4. 安装依赖并启动：
   ```bash
   pnpm install
   pnpm run dev:client
   ```

## 环境变量

| 变量 | 说明 |
|------|------|
| `TARGET_ENV` | `dev` 或 `prod` |
| `CHANNEL` | 发布频道（默认：`production`） |
| `EXPO_PUBLIC_API_BASE_URL` | 后端 API 地址 |
| `EXPO_PUBLIC_ANDROID_APK_URL` | APK 直接下载链接（可选） |

## 发布类型

| 类型 | 说明 |
|------|------|
| `PACKAGE` | 应用商店构建 (apk/aab/ipa)。原生变更必选。 |
| `HOTPATCH` | OTA 更新。支持版本范围限制。 |

### 发布命令

```bash
# 版本号升级
pnpm run release:version -- --bump patch

# 打包（原生构建）
pnpm run release:package

# 热更新（OTA）
pnpm run release:update

# 带版本范围的热修复
pnpm run release:update --range "1.2.x" --rollback-to "20240101120000"
```

## 目录结构

```
├── app/                 # Expo Router 页面和布局
├── src/
│   ├── i18n/           # 国际化配置和资源
│   ├── services/       # HTTP、存储、配置
│   ├── features/       # 业务逻辑（api、store、hooks、components）
│   ├── components/     # UI 和业务组件
│   └── style/          # 设计令牌和主题
├── scripts/            # 版本管理和发布脚本
├── modules/            # 原生模块 (expo-module)
├── docs/               # 项目文档
└── release/            # 发布审计记录
```

## 架构规范

### 文件放置规则

- **app/**: 仅包含 UI 组合。不允许 HTTP 调用或业务逻辑。
- **src/features/<domain>/**:
  - `api.ts`: SWR keys + 请求函数
  - `store.ts`: Zustand 状态切片
  - `hooks.ts`: 页面入口
  - `types.ts`: 领域类型定义
  - `components/`: 可复用组件

### 状态管理

- **SWR**: 服务端状态（API 数据、可缓存查询）
- **Zustand**: 客户端状态（会话、UI、临时状态）

### 国际化

所有面向用户的文本必须使用 i18n。键名格式：`domain.section.item`。

新增键值需同步更新两个语言文件：
- `src/i18n/resources/en/common.json`
- `src/i18n/resources/zh-CN/common.json`

## 原生模块

本地模块模板位于 `modules/native-example`。

```bash
# 创建新的原生模块
npx create-expo-module <模块名> --local

# 测试原生模块需要 dev-client
pnpm run dev:client
```

## Android 应用内更新

### APK 下载
配置 `EXPO_PUBLIC_ANDROID_APK_URL` 启用 APK 直接下载安装。原生方式，与 OTA 独立分发。

### Play Store 更新
需要通过 Google Play 分发。使用 immediate/flexible 更新流程。

## 文档

- [docs/rules.md](./docs/rules.md) - 项目规范和约定
- [docs/release.md](./docs/release.md) - 发布流程指南
- [docs/branching.md](./docs/branching.md) - Git 分支策略
- [docs/ai-rules.md](./docs/ai-rules.md) - AI 代理指南

## 技术栈

- [Expo](https://expo.dev) + [Expo Router](https://docs.expo.dev/router/introduction/)
- [i18next](https://www.i18next.com) + [react-i18next](https://react.i18next.com)
- [SWR](https://swr.vercel.app) + [Zustand](https://zustand-demo.pmnd.rs)
- [Jenkins](https://www.jenkins.io) CI/CD
