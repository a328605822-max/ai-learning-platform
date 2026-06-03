# AI 学习之路 — 教程平台

## 项目概述

面向有编程基础的成人的 AI 系统教程网站。项目驱动、按需学理论、螺旋深入、三视角复盘（原理/变现/教育）。

- **目标用户**：会 Python 的开发者，每周 2-4 小时
- **技术栈**：Next.js 16 + TypeScript + Tailwind CSS + shadcn/ui + MDX + Framer Motion + p5.js + Mermaid
- **部署**：Cloudflare Pages（国内可访问）+ Vercel（备选）
- **构建**：35 个页面，全部静态生成（`output: "export"`）
- **生产 URL**：https://ai-learning-platform-81u.pages.dev（Cloudflare）/ https://ai-learning-platform-zeta-jet.vercel.app（Vercel）
- **GitHub**：https://github.com/a328605822-max/ai-learning-platform

## 关键命令

```bash
npm run dev      # 开发服务器
npm run build    # 生产构建 → out/ 静态文件
npx shadcn@latest add <component> -y  # 添加 shadcn 组件

# 部署
npx wrangler pages deploy out/ --project-name=ai-learning-platform --branch=master  # Cloudflare Pages
vercel deploy --prod    # Vercel（需翻墙）
```

## 项目结构

```
src/
├── app/
│   ├── page.tsx                        # 首页
│   ├── layout.tsx                      # 根布局（SidebarProvider + TooltipProvider + ReadingProgress）
│   ├── globals.css                     # 全局样式 + 品牌色(AI紫#7C3AED/学习青#0D9488) + reduced-motion
│   ├── modules/
│   │   ├── layout.tsx                  # ★ 所有模块页共享布局（自动注入右侧目录 TableOfContents）
│   │   ├── [module]/page.tsx           # 模块概述（SSG动态路由）
│   │   ├── [module]/[week]/page.tsx    # 周教程（SSG动态路由，M2-M5用）
│   │   └── module-1/                   # M1 MDX教程（静态页面覆盖动态路由）
│   │       ├── page.mdx                # M1概述
│   │       ├── week-1/page.mdx         # 第一周：AI全景图
│   │       ├── week-2/page.mdx         # 第二周：Token与上下文
│   │       └── week-3/page.mdx         # 第三周：打造ChatGPT
│   ├── labs/                           # 5个交互可视化Lab
│   │   ├── page.tsx                    # Lab首页（全部"可用"状态）
│   │   ├── token-viz/                  # Token解剖器 (p5.js)
│   │   ├── embedding-viz/              # Embedding星系 (React SVG)
│   │   ├── temperature-lab/            # Temperature实验室 (React + shadcn Slider)
│   │   ├── nn-playground/             # 神经网络游乐场 (p5.js)
│   │   └── attention-lab/             # Attention可视化 (React SVG)
│   ├── toolbox/page.tsx                # 变现工具箱
│   ├── parenting/page.tsx              # 育儿视角
│   └── about/page.tsx                  # 关于
├── components/
│   ├── layout/
│   │   ├── app-sidebar.tsx             # shadcn Sidebar（collapsible="icon"）
│   │   ├── reading-progress.tsx        # 页面顶部渐变色阅读进度条
│   │   ├── table-of-contents.tsx       # ★ 右侧悬浮目录（Spring动画指示器，lg:以上显示）
│   │   └── theme-provider.tsx          # next-themes Provider
│   ├── ui/
│   │   ├── animated-section.tsx        # Framer Motion 滚动揭示（4方向+延迟）
│   │   ├── scroll-reveal.tsx           # Stagger子元素序列揭示
│   │   ├── video-card.tsx              # 视频卡片（YouTube/B站，脉冲播放动画）
│   │   └── mermaid-diagram.tsx         # MDX内嵌Mermaid流程图（客户端渲染）
│   ├── labs/
│   │   ├── p5-wrapper.tsx              # p5.js React安全包装（自动cleanup）
│   │   ├── token-lab.tsx               # Token可视化（输入→实时Canvas渲染）
│   │   ├── embedding-lab.tsx           # Embedding星系（SVG 2D聚类+悬停连线）
│   │   ├── temperature-lab.tsx         # Temperature实验室（滑块+概率分布动画）
│   │   ├── nn-playground.tsx           # 神经网络游乐场（实时训练+决策边界）
│   │   └── attention-lab.tsx           # Attention可视化（矩阵热力图+句子交互）
│   └── mdx/
│       ├── rich-components.tsx         # 17个富组件（ConceptCard, StepGuide, ReviewPanel等）
│       └── code-block.tsx              # 代码块（mac红绿灯+复制按钮，客户端组件）
├── lib/
│   └── modules.ts                      # 5个模块完整数据（概念、周内容、变现/教育视角）
└── mdx-components.tsx                  # ★ 全局MDX组件注册（富组件+图标+VideoCard+MermaidDiagram）

public/images/
├── concepts/                           # 概念插图
│   ├── llm-robot.png                   # Nano Banana 2: LLM机器人猜字 (494KB)
│   ├── temperature.png                 # Nano Banana 2: Temperature谱系 (1.15MB)
│   ├── embedding-space.png             # Nano Banana 2: Embedding 3D空间 (1.66MB)
│   ├── neural-network.png             # Nano Banana 2: 神经网络层结构 (1.69MB)
│   ├── llm-next-word.svg              # 手绘: LLM猜字过程
│   ├── token-compare.svg              # 手绘: Token中英对比
│   └── embedding-space.svg            # 手绘: Embedding向量空间
└── diagrams/                           # 技术架构图
    ├── rag-pipeline.svg               # 手绘: RAG管道全流程
    └── agent-loop.svg                 # 手绘: Agent思考-行动-观察循环
```

