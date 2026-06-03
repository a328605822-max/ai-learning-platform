import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  FlaskConical,
  Lightbulb,
  Wrench,
  Rocket,
  ArrowRight,
  Clock,
  Brain,
  Wallet,
  Baby,
  ChevronRight,
  Sparkles,
  Play,
  Zap,
  Layers,
  Target,
  Code2,
} from "lucide-react";

const moduleData = [
  {
    id: "module-1",
    num: "01",
    title: "AI 认知地基",
    subtitle: "建立对 AI 的正确认知，从零做出你自己的 ChatGPT",
    icon: Rocket,
    weeks: 3,
    hours: 10,
    accent: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/30",
    textAccent: "text-emerald-600 dark:text-emerald-400",
    concepts: ["Token", "上下文窗口", "Temperature", "API 计费"],
    project: "可定制人设的 ChatGPT 应用",
  },
  {
    id: "module-2",
    num: "02",
    title: "记忆与知识",
    subtitle: "让 AI 学会「读书」，掌握企业级 RAG 核心技术",
    icon: BookOpen,
    weeks: 3,
    hours: 10,
    accent: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/5",
    border: "border-blue-500/30",
    textAccent: "text-blue-600 dark:text-blue-400",
    concepts: ["Embedding", "向量数据库", "RAG", "Chunking"],
    project: "会读文档的 AI 问答机器人",
  },
  {
    id: "module-3",
    num: "03",
    title: "智能体觉醒",
    subtitle: "让 AI 拥有「手脚」，能自主执行多步骤任务",
    icon: Wrench,
    weeks: 3,
    hours: 10,
    accent: "from-orange-500 to-amber-500",
    bg: "bg-orange-500/5",
    border: "border-orange-500/30",
    textAccent: "text-orange-600 dark:text-orange-400",
    concepts: ["Function Calling", "Agent 循环", "CoT", "ReAct"],
    project: "会自动干活的 AI Agent",
  },
  {
    id: "module-4",
    num: "04",
    title: "拆解黑盒",
    subtitle: "从零训练微型 GPT，彻底搞懂 AI 的内部原理",
    icon: FlaskConical,
    weeks: 4,
    hours: 14,
    accent: "from-red-500 to-rose-500",
    bg: "bg-red-500/5",
    border: "border-red-500/30",
    textAccent: "text-red-600 dark:text-red-400",
    concepts: ["神经网络", "反向传播", "Transformer", "RLHF"],
    project: "纯 NumPy 实现微型 GPT",
  },
  {
    id: "module-5",
    num: "05",
    title: "产品化",
    subtitle: "把前面学的一切变成一个真正上线的产品",
    icon: Lightbulb,
    weeks: 4,
    hours: 14,
    accent: "from-purple-500 to-pink-500",
    bg: "bg-purple-500/5",
    border: "border-purple-500/30",
    textAccent: "text-purple-600 dark:text-purple-400",
    concepts: ["需求验证", "MVP 开发", "部署上线", "反馈迭代"],
    project: "一个真实的线上 AI 产品",
  },
];

const pillars = [
  {
    icon: Brain,
    title: "搞懂原理",
    desc: "不只会用，还能讲清楚 AI 怎么工作。从 Token 到 Transformer，用最通俗的方式讲透每个核心概念。",
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-50 dark:bg-green-950/20",
  },
  {
    icon: Wallet,
    title: "学会变现",
    desc: "每学一个技术，同步分析商业价值。从卖对话到卖知识到卖行动，建立 AI 产品的完整变现认知。",
    color: "from-yellow-500 to-amber-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
  },
  {
    icon: Baby,
    title: "教会孩子",
    desc: "每个概念都有「给孩子讲」的版本。不仅自己学明白，更能为孩子的 AI 时代教育提前做好准备。",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-950/20",
  },
];

