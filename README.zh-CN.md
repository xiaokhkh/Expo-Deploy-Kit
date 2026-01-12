> ⚠️ **仓库仍在开发中，未完全测试完成，使用存在风险。**

# Expo Deploy Kit

<div align="center">

**[English](./README.md)** | **[中文](./README.zh-CN.md)**

生产级 React Native 启动模板，专为企业级移动应用设计。

[Expo Router](#) • [i18n](#) • [OTA Updates](#) • [CI/CD](#)

</div>

---

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

---

## 项目状态

### ✅ 已完成（已测试）

| 模块 | 功能 | 状态 |
|------|------|------|
| **核心框架** | Expo Router 基础路由 | ✅ |
| | i18n 国际化（中英双语） | ✅ |
| | TypeScript 严格模式 | ✅ |
| **状态管理** | SWR 服务端状态 | ✅ |
| | Zustand 客户端状态 | ✅ |
| **UI 组件** | 基础 UI 组件库 | ✅ |
| | 应用布局和导航 | ✅ |
| | 主题和深色模式 | ✅ |
| **业务功能** | 登录流程 (auth) | ✅ |
| | 主页标签页 (tabs) | ✅ |
| | 设置页面 | ✅ |
| | 错误边界 | ✅ |
| **服务层** | HTTP 请求封装 | ✅ |
| | 存储服务 (AsyncStorage) | ✅ |
| | 环境配置 | ✅ |
| **原生模块** | In-App Update (Android) | ✅ |
| | 原生模块示例 | ✅ |
| **文档** | README 中英文 | ✅ |
| | 项目规范 | ✅ |
| | 发布流程 | ✅ |
| | Git 分支策略 | ✅ |
| | AI 代理指南 | ✅ |

### ⏳ 待测试

| 模块 | 功能 | 说明 |
|------|------|------|
| **CI/CD** | Jenkins Pipeline 配置 | 脚本已完成，未在 Jenkins 环境测试 |
| | 自动化构建 | 未验证完整流水线 |
| **OTA 更新** | EAS Update 热更新 | 配置完成，未在生产环境验证 |
| | 回滚机制 | 未测试 rollback 功能 |

### 测试优先级

- [ ] Jenkins CI/CD 完整流水线测试
- [ ] EAS Update OTA 更新流程测试
- [ ] 回滚机制测试

### 已知风险

1. **CI/CD**：Jenkins Pipeline 未在真实环境验证
2. **OTA 流程**：EAS Update 未在生产环境测试
