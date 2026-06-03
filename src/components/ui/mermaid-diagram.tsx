"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  chart: string;
  caption?: string;
  className?: string;
}

export function MermaidDiagram({ chart, caption, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    const renderDiagram = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          securityLevel: "loose",
          fontFamily: "var(--font-geist-sans), sans-serif",
        });

        const id = `mermaid-${Math.random().toString(36).slice(2, 8)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);

        if (!cancelled) {
          setSvg(renderedSvg);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
        }
      }
    };

    renderDiagram();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4">
        <p className="text-xs text-red-600 dark:text-red-400 font-mono">{error}</p>
        <pre className="mt-2 text-xs text-muted-foreground overflow-x-auto">{chart}</pre>
      </div>
    );
  }

  return (
    <figure className={cn("my-6", className)}>
      <div
        ref={containerRef}
        className="flex justify-center overflow-x-auto rounded-xl border bg-card p-4"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
