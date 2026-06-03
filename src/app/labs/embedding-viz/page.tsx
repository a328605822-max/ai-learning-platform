import { EmbeddingLab } from "@/components/labs/embedding-lab";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EmbeddingVizPage() {
  return (
    <div className="space-y-8 pb-16 pt-8">
      <Link href="/labs" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
        <ArrowLeft className="h-3.5 w-3.5" /> 实验室
      </Link>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">交互 Lab</Badge>
          <Badge variant="secondary">模块二</Badge>
        </div>
        <h1 className="text-3xl font-bold">Embedding 星系</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          语义相近的词语会在向量空间中自然聚集。悬停词语看同类聚集，点击按钮重新分布。
        </p>
      </div>
      <EmbeddingLab />
      <div className="prose dark:prose-invert max-w-none">
        <h2>你学到了什么</h2>
        <ul>
          <li>Embedding 把文字变成高维空间中的坐标</li>
          <li>语义相近的词语「距离」更近</li>
          <li>中文和英文在向量空间中的分布模式不同</li>
          <li>这个「距离」就是向量检索的核心</li>
        </ul>
      </div>
    </div>
  );
}
