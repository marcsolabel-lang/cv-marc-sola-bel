"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface NavDotsProps {
  sections: { id: string; label: string }[];
}

export default function NavDots({ sections }: NavDotsProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Secciones"
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex"
    >
      {sections.map((s) => {
        const on = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            aria-label={s.label}
            aria-current={on}
            className="group flex items-center gap-2"
          >
            <span className="text-[0.7rem] uppercase tracking-wide text-muted opacity-0 transition-opacity group-hover:opacity-100">
              {s.label}
            </span>
            <motion.span
              animate={{ scale: on ? 1.4 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: on ? "var(--color-amber)" : "var(--color-line)" }}
            />
          </button>
        );
      })}
    </nav>
  );
}
