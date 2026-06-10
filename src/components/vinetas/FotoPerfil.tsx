"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import "./vinetas.css";

/* FOTO DE PERFIL (§6.3/§7 · foco de interacción de Sobre mí).
   Marco técnico con PROFUNDIDAD real: tilt 3D que sigue al cursor, las
   esquinas flotan en un plano más cercano (parallax interno) y la foto
   revela color al acercarse (§5 hover notable: b/n → color).
   Solo puntero fino; reduced-motion y táctil quedan estáticos. */

const MAX_TILT = 13; /* grados pico a pico (±6.5°): presencia sin teatro */

export default function FotoPerfil() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const marco = el.querySelector<HTMLElement>(".foto-marco");
    if (!marco) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      marco.style.setProperty("--ry", `${(nx * MAX_TILT).toFixed(2)}deg`);
      marco.style.setProperty("--rx", `${(-ny * MAX_TILT).toFixed(2)}deg`);
    };
    const onLeave = () => {
      marco.style.setProperty("--ry", "0deg");
      marco.style.setProperty("--rx", "0deg");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="foto3d">
      <figure className="foto-marco">
        <span className="fcorner fcorner--tl" aria-hidden="true" />
        <span className="fcorner fcorner--tr" aria-hidden="true" />
        <span className="fcorner fcorner--bl" aria-hidden="true" />
        <span className="fcorner fcorner--br" aria-hidden="true" />
        <span className="foto-marco__clip">
          <Image
            src="/foto-perfil.jpg"
            alt="Marc Sola Bel"
            fill
            sizes="(max-width: 820px) 240px, 300px"
            className="foto-marco__img"
          />
        </span>
        {/* el sujeto recortado: al contacto se despega del fondo y
            sobresale del marco por arriba (recorte: scripts/recortar-perfil.mjs;
            regenerar con la fotografía definitiva) */}
        <span className="foto-marco__sujeto" aria-hidden="true">
          <Image
            src="/foto-perfil-cut.png"
            alt=""
            fill
            sizes="(max-width: 820px) 240px, 300px"
            className="foto-marco__img foto-marco__img--sujeto"
          />
        </span>
      </figure>
    </div>
  );
}
