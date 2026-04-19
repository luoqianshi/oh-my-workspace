# GitHub Gist 数据持久化设计方案

## 概述

为"骆的工具箱"添加基于 GitHub Gist 的云端数据持久化，实现跨设备/跨浏览器的工具数据同步。保留 localStorage 作为本地缓存层，Gist 作为云端 source of truth。

## 核心决策

- **同步动机**：跨设备同步
- **认证方式**：Personal Access Token (PAT)，用户自行生成 fine-grained token 后粘贴
- **冲突策略**：Last Write Wins（最后同步覆盖）
- **PAT 存储**：Base64 编码后存入 localStorage，key 统一管理

## 架构

### 新增文件

- `src/constants/storage.js` — 统一管理 localStorage key
- `src/composables/useGistSync.js` — Gist API 封装与同步逻辑
- `src/components/SyncSettings.vue` — 同步设置面板组件

### 数据流

```
首次配置:
  用户输入 PAT → 创建/关联 Gist → Gist ID 保存到 localStorage

推送到云端 (push):
  tools store → 序列化 JSON → 先 GET 确认 Gist 有效 → PATCH /gists/{id}

拉取到本地 (pull):
  GET /gists/{id} → 解析 JSON → 替换 store 数据 → 写入 localStorage

自动同步:
  saveTools() → debounce 3s → push()
  页面加载 → pull()
```

## 详细设计

### storage.js — Key 统一管理

```js
export const STORAGE_KEYS = {
  TOOLS_DATA: 'luo-toolbox-data',
  GIST_TOKEN: 'luo-toolbox-gist-token',    // PAT (Base64 encoded)
  GIST_ID: 'luo-toolbox-gist-id',          // Gist ID (Base64 encoded)
  SYNC_STATE: 'luo-toolbox-sync-state',    // lastSyncAt, autoPush
}
```

### useGistSync.js — 核心接口

```js
// 状态
const isConfigured = ref(false)     // PAT + Gist ID 均已配置
const isSyncing = ref(false)        // 正在同步中
const lastSyncAt = ref(null)        // 上次同步时间
const syncError = ref(null)         // 最近一次错误

// 配置管理
configure(token, gistId?)           // 设置 PAT，gistId 可选（不传则创建新 Gist）
disconnect()                        // 清除 PAT 和 Gist ID，恢复纯本地模式

// Gist 操作
createGist()                        // 用当前 tools 数据创建新 Gist，返回 gist_id
linkGist(gistId)                    // 关联已有 Gist，拉取数据覆盖本地
unlinkGist()                        // 取消关联，保留本地数据

// 同步操作
push()                              // 本地 → Gist
pull()                              // Gist → 本地

// 自动同步
autoPushEnabled = true              // saveTools() 后 debounce 3s 自动 push
```

### PAT 存储安全

- 写入前 `btoa()` 编码，读取时 `atob()` 解码
- 不是真正加密，但防止 DevTools 一眼看到明文
- 纯前端无法实现真正的安全，此层级足够防"路过看一眼"

### 同步逻辑细节

- `push()` 前先 `GET` 一次 Gist，确认 Gist 存在且 token 有效，失败则中断报错
- `pull()` 后直接以 Gist 数据覆盖本地（Last Write Wins，云端为准）
- 所有 API 调用统一错误处理，设置 `syncError`，UI 显示状态

### SyncSettings 组件

**未配置时：**
- PAT 输入框（type="password"，带显示/隐藏切换）
- 「创建新 Gist」和「关联已有 Gist」按钮
- 连接状态反馈

**已配置时：**
- 当前 Gist 信息（ID 可点击跳转 GitHub）
- 同步状态（上次同步时间、状态图标）
- 操作按钮：立即同步 / 推送 / 拉取 / 断开连接
- 自动推送开关

### Header 同步指示器

- 灰色云朵 — 未配置 Gist
- 蓝色云朵 + 对勾 — 已同步
- 蓝色云朵 + 旋转动画 — 同步中
- 红色云朵 + 感叹号 — 同步失败
- 点击打开 SyncSettings 面板

## 对现有代码的修改

### stores/tools.js

- `loadTools()` 中：若已配置 Gist，优先从 Gist 拉取数据
- `saveTools()` 中：若已配置 Gist 且 autoPushEnabled，debounce 3s 后调用 push()
- 新增 `gistSyncReady` 状态供组件使用

### App.vue 或 Header.vue

- 引入同步状态指示器
- 引入 SyncSettings 面板

## Gist API 使用

- `POST /gists` — 创建新 Gist，文件名 `luo-toolbox-data.json`
- `GET /gists/{id}` — 读取 Gist 内容
- `PATCH /gists/{id}` — 更新 Gist 内容
- Authorization: `token <PAT>`，使用 fine-grained token 只需 `gist` 权限

## 用户体验流程

1. 用户点击 Header 同步图标 → 打开 SyncSettings
2. 输入 PAT → 点击「创建新 Gist」
3. 成功后显示 Gist 信息，同步指示器变为蓝色已同步
4. 此后每次修改工具，3 秒后自动推送
5. 换一台设备 → 输入同一 PAT → 点击「关联已有 Gist」→ 输入 Gist ID → 拉取数据
