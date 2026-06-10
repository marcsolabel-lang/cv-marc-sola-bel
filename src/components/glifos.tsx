/* Glifos del sistema (única fuente): el índice es la LEYENDA del mapa y
   cada sección lleva su eco junto a la etiqueta. Familia wireframe propia
   (trazo 1.5, terracota), cada glifo destila la metáfora de su viñeta. */

export const GLIFOS: Record<string, React.ReactNode> = {
  /* el poliedro del Hero */
  inicio: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 2 L30 16 L16 30 L2 16 Z" />
      <path d="M16 2 V30 M2 16 H30" />
    </svg>
  ),
  /* el árbol de convergencia: contextos que confluyen en un nodo */
  "sobre-mi": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M4 7 L19 16 M4 16 H19 M4 25 L19 16" />
      <path className="dot" d="M23 12 L27 16 L23 20 L19 16 Z" />
    </svg>
  ),
  /* el reloj de arena de «sistema» */
  cita: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7 5 H25 L16 16 Z" />
      <path d="M7 27 H25 L16 16 Z" />
    </svg>
  ),
  /* la escuadra sobre el papel de plano */
  formacion: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3 L29 28 L3 28 Z" />
      <path d="M9 21 H23" />
    </svg>
  ),
  /* la década que se erige: eje con nodos-rombo */
  experiencia: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3 V29" />
      <path className="dot" d="M16 7 L19 10 L16 13 L13 10 Z" />
      <path className="dot" d="M16 19 L19 22 L16 25 L13 22 Z" />
    </svg>
  ),
  /* la formación: miembros en retícula */
  liderazgo: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle className="dot" cx="8" cy="8" r="2" />
      <circle className="dot" cx="16" cy="8" r="2" />
      <circle className="dot" cx="24" cy="8" r="2" />
      <circle className="dot" cx="8" cy="16" r="2" />
      <circle className="dot" cx="16" cy="16" r="2" />
      <circle className="dot" cx="24" cy="16" r="2" />
      <circle className="dot" cx="8" cy="24" r="2" />
      <circle className="dot" cx="16" cy="24" r="2" />
      <circle className="dot" cx="24" cy="24" r="2" />
    </svg>
  ),
  /* la célula del sistema en marcha */
  proyecto: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3 L27 9.5 V22.5 L16 29 L5 22.5 V9.5 Z" />
      <circle className="dot" cx="16" cy="16" r="2.4" />
    </svg>
  ),
  /* el contacto que sale al exterior */
  contacto: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="11" cy="21" r="3.2" />
      <path d="M13.5 18.5 L27 5 M27 5 H18.5 M27 5 V13.5" />
    </svg>
  ),
};
