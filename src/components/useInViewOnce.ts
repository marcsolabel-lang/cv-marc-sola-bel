"use client";

import { useEffect, useRef, useState } from "react";

/* Observa una vez: true cuando el elemento entra en viewport (y se queda).
   Base de los dispositivos de entrada de las viñetas (§5 gesto base). */
export function useInViewOnce<T extends HTMLElement>(margin = "-60px 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); io.disconnect(); }
      },
      { rootMargin: margin, threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return { ref, inView };
}
