"use client";

import { useEffect, useRef, useState } from "react";
import "./vinetas.css";

/* CROWN PLANNER (§6.7 · PICO · clímax) — metáfora: el sistema FUNCIONANDO.
   La prueba no es abstracta: carrusel de slides (un concepto por slide,
   affordance horizontal clara) + zoom-lupa localizado sobre la captura.
   Capturas y Excel los prepara Marc (datos 100% ficticios): hasta entonces,
   PLACEHOLDERS claros que ya demuestran la mecánica de la lupa. */

type Slide = {
  kicker: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  shot?: boolean;
  final?: boolean;
};

const SLIDES: Slide[] = [
  {
    kicker: "El problema",
    title: "La asignación de órdenes se hacía a mano.",
    text: "Dependía del criterio del coordinador y el desequilibrio de carga no se veía hasta que daba problemas.",
    shot: true,
  },
  {
    kicker: "La solución",
    title: "El sistema distribuye automáticamente las órdenes del día.",
    text: "Lee el informe del ERP, propone una asignación equilibrada, marca los casos sin cobertura y prepara el aviso.",
    shot: true,
  },
  {
    kicker: "Mecánica 1",
    title: "Score dinámico según el perfil del técnico.",
    shot: true,
  },
  {
    kicker: "Mecánica 2",
    title: "Ponderación por proximidad, antigüedad y carga.",
    shot: true,
  },
  {
    kicker: "Mecánica 3",
    title: "Detección de saturación por zona y aviso de casos sin cobertura.",
    shot: true,
  },
  {
    kicker: "Mecánica 4",
    title: "Lee el Excel del ERP y recuerda el mapeo de columnas entre sesiones.",
    shot: true,
  },
  {
    kicker: "La prueba",
    title: "Diseñado y construido en solitario, sin ser programador.",
    text: (
      <>
        Diseñé la lógica y la materialicé orquestando{" "}
        <span className="fire">IA</span> (Claude, entre otras) sobre datos en
        Excel. Prototipo funcional de principio a fin: detectar un problema
        operativo, diseñar el sistema que lo resuelve y construirlo con las
        herramientas disponibles, sin esperar a que alguien lo programe.
      </>
    ),
    final: true,
  },
];

/* Placeholder de captura con lente de zoom localizado (§5).
   Cuando lleguen las capturas reales, el mismo dispositivo sirve:
   se sustituye el patrón por la imagen y la lente la amplía 2x. */
function Shot({ onOpen }: { onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current, lens = lensRef.current;
    if (!el || !lens) return;
    const b = el.getBoundingClientRect();
    const x = e.clientX - b.left, y = e.clientY - b.top;
    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;
    /* el contenido de la lente: mismo patrón a 2x, anclado al cursor */
    lens.style.backgroundPosition = `${84 - x * 2}px ${84 - y * 2}px`;
  };

  return (
    <div
      ref={ref}
      className="crown__shot"
      onPointerMove={onMove}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
      aria-label="Ampliar captura (pendiente: datos ficticios)"
    >
      <div className="crown__shot-label" aria-hidden="true">
        <svg viewBox="0 0 32 32">
          <rect x="3" y="5" width="26" height="22" />
          <path d="M3 11 H29 M9 11 V27 M9 17 H29 M9 22 H29" />
          <circle cx="6" cy="8" r="0.8" />
        </svg>
        <small>Captura del Crown Planner — pendiente · datos 100% ficticios</small>
      </div>
      <div
        ref={lensRef}
        className="crown__lens"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(192,84,42,0.12) 0 2px, transparent 2px 44px), repeating-linear-gradient(90deg, rgba(192,84,42,0.12) 0 2px, transparent 2px 44px)",
          backgroundColor: "#101010",
        }}
      />
    </div>
  );
}

export default function CrownPlanner() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState(false);

  /* slide activo según scroll del carrusel (sin listeners de scroll:
     cada slide se observa dentro del propio track) */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(slides.indexOf(e.target));
        }
      },
      { root: track, threshold: 0.6 }
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!viewer) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setViewer(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [viewer]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[Math.max(0, Math.min(SLIDES.length - 1, i))] as HTMLElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section className="viñeta viñeta--oscura" id="proyecto" data-bar="dark">
      <div className="viñeta__inner">
        <p className="sect-label">Proyecto destacado</p>
        <header className="crown__head">
          <h2 className="crown__title">
            Crown Planner — Sistema de asignación inteligente de órdenes de
            servicio.
          </h2>
          <p className="crown__sub">Prototipo conceptual, diseñado y construido en solitario.</p>
        </header>

        <div className="crown__carousel" role="group" aria-roledescription="carrusel" aria-label="Crown Planner, recorrido en 7 slides">
          <div ref={trackRef} className="crown__track">
            {SLIDES.map((s, i) => (
              <article
                key={i}
                className={`crown__slide ${s.final ? "crown__slide--final" : ""}`}
                aria-label={`${i + 1} de ${SLIDES.length}`}
              >
                <div className="crown__slide-head">
                  <span className="crown__slide-kicker">{s.kicker}</span>
                  <h3 className="crown__slide-title">{s.title}</h3>
                </div>
                <div className="crown__slide-body">
                  {s.shot && <Shot onOpen={() => setViewer(true)} />}
                  <div>
                    {s.text && <p className="crown__slide-text">{s.text}</p>}
                    {s.final && (
                      <div className="crown__ctas">
                        <span className="crown__cta crown__demo">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M5 12 H19 M13 6 L19 12 L13 18" />
                          </svg>
                          Probar la demo
                          <i>Próximamente</i>
                        </span>
                        <span className="crown__cta">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="4" y="3" width="16" height="18" />
                            <path d="M8 8 L12 13 M12 8 L8 13 M14 8 H17 M14 12 H17 M8 17 H17" />
                          </svg>
                          Excel de ejemplo
                          <i>Pendiente · datos ficticios</i>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="crown__nav">
            <button
              className="crown__arrow"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Slide anterior"
            >
              ←
            </button>
            <button
              className="crown__arrow"
              onClick={() => goTo(active + 1)}
              disabled={active === SLIDES.length - 1}
              aria-label="Slide siguiente"
            >
              →
            </button>
            <div className="crown__dots" role="tablist" aria-label="Progreso del carrusel">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className="crown__dot"
                  aria-current={active === i}
                  aria-label={`Ir al slide ${i + 1}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {viewer && (
        <div className="crown__viewer" role="dialog" aria-modal="true" aria-label="Captura ampliada" onClick={() => setViewer(false)}>
          <button className="crown__viewer-close" aria-label="Cerrar" onClick={() => setViewer(false)}>✕</button>
          <div className="crown__shot" style={{ cursor: "default" }} onClick={(e) => e.stopPropagation()}>
            <div className="crown__shot-label">
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <rect x="3" y="5" width="26" height="22" />
                <path d="M3 11 H29 M9 11 V27 M9 17 H29 M9 22 H29" />
              </svg>
              <small>Captura del Crown Planner — pendiente · datos 100% ficticios</small>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
