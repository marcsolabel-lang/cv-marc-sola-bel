"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

export interface ExperienceItem {
  period: string;
  role: string;
  org: string;
  detail: string;
}

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

export default function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollXProgress } = useScroll({ container: trackRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="w-full text-left">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 120, damping: 22 }}
        className="block__title mb-12"
      >
        Experiencia
      </motion.h2>

      <div
        ref={trackRef}
        className="flex flex-col gap-6 md:flex-row md:gap-6 md:overflow-x-auto md:pb-4 md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 22,
              delay: i * 0.1,
            }}
            whileHover={{ y: -4 }}
            style={{ willChange: "transform" }}
            className="border-l-2 border-amber bg-shade p-6 md:w-[340px] md:shrink-0 rounded-sm"
          >
            <span className="text-sm text-muted tabular-nums">{item.period}</span>
            <h3 className="mt-3 text-lg font-bold text-ink leading-snug">{item.role}</h3>
            <p className="mt-0.5 text-sm font-medium text-amber">{item.org}</p>
            <p className="mt-3 text-sm text-muted leading-relaxed">{item.detail}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-5 hidden h-[2px] w-full bg-line md:block" aria-hidden="true">
        <motion.div style={{ width: progressWidth }} className="h-full bg-amber" />
      </div>
    </div>
  );
}
