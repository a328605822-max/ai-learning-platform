"use client";

import { useState, useCallback, useEffect } from "react";
import { P5Wrapper } from "./p5-wrapper";
import type p5 from "p5";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

// Simple 2-layer neural network trained on circular classification
export function NNPlayground() {
  const [hiddenSize, setHiddenSize] = useState(4);
  const [learningRate, setLearningRate] = useState(0.03);
  const [epoch, setEpoch] = useState(0);
  const [running, setRunning] = useState(true);
  const [accuracy, setAccuracy] = useState(0);

  const sketch = useCallback(
    (p: p5) => {
      // Network params
      const inputSize = 2;
      let W1: number[][], b1: number[], W2: number[][], b2: number[];
      let data: { x: number; y: number; label: number }[] = [];

      function initWeights() {
        W1 = Array.from({ length: hiddenSize }, () =>
          Array.from({ length: inputSize }, () => (Math.random() - 0.5) * 2)
        );
        b1 = Array.from({ length: hiddenSize }, () => 0);
        W2 = Array.from({ length: 2 }, () =>
          Array.from({ length: hiddenSize }, () => (Math.random() - 0.5) * 1)
        );
        b2 = Array.from({ length: 2 }, () => 0);
      }

      function relu(x: number): number {
        return Math.max(0, x);
      }

      function forward(x1: number, x2: number): number[] {
        // Hidden layer
        const h = Array.from({ length: hiddenSize }, (_, i) => {
          const z = W1[i][0] * x1 + W1[i][1] * x2 + b1[i];
          return relu(z);
        });
        // Output
        const out = Array.from({ length: 2 }, (_, i) => {
          let z = b2[i];
          for (let j = 0; j < hiddenSize; j++) z += W2[i][j] * h[j];
          return z;
        });
        // Softmax
        const maxOut = Math.max(...out);
        const exp = out.map((o) => Math.exp(Math.min(o - maxOut, 10)));
        const sum = exp.reduce((a, b) => a + b, 0);
        return exp.map((e) => e / sum);
      }

      function predict(x1: number, x2: number): number {
        const probs = forward(x1, x2);
        return probs[0] > probs[1] ? 0 : 1;
      }

      function trainOneStep() {
        if (data.length === 0) return;
        const idx = Math.floor(Math.random() * data.length);
        const d = data[idx];
        const probs = forward(d.x, d.y);
        const target = d.label;

        // Cross-entropy gradient: probs - onehot
        const gradOut = [probs[0], probs[1]];
        gradOut[target] -= 1;

        // Backward pass (simplified)
        // Hidden layer forward again
        const h = Array.from({ length: hiddenSize }, (_, i) => {
          const z = W1[i][0] * d.x + W1[i][1] * d.y + b1[i];
          return { z, a: relu(z) };
        });

        // Grad W2, b2
        for (let i = 0; i < 2; i++) {
          b2[i] -= learningRate * gradOut[i];
          for (let j = 0; j < hiddenSize; j++) {
            W2[i][j] -= learningRate * gradOut[i] * h[j].a;
          }
        }

        // Grad W1, b1
        for (let j = 0; j < hiddenSize; j++) {
          let gradH = 0;
          for (let i = 0; i < 2; i++) gradH += gradOut[i] * W2[i][j];
          if (h[j].z <= 0) gradH = 0; // ReLU grad
          b1[j] -= learningRate * gradH;
          W1[j][0] -= learningRate * gradH * d.x;
          W1[j][1] -= learningRate * gradH * d.y;
        }
      }

      function generateData() {
        data = [];
        // Circular pattern
        for (let i = 0; i < 120; i++) {
          const r = Math.random() * 3.5;
          const angle = Math.random() * Math.PI * 2;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          data.push({ x, y, label: r < 2 ? 0 : 1 });
        }
        // Inner cluster
        for (let i = 0; i < 30; i++) {
          data.push({
            x: (Math.random() - 0.5) * 1.5,
            y: (Math.random() - 0.5) * 1.5,
            label: 0,
          });
        }
        // Outer ring
        for (let i = 0; i < 40; i++) {
          const angle = Math.random() * Math.PI * 2;
          const r = 2.5 + Math.random() * 1;
          data.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, label: 1 });
        }
      }

      p.setup = () => {
        p.createCanvas(520, 420);
        initWeights();
        generateData();
        p.frameRate(60);
      };

      let frameCount = 0;
      p.draw = () => {
        p.clear();
        const scale = 60;
        const cx = p.width / 2;
        const cy = p.height / 2;

        // Background grid
        for (let px = 0; px < p.width; px += 12) {
          for (let py = 0; py < p.height; py += 12) {
            const x = (px - cx) / scale;
            const y = (py - cy) / scale;
            const pred = predict(x, y);
            p.fill(pred === 0 ? "rgba(59,130,246,0.08)" : "rgba(239,68,68,0.08)");
            p.noStroke();
            p.rect(px, py, 12, 12);
          }
        }

        // Data points
        for (const d of data) {
          const px = cx + d.x * scale;
          const py = cy + d.y * scale;
          p.fill(d.label === 0 ? "#3b82f6" : "#ef4444");
          p.noStroke();
          p.circle(px, py, 5);
        }

        // Train
        if (running) {
          for (let t = 0; t < 5; t++) trainOneStep();
          frameCount++;
          if (frameCount % 10 === 0) {
            let correct = 0;
            for (const d of data) {
              if (predict(d.x, d.y) === d.label) correct++;
            }
            setAccuracy(Math.round((correct / data.length) * 100));
            setEpoch(frameCount);
          }
        }

        // Labels
        p.fill("#94a3b8");
        p.textSize(11);
        p.textAlign(p.CENTER);
        p.text("🔵 内圈（类别 0）", p.width / 2 - 80, p.height - 16);
        p.text("🔴 外圈（类别 1）", p.width / 2 + 80, p.height - 16);
      };
    },
    [hiddenSize, learningRate, running]
  );

  const reset = () => {
    setEpoch(0);
    setAccuracy(0);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">隐藏层神经元：</span>
          {[2, 4, 8, 16].map((n) => (
            <Badge
              key={n}
              variant={hiddenSize === n ? "default" : "outline"}
              className="cursor-pointer text-xs"
              onClick={() => { setHiddenSize(n); reset(); }}
            >
              {n}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">学习率：</span>
          {[0.01, 0.03, 0.1, 0.3].map((lr) => (
            <Badge
              key={lr}
              variant={learningRate === lr ? "default" : "outline"}
              className="cursor-pointer text-xs"
              onClick={() => { setLearningRate(lr); reset(); }}
            >
              {lr}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-3 text-xs">
          <Badge variant="secondary">训练步数：{epoch}</Badge>
          <Badge variant="secondary">准确率：{accuracy}%</Badge>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => { setRunning(!running); }}
        >
          {running ? "暂停" : "继续"}
        </Button>
        <Button size="sm" variant="outline" onClick={reset} className="gap-1.5">
          <RotateCcw className="h-3 w-3" />
          重置
        </Button>
      </div>

      {/* Canvas */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <P5Wrapper sketch={sketch} className="w-full" deps={[hiddenSize, learningRate, running]} />
      </div>

      <p className="text-xs text-muted-foreground">
        蓝色/红色背景显示网络的「决策区域」。调节隐藏层大小看看模型容量如何影响学习能力：
        太少学不会（欠拟合），太多也浪费。学习率太高会震荡，太低收敛太慢。
      </p>
    </div>
  );
}
