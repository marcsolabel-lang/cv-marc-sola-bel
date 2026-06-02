"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface SectionTransitionProps {
  className?: string;
}

export default function SectionTransition({ className = "" }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`w-full ${className}`} aria-hidden="true">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
        className="h-[2px] w-full bg-amber"
      />
    </div>
  );
}
