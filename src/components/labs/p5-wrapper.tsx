"use client";

import { useEffect, useRef, useCallback } from "react";
import type p5 from "p5";

interface Props {
  sketch: (p: p5) => void;
  className?: string;
  deps?: unknown[];
}

export function P5Wrapper({ sketch, className, deps = [] }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<p5 | null>(null);

  const initSketch = useCallback(async () => {
    // Cleanup previous instance
    if (instanceRef.current) {
      instanceRef.current.remove();
      instanceRef.current = null;
    }

    if (!containerRef.current) return;

    const P5 = (await import("p5")).default;
    instanceRef.current = new P5(sketch, containerRef.current);
  }, deps);

  useEffect(() => {
    initSketch();
    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, [initSketch]);

  return <div ref={containerRef} className={className} />;
}
