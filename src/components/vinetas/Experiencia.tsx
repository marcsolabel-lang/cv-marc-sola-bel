"use client";

import { useScrollScene } from "../useScrollScene";
import { GLIFOS } from "../glifos";
import "./vinetas.css";

/* EXPERIENCIA (§6.5 · credibilidad, la más larga) — metáfora: LA DÉCADA
   QUE SE ERIGE. El eje se traza tramo a tramo al recorrerla y cada nodo
   (rombo simple, eco lejano del Hero) encadena un rol. Piloto F1 del motor
   de scroll: la década se erige en SCRUB (el eje crece con el scroll y
   retrocede al subir), no por umbral. Ayuda a recorrer, no estorba.
   Los años son el dato-ancla (§5): encienden a terracota al hover. */

/* Orden cronológico DESCENDENTE estricto: un eje temporal no monótono
   rompe la metáfora. Lo reciente pesa (§2); Crown brilla en su clímax. */
const ROLES = [
  {
    year: "2026",
    range: "2026 – actualidad",
    rol: "Proyecto propio · E-commerce B2C",
    org: "Diseño y operación de principio a fin",
    logo: { id: "propio", text: "◆" },
    desc: (
      <>
        Nicho con análisis de datos, <strong>automatización con IA</strong>,
        pricing y canal. Entorno donde aplico las mismas capacidades que
        desarrollo profesionalmente, <strong>de principio a fin</strong>.
      </>
    ),
  },
  {
    year: "2025",
    range: "dic. 2025 – actualidad",
    rol: "Coordinador de servicios técnicos",
    org: "Crown Lift Trucks",
    logo: { id: "crown", text: "CR" },
    desc: (
      <>
        <strong>Coordino un equipo técnico</strong> y la planificación de sus
        intervenciones; asignación de trabajo, comunicación del equipo y
        seguimiento contable. Por iniciativa propia{" "}
        <strong>diseñé un sistema de asignación inteligente de órdenes</strong>{" "}
        (<a href="#proyecto">ver Atlas</a>).
      </>
    ),
  },
  {
    year: "2021",
    range: "feb. 2021 – sept. 2024",
    rol: "Sales Specialist",
    org: "Beral Projects",
    logo: { id: "beral", text: "BP" },
    desc: (
      <>
        Ventas y postventa de cartera B2B, contenido web, apoyo a marketing
        audiovisual, <strong>estrategia comercial</strong> y contabilidad.{" "}
        <strong>
          Superé los <span className="fire">2 M€</span> en ventas
        </strong>{" "}
        liderando la estrategia con clientes.
      </>
    ),
  },
];

/* mismas raíces, monótonas con el eje (descendente) */
const RAICES = [
  { year: "2019–20", rol: "Socio fundador · Productor audiovisual · MalRai Studio", nota: "Comunicación digital, guion, edición, producción." },
  { year: "2018–19", rol: "Business Consultant · Ondas System", nota: "Estrategia comercial B2B para pymes, para Vodafone en punto de venta. Entre los consultores mejor valorados." },
  { year: "2016", rol: "Ayudante de producción · Produccions Antàrtida (TV)", nota: "Concurso infantil Picalletres." },
];

function ExpItem({ item }: { item: (typeof ROLES)[number] }) {
  return (
    <li className="exp__item">
      <span className="exp__seg" data-anim aria-hidden="true" />
      {/* el motor escala el envoltorio neutro; el rombo (rotate) ni se toca */}
      <span className="exp__nodo" data-anim aria-hidden="true">
        <span className="exp__nodo-rombo" />
      </span>
      <div data-anim>
        <p className="exp__year"><span className="fire">{item.year}</span></p>
        <span className="exp__range">{item.range}</span>
      </div>
      <div className="exp__body" data-anim>
        <h3 className="exp__rol">{item.rol}</h3>
        <span className="exp__org">
          {/* logo: sustituir el slot por <img src="/logos/{id}.svg" alt="" /> */}
          <i className="logo-slot logo-slot--sm" data-logo={item.logo.id} aria-hidden="true">
            {item.logo.text}
          </i>
          {item.org}
        </span>
        <p className="exp__desc">{item.desc}</p>
      </div>
    </li>
  );
}

export default function Experiencia() {
  /* Piloto F1: una escena de scrub por tramo. Cada item erige su segmento
     mientras cruza el tercio bajo del viewport; el nodo asoma a medio trazo
     y año + cuerpo se alzan después. Reversible por construcción (scrub). */
  const ref = useScrollScene<HTMLElement>(({ root, gsap, scrub }) => {
    for (const item of gsap.utils.toArray<HTMLElement>(".exp__item", root)) {
      gsap
        .timeline({
          defaults: { ease: "none" }, /* acompaña: el scroll es la línea de tiempo */
          scrollTrigger: { trigger: item, start: "top 88%", end: "top 42%", scrub },
        })
        .from(item.querySelector(".exp__seg"), {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1,
        }, 0)
        .from(item.querySelector(".exp__nodo"), { scale: 0, duration: 0.3 }, 0.15)
        .from(item.querySelectorAll(":scope > div"), {
          y: 18,
          opacity: 0,
          duration: 0.55,
          stagger: 0.15,
        }, 0.25);
    }
  });

  return (
    <section ref={ref} className="viñeta viñeta--clara" id="experiencia" data-bar="light">
      <div className="viñeta__inner">
        <h2 className="sect-label">
          <i className="sect-glifo" aria-hidden="true">{GLIFOS["experiencia"]}</i>
          Experiencia
        </h2>
        <ul className="exp__list">
          {ROLES.map((r) => (
            <ExpItem key={r.year} item={r} />
          ))}
        </ul>
        <ul className="exp__raices">
          {RAICES.map((r) => (
            <li key={r.year} className="exp__raiz">
              <b>{r.year}</b>
              <span>{r.rol}</span>
              <i>{r.nota}</i>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
