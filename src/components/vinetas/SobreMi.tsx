"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GLIFOS } from "../glifos";
import "./sobremi.css";

/* SOBRE MÍ (§6.3 · credibilidad) — RETRATO + ENTRAMADO NEURONAL.
   Port del HTML vivo de Design (design_handoff_sobre_mi, 2026-06-12):
   el retrato (placa con offset terracota) es el soma del que desciende
   la red — cada nodo-rombo una etapa, cada conexión aprendizaje que se
   transfiere — y culmina en «Pienso en sistemas.».

   Reglas de ingeniería del handoff:
   · El servidor SIEMPRE manda el estado final (fase "reposo"): sin JS,
     impresión y reduced-motion ven la sección completa.
   · JS arma los estados ocultos al montar (.is-anim), dispara la entrada
     por IntersectionObserver (threshold .25) con garantía setTimeout
     1.7s, y ~3s después «asienta»: retira .is-anim y enciende .alive
     (deriva de nodos + respiración de neuronas; los pulsos son SMIL).
   · Parallax solo con puntero fino y sin reduced-motion: variables
     --mx/--my sobre .rail, transform puro. */

type Fase = "reposo" | "armada" | "play";

export default function SobreMi() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [fase, setFase] = useState<Fase>("reposo");
  const [alive, setAlive] = useState(false);

  /* entrada: armar → play (observer o timeout) → settle */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setFase("armada");
    let settleT = 0;
    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      /* doble rAF: el estado armado pinta al menos un frame antes de
         transicionar (recarga con la sección ya en viewport incluida) */
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setFase("play");
          settleT = window.setTimeout(() => {
            setFase("reposo");
            setAlive(true);
          }, 3000);
        })
      );
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            trigger();
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(section);
    const failT = window.setTimeout(trigger, 1700); // garantía anti-bloqueo
    return () => {
      io.disconnect();
      clearTimeout(failT);
      clearTimeout(settleT);
    };
  }, []);

  /* parallax sutil (solo puntero fino) — transform únicamente */
  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e: PointerEvent) => {
      const r = rail.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const mx = Math.max(-1, Math.min(1, (e.clientX - cx) / r.width));
      const my = Math.max(-1, Math.min(1, (e.clientY - cy) / r.height));
      rail.style.setProperty("--mx", mx.toFixed(3));
      rail.style.setProperty("--my", my.toFixed(3));
    };
    const leave = () => {
      rail.style.setProperty("--mx", "0");
      rail.style.setProperty("--my", "0");
    };
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, []);

  const estado =
    (fase !== "reposo" ? " is-anim" : "") +
    (fase === "play" ? " play" : "") +
    (alive ? " alive" : "");

  return (
    <section
      ref={sectionRef}
      className={`viñeta viñeta--clara sobremi${estado}`}
      id="sobre-mi"
      data-bar="light"
    >
      <div className="viñeta__inner">
        <div className="sobremi-grid">
          {/* ══ RAIL: retrato (soma) + entramado neuronal ══ */}
          <div ref={railRef} className="rail">
            <figure className="portrait">
              <span className="portrait__terra" aria-hidden="true" />
              <div className="plate">
                <div className="shot">
                  <Image
                    src="/foto-perfil.jpg"
                    alt="Marc Sola Bel"
                    fill
                    sizes="(max-width: 900px) 440px, 400px"
                  />
                  <span className="grade" aria-hidden="true" />
                </div>
                <figcaption className="plate__base">
                  <span className="name">Marc Sola Bel</span>
                  <span className="rule" aria-hidden="true" />
                  <span className="role">Retrato</span>
                </figcaption>
              </div>
            </figure>

            <div className="net">
              <svg
                className="net__svg"
                viewBox="0 0 380 440"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                {/* neuronas de fondo (profundidad) */}
                <g>
                  <rect className="bgneuron" x="304" y="52" width="9" height="9" transform="rotate(45 308.5 56.5)" />
                  <rect className="bgneuron" x="44" y="160" width="8" height="8" transform="rotate(45 48 164)" />
                  <rect className="bgneuron" x="332" y="241" width="10" height="10" transform="rotate(45 337 246)" />
                  <rect className="bgneuron" x="50" y="323" width="8" height="8" transform="rotate(45 54 327)" />
                  <rect className="bgneuron" x="300" y="368" width="9" height="9" transform="rotate(45 304.5 372.5)" />
                </g>
                {/* dendritas cruzadas (aprendizaje entre etapas no contiguas) */}
                <path className="link cross" pathLength={1} d="M110,70 C70,122 80,179 120,220" />
                <path className="link cross" pathLength={1} d="M250,143 C300,196 300,253 250,297" />
                <path className="link cross" pathLength={1} d="M120,220 C100,293 130,352 175,383" />
                {/* raíces desde el soma (retrato) */}
                <path className="link l-root" pathLength={1} d="M140,0 C130,24 118,45 110,70" />
                <path id="sm-r2" className="link l-root" pathLength={1} d="M212,0 C226,42 246,98 250,143" />
                {/* espina cronológica */}
                <path id="sm-p1" className="link l-1" pathLength={1} d="M110,70 C150,98 220,116 250,143" />
                <path id="sm-p2" className="link l-2" pathLength={1} d="M250,143 C250,179 150,192 120,220" />
                <path id="sm-p3" className="link l-3" pathLength={1} d="M120,220 C120,257 220,269 250,297" />
                <path id="sm-p4" className="link l-4" pathLength={1} d="M250,297 C250,339 205,355 175,383" />
                {/* pulsos viajeros (vida en reposo) */}
                <circle className="pulse" r={3.1}>
                  <animateMotion dur="5.5s" begin="0s" repeatCount="indefinite">
                    <mpath href="#sm-p1" />
                  </animateMotion>
                </circle>
                <circle className="pulse" r={3.1}>
                  <animateMotion dur="6s" begin="1.4s" repeatCount="indefinite">
                    <mpath href="#sm-p2" />
                  </animateMotion>
                </circle>
                <circle className="pulse" r={3.1}>
                  <animateMotion dur="5.7s" begin="2.6s" repeatCount="indefinite">
                    <mpath href="#sm-p3" />
                  </animateMotion>
                </circle>
                <circle className="pulse" r={3.1}>
                  <animateMotion dur="6.2s" begin="3.7s" repeatCount="indefinite">
                    <mpath href="#sm-p4" />
                  </animateMotion>
                </circle>
                <circle className="pulse" r={2.6}>
                  <animateMotion dur="7.5s" begin="0.7s" repeatCount="indefinite">
                    <mpath href="#sm-r2" />
                  </animateMotion>
                </circle>
              </svg>

              {/* nodos HTML en % sobre .net (aspect 380/440): acoplados al SVG */}
              <div className="net__nodes">
                <div className="nd nd-1 r" style={{ left: "28.9%", top: "15.9%", "--lx": "-8px" } as React.CSSProperties}>
                  <span className="nd__dia" />
                  <span className="nd__lab">Comunicación<br />audiovisual</span>
                </div>
                <div className="nd nd-2 l" style={{ left: "65.8%", top: "32.4%", "--lx": "8px" } as React.CSSProperties}>
                  <span className="nd__dia" />
                  <span className="nd__lab">Ventas B2B</span>
                </div>
                <div className="nd nd-3 r" style={{ left: "31.6%", top: "50%", "--lx": "-8px" } as React.CSSProperties}>
                  <span className="nd__dia" />
                  <span className="nd__lab">Dirección<br />comercial</span>
                </div>
                <div className="nd nd-4 l" style={{ left: "65.8%", top: "67.6%", "--lx": "8px" } as React.CSSProperties}>
                  <span className="nd__dia" />
                  <span className="nd__lab">Coordinación +<br />automatización</span>
                </div>
                <div className="nd nd-5 final r" style={{ left: "46%", top: "87%", "--lx": "-8px" } as React.CSSProperties}>
                  <span className="nd__dia" />
                  <span className="nd__lab">Pienso en sistemas.</span>
                </div>
              </div>
            </div>
          </div>

          {/* ══ PROSA: copy exacto de la web (doc-A) ══ */}
          <div className="prose">
            <h2 className="sect-label">
              <i className="sect-glifo" aria-hidden="true">{GLIFOS["sobre-mi"]}</i>
              Sobre mí
            </h2>
            <p className="synth">Una década, contextos muy distintos, un hilo constante.</p>
            <p>
              Llevo una década resolviendo problemas en contextos muy distintos:
              comunicación audiovisual, ventas B2B, dirección comercial y, ahora,
              coordinación de equipo y automatización de procesos. Ese recorrido
              variado tiene un hilo constante — pienso en{" "}
              <span className="hl">sistemas</span>. Descompongo un problema en sus
              piezas, entiendo cómo encajan y diseño la solución.
            </p>
            <p>
              Hoy coordino un equipo técnico, y he aprendido que liderar no es
              repartir tareas: es leer dónde hay fricción, mantener la comunicación
              clara y cuidar la carga de cada persona. Detecto pronto cuándo algo
              no fluye y me centro en resolverlo, porque me importa de verdad que
              el problema se solucione, no solo que quede registrado.
            </p>
            <p>
              Esa misma lógica me llevó a la automatización con IA. Diseño el
              sistema, oriento herramientas como Claude y construyo soluciones que
              quitan el trabajo mecánico para que las personas se dediquen a lo que
              de verdad aporta. No vengo del código — vengo del{" "}
              <span className="hl">problema</span>. Y cada vez me obsesiona más
              construir la herramienta que lo resuelve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
