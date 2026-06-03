"use client";

import { useState, useCallback } from "react";
import { P5Wrapper } from "./p5-wrapper";
import type p5 from "p5";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Simple tokenizer: splits on common boundaries
function simpleTokenize(text: string): string[] {
  if (!text) return [];
  const tokens: string[] = [];
  // Match: CJK characters, English words, numbers, punctuation
  const re = /[一-鿿]|[　-〿]|[＀-￯]|[a-zA-Z]+|\d+|[^\s]|\s/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match[0].trim()) tokens.push(match[0]);
  }
  return tokens.length > 0 ? tokens : text.split(/\s+/).filter(Boolean);
}

export function TokenLab() {
  const [text, setText] = useState("人工智能正在改变世界");
  const tokens = simpleTokenize(text);

  const sketch = useCallback(
    (p: p5) => {
      p.setup = () => {
        p.createCanvas(700, 200);
        p.textFont("monospace");
        p.noLoop();
      };

      p.draw = () => {
        p.clear();
        const cols = ["#dbeafe", "#dcfce7", "#fef3c7", "#fce7f3", "#e0e7ff", "#cffafe", "#f0fdf4", "#fef9c3"];
        const borderCols = ["#3b82f6", "#22c55e", "#eab308", "#ec4899", "#6366f1", "#06b6d4", "#16a34a", "#ca8a04"];

        const tokenWidths: number[] = [];
        let totalWidth = 0;
        for (const t of tokens) {
          const w = p.textWidth(t) + 20;
          tokenWidths.push(w);
          totalWidth += w + 8;
        }

        let x = Math.max(20, (p.width - totalWidth) / 2);
        const y = p.height / 2 - 12;

        tokens.forEach((t, i) => {
          const tw = tokenWidths[i];
          const ci = i % cols.length;

          // Background
          p.fill(cols[ci]);
          p.stroke(borderCols[ci]);
          p.strokeWeight(1.5);
          p.rect(x, y, tw, 28, 6);

          // Text
          p.noStroke();
          p.fill("#1e293b");
          p.textSize(14);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(t, x + tw / 2, y + 14);

          // Index label
          p.fill("#64748b");
          p.textSize(9);
          p.text(String(i + 1), x + tw / 2, y + 32);

          x += tw + 8;
        });
      };
    },
    [tokens]
  );

  const totalChars = text.replace(/\s/g, "").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入任意文字..."
          className="max-w-md"
        />
        <div className="flex gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">{totalChars} 字符</Badge>
          <Badge variant="outline">{tokens.length} tokens</Badge>
          <Badge variant="secondary">
            {totalChars > 0 ? (tokens.length / totalChars).toFixed(1) : "0"} token/字
          </Badge>
        </div>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <P5Wrapper sketch={sketch} className="w-full" deps={[tokens]} />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tokens.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-mono"
          >
            {t}
            <sub className="ml-0.5 text-[9px] text-muted-foreground">{i}</sub>
          </span>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        颜色不同的方块代表不同的 Token。AI 就是用这些「词块」来理解文字的。试试输入英文看看差异。
      </p>
    </div>
  );
}
