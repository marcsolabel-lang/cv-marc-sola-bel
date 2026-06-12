"use client";

import { useInViewOnce } from "../useInViewOnce";
import { GLIFOS } from "../glifos";
import "./vinetas.css";

/* LIDERAZGO (§6.6 · transición al clímax) — metáfora: +70 EN FORMACIÓN.
   Setenta puntos viajan de la dispersión a una retícula perfecta: el
   liderazgo como sistema que coordina a muchos (Gestalt de destino común:
   lo que se mueve junto se percibe como grupo). Un solo golpe al entrar;
   el "+70" aparece limpio y quieto — sin count-up (§5, eliminado). */

/* dispersión pseudo-aleatoria DETERMINISTA (misma en SSR e hidratación) */
const frac = (n: number) => n - Math.floor(n);
const DOTS = Array.from({ length: 70 }, (_, i) => {
  const dx = (frac(Math.sin(i * 127.1 + 311.7) * 43758.5453) - 0.5) * 320;
  const dy = (frac(Math.sin(i * 269.5 + 183.3) * 28001.8384) - 0.5) * 260;
  return { dx: Math.round(dx), dy: Math.round(dy), delay: i * 12 };
});

export default function Liderazgo() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <section className="viñeta viñeta--clara" id="liderazgo" data-bar="light">
      <div className="viñeta__inner">
        <h2 className="sect-label">
          <i className="sect-glifo" aria-hidden="true">{GLIFOS["liderazgo"]}</i>
          Liderazgo
        </h2>
        <div className="lid__grid">
          <div>
            <p className="lid__num">
              <span className="fire">+70</span>
              <small>miembros</small>
            </p>
            <p className="lid__frase">
              Dirigí durante <strong>cuatro años</strong> una asociación cultural
              sin ánimo de lucro de <strong>más de 70 miembros</strong>:{" "}
              <strong>coordinación de personas</strong>, organización de
              actividades y sostenibilidad de un proyecto colectivo a lo largo
              del tiempo.
            </p>
            <span className="lid__meta">
              Dirección de una asociación cultural · 2017–2021
            </span>
          </div>
          <div
            ref={ref}
            className={`lid__campo ${inView ? "in" : ""}`}
            aria-hidden="true"
          >
            {DOTS.map((d, i) => (
              <span
                key={i}
                className="lid__dot"
                style={
                  {
                    "--dx": `${d.dx}px`,
                    "--dy": `${d.dy}px`,
                    transitionDelay: `${d.delay}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
