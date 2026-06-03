"use client";

import { Play, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  bilibiliId?: string;
  youtubeId?: string;
  description?: string;
  duration?: string;
}

export function VideoCard({ title, bilibiliId, youtubeId, description, duration }: Props) {
  const youtubeUrl = youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : null;
  const bilibiliUrl = bilibiliId ? `https://www.bilibili.com/video/${bilibiliId}` : null;
  const primaryUrl = youtubeUrl || bilibiliUrl;

  return (
    <motion.div
      className="group my-6 overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Thumbnail */}
      <a href={primaryUrl || "#"} target="_blank" rel="noopener noreferrer" className="block relative">
        <div className="aspect-video bg-gradient-to-br from-muted via-muted/50 to-muted flex items-center justify-center relative overflow-hidden">
          {/* Pulsing play button */}
          <motion.div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Play className="h-6 w-6 ml-0.5" />
          </motion.div>

          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="absolute h-20 w-20 rounded-full border-2 border-red-500/20"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          </div>

          {duration && (
            <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
              {duration}
            </span>
          )}
        </div>
      </a>

      {/* Info */}
      <div className="p-4">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <Play className="h-3.5 w-3.5 text-red-500 shrink-0" />
          {title}
        </h4>
        {description && (
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
        )}
        <div className="flex gap-3 mt-3">
          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              在 YouTube 观看 <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {bilibiliUrl && (
            <a
              href={bilibiliUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-pink-600 hover:text-pink-700 transition-colors"
            >
              在 B 站观看 <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
