"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GLIFOS } from "../glifos";
import "./sobremi.css";

/* SOBRE MÍ (§6.3 · credibilidad) — RETRATO.
   Rev. estética microsite (ADR-0030 Fulgor): se retira el entramado
   neuronal — era el gesto más "espectáculo" de la sección y no apilaba
   prueba (Rams lo poda: no apunta a un dato verificable, decora). La
   prueba vive en la prosa; el retrato queda como placa de contacto B&N,
   sin acento de color (el único color del sitio es la captura real de
   Atlas). Ver docs/doc-A-construccion.md para el registro de la decisión.

   Reglas de ingeniería que se conservan:
   · El servidor SIEMPRE manda el estado final (fase "reposo"): sin JS,
     impresión y reduced-motion ven la sección completa.
   · JS arma el estado oculto al montar (.is-anim), dispara la entrada
     por IntersectionObserver (threshold .25) con garantía setTimeout
     1.7s, y retira .is-anim tras el reveal (fade-up corto, doctrina
     microsite §4: reveals sobrios, no espectáculo).
   · Parallax solo con puntero fino y sin reduced-motion: variables
     --mx/--my sobre .rail, transform puro. */

type Fase = "reposo" | "armada" | "play";

export default function SobreMi() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [fase, setFase] = useState<Fase>("reposo");

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
          settleT = window.setTimeout(() => setFase("reposo"), 1400);
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
    (fase !== "reposo" ? " is-anim" : "") + (fase === "play" ? " play" : "");

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
          </div>

          {/* ══ PROSA: copy exacto de la web (doc-A) ══ */}
          <div className="prose">
            <h2 className="sect-label">
              <i className="sect-glifo" aria-hidden="true">{GLIFOS["sobre-mi"]}</i>
              Sobre mí
            </h2>
            <p className="synth">Una década, contextos muy distintos, un hilo constante.</p>
            <p>
              Llevo una década resolviendo problemas en escenarios que no se
              parecen entre sí:
              comunicación audiovisual, ventas técnicas B2B, dirección comercial
              y, ahora, coordinación de equipo y automatización con IA. El
              recorrido es variado; el hilo es uno: pienso en{" "}
              <span className="hl">sistemas</span>. Descompongo el problema en sus
              piezas, entiendo cómo encajan y trazo la solución.
            </p>
            <p>
              Hoy coordino un equipo técnico: reparto el trabajo, mantengo la
              comunicación clara y vigilo la carga de cada persona. Liderar no es
              asignar tareas, es leer pronto dónde se atasca algo y resolverlo
              antes de que pese. Me importa que el problema se solucione, no solo
              que quede registrado.
            </p>
            <p>
              Esa misma lógica me llevó a la IA. Vi que la carga del equipo se
              distribuía a criterio manual y monté el mecanismo que la equilibra
              —validado en simulador—, usando la IA como herramienta para
              construirlo, sin escribir una línea de código de producción. No
              vengo del código: vengo del{" "}
              <span className="hl">problema</span>. Y cada vez me obsesiona más
              construir la herramienta que lo resuelve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
