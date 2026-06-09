"use client";

import { useEffect, useRef } from "react";
import "./hero.css";

/* HERO (§6.1, §8 · cerrado) — metáfora portadora: el poliedro ES el sistema.
   Port fiel del HTML vivo aprobado en Design:
   - peonza octaédrica de alambre con física (momento + fricción + lanzamiento)
   - statement con peso variable de Bricolage reactivo al cursor
   - autoescalado anti-recorte (extents precomputados sobre giro e inclinación)
   Pendiente resuelto aquí: recentrado del arrastre suavizado con lerp. */

type Vec3 = [number, number, number];

function buildOctahedron(freq: number) {
  const T: Vec3 = [0, 1, 0], B: Vec3 = [0, -1, 0];
  const E: Vec3[] = [[1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1]];
  const faces: Vec3[][] = [];
  for (let i = 0; i < 4; i++) {
    faces.push([T, E[i], E[(i + 1) % 4]]);
    faces.push([B, E[(i + 1) % 4], E[i]]);
  }
  const verts: Vec3[] = [];
  const edges: [number, number][] = [];
  const vmap = new Map<string, number>();
  const eset = new Set<string>();
  const key = (p: Vec3) => p.map((v) => v.toFixed(4)).join(",");
  const addV = (p: Vec3): number => {
    const k = key(p);
    if (vmap.has(k)) return vmap.get(k)!;
    const id = verts.length; verts.push(p); vmap.set(k, id); return id;
  };
  const addE = (i: number, j: number) => {
    if (i === j) return;
    const k = i < j ? `${i}_${j}` : `${j}_${i}`;
    if (eset.has(k)) return; eset.add(k); edges.push([i, j]);
  };
  for (const [A, Bv, C] of faces) {
    const g: number[][] = [];
    for (let i = 0; i <= freq; i++) {
      g[i] = [];
      for (let j = 0; j <= freq - i; j++) {
        g[i][j] = addV([
          A[0] + (Bv[0] - A[0]) * (i / freq) + (C[0] - A[0]) * (j / freq),
          A[1] + (Bv[1] - A[1]) * (i / freq) + (C[1] - A[1]) * (j / freq),
          A[2] + (Bv[2] - A[2]) * (i / freq) + (C[2] - A[2]) * (j / freq),
        ]);
      }
    }
    for (let i = 0; i <= freq; i++)
      for (let j = 0; j < freq - i; j++) addE(g[i][j], g[i][j + 1]);
    for (let i = 0; i < freq; i++)
      for (let j = 0; j < freq - i; j++) {
        addE(g[i][j], g[i + 1][j]);
        addE(g[i][j + 1], g[i + 1][j]);
      }
  }
  const APEX: Vec3[] = [[0, 1, 0], [0, -1, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1]];
  const isVertex = verts.map((p) =>
    APEX.some((c) => Math.abs(c[0] - p[0]) < 1e-6 && Math.abs(c[1] - p[1]) < 1e-6 && Math.abs(c[2] - p[2]) < 1e-6)
  );
  return { verts, edges, isVertex };
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = heroRef.current;
    const headline = headlineRef.current;
    const canvas = canvasRef.current;
    if (!hero || !headline || !canvas) return;

    const ctx = canvas.getContext("2d")!;
    const root = document.documentElement;
    const geo = buildOctahedron(2);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const CAM = 3.3;
    const getRest = () => parseInt(getComputedStyle(root).getPropertyValue("--hl-weight"), 10) || 830;
    let accent = readAccent();
    function readAccent() {
      return getComputedStyle(root).getPropertyValue("--terracotta").trim() || "#C0542A";
    }

    /* Extents máximos sobre todo el giro y rango de inclinación:
       la peonza nunca se recorta, gire como gire. */
    let HWmax = 0.001, HHmax = 0.001;
    for (const ax of [-0.36, -0.48, -0.60, -0.72, -0.80]) {
      const cxv = Math.cos(ax), sxv = Math.sin(ax);
      for (let k = 0; k < 72; k++) {
        const ay = (k / 72) * Math.PI * 2, cyv = Math.cos(ay), syv = Math.sin(ay);
        let mnx = Infinity, mxx = -Infinity, mny = Infinity, mxy = -Infinity;
        for (const p of geo.verts) {
          const x = p[0] * cyv + p[2] * syv;
          const z = -p[0] * syv + p[2] * cyv;
          const y2 = p[1] * cxv - z * sxv;
          const z2 = p[1] * sxv + z * cxv;
          const ps = CAM / (CAM - z2);
          const ox = x * ps, oy = y2 * ps;
          if (ox < mnx) mnx = ox; if (ox > mxx) mxx = ox;
          if (oy < mny) mny = oy; if (oy > mxy) mxy = oy;
        }
        const hw = (mxx - mnx) / 2, hh = (mxy - mny) / 2;
        if (hw > HWmax) HWmax = hw; if (hh > HHmax) HHmax = hh;
      }
    }

    let ry = 0.7, rx = -0.42, targetRx = -0.42;
    const BASE_TILT = -0.42;
    let cursorTilt = BASE_TILT;
    const DRAG_SENS = 0.006, FRICTION = 0.988, MAX_VEL = 0.11;
    const MIN_IDLE = reduced ? 0 : 0.0022;
    let vel = reduced ? 0 : 0.05;
    let dragging = false, cursorActive = false;
    let lastX = 0, lastT = 0;
    const RADIUS = 620;

    /* Lerp del recentrado: el centro de la caja proyectada persigue su
       objetivo en vez de saltar — el arrastre deja de "bailar". */
    let smX = 0, smY = 0, smInit = false;

    const t0 = performance.now(), INTRO_DELAY = 450, INTRO_DUR = 1500;
    const introFactor = (now: number) => {
      const e = Math.max(0, Math.min(1, (now - t0 - INTRO_DELAY) / INTRO_DUR));
      return 1 - Math.pow(1 - e, 3);
    };

    const rotate = (p: Vec3): Vec3 => {
      const cy = Math.cos(ry), sy = Math.sin(ry);
      const x = p[0] * cy + p[2] * sy, z = -p[0] * sy + p[2] * cy;
      const cx = Math.cos(rx), sx = Math.sin(rx);
      return [x, p[1] * cx - z * sx, p[1] * sx + z * cx];
    };

    const draw = (now: number, dt = 1) => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const intro = reduced ? 1 : introFactor(now);
      rx += (targetRx - rx) * 0.06;

      const rotd = geo.verts.map((v) => {
        const r = rotate(v), ps = CAM / (CAM - r[2]);
        return { ox: r[0] * ps, oy: r[1] * ps, z: r[2] };
      });
      let mnx = Infinity, mxx = -Infinity, mny = Infinity, mxy = -Infinity;
      for (const p of rotd) {
        if (p.ox < mnx) mnx = p.ox; if (p.ox > mxx) mxx = p.ox;
        if (p.oy < mny) mny = p.oy; if (p.oy > mxy) mxy = p.oy;
      }
      const midOX = (mnx + mxx) / 2, midOY = (mny + mxy) / 2;
      if (!smInit) { smX = midOX; smY = midOY; smInit = true; }
      const k = 1 - Math.pow(0.88, dt);
      smX += (midOX - smX) * k;
      smY += (midOY - smY) * k;

      const cushion = Math.max(0.04 * Math.min(w, h), 32);
      const R = Math.max(0, Math.min((w / 2 - cushion) / HWmax, (h / 2 - cushion) / HHmax)) * (0.7 + 0.3 * intro);
      const cx = w / 2 - R * smX;
      const cy = h / 2 + R * smY;
      const P = rotd.map((p) => ({ x: cx + p.ox * R, y: cy - p.oy * R, z: p.z }));

      const order = geo.edges
        .map((e) => ({ e, z: (P[e[0]].z + P[e[1]].z) / 2 }))
        .sort((a, b) => a.z - b.z);

      ctx.lineCap = "round";
      ctx.strokeStyle = accent;
      for (const { e, z } of order) {
        const a = P[e[0]], b = P[e[1]], d = (z + 1) / 2;
        ctx.globalAlpha = (0.14 + d * 0.82) * intro;
        ctx.lineWidth = 0.7 + d * 1.0;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      ctx.fillStyle = accent;
      for (let i = 0; i < P.length; i++) {
        if (!geo.isVertex[i]) continue;
        const d = (P[i].z + 1) / 2;
        ctx.globalAlpha = (0.3 + d * 0.7) * intro;
        ctx.beginPath(); ctx.arc(P[i].x, P[i].y, 1.8 + d * 2.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let last = performance.now(), rafId = 0;
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3); last = now;
      if (!dragging) {
        ry += vel * dt; vel *= Math.pow(FRICTION, dt);
        if (Math.abs(vel) < MIN_IDLE) vel = MIN_IDLE * (vel < 0 ? -1 : 1);
      }
      const osc = reduced ? 0 : Math.sin(now * 0.00035) * 0.12;
      targetRx = Math.max(-0.80, Math.min(-0.36, cursorTilt + osc));
      draw(now, dt);
      rafId = requestAnimationFrame(loop);
    };

    /* reduced-motion: figura estática digna, sin bucle (se repinta a demanda) */
    const drawStatic = () => draw(performance.now(), 1);
    if (reduced) {
      drawStatic();
      window.addEventListener("resize", drawStatic);
    } else {
      rafId = requestAnimationFrame(loop);
    }

    /* Peso del titular: animación de carga 320 → reposo, luego sigue al cursor */
    if (!reduced) {
      headline.style.transition = "font-weight 1.1s cubic-bezier(0.16,1,0.3,1)";
      headline.style.fontWeight = "320";
      requestAnimationFrame(() => requestAnimationFrame(() => {
        headline.style.fontWeight = String(getRest());
      }));
      setTimeout(() => {
        headline.style.transition = "font-weight 0.35s ease-out";
        headline.style.removeProperty("font-weight");
        cursorActive = true;
      }, 1300);
    }

    const onDown = (e: PointerEvent) => {
      dragging = true; lastX = e.clientX; lastT = e.timeStamp;
      hero.classList.add("is-grabbing");
      try { hero.setPointerCapture(e.pointerId); } catch { /* sin captura no pasa nada */ }
    };
    const onMove = (e: PointerEvent) => {
      cursorTilt = BASE_TILT + ((e.clientY / window.innerHeight) - 0.5) * 0.5;
      if (dragging) {
        const dx = e.clientX - lastX, dt2 = Math.max(8, e.timeStamp - lastT);
        ry += dx * DRAG_SENS;
        const raw = dx * DRAG_SENS * (16.67 / dt2);
        vel = MAX_VEL * Math.tanh(raw / MAX_VEL);
        lastX = e.clientX; lastT = e.timeStamp;
        e.preventDefault();
      }
      if (cursorActive) {
        const rest = getRest();
        const NEAR = Math.min(900, rest + 70), FAR = Math.max(300, rest - 200);
        const r = headline.getBoundingClientRect();
        const dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        headline.style.fontWeight = String(Math.round(NEAR - Math.min(dist / RADIUS, 1) * (NEAR - FAR)));
      }
    };
    const onUp = () => { dragging = false; hero.classList.remove("is-grabbing"); };
    const onLeave = () => {
      cursorTilt = BASE_TILT;
      if (cursorActive) headline.style.removeProperty("font-weight");
    };
    const onTweak = () => { accent = readAccent(); if (reduced) drawStatic(); };

    hero.addEventListener("pointerdown", onDown);
    hero.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    hero.addEventListener("mouseleave", onLeave);
    window.addEventListener("tweakchange", onTweak);

    return () => {
      cancelAnimationFrame(rafId);
      hero.removeEventListener("pointerdown", onDown);
      hero.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      hero.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("tweakchange", onTweak);
      window.removeEventListener("resize", drawStatic);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero viñeta viñeta--oscura" id="hero" data-comp="centrada" data-bar="dark">
      <div className="hero__inner">
        <div className="hero__row">
          <div className="hero__text">
            <p className="eyebrow">Proyectos · Automatización con IA · Estrategia comercial</p>
            <h1 ref={headlineRef} className="headline">
              Pienso en <span className="hl-accent">sistemas</span>
              <br />
              construyo soluciones
            </h1>
            <p className="lead">
              Una década entre comunicación, ventas y liderazgo de equipo — hoy
              volcada en diseñar y automatizar procesos con IA.
            </p>
          </div>
          <div className="hero__accent" aria-hidden="true">
            <canvas ref={canvasRef} className="diamond" />
          </div>
        </div>
      </div>
    </section>
  );
}
