# PRD：AI 产品经理求职个人网站

| 字段 | 内容 |
|------|------|
| **产品名称** | AI PM Portfolio（暂定） |
| **文档版本** | v1.0 |
| **创建日期** | 2026-04-19 |
| **作者** | — |
| **状态** | 待评审 |

---

## 1. 产品概述

### 1.1 背景

作为一名 AI 专业研二学生，目标是求职 AI 产品经理岗位。当前超过 80% 的 PM 没有个人作品集网站，拥有作品集即可自动进入前 18%，构成显著竞争优势。AI PM 岗位年增长 120%，作品集是展示 AI 专业知识的最佳载体。

### 1.2 产品定位

一个部署在 GitHub Pages 上的**个人品牌网站**，同时承担以下角色：

1. **在线简历** — 向 HR 和面试官展示个人背景与能力
2. **作品广场** — 展示 AI 相关项目经历与产品思考
3. **AI 工具箱** — 个人常用 AI 工具收藏与推荐
4. **内容阵地** — 通过博客输出 AI 产品分析，建立思想领导力

### 1.3 目标用户

| 用户类型 | 核心需求 | 使用场景 |
|----------|----------|----------|
| **HR / 招聘专员** | 快速判断候选人是否匹配岗位 | 收到简历后点击链接查看 |
| **技术面试官** | 评估候选人的技术理解力和项目深度 | 面试前/后浏览作品集 |
| **产品负责人** | 评估候选人的产品思维和商业判断力 | 面试前了解候选人 |
| **行业同行** | 了解作者的专业方向和思考 | 通过搜索引擎或社交媒体发现 |

### 1.4 成功指标

| 指标 | 目标值 | 衡量方式 |
|------|--------|----------|
| 首屏加载时间 (LCP) | < 2.5s | Lighthouse Performance |
| 移动端友好度 | 评分 ≥ 90 | Lighthouse Mobile |
| SEO 可见性 | Google 搜索姓名可找到 | Google Search Console |
| 页面跳出率 | < 40% | Google Analytics |
| 简历下载率 | > 5%（访问联系页的访客中） | 下载按钮点击追踪 |
| Lighthouse 综合评分 | ≥ 95 | Performance + Accessibility + Best Practices + SEO |

---

## 2. 信息架构

### 2.1 站点地图

```
首页 (/)
├── 关于我 (/about)
│   ├── 个人介绍
│   ├── 教育背景
│   ├── 技能矩阵
│   └── PDF 简历下载
├── 作品广场 (/projects)
│   ├── 项目列表页
│   └── 项目详情页 (/projects/[slug])
│       ├── 问题背景
│       ├── 我的角色
│       ├── 解决方案
│       ├── 技术实现
│       └── 成果与反思
├── AI 工具箱 (/toolbox)
│   ├── LLM 工具
│   ├── 图像生成工具
│   ├── 数据分析工具
│   └── 效率工具
├── 博客 (/blog)
│   ├── 文章列表页
│   └── 文章详情页 (/blog/[slug])
└── 联系我 (/contact)
```

### 2.2 全局导航

- **顶部导航栏**（固定）：Logo/姓名 | 关于 | 作品 | 工具箱 | 博客 | 联系
- **移动端**：汉堡菜单，侧边栏滑出
- **页脚**：版权信息 | 社交链接（GitHub / LinkedIn / 邮箱）| 网站地图

---

## 3. 功能需求

### 3.1 P0 — 核心功能（第一阶段交付）

#### FR-01：首页 (Hero)

**描述**：网站的第一屏，3 秒内传达"我是谁、我做什么"。

**内容要素**：
- 一句话定位标签（如"AI 专业研究生 | 产品思维 × 技术深度"）
- 姓名（大号字体）
- 2-3 句自我介绍
- 两个 CTA 按钮：「查看作品」→ /projects，「下载简历」→ PDF 下载
- 社交图标链接（GitHub / LinkedIn / 邮箱）

**交互**：
- CTA 按钮悬停变色 + 微动效
- 社交图标悬停放大

**验收标准**：
- [ ] 首屏在 3 秒内完整加载（含字体和图片）
- [ ] 移动端布局正确，文字可读
- [ ] 两个 CTA 按钮均可正常跳转/下载

