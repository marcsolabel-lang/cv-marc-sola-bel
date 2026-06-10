"use client";

import { useEffect, useRef } from "react";
import "./cita.css";

/* CITA (§6.2 · cerrada) — metáfora portadora: caos → orden.
   Port fiel del HTML vivo: tornado 3D de «sistema» + arena que, al activar
   la semilla "DISEÑAR", viaja a un reloj de arena giratorio. Clicarla ES la
   tesis: diseñar pone orden en el sistema. Encendido acumulativo al hover.
   Añadido de integración: fallback automático (~6s visible sin interacción
   → la forma se ordena sola; doc-A §6.2 pide activador con fallback). */

const TEXT_L = "Se puede dejar que un sistema encuentre su forma, o concebir su estructura desde los cimientos.";
const TEXT_R = "Elijo lo segundo: diseñar antes de construir, pensar el todo antes de la parte.";

declare global {
  interface Window {
    /* contrato de auditoría/depuración del motor (sin UI asociada) */
    __cita?: {
      setIntensity(v: number): void;
      setDensity(v: number): void;
      setAccent(c: string): void;
      order(): void;
      scatter(): void;
      state(): { mode: string; t: number; vMedia: number; rStd: number; healed: number };
    };
  }
}

type Particle = {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  ti: number; lit: boolean; rot: number; size: number;
  /* carácter de tormenta: ritmo orbital propio + fases de ráfaga + kick */
  spin: number; w1: number; w2: number; ph1: number; ph2: number; kickAt: number;
};
type Grain = {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  fx: number; fy: number; fz: number;
  size: number; white: boolean;
  spin: number; w1: number; ph1: number; kickAt: number;
};
type Vortexable = {
  x: number; y: number; z: number;
  spin: number; w1: number; ph1: number; w2?: number; ph2?: number;
};
type Target = { x: number; y: number; z: number; bob: number; wsize: number };
type Sprite = { canvas: HTMLCanvasElement; w: number; h: number; ref: number };

