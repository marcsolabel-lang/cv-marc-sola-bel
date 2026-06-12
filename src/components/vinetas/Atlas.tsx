"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./atlas.css";

/* ATLAS (§6.7 · PICO · clímax) — metáfora: el sistema FUNCIONANDO.
   Port fiel del HTML vivo aprobado en Design (Atlas standalone): carrusel
   cinematográfico de 6 pantallas reales de la demo (datos 100% INVENTADOS),
   enmarcadas como un monitor de torre de control; la lupa deja inspeccionar
   la inteligencia del motor. Las capturas viven en /public/atlas (mismo set
   verificado del handoff: 0 fugas, datos ficticios). Tweaks/host de Design
   eliminados; tokens y fuentes (Bricolage·Oswald) reutilizados de globals. */

type Slide = {
  n: string;
  module: string;
  kick: string;
  title: { pre: string; accent: string; post: string };
  lead: string;
  more: string;
  chips: [string, string][];
  desk: string;
  mob: string;
  url: string;
  lens?: { x: number; y: number; label: string };
  cta?: { label: string; href: string };
};

const SLIDES: Slide[] = [
  {
    n: "01",
    module: "Inicio · Modo noche",
    kick: "El producto",
    title: { pre: "Una torre de control ", accent: "real", post: ", en uso" },
    lead: "Atlas (Crown Planner) es un optimizador de servicio técnico de verdad. Lo concebí y construí con IA, desde un perfil comercial, no de ingeniería.",
    more: "No es una maqueta de portfolio: es la herramienta que organiza el día del equipo técnico. Modo noche, datos densos, cuatro módulos operativos.",
    /* coherencia con las capturas (auditoría 2026-06-12): la cartera visible
       en la demo es de 1.479 máquinas — el chip no puede decir otra cifra */
    chips: [["En uso", "estado"], ["~1.500", "máquinas en cartera"], ["4", "módulos"]],
    desk: "/atlas/1-home-desktop.png",
    mob: "/atlas/1-home-movil.png",
    url: "crownplannerwebapp.vercel.app",
  },
  {
    n: "02",
    module: "Motor Atlas · Resultados",
    kick: "Por qué importa",
    title: { pre: "Menos desequilibrio, menos ", accent: "kilómetros", post: ", menos picos" },
    lead: "Validado en simulador sobre ~1.500 máquinas: el motor reparte la carga del servicio y mejora cada métrica frente a la asignación manual.",
    more: "Antes, el reparto dependía del criterio del coordinador y el desequilibrio no se veía hasta que daba problemas. Con Atlas, el CoV de carga baja de 0.55 a 0.39.",
    chips: [["−28%", "CoV carga"], ["−38%", "km medios"], ["−47%", "carga pico"]],
    desk: "/atlas/2-kpis-desktop.png",
    mob: "/atlas/2-kpis-movil.png",
    url: "crownplannerwebapp.vercel.app",
  },
  {
    n: "03",
    module: "Asignación CAT · El solver",
    kick: "La inteligencia",
    title: { pre: "Cuatro reglas compiten y, aun así, ", accent: "equilibra", post: "" },
    lead: "Un solver GAP decide capa a capa: especialista, batería, cuenta fija y cupo. Trilateral → A. Ferrer (único TSP). Cuenta Almacenes Drassana → M. Pons (residente).",
    more: "Tres fases con búsqueda local move+swap empujan el coeficiente de variación hacia cero: 0.55 → 0.39, con 0 % de máquinas sin cobertura.",
    chips: [["4 capas", "del GAP"], ["0.55→0.39", "equilibrio"], ["0%", "sin cobertura"]],
    desk: "/atlas/3-cat-desktop.png",
    mob: "/atlas/3-cat-movil.png",
    url: "crownplannerwebapp.vercel.app",
    lens: { x: 0.5, y: 0.49, label: "Pasa la lupa por «cómo decidió el motor»" },
  },
  {
    n: "04",
    module: "Planificación Diaria · Motor real",
    kick: "Y es real",
    title: { pre: "Un clic y el ", accent: "motor real", post: " reparte el día" },
    lead: "«Ejecutar demo» corre el motor de verdad: lee el Excel del ERP, asigna por habilidad (OR-1042 → A. Ferrer, único TSP en zona) y equilibra la carga 0.55 → 0.40.",
    more: "Sin programar una línea: diseñé la lógica y la materialicé orquestando IA sobre datos en Excel. Un prototipo funcional de principio a fin.",
    chips: [["1 clic", "sin archivos"], ["14/15", "auto-asignadas"], ["0.55→0.40", "equilibrio"]],
    desk: "/atlas/4-diaria-desktop.png",
    mob: "/atlas/4-diaria-movil.png",
    url: "crownplannerwebapp.vercel.app",
    lens: { x: 0.5, y: 0.27, label: "Pasa la lupa por «cómo decidió el motor»" },
  },
  {
    n: "05",
    module: "Mapa de rutas · Escala",
    kick: "La escala",
    title: { pre: "Cinco zonas, una ", accent: "geografía real", post: "" },
    lead: "Las órdenes caen sobre el mapa: cada técnico, su territorio. La optimización no es abstracta: rutea sobre kilómetros reales, del Vallès al Alt Segre.",
    more: "La vista nocturna hace tangible el alcance: el −38 % en kilómetros se lee aquí como rutas más cortas y zonas mejor cubiertas.",
    chips: [["5", "zonas"], ["−38%", "km en ruta"]],
    desk: "/atlas/5-mapa-desktop.png",
    mob: "/atlas/5-mapa-movil.png",
    url: "crownplannerwebapp.vercel.app",
  },
  {
    n: "06",
    module: "⌘K · Pruébalo",
    kick: "Tu turno",
    title: { pre: "Compruébalo tú mismo, ", accent: "en un clic", post: "" },
    lead: "Todo lo que has visto está en vivo, con datos 100 % ficticios. Abre la demo, pulsa «Ejecutar demo» y mira al motor optimizar en tiempo real.",
    more: "Sin registro ni PIN. Cinco técnicos, cinco zonas, órdenes inventadas: confidencialidad garantizada.",
    chips: [],
    desk: "/atlas/6-command-desktop.png",
    mob: "/atlas/6-command-movil.png",
    url: "crownplannerwebapp.vercel.app",
    cta: { label: "Probar Atlas en vivo", href: "https://crownplannerwebapp.vercel.app/" },
  },
];

