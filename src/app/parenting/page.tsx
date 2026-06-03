import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Baby, MessageCircle, Brain, Gamepad2, ArrowRight, Heart } from "lucide-react";

const analogies = [
  {
    module: "模块一：AI 认知地基",
    concept: "LLM / Token",
    forChild: "AI 就像一个读过很多很多书的鹦鹉——它不「知道」任何事，但极其擅长猜下一个字该说什么。就像你学说话的时候，听了很多大人说话，慢慢就学会了怎么接话。",
    age: "3-6 岁适用",
    color: "border-l-green-500",
    icon: MessageCircle,
    iconColor: "text-green-600",
  },
  {
    module: "模块二：记忆与知识",
    concept: "RAG / Embedding",
    forChild: "AI 回答问题前先去「课本」里找相关内容，就像你考试可以翻书一样。重要的不是记住所有答案，而是知道去哪里找答案。图书馆那么大，关键是会用目录。",
    age: "4-8 岁适用",
    color: "border-l-blue-500",
    icon: Brain,
    iconColor: "text-blue-600",
  },
  {
    module: "模块三：智能体觉醒",
    concept: "Agent / 工具使用",
    forChild: "AI 不只会说话，现在有手有脚了——可以查资料、发通知、做事情。就像你有了一个永远不会累的小助手。但它需要你告诉它怎么做，你就是它的「老板」。",
    age: "5-10 岁适用",
    color: "border-l-orange-500",
    icon: Gamepad2,
    iconColor: "text-orange-600",
  },
  {
    module: "模块四：拆解黑盒",
    concept: "神经网络 / 学习",
    forChild: "AI 学习的过程和你学说话一模一样——听多了、看多了，慢慢就学会了。你小时候听爸爸妈妈说了几万句话才学会说话，AI 也读了上亿篇文章才学会「说话」。它只是比你看得多、算得快。",
    age: "5-12 岁适用",
    color: "border-l-red-500",
    icon: Brain,
    iconColor: "text-red-600",
  },
  {
    module: "模块五：产品化",
    concept: "创造 / 产品思维",
    forChild: "你脑子里有一个想法，然后用 AI 帮你把它变成真的东西，分享给全世界的人用。就像用积木搭房子——AI 给了你无限的积木。神奇的不是积木，是你的想法。",
    age: "6-14 岁适用",
    color: "border-l-purple-500",
    icon: Heart,
    iconColor: "text-purple-600",
  },
];

const thoughts = [
  {
    title: "不要怕孩子用 AI",
    content:
      "很多家长担心孩子「用 AI 偷懒」。但回想一下，我们小时候学数学时也被允许用计算器。AI 是比计算器更强大的工具——真正重要的不是记住答案，而是提出好问题、判断答案对不对。",
  },
  {
    title: "未来最重要的能力",
    content:
      "在 AI 时代，记忆力不再稀缺，逻辑推理和执行能力也不再是人类独有的优势。但「提出好问题」「辨别真假」「理解情感」「创造性连接」——这些是 AI 难以替代的。教育应围绕这些能力重构。",
  },
  {
    title: "陪孩子一起学",
    content:
      "最好的 AI 教育不是送孩子去培训班，而是你和孩子一起探索。这个网站本身就是为这个目的设计的——你学一遍，然后用这里的「教育视角」模块讲给孩子听。共同成长，共同面对。",
  },
];

const activities = [
  {
    title: "和 AI 一起编故事",
    desc: "让孩子起个头，AI 续写，然后一起讨论 AI 编得好不好、哪里不合理。培养批判性思维。",
    age: "3+",
  },
  {
    title: "AI 画画比赛",
    desc: "你和孩子分别描述一个画面给 AI（用 DALL-E / Midjourney），看谁的描述更准确、生成的图更接近想象。",
    age: "4+",
  },
  {
    title: "发现 AI 的错误",
    desc: "故意让 AI 回答一些它容易搞错的问题，和孩子一起找错误。建立「AI 不是绝对正确」的认知。",
    age: "5+",
  },
  {
    title: "设计一个 AI 助手",
    desc: "让孩子想象一个能帮他的 AI 助手，然后一起用简单的 system prompt 实现它。",
    age: "6+",
  },
];

export default function ParentingPage() {
  return (
    <div className="space-y-12 pb-16 pt-8">
      {/* Hero */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Baby className="h-6 w-6 text-purple-600" />
          <Badge variant="outline">育儿视角</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          为孩子的 AI 时代做准备
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          每个 AI 概念，都有「可以讲给孩子听」的版本。不是为了让孩子成为 AI 工程师，而是为了建立正确的 AI 认知——它是工具，不是魔法；是帮手，不是威胁。
        </p>
      </section>

      <Separator />

      {/* Analogies */}
      <section>
        <h2 className="text-xl font-bold mb-4">给孩子讲的 AI 概念</h2>
        <p className="text-sm text-muted-foreground mb-6">
          以下类比按年龄标注。实际使用时可以根据孩子的理解能力灵活调整。
        </p>
        <div className="space-y-4">
          {analogies.map((item) => (
            <Card key={item.module} className={`border-l-4 ${item.color}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className={`h-4 w-4 ${item.iconColor}`} />
                    <CardTitle className="text-base">{item.concept}</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.age}
                  </Badge>
                </div>
                <CardDescription className="text-xs">{item.module}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{item.forChild}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Thoughts */}
      <section>
        <h2 className="text-xl font-bold mb-4">AI 时代育儿思考</h2>
        <div className="space-y-3">
          {thoughts.map((t) => (
            <Card key={t.title}>
              <CardHeader className="pb-1">
                <CardTitle className="text-base">{t.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Activities */}
      <section>
        <h2 className="text-xl font-bold mb-4">亲子 AI 互动建议</h2>
        <p className="text-sm text-muted-foreground mb-6">
          适合不同年龄段孩子的 AI 互动游戏。边玩边建立认知。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {activities.map((a) => (
            <Card key={a.title}>
              <CardHeader className="pb-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{a.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {a.age}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="rounded-xl border bg-card p-6 text-center space-y-3">
        <Heart className="h-6 w-6 mx-auto text-purple-600" />
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          最好的 AI 教育，是你和孩子一起成长。这个网站的每一个模块，都为你准备好了「怎么给孩子讲」的版本。
        </p>
      </div>
    </div>
  );
}
