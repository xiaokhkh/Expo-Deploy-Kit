# 项目待办清单

> 状态说明：
> - ✅ 已完成：通过测试验证
> - 🔄 进行中：开发中
> - ⏳ 待测试：开发完成，等待测试
> - ❌ 未开始：尚未开发

---

## 核心功能

| 功能 | 状态 | 说明 |
|------|------|------|
| Expo Router 基础路由 | ✅ | 文件路由和类型安全导航已实现 |
| i18n 国际化（中英双语） | ✅ | react-i18next 配置完成，资源文件已创建 |
| SWR 服务端状态管理 | ✅ | API 请求封装完成 |
| Zustand 客户端状态管理 | ✅ | store.ts 模式已建立 |
| 基础 UI 组件库 | ✅ | Screen、按钮、卡片等组件已完成 |

## OTA 更新

| 功能 | 状态 | 说明 |
|------|------|------|
| EAS Update 配置 | ✅ | eas.json 配置完成 |
| 热更新脚本 | ✅ | scripts/hotpatch.ts 开发完成 |
| 发布脚本 | ✅ | scripts/release.ts 开发完成 |
| OTA 更新流程测试 | ⏳ | 需要在真实 EAS 环境中测试 |
| 回滚机制 | ⏳ | 需要测试 rollback 功能 |

## CI/CD 流水线

| 功能 | 状态 | 说明 |
|------|------|------|
| 版本号管理脚本 | ✅ | scripts/version.ts 开发完成 |
| 打包脚本 | ✅ | scripts/package.ts 开发完成 |
| Jenkins Pipeline 配置 | ⏳ | Jenkinsfile 需要编写 |
| Jenkins 环境配置 | ⏳ | 需要配置 Jenkins 环境的凭证和节点 |
| 自动化构建测试 | ❌ | 未测试 |

## 原生模块

| 功能 | 状态 | 说明 |
|------|------|------|
| In-App Update 模块 (Android) | ✅ | modules/in-app-update 开发完成 |
| iOS 原生模块支持 | ⏳ | 需要开发和测试 |
| 原生模块示例 | ✅ | modules/native-example 提供参考 |
| Android 真机测试 | ❌ | 未测试 |
| iOS 模拟器测试 | ❌ | 未测试 |

## 应用功能

| 功能 | 状态 | 说明 |
|------|------|------|
| 登录流程 | ✅ | app/(auth)/sign-in.tsx 开发完成 |
| 主页标签页 | ✅ | app/(tabs)/index.tsx 开发完成 |
| 设置页面 | ✅ | app/(tabs)/settings.tsx 开发完成 |
| 应用内更新卡片 | ✅ | PlayUpdateCard, InAppUpdateCard 开发完成 |
| 错误边界 | ✅ | AppErrorBoundary 开发完成 |
| 深色模式 | ⏳ | 主题支持已完成，需要测试 |

## 服务层

| 功能 | 状态 | 说明 |
|------|------|------|
| HTTP 请求封装 | ✅ | fetcher.ts, error.ts 开发完成 |
| 存储服务 | ✅ | storage/index.ts 开发完成 |
| 环境配置 | ✅ | config/index.ts 开发完成 |
| 配置验证 | ⏳ | 需要测试不同环境变量组合 |

## 文档

| 功能 | 状态 | 说明 |
|------|------|------|
| README 中英文 | ✅ | README.md, README.zh-CN.md 已创建 |
| 项目规范文档 | ✅ | docs/rules.md 已创建 |
| 发布流程文档 | ✅ | docs/release.md 已创建 |
| Git 分支策略 | ✅ | docs/branching.md 已创建 |
| AI 代理指南 | ✅ | docs/ai-rules.md 已创建 |
| API 文档 | ❌ | 未创建 |

---

## 测试优先级

### 高优先级 (P0) - 必须测试

- [ ] Android 真机测试 - 应用内更新功能
- [ ] EAS Update OTA 更新流程
- [ ] 登录流程功能测试
- [ ] i18n 语言切换测试

### 中优先级 (P1) - 应该测试

- [ ] iOS 模拟器运行测试
- [ ] 状态管理 (SWR + Zustand) 功能测试
- [ ] 版本号升级脚本测试
- [ ] 打包脚本功能测试

### 低优先级 (P2) - 最好测试

- [ ] Jenkins CI/CD 流水线测试
- [ ] 深色模式主题测试
- [ ] 错误边界恢复测试
- [ ] 回滚机制测试

---

## 当前风险提示

⚠️ **仓库仍在开发中，未完全测试完成，使用存在风险。**

### 已知风险

1. **Android 原生模块**：in-app-update 模块开发完成但未在真机测试
2. **iOS 支持**：未进行 iOS 环境测试
3. **CI/CD**：Jenkins Pipeline 未完成配置
4. **OTA 流程**：EAS Update 配置完成但未在生产环境验证

### 建议

- 开发环境使用：风险较低
- 生产环境使用：建议等待完整测试完成后
- 关键业务场景：暂不建议使用
