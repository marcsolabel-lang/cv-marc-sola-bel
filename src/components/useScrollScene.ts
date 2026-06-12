"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* MOTOR DE SCROLL (F1 · DIRECCION-SCROLL-NARRATIVA) — GSAP + ScrollTrigger.
   Elegido por el criterio del programa: las secuencias de F2 piden pinning y
   scrub encadenado (Atlas), y un único motor evita dos modelos mentales.
   Detalle y receta de uso en docs/dev/MOTOR-SCROLL.md.

   Leyes que este hook hace cumplir (no negociables):
   - El reposo del markup/CSS ES el estado final: el motor solo introduce los
     estados iniciales/intermedios (tweens `from`). Sin JS no pasa nada y la
     página queda completa.
   - `prefers-reduced-motion: reduce` ⇒ el motor no construye nada; si la
     preferencia cambia en vivo, gsap.matchMedia revierte los estilos inline
     y el documento vuelve solo al reposo.
   - Solo `transform` y `opacity`, y solo sobre elementos `[data-anim]` cuyo
     reposo sea neutro (transform none, opacidad 1) — así la garantía de
     impresión de globals.css puede anularlo todo con seguridad. Si una pieza
     necesita transform de reposo (rombo rotado), se envuelve y el motor
     anima el envoltorio neutro: GSAP pliega las propiedades individuales
     (rotate/scale) en su matriz y las dejaría a `none`.
   - Scrub reversible y sin secuestrar el scroll nativo: nada de
     normalizeScroll ni smooth-scroll artificial. */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  /* El colapso de la barra de URL en móvil dispara resizes de solo-altura;
     recalcular ahí provoca saltos. Mobile-first: se ignoran. */
  ScrollTrigger.config({ ignoreMobileResize: true });
}

type SceneArgs = {
  /** raíz de la escena (la sección); scopear aquí todos los querySelector */
  root: HTMLElement;
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  /** inercia del scrub en segundos — token --scrub-suave de globals.css */
  scrub: number;
};

/** Lee un token numérico de movimiento desde :root (globals.css manda). */
function leerToken(nombre: string, porDefecto: number): number {
  const bruto = getComputedStyle(document.documentElement).getPropertyValue(nombre);
  const n = parseFloat(bruto);
  return Number.isFinite(n) ? n : porDefecto;
}

/* Construye una escena scroll-driven ligada a una sección. El build se
   ejecuta solo con motion permitido; el cleanup revierte TODO inline. */
export function useScrollScene<T extends HTMLElement>(
  build: (args: SceneArgs) => void
) {
  const ref = useRef<T | null>(null);
  /* latest-ref: la escena se monta una vez pero usa siempre el build más
     reciente si matchMedia re-ejecuta (cambio de preferencia en vivo) */
  const buildRef = useRef(build);
  useEffect(() => {
    buildRef.current = build;
  });

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia(root);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      buildRef.current({
        root,
        gsap,
        ScrollTrigger,
        scrub: leerToken("--scrub-suave", 0.4),
      });
    });
    return () => mm.revert();
  }, []);

  return ref;
}