---

#### FR-02：关于我页面

**描述**：展示个人背景、教育经历、技能和简历下载。

**内容要素**：
- **个人介绍**：200-300 字的自我介绍，突出 AI 专业背景和产品思维
- **教育背景**：学校、专业、学位、时间、研究方向
- **技能矩阵**：双栏布局
  - 左栏 — 产品技能：用户研究、PRD 撰写、数据分析、竞品分析、项目管理
  - 右栏 — 技术技能：Python、PyTorch、LLM（GPT/Claude）、RAG、Prompt Engineering
- **PDF 简历下载**：醒目的下载按钮

**交互**：
- 技能标签悬停显示熟练度描述（可选）

**验收标准**：
- [ ] PDF 简历可正常下载
- [ ] 技能矩阵在移动端自动切换为单栏
- [ ] 内容排版清晰，无溢出

---

#### FR-03：作品广场

**描述**：展示 3-5 个精选 AI 相关项目。

**列表页内容要素**：
- 每个项目一张卡片，包含：
  - 项目封面图（16:9 比例）
  - 项目名称
  - 一句话描述（解决什么问题）
  - 技术标签（如 `LLM` `RAG` `Python` `React`）
  - 项目角色标签（如"产品策划" "全栈开发"）

**详情页内容要素**（每个项目独立页面）：
- **问题背景**：为什么要做这个项目？解决什么痛点？
- **我的角色**：在项目中承担什么职责？
- **解决方案**：产品方案概述，可配流程图/架构图
- **技术实现**：关键技术选型和实现思路
- **成果与反思**：量化成果 + 项目反思/学到了什么
- **相关链接**：GitHub 仓库、在线 Demo（如有）

**交互**：
- 卡片悬停：轻微上浮 + 阴影加深
- 点击卡片 → 跳转详情页
- 详情页支持图片点击放大（可选）

**数据结构**（Markdown Frontmatter）：

```yaml
---
title: "AI 智能客服系统"
slug: "ai-customer-service"
cover: "/images/projects/ai-cs-cover.jpg"
description: "基于 RAG 的企业级智能客服系统，将客服响应时间减少 60%"
role: "产品策划 & 全栈开发"
tags: ["LLM", "RAG", "Python", "FastAPI"]
date: 2026-01-15
demo_url: "https://demo.example.com"
github_url: "https://github.com/username/project"
---
```

**验收标准**：
- [ ] 项目列表页正确渲染所有项目卡片
- [ ] 点击卡片可跳转到对应详情页
- [ ] 详情页所有内容区块正确显示
- [ ] 新增项目只需添加 Markdown 文件，无需改代码

---

#### FR-04：AI 工具箱

**描述**：分类展示个人收藏的 AI 工具，支持 iframe 嵌入和外链跳转。

**分类结构**：
- LLM 工具（ChatGPT、Claude、Gemini 等）
- 图像生成工具（Midjourney、DALL·E、Stable Diffusion 等）
- 数据分析工具
- 效率工具（Notion AI、Copilot 等）

**每个工具展示**：
- 工具图标/Logo
- 工具名称
- 一句话推荐理由
- 官方链接（外链跳转，`target="_blank" rel="noopener noreferrer"`）

**iframe 嵌入策略**：
- 对于支持 iframe 嵌入的工具（如 CodePen Demo、Figma 嵌入、自建 Demo）→ 使用 iframe 实时预览
- 对于不支持嵌入的工具 → 使用截图卡片 + 外链跳转
- iframe 配置：`sandbox="allow-scripts allow-forms allow-same-origin"` + `loading="lazy"`

**数据结构**（JSON 或 Markdown）：

```yaml
---
title: "ChatGPT"
category: "llm"
icon: "/images/tools/chatgpt.svg"
description: "OpenAI 的通用大语言模型，适合文本生成、代码编写、知识问答等场景"
url: "https://chat.openai.com"
embeddable: false
---
```

**验收标准**：
- [ ] 工具按分类正确分组展示
- [ ] 所有外链均可正常跳转（新标签页打开）
- [ ] 支持 iframe 嵌入的工具可正常预览
- [ ] 不支持嵌入的工具显示截图卡片 + 跳转按钮
- [ ] 新增工具只需添加数据文件，无需改代码

