"use client";

import { useInViewOnce } from "../useInViewOnce";
import SelloConvergente from "./SelloConvergente";
import "./vinetas.css";

/* CONTACTO (§6.8 · PICO · espejo del Hero) — metáfora: EL SISTEMA SE
   COMPLETA. El wireframe en movimiento del Hero se resuelve en un rombo
   sólido y quieto (sello), y el marco técnico del email se ensambla desde
   las esquinas: cierre perceptivo (Gestalt de closure) al servicio del CTA.
   Empezó "pienso en sistemas"; termina "hablemos". */

export default function Contacto() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <section className="viñeta viñeta--oscura" id="contacto" data-bar="dark">
      <div className="viñeta__inner">
        <div ref={ref} className={`contacto__inner ${inView ? "in" : ""}`}>
          <SelloConvergente inView={inView} />

          <h2 className="contacto__cierre">
            Hablemos de la próxima{" "}
            <span className="fire">oportunidad</span>.
          </h2>

          <a className="cta-email" href="mailto:marcsolabel@gmail.com">
            <span className="corner corner--tl" aria-hidden="true" />
            <span className="corner corner--tr" aria-hidden="true" />
            <span className="corner corner--bl" aria-hidden="true" />
            <span className="corner corner--br" aria-hidden="true" />
            marcsolabel@gmail.com
          </a>

          <p className="contacto__datos">
            <a href="tel:+34608254126">608 254 126</a>
            <span>Esparreguera, Barcelona</span>
          </p>
          <p className="contacto__idiomas">
            Catalán · Español — nativos · <b>Inglés B2 (IELTS)</b> · Portugués —
            básico
          </p>
        </div>
      </div>
    </section>
  );
}
