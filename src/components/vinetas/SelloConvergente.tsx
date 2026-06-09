"use client";

import { useEffect, useRef } from "react";
import "./vinetas.css";

/* PROPUESTA (rama) — EL SISTEMA SE COMPLETA, literal: la materia del Hero
   (trazos de alambre terracota) converge una sola vez y se suelda en el
   rombo sólido del sello. Apertura (wireframe en movimiento) → cierre
   (forma resuelta y quieta). ~1.6 s, sin loop; reduced: solo el sello. */

const N = 84;
const DUR = 1600;

export default function SelloConvergente({ inView }: { inView: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const fired = useRef(false);

  /* sin JS el sello se ve (SSR); con JS y sin reduced, se oculta hasta
     que la convergencia lo "suelda" */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && svgRef.current && !fired.current) svgRef.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    if (!inView || fired.current) return;
    fired.current = true;
    const canvas = canvasRef.current, svg = svgRef.current;
    if (!canvas || !svg) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { svg.style.opacity = "1"; return; }

    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = canvas.clientWidth;
    canvas.width = size * dpr; canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const accent =
      getComputedStyle(document.documentElement).getPropertyValue("--terracotta").trim() || "#C0542A";

    const c = size / 2, R = size * 0.46;
    /* destino: puntos repartidos por las 4 aristas del rombo */
    const lados: [number, number][][] = [
      [[c, c - R], [c + R, c]],
      [[c + R, c], [c, c + R]],
      [[c, c + R], [c - R, c]],
      [[c - R, c], [c, c - R]],
    ];
    const frac = (n: number) => n - Math.floor(n);
    const parts = Array.from({ length: N }, (_, i) => {
      const [a, b] = lados[i % 4];
      const t = frac(Math.sin(i * 91.7) * 4781.33);
      const dx = a[0] + (b[0] - a[0]) * t;
      const dy = a[1] + (b[1] - a[1]) * t;
      const ang = frac(Math.sin(i * 47.3) * 9173.7) * Math.PI * 2;
      const rad = R * (1.5 + frac(Math.sin(i * 13.1) * 771.3) * 1.6);
      return {
        x0: c + Math.cos(ang) * rad,
        y0: c + Math.sin(ang) * rad,
        dx, dy,
        rot: ang,
        len: 3 + frac(Math.sin(i * 7.7) * 311.1) * 6,
        delay: frac(Math.sin(i * 29.3) * 517.9) * 0.25,
      };
    });

    const t0 = performance.now();
    let raf = 0;
    const ease = (e: number) => 1 - Math.pow(1 - e, 3);
    const frame = (now: number) => {
      const e = Math.min(1, (now - t0) / DUR);
      ctx.clearRect(0, 0, size, size);
      ctx.strokeStyle = accent;
      ctx.lineCap = "round";
      for (const p of parts) {
        const k = ease(Math.max(0, Math.min(1, (e - p.delay) / (1 - p.delay))));
        const x = p.x0 + (p.dx - p.x0) * k;
        const y = p.y0 + (p.dy - p.y0) * k;
        const a = p.rot * (1 - k);
        ctx.globalAlpha = 0.35 + k * 0.65;
        ctx.lineWidth = 1 + k * 0.6;
        ctx.beginPath();
        ctx.moveTo(x - Math.cos(a) * p.len, y - Math.sin(a) * p.len);
        ctx.lineTo(x + Math.cos(a) * p.len, y + Math.sin(a) * p.len);
        ctx.stroke();
      }
      /* soldadura: el sólido emerge del alambre al final */
      svg.style.opacity = String(Math.max(0, (e - 0.72) / 0.28));
      canvas.style.opacity = String(e < 0.86 ? 1 : 1 - (e - 0.86) / 0.14);
      if (e < 1) raf = requestAnimationFrame(frame);
      else canvas.style.display = "none";
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <span className="sello" aria-hidden="true">
      <canvas ref={canvasRef} className="sello__canvas" />
      <svg ref={svgRef} className="sello__svg" viewBox="0 0 32 32">
        <path d="M16 1 L31 16 L16 31 L1 16 Z" />
      </svg>
    </span>
  );
}
