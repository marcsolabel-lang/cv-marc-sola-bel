"use client";

import { useInViewOnce } from "../useInViewOnce";
import "./vinetas.css";

/* FORMACIÓN (§6.4 · credibilidad, la más subordinada) — metáfora:
   EL PAPEL DE PLANO. Una rejilla milimetrada tenue nace tras la lección
   del arquitecto: el plano precede al edificio. Figura-fondo: el fondo da
   contexto semántico sin competir con la lectura. Un susurro. */

export default function Formacion() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <section className="viñeta viñeta--clara" id="formacion" data-bar="light">
      <div className="viñeta__inner">
        <h2 className="sect-label">Formación</h2>

        <div ref={ref} className={`formacion__plano ${inView ? "in" : ""}`}>
          <h3 className="formacion__leccion">
            Donde aprendí a pensar como{" "}
            <span className="fire">arquitecto</span>.
          </h3>
          <p className="formacion__detalle">
            Diseñar la estructura de un sistema completo antes de construirlo,
            documentar y gestionar un proyecto de principio a fin. El contexto era
            el diseño de videojuegos; la lección — estructurar, planificar,
            iterar — es la que aplico hoy a cualquier sistema.
          </p>
          <span className="formacion__meta">
            Game &amp; Concept Design — Level Up Game Dev Hub · 2023–2024
          </span>
        </div>

        <ul className="formacion__otros">
          <li className="formacion__otro">
            <strong>Grado en Comunicación Audiovisual</strong>
            <span>
              Universitat de Lleida · 2012–2017 · Con intercambio en la
              Universidade de Santiago de Compostela
            </span>
          </li>
          <li className="formacion__otro">
            <strong>Narrativa interactiva</strong>
            <span>ESCAC · 2025</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
