"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Simulated attention weights for demo purposes
function computeAttention(tokens: string[]): number[][] {
  const n = tokens.length;
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    // Each token attends strongly to itself and nearby tokens
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      let score: number;
      if (i === j) {
        score = 4; // Self-attention
      } else if (Math.abs(i - j) <= 2) {
        score = 2.5 / (Math.abs(i - j) + 0.5); // Nearby tokens
      } else {
        score = 0.5 / Math.abs(i - j); // Distant tokens
      }
      // Boost for specific patterns
      if (tokens[i] === "它" && tokens[j] === "猫") score += 3; // pronoun resolution
      if (tokens[i] === "很" && tokens[j - 1] === "很") score += 1.5;
      row.push(score);
    }

    // Softmax
    const maxScore = Math.max(...row);
    const exp = row.map((s) => Math.exp(Math.min(s - maxScore, 10)));
    const sum = exp.reduce((a, b) => a + b, 0);
    matrix[i] = exp.map((e) => e / sum);
  }

  return matrix;
}

function getHeatColor(value: number): string {
  // 0 = transparent, 1 = intense blue
  const intensity = Math.min(value * 2.5, 1);
  const r = Math.round(59 + intensity * (147 - 59));
  const g = Math.round(130 + intensity * (197 - 130));
  const b = Math.round(246 - intensity * 50);
  return `rgb(${r},${g},${b})`;
}

const examples = [
  "猫追老鼠它跑了",
  "人工智能正在改变世界",
  "我今天去公园散步",
  "这本书非常有趣好看",
];

export function AttentionLab() {
  const [text, setText] = useState(examples[1]);
  const tokens = text.split("").filter((c) => c.trim());
  const attention = computeAttention(tokens);

  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);
  const [hoveredToken, setHoveredToken] = useState<number | null>(null);

  const maxAttn = Math.max(...attention.flat());

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入一个句子..."
          className="max-w-sm"
        />
        <span className="text-xs text-muted-foreground">{tokens.length} 个字符</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {examples.map((ex) => (
          <Badge
            key={ex}
            variant={text === ex ? "default" : "outline"}
            className="cursor-pointer text-xs"
            onClick={() => setText(ex)}
          >
            {ex}
          </Badge>
        ))}
      </div>

      {/* Attention matrix */}
      <div className="rounded-xl border bg-card overflow-x-auto p-4">
        <p className="text-xs text-muted-foreground mb-3">
          左侧：查询词（这个词在「关注」谁） / 顶部：被关注的词
        </p>
        <div className="inline-block min-w-full">
          {/* Column headers */}
          <div className="flex ml-10">
            {tokens.map((t, i) => (
              <div
                key={i}
                className="w-10 text-center text-[10px] font-mono text-muted-foreground pb-1.5"
              >
                {t}
              </div>
            ))}
          </div>

          {/* Rows */}
          {tokens.map((rowToken, i) => (
            <div key={i} className="flex items-center">
              <div className="w-9 text-right text-[10px] font-mono text-muted-foreground pr-1.5 shrink-0">
                {rowToken}
              </div>
              {attention[i].map((weight, j) => {
                const isHovered =
                  hoveredCell?.row === i ||
                  hoveredCell?.col === j ||
                  hoveredToken === i;
                const intensity = weight / maxAttn;
                const scale = isHovered ? 1.15 : 1;
                return (
                  <div
                    key={j}
                    className="w-10 h-8 flex items-center justify-center cursor-pointer transition-all"
                    style={{ transform: `scale(${scale})` }}
                    onMouseEnter={() => setHoveredCell({ row: i, col: j })}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    <div
                      className="rounded-sm transition-colors"
                      style={{
                        width: `${Math.max(intensity * 28, 4)}px`,
                        height: `${Math.max(intensity * 24, 4)}px`,
                        backgroundColor: getHeatColor(weight),
                        opacity: Math.max(intensity * 0.9 + 0.15, 0.2),
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Sentence viz */}
      <div className="rounded-xl border bg-card p-4">
        <p className="text-xs text-muted-foreground mb-3">
          悬停任意字符，查看它「关注」谁（蓝色连线越粗=关注度越高）
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 py-3">
          {tokens.map((t, i) => (
            <span
              key={i}
              className={`inline-flex items-center justify-center w-9 h-9 rounded-md text-sm font-mono cursor-pointer transition-all ${
                hoveredToken === i
                  ? "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/50 scale-110"
                  : "bg-muted/50 text-foreground/80 hover:bg-muted"
              }`}
              onMouseEnter={() => setHoveredToken(i)}
              onMouseLeave={() => setHoveredToken(null)}
            >
              {t}
            </span>
          ))}
        </div>
        {/* Attention arrows when hovering */}
        {hoveredToken !== null && (
          <div className="mt-2 flex flex-wrap gap-1 justify-center">
            {tokens.map((t, j) => {
              const w = attention[hoveredToken][j];
              if (w < 0.05 || j === hoveredToken) return null;
              return (
                <Badge key={j} variant="outline" className="text-[10px] gap-1">
                  ← {t}
                  <span className="text-muted-foreground">
                    {(w * 100).toFixed(0)}%
                  </span>
                </Badge>
              );
            })}
            {attention[hoveredToken].filter((w, j) => w >= 0.05 && j !== hoveredToken).length === 0 && (
              <span className="text-xs text-muted-foreground">这个词主要关注自己</span>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Attention 机制是 Transformer 的核心。每生成一个字时，模型会「回顾」上文的所有字，给重要的字更高权重。
        比如处理「它」时，会重点看「猫」和「老鼠」来确定「它」到底指谁。
      </p>
    </div>
  );
}
