# 骆的工具箱 (Luo's Toolbox)

一个基于多身份角色的 AI 工具与资源导航网站，采用 Neumorphism（软UI）设计风格，从 4445 个浏览器书签中精选 268 个高质量工具，按 5 种身份角色分类管理。

## 预览

![Neumorphism 风格](https://img.shields.io/badge/设计风格-Neumorphism_Soft_UI-6C63FF)
![Vue 3](https://img.shields.io/badge/Vue-3.4-42b883)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8)
![IconPark](https://img.shields.io/badge/IconPark-1.4-orange)

## 特性

- **🎭 五种身份角色** — 研究生小骆 / 工程师骆总 / 辅导员骆导 / 学生骆谦实 / 生活骆同学，各有独立工具集合和强调色
- **🧊 Neumorphism 设计** — 双阴影凸起/凹陷效果，Cool Grey 单色背景，圆角卡片，触感柔和
- **🔍 实时搜索** — 支持按名称、描述、标签模糊搜索，200ms 防抖
- **📂 分类导航** — 31 个分类，每个角色独立分类体系
- **🔧 工具管理** — 支持添加、编辑、删除工具，数据自动持久化到 localStorage
- **☁️ 云端同步** — 基于 GitHub Gist 实现跨设备数据同步，PAT 认证，自动推送 + 手动拉取
- **📦 导入/导出** — JSON 格式导入导出，方便备份和迁移
- **📱 响应式布局** — 桌面端侧边栏 + 移动端横向分类，适配各种屏幕
- **🖼️ IconPark 图标** — 200+ 工具图标映射，统一 SVG 风格

## 技术栈

| 技术 | 用途 |
|------|------|
| [Vue 3](https://vuejs.org/) | 核心框架 (Composition API + `<script setup>`) |
| [Vite 5](https://vitejs.dev/) | 构建工具 |
| [Tailwind CSS 3](https://tailwindcss.com/) | 样式系统 + Neumorphism 阴影 |
| [Pinia 2](https://pinia.vuejs.org/) | 状态管理 |
| [IconPark](https://iconpark.oceanengine.com/) | 图标库 |
| [Google Fonts](https://fonts.google.com/) | Plus Jakarta Sans + DM Sans |

## 项目结构

```
ai-toolbox/
├── index.html                    # HTML 入口
├── package.json                  # 依赖配置
├── vite.config.js                # Vite 构建配置
├── tailwind.config.js            # Tailwind 配置（Neumorphism 阴影 token）
├── postcss.config.js             # PostCSS 配置
├── src/
│   ├── main.js                   # 应用入口
│   ├── App.vue                   # 根组件（布局骨架）
│   ├── data/
│   │   └── tools.json            # 工具数据源（268 个工具）
│   ├── constants/
│   │   ├── roles.js              # 角色定义与分类配置
│   │   └── storage.js            # localStorage key 统一管理 + 安全存取
│   ├── stores/
│   │   └── tools.js              # Pinia Store（CRUD / 搜索 / 导入导出 / Gist 同步）
│   ├── composables/
│   │   ├── useSearch.js          # 搜索防抖逻辑
│   │   ├── useTheme.js           # 角色主题切换
│   │   └── useGistSync.js        # GitHub Gist 同步（API 封装 / 推送 / 拉取 / 自动同步）
│   ├── components/
│   │   ├── Header.vue            # 顶部导航栏
│   │   ├── RoleTabBar.vue        # 角色切换 Tab
│   │   ├── CategoryNav.vue       # 左侧分类导航
│   │   ├── ToolCard.vue          # 工具卡片（Neumorphism 双阴影）
│   │   ├── ToolGrid.vue          # 工具卡片网格
│   │   ├── SearchBar.vue         # 搜索框（凹陷效果）
│   │   ├── ToolIcon.vue          # IconPark 图标映射组件
│   │   ├── ManagePanel.vue       # 管理侧边抽屉
│   │   ├── SyncSettings.vue      # 云端同步设置面板
│   │   ├── ToolForm.vue          # 添加/编辑表单
│   │   └── EmptyState.vue        # 空状态提示
│   └── styles/
│       └── themes.css            # 角色强调色 + Neumorphism 阴影工具类
└── dist/                         # 生产构建输出
```

## 本地部署

### 环境要求

- **Node.js** >= 18.0
- **npm** >= 9.0

### 安装与运行

```bash
# 1. 克隆项目
git clone https://github.com/luoqianshi/oh-my-workspace.git
cd oh-my-workspace

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

浏览器访问 `http://localhost:5173/` 即可查看。

### 生产构建

```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

构建产物在 `dist/` 目录，可直接部署到任意静态服务器。

### 部署到静态服务器

构建完成后，将 `dist/` 目录下的文件上传到服务器即可。常见方式：

```bash
# Nginx
cp -r dist/* /usr/share/nginx/html/

# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=dist
```

## 工具数据管理

### 数据结构

每个工具包含以下字段：

```json
{
  "id": "chatgpt",
  "name": "ChatGPT",
  "url": "https://chatgpt.com/",
  "description": "OpenAI的AI对话助手，支持GPT-4o多模态",
  "icon": "🤖",
  "category": "AI对话",
  "role": "graduate",
  "tags": ["AI", "对话", "GPT", "OpenAI"],
  "addedAt": "2024-01-01",
  "pinned": true
}
```

### 数据来源

- **默认数据**：`src/data/tools.json`，首次加载时使用
- **用户修改**：自动保存到浏览器 `localStorage`（key: `luo-toolbox-data`）
- **云端同步**：通过 GitHub Gist 跨设备同步数据（详见下方）
- **重置数据**：管理面板 → 重置为默认数据

### 批量管理

- **导出**：管理面板 → 导出 JSON，下载当前所有工具数据
- **导入**：管理面板 → 导入 JSON，上传 JSON 文件覆盖当前数据
- **直接编辑**：修改 `src/data/tools.json` 后重新构建即可

## 云端同步

基于 GitHub Gist 实现跨设备/跨浏览器的工具数据同步，无需后端服务。

### 配置步骤

1. 点击 Header 右侧云朵图标，打开同步设置面板
2. 在 [GitHub Token 设置页](https://github.com/settings/tokens/new) 创建一个 **fine-grained token**，只需勾选 `gist` 权限
3. 将 Token 粘贴到输入框中，点击「创建新 Gist」
4. 配置成功后，云朵图标变为蓝色，表示已连接

### 跨设备使用

1. 在新设备上打开同步设置面板
2. 输入相同的 PAT，点击「关联已有 Gist」
3. 输入 Gist ID（可从 GitHub Gist 页面获取），点击「关联并拉取」
4. 数据自动从云端拉取到本地

### 同步机制

- **自动推送**：每次修改工具后，3 秒自动推送到 Gist（可在设置中关闭）
- **手动同步**：支持手动「推送到云端」和「从云端拉取」
- **冲突策略**：Last Write Wins（最后同步覆盖），以云端为准
- **安全存储**：PAT 使用 Base64 编码存储在 localStorage 中，key 统一管理于 `src/constants/storage.js`

## 角色与分类

| 角色 | 强调色 | 工具数 | 主要分类 |
|------|--------|--------|----------|
| 🎓 研究生小骆 | 靛蓝 `#6C63FF` | 93 | AI对话、AI编程、论文检索、算力平台 |
| 👨‍💻 工程师骆总 | 翠绿 `#10b981` | 72 | DevOps、前端开发、编程语言 |
| 📚 学生骆谦实 | 紫色 `#8b5cf6` | 42 | 课程学习、竞赛刷题 |
| 🌟 生活骆同学 | 粉色 `#ec4899` | 36 | 设计工具、效率工具 |
| 👨‍🏫 辅导员骆导 | 橙色 `#f97316` | 25 | 办公协作、文档管理 |

## 设计规范

- **背景色**：`#E0E5EC`（Cool Grey，全局统一）
- **文字色**：`#3D4852`（主文字）/ `#6B7280`（次要文字）
- **圆角**：`32px`（卡片）/ `16px`（按钮、输入框）
- **阴影**：双阴影系统 — 凸起（`9px 9px 16px` + `-9px -9px 16px`）/ 凹陷（`inset`）
- **字体**：Plus Jakarta Sans（标题）/ DM Sans（正文）
- **动画**：`300ms ease-out` 过渡，hover 上浮 + 阴影增强

## License

MIT