## 图片嵌入映射

| MDX页面 | 插图 | 位置 |
|---------|------|------|
| M1 W1 | `llm-robot.png` | "LLM怎么工作"讲解后——原理讲完用图卖萌加深 |
| M1 W2 | `token-compare.svg` | "关键事实"数据表后——先看数据再看可视化 |
| M1 W3 | `temperature.png` | Temperature代码处——写代码时看图理解参数含义 |
| M2 W1 | `embedding-space.svg` + `embedding-space.png` | Embedding概念讲解中 |
| M2 W3 | `rag-pipeline.svg` | RAG流程讲解中 |
| M3 W2 | `agent-loop.svg` | Agent循环讲解中 |
| M4 W1 | `neural-network.png` | 神经网络结构讲解中 |
| M4 W3 | (待生成) | Transformer Attention讲解中 |

## 图片使用原则

- **位置**：配合文字在恰当位置插入，不一味放最上面。读者先理解概念，然后看图加深印象
- **风格**：配文口语化、可幽默卖萌，帮助记忆而非干巴巴的学术说明
- **密度**：每篇教程至少1张插图+1张架构图+1个视频卡片
- **格式**：AI插图PNG（1200×675, 16:9），架构图SVG优先（体积小、无损、响应式）
- **嵌入**：`<ImageCard src="/images/..." alt="..." caption="..." />`
- **MDX注意**：caption中不能用英文双引号`""`，改用中文书名号`「」`

## 生图方案

### Nano Banana 2（主方案，需OpenRouter付费）
- 模型：`google/gemini-3.1-flash-image-preview`（通过OpenRouter调用）
- 质量极高（1-1.7MB/张），速度和质量的完美平衡
- OpenRouter免费额度有限，建议充$5=几十张图
- `.env` 中配置：`OPENROUTER_API_KEY=sk-or-v1-xxx`

### Replicate（备选）
- FLUX模型质量极高，但需要付费（无免费额度）
- `.env` 中配置：`REPLICATE_API_TOKEN=r8_xxx`

### SVG手绘（完全自主，免费）
- 架构图、流程图、对比图
- 暗色主题（#0f172a背景），完全可控、响应式、<5KB/张

## 开发注意事项

