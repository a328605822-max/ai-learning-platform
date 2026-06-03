import { TemperatureLab } from "@/components/labs/temperature-lab";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TemperatureLabPage() {
  return (
    <div className="space-y-8 pb-16 pt-8">
      <Link href="/labs" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
        <ArrowLeft className="h-3.5 w-3.5" /> 实验室
      </Link>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">交互 Lab</Badge>
          <Badge variant="secondary">模块一</Badge>
        </div>
        <h1 className="text-3xl font-bold">Temperature 实验室</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          拖动滑块调节温度，实时观察 AI 输出的概率分布变化。从「极度保守」到「近乎随机」。
        </p>
      </div>
      <div className="rounded-xl border p-6 bg-card">
        <TemperatureLab />
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <h2>你学到了什么</h2>
        <ul>
          <li>低温度（0-0.3）：AI 几乎每次都选概率最高的词，输出确定但缺乏变化</li>
          <li>中等温度（0.5-0.8）：平衡创造性和可靠性，日常使用最佳</li>
          <li>高温度（0.9-1.0）：AI 开始「冒险」，输出多样但也可能胡说</li>
          <li>不同场景需要用不同温度——写代码用 0.1，写诗用 0.8</li>
        </ul>
      </div>
    </div>
  );
}
