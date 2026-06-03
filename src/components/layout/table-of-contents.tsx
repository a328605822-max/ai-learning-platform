"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Wait for MDX content to render before scanning headings
    const timeout = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll("h2, h3"));
      const items: TocItem[] = elements.map((el, i) => {
        const id = el.id || `heading-${i}`;
        if (!el.id) el.id = id;
        return {
          id,
          text: el.textContent || "",
          level: el.tagName === "H2" ? 2 : 3,
        };
      });
      setHeadings(items);
      setActiveId("");

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          }
        },
        { rootMargin: "-80px 0px -70% 0px" }
      );

      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {};  // Cleanup handled by timeout
  }, [pathname]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav className="hidden lg:block fixed right-6 w-52 z-30" style={{ top: "5rem" }}>
      <div className="sticky top-20">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-1 rounded-full bg-gradient-to-b from-brand-blue to-brand-purple" />
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em]">
            目录
          </span>
        </div>

        <ul className="relative space-y-0">
          {/* Active indicator */}
          <AnimatePresence>
            {activeId && (
              <motion.div
                className="absolute left-0 w-[3px] rounded-full bg-gradient-to-b from-brand-blue to-brand-purple shadow-lg shadow-brand-blue/30"
                layoutId="toc-indicator"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                  mass: 0.8,
                }}
                style={{
                  top: headings.findIndex((h) => h.id === activeId) * 28 + 4,
                  height: 20,
                }}
              />
            )}
          </AnimatePresence>

          {headings.map((h, i) => {
            const isActive = activeId === h.id;
            const isNearActive =
              !isActive &&
              activeId &&
              headings.findIndex((hh) => hh.id === activeId) === i - 1;

            return (
              <li key={h.id} className="relative">
                <button
                  onClick={() => scrollTo(h.id)}
                  className={cn(
                    "block w-full text-left py-1.5 text-xs leading-tight transition-all duration-200 rounded-sm hover:bg-muted/30 pl-3",
                    h.level === 3 && "pl-6",
                    isActive
                      ? "text-foreground font-semibold"
                      : isNearActive
                      ? "text-muted-foreground/80"
                      : "text-muted-foreground/50"
                  )}
                >
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : isNearActive ? 0.7 : 0.45,
                      x: isActive ? 2 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="line-clamp-2"
                  >
                    {h.text}
                  </motion.span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