### MDX
- MDX文件中自定义组件需在文件顶部 `import`
- Lucide图标需显式 `import { IconName } from "lucide-react"`
- `mdx-components.tsx` 中注册的组件全局可用
- **caption中禁止英文双引号** `""` —— MDX解析为HTML属性分隔符，使用中文书名号`「」`
- 静态MDX页面覆盖同名动态路由，但共享父级 `layout.tsx`（目录通过此注入）

### 目录系统
- `modules/layout.tsx` 为所有模块页注入 `TableOfContents`（静态MDX+动态路由均覆盖）
- TOC使用 `querySelectorAll("h2, h3")` 自动提取标题
- TOC位置：`fixed right-6 w-52`，内容区自动 `mr-56` 避让
- Spring动画指示器：`stiffness: 500, damping: 35`
- 少于2个标题时自动隐藏

### 动画
- Framer Motion `ease` 需 `"easeOut" as const` 类型断言
- `prefers-reduced-motion` 全局处理，自动降级为0.01ms
- AnimatedSection：滚动到视口时触发，`once: true, margin: "-60px"`
- ScrollReveal：staggerChildren 0.1s序列揭示

### p5.js
- 通过 `P5Wrapper` 包装，`deps` 数组变化时重建实例
- `new P5(sketch, containerRef.current)` 创建实例
- 组件卸载时自动 `remove()`

### shadcn
- Sidebar 使用 `SidebarProvider` 包裹，`collapsible="icon"` 支持折叠
- Slider `onValueChange` 返回 `number | number[]`，需 `Array.isArray` 判断

### 布局
- 根布局：`SidebarProvider` → `TooltipProvider` → `main flex-1` + `Toaster`
- 模块布局：`relative` → `div lg:mr-56`（内容区）+ `TableOfContents`（固定右侧）
- 首页无TOC，直接使用根布局

## 最终交付状态（2026-05-28）

### 全部模块完成
| 模块 | 周数 | FLUX PNG | SVG | 状态 |
|------|------|----------|-----|------|
| M1 认知地基 | 3 周 | 4 | 3 | ✅ 完成 |
| M2 记忆与知识 | 3 周 | 5 | 3 | ✅ 完成 |
| M3 智能体觉醒 | 3 周 | 5 | 4 | ✅ 完成 |
| M4 拆解黑盒 | 4 周 | 6 | 5 | ✅ 完成 |
| M5 产品化 | 4 周 | 4 | 3 | ✅ 完成 |
| **合计** | **17 周** | **24** | **18** | **42 张插图** |

### 全部 FLUX PNG 清单
```
public/images/concepts/
├── llm-robot.png (494KB)          # M1 W1
├── temperature.png (1.15MB)       # M1 W3
├── embedding-space.png (1.66MB)   # M2 W1
├── neural-network.png (1.69MB)    # M4 W1
├── semantic-space-3d.png (1162KB) # M2 W1
├── vector-db-concept.png (1150KB) # M2 W2
├── chunking-strategy.png (855KB)  # M2 W2
├── rag-full-pipeline.png (728KB)  # M2 W3
├── rag-vs-pure-llm.png (645KB)    # M2 W3
├── function-calling-concept.png (1252KB) # M3 W1
├── tool-schema.png (635KB)        # M3 W1
├── agent-thinking-process.png (695KB)  # M3 W2
├── react-pattern.png (657KB)      # M3 W2
├── multi-agent-scene.png (1387KB) # M3 W3
├── perceptron-to-network.png (795KB)    # M4 W1
├── backpropagation-visual.png (1525KB)  # M4 W2
├── gradient-descent-landscape.png (1137KB) # M4 W2
├── transformer-attention-heatmap.png (1313KB) # M4 W3
├── self-attention-mechanism.png (1145KB) # M4 W3
├── gpt-training-process.png (1171KB)     # M4 W4
├── product-direction-decision.png (1083KB) # M5 W1
├── ai-coding-workflow.png (694KB)        # M5 W2
├── deployment-architecture.png (995KB)   # M5 W3
└── user-feedback-loop.png (700KB)        # M5 W4
```