export default function Home() {
  return (
    <div className="space-y-16 pb-20">
      {/* ═══════ Hero Section ═══════ */}
      <section className="relative pt-12 pb-8 lg:pt-16 lg:pb-12">
        {/* Background glow */}
        <div className="absolute inset-0 -top-20 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gradient-to-b from-brand-blue/15 via-brand-purple/10 to-transparent blur-3xl" />
        </div>

        <div className="space-y-5 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs font-medium gap-1">
              <Sparkles className="h-3 w-3" /> v1.0 · 持续更新
            </Badge>
            <Badge variant="outline" className="text-xs">
              约 58 小时 · 17 周
            </Badge>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl">
            <span className="gradient-text">AI 学习之路</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            一套面向有编程基础的学习者的 AI 系统教程。
            <strong className="text-foreground">项目驱动</strong>、<strong className="text-foreground">按需学理论</strong>、<strong className="text-foreground">螺旋深入</strong>。
            兼顾原理理解、副业变现和孩子教育。
          </p>

          <div className="flex items-center gap-4 pt-3">
            <Link
              href="/modules/module-1"
              className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-foreground/90 transition-all hover:scale-[1.02] shadow-lg shadow-foreground/10"
            >
              开始学习
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-semibold hover:bg-accent transition-colors"
            >
              了解更多
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {[
            { icon: Layers, value: "5", label: "学习模块", desc: "从认知到产品" },
            { icon: Clock, value: "17 周", label: "学习周期", desc: "约 4 个月完成" },
            { icon: Target, value: "~58h", label: "总学习时长", desc: "每周仅需 2-4h" },
            { icon: Zap, value: "5 个", label: "实战项目", desc: "每个都可部署上线" },
          ].map((stat) => (
            <Card key={stat.label} className="card-hover text-center">
              <CardContent className="pt-5 pb-5">
                <stat.icon className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                <p className="text-2xl font-extrabold">{stat.value}</p>
                <p className="text-xs font-semibold mt-1">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* ═══════ Three Pillars ═══════ */}
      <section>
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-3">学习理念</Badge>
          <h2 className="text-2xl font-bold lg:text-3xl">不止学技术，还要学思维</h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            每个模块结束后，从三个维度复盘你学到的东西
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} className={`card-hover border-0 shadow-md ${p.bg}`}>
              <CardHeader>
                <div className={`inline-flex rounded-xl bg-gradient-to-br ${p.color} p-3 text-white shadow-lg mb-2`}>
                  <p.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ═══════ Learning Roadmap ═══════ */}
      <section>
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-3">学习路线图</Badge>
          <h2 className="text-2xl font-bold lg:text-3xl">五步，从入门到赚钱</h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            每个模块都是一个完整的 「学概念 → 做项目 → 想变现 → 备教育」 循环
          </p>
        </div>

        <div className="space-y-4">
          {moduleData.map((mod, i) => (
            <Link key={mod.id} href={`/modules/${mod.id}`} className="block group">
              <Card
                className={`relative overflow-hidden card-hover border-l-[4px] ${mod.border} ${mod.bg}`}
                style={{ borderLeftColor: undefined }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    {/* Number badge */}
                    <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${mod.accent} flex items-center justify-center text-white font-black text-lg shadow-md`}>
                      {mod.num}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {mod.title}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {mod.weeks} 周 · ~{mod.hours}h
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">{mod.subtitle}</CardDescription>
                    </div>

                    <div className="hidden lg:flex items-center gap-6 shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">核心概念</p>
                        <div className="flex gap-1 mt-1">
                          {mod.concepts.map((c) => (
                            <Badge key={c} variant="outline" className="text-[10px]">
                              {c}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardHeader>

                {/* Progress bar hint */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent" />
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════ Quick Start ═══════ */}
      <section>
        <Card className="overflow-hidden border-0 shadow-xl">
          <div className="relative p-8 lg:p-12">
            {/* Animated bg */}
            <div className="absolute inset-0 -z-10 animated-gradient opacity-[0.07]" />

            <div className="max-w-2xl space-y-5">
              <div className="flex items-center gap-2">
                <Play className="h-5 w-5 text-brand-blue" />
                <Badge variant="outline">快速开始</Badge>
              </div>

              <h2 className="text-2xl font-bold lg:text-3xl">
                准备好了吗？
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                每周只需 <strong className="text-foreground">2-4 小时</strong>，4 个月后，你将拥有：
                AI 的核心原理认知、至少一个可上线的 AI 产品、一套可以讲给孩子的 AI 思维框架。
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: "从模块一开始", href: "/modules/module-1", primary: true },
                  { label: "查看学习理念", href: "/about" },
                  { label: "育儿视角", href: "/parenting" },
                ].map((btn) =>
                  btn.primary ? (
                    <Link
                      key={btn.label}
                      href={btn.href}
                      className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-foreground/90 transition-all hover:scale-[1.02] shadow-lg"
                    >
                      {btn.label}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ) : (
                    <Link
                      key={btn.label}
                      href={btn.href}
                      className="inline-flex items-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-medium hover:bg-accent transition-colors"
                    >
                      {btn.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* ═══════ Resources ═══════ */}
      <section>
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-3">学习资源</Badge>
          <h2 className="text-2xl font-bold lg:text-3xl">精选学习资源</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Play,
              title: "3Blue1Brown",
              desc: "神经网络可视化讲解，最好的入门动画",
              color: "text-red-600 bg-red-100 dark:bg-red-950/50",
            },
            {
              icon: BookOpen,
              title: "Andrej Karpathy",
              desc: "从零写 GPT，跟着代码敲一遍彻底理解",
              color: "text-blue-600 bg-blue-100 dark:bg-blue-950/50",
            },
            {
              icon: Sparkles,
              title: "DeepLearning.AI",
              desc: "吴恩达系列短课，每门 1-2 小时快速入门",
              color: "text-purple-600 bg-purple-100 dark:bg-purple-950/50",
            },
            {
              icon: Code2,
              title: "OpenAI Cookbook",
              desc: "官方示例代码，API 开发的最佳参考",
              color: "text-green-600 bg-green-100 dark:bg-green-950/50",
            },
          ].map((r) => (
            <Card key={r.title} className="card-hover text-center">
              <CardContent className="pt-5 pb-5">
                <div className={`inline-flex rounded-xl ${r.color} p-3 mb-3`}>
                  <r.icon className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-sm">{r.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
