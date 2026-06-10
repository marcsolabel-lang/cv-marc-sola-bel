"use client";

import { useEffect, useRef, useState } from "react";
import { GLIFOS } from "../glifos";
import { useInViewOnce } from "../useInViewOnce";
import "./vinetas.css";

/* ATLAS (§6.7 · PICO · clímax) — metáfora: el sistema FUNCIONANDO.
   Crown Planner evolucionó a ATLAS: motor de planificación del servicio
   técnico (equidad por horas reales, prioridad operativa, memoria de
   flota, cuatro módulos). Las pantallas son RECREACIONES en HTML vivo
   con la identidad control-tower de Atlas y datos 100% INVENTADOS —
   nada operativo de Crown Lift Trucks ni datos personales (§6.7).
   Las capturas reales llegarán con el perfil visitante de la demo. */

/* ── datos INVENTADOS (técnicos, zonas, clientes, series) ── */
const SIM = [
  { id: "OR-1042", zona: "Vallès Est", tipo: "Correctivo", tecnico: "A. Ferrer", score: 87 },
  { id: "OR-1043", zona: "Baix Nord", tipo: "Revisión", tecnico: "L. Soto", score: 92 },
  { id: "OR-1044", zona: "Anoia", tipo: "Correctivo", tecnico: "M. Pons", score: 78 },
  { id: "OR-1045", zona: "Litoral", tipo: "Inspección", tecnico: "J. Vidal", score: 84 },
  { id: "OR-1046", zona: "Vallès Est", tipo: "Revisión", tecnico: "A. Ferrer", score: 71 },
  { id: "OR-1047", zona: "Alt Segre", tipo: "Correctivo", tecnico: null, score: 0 },
];
const PASO_MS = 950;
const PAUSA_MS = 3400;

/* ventana control-tower: el chrome común de las recreaciones */
function AtlasVentana({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="atlasw" aria-hidden="true">
      <div className="atlasw__bar">
        <i /><i /><i />
        <b>ATLAS</b>
        <span>{titulo}</span>
      </div>
      <div className="atlasw__body">{children}</div>
    </div>
  );
}

/* S1 — el problema: la bandeja sin criterio (contrapunto del S4) */
function VizCaos() {
  const FILAS = [
    "OR-0996 · ¿quién la lleva?",
    "OR-1037 · ¿es urgente?",
    "OR-1051 · parada desde ayer",
    "PM · revisión sin fecha",
  ];
  return (
    <AtlasVentana titulo="Bandeja de entrada · sin criterio">
      <ul className="vprio vprio--caos">
        {FILAS.map((f, i) => (
          <li key={i} style={{ "--off": `${[3, -2, 4, -3][i]}px` } as React.CSSProperties}>
            <span className="vprio__orden">{f}</span>
          </li>
        ))}
      </ul>
    </AtlasVentana>
  );
}

/* S2 — la asignación del día resolviéndose sola */
function VizAsignacion() {
  const ref = useRef<HTMLDivElement>(null);
  const [fase, setFase] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { const t = setTimeout(() => setFase(SIM.length), 0); return () => clearTimeout(t); }
    let timer: ReturnType<typeof setTimeout> | undefined;
    let visible = false;
    const tick = (f: number) => {
      if (!visible) return;
      if (f > SIM.length) { timer = setTimeout(() => { setFase(0); tick(0); }, PAUSA_MS); return; }
      setFase(f);
      timer = setTimeout(() => tick(f + 1), PASO_MS);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !visible) { visible = true; tick(0); }
      else if (!e.isIntersecting && visible) { visible = false; clearTimeout(timer); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);

  return (
    <div ref={ref}>
      <AtlasVentana titulo="Plan de hoy">
        <div className="csim__head">
          <i>Órdenes del día</i><i>Zona</i><i>Asignación</i><i>Score</i>
        </div>
        {SIM.map((o, i) => {
          const hecha = i < fase;
          const enCurso = i === fase;
          return (
            <div key={o.id} className={`csim__row ${hecha ? "is-done" : ""} ${enCurso ? "is-live" : ""} ${o.tecnico === null && hecha ? "is-gap" : ""}`}>
              <span className="csim__id">{o.id} · {o.tipo}</span>
              <span>{o.zona}</span>
              <span className="csim__asig">{hecha ? (o.tecnico ?? "SIN COBERTURA") : enCurso ? "calculando…" : "—"}</span>
              <span className="csim__score">
                <i style={{ transform: `scaleX(${hecha && o.tecnico ? o.score / 100 : 0})` }} />
                <b>{hecha && o.tecnico ? o.score : ""}</b>
              </span>
            </div>
          );
        })}
        <div className="csim__foot">
          <span>{Math.min(fase, SIM.length - 1)}/5 asignadas · 1 aviso</span>
          <span className="csim__tag">Recreación · datos ficticios</span>
        </div>
      </AtlasVentana>
    </div>
  );
}

