"use client";

import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "../useInViewOnce";
import "./vinetas.css";

/* SOBRE MÍ (§6.3 · credibilidad, contenida) — metáfora: EL HILO CONSTANTE.
   Los cuatro contextos del párrafo 1, dispersos, quedan cosidos por una
   línea que se dibuja una sola vez y desemboca en la tesis. Gestalt de
   continuidad: lo unido por una línea se lee como una misma trayectoria. */

const CONTEXTOS = [
  "Comunicación audiovisual",
  "Ventas B2B",
  "Dirección comercial",
  "Coordinación de equipo + automatización",
];

export default function SobreMi() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const listRef = useRef<HTMLUListElement>(null);
  const sintRef = useRef<HTMLParagraphElement>(null);
  const [geo, setGeo] = useState<{ h: number; d: string; nodes: number[] } | null>(null);

  /* La curva-hilo se genera midiendo la posición real de cada estación:
     pasa exactamente por los nodos, con vaivén de costura entre ellos. */
  useEffect(() => {
    const list = listRef.current, sint = sintRef.current;
    if (!list || !sint) return;
    const measure = () => {
      const items = Array.from(list.children) as HTMLElement[];
      const base = list.offsetTop;
      const ys = items.map((el) => el.offsetTop - base + el.offsetHeight / 2 + 6);
      ys.push(sint.offsetTop - base + 10);
      const h = ys[ys.length - 1] + 4;
      let d = `M 9 ${ys[0]}`;
      for (let i = 1; i < ys.length; i++) {
        const midY = (ys[i - 1] + ys[i]) / 2;
        const sway = i % 2 === 0 ? 15 : 3;
        d += ` Q ${sway} ${midY} 9 ${ys[i]}`;
      }
      setGeo({ h, d, nodes: ys.slice(0, 4) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="viñeta viñeta--clara" id="sobre-mi" data-bar="light">
      <div className="viñeta__inner">
        <p className="sect-label">Sobre mí</p>
        <div className="sobremi__grid">
          <div ref={ref} className={`hilo ${inView ? "in" : ""}`}>
            {geo && (
              <svg
                className="hilo__svg"
                viewBox={`0 0 18 ${geo.h}`}
                style={{ height: geo.h }}
                aria-hidden="true"
              >
                <path className="hilo__path" d={geo.d} pathLength={1} />
                {geo.nodes.map((y, i) => (
                  <circle key={i} className={`hilo__node hilo__node--${i + 1}`} cx="9" cy={y} r="3.2" />
                ))}
              </svg>
            )}
            <ul ref={listRef} className="hilo__list">
              {CONTEXTOS.map((c) => (
                <li key={c} className="hilo__item">{c}</li>
              ))}
            </ul>
            <p ref={sintRef} className="hilo__sintesis">
              Pienso en <span className="fire">sistemas</span>.
            </p>
          </div>

          <div className="sobremi__text">
            <p>
              Llevo una década resolviendo problemas en contextos muy distintos:
              comunicación audiovisual, ventas B2B, dirección comercial y, ahora,
              coordinación de equipo y automatización de procesos. Ese recorrido
              variado tiene un hilo constante — pienso en sistemas. Descompongo un
              problema en sus piezas, entiendo cómo encajan y diseño la solución.
            </p>
            <p>
              Hoy coordino un equipo técnico, y he aprendido que liderar no es
              repartir tareas: es leer dónde hay fricción, mantener la comunicación
              clara y cuidar la carga de cada persona. Detecto pronto cuándo algo no
              fluye y me centro en resolverlo, porque me importa de verdad que el
              problema se solucione, no solo que quede registrado.
            </p>
            <p>
              Esa misma lógica me llevó a la automatización con IA. Diseño el
              sistema, oriento herramientas como Claude y construyo soluciones que
              quitan el trabajo mecánico para que las personas se dediquen a lo que
              de verdad aporta. No vengo del código — vengo del{" "}
              <span className="fire">problema</span>. Y cada vez me obsesiona más
              construir la herramienta que lo resuelve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
