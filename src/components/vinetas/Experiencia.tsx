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
    org: "En desarrollo · concebido y llevado por mí",
    logo: { id: "propio", text: "◆" },
    desc: (
      <>
        Selección de producto por datos de mercado reales, no por intuición.{" "}
        <strong>Automatización del canal con IA</strong> y precios por margen: el
        mismo criterio comercial que ejerzo cada día, aquí sin intermediarios.
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
        intervenciones: distribución de la carga, comunicación y seguimiento
        contable. Por iniciativa propia{" "}
        <strong>puse en pie el motor de asignación de órdenes</strong>{" "}
        que ves en <a href="#proyecto">Atlas</a>: un prototipo funcional, todavía no un despliegue oficial de la empresa.
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
        <strong>
          Más de <span className="fire">2 M€</span> vendidos en tres años
        </strong>{" "}
        a cartera B2B de ticket alto, ganados por asesoramiento y no por
        descuento. Postventa técnica, contenido web, marketing y estrategia
        comercial.
      </>
    ),
  },
];

/* raíces: sin conector de eje (a diferencia de ROLES), por eso Antàrtida se
   antepone aquí a propósito — es la más rica en contexto (Carles Porta,
   Picalletres, Crims) y se lee antes que el resto aunque no sea la más
   reciente. Las otras dos siguen en orden descendente. */
const RAICES = [
  { year: "2016", rol: "Ayudante de producción · Produccions Antàrtida (TV)", nota: "Concurso infantil Picalletres (TV3); apoyo a producción y contenidos." },
  { year: "2019–20", rol: "Socio fundador · Productor audiovisual · MalRai Studio", nota: "Comunicación digital, guion, edición, producción." },
  { year: "2018–19", rol: "Business Consultant · Ondas System", nota: "Estrategia comercial B2B para pymes, para Vodafone en punto de venta." },
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
