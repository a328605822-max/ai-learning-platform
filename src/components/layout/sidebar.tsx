"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  FlaskConical,
  Lightbulb,
  Wrench,
  Rocket,
  Home,
  ChevronDown,
  Sparkles,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const modules = [
  {
    id: "module-1",
    label: "模块一：AI 认知地基",
    icon: Rocket,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    weeks: [
      { id: "week-1", label: "第一周：AI 全景图" },
      { id: "week-2", label: "第二周：Token 与上下文" },
      { id: "week-3", label: "第三周：ChatGPT 实战" },
    ],
  },
  {
    id: "module-2",
    label: "模块二：记忆与知识",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    weeks: [
      { id: "week-1", label: "第一周：Embedding 入门" },
      { id: "week-2", label: "第二周：向量数据库" },
      { id: "week-3", label: "第三周：RAG 实战" },
    ],
  },
  {
    id: "module-3",
    label: "模块三：智能体觉醒",
    icon: Wrench,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    weeks: [
      { id: "week-1", label: "第一周：Function Calling" },
      { id: "week-2", label: "第二周：Agent 循环" },
      { id: "week-3", label: "第三周：Agent 实战" },
    ],
  },
  {
    id: "module-4",
    label: "模块四：拆解黑盒",
    icon: FlaskConical,
    color: "text-red-500",
    bg: "bg-red-500/10",
    weeks: [
      { id: "week-1", label: "第一周：神经网络基础" },
      { id: "week-2", label: "第二周：反向传播" },
      { id: "week-3", label: "第三周：Transformer" },
      { id: "week-4", label: "第四周：训练微型 GPT" },
    ],
  },
  {
    id: "module-5",
    label: "模块五：产品化",
    icon: Lightbulb,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    weeks: [
      { id: "week-1", label: "第一周：需求验证" },
      { id: "week-2", label: "第二周：MVP 开发" },
      { id: "week-3", label: "第三周：部署上线" },
      { id: "week-4", label: "第四周：迭代发布" },
    ],
  },
];

const extraLinks = [
  { href: "/labs", label: "交互实验室", icon: FlaskConical, color: "text-cyan-500" },
  { href: "/toolbox", label: "变现工具箱", icon: Wrench, color: "text-amber-500" },
  { href: "/parenting", label: "育儿视角", icon: GraduationCap, color: "text-pink-500" },
  { href: "/about", label: "关于教程", icon: Sparkles, color: "text-indigo-500" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "module-1": true,
  });

  const toggleModule = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-sm hidden lg:flex flex-col">
      {/* Logo */}
      <div className="px-4 pt-5 pb-2">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple text-white shadow-md shadow-brand-blue/20 group-hover:shadow-lg transition-all">
            <BookOpen className="h-4.5 w-4.5" />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-sm text-sidebar-foreground">AI 学习之路</p>
            <p className="text-[10px] text-sidebar-foreground/50">从零到能用、能懂、能赚</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {/* Home */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all hover:bg-sidebar-accent",
            pathname === "/"
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm"
              : "text-sidebar-foreground/70"
          )}
        >
          <Home className="h-4 w-4" />
          <span>首页</span>
        </Link>

        {/* Divider */}
        <div className="pt-5 pb-1.5 px-3">
          <span className="text-[10px] font-bold text-sidebar-foreground/40 uppercase tracking-[0.1em]">
            学习模块
          </span>
        </div>

        {/* Modules */}
        {modules.map((mod) => {
          const isActive = pathname.includes(`/modules/${mod.id}`);
          const isExpanded = expanded[mod.id];

          return (
            <div key={mod.id}>
              <button
                onClick={() => toggleModule(mod.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all hover:bg-sidebar-accent text-left",
                  isActive && "bg-sidebar-accent/70 font-medium text-sidebar-accent-foreground"
                )}
              >
                <div className={cn("flex h-6 w-6 items-center justify-center rounded-md", mod.bg)}>
                  <mod.icon className={cn("h-3.5 w-3.5", mod.color)} />
                </div>
                <span className="flex-1 truncate text-xs font-medium">{mod.label}</span>
                <ChevronDown
                  className={cn(
                    "h-3 w-3 shrink-0 text-sidebar-foreground/30 transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>

              {isExpanded && (
                <div className="ml-8 mt-0.5 mb-1 space-y-0.5 border-l-2 border-sidebar-border/50 pl-2.5">
                  <Link
                    href={`/modules/${mod.id}`}
                    className={cn(
                      "block rounded-md px-2.5 py-1.5 text-[11px] transition-colors hover:bg-sidebar-accent/60",
                      pathname === `/modules/${mod.id}` &&
                        "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                    )}
                  >
                    概述
                  </Link>
                  {mod.weeks.map((week) => (
                    <Link
                      key={week.id}
                      href={`/modules/${mod.id}/${week.id}`}
                      className={cn(
                        "block rounded-md px-2.5 py-1.5 text-[11px] transition-colors hover:bg-sidebar-accent/60",
                        pathname === `/modules/${mod.id}/${week.id}` &&
                          "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                      )}
                    >
                      {week.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Divider */}
        <div className="pt-4 pb-1.5 px-3">
          <span className="text-[10px] font-bold text-sidebar-foreground/40 uppercase tracking-[0.1em]">
            更多资源
          </span>
        </div>

        {/* Extra links */}
        {extraLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all hover:bg-sidebar-accent",
              pathname.startsWith(link.href)
                ? "bg-sidebar-accent/70 text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground/70"
            )}
          >
            <div className={cn("flex h-6 w-6 items-center justify-center rounded-md", "bg-muted/50")}>
              <link.icon className={cn("h-3.5 w-3.5", link.color)} />
            </div>
            <span className="text-xs">{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border/50">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <p className="text-[10px] text-sidebar-foreground/40">
            持续更新中 · v1.0
          </p>
        </div>
      </div>
    </aside>
  );
}
