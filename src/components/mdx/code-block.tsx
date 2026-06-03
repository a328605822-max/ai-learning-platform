"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CodeBlock({
  language,
  code,
  filename,
}: {
  language?: string;
  code: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl border overflow-hidden shadow-sm">
      <div className="flex items-center justify-between bg-muted/50 px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          {filename ? (
            <span className="text-xs font-mono font-medium text-muted-foreground ml-2">{filename}</span>
          ) : language ? (
            <span className="text-xs font-medium text-muted-foreground uppercase ml-2">{language}</span>
          ) : null}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-md px-2 py-1 hover:bg-muted"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" /> 已复制
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> 复制代码
            </>
          )}
        </button>
      </div>
      <pre className="p-5 bg-muted/20 overflow-x-auto text-sm font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
