"use client";

import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "../useInViewOnce";
import { GLIFOS } from "../glifos";
import "./vinetas.css";

/* SOBRE MÍ (§6.3 · credibilidad, contenida) — metáfora: EL HILO CONSTANTE
   como ÁRBOL DE CONVERGENCIA (revisión 2026-06-10: más protagonismo).
   Un tronco cronológico recorre los cuatro contextos; cada rama se une al
   tronco con un codo a 45° y un nodo-rombo (la geometría del Hero, en
   marca simple) y todo desemboca en la tesis. Arriba, el marco técnico de
   la foto de perfil (asset pendiente de Marc; hover b/n→color preparado). */

const CONTEXTOS = [
  "Comunicación audiovisual",
  "Ventas B2B",
  "Dirección comercial",
  "Coordinación de equipo + automatización",
];

type Geo = {
  h: number;
  y0: number;
  yFin: number;
  ramas: string[];
  nodos: number[];
};

export default function SobreMi() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const listRef = useRef<HTMLUListElement>(null);
  const sintRef = useRef<HTMLParagraphElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  /* el árbol se traza midiendo la posición real de cada estación:
     rama = codo a 45° desde el tronco hasta la etiqueta */
  useEffect(() => {
    const list = listRef.current, sint = sintRef.current;
    if (!list || !sint) return;
    const arbol = list.parentElement!;
    const measure = () => {
      const items = Array.from(list.children) as HTMLElement[];
      const base = arbol.getBoundingClientRect().top;
      const ys = items.map((el) => {
        const r = el.getBoundingClientRect();
        return r.top - base + r.height / 2;
      });
      const rs = sint.getBoundingClientRect();
      const yFin = rs.top - base + Math.min(rs.height / 2, 26);
      const y0 = ys[0] - 16;
      const ramas = ys.map((y) => `M 14 ${y + 14} L 32 ${y} H 52`);
      const nodos = ys.map((y) => y + 14);
      setGeo({ h: yFin + 14, y0, yFin, ramas, nodos });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(arbol);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="viñeta viñeta--clara" id="sobre-mi" data-bar="light">
      <div className="viñeta__inner">
        <h2 className="sect-label">
          <i className="sect-glifo" aria-hidden="true">{GLIFOS["sobre-mi"]}</i>
          Sobre mí
        </h2>
        <div className="sobremi__grid">
          <div className="sobremi__col">
            {/* marco de la foto de perfil — colgar la imagen aquí:
                <img src="/foto-perfil.jpg" alt="Marc Sola Bel" /> */}
            <figure className="foto-marco" data-slot="foto-perfil">
              <span className="fcorner fcorner--tl" aria-hidden="true" />
              <span className="fcorner fcorner--tr" aria-hidden="true" />
              <span className="fcorner fcorner--bl" aria-hidden="true" />
              <span className="fcorner fcorner--br" aria-hidden="true" />
              <figcaption className="foto-marco__hint" aria-hidden="true">
                <svg viewBox="0 0 32 32">
                  <circle cx="16" cy="11.5" r="5.5" />
                  <path d="M5 28 C5 20.5 27 20.5 27 28" />
                </svg>
                <small>Fotografía — pendiente</small>
              </figcaption>
            </figure>

            <div ref={ref} className={`arbol ${inView ? "in" : ""}`}>
              {geo && (
                <svg
                  className="arbol__svg"
                  viewBox={`0 0 56 ${geo.h}`}
                  style={{ height: geo.h }}
                  aria-hidden="true"
                >
                  <path className="arbol__tronco" d={`M 14 ${geo.y0} V ${geo.yFin}`} pathLength={1} />
                  {geo.ramas.map((d, i) => (
                    <path key={i} className={`arbol__rama arbol__rama--${i + 1}`} d={d} pathLength={1} />
                  ))}
                  {geo.nodos.map((y, i) => (
                    <rect
                      key={i}
                      className={`arbol__nodo arbol__nodo--${i + 1}`}
                      x="10.5" y={y - 3.5} width="7" height="7"
                    />
                  ))}
                  <rect className="arbol__final" x="8" y={geo.yFin - 6} width="12" height="12" />
                </svg>
              )}
              <ul ref={listRef} className="arbol__list">
                {CONTEXTOS.map((c) => (
                  <li key={c} className="arbol__item">{c}</li>
                ))}
              </ul>
              <p ref={sintRef} className="arbol__sintesis">
                Pienso en <span className="fire">sistemas</span>.
              </p>
            </div>
          </div>

          <div className="sobremi__text">
            <p>
              Llevo <strong>una década resolviendo problemas</strong> en contextos
              muy distintos: comunicación audiovisual, ventas B2B, dirección
              comercial y, ahora, coordinación de equipo y automatización de
              procesos. Ese recorrido variado tiene un hilo constante —{" "}
              <strong>pienso en sistemas</strong>. Descompongo un problema en sus
              piezas, entiendo cómo encajan y <strong>diseño la solución</strong>.
            </p>
            <p>
              Hoy <strong>coordino un equipo técnico</strong>, y he aprendido que
              liderar no es repartir tareas: es leer dónde hay fricción, mantener
              la comunicación clara y cuidar la carga de cada persona. Detecto
              pronto cuándo algo no fluye y me centro en resolverlo, porque{" "}
              <strong>me importa de verdad que el problema se solucione</strong>,
              no solo que quede registrado.
            </p>
            <p>
              Esa misma lógica me llevó a la{" "}
              <strong>automatización con IA</strong>. Diseño el sistema, oriento
              herramientas como Claude y <strong>construyo soluciones</strong> que
              quitan el trabajo mecánico para que las personas se dediquen a lo que
              de verdad aporta. No vengo del código —{" "}
              <strong>
                vengo del <span className="fire">problema</span>
              </strong>
              . Y cada vez me obsesiona más construir la herramienta que lo
              resuelve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
