"use client";

import { useInViewOnce } from "../useInViewOnce";
import "./vinetas.css";

/* CONTACTO (§6.8 · cierre) — metáfora: EL SISTEMA SE COMPLETA. El
   wireframe en movimiento del Hero se resuelve en un rombo sólido y
   quieto (sello), y el marco técnico del email se ensambla desde las
   esquinas: cierre perceptivo (Gestalt de closure) al servicio del CTA.
   Empezó "pienso en sistemas"; termina "hablemos".

   Rev. estética microsite (ADR-0030 Fulgor): pasa a claro — de las 4
   secciones oscuras originales solo quedan Hero y Cita como "capítulos"
   (doctrina: el oscuro se reserva a 1-2 momentos de relato, no a
   alternancia 50/50). */

export default function Contacto() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <section className="viñeta viñeta--clara" id="contacto" data-bar="light">
      <div className="viñeta__inner">
        <div ref={ref} className={`contacto__inner ${inView ? "in" : ""}`}>
          <svg className="contacto__sello" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 1 L31 16 L16 31 L1 16 Z" />
          </svg>

          <h2 className="contacto__cierre">
            Coordino equipos y automatizo procesos con IA. Si eso te encaja,{" "}
            <span className="fire">hablemos</span>.
          </h2>

          <a className="cta-email" href="mailto:marcsolabel@gmail.com">
            <span className="corner corner--tl" aria-hidden="true" />
            <span className="corner corner--tr" aria-hidden="true" />
            <span className="corner corner--bl" aria-hidden="true" />
            <span className="corner corner--br" aria-hidden="true" />
            marcsolabel@gmail.com
          </a>

          {/* idiomas reubicados en Formación (decisión 2026-06-10):
              nada que genere duda pegado al CTA */}
          <p className="contacto__datos">
            <a href="tel:+34608254126">608 254 126</a>
            <span>Esparreguera, Barcelona</span>
          </p>
        </div>
      </div>
    </section>
  );
}
