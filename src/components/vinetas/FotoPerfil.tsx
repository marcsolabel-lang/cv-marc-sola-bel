import Image from "next/image";
import "./vinetas.css";

/* FOTO DE PERFIL (§6.3/§7 · Sobre mí) — RETRATO DENTRO DEL SISTEMA
   (rev. 2026-06-12 noche). Dos capas: el FONDO de la foto en duotono
   terracota/negro que aterriza en color al hover, y el SUJETO recortado
   por delante, SIEMPRE a color pleno — la persona sobre la estructura.
   La línea de la timeline entra desde abajo hacia un nodo-rombo sobre el
   borde inferior del marco; al hover el nodo se enciende y la línea gana
   intensidad. Sin JS: el gesto es CSS puro (sigue siendo server component).
   El §7 se mantiene: foto base + recorte = la misma imagen lógica (el
   retrato); b/n→color sigue siendo exclusivo de esta foto (solo el fondo). */

/* ── Parámetros (ajuste fino aquí; intensidad del duotono en vinetas.css) ── */
const FOTO_FONDO = "/foto-perfil.jpg"; /* capa fondo — recibe el duotono */
const FOTO_SUJETO = "/foto-perfil-cut.png"; /* sujeto recortado — siempre color */

/* Geometría del sistema en unidades del viewBox 240×300 (marco 4:5).
   Calibrada contra el encuadre actual (object-position center 28%): la
   línea queda oculta tras la camisa, emerge en el hombro izquierdo, quiebra
   a 45° y muere detrás del rostro. Si cambia la foto o el encuadre,
   recalibrar estos valores. */
const NODO_X = 14; /* eje X del nodo: prolonga el tronco del árbol (x=14) */
const CODO_Y = 184; /* altura donde la línea emerge del hombro y quiebra */
const CODO = 34; /* avance del tramo a 45° (igual en X que en Y) */
const FIN_X = 104; /* la horizontal muere aquí, detrás del rostro */
const CONECTOR = 34; /* caída hacia la timeline (se desvanece, no necesita tocar) */

const LINEA = `M ${NODO_X} 300 V ${CODO_Y} L ${NODO_X + CODO} ${CODO_Y - CODO} H ${FIN_X}`;

export default function FotoPerfil() {
  return (
    <figure className="foto-marco">
      <span className="fcorner fcorner--tl" aria-hidden="true" />
      <span className="fcorner fcorner--tr" aria-hidden="true" />
      <span className="fcorner fcorner--bl" aria-hidden="true" />
      <span className="fcorner fcorner--br" aria-hidden="true" />

      {/* capa 1 · fondo: la foto completa, en duotono terracota/negro */}
      <span className="foto-marco__fondo" aria-hidden="true">
        <Image
          src={FOTO_FONDO}
          alt=""
          fill
          sizes="(max-width: 820px) 240px, 300px"
        />
      </span>

      {/* capa 2 · el sistema: la línea de la timeline entra hacia el nodo */}
      <svg className="foto-sistema" viewBox="0 0 240 300" aria-hidden="true">
        <defs>
          <linearGradient
            id="foto-conector-fade"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="300"
            x2="0"
            y2={300 + CONECTOR}
          >
            <stop className="foto-sistema__fade-a" offset="0" />
            <stop className="foto-sistema__fade-b" offset="1" />
          </linearGradient>
        </defs>
        <line
          className="foto-sistema__conector"
          x1={NODO_X}
          y1="300"
          x2={NODO_X}
          y2={300 + CONECTOR}
        />
        <path className="foto-sistema__linea" d={LINEA} />
      </svg>

      {/* capa 3 · sujeto: SIEMPRE a color pleno, delante de las líneas */}
      <span className="foto-marco__sujeto">
        <Image
          src={FOTO_SUJETO}
          alt="Marc Sola Bel"
          fill
          sizes="(max-width: 820px) 240px, 300px"
        />
      </span>

      {/* nodo de conexión: vive en el nivel del marco (como las esquinas) —
          bisecado por el borde inferior; sobre el sujeto, que en esa zona
          tocaría el borde y lo ocultaría */}
      <span
        className="foto-nodo"
        style={{ left: `${(NODO_X / 240) * 100}%` }}
        aria-hidden="true"
      />
    </figure>
  );
}
