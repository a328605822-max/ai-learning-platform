"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
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
  { href: "/labs", label: "交互实验室", icon: FlaskConical },
  { href: "/toolbox", label: "变现工具箱", icon: Wrench },
  { href: "/parenting", label: "育儿视角", icon: GraduationCap },
  { href: "/about", label: "关于教程", icon: Sparkles },
];

function NavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
      )}
    >
      {children}
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "module-1": true,
  });

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="px-3 pt-4 pb-2">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-sidebar-accent transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-sm">
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-sm">AI 学习之路</span>
            <span className="text-[10px] text-muted-foreground">
              从零到能用、能懂、能赚
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <NavLink href="/" isActive={pathname === "/"}>
                <Home className="h-4 w-4 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden">首页</span>
              </NavLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[0.1em] group-data-[collapsible=icon]:hidden">
            学习模块
          </SidebarGroupLabel>
          <SidebarMenu>
            {modules.map((mod) => {
              const isActive = pathname.includes(`/modules/${mod.id}`);
              const isExpanded = expandedModules[mod.id];

              return (
                <SidebarMenuItem key={mod.id}>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={mod.label}
                    onClick={() =>
                      setExpandedModules((prev) => ({
                        ...prev,
                        [mod.id]: !prev[mod.id],
                      }))
                    }
                  >
                    <div className={cn("flex h-5 w-5 items-center justify-center rounded", mod.bg)}>
                      <mod.icon className={cn("h-3.5 w-3.5", mod.color)} />
                    </div>
                    <span className="flex-1 truncate text-xs group-data-[collapsible=icon]:hidden">
                      {mod.label}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[collapsible=icon]:hidden",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </SidebarMenuButton>

                  {isExpanded && (
                    <SidebarMenuSub className="group-data-[collapsible=icon]:hidden">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          isActive={pathname === `/modules/${mod.id}`}
                          onClick={() => {
                            router.push(`/modules/${mod.id}`);
                          }}
                        >
                          概述
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      {mod.weeks.map((week) => (
                        <SidebarMenuSubItem key={week.id}>
                          <SidebarMenuSubButton
                            isActive={pathname === `/modules/${mod.id}/${week.id}`}
                            onClick={() => {
                              router.push(`/modules/${mod.id}/${week.id}`);
                            }}
                          >
                            {week.label}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[0.1em] group-data-[collapsible=icon]:hidden">
            更多资源
          </SidebarGroupLabel>
          <SidebarMenu>
            {extraLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(link.href)}
                  tooltip={link.label}
                  onClick={() => {
                    router.push(link.href);
                  }}
                >
                  <link.icon className="h-4 w-4 shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    {link.label}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-4">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground group-data-[collapsible=icon]:hidden">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span>持续更新中 · v1.0</span>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
