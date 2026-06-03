import type { MDXComponents } from "mdx/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-3 border-b pb-2" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="leading-7 mb-4 text-foreground/85" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1.5" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1.5" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-7 text-foreground/85" {...props}>
        {children}
      </li>
    ),
    code: ({ children, ...props }) => (
      <code
        className="relative rounded bg-muted px-[0.4rem] py-[0.15rem] font-mono text-sm font-medium"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="mb-4 mt-4 overflow-x-auto rounded-lg border bg-muted/50 p-4 text-sm font-mono"
        {...props}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="mt-4 mb-4 border-l-4 border-primary/30 pl-4 italic text-muted-foreground"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: () => <Separator className="my-8" />,
    table: ({ children, ...props }) => (
      <div className="mb-4 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="border-b bg-muted/50 px-4 py-2 text-left font-semibold" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border-b px-4 py-2" {...props}>
        {children}
      </td>
    ),
    TipBox: ({ title, children }: { title?: string; children: React.ReactNode }) => (
      <Card className="mb-4 border-l-4 border-l-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Badge variant="outline">提示</Badge>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">{children}</CardContent>
      </Card>
    ),
    WarningBox: ({ title, children }: { title?: string; children: React.ReactNode }) => (
      <Card className="mb-4 border-l-4 border-l-amber-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Badge variant="outline" className="border-amber-500 text-amber-600">注意</Badge>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">{children}</CardContent>
      </Card>
    ),
    ReviewBox: ({ type, children }: { type: "principle" | "money" | "education"; children: React.ReactNode }) => {
      const icons: Record<string, string> = { principle: "原理", money: "变现", education: "教育" };
      const colors: Record<string, string> = {
        principle: "border-l-green-500",
        money: "border-l-yellow-500",
        education: "border-l-purple-500",
      };
      return (
        <Card className={`mb-4 border-l-4 ${colors[type] || "border-l-green-500"}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">
              <Badge variant="outline">{icons[type] || type}</Badge>
              {" "}三视角复盘
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">{children}</CardContent>
        </Card>
      );
    },
    ...components,
  };
}
