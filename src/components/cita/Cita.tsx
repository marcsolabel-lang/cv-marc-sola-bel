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

type Particle = {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  ti: number; lit: boolean; rot: number; size: number;
};
type Grain = {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  fx: number; fy: number; fz: number;
  size: number; white: boolean;
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
          x: Math.cos(a) * r, y: (Math.random() * 2 - 1) * HY * 1.1, z: Math.sin(a) * r,
          vx: 0, vy: 0, vz: 0,
          ti: i, lit: false,
          rot: Math.random() * 0.5 - 0.25,
          size: t.wsize,
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
        };
      });
    }

    /* ── física ── */
    function tornadoForce(p: { x: number; y: number; z: number }, isSand: boolean): [number, number, number] {
      const T = TORN * (isSand ? 1.25 : 1.0);
      const r = Math.hypot(p.x, p.z) || 1e-4;
      const ux = p.x / r, uz = p.z / r;
      const tx = -uz, tz = ux;
      let ax = 0, ay = 0, az = 0;
      const swirl = (1.6 + 1.5 / (0.28 + r)) * T;
      ax += tx * swirl; az += tz * swirl;
      const yn = (p.y + HY) / (2 * HY);
      const rt = 0.025 + Math.pow(yn, 1.7) * 0.60;
      ax += ux * (rt - r) * 5.5;
      az += uz * (rt - r) * 5.5;
      ay += -p.y * 0.32;
      const core = Math.exp(-(r * r) / 0.04);
      ay += core * 1.0 * T;
      const tanJ = (Math.random() - 0.5) * 1.4 * T;
      ax += tx * tanJ; az += tz * tanJ;
      ay += (Math.random() - 0.5) * 1.8 * T;
      return [ax, ay, az];
    }

    function step(dt: number) {
      const tornado = mode === "tornado";
      for (const p of P) {
        let ax = 0, ay = 0, az = 0;
        if (tornado) {
          [ax, ay, az] = tornadoForce(p, false);
        } else {
          const t = targets[p.ti];
          const ty = t.y + (mode === "ordered" ? Math.sin(performance.now() * 0.0012 + t.bob) * 0.018 : 0);
          ax += (t.x - p.x) * 17.0;
          ay += (ty - p.y) * 17.0;
          az += (t.z - p.z) * 17.0;
        }
        p.vx += ax * dt; p.vy += ay * dt; p.vz += az * dt;
        const damp = tornado ? 0.885 : 0.74;
        p.vx *= damp; p.vy *= damp; p.vz *= damp;
        const sp = Math.hypot(p.vx, p.vy, p.vz), MAXV = tornado ? 6.2 : 6.5;
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
      }
      for (const s of SAND) {
        if (tornado) {
          const [ax, ay, az] = tornadoForce(s, true);
          s.vx += ax * dt; s.vy += ay * dt; s.vz += az * dt;
          s.vx *= 0.88; s.vy *= 0.88; s.vz *= 0.88;
          const sp = Math.hypot(s.vx, s.vy, s.vz);
          if (sp > 6.5) { const k = 6.5 / sp; s.vx *= k; s.vy *= k; s.vz *= k; }
          s.x += s.vx * dt; s.y += s.vy * dt; s.z += s.vz * dt;
          if (s.y > HY) { s.y = HY; if (s.vy > 0) s.vy *= -0.4; }
          if (s.y < -HY) { s.y = -HY; if (s.vy < 0) s.vy *= -0.4; }
        } else {
          s.vx += (s.fx - s.x) * 13 * dt;
          s.vy += (s.fy - s.y) * 13 * dt;
          s.vz += (s.fz - s.z) * 13 * dt;
          s.vx *= 0.7; s.vy *= 0.7; s.vz *= 0.7;
          s.x += s.vx * dt; s.y += s.vy * dt; s.z += s.vz * dt;
        }
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
      /* colchón reducido: el reloj gana presencia entre las cajas */
      const cushion = Math.max(0.02 * Math.min(W, H), 24);
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
    const baseFont = (persp: number, size: number) => Math.max(8, S * 0.072 * persp * size);

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
        ctx.globalAlpha = tornado ? (0.14 + d * 0.5) : (0.40 + d * 0.45);
        const rad = Math.max(0.5, S * 0.0032 * pr.persp * s.size);
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
        ctx.globalAlpha = 0.30 + d * 0.70;
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
      ry += (mode === "tornado" ? 0.22 : 0.10) * dt;
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
        if (entry.intersectionRatio >= 0.5 && !userActed && mode === "tornado") {
          clearTimeout(fallbackT);
          fallbackT = setTimeout(() => { if (!userActed) order(); }, 6000);
        }
      },
      { threshold: [0, 0.5] }
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
    const onTweak = () => {
      accent = readAccent();
      spriteAccent = makeSprite(accent);
      if (reduced) draw();
    };
    window.addEventListener("tweakchange", onTweak);

    /* API para el panel de Tweaks (mismo contrato que el HTML vivo) */
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
      window.removeEventListener("tweakchange", onTweak);
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
      <canvas ref={canvasRef} className="cita__stage" aria-hidden="true" />

      <aside className="side side--l">
        <span className="side__label">El sistema emergente</span>
        <span className="side__text">{renderWords(TEXT_L)}</span>
      </aside>

      <button ref={seedRef} className="seed idle" type="button"
        aria-pressed={false}
        aria-label="Diseñar: alternar entre caos y orden del sistema">
        DISEÑAR
      </button>

      <aside className="side side--r">
        <span className="side__label">La estructura concebida</span>
        <span className="side__text">{renderWords(TEXT_R)}</span>
      </aside>
    </section>
  );
}
