"use client";

import { useEffect, useState } from "react";
import { GLIFOS } from "./glifos";

/* Barra superior (§4, modelo Yann Novak) + índice de pantalla completa.
   Fija y adaptable al fondo: lee data-bar de la sección que pasa por debajo.
   El índice es la leyenda del sistema: glifo · número · sección (8 entradas;
   la Cita entra como "Manifiesto", decisión 2026-06-10). */

const ENTRIES = [
  { href: "#hero",        num: "01", label: "Inicio",      glifo: "inicio" },
  { href: "#sobre-mi",    num: "02", label: "Sobre mí",    glifo: "sobre-mi" },
  { href: "#cita",        num: "03", label: "Manifiesto",  glifo: "cita" },
  { href: "#formacion",   num: "04", label: "Formación",   glifo: "formacion" },
  { href: "#experiencia", num: "05", label: "Experiencia", glifo: "experiencia" },
  { href: "#liderazgo",   num: "06", label: "Liderazgo",   glifo: "liderazgo" },
  { href: "#proyecto",    num: "07", label: "Proyecto",    glifo: "proyecto" },
  { href: "#contacto",    num: "08", label: "Contacto",    glifo: "contacto" },
];

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  /* Tema adaptable: en cada disparo se RECALCULA qué sección cruza la
     barra (geometría real, no el último evento — el orden de entries en
     scroll rápido producía temas desfasados) */
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-bar]"));
    if (!sections.length) return;
    const decide = () => {
      const y = 48; /* punto bajo la línea de la barra */
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) {
          setLight(s.getAttribute("data-bar") === "light");
          return;
        }
      }
    };
    const io = new IntersectionObserver(decide, { rootMargin: "-1% 0px -96% 0px", threshold: 0 });
    sections.forEach((s) => io.observe(s));
    window.addEventListener("resize", decide);
    decide();
    return () => {
      io.disconnect();
      window.removeEventListener("resize", decide);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    /* overlay a pantalla completa: el fondo no scrollea ni recibe foco */
    document.body.style.overflow = "hidden";
    const fondo = document.querySelectorAll<HTMLElement>("main");
    fondo.forEach((el) => el.setAttribute("inert", ""));
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      fondo.forEach((el) => el.removeAttribute("inert"));
    };
  }, [open]);

  return (
    <>
      <header
        className={`topbar ${light && !open ? "topbar--light" : ""} ${open ? "nav-open" : ""}`}
        aria-label="Barra de navegación"
      >
        <span className="topbar__line" aria-hidden="true" />
        <span className="topbar__item topbar__name">Marc Sola Bel</span>
        <span className="topbar__item topbar__cv">CV</span>
        <span className="topbar__item topbar__years">
          <span className="years__lbl">2016</span>
          <span className="years__axis" aria-hidden="true">
            <span className="yx-line" />
            <span className="yx-ticks"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></span>
            <span className="yx-dot" />
          </span>
          <span className="years__lbl">26</span>
        </span>
        <div className="topbar__menu-wrap">
          <button
            className="topbar__menu"
            type="button"
            aria-expanded={open}
            aria-controls="navscreen"
            onClick={() => setOpen(!open)}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </header>

      {/* inert cerrado: su contenedor scrolleable no debe recibir Tab (AUD-2) */}
      <div className={`navscreen ${open ? "open" : ""}`} id="navscreen" inert={!open}>
        <nav className="navscreen__inner" aria-label="Índice de secciones">
          <p className="navscreen__eyebrow">Índice</p>
          <ul className="navscreen__list">
            {ENTRIES.map((e) => (
              <li key={e.href}>
                <a href={e.href} onClick={() => setOpen(false)}>
                  <span className="nav-ic">{GLIFOS[e.glifo]}</span>
                  <span className="navscreen__num">{e.num}</span> {e.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