---

#### FR-05：联系我页面

**描述**：提供多种联系方式，方便招聘方和同行联系。

**内容要素**：
- 一句话引导语（如"期待与你交流 AI 产品的可能性"）
- 联系方式卡片：
  - 邮箱（点击复制或打开邮件客户端）
  - LinkedIn（外链）
  - GitHub（外链）
  - 微信二维码（图片展示）
- 可选：简单的联系表单（使用第三方服务如 Formspree）

**验收标准**：
- [ ] 所有联系方式链接可正常工作
- [ ] 微信二维码清晰可扫描
- [ ] 移动端布局正确

---

### 3.2 P1 — 增强功能（第二阶段交付）

#### FR-06：博客系统

**描述**：支持发布 AI 产品分析文章，建立思想领导力。

**内容要素**：
- 文章列表页：按时间倒序展示，支持标签筛选
- 文章详情页：Markdown 渲染，支持代码高亮、图片、表格
- 每篇文章包含：标题、发布日期、标签、阅读时间估算

**数据结构**（Markdown Frontmatter）：

```yaml
---
title: "从产品视角拆解 ChatGPT 的 UX 设计"
slug: "chatgpt-ux-analysis"
date: 2026-03-20
tags: ["AI 产品分析", "UX", "ChatGPT"]
reading_time: 8
cover: "/images/blog/chatgpt-ux.jpg"
excerpt: "深入分析 ChatGPT 的交互设计如何降低 AI 使用门槛..."
---
```

**交互**：
- 标签点击 → 筛选该标签下的所有文章
- 文章内目录导航（TOC，可选）
- 上一篇 / 下一篇导航

**验收标准**：
- [ ] 文章列表正确按时间倒序排列
- [ ] 标签筛选功能正常
- [ ] Markdown 内容正确渲染（标题、代码块、图片、表格、引用）
- [ ] 代码块支持语法高亮
- [ ] 新增文章只需添加 Markdown 文件

---

#### FR-07：SEO 优化

**描述**：优化搜索引擎可见性，让招聘者能通过搜索找到网站。

**实施项**：
- 每个页面配置独立的 `<title>` 和 `<meta description>`
- Open Graph 标签（社交分享预览）
- 结构化数据（JSON-LD）：Person 类型
- 语义化 HTML（正确使用 `<header>` `<main>` `<article>` `<nav>` 等）
- 自动生成 `sitemap.xml`
- 自动生成 `robots.txt`
- 图片 `alt` 文本

