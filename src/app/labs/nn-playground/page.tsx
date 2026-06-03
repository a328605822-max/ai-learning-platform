import { NNPlayground } from "@/components/labs/nn-playground";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NNPlaygroundPage() {
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
        <h1 className="text-3xl font-bold">神经网络游乐场</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          调节隐藏层神经元数量和学习率，亲眼观察决策边界如何变化。感受「模型容量」和「学习速度」对结果的影响。
        </p>
      </div>
      <div className="rounded-xl border p-6 bg-card">
        <NNPlayground />
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <h2>你学到了什么</h2>
        <ul>
          <li>更多神经元 = 更大的模型容量，能拟合更复杂的模式</li>
          <li>但神经元太多也可能过拟合——死记硬背训练数据</li>
          <li>学习率太高会导致不收敛（震荡），太低收敛太慢</li>
          <li>神经网络的本质：通过调整参数，把空间「切」成不同区域</li>
        </ul>
      </div>
    </div>
  );
}