/* ── Lupa-magnificador: lee el contexto del panel del motor (zoom contenido) ── */
const ZOOM = 1.6;
const LENS = 260;
const DEPTH = {
  enter: (d: number) => `translateX(${d * 7}%) translateZ(220px) scale(1.06)`,
  leave: (d: number) => `translateX(${-d * 7}%) translateZ(-300px) scale(.86)`,
  active: "translateX(0) translateZ(0) scale(1)",
};

function lensMove(e: React.MouseEvent<HTMLDivElement>) {
  const view = e.currentTarget;
  const screen = view.closest<HTMLElement>(".screen");
  const lens = view.querySelector<HTMLElement>(".lens");
  if (!screen || !lens) return;
  if (!window.matchMedia("(pointer: fine)").matches || getComputedStyle(screen).display === "none") return;
  const r = view.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  if (x < 0 || y < 0 || x > r.width || y > r.height) {
    lens.style.opacity = "0";
    screen.classList.remove("zooming");
    return;
  }
  lens.style.opacity = "1";
  screen.classList.add("zooming");
  lens.style.backgroundSize = `${r.width * ZOOM}px ${r.height * ZOOM}px`;
  lens.style.backgroundPosition = `${-((x / r.width) * r.width * ZOOM - LENS / 2)}px ${-((y / r.height) * r.height * ZOOM - LENS / 2)}px`;
  const lx = Math.max(0, Math.min(r.width - LENS, x - LENS / 2));
  const ly = Math.max(0, Math.min(r.height - LENS, y - LENS / 2));
  lens.style.transform = `translate(${lx}px, ${ly}px)`;
}

