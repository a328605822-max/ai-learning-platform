import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Braces, Grid3X3, Thermometer, Cpu, Eye, ArrowRight, FlaskConical } from "lucide-react";

const labs = [
  {
    id: "token-viz",
    title: "Token 解剖器",
    description: "输入任意文字，实时看 AI 怎么把它拆成 Token。中英文对比一目了然。",
    icon: Braces,
    module: "模块一",
    status: "可用",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    border: "border-l-emerald-500",
  },
  {
    id: "embedding-viz",
    title: "Embedding 星系",
    description: "输入词语，看它们在向量空间中的位置。语义相近的词语会自然聚集在一起。",
    icon: Grid3X3,
    module: "模块二",
    status: "可用",
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    border: "border-l-blue-500",
  },
  {
    id: "temperature-lab",
    title: "Temperature 实验室",
    description: "拖动滑块调节温度，实时观察 AI 输出从「死板」到「疯狂」的变化。",
    icon: Thermometer,
    module: "模块一",
    status: "可用",
    color: "text-orange-600",
    bg: "bg-orange-500/10",
    border: "border-l-orange-500",
  },
  {
    id: "nn-playground",
    title: "神经网络游乐场",
    description: "调节网络层数和神经元数量，亲眼观察决策边界如何变化。直观理解深度学习。",
    icon: Cpu,
    module: "模块四",
    status: "可用",
    color: "text-red-600",
    bg: "bg-red-500/10",
    border: "border-l-red-500",
  },
  {
    id: "attention-lab",
    title: "Attention 可视化",
    description: "输入一句话，看每个词在「注意」哪些词。理解 Transformer 的核心机制。",
    icon: Eye,
    module: "模块四",
    status: "可用",
    color: "text-purple-600",
    bg: "bg-purple-500/10",
    border: "border-l-purple-500",
  },
];

export default function LabsPage() {
  return (
    <div className="space-y-10 pb-16 pt-8">
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-primary" />
          <Badge variant="outline">交互式学习</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">实验室</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          动手比眼看记得更牢。每个实验室都是一个可以交互探索的可视化工具，帮助你直观理解 AI 的核心概念。
        </p>
      </section>

      <div className="space-y-3">
        {labs.map((lab) => {
          const isAvailable = lab.status === "可用";
          return (
            <Link
              key={lab.id}
              href={isAvailable ? `/labs/${lab.id}` : "#"}
              className={!isAvailable ? "pointer-events-none" : ""}
            >
              <Card
                className={`border-l-[3px] ${lab.border} transition-all ${
                  isAvailable ? "card-hover cursor-pointer" : "opacity-60"
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-lg ${lab.bg} p-2`}>
                        <lab.icon className={`h-5 w-5 ${lab.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {lab.title}
                          {isAvailable && (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-[10px]">
                              可用
                            </Badge>
                          )}
                          {!isAvailable && (
                            <Badge variant="secondary" className="text-[10px]">
                              即将上线
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-sm">{lab.description}</CardDescription>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {lab.module}
                      </Badge>
                      {isAvailable && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
