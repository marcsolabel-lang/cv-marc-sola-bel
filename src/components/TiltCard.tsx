"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const ROTATE_MAX = 12;

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 150, damping: 18 });
  const sy = useSpring(my, { stiffness: 150, damping: 18 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-ROTATE_MAX, ROTATE_MAX]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [ROTATE_MAX, -ROTATE_MAX]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  if (reduced) {
    return (
      <div
        className={`rounded-sm border border-line bg-sand p-6 transition-colors duration-300 hover:border-amber/50 hover:bg-surface ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 150, damping: 18 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={`rounded-sm border border-line bg-sand p-6 transition-colors duration-300 hover:border-amber/50 hover:bg-surface ${className}`}
    >
      {children}
    </motion.div>
  );
}
