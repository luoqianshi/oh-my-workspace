<template>
  <component :is="iconComponent" :size="size" :strokeWidth="strokeWidth" :theme="theme" :fill="fill" />
</template>

<script setup>
import { computed } from 'vue'
import {
  Message, Code, Paint, Brain, Search, Edit, Cloudy, BookOpen, Data,
  Laptop, NetworkTree, Server, DatabasePoint, Rocket, Link, Folder, Pencil,
  People, Broadcast, ChartHistogram, FileCollection,
  ReadBook, ElectronicPen, Trophy, Video, MapRoad,
  Lightning, FormatBrush, Globe,
  Robot, BachelorCap, Tool, Compass, Setting, Close,
  Plus, Download, Upload, Refresh, Delete, Check,
  AllApplication, HamburgerButton, PreviewOpen
} from '@icon-park/vue-next'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  strokeWidth: { type: Number, default: 2 },
  theme: { type: String, default: 'outline' },
  fill: { type: [String, Array], default: 'currentColor' },
})

// 工具名称 → 图标映射（覆盖常用工具）
const toolIconMap = {
  'chatgpt': Robot, 'claude': Robot, 'gemini': Brain, 'deepseek': Brain,
  'cursor': Code, 'github-copilot': Code, 'copilot': Code,
  'midjourney': Paint, 'dall-e': Paint, 'liblibai': Paint,
  'notion': BookOpen, 'figma': FormatBrush, 'canva': FormatBrush,
  'vs-code': Laptop, 'vscode': Laptop, 'intellij': Laptop, 'pycharm': Laptop,
  'docker': Cloudy, 'github': AllApplication, 'gitlab': AllApplication,
  'nginx': Server, 'mysql': DatabasePoint, 'redis': DatabasePoint, 'mongodb': DatabasePoint,
  'python': Code, 'java': Code, 'typescript': Code, 'go': Code, 'rust': Code,
  'react': NetworkTree, 'vue.js': NetworkTree, 'vue': NetworkTree, 'next.js': NetworkTree,
  'spring-boot': Server, 'django': Server, 'flask': Server, 'fastapi': Server,
  'node.js': Server, 'express.js': Server,
  'leetcode': Trophy, 'kaggle': Trophy,
  'bilibili': Video, 'youtube': Video,
  'google-colab': Cloudy, 'autodl': Cloudy, 'featurize': Cloudy,
  'overleaf': Edit, 'grammarly': Edit, 'zotero': BookOpen,
  'hugging-face': Brain, 'arxiv': Search, 'semantic-scholar': Search,
  'web-of-science': Search, 'scihub': Search, 'sci-hub': Search,
  'zhi-pu-qing-yan': Robot, 'doubao': Robot, 'kimi': Robot,
  'tong-yi-qian-wen': Robot, 'wen-xin-yi-yan': Robot,
  'teng-xun-yuan-bao': Robot, 'xun-fei-xing-huo': Robot,
  'mi-ta-ai': Search, 'grok': Robot, 'perplexity': Search,
  'feishu': People, 'wps': FileCollection, 'jin-shan-wen-dang': FileCollection,
  'tencent-docs': FileCollection, 'processon': Data,
  'draw.io': Data, 'drawio': Data, 'echarts': ChartHistogram,
  'matplotlib': ChartHistogram, 'seaborn': ChartHistogram,
  'postman': Link, 'swagger': Link,
  'vercel': Cloudy, 'netlify': Cloudy, 'ali-yun': Cloudy, 'teng-xun-yun': Cloudy,
  'aws': Cloudy, 'cloudflare': Cloudy,
  'manus': Robot, 'kou-zi': Robot, 'codegeex': Code, 'windsurf': Code,
  'trae': Code, 'sider': Robot, 'notebooklm': BookOpen,
  'waytoagi': Compass, 'chatbox': Message,
  'gitee': AllApplication, 'jenkins': Server, 'kubernetes': Cloudy,
  'linux': Laptop, 'vim': Pencil, 'git': Tool,
  'npm': Tool, 'webpack': Tool, 'vite': Lightning,
  'element-ui': NetworkTree, 'vant': NetworkTree, 'taro': NetworkTree,
  'uni-app': NetworkTree, 'd3.js': ChartHistogram, 'nuxt.js': NetworkTree,
  'svelte': NetworkTree, 'halo': Cloudy, '1panel': Setting,
  'gradio': NetworkTree, 'fastgpt': Brain, 'litellm': Link,
  'openrouter': Link, 'siliconcloud': Cloudy,
  'robocflow': Data, 'pandas': Data, 'plotly': ChartHistogram,
  'deepwiki': BookOpen, 'consensus': Search, 'scite': Search,
  'openalex': Search, 'endnote': BookOpen, 'mendeley': BookOpen,
  'latex': Edit, 'deepl': Message, 'quillbot': Edit,
  'paperword': FileCollection, 'paperpass': FileCollection, 'easyscholar': Search,
  'code-with-gpu': Cloudy, 'mo-mo-she-qu': Cloudy, 'openi': Cloudy,
  'iCraft-editor': Data, 'pgf/tikz': Data,
  'moonlight': BookOpen, 'stanford-agentic-reviewer': Brain,
  'bi-mu-yu': Edit, 'paperbanana': Paint, 'google-stitch': FormatBrush,
  'xiang-su-dan-gao': FormatBrush, 'picdoc': ChartHistogram, 'lovart': FormatBrush,
  'ji-meng-ai': Paint, 'hai-luo-ai': Video, 'ke-ling-ai': Video,
  'longcat-ai': Robot, 'autoglm': Robot, 'flowith-ai': Robot,
  'ma-shang-fei': Code, 'qoder': Code, 'opencode': Code,
  'openai-codex': Code, 'teng-xun-codebuddy': Code, 'wen-xin-kuai-ma': Code,
  'deveco-studio': Laptop, 'stackblitz': Cloudy,
  'minio': DatabasePoint, 'elasticsearch': Search,
  'vercel-cli': Tool, 'ruoyi': Server, 'easyexcel': FileCollection,
  'w3school': BookOpen, 'runoob': BookOpen, 'mdn-web-docs': BookOpen,
  'python-guan-wang': Code, 'python-zh': Code,
  'go-yu-yan-zhong-wen-wang': Code, 'linux-ming-ling': Laptop,
  'c++-can-kao': Code, 'redis-guan-fang': DatabasePoint,
}

