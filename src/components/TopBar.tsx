"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#hero",        label: "Inicio"      },
  { href: "#sobre-mi",    label: "Sobre mí"    },
  { href: "#formacion",   label: "Formación"   },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#liderazgo",   label: "Liderazgo"   },
  { href: "#proyecto",    label: "Proyecto"    },
  { href: "#contacto",    label: "Contacto"    },
];

export default function TopBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const closeKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const timer = setTimeout(() => {
      document.addEventListener("click", close);
      document.addEventListener("keydown", closeKey);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", closeKey);
    };
  }, [open]);

  return (
    <header className="topbar" aria-label="Barra de navegación">
      <span className="topbar__line" aria-hidden="true" />
      <span className="topbar__item topbar__name">Marc Sola Bel</span>
      <span className="topbar__item topbar__cv">CV</span>
      <span className="topbar__item topbar__years">2016—26</span>
      <div className="relative">
        <button
          type="button"
          className="topbar__menu"
          aria-expanded={open}
          aria-controls="menuList"
          onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        >
          [MENÚ]
        </button>
        <nav
          id="menuList"
          aria-label="Índice"
          className={`nav-menu${open ? " open" : ""}`}
        >
          {NAV_LINKS.map(({ href, label }, i) => (
            <a
              key={href}
              href={href}
              style={{ transitionDelay: open ? `${(0.02 + i * 0.03).toFixed(2)}s` : "0s" }}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