/* S3 — equidad por horas: a mano / con Atlas */
function VizEquidad() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const GRUPOS = [
    { t: "A mano", mod: "antes", v: [104, 38, 86, 152, 61] },
    { t: "Con Atlas", mod: "con", v: [97, 88, 94, 102, 91] },
  ];
  const TEC = ["Ferrer", "Soto", "Pons", "Vidal", "Riba"];
  return (
    <div ref={ref} className={inView ? "in" : ""}>
      <AtlasVentana titulo="Carga del equipo · % de capacidad">
        <div className="veq">
          {GRUPOS.map((g) => (
            <div key={g.t} className="veq__col">
              <b className="veq__t">{g.t}</b>
              {g.v.map((v, i) => (
                <div key={i} className="veq__fila">
                  <span>{TEC[i]}</span>
                  <i className="veq__track">
                    <em
                      style={{ "--w": Math.min(v, 160) / 160 } as React.CSSProperties}
                      data-hot={v > 120 || undefined}
                    />
                  </i>
                  <small>{v}%</small>
                </div>
              ))}
            </div>
          ))}
        </div>
      </AtlasVentana>
    </div>
  );
}

/* S4 — la cola de prioridad real */
function VizPrioridad() {
  const ORDENES = [
    { tier: "EMERGENCIA", nota: "máquina parada", cls: "t-emg", orden: "OR-1051 · Almacenes Drassana" },
    { tier: "URGENTE", nota: "cliente prioritario", cls: "t-urg", orden: "OR-1037 · Logística Ribera" },
    { tier: "32 DÍAS", nota: "antigüedad", cls: "t-old", orden: "OR-0996 · Frío Industrial Camp" },
    { tier: "REVISIÓN", nota: "plan preventivo", cls: "t-rev", orden: "PM · serie 1A4790021" },
  ];
  return (
    <AtlasVentana titulo="Cola de prioridad">
      <ul className="vprio">
        {ORDENES.map((o) => (
          <li key={o.orden}>
            <b className={`vprio__tier ${o.cls}`}>{o.tier}</b>
            <span className="vprio__orden">{o.orden}</span>
            <small>{o.nota}</small>
          </li>
        ))}
      </ul>
    </AtlasVentana>
  );
}

/* S5 — cuatro módulos, un motor */
function VizModulos() {
  const MODS = [
    { n: "Plan de hoy", d: "órdenes de servicio" },
    { n: "Plan mensual", d: "calendario de revisiones" },
    { n: "Plan anual", d: "equilibrio de 12 meses" },
    { n: "Asignación CAT", d: "cartera y territorios" },
  ];
  return (
    <AtlasVentana titulo="Módulos">
      <div className="vmods">
        {MODS.map((m) => (
          <div key={m.n} className="vmods__card">
            <b>{m.n}</b>
            <small>{m.d}</small>
          </div>
        ))}
      </div>
    </AtlasVentana>
  );
}

/* S6 — memoria del sistema */
function VizMemoria() {
  return (
    <AtlasVentana titulo="Memoria del sistema">
      <div className="vmem">
        <div className="vmem__ficha">
          <small>Nº de serie</small>
          <b>1A4790021</b>
          <i aria-hidden="true">→</i>
          <small>Modelo</small>
          <b>ESR 5260</b>
        </div>
        <div className="vmem__linea"><span>Flota memorizada</span><b>~4.500 máquinas</b></div>
        <div className="vmem__linea"><span>Capacidad calibrada</span><b>6,6 h/día · técnico</b></div>
        <div className="vmem__linea"><span>Factor de viaje aprendido</span><b>se ajusta cada mes</b></div>
      </div>
    </AtlasVentana>
  );
}

type Slide = {
  kicker: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  viz?: React.ReactNode;
  kpis?: { v: string; l: string }[];
  final?: boolean;
};

