import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Play,
  ChevronRight,
  ArrowRight,
  Info,
  Zap,
  Target,
  Code2,
  Eye,
  Sparkles,
  ThumbsUp,
  Clock,
  DollarSign,
  Baby,
  Brain,
  ExternalLink,
} from "lucide-react";

/* ── Tip Box ── */
export function TipBox({
  title,
  icon: Icon = Lightbulb,
  children,
}: {
  title?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded-xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/30 dark:to-blue-950/10 p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
          <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-semibold text-sm text-blue-700 dark:text-blue-300 mb-1">{title}</p>
          )}
          <div className="text-sm text-blue-700/80 dark:text-blue-300/80 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Warning Box ── */
export function WarningBox({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded-xl border border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-amber-50/50 dark:from-amber-950/30 dark:to-amber-950/10 p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/50">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-semibold text-sm text-amber-700 dark:text-amber-300 mb-1">{title}</p>
          )}
          <div className="text-sm text-amber-700/80 dark:text-amber-300/80 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Success Box ── */
export function SuccessBox({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded-xl border border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-950/30 dark:to-green-950/10 p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/50">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-semibold text-sm text-green-700 dark:text-green-300 mb-1">{title}</p>
          )}
          <div className="text-sm text-green-700/80 dark:text-green-300/80 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Info Callout ── */
