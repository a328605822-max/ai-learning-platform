import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { ReadingProgress } from "@/components/layout/reading-progress";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI 学习之路 — 从零到能用、能懂、能赚",
  description:
    "一套面向有编程基础的学习者的 AI 系统教程。项目驱动、按需学理论、螺旋深入，兼顾原理理解、副业变现和孩子教育。",
  keywords: ["AI 教程", "机器学习", "LLM", "大语言模型", "AI 变现", "AI 教育"],
  openGraph: {
    title: "AI 学习之路 — 从零到能用、能懂、能赚",
    description: "项目驱动、按需学理论、螺旋深入的 AI 系统教程",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full" suppressHydrationWarning>
        <ThemeProvider>
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar />
              <main className="flex-1 min-w-0">
                <ReadingProgress />
                <div className="mx-auto max-w-4xl px-5 py-8 lg:px-8">
                  {children}
                </div>
              </main>
            </SidebarProvider>
            <Toaster position="bottom-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