**JSON-LD 结构化数据示例**：

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "你的姓名",
  "url": "https://yourname.com",
  "jobTitle": "AI Product Manager",
  "sameAs": [
    "https://github.com/yourname",
    "https://linkedin.com/in/yourname"
  ],
  "knowsAbout": ["AI", "LLM", "RAG", "Product Management", "Python"]
}
```

**验收标准**：
- [ ] 所有页面有独立的 title 和 meta description
- [ ] Open Graph 标签正确配置
- [ ] sitemap.xml 自动生成且可访问
- [ ] Google Search Console 可验证站点

---

### 3.3 P2 — 可选功能（第三阶段）

| 功能 ID | 功能名称 | 描述 | 优先级 |
|---------|----------|------|--------|
| FR-08 | 暗色/亮色主题切换 | 支持系统偏好检测 + 手动切换 | P2 |
| FR-09 | 滚动触发动画 | 各区块随滚动渐入（Framer Motion） | P2 |
| FR-10 | RSS 订阅 | 自动生成 RSS feed | P2 |
| FR-11 | Newsletter 订阅 | 邮箱收集 + 第三方服务集成 | P2 |
| FR-12 | 搜索功能 | 全站内容搜索（Pagefind 或类似方案） | P2 |
| FR-13 | 多语言支持 | 中英文双语切换 | P2 |
| FR-14 | 404 自定义页面 | 友好的 404 页面，引导回首页 | P2 |

---

## 4. 技术规格

### 4.1 技术栈

| 层面 | 技术选型 | 版本 | 说明 |
|------|----------|------|------|
| **框架** | Astro | ^5.x | 静态站点生成，组件岛架构 |
| **样式** | Tailwind CSS | ^4.x | 原子化 CSS |
| **UI 组件** | React（按需） | ^19.x | 仅用于需要交互的组件岛 |
| **动画** | CSS Animations | — | 优先使用 CSS，复杂场景用 Framer Motion |
| **内容管理** | Astro Content Collections | — | 类型安全的 Markdown 内容管理 |
| **代码高亮** | Shiki | — | Astro 内置 |
| **部署** | GitHub Pages | — | 免费，通过 GitHub Actions 自动部署 |
| **域名** | 自定义域名 | — | 通过 DNS 配置 CNAME |
| **分析** | Google Analytics 4 | — | 可选，用于流量分析 |
| **包管理** | npm | ^10.x | — |

### 4.2 项目结构

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── images/
│   │   ├── projects/          # 项目封面图
│   │   ├── blog/              # 博客封面图
│   │   ├── tools/             # 工具图标
│   │   └── avatar.jpg         # 个人头像
│   ├── resume.pdf             # PDF 简历
│   └── CNAME                  # 自定义域名配置
├── src/
│   ├── components/
│   │   ├── Header.astro       # 顶部导航
│   │   ├── Footer.astro       # 页脚
│   │   ├── Hero.astro         # 首屏区块
│   │   ├── ProjectCard.astro  # 项目卡片
│   │   ├── ToolCard.astro     # 工具卡片
│   │   ├── BlogCard.astro     # 博客卡片
│   │   ├── SkillBadge.astro   # 技能标签
│   │   ├── ContactForm.tsx    # 联系表单（React 组件岛）
│   │   └── SEO.astro          # SEO 组件
│   ├── content/
│   │   ├── projects/          # 项目 Markdown 文件
│   │   │   ├── ai-customer-service.md
│   │   │   └── ...
│   │   ├── blog/              # 博客 Markdown 文件
│   │   │   ├── chatgpt-ux-analysis.md
│   │   │   └── ...
│   │   └── tools/             # 工具数据（JSON 或 Markdown）
│   │       └── tools.json
│   ├── layouts/
│   │   ├── BaseLayout.astro   # 基础布局（含 Header/Footer）
│   │   ├── BlogPost.astro     # 博客文章布局
│   │   └── ProjectDetail.astro # 项目详情布局
│   ├── pages/
│   │   ├── index.astro        # 首页
│   │   ├── about.astro        # 关于我
│   │   ├── projects/
│   │   │   ├── index.astro    # 作品列表
│   │   │   └── [...slug].astro # 项目详情（动态路由）
│   │   ├── toolbox.astro      # AI 工具箱
│   │   ├── blog/
│   │   │   ├── index.astro    # 博客列表
│   │   │   └── [...slug].astro # 博客详情
│   │   ├── contact.astro      # 联系我
│   │   └── 404.astro          # 404 页面
│   ├── styles/
│   │   └── global.css         # 全局样式（Tailwind 指令）
│   └── utils/
│       └── helpers.ts         # 工具函数
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml         # GitHub Actions 部署配置
```

### 4.3 GitHub Actions 部署配置

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 4.4 自定义域名配置

1. 在 `public/CNAME` 中写入域名（如 `yourname.com`）
2. 在域名注册商配置 DNS：
   - CNAME 记录指向 `<username>.github.io`
3. 在 GitHub 仓库 Settings → Pages → Custom domain 填入域名
4. 等待 SSL 证书自动签发
5. 启用 Enforce HTTPS

---

## 5. 设计规范

### 5.1 设计原则

| 原则 | 说明 |
|------|------|
| **内容优先** | 设计服务于内容，不喧宾夺主 |
| **极简专业** | 留白充足，信息层次清晰 |
| **一致性** | 统一的配色、字体、间距、圆角 |
| **响应式** | 移动端优先，确保所有设备上体验良好 |
| **可访问性** | 足够的色彩对比度、键盘可导航、语义化 HTML |

### 5.2 配色方案

```
主色调 (Primary):     #1a1a2e  (深蓝黑) — 用于标题、导航
辅助色 (Secondary):   #0f3460  (深蓝)   — 用于副标题、链接
强调色 (Accent):      #e94560  (珊瑚红) — 用于 CTA 按钮、重点标记
背景色 (Background):  #ffffff  (白色)   — 页面背景
卡片背景 (Card):      #f5f7fa  (浅灰)   — 卡片、区块背景
文字色 (Text):        #333333  (深灰)   — 正文文字
辅助文字 (Muted):     #666666  (中灰)   — 次要信息
```