export function InfoCallout({
  icon: Icon = Info,
  children,
}: {
  icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 flex items-start gap-3 rounded-xl border bg-card p-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}

/* ── Key Point ── */
export function KeyPoint({
  emoji,
  children,
}: {
  emoji?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-4 flex items-start gap-3 rounded-lg bg-muted/40 px-4 py-3">
      {emoji && <span className="text-lg shrink-0">{emoji}</span>}
      <div className="text-sm font-medium leading-relaxed">{children}</div>
    </div>
  );
}

/* ── Concept Card ── */
export function ConceptCard({
  title,
  icon: Icon = Brain,
  time,
  explanation,
  color = "blue",
}: {
  title: string;
  icon?: React.ElementType;
  time?: string;
  explanation: string;
  color?: "green" | "blue" | "orange" | "red" | "purple" | "yellow";
}) {
  const borders: Record<string, string> = {
    green: "border-l-green-500",
    blue: "border-l-blue-500",
    orange: "border-l-orange-500",
    red: "border-l-red-500",
    purple: "border-l-purple-500",
    yellow: "border-l-yellow-500",
  };
  const bgs: Record<string, string> = {
    green: "bg-green-500/10",
    blue: "bg-blue-500/10",
    orange: "bg-orange-500/10",
    red: "bg-red-500/10",
    purple: "bg-purple-500/10",
    yellow: "bg-yellow-500/10",
  };
  const textColors: Record<string, string> = {
    green: "text-green-600 dark:text-green-400",
    blue: "text-blue-600 dark:text-blue-400",
    orange: "text-orange-600 dark:text-orange-400",
    red: "text-red-600 dark:text-red-400",
    purple: "text-purple-600 dark:text-purple-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
  };

  return (
    <Card className={`border-l-[3px] ${borders[color]} card-hover my-4`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`rounded-lg ${bgs[color]} p-2`}>
              <Icon className={`h-5 w-5 ${textColors[color]}`} />
            </div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          {time && <Badge variant="outline" className="text-xs">{time}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
      </CardContent>
    </Card>
  );
}

/* ── Step Guide ── */
export function StepGuide({
  steps,
}: {
  steps: { title: string; description: string; code?: string }[];
}) {
  return (
    <div className="my-8 space-y-1">
      {steps.map((step, i) => (
        <div key={i} className="step-connector flex gap-4 pb-8 last:pb-0 last:before:hidden">
          <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
            {i + 1}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h4 className="font-semibold text-base mb-1">{step.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">{step.description}</p>
            {step.code && (
              <pre className="rounded-lg border bg-muted/30 p-3 text-xs font-mono overflow-x-auto">
                <code>{step.code}</code>
              </pre>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Image Card ── */
export function ImageCard({
  src,
  alt,
  caption,
  wide,
}: {
  src: string;
  alt: string;
  caption?: string;
  wide?: boolean;
}) {
  return (
    <figure className={cn("my-8", wide ? "lg:-mr-56 lg:ml-0" : "flex flex-col items-center")}>
      <div className={cn("overflow-hidden rounded-xl border bg-muted/20", wide ? "w-full" : "w-full max-w-2xl")}>
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-muted-foreground italic max-w-lg">{caption}</figcaption>
      )}
    </figure>
  );
}

/* ── Video Embed ── */
export function VideoEmbed({
  title,
  bilibiliId,
  youtubeId,
  description,
}: {
  title: string;
  bilibiliId?: string;
  youtubeId?: string;
  description?: string;
}) {
  return (
    <div className="my-8 rounded-xl border bg-card overflow-hidden card-hover">
      <div className="aspect-video bg-muted flex items-center justify-center relative">
        {youtubeId ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-black/20">
            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-all hover:scale-110"
            >
              <Play className="h-6 w-6 ml-0.5" />
            </a>
          </div>
        ) : bilibiliId ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-black/20">
            <a
              href={`https://www.bilibili.com/video/${bilibiliId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition-all hover:scale-110"
            >
              <Play className="h-6 w-6 ml-0.5" />
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Play className="h-8 w-8" />
            <span className="text-sm">视频链接待添加</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-semibold flex items-center gap-2">
          <Play className="h-4 w-4 text-red-500" />
          {title}
        </h4>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
        <div className="flex gap-3 mt-3">
          {youtubeId && (
            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              在 YouTube 观看 <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {bilibiliId && (
            <a
              href={`https://www.bilibili.com/video/${bilibiliId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-pink-600 hover:text-pink-700 transition-colors"
            >
              在 B 站观看 <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Comparison Table ── */
export function ComparisonTable({
  leftTitle,
  rightTitle,
  items,
}: {
  leftTitle: string;
  rightTitle: string;
  items: { left: string; right: string }[];
}) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border">
      <div className="grid grid-cols-2 bg-muted/30">
        <div className="px-4 py-2.5 text-sm font-semibold border-r">{leftTitle}</div>
        <div className="px-4 py-2.5 text-sm font-semibold">{rightTitle}</div>
      </div>
      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-2 border-t">
          <div className="px-4 py-2.5 text-sm border-r">{item.left}</div>
          <div className="px-4 py-2.5 text-sm">{item.right}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Review Panel ── */
export function ReviewPanel({
  type,
  children,
}: {
  type: "principle" | "money" | "education";
  children: React.ReactNode;
}) {
  const config = {
    principle: {
      icon: Brain,
      label: "原理视角",
      border: "border-l-[3px] border-l-green-500",
      bg: "from-green-50 to-green-50/50 dark:from-green-950/30 dark:to-green-950/10",
      iconBg: "bg-green-100 dark:bg-green-900/50",
      iconColor: "text-green-600 dark:text-green-400",
      textColor: "text-green-700 dark:text-green-300",
      bodyColor: "text-green-700/80 dark:text-green-300/80",
    },
    money: {
      icon: DollarSign,
      label: "变现视角",
      border: "border-l-[3px] border-l-yellow-500",
      bg: "from-yellow-50 to-yellow-50/50 dark:from-yellow-950/30 dark:to-yellow-950/10",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/50",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      textColor: "text-yellow-700 dark:text-yellow-300",
      bodyColor: "text-yellow-700/80 dark:text-yellow-300/80",
    },
    education: {
      icon: Baby,
      label: "教育视角",
      border: "border-l-[3px] border-l-purple-500",
      bg: "from-purple-50 to-purple-50/50 dark:from-purple-950/30 dark:to-purple-950/10",
      iconBg: "bg-purple-100 dark:bg-purple-900/50",
      iconColor: "text-purple-600 dark:text-purple-400",
      textColor: "text-purple-700 dark:text-purple-300",
      bodyColor: "text-purple-700/80 dark:text-purple-300/80",
    },
  };

  const c = config[type];

  return (
    <div className={`my-6 rounded-xl border ${c.border} bg-gradient-to-br ${c.bg} p-5`}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.iconBg}`}>
          <c.icon className={`h-4 w-4 ${c.iconColor}`} />
        </div>
        <span className={`font-semibold text-sm ${c.textColor}`}>{c.label} · 三视角复盘</span>
      </div>
      <div className={`text-sm leading-relaxed ${c.bodyColor}`}>{children}</div>
    </div>
  );
}

/* ── Milestone Card ── */
export function MilestoneCard({
  week,
  title,
  description,
  done = false,
}: {
  week: number;
  title: string;
  description: string;
  done?: boolean;
}) {
  return (
    <div className="flex gap-4 my-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-sm transition-all",
            done
              ? "bg-green-500 text-white"
              : "bg-primary text-primary-foreground"
          )}
        >
          {done ? <CheckCircle2 className="h-5 w-5" /> : week}
        </div>
        <div className={cn("w-0.5 flex-1 mt-2", done ? "bg-green-200 dark:bg-green-800" : "bg-border")} />
      </div>
      <div className="flex-1 pb-6">
        <Card className={cn("card-hover", done && "border-green-200 dark:border-green-800")}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              {title}
              {done && <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">已完成</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ── Resource Link ── */
export function ResourceLink({
  title,
  url,
  type = "article",
  description,
}: {
  title: string;
  url: string;
  type?: "article" | "video" | "tool" | "book" | "course";
  description?: string;
}) {
  const icons: Record<string, React.ElementType> = {
    article: BookOpen,
    video: Play,
    tool: Code2,
    book: BookOpen,
    course: Target,
  };
  const colors: Record<string, string> = {
    article: "text-blue-600 bg-blue-100 dark:bg-blue-900/50",
    video: "text-red-600 bg-red-100 dark:bg-red-900/50",
    tool: "text-green-600 bg-green-100 dark:bg-green-900/50",
    book: "text-purple-600 bg-purple-100 dark:bg-purple-900/50",
    course: "text-orange-600 bg-orange-100 dark:bg-orange-900/50",
  };
  const Icon = icons[type];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 rounded-lg border p-4 card-hover no-underline"
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colors[type]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium group-hover:text-primary transition-colors">{title}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1" />
    </a>
  );
}

/* ── Stat Grid ── */
export function StatGrid({
  items,
}: {
  items: { label: string; value: string; icon?: React.ElementType }[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8">
      {items.map((item) => (
        <Card key={item.label} className="text-center card-hover">
          <CardContent className="pt-5 pb-5">
            {item.icon && <item.icon className="h-5 w-5 mx-auto text-muted-foreground mb-2" />}
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* ── Data Table ── */
export function DataTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: string[][];
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-border/60 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
                {headers.map((h, i) => (
                  <th
                    key={i}
                    className={cn(
                      "px-4 py-3 text-left font-semibold text-primary whitespace-nowrap",
                      i === 0 && "pl-5",
                      i === headers.length - 1 && "pr-5"
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={ri}
                  className={cn(
                    "transition-colors duration-150 hover:bg-muted/50",
                    ri % 2 === 0 ? "bg-transparent" : "bg-muted/20"
                  )}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={cn(
                        "px-4 py-2.5 text-muted-foreground",
                        ci === 0 && "pl-5 font-medium text-foreground/80",
                        ci === headers.length - 1 && "pr-5"
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-center text-xs text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
