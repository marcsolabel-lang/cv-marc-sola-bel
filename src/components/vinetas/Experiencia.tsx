"use client";

import { useInViewOnce } from "../useInViewOnce";
import { GLIFOS } from "../glifos";
import "./vinetas.css";

/* EXPERIENCIA (§6.5 · credibilidad, la más larga) — metáfora: LA DÉCADA
   QUE SE ERIGE. El eje se traza tramo a tramo al recorrerla y cada nodo
   (rombo simple, eco lejano del Hero) encadena un rol. La animación es
   progressive disclosure ligada al scroll: ayuda a recorrer, no estorba.
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

function ExpItem({ item, delay }: { item: (typeof ROLES)[number]; delay: number }) {
  const { ref, inView } = useInViewOnce<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={`exp__item ${inView ? "in" : ""}`}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <span className="exp__seg" aria-hidden="true" />
      <span className="exp__nodo" aria-hidden="true" />
      <div>
        <p className="exp__year"><span className="fire">{item.year}</span></p>
        <span className="exp__range">{item.range}</span>
      </div>
      <div className="exp__body">
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
  return (
    <section className="viñeta viñeta--clara" id="experiencia" data-bar="light">
      <div className="viñeta__inner">
        <h2 className="sect-label">
          <i className="sect-glifo" aria-hidden="true">{GLIFOS["experiencia"]}</i>
          Experiencia
        </h2>
        <ul className="exp__list">
          {ROLES.map((r, i) => (
            <ExpItem key={r.year} item={r} delay={i * 80} />
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
