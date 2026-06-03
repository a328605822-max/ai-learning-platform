"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

// Simulate probability distribution for different temperatures
function getDistribution(temp: number, nTokens: number = 8) {
  const baseTokens = ["好", "热", "差", "冷", "棒", "烂", "妙", "烦"];
  // At temp=0, the top token dominates. At temp=1, distribution flattens.
  const logits = baseTokens.map((_, i) => 8 - i * 0.9);
  const scaled = logits.map((l) => Math.exp(l / (temp * 0.8 + 0.1)));
  const sum = scaled.reduce((a, b) => a + b, 0);
  const probs = scaled.map((s) => s / sum);

  return baseTokens.map((token, i) => ({
    token,
    probability: probs[i],
    color:
      i === 0
        ? temp < 0.3
          ? "bg-blue-500"
          : temp < 0.7
          ? "bg-indigo-500"
          : "bg-violet-500"
        : i === 1
        ? "bg-blue-400/70"
        : i === 2
        ? "bg-slate-400/50"
        : "bg-slate-400/30",
  }));
}

const examplePrompts = [
  { text: "今天天气真", label: "日常" },
  { text: "人工智能的未来说是", label: "科技" },
  { text: "这道菜的味道非常", label: "美食" },
  { text: "小朋友在公园里玩得", label: "生活" },
];

export function TemperatureLab() {
  const [temp, setTemp] = useState(0.7);
  const [promptIdx, setPromptIdx] = useState(0);

  const prompt = examplePrompts[promptIdx];
  const dist = getDistribution(temp);

  const mode =
    temp < 0.2
      ? { label: "极度保守", desc: "输出几乎不变，像标准答案", color: "text-blue-400" }
      : temp < 0.5
      ? { label: "较为保守", desc: "确定性高，适合事实问答", color: "text-cyan-400" }
      : temp < 0.8
      ? { label: "平衡", desc: "有变化但不离谱，日常最佳", color: "text-green-400" }
      : temp < 0.95
      ? { label: "有创意", desc: "多样性增加，适合写作", color: "text-orange-400" }
      : { label: "近乎随机", desc: "每次输出差异很大，可能胡言乱语", color: "text-red-400" };

  return (
    <div className="space-y-6">
      {/* Prompt selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">上下文：</span>
        {examplePrompts.map((p, i) => (
          <Badge
            key={i}
            variant={i === promptIdx ? "default" : "outline"}
            className="cursor-pointer text-xs"
            onClick={() => setPromptIdx(i)}
          >
            {p.label}
          </Badge>
        ))}
      </div>

      {/* Probability visualization */}
      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm mb-4">
          上文：「<span className="font-mono text-foreground font-medium">{prompt.text}</span>」
          <span className="text-muted-foreground"> → AI 在猜：</span>
        </p>

        <div className="space-y-2">
          {dist.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-8 text-right text-sm font-mono text-muted-foreground">
                #{i + 1}
              </span>
              <div className="flex-1 h-9 rounded-md bg-muted/50 relative overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 ${item.color} rounded-md transition-all duration-300 flex items-center px-3`}
                  style={{ width: `${Math.max(item.probability * 100, 2)}%` }}
                >
                  <span className="text-sm font-bold text-white drop-shadow-sm">
                    {item.token}
                  </span>
                </div>
              </div>
              <span className="w-16 text-right text-xs font-mono text-muted-foreground">
                {(item.probability * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Temperature slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Temperature</span>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-bold ${mode.color}`}>{mode.label}</span>
            <Badge variant="outline" className="font-mono text-sm">
              {temp.toFixed(2)}
            </Badge>
          </div>
        </div>
        <Slider
          value={[temp]}
          onValueChange={(value) => setTemp(Array.isArray(value) ? value[0] : value)}
          min={0}
          max={1}
          step={0.01}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>0.0 — 极度保守</span>
          <span>0.5 — 平衡</span>
          <span>1.0 — 近乎随机</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{mode.desc}</p>
      </div>
    </div>
  );
}
