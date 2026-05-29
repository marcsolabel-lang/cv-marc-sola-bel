"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface TextRevealProps {
  lines: string[];
  /** Indices rendered in Cormorant italic as a pull-quote */
  serifLines?: number[];
  className?: string;
  /** ms between line reveals. Default 60 */
  staggerMs?: number;
}

export default function TextReveal({
  lines,
  serifLines = [],
  className = "",
  staggerMs = 60,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => {
        const isSerif = serifLines.includes(i);
        return (
          <div key={i} className="overflow-hidden">
            <motion.p
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0, y: 10 }}
              animate={
                inView
                  ? { clipPath: "inset(0% 0 0 0)", opacity: 1, y: 0 }
                  : {}
              }
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                delay: (i * staggerMs) / 1000,
              }}
              className={
                isSerif
                  ? "font-serif italic text-2xl md:text-3xl text-amber leading-snug mb-1"
                  : "text-[1.0625rem] text-ink/80 leading-relaxed"
              }
            >
              {line}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
}
