"use client";

import { useEffect, useState } from "react";

/* Barra superior (§4, modelo Yann Novak) + índice de pantalla completa.
   Fija y adaptable al fondo: lee data-bar de la sección que pasa por debajo. */

const ENTRIES = [
  { href: "#hero", num: "01", label: "Inicio", icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2 L30 16 L16 30 L2 16 Z" /><path d="M16 2 V30 M2 16 H30" /></svg>
    ) },
  { href: "#sobre-mi", num: "02", label: "Sobre mí", icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="12.5" /><circle className="dot" cx="16" cy="16" r="3" /></svg>
    ) },
  { href: "#formacion", num: "03", label: "Formación", icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3 L29 28 L3 28 Z" /><path d="M9 21 H23" /></svg>
    ) },
  { href: "#experiencia", num: "04", label: "Experiencia", icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 10 H24 M4 16 H28 M4 22 H16" /></svg>
    ) },
  { href: "#liderazgo", num: "05", label: "Liderazgo", icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 28 H28" /><path d="M8 28 V21 M16 28 V13 M24 28 V6" /></svg>
    ) },
  { href: "#proyecto", num: "06", label: "Proyecto", icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3 L27 9.5 V22.5 L16 29 L5 22.5 V9.5 Z" /><circle className="dot" cx="16" cy="16" r="2.4" /></svg>
    ) },
  { href: "#contacto", num: "07", label: "Contacto", icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="11" cy="21" r="3.2" /><path d="M13.5 18.5 L27 5 M27 5 H18.5 M27 5 V13.5" /></svg>
    ) },
];

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  /* Tema adaptable: una franja fina bajo la barra decide claro/oscuro */
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-bar]"));
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setLight(e.target.getAttribute("data-bar") === "light");
        }
      },
      { rootMargin: "-1% 0px -97% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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

      <div className={`navscreen ${open ? "open" : ""}`} id="navscreen" aria-hidden={!open}>
        <nav className="navscreen__inner" aria-label="Índice de secciones">
          <p className="navscreen__eyebrow">Índice</p>
          <ul className="navscreen__list">
            {ENTRIES.map((e) => (
              <li key={e.href}>
                <a href={e.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                  <span className="nav-ic">{e.icon}</span>
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