### 5.3 字体规范

| 用途 | 字体 | 字号 | 字重 |
|------|------|------|------|
| H1（页面标题） | 系统字体栈 | 2.25rem (36px) | 700 |
| H2（区块标题） | 系统字体栈 | 1.75rem (28px) | 700 |
| H3（子标题） | 系统字体栈 | 1.25rem (20px) | 600 |
| 正文 | 系统字体栈 | 1rem (16px) | 400 |
| 辅助文字 | 系统字体栈 | 0.875rem (14px) | 400 |
| 代码 | JetBrains Mono / monospace | 0.875rem (14px) | 400 |

**系统字体栈**：
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC",
             "Microsoft YaHei", sans-serif;
```

### 5.4 间距规范

| 场景 | 间距 |
|------|------|
| 区块之间 | 64px (4rem) |
| 卡片之间 | 24px (1.5rem) |
| 段落之间 | 16px (1rem) |
| 容器内边距 | 24px（移动端）/ 64px（桌面端） |
| 最大内容宽度 | 1200px |

### 5.5 响应式断点

| 断点 | 宽度 | 说明 |
|------|------|------|
| sm | ≥ 640px | 大屏手机 |
| md | ≥ 768px | 平板 |
| lg | ≥ 1024px | 笔记本 |
| xl | ≥ 1280px | 桌面显示器 |

---

## 6. 内容规范

### 6.1 项目案例研究模板

每个项目详情页应遵循以下结构：

```markdown
---
title: "项目名称"
slug: "project-slug"
cover: "/images/projects/cover.jpg"
description: "一句话描述"
role: "你的角色"
tags: ["标签1", "标签2"]
date: 2026-01-15
demo_url: ""
github_url: ""
---

## 问题背景

描述项目要解决的核心问题。为什么这个问题重要？目标用户是谁？

## 我的角色

描述你在项目中承担的具体职责。

## 解决方案

描述你的产品方案。可包含：
- 产品架构图
- 用户流程图
- 关键设计决策及理由

## 技术实现

描述关键技术选型和实现思路。不需要代码细节，重点是"为什么选这个方案"。

## 成果与反思

### 量化成果
- 指标 1：具体数字 + 对比（如"将响应时间从 30s 降低到 5s"）
- 指标 2：...

### 项目反思
- 做得好的地方
- 可以改进的地方
- 学到了什么
```

### 6.2 博客文章模板

```markdown
---
title: "文章标题"
slug: "article-slug"
date: 2026-03-20
tags: ["标签1", "标签2"]
reading_time: 8
cover: "/images/blog/cover.jpg"
excerpt: "2-3 句话的文章摘要，用于列表页展示"
---

