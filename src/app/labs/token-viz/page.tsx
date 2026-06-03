import { TokenLab } from "@/components/labs/token-lab";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TokenVizPage() {
  return (
    <div className="space-y-8 pb-16 pt-8">
      <div className="flex items-center gap-2">
        <Link href="/labs" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> 实验室
        </Link>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">交互 Lab</Badge>
          <Badge variant="secondary">模块一</Badge>
        </div>
        <h1 className="text-3xl font-bold">Token 解剖器</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          直观感受 AI 是怎么「读」文字的。每个彩色方块代表一个 Token——AI 的最小阅读单位。
        </p>
      </div>

      <div className="rounded-xl border p-6 bg-card">
        <TokenLab />
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>你学到了什么</h2>
        <ul>
          <li>中文的一个字往往就是一个 Token，但英文一个单词可能被拆成多个</li>
          <li>Token 数量决定了 API 的计费——Token 越多越贵</li>
          <li>不同 AI 模型的 Tokenizer 不同，拆分结果也不同</li>
        </ul>
      </div>
    </div>
  );
}
