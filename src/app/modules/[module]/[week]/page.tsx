import { notFound } from "next/navigation";
import Link from "next/link";
import { getModule, getWeek } from "@/lib/modules";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Brain, Wallet, Baby, Target, BookOpen, Clock, CheckCircle2 } from "lucide-react";

type Props = {
  params: Promise<{ module: string; week: string }>;
};

export async function generateStaticParams() {
  const params: { module: string; week: string }[] = [];
  const mods = ["module-1", "module-2", "module-3", "module-4", "module-5"];
  for (const mod of mods) {
    const m = getModule(mod);
    if (m) {
      for (const week of m.weeks_content) {
        params.push({ module: mod, week: week.id });
      }
    }
  }
  return params;
}

export default async function WeekPage({ params }: Props) {
  const { module: moduleId, week: weekId } = await params;
  const mod = getModule(moduleId);
  const week = getWeek(moduleId, weekId);

  if (!mod || !week) notFound();

  const weekIndex = mod.weeks_content.findIndex((w) => w.id === weekId);
  const totalWeeks = mod.weeks_content.length;
  const prevWeek = weekIndex > 0 ? mod.weeks_content[weekIndex - 1] : null;
  const nextWeek = weekIndex < totalWeeks - 1 ? mod.weeks_content[weekIndex + 1] : null;

  return (
    <div className="space-y-10 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
        <Link href="/" className="hover:text-foreground transition-colors">
          首页
        </Link>
        <span>/</span>
        <Link href={`/modules/${mod.id}`} className="hover:text-foreground transition-colors">
          {mod.title}
        </Link>
        <span>/</span>
        <span className="text-foreground">第 {weekIndex + 1} 周</span>
      </div>

      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            模块 {mod.num} · 第 {weekIndex + 1} 周 / 共 {totalWeeks} 周
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{week.title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{week.description}</p>
      </section>

      <Separator />

      {/* Learning goals */}
      <section className="grid gap-4 sm:grid-cols-3">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm flex items-center gap-2">
              <Brain className="h-4 w-4 text-green-600" />
              本周概念
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {week.concepts.map((c) => (
                <li key={c} className="text-sm text-muted-foreground">
                  {c}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              项目里程碑
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{week.projectMilestone}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-600" />
              学习建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              第一次（45min）：看教程理解概念。第二次（45min）：动手写代码。第三次（周末 60min）：完成里程碑 + 三视角复盘。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Content placeholder - tutorial content will be filled via MDX or data */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold">本周教程内容</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3>1. 概念讲解</h3>
              <p>
                本周我们将深入理解以下概念：{week.concepts.join("、")}。
                每个概念都会从「是什么 → 为什么重要 → 怎么用」三个维度展开。
              </p>

              <h3>2. 动手实践</h3>
              <p>
                本周的实践任务是：{week.projectMilestone}。
                我们将分步骤完成，每一步都有可运行的代码和详细解释。
              </p>

              <h3>3. 常见踩坑</h3>
              <p>在实际操作中容易遇到的问题和解决方法将在这里记录。</p>

              <h3>4. 三视角复盘</h3>
              <div className="grid gap-4 sm:grid-cols-3 mt-4">
                <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
                  <h4 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-1">
                    原理视角
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    你能用一句话说清这周学到的核心概念吗？
                  </p>
                </div>
                <div className="rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/20 p-4">
                  <h4 className="text-sm font-semibold text-yellow-700 dark:text-yellow-400 mb-1">
                    变现视角
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    这个技术能解决谁的什么问题？有人愿意付费吗？
                  </p>
                </div>
                <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-4">
                  <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-400 mb-1">
                    教育视角
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    如果给孩子讲这个概念，你会怎么打比方？
                  </p>
                </div>
              </div>

              <h3>5. 延伸资源</h3>
              <p>
                推荐阅读和视频将在后续版本中持续补充。你也可以用 Claude 或
                ChatGPT 搜索「如何理解 {week.concepts[0]}」来获取更多资料。
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Module-level three angles */}
      <Separator />
      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Wallet className="h-4 w-4 text-yellow-600" />
              本模块变现思考
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{mod.moneyAngle}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Baby className="h-4 w-4 text-purple-600" />
              本模块教育视角
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{mod.educationAngle}</p>
          </CardContent>
        </Card>
      </section>

      {/* Navigation */}
      <Separator />
      <div className="flex items-center justify-between">
        {prevWeek ? (
          <Link
            href={`/modules/${mod.id}/${prevWeek.id}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {prevWeek.title}
          </Link>
        ) : (
          <Link
            href={`/modules/${mod.id}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            模块概述
          </Link>
        )}
        {nextWeek ? (
          <Link
            href={`/modules/${mod.id}/${nextWeek.id}`}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          >
            {nextWeek.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          mod.num < 5 && (
            <Link
              href={`/modules/module-${mod.num + 1}`}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              下一个模块
              <ArrowRight className="h-4 w-4" />
            </Link>
          )
        )}
      </div>
    </div>
  );
}