const SLIDES: Slide[] = [
  {
    kicker: "El problema",
    title: "La asignación de órdenes se hacía a mano.",
    text: (
      <>
        Dependía del criterio del coordinador y el{" "}
        <strong>desequilibrio de carga</strong> no se veía hasta que daba
        problemas.
      </>
    ),
    viz: <VizCaos />,
  },
  {
    kicker: "La solución",
    title: "Atlas reparte el día en segundos.",
    text: (
      <>
        Lee el trabajo en curso del ERP, asigna cada orden al{" "}
        <strong>técnico capaz más cercano</strong> y equilibra la carga del
        equipo.
      </>
    ),
    viz: <VizAsignacion />,
  },
  {
    kicker: "El motor",
    title: "Equidad por horas reales, no por número de trabajos.",
    text: (
      <>
        Capacidad por <strong>perfil de cada técnico</strong>, calibrada con
        datos reales de productividad y viaje.
      </>
    ),
    viz: <VizEquidad />,
  },
  {
    kicker: "Prioridad real",
    title: "Primero lo que de verdad es urgente.",
    text: (
      <>
        <strong>Máquina parada</strong> → cliente urgente → antigüedad →
        revisión. El tier de emergencia manda sobre todo lo demás.
      </>
    ),
    viz: <VizPrioridad />,
  },
  {
    kicker: "Cuatro módulos",
    title: "Un mismo motor para todo el ciclo.",
    text: (
      <>
        Del <strong>plan de hoy</strong> al equilibrio anual de la cartera:
        diaria, mensual, anual y asignación CAT.
      </>
    ),
    viz: <VizModulos />,
  },
  {
    kicker: "Memoria",
    title: "Un sistema que aprende.",
    text: (
      <>
        <strong>Memoria de flota</strong> de miles de máquinas y calibración
        por técnico que se ajusta con cada mes de datos reales.
      </>
    ),
    viz: <VizMemoria />,
  },
  {
    kicker: "Resultados",
    title: "Validado en simulador con ~1.500 máquinas.",
    kpis: [
      { v: "−26%", l: "desequilibrio de carga" },
      { v: "−38%", l: "kilómetros medios" },
      { v: "−47%", l: "carga pico por técnico" },
      { v: "<200 ms", l: "tiempo de cálculo" },
    ],
  },
  {
    kicker: "La prueba",
    title: "Diseñado y construido en solitario, sin ser programador.",
    text: (
      <>
        <strong>Diseñé la lógica</strong> y la materialicé orquestando{" "}
        <span className="fire">IA</span> (Claude, entre otras) sobre los datos
        del ERP.{" "}
        <strong>De prototipo en Excel a aplicación en producción</strong>:
        detectar un problema operativo, diseñar el sistema que lo resuelve y
        construirlo con las herramientas disponibles.
      </>
    ),
    final: true,
  },
];

export default function Atlas() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

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
        <h2 className="sect-label">
          <i className="sect-glifo" aria-hidden="true">{GLIFOS["proyecto"]}</i>
          Proyecto destacado
        </h2>
        <header className="crown__head">
          <h3 className="crown__title">
            Atlas — Sistema de planificación inteligente del servicio técnico.
          </h3>
          <p className="crown__sub">
            Nacido como Crown Planner; hoy, motor de asignación con cuatro
            módulos en uso. Diseñado y construido en solitario.
          </p>
        </header>

        <div className="crown__carousel" role="group" aria-roledescription="carrusel" aria-label="Atlas, recorrido en 8 slides">
          <div ref={trackRef} className="crown__track">
            {SLIDES.map((s, i) => (
              <article
                key={i}
                className={`crown__slide ${s.final ? "crown__slide--final" : ""}`}
                aria-label={`${i + 1} de ${SLIDES.length}`}
              >
                <div className="crown__slide-head">
                  <span className="crown__slide-kicker">{s.kicker}</span>
                  <h4 className="crown__slide-title">{s.title}</h4>
                </div>
                <div className="crown__slide-body">
                  {s.viz}
                  {s.kpis && (
                    <div className="vkpi">
                      {s.kpis.map((k) => (
                        <div key={k.l} className="vkpi__item">
                          <b>{k.v}</b>
                          <small>{k.l}</small>
                        </div>
                      ))}
                    </div>
                  )}
                  <div>
                    {s.text && <p className="crown__slide-text">{s.text}</p>}
                    {s.kpis && (
                      <p className="crown__slide-text">
                        Asignación de cartera con optimización{" "}
                        <strong>greedy + búsqueda local</strong> y el 100% de
                        las restricciones respetadas. Cifras del simulador, no
                        de la operación real.
                      </p>
                    )}
                    {s.final && (
                      <div className="crown__ctas">
                        <span className="crown__cta crown__demo">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M5 12 H19 M13 6 L19 12 L13 18" />
                          </svg>
                          Probar la demo
                          <i>Próximamente · perfil visitante</i>
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
            <button className="crown__arrow" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Slide anterior">
              ←
            </button>
            <button className="crown__arrow" onClick={() => goTo(active + 1)} disabled={active === SLIDES.length - 1} aria-label="Slide siguiente">
              →
            </button>
            <div className="crown__dots" role="group" aria-label="Progreso del carrusel">
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
    </section>
  );
}
