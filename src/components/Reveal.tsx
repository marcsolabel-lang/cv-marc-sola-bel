"use client";

import { useInViewOnce } from "./useInViewOnce";

/* Gesto base (§5): aparición fade + leve subida al entrar en viewport.
   CSS puro sobre transform/opacity; reduced-motion lo anula en globals. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "header" | "footer" | "p";
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${inView ? "reveal--in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