// 分类 → 图标映射
const categoryIconMap = {
  'AI对话': Message, 'AI编程': Code, 'AI绘画/生成': Paint, 'AI学术': Brain,
  '论文检索': Search, '论文写作': Edit, '算力平台': Cloudy, '文献管理': BookOpen, '科研绘图': Data,
  '编程语言': Code, '前端开发': NetworkTree, '后端开发': Server, '数据库': DatabasePoint,
  'DevOps': Rocket, 'API/网络': Link, '代码托管': Folder, 'IDE/编辑器': Laptop,
  '办公协作': People, '通知发布': Broadcast, '数据统计': ChartHistogram, '文档管理': FileCollection,
  '课程学习': ReadBook, '考试备考': ElectronicPen, '竞赛刷题': Trophy, '视频教程': Video, '学习路线': MapRoad,
  '效率工具': Lightning, '设计工具': FormatBrush, '实用网站': Globe,
}

// 角色 → 图标映射
const roleIconMap = {
  'graduate': BachelorCap, 'engineer': Laptop, 'counselor': People,
  'student': ReadBook,
}

// 通用图标映射（用于未匹配的工具）
const genericIconMap = {
  '搜索': Search, '管理': Setting, '关闭': Close,
  '添加': Plus, '下载': Download, '上传': Upload, '刷新': Refresh,
  '删除': Delete, '确认': Check, '菜单': HamburgerButton, '预览': PreviewOpen,
}

const iconComponent = computed(() => {
  // 1. 先查工具名映射
  const key = props.name.toLowerCase().trim()
  if (toolIconMap[key]) return toolIconMap[key]

  // 2. 查分类映射
  if (categoryIconMap[props.name]) return categoryIconMap[props.name]

  // 3. 查角色映射
  if (roleIconMap[props.name]) return roleIconMap[props.name]

  // 4. 查通用映射
  if (genericIconMap[props.name]) return genericIconMap[props.name]

  // 5. 默认
  return Tool
})
</script>