function lensLeave(e: React.MouseEvent<HTMLDivElement>) {
  const view = e.currentTarget;
  const screen = view.closest<HTMLElement>(".screen");
  const lens = view.querySelector<HTMLElement>(".lens");
  if (lens) lens.style.opacity = "0";
  if (screen) screen.classList.remove("zooming");
}

export default function Atlas() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<(HTMLElement | null)[]>([]);
  const currentRef = useRef(0);
  const animatingRef = useRef(false);
  const inViewRef = useRef(false);
  const [current, setCurrent] = useState(0);

  /* estado inicial: la primera pantalla descansa visible (a prueba de
     congelación: si el reloj de animación se pausa, nunca queda en negro) */
  useEffect(() => {
    const first = slidesRef.current[0];
    if (first) {
      first.classList.add("is-in");
      first.style.transform = DEPTH.active;
    }
  }, []);

  /* transición de profundidad a nivel de slide (el texto viaja con ella) */
  const go = useCallback((raw: number) => {
    const target = Math.max(0, Math.min(SLIDES.length - 1, raw));
    const from = currentRef.current;
    const cur = slidesRef.current[from];
    const nxt = slidesRef.current[target];
    if (target === from || animatingRef.current || !cur || !nxt) return;
    const dir = target > from ? 1 : -1;
    animatingRef.current = true;
    currentRef.current = target;
    setCurrent(target);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      cur.classList.remove("is-in");
      cur.style.opacity = "0";
      nxt.classList.add("is-in");
      nxt.style.opacity = "1";
      nxt.style.transform = DEPTH.active;
      animatingRef.current = false;
      return;
    }

    nxt.classList.add("is-in");
    nxt.style.transition = "none";
    nxt.style.opacity = "0";
    nxt.style.transform = DEPTH.enter(dir);
    void nxt.offsetWidth; // reflow

    nxt.style.transition = "";
    nxt.style.opacity = "1";
    nxt.style.transform = DEPTH.active;
    cur.style.transition = "";
    cur.style.opacity = "0";
    cur.style.transform = DEPTH.leave(dir);

    window.setTimeout(() => {
      cur.style.transition = "none";
      nxt.style.transition = "none";
      cur.classList.remove("is-in");
      cur.style.opacity = "";
      cur.style.transform = "";
      nxt.style.opacity = "";
      nxt.style.transform = "";
      void nxt.offsetWidth;
      cur.style.transition = "";
      nxt.style.transition = "";
      animatingRef.current = false;
    }, 640);
  }, []);

  /* teclado (solo cuando la viñeta está en pantalla — no secuestra ↑↓ ni el
     resto del CV) */
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const io = new IntersectionObserver(([e]) => { inViewRef.current = e.isIntersecting; }, { threshold: 0.5 });
    io.observe(sec);
    const onKey = (e: KeyboardEvent) => {
      if (!inViewRef.current) return;
      if (e.key === "ArrowRight") go(currentRef.current + 1);
      else if (e.key === "ArrowLeft") go(currentRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => { io.disconnect(); window.removeEventListener("keydown", onKey); };
  }, [go]);

  /* swipe horizontal claro (deja pasar el scroll vertical del móvil) */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let sx = 0, sy = 0, tracking = false;
    const ts = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true;
    };
    const te = (e: TouchEvent) => {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6) {
        go(currentRef.current + (dx < 0 ? 1 : -1));
      }
    };
    stage.addEventListener("touchstart", ts, { passive: true });
    stage.addEventListener("touchend", te, { passive: true });
    return () => { stage.removeEventListener("touchstart", ts); stage.removeEventListener("touchend", te); };
  }, [go]);

  const cur = SLIDES[current];

  return (
    <section
      ref={sectionRef}
      className="atlas"
      id="proyecto"
      data-bar="dark"
      aria-labelledby="atlas-h"
    >
      <h2 id="atlas-h" className="sr-only">Proyecto destacado: Atlas (Crown Planner)</h2>
      <div
        className="atlas__ambient"
        aria-hidden="true"
        style={{ "--shift": `${(current / (SLIDES.length - 1)) * 100}%` } as React.CSSProperties}
      />
      <div className="atlas__vignette" aria-hidden="true" />

      <div className="stage" ref={stageRef} aria-label="Carrusel de la demo Atlas">
        {SLIDES.map((s, i) => (
          <article
            key={s.n}
            className="slide"
            data-i={i}
            ref={(el) => { slidesRef.current[i] = el; }}
          >
            <div className="slide__text">
              <span className="slide__ghost" aria-hidden="true">{s.n}</span>
              <p className="kick">
                <i className="live" aria-hidden="true" /> Atlas · Crown Planner <em>{s.n} / 06</em>
              </p>
              <p className="module">{s.module}</p>
              <h3 className="title">
                {s.title.pre}
                <span className="ac">{s.title.accent}</span>
                {s.title.post}
              </h3>
              <p className="lead">{s.lead}</p>
              <p className="more">{s.more}</p>
              {s.chips.length > 0 && (
                <div className="chips">
                  {s.chips.map(([v, l]) => (
                    <div className="chip" key={l}>
                      <b>{v}</b>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              )}
              {s.cta && (
                <a className="cta" href={s.cta.href} target="_blank" rel="noopener noreferrer">
                  <span>{s.cta.label}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
                </a>
              )}
            </div>

            <div className="slide__media">
              <figure className="screen">
                <div className="screen__bar">
                  <span className="screen__os"><i /><i /><i /></span>
                  <span className="screen__url">{s.url}</span>
                  <span className="screen__live"><i /> EN VIVO</span>
                </div>
                <div className="screen__view" onMouseMove={lensMove} onMouseLeave={lensLeave}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="screen__img"
                    src={s.desk}
                    alt={s.module}
                    draggable={false}
                    loading={i === 0 ? undefined : "lazy"}
                  />
                  <div className="lens" aria-hidden="true" style={{ backgroundImage: `url("${s.desk}")` }} />
                  {s.lens && (
                    <div className="lenshint" style={{ left: `${s.lens.x * 100}%`, top: `${s.lens.y * 100}%` }}>
                      <span className="lenshint__ring" />
                      <span className="lenshint__pill">{s.lens.label}</span>
                    </div>
                  )}
                </div>
              </figure>

              <div className="phone">
                <div className="phone__notch" />
                <div className="phone__scroll">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.mob} alt={`${s.module} (móvil)`} draggable={false} loading="lazy" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button className="nav nav--prev" type="button" aria-label="Pantalla anterior" onClick={() => go(currentRef.current - 1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <button className="nav nav--next" type="button" aria-label="Pantalla siguiente" onClick={() => go(currentRef.current + 1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="hud">
        <div className="hud__meta">
          <span className="hud__n">{cur.n}</span>
          <span className="hud__sep">·</span>
          <span className="hud__m">{cur.module}</span>
        </div>
        <div className="dots" role="tablist" aria-label="Pantallas">
          {SLIDES.map((s, i) => (
            <button
              key={s.n}
              className={`dot ${i === current ? "on" : ""}`}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Ir a la pantalla ${s.n}: ${s.module}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        {/* confidencialidad enunciada (rev. 2026-06-12): la demo es pública
            y todo dato visible es inventado — sin información de la empresa */}
        <p className="hud__aviso">
          Demo pública con datos 100&nbsp;% ficticios; ninguna información real
          de la empresa.
        </p>
      </div>
    </section>
  );
}