export default function Cita() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const seedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const seed = seedRef.current;
    if (!section || !canvas || !seed) return;
    const ctx = canvas.getContext("2d")!;
    const root = document.documentElement;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    /* ── parámetros del motor (del HTML vivo) ── */
    const CAM = 4.2, HY = 1.18, RAD = 1.0, VY = 1.18, RD = 0.42, RX = -0.22;
    let TORN = 1, DENS = 1.35;          /* defaults aprobados: tornado Media · densidad Densa */
    let accent = readAccent();
    function readAccent() {
      return getComputedStyle(root).getPropertyValue("--terracotta").trim() || "#C0542A";
    }

    let disposed = false;
    let spriteAccent: Sprite | null = null, spriteWhite: Sprite | null = null;
    function makeSprite(color: string): Sprite {
      const ref = 64, pad = 14;
      const c = document.createElement("canvas");
      const g = c.getContext("2d")!;
      const font = `italic 600 ${ref}px "Cormorant Garamond", Georgia, serif`;
      g.font = font;
      const m = g.measureText("sistema");
      const asc = m.actualBoundingBoxAscent || ref * 0.72;
      const desc = m.actualBoundingBoxDescent || ref * 0.30;
      const w = Math.ceil(m.width) + pad * 2;
      const h = Math.ceil(asc + desc) + pad * 2;
      c.width = w; c.height = h;
      g.font = font;
      g.textAlign = "center"; g.textBaseline = "middle";
      g.fillStyle = color;
      g.fillText("sistema", w / 2, h / 2);
      return { canvas: c, w, h, ref };
    }
    function buildSprites() {
      spriteAccent = makeSprite(accent);
      spriteWhite = makeSprite("#FFFFFF");
    }

    let mode: "tornado" | "ordering" | "ordered" = "tornado";
    let orderT: ReturnType<typeof setTimeout> | undefined;
    let ry = 0.5;

    /* ── geometría del reloj de arena ── */
    let targets: Target[] = [];
    function buildTargets() {
      targets = [];
      const levels = [-1, -0.88, -0.76, -0.64, -0.52, -0.40, 0.40, 0.52, 0.64, 0.76, 0.88, 1];
      levels.forEach((ly, li) => {
        const r = Math.abs(ly) * RAD;
        const n = Math.max(4, Math.round(r * 20 * DENS));
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 + li * 0.4;
          const wsize = 0.62 + Math.abs(ly) * 0.5;
          targets.push({ x: Math.cos(a) * r, y: ly, z: Math.sin(a) * r, bob: Math.random() * Math.PI * 2, wsize });
        }
      });
    }

    let P: Particle[] = [];
    let SAND: Grain[] = [];
    function buildParticles() {
      buildTargets();
      P = targets.map((t, i) => {
        const a = Math.random() * Math.PI * 2, r = 0.2 + Math.random() * 1.0;
        return {
          x: Math.cos(a) * r, y: (Math.random() * 2 - 1) * HY, z: Math.sin(a) * r,
          vx: 0, vy: 0, vz: 0,
          ti: i, lit: false,
          rot: Math.random() * 0.5 - 0.25,
          size: t.wsize,
          spin: 0.75 + Math.random() * 0.6,
          w1: 0.6 + Math.random() * 1.1,
          w2: 0.9 + Math.random() * 1.3,
          ph1: Math.random() * Math.PI * 2,
          ph2: Math.random() * Math.PI * 2,
          kickAt: Math.random() * 2,        /* arranque ya tormentoso */
        };
      });
      const sn = Math.round(900 * DENS);
      SAND = Array.from({ length: sn }, () => {
        const tyN = Math.random() * 2 - 1;
        const maxR = Math.abs(tyN) * RAD * 0.96;
        const rr = maxR * Math.sqrt(Math.random());
        const ang = Math.random() * Math.PI * 2;
        const a0 = Math.random() * Math.PI * 2, r0 = 0.1 + Math.random() * 1.0;
        return {
          x: Math.cos(a0) * r0, y: (Math.random() * 2 - 1) * HY, z: Math.sin(a0) * r0,
          vx: 0, vy: 0, vz: 0,
          fx: Math.cos(ang) * rr, fy: tyN * HY, fz: Math.sin(ang) * rr,
          size: 0.5 + Math.random() * 0.55,
          white: Math.random() < 0.12,
          spin: 0.7 + Math.random() * 0.7,
          w1: 0.5 + Math.random() * 1.4,
          ph1: Math.random() * Math.PI * 2,
          kickAt: Math.random() * 2.5,
        };
      });
    }

    /* ── física de TORMENTA (rev. 2026-06-10) ──
       El motor anterior degeneraba: damping por frame (no por segundo,
       doble freno a 120 Hz), pared rígida que asentaba las palabras en
       órbita laminar y turbulencia blanca incapaz de despegarlas. Ahora:
       remolino estratificado (cada palabra a su ritmo), embudo ancho y
       elástico, ráfagas coherentes con oleadas globales y recirculación
       por kicks — el caos se SOSTIENE, no se apaga. */
    let tSim = 0;
    function tornadoForce(p: Vortexable, isSand: boolean, t: number): [number, number, number] {
      const T = TORN * (isSand ? 1.25 : 1.0);
      const r = Math.hypot(p.x, p.z) || 1e-4;
      const ux = p.x / r, uz = p.z / r;
      const tx = -uz, tz = ux;
      let ax = 0, ay = 0, az = 0;
      /* remolino estratificado: capas que se adelantan y atrasan */
      const swirl = (2.6 + 2.2 / (0.3 + r)) * T * p.spin;
      ax += tx * swirl; az += tz * swirl;
      /* embudo ancho de pared elástica: la silueta es media, no jaula.
         yn clampeado: pow(neg, 1.5) = NaN — el bug que perdía palabras
         en silencio (heredado del HTML vivo, seed fuera de rango) */
      const yn = Math.max(0, Math.min(1, (p.y + HY) / (2 * HY)));
      const rt = 0.05 + Math.pow(yn, 1.5) * 0.8;
      ax += ux * (rt - r) * 3.6;
      az += uz * (rt - r) * 3.6;
      /* respiración vertical + tiro ascendente del núcleo */
      ay += -p.y * 0.3;
      const core = Math.exp(-(r * r) / 0.05);
      ay += core * 1.2 * T;
      /* ráfagas coherentes en oleadas: la tormenta viene en olas, no en ruido */
      const G = 1 + 0.55 * Math.sin(t * 0.62) + 0.35 * Math.sin(t * 1.31 + 1.7);
      const gust = 2.4 * T * G;
      const s1 = Math.sin(t * p.w1 + p.ph1);
      const s2 = Math.sin(t * (p.w2 ?? p.w1 * 1.37) + (p.ph2 ?? p.ph1 + 2.1));
      ax += (s1 * tx + s2 * 0.6 * ux) * gust;
      az += (s1 * tz + s2 * 0.6 * uz) * gust;
      ay += Math.cos(t * p.w1 + (p.ph2 ?? p.ph1)) * gust * 0.9;
      return [ax, ay, az];
    }

    /* autocuración: ninguna partícula se pierde jamás — si un cálculo
       degenera (NaN/Inf), se reinyecta a la tormenta y se cuenta */
    let healed = 0;
    const heal = (p: { x: number; y: number; z: number; vx: number; vy: number; vz: number }) => {
      if (Number.isFinite(p.x + p.y + p.z + p.vx + p.vy + p.vz)) return;
      const a = Math.random() * Math.PI * 2, r = 0.3 + Math.random() * 0.8;
      p.x = Math.cos(a) * r; p.y = (Math.random() * 2 - 1) * HY; p.z = Math.sin(a) * r;
      p.vx = 0; p.vy = 0; p.vz = 0;
      healed++;
    };

    function step(dt: number) {
      const tornado = mode === "tornado";
      tSim += dt;
      /* damping normalizado por dt: misma tormenta a 60 y a 120 Hz */
      const kWord = Math.pow(tornado ? 0.885 : 0.74, dt * 60);
      const kSand = Math.pow(tornado ? 0.88 : 0.7, dt * 60);
      for (const p of P) {
        let ax = 0, ay = 0, az = 0;
        if (tornado) {
          /* recirculación: la tormenta escupe la palabra y el vórtice
             la vuelve a tragar — nada se asienta jamás */
          if (tSim > p.kickAt) {
            const a = Math.random() * Math.PI * 2;
            const kick = 2 + Math.random() * 2.5;
            p.vx += Math.cos(a) * kick;
            p.vz += Math.sin(a) * kick;
            p.vy += (Math.random() - 0.5) * 5;
            p.kickAt = tSim + 1.2 + Math.random() * 2.8;
          }
          [ax, ay, az] = tornadoForce(p, false, tSim);
        } else {
          const t = targets[p.ti];
          const ty = t.y + (mode === "ordered" ? Math.sin(performance.now() * 0.0012 + t.bob) * 0.018 : 0);
          ax += (t.x - p.x) * 17.0;
          ay += (ty - p.y) * 17.0;
          az += (t.z - p.z) * 17.0;
        }
        p.vx += ax * dt; p.vy += ay * dt; p.vz += az * dt;
        p.vx *= kWord; p.vy *= kWord; p.vz *= kWord;
        const sp = Math.hypot(p.vx, p.vy, p.vz), MAXV = tornado ? 7.5 : 6.5;
        if (sp > MAXV) { const k = MAXV / sp; p.vx *= k; p.vy *= k; p.vz *= k; }
        p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
        if (p.y > HY) { p.y = HY; if (p.vy > 0) p.vy *= -0.45; }
        if (p.y < -HY) { p.y = -HY; if (p.vy < 0) p.vy *= -0.45; }
        const d = Math.hypot(p.x, p.y, p.z);
        if (d < RD) {
          const nx = p.x / (d || 1e-4), ny = p.y / (d || 1e-4), nz = p.z / (d || 1e-4);
          p.x = nx * RD; p.y = ny * RD; p.z = nz * RD;
          const vn = p.vx * nx + p.vy * ny + p.vz * nz;
          if (vn < 0) { const e = 1.5; p.vx -= e * vn * nx; p.vy -= e * vn * ny; p.vz -= e * vn * nz; }
        }
        heal(p);
      }
      for (const s of SAND) {
        if (tornado) {
          if (tSim > s.kickAt) {
            const a = Math.random() * Math.PI * 2;
            const kick = 1.2 + Math.random() * 1.8;
            s.vx += Math.cos(a) * kick;
            s.vz += Math.sin(a) * kick;
            s.vy += (Math.random() - 0.5) * 3.4;
            s.kickAt = tSim + 1.5 + Math.random() * 3;
          }
          const [ax, ay, az] = tornadoForce(s, true, tSim);
          s.vx += ax * dt; s.vy += ay * dt; s.vz += az * dt;
          s.vx *= kSand; s.vy *= kSand; s.vz *= kSand;
          const sp = Math.hypot(s.vx, s.vy, s.vz);
          if (sp > 7.5) { const k = 7.5 / sp; s.vx *= k; s.vy *= k; s.vz *= k; }
          s.x += s.vx * dt; s.y += s.vy * dt; s.z += s.vz * dt;
          if (s.y > HY) { s.y = HY; if (s.vy > 0) s.vy *= -0.4; }
          if (s.y < -HY) { s.y = -HY; if (s.vy < 0) s.vy *= -0.4; }
        } else {
          s.vx += (s.fx - s.x) * 13 * dt;
          s.vy += (s.fy - s.y) * 13 * dt;
          s.vz += (s.fz - s.z) * 13 * dt;
          s.vx *= kSand; s.vy *= kSand; s.vz *= kSand;
          s.x += s.vx * dt; s.y += s.vy * dt; s.z += s.vz * dt;
        }
        heal(s);
      }
      if (mode === "ordering") {
        let maxd = 0;
        for (const p of P) {
          const t = targets[p.ti];
          maxd = Math.max(maxd, Math.hypot(t.x - p.x, t.y - p.y, t.z - p.z));
        }
        if (maxd < 0.06) mode = "ordered";
      }
    }

    /* ── proyección + dibujo ── */
    let W = 0, H = 0, S = 1, cx = 0, cy = 0;
    const resize = () => {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
      /* colchón mínimo: el conjunto pesa en el escenario */
      const cushion = Math.max(0.015 * Math.min(W, H), 20);
      const pe = CAM / (CAM - RAD);
      S = Math.min((W / 2 - cushion) / (RAD * pe), (H / 2 - cushion) / (HY * VY * pe));
      cx = W / 2; cy = H / 2;
    };
    function project(x: number, y: number, z: number) {
      const cyaw = Math.cos(ry), syaw = Math.sin(ry);
      const X = x * cyaw + z * syaw;
      const Z = -x * syaw + z * cyaw;
      const Y = y * VY;
      const cp = Math.cos(RX), sp = Math.sin(RX);
      const Y2 = Y * cp - Z * sp;
      const Z2 = Y * sp + Z * cp;
      const persp = CAM / (CAM - Z2);
      return { sx: cx + X * persp * S, sy: cy - Y2 * persp * S, depth: Z2, persp };
    }
    /* masa de la palabra: el conjunto tornado/reloj pesa (DISEÑAR no cambia) */
    const baseFont = (persp: number, size: number) => Math.max(9, S * 0.082 * persp * size);

    let mx = -1e4, my = -1e4;
    function draw() {
      if (!spriteAccent || !spriteWhite) return;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const tornado = mode === "tornado";

      let curColor = accent; ctx.fillStyle = accent;
      for (let i = 0; i < SAND.length; i++) {
        const s = SAND[i], pr = project(s.x, s.y, s.z);
        if (!isFinite(pr.sx) || pr.depth >= CAM - 0.2) continue;
        if (pr.sx < -20 || pr.sx > W + 20 || pr.sy < -20 || pr.sy > H + 20) continue;
        const d = (pr.depth + 1) / 2;
        const col = s.white ? "#FFFFFF" : accent;
        if (col !== curColor) { ctx.fillStyle = col; curColor = col; }
        ctx.globalAlpha = tornado ? (0.18 + d * 0.55) : (0.44 + d * 0.45);
        const rad = Math.max(0.6, S * 0.0039 * pr.persp * s.size);
        ctx.fillRect(pr.sx - rad, pr.sy - rad, rad * 2, rad * 2);
      }

      const arr: { p: Particle; sx: number; sy: number; depth: number; persp: number }[] = [];
      for (let i = 0; i < P.length; i++) {
        const p = P[i], pr = project(p.x, p.y, p.z);
        if (!isFinite(pr.sx) || pr.depth >= CAM - 0.2) continue;
        arr.push({ p, sx: pr.sx, sy: pr.sy, depth: pr.depth, persp: pr.persp });
      }
      arr.sort((a, b) => a.depth - b.depth);

      /* hover: la palabra más cercana al cursor se enciende y SE QUEDA */
      if (mx > -1e3) {
        for (let i = arr.length - 1; i >= 0; i--) {
          const it = arr[i], fs = baseFont(it.persp, it.p.size);
          if (Math.abs(mx - it.sx) < fs * 2.0 && Math.abs(my - it.sy) < fs * 0.62) { it.p.lit = true; break; }
        }
      }

      for (const it of arr) {
        if (it.sx < -60 || it.sx > W + 60 || it.sy < -60 || it.sy > H + 60) continue;
        const d = (it.depth + 1) / 2, fs = baseFont(it.persp, it.p.size);
        const spr = it.p.lit ? spriteWhite : spriteAccent;
        const sc = fs / spr.ref;
        ctx.globalAlpha = 0.38 + d * 0.62;
        ctx.save();
        ctx.translate(it.sx, it.sy);
        ctx.rotate(it.p.rot * (tornado ? 1 : 0.5));
        ctx.drawImage(spr.canvas, -spr.w * sc / 2, -spr.h * sc / 2, spr.w * sc, spr.h * sc);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }

    /* bucle pausable: solo corre con la sección en viewport (§5 rendimiento);
       en reduced-motion no hay bucle — estado final quieto, pintado a demanda */
    let rafId = 0;
    let running = false;
    let last = performance.now();
    function loop(now: number) {
      if (!running || disposed) return;
      const dt = Math.min((now - last) / 1000, 0.05); last = now;
      ry += (mode === "tornado" ? 0.26 : 0.10) * dt;
      step(dt);
      draw();
      rafId = requestAnimationFrame(loop);
    }
    let inViewport = false;
    const startLoop = () => {
      if (running || reduced || disposed || !started || !inViewport) return;
      running = true; last = performance.now();
      rafId = requestAnimationFrame(loop);
    };
    const stopLoop = () => { running = false; cancelAnimationFrame(rafId); };

    /* ── activador "DISEÑAR" + fallback ── */
    let userActed = false;
    let fallbackT: ReturnType<typeof setTimeout> | undefined;
    const order = () => {
      if (mode === "ordering" || mode === "ordered") return;
      mode = "ordering";
      seed.classList.remove("idle"); seed.classList.add("placed");
      seed.setAttribute("aria-pressed", "true");
      clearTimeout(orderT);
      orderT = setTimeout(() => { if (mode === "ordering") mode = "ordered"; }, 1500);
    };
    const scatter = () => {
      mode = "tornado";
      seed.classList.add("idle"); seed.classList.remove("placed");
      seed.setAttribute("aria-pressed", "false");
      for (const p of P) {
        p.vx += (Math.random() - 0.5) * 3;
        p.vy += (Math.random() - 0.5) * 3;
        p.vz += (Math.random() - 0.5) * 3;
      }
    };
    const onSeed = () => {
      userActed = true;
      clearTimeout(fallbackT);
      if (mode === "tornado") order(); else scatter();
    };
    seed.addEventListener("click", onSeed);

    /* visibilidad: pausa el motor totalmente fuera de viewport y arma el
       fallback (visible sin interacción → la forma se ordena sola) */
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (!entry.isIntersecting) {
          stopLoop();
          clearTimeout(fallbackT);
          return;
        }
        startLoop();
        if (entry.intersectionRatio >= 0.35 && !userActed && mode === "tornado") {
          clearTimeout(fallbackT);
          /* 9 s de tormenta antes de ordenarse sola: el teatro también es tesis */
          fallbackT = setTimeout(() => { if (!userActed) order(); }, 9000);
        }
      },
      { threshold: [0, 0.35] }
    );
    io.observe(section);

    const onPointerMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      mx = e.clientX - b.left; my = e.clientY - b.top;
    };
    const onPointerLeave = () => { mx = my = -1e4; };
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const onResize = () => { resize(); if (reduced) draw(); };
    window.addEventListener("resize", onResize);

    /* contrato de auditoría/depuración del motor (el panel de Tweaks
       fue retirado; los parámetros vigentes son los consagrados) */
    window.__cita = {
      setIntensity(v: number) { TORN = v; },
      setDensity(v: number) {
        if (v === DENS) return;
        DENS = v; buildParticles();
        if (mode !== "tornado") {
          mode = "tornado";
          seed.classList.add("idle"); seed.classList.remove("placed");
        }
      },
      setAccent(c: string) { accent = c; spriteAccent = makeSprite(c); },
      order, scatter,
      /* métricas de tormenta (verificación: el caos no debe decaer) */
      state() {
        const n = P.length || 1;
        let vm = 0, rm = 0;
        for (const p of P) { vm += Math.hypot(p.vx, p.vy, p.vz); rm += Math.hypot(p.x, p.z); }
        vm /= n; rm /= n;
        let rv = 0;
        for (const p of P) { const d = Math.hypot(p.x, p.z) - rm; rv += d * d; }
        return {
          mode,
          t: Math.round(tSim * 10) / 10,
          vMedia: +vm.toFixed(3),
          rStd: +Math.sqrt(rv / n).toFixed(3),
          healed,
        };
      },
    };

    /* arranque: espera la fuente (los sprites miden texto con Cormorant) */
    let started = false;
    const start = () => {
      if (started || disposed) return; started = true;
      resize(); buildSprites(); buildParticles();
      if (reduced) {
        /* §5: estados finales visibles y QUIETOS — forma completa, sin giro */
        mode = "ordered";
        seed.classList.remove("idle"); seed.classList.add("placed");
        seed.setAttribute("aria-pressed", "true");
        for (const p of P) { const t = targets[p.ti]; p.x = t.x; p.y = t.y; p.z = t.z; }
        for (const g of SAND) { g.x = g.fx; g.y = g.fy; g.z = g.fz; }
        draw();
        return;
      }
      startLoop();
    };
    const startT = setTimeout(start, 1500);
    if (document.fonts?.ready) document.fonts.ready.then(start);
    else start();
    /* la cara italic 600 no la usa ningún nodo del DOM: fonts.ready no la
       espera. Se carga explícitamente y se re-rasterizan los sprites para
       que «sistema» nunca quede congelada en la serif de fallback. */
    document.fonts
      ?.load?.('italic 600 64px "Cormorant Garamond"')
      .then(() => {
        if (disposed) return;
        if (started) { buildSprites(); if (reduced) draw(); }
      })
      .catch(() => {});

    return () => {
      disposed = true;
      stopLoop();
      clearTimeout(orderT); clearTimeout(fallbackT); clearTimeout(startT);
      io.disconnect();
      seed.removeEventListener("click", onSeed);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      delete window.__cita;
    };
  }, []);

  /* los spans no llevan espacios textuales (el ritmo lo da el margin del
     vivo): el texto íntegro va en un nodo sr-only y el juego de palabras
     queda oculto a lectores de pantalla */
  const renderWords = (text: string) => (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((w, i) => (
          <span
            key={i}
            className="w"
            onMouseEnter={(e) => e.currentTarget.classList.toggle("lit-t")}
          >
            {w}
          </span>
        ))}
      </span>
    </>
  );

  return (
    <section ref={sectionRef} className="cita viñeta viñeta--oscura" id="cita" data-bar="dark" aria-label="Cita: diseñar antes de construir">
      {/* el escenario de la tormenta: en escritorio cubre la sección;
          en móvil es una pantalla casi completa propia y las cajas
          pasan a leerse debajo, sin robarle espacio */}
      <div className="cita__escenario">
        <canvas ref={canvasRef} className="cita__stage" aria-hidden="true" />
        <button ref={seedRef} className="seed idle" type="button"
          aria-pressed={false}
          aria-label="Diseñar: alternar entre caos y orden del sistema">
          DISEÑAR
        </button>
      </div>

      <aside className="side side--l">
        <span className="side__label">El sistema emergente</span>
        <span className="side__text">{renderWords(TEXT_L)}</span>
      </aside>

      <aside className="side side--r">
        <span className="side__label">La estructura concebida</span>
        <span className="side__text">{renderWords(TEXT_R)}</span>
      </aside>
    </section>
  );
}
