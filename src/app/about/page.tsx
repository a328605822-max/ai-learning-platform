import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Heart, MessageCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-10 pb-16 pt-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">关于这个教程</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          一个父亲为自己、也为你和孩子准备的 AI 系统学习方案。
        </p>
      </section>

      <Separator />

      {/* Origin */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">缘起</h2>
        <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-3">
          <p>
            我是一个有一定编程基础的人（会 Python，写过一些脚本），但没有系统学过 AI。
            我有一个刚 1 岁多的儿子。看着 AI 这一年多的爆发式发展，我深知：未来他的教育、他的职业、他的世界，都离不开 AI。
          </p>
          <p>
            我决定系统地学习 AI——不只是会用，还要懂原理；不只是懂原理，还要能用它赚钱；不只自己学会，还要能讲给孩子听。
          </p>
          <p>
            市场上的 AI 教程要么太浅（「教你用 ChatGPT」），要么太深（「斯坦福 CS231n」），
            要么太窄（只看技术、不讲变现、不谈教育）。所以我决定自己设计一条路，并把它做成一个网站，
            既是我自己的学习记录，也希望能帮到和我一样处境的人。
          </p>
        </div>
      </section>

      <Separator />

      {/* Design principles */}
      <section>
        <h2 className="text-xl font-bold mb-4">设计理念</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                项目驱动
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                不是先学完理论再动手，而是每学一个概念就做一个项目。做中学，做完就懂。每个模块结束都有一个可运行、可展示的作品。
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                按需学理论
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                不是从数学开始，而是从 API 开始。当你在实践中遇到瓶颈，再回头补理论。这样理论不再是空中楼阁，而是解决实际问题的钥匙。
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-yellow-600" />
                三视角复盘
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                每个概念从三个角度审视：搞懂原理（我能讲清楚吗）、变现思路（有人愿意付费吗）、教育视角（能给孩子讲吗）。三者缺一不可。
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-4 w-4 text-purple-600" />
                为下一代
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                所有的学习最终指向一个问题：「我怎么把这些教给我的孩子？」不是为了让他成为 AI 工程师，而是让他拥有 AI 时代的核心素养。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Tech stack */}
      <section>
        <h2 className="text-xl font-bold mb-4">本站技术栈</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "shadcn/ui",
            "MDX",
            "Vercel",
            "Lucide Icons",
          ].map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          这个网站本身就是一个 AI 时代的产物——从设计到编码，大量借助了 Claude Code 等 AI 编程工具。
          它既是教程的载体，也是「用 AI 做产品」的活样本。
        </p>
      </section>

      <Separator />

      {/* Contact */}
      <section className="rounded-xl border bg-card p-6 text-center space-y-3">
        <MessageCircle className="h-6 w-6 mx-auto text-primary" />
        <h2 className="text-lg font-semibold">反馈与交流</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          这个教程是一个活的项目，会随着我的学习和你的反馈持续更新。如果你有建议、踩坑经验、或者想交流 AI 学习，欢迎通过 GitHub Issues 联系。
        </p>
      </section>
    </div>
  );
}
