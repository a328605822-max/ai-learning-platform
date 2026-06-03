import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, Code2, Rocket, DollarSign, ArrowRight, ExternalLink } from "lucide-react";

const sections = [
  {
    title: "AI 产品灵感清单",
    description: "经过验证的 AI 产品方向，按难度和潜在收入分级。灵感来源：ProductHunt、真实案例、市场分析。",
    icon: Lightbulb,
    href: "/toolbox/ideas",
    items: [
      { name: "垂直领域 AI 助手", difficulty: "简单", potential: "中等", example: "育儿问答、法律咨询、健身教练" },
      { name: "文档智能处理", difficulty: "中等", potential: "高", example: "合同摘要、发票识别、论文分析" },
      { name: "自动化 Agent", difficulty: "中等", potential: "高", example: "周报生成、数据收集、客服自动化" },
      { name: "AI + 教育", difficulty: "中等", potential: "高", example: "自适应学习、智能题库、作文批改" },
      { name: "AI 内容创作", difficulty: "简单", potential: "中等", example: "营销文案、SEO 文章、视频脚本" },
    ],
  },
  {
    title: "技术栈模板",
    description: "开箱即用的项目模板，涵盖最常见的 AI 应用场景。克隆即用，快速启动。",
    icon: Code2,
    href: "/toolbox/templates",
    items: [
      { name: "Streamlit + Claude API 聊天应用", type: "模板" },
      { name: "RAG 文档问答系统", type: "模板" },
      { name: "AI Agent 工具调用框架", type: "模板" },
      { name: "Next.js + AI SDK 全栈应用", type: "模板" },
    ],
  },
  {
    title: "部署指南",
    description: "从本地开发到线上运行，覆盖主流免费部署平台的操作手册。",
    icon: Rocket,
    href: "/toolbox/deploy",
    items: [
      { name: "Streamlit Cloud 部署", type: "指南" },
      { name: "Vercel 部署（Next.js/前端）", type: "指南" },
      { name: "Railway 部署（后端服务）", type: "指南" },
      { name: "自定义域名 + HTTPS 配置", type: "指南" },
    ],
  },
  {
    title: "定价与商业模式",
    description: "AI 产品的定价策略、商业模式画布、成本核算方法。",
    icon: DollarSign,
    href: "/toolbox/pricing",
    items: [
      { name: "AI 产品常用定价模式", type: "分析" },
      { name: "API 成本核算方法", type: "工具" },
      { name: "免费增值（Freemium）策略", type: "策略" },
      { name: "B2B vs B2C 定价差异", type: "分析" },
    ],
  },
];

export default function ToolboxPage() {
  return (
    <div className="space-y-10 pb-16 pt-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">变现工具箱</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          从灵感到产品，从技术到商业。这里有你从「学习 AI」走向「用 AI 赚钱」所需的一切实用资源。
        </p>
      </section>

      {sections.map((section, i) => (
        <section key={section.href}>
          <div className="flex items-center gap-3 mb-4">
            <section.icon className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">{section.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {section.items.map((item) => (
              <Card key={item.name} className="hover:shadow-sm transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{item.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {"difficulty" in item ? item.difficulty : item.type}
                    </Badge>
                  </div>
                  {"potential" in item && (
                    <CardDescription className="text-xs">
                      变现潜力：{item.potential} · 示例：{item.example}
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>
          {i < sections.length - 1 && <Separator className="mt-6" />}
        </section>
      ))}

      <div className="rounded-xl border bg-card p-6 text-center space-y-3">
        <h2 className="text-lg font-semibold">持续更新中</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          工具箱将根据学习进度和市场变化持续更新。完成每个模块后，记得回来看对应方向的产品灵感。
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          在 GitHub 上贡献灵感
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
