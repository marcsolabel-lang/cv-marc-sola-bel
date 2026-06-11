import Image from "next/image";
import "./vinetas.css";

/* FOTO DE PERFIL (§6.3/§7 · Sobre mí) — ESTADO BASE (rev. 2026-06-12).
   El tratamiento de profundidad (tilt 3D + pop-out del sujeto recortado)
   se revirtió: la ampliación al interactuar desvirtuaba la viñeta. Queda
   el mínimo sólido y canónico del §6.3: marco técnico de esquinas +
   hover b/n→color. Sin JS — ya no es client component.
   El rediseño del tratamiento llegará de Design; el contexto técnico
   para integrarlo vive en docs/FOTO-PERFIL-ESTADO.md. */

export default function FotoPerfil() {
  return (
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
    </figure>
  );
}
