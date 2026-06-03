import { AttentionLab } from "@/components/labs/attention-lab";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AttentionLabPage() {
  return (
    <div className="space-y-8 pb-16 pt-8">
      <Link href="/labs" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
        <ArrowLeft className="h-3.5 w-3.5" /> 实验室
      </Link>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">交互 Lab</Badge>
          <Badge variant="secondary">模块四</Badge>
        </div>
        <h1 className="text-3xl font-bold">Attention 可视化</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          输入一个句子，观察 Attention 机制如何让每个字「关注」其他字。理解 Transformer 的核心工作原理。
        </p>
      </div>
      <div className="rounded-xl border p-6 bg-card">
        <AttentionLab />
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <h2>你学到了什么</h2>
        <ul>
          <li>每个字在生成时，会「回顾」上下文的所有字</li>
          <li>Attention 权重越高，表示这两个字的关系越密切</li>
          <li>Self-Attention 让模型能处理长距离依赖（如指代消解）</li>
          <li>这就是为什么 Transformer 比 RNN 更好地处理长文本</li>
        </ul>
      </div>
    </div>
  );
}
