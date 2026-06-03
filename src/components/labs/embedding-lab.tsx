"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";

// Pre-computed 2D embedding positions (simulated via PCA-like mapping)
const WORD_GROUPS: Record<string, string[]> = {
  animals: ["猫", "狗", "兔子", "老虎", "狮子", "大象", "长颈鹿"],
  tech: ["计算机", "编程", "算法", "AI", "机器学习", "深度学习", "神经网络"],
  food: ["披萨", "汉堡", "面条", "寿司", "米饭", "面包", "蛋糕"],
  emotion: ["开心", "难过", "愤怒", "恐惧", "喜爱", "讨厌", "平静"],
};

const GROUP_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  animals: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
  tech: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
  food: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
  emotion: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
};

function generatePositions(groups: Record<string, string[]>) {
  const positions: Record<string, { x: number; y: number }> = {};
  const centers: Record<string, { cx: number; cy: number }> = {};

  // Place cluster centers
  const clusterCenters = [
    { cx: 25, cy: 25 },
    { cx: 72, cy: 28 },
    { cx: 50, cy: 70 },
    { cx: 22, cy: 68 },
  ];

  let ci = 0;
  for (const group of Object.keys(groups)) {
    centers[group] = clusterCenters[ci % clusterCenters.length];
    ci++;
  }

  // Scatter words around their cluster center
  for (const [group, words] of Object.entries(groups)) {
    const { cx, cy } = centers[group];
    words.forEach((word, i) => {
      const angle = (i / words.length) * Math.PI * 2 + Math.random() * 0.3;
      const radius = 6 + Math.random() * 9;
      positions[word] = {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      };
    });
  }

  return { positions, centers };
}

export function EmbeddingLab() {
  const [seed, setSeed] = useState(0);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const { positions, centers } = useMemo(() => {
    // Seed-deterministic "random"
    const oldRandom = Math.random;
    let s = seed;
    Math.random = () => {
      s = (s * 16807 + 0) % 2147483647;
      return (s - 1) / 2147483646;
    };
    const result = generatePositions(WORD_GROUPS);
    Math.random = oldRandom;
    return result;
  }, [seed]);

  const shuffle = () => setSeed((s) => s + 1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          语义相近的词语在向量空间中自然聚集。悬停词语查看它属于哪个类别。
        </p>
        <Button variant="outline" size="sm" onClick={shuffle} className="gap-1.5">
          <Shuffle className="h-3.5 w-3.5" />
          重新分布
        </Button>
      </div>

      <div className="relative rounded-xl border bg-card overflow-hidden" style={{ height: 420 }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Cluster circles */}
          {Object.entries(centers).map(([group, { cx, cy }]) => {
            const color = GROUP_COLORS[group];
            return (
              <g key={group}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={16}
                  fill="none"
                  stroke={color.border.replace("border-", "")}
                  strokeWidth="0.3"
                  strokeDasharray="1 0.5"
                  className="opacity-40"
                />
                <text
                  x={cx}
                  y={cy - 17}
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  fontSize="2.2"
                  fontWeight="600"
                >
                  {group === "animals" ? "动物" : group === "tech" ? "科技" : group === "food" ? "食物" : "情感"}
                </text>
              </g>
            );
          })}

          {/* Words */}
          {Object.entries(positions).map(([word, { x, y }]) => {
            const group = Object.entries(WORD_GROUPS).find(([, words]) => words.includes(word))?.[0] || "";
            const color = GROUP_COLORS[group] || GROUP_COLORS.animals;
            const isHovered = hoveredWord === word;

            return (
              <g
                key={word}
                onMouseEnter={() => setHoveredWord(word)}
                onMouseLeave={() => setHoveredWord(null)}
                className="cursor-pointer"
              >
                {isHovered && (
                  <>
                    <circle cx={x} cy={y} r={isHovered ? 4 : 0} fill={color.bg} className="opacity-20" />
                    {/* Connection lines to same-group words */}
                    {WORD_GROUPS[group]
                      .filter((w) => w !== word)
                      .slice(0, 3)
                      .map((w) => {
                        const wp = positions[w];
                        if (!wp) return null;
                        return (
                          <line
                            key={w}
                            x1={x}
                            y1={y}
                            x2={wp.x}
                            y2={wp.y}
                            stroke={color.border.replace("border-", "")}
                            strokeWidth="0.15"
                            className="opacity-30"
                          />
                        );
                      })}
                  </>
                )}
                <rect
                  x={x - 3.5}
                  y={y - 1.2}
                  width={7}
                  height={2.4}
                  rx={0.8}
                  fill={isHovered ? color.bg : "#1e293b"}
                  stroke={isHovered ? color.border.replace("border-", "") : "#334155"}
                  strokeWidth="0.3"
                />
                <text
                  x={x}
                  y={y + 0.6}
                  textAnchor="middle"
                  fill={isHovered ? color.text : "#94a3b8"}
                  fontSize={isHovered ? 2.2 : 1.6}
                  fontWeight={isHovered ? "600" : "400"}
                >
                  {word}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(GROUP_COLORS).map(([key, color]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded ${color.bg} ${color.border} border`} />
            <span className="text-xs text-muted-foreground">
              {key === "animals" ? "动物" : key === "tech" ? "科技" : key === "food" ? "食物" : "情感"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