文章正文...
```

### 6.3 内容更新频率建议

| 内容类型 | 建议频率 |
|----------|----------|
| 项目作品 | 每完成一个重要项目后更新 |
| 博客文章 | 每两周一篇 |
| 工具收藏 | 发现好工具时随时更新 |
| 简历 | 每月检查一次，确保最新 |

---

## 7. 分阶段实施计划

### 第一阶段：核心搭建（1-2 周）

| 任务 | 优先级 | 预计工时 | 依赖 |
|------|--------|----------|------|
| 项目初始化（Astro + Tailwind） | P0 | 2h | — |
| 基础布局组件（Header / Footer / BaseLayout） | P0 | 3h | 项目初始化 |
| SEO 组件（meta tags / JSON-LD） | P0 | 2h | 基础布局 |
| 首页（Hero 区块） | P0 | 3h | 基础布局 |
| 关于我页面 | P0 | 3h | 基础布局 |
| 作品广场（列表页 + 详情页） | P0 | 6h | 基础布局 + Content Collections |
| AI 工具箱页面 | P0 | 4h | 基础布局 |
| 联系我页面 | P0 | 2h | 基础布局 |
| 404 页面 | P0 | 1h | — |
| 响应式适配（移动端测试） | P0 | 3h | 所有页面 |
| GitHub Actions 部署配置 | P0 | 1h | 所有页面 |
| 自定义域名配置 | P0 | 1h | 部署成功 |
| Lighthouse 性能优化 | P0 | 3h | 所有页面 |

**第一阶段交付物**：
- [ ] 完整的 5 个核心页面（首页、关于、作品、工具箱、联系）
- [ ] GitHub Pages 部署成功
- [ ] 自定义域名生效
- [ ] Lighthouse 四项评分均 ≥ 90
- [ ] 移动端适配完成

---

### 第二阶段：内容增强（持续）

| 任务 | 优先级 | 预计工时 | 依赖 |
|------|--------|----------|------|
| 博客系统（列表页 + 详情页） | P1 | 4h | 第一阶段 |
| 博客文章内容创作（首批 3 篇） | P1 | 6h | 博客系统 |
| sitemap.xml 自动生成 | P1 | 1h | — |
| Google Search Console 验证 | P1 | 1h | 部署成功 |
| Google Analytics 接入 | P1 | 1h | 部署成功 |
| Open Graph 标签完善 | P1 | 1h | SEO 组件 |

**第二阶段交付物**：
- [ ] 博客系统可用
- [ ] 首批 3 篇博客文章发布
- [ ] Google 可索引
- [ ] 流量分析可用

---

### 第三阶段：体验优化（按需）

| 任务 | 优先级 | 预计工时 | 依赖 |
|------|--------|----------|------|
| 暗色/亮色主题切换 | P2 | 4h | 第一阶段 |
| 滚动触发动画 | P2 | 3h | 第一阶段 |
| RSS 订阅 | P2 | 1h | 博客系统 |
| 全站搜索 | P2 | 3h | 第一阶段 |
| 多语言支持 | P2 | 8h | 第一阶段 |

---

## 8. 非功能需求

### 8.1 性能

| 指标 | 目标 |
|------|------|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| 首屏加载 (LCP) | < 2.5s |
| 累积布局偏移 (CLS) | < 0.1 |
| 首次输入延迟 (FID) | < 100ms |

### 8.2 兼容性

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | 最近 2 个主版本 |
| Firefox | 最近 2 个主版本 |
| Safari | 最近 2 个主版本 |
| Edge | 最近 2 个主版本 |
| iOS Safari | 最近 2 个主版本 |
| Android Chrome | 最近 2 个主版本 |

### 8.3 可访问性

- 所有图片提供 `alt` 文本
- 色彩对比度符合 WCAG AA 标准（≥ 4.5:1）
- 支持键盘导航
- 使用语义化 HTML 标签
- 表单元素关联 `label`

### 8.4 安全

- 所有外链使用 `rel="noopener noreferrer"`
- iframe 使用 `sandbox` 属性限制权限
- 不收集用户个人数据（除可选的 Analytics）
- 使用 HTTPS

---

## 9. 风险与依赖

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|----------|
| 部分工具网站阻止 iframe 嵌入 | 工具箱部分工具无法预览 | 高 | 采用截图卡片 + 外链的备选方案 |
| GitHub Pages 构建失败 | 网站无法更新 | 低 | 本地构建测试后再推送 |
| 自定义域名 DNS 配置复杂 | 域名无法生效 | 中 | 参考 GitHub 官方文档，预留 48h 生效时间 |
| 图片加载过慢影响性能 | Lighthouse 评分下降 | 中 | 使用 WebP 格式 + 懒加载 + CDN |
| 博客内容创作时间不足 | 博客长期不更新 | 高 | 降低频率目标，保证质量优先 |

---

## 附录 A：参考资源

- [Astro 官方文档](https://docs.astro.build)
- [Tailwind CSS 官方文档](https://tailwindcss.com/docs)
- [GitHub Pages 部署指南](https://docs.github.com/zh/pages)
- [Brittany Chiang 个人网站](https://brittanychiang.com)（设计参考）
- [Astro 博客模板](https://astro.build/themes/?search=blog)（起步参考）
- [Institute of AI PM - AI PM 简历与作品集指南](https://www.institutepm.com/knowledge-hub/ai-pm-resume-portfolio-guide)

---

## 附录 B：变更记录

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|----------|------|
| v1.0 | 2026-04-19 | 初始版本 | — |
