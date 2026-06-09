"use client";

import { useEffect, useRef, useState } from "react";
import "./vinetas.css";

/* PROPUESTA (rama) — CROWN VIVO: la captura muerta del slide "La solución"
   se sustituye por el sistema OPERANDO con datos 100% ficticios: las
   órdenes del día entran, los scores se calculan y la asignación se
   resuelve sola; un caso queda sin cobertura (mecánica 3, visible).
   "La prueba es la máquina funcionando" (§6.7) en sentido literal.
   reduced-motion: estado final asignado, quieto. */

type Orden = {
  id: string;
  zona: string;
  tipo: string;
  tecnico: string | null;   /* null = sin cobertura */
  score: number;
};

/* datos INVENTADOS (riesgo confidencialidad §6.7: nada real) */
const ORDENES: Orden[] = [
  { id: "OR-1042", zona: "Vallès Est",  tipo: "Correctivo",  tecnico: "A. Ferrer", score: 87 },
  { id: "OR-1043", zona: "Baix Nord",   tipo: "Preventivo",  tecnico: "L. Soto",   score: 92 },
  { id: "OR-1044", zona: "Anoia",       tipo: "Correctivo",  tecnico: "M. Pons",   score: 78 },
  { id: "OR-1045", zona: "Litoral",     tipo: "Inspección",  tecnico: "J. Vidal",  score: 84 },
  { id: "OR-1046", zona: "Vallès Est",  tipo: "Preventivo",  tecnico: "A. Ferrer", score: 71 },
  { id: "OR-1047", zona: "Alt Segre",   tipo: "Correctivo",  tecnico: null,        score: 0  },
];

const PASO_MS = 950;          /* una asignación por paso */
const PAUSA_FINAL_MS = 3400;  /* tablero resuelto en reposo antes de reiniciar */

export default function CrownSim() {
  const ref = useRef<HTMLDivElement>(null);
  const [fase, setFase] = useState(0);          /* 0..ORDENES.length = asignadas */
  const [activa, setActiva] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (reduced) {
      /* estado final asignado, quieto (§5) — diferido para no encadenar render */
      timer = setTimeout(() => setFase(ORDENES.length), 0);
      return () => clearTimeout(timer);
    }

    let visible = false;

    const tick = (f: number) => {
      if (!visible) return;
      if (f > ORDENES.length) {
        timer = setTimeout(() => { setFase(0); tick(0); }, PAUSA_FINAL_MS);
        return;
      }
      setFase(f);
      timer = setTimeout(() => tick(f + 1), PASO_MS);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          setActiva(true);
          tick(0);
        } else if (!entry.isIntersecting && visible) {
          visible = false;
          clearTimeout(timer);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);

  return (
    <div ref={ref} className="csim" aria-hidden={activa ? undefined : true}>
      <span className="sr-only">
        Simulación del Crown Planner con datos ficticios: seis órdenes del día
        se asignan automáticamente a cuatro técnicos según su score; una orden
        de la zona Alt Segre queda marcada sin cobertura.
      </span>
      <div className="csim__frame" aria-hidden="true">
        <div className="csim__head">
          <i>Órdenes del día</i>
          <i>Zona</i>
          <i>Asignación</i>
          <i>Score</i>
        </div>
        {ORDENES.map((o, i) => {
          const hecha = i < fase;
          const enCurso = i === fase;
          return (
            <div
              key={o.id}
              className={`csim__row ${hecha ? "is-done" : ""} ${enCurso ? "is-live" : ""} ${o.tecnico === null && hecha ? "is-gap" : ""}`}
            >
              <span className="csim__id">{o.id} · {o.tipo}</span>
              <span>{o.zona}</span>
              <span className="csim__asig">
                {hecha ? (o.tecnico ?? "SIN COBERTURA") : enCurso ? "calculando…" : "—"}
              </span>
              <span className="csim__score">
                <i style={{ transform: `scaleX(${hecha && o.tecnico ? o.score / 100 : 0})` }} />
                <b>{hecha && o.tecnico ? o.score : ""}</b>
              </span>
            </div>
          );
        })}
        <div className="csim__foot">
          <span>{Math.min(fase, ORDENES.length - 1)}/5 asignadas · 1 aviso</span>
          <span className="csim__tag">Simulación · datos 100% ficticios</span>
        </div>
      </div>
    </div>
  );
}
