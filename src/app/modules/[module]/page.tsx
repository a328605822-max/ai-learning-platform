import { notFound } from "next/navigation";
import Link from "next/link";
import { getModule } from "@/lib/modules";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Clock, Brain, Wallet, Baby } from "lucide-react";

type Props = {
  params: Promise<{ module: string }>;
};

export async function generateStaticParams() {
  return [
    { module: "module-1" },
    { module: "module-2" },
    { module: "module-3" },
    { module: "module-4" },
    { module: "module-5" },
  ];
}

export default async function ModulePage({ params }: Props) {
  const { module } = await params;
  const mod = getModule(module);

  if (!mod) notFound();

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <section className="space-y-3 pt-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">模块 {mod.num}</Badge>
          <Badge variant="secondary">
            {mod.weeks} 周 · ~{mod.hours}h
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{mod.title}</h1>
        <p className="text-lg text-muted-foreground">{mod.subtitle}</p>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">{mod.description}</p>
      </section>

      {/* Project & Tech */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">项目实战</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">{mod.project}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {mod.techStack.map((t) => (
                <Badge key={t} variant="secondary" className="text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">三视角目标</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Brain className="h-4 w-4 mt-0.5 text-green-600 shrink-0" />
              <span className="text-muted-foreground">搞懂 {mod.concepts.length} 个核心概念</span>
            </div>
            <div className="flex items-start gap-2">
              <Wallet className="h-4 w-4 mt-0.5 text-yellow-600 shrink-0" />
              <span className="text-muted-foreground">理解变现模式和商业价值</span>
            </div>
            <div className="flex items-start gap-2">
              <Baby className="h-4 w-4 mt-0.5 text-purple-600 shrink-0" />
              <span className="text-muted-foreground">形成可以讲给孩子的认知框架</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Weekly breakdown */}
      <section>
        <h2 className="text-xl font-bold mb-4">每周安排</h2>
        <div className="space-y-3">
          {mod.weeks_content.map((week, i) => (
            <Link key={week.id} href={`/modules/${mod.id}/${week.id}`}>
              <Card className="hover:shadow-md transition-all cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-muted-foreground">
                        第 {i + 1} 周
                      </span>
                      <div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                          {week.title}
                        </CardTitle>
                        <CardDescription className="text-sm">{week.description}</CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Concepts */}
      <section>
        <h2 className="text-xl font-bold mb-4">核心概念清单</h2>
        <div className="space-y-3">
          {mod.concepts.map((c) => (
            <Card key={c.name}>
              <CardHeader className="pb-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{c.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {c.time}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.explanation}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Three angles */}
      <Separator />
      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Wallet className="h-4 w-4 text-yellow-600" />
              变现思考
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
              教育视角
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{mod.educationAngle}</p>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <div className="flex items-center gap-4">
        <Link
          href={`/modules/${mod.id}/${mod.weeks_content[0].id}`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          开始第一周
          <ArrowRight className="h-4 w-4" />
        </Link>
        {mod.num < 5 && (
          <Link
            href={`/modules/module-${mod.num + 1}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            下一模块 →
          </Link>
        )}
      </div>
    </div>
  );
}
