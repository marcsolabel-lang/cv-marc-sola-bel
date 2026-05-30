"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface ProjectSpotlightProps {
  label: string;
  title: string;
  description: string;
  points: string[];
}

export default function ProjectSpotlight({
  label,
  title,
  description,
  points,
}: ProjectSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      className="mx-auto w-full max-w-3xl rounded-2xl border border-line bg-shade p-8 text-left md:p-12"
    >
      <span className="font-serif text-xl italic text-amber">{label}</span>
      <h3 className="mt-2 font-extrabold text-ink" style={{ fontSize: "var(--fs-h3)" }}>
        {title}
      </h3>
      <p className="mt-4 text-muted" style={{ fontSize: "var(--fs-body)" }}>
        {description}
      </p>
      <ul className="mt-6 space-y-2">
        {points.map((p, i) => (
          <li key={i} className="flex gap-3 text-ink" style={{ fontSize: "var(--fs-body)" }}>
            <span className="text-amber shrink-0">—</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