### 全部 SVG 清单
```
public/images/diagrams/
├── rag-pipeline.svg          # M2 W3
├── agent-loop.svg            # M3 W2
├── semantic-vs-keyword.svg   # M2 W1
├── chunking-compare.svg      # M2 W2
├── chroma-architecture.svg   # M2 W2
├── function-calling-flow.svg # M3 W1
├── tool-selection-flow.svg   # M3 W1
├── agent-loop-states.svg     # M3 W2
├── human-in-the-loop.svg     # M3 W3
├── forward-pass.svg          # M4 W1
├── backprop-chain.svg        # M4 W2
├── transformer-architecture.svg # M4 W3
├── attention-weights.svg     # M4 W3
├── gpt-architecture.svg      # M4 W4
├── product-decision-tree.svg # M5 W1
├── mvp-workflow.svg           # M5 W2
├── deploy-compare.svg         # M5 W3
```

public/images/concepts/
├── llm-next-word.svg          # M1 W1
├── token-compare.svg          # M1 W2
└── embedding-space.svg        # M2 W1

### UI 修复记录
- `token-compare.svg` viewBox 高度 380→400（修复底部裁剪）
- ImageCard 非 wide 模式居中（`flex flex-col items-center` + `max-w-2xl`）
- KeyPoint 组件 `<p>` → `<div>`（修复嵌套 `<p>` 水合错误）
- DataTable 组件替代全部 markdown 表格（渐变表头 + 斑马纹 + hover）
- TOC 添加 `usePathname()` 依赖（修复周切换时目录不更新）
- Sidebar 添加 `cursor-pointer`（修复 I 字光标）
- `<body>` 添加 `suppressHydrationWarning`（修复 next-themes 警告）
- Lucide 图标注意：`Search`/`Eye`/`Settings` 不存在，用 `ScanSearch`/`ScanEye`/`Cog`

### 图片使用原则（最终版）
- 图片分散放置，每处一张（不扎堆放 2-3 张）
- caption 使用中文书名号「」而非英文引号""
- 所有图片居中，`w-full`（SVG 必须 `w-full`，`max-w-full` 会导致 SVG 塌缩）
- 每篇教程至少 1 张 FLUX PNG + 1 张 SVG + 代码示例 + 三视角复盘

### 生图方案
- Replicate FLUX (`black-forest-labs/flux-1.1-pro`)：16:9，约 500-1500KB/张
- 限流：免费版约 6 次/分钟，请求间隔 12s
- 需绕过代理：`proxies={"http": None, "https": None}`
- SVG 手绘：免费，暗色主题 `#0f172a`，<5KB/张

### 部署说明

- **Cloudflare Pages**（主，国内可访问）：`npx wrangler pages deploy out/ --project-name=ai-learning-platform --branch=master`
  - 生产 URL：https://ai-learning-platform-81u.pages.dev
  - 自定义域名：Dash → Workers & Pages → ai-learning-platform → Custom domains
- **Vercel**（备选，需翻墙）：`vercel deploy --prod`
  - 生产 URL：https://ai-learning-platform-zeta-jet.vercel.app
- 项目使用 `output: "export"` 静态导出，生成 `out/` 目录
- 首次部署需先创建项目：`npx wrangler pages project create ai-learning-platform --production-branch=master`

### 已知问题
- M3 W3 `safety-boundary.png` 未生成（Replicate 余额不足，用 `human-in-the-loop.svg` 替代）
- 移动端响应式待优化
- Replicate API Key 需充值（已用完 10 次额度）

### 自有 Skill
本项目模式已提取为 Skill：`ai-tutorial-platform`
- 路径：`C:\Users\liuch\.claude\skills\ai-tutorial-platform\SKILL.md`
- 其他项目调用：描述需求时提及「AI教程平台」「tutorial platform」等关键词自动触发
- 或使用 `/ai-tutorial-platform` 显式调用
