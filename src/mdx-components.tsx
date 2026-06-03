import type { MDXComponents } from "mdx/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Info,
  Zap,
  Target,
  Sparkles,
  Brain,
  Play,
  BookOpen,
  Code2,
  ExternalLink,
} from "lucide-react";
import {
  TipBox,
  WarningBox,
  SuccessBox,
  InfoCallout,
  KeyPoint,
  ConceptCard,
  StepGuide,
  ImageCard,
  VideoEmbed,
  ComparisonTable,
  ReviewPanel,
  MilestoneCard,
  ResourceLink,
  StatGrid,
  DataTable,
} from "@/components/mdx/rich-components";
import { CodeBlock } from "@/components/mdx/code-block";
import { VideoCard } from "@/components/ui/video-card";
import { MermaidDiagram } from "@/components/ui/mermaid-diagram";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-extrabold tracking-tight mt-10 mb-6 lg:text-4xl" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 pb-2 border-b lg:text-3xl" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-xl font-semibold tracking-tight mt-8 mb-3" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-lg font-semibold mt-6 mb-2" {...props}>
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="leading-7 mb-5 text-foreground/85" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-6 mb-5 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2" {...props}>
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
        className="relative rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm font-medium"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="mb-6 mt-4 overflow-x-auto rounded-xl border bg-muted/30 p-5 text-sm font-mono leading-relaxed"
        {...props}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="mt-6 mb-6 border-l-[3px] border-primary/30 pl-5 italic text-muted-foreground"
        {...props}
      >
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }) => (
      <div className="mb-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="border-b-2 bg-muted/40 px-4 py-3 text-left font-semibold" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border-b px-4 py-2.5" {...props}>
        {children}
      </td>
    ),
    hr: () => <Separator className="my-10" />,
    img: ({ src, alt, ...props }) => (
      <span className="my-8 flex justify-center">
        <span className="overflow-hidden rounded-xl border inline-block">
          <img src={src} alt={alt || ""} className="max-w-full h-auto block" loading="lazy" {...props} />
        </span>
      </span>
    ),

    // Rich components
    TipBox,
    WarningBox,
    SuccessBox,
    InfoCallout,
    KeyPoint,
    ConceptCard,
    StepGuide,
    ImageCard,
    VideoEmbed,
    ComparisonTable,
    ReviewPanel,
    ReviewBox: ReviewPanel,
    MilestoneCard,
    CodeBlock,
    ResourceLink,
    StatGrid,
    DataTable,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Badge,
    Separator,

    // Commonly used icons
    Lightbulb,
    AlertTriangle,
    CheckCircle2,
    Info,
    Zap,
    Target,
    Sparkles,
    Brain,
    Play,
    BookOpen,
    Code2,
    ExternalLink,

    // Media components
    VideoCard,
    MermaidDiagram,

    ...components,
  };
}
