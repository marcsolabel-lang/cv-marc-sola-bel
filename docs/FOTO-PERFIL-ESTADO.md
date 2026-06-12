# Foto de perfil (viñeta 3 · Sobre mí) — estado técnico para el rediseño

> **ACTUALIZACIÓN 2026-06-12 (noche): el rediseño ya está implementado.** El tratamiento
> vigente es "retrato dentro del sistema" + fondo duotono con sujeto siempre a color:
> tres capas (fondo de la foto en duotono terracota/negro que aterriza en color al hover ·
> líneas-nodo del sistema que conectan la timeline con el marco · sujeto recortado SIEMPRE
> a color pleno por delante). Sin JS — sigue siendo server component; el gesto es CSS puro.
> La fuente de verdad es el código: `src/components/vinetas/FotoPerfil.tsx` (geometría de
> líneas/nodo parametrizada en constantes) + bloque "Marco técnico" de
> `src/components/vinetas/vinetas.css` (intensidad del duotono en `--duo-tinte`/`--duo-luz`).
> El recorte `public/foto-perfil-cut.png` se regeneró con rembg (matting, sin halos);
> pipeline reproducible en `scripts/recortar-perfil.mjs`. Táctil y reduced-motion muestran
> el estado final (fondo a color, nodo encendido). Lo que sigue abajo describe el **estado
> base previo** sobre el que se integró — vale como historia y contexto del marco.

> Documento de handoff hacia Claude Design. Refleja el **estado base** tras revertir el
> tratamiento de profundidad (2026-06-12): el tilt 3D y el pop-out/ampliación del sujeto
> desvirtuaban la viñeta y se retiraron. Lo que queda es el mínimo sólido y canónico.
> El rediseño que salga de Design se integrará sobre esta base.

---

## 1. Qué hay ahora (estado base)

La foto terracota en un **marco técnico**: fondo crema `#FAF8F6` con cuadrícula tenue
terracota (22px), **4 esquinas terracota** (16×16, trazo 2px — el mismo idioma de esquinas
que el CTA del email en Contacto), sombra sobria, y **hover b/n→color** (la foto vive en
escala de grises y revela color al pasar el cursor). Nada más: sin tilt, sin parallax,
sin pop-out, sin zoom ni blur.

**Qué se revirtió** (para no reintroducirlo tal cual): tilt 3D que seguía al cursor
(±6.5°, `perspective: 900px`), esquinas flotando en plano cercano (`translateZ(26px)`),
y al hover un pop-out donde el fondo se hundía (`scale(1.18)` + `blur(2.5px)`) y un PNG
del sujeto recortado se ampliaba a `scale(1.45)` sobresaliendo del marco por arriba
(`clip-path: inset(-22% 0 0 0)`). El problema: la **ampliación al interactuar
desvirtuaba la viñeta**.

---

## 2. Estructura JSX

`src/components/vinetas/SobreMi.tsx` (client component — el árbol de convergencia mide
el DOM) compone la viñeta:

```
<section .viñeta .viñeta--clara #sobre-mi data-bar="light">
  └ .viñeta__inner
     ├ h2 .sect-label  (glifo + "Sobre mí")
     └ .sobremi__grid              ← rejilla de la viñeta (ver §3)
        ├ .sobremi__col            ← columna izquierda
        │   ├ <FotoPerfil />       ← LA FOTO (este encargo)
        │   └ .arbol               ← árbol de convergencia (4 contextos →
        │                            nodos rombo → "Pienso en sistemas.")
        │                            NO SE TOCA en el rediseño de la foto
        └ .sobremi__text           ← columna derecha: los 3 párrafos
```

`src/components/vinetas/FotoPerfil.tsx` (server component, **sin JS**) emite:

```
<figure .foto-marco>
  ├ <span .fcorner .fcorner--tl/tr/bl/br>   ← 4 esquinas (aria-hidden)
  └ <span .foto-marco__clip>                ← capa de recorte (overflow hidden)
     └ <Image next/image
         src="/foto-perfil.jpg" alt="Marc Sola Bel"
         fill sizes="(max-width: 820px) 240px, 300px"
         .foto-marco__img>
```

Si el rediseño necesita JS (cursor, scroll, estado), el componente vuelve a llevar
`"use client"` — como estaba antes de la reversión. No hay impedimento.

---

## 3. CSS y composición

Todo vive en `src/components/vinetas/vinetas.css` (bloque "Marco técnico de la foto",
hoy ≈ líneas 18-55, justo después de `.sobremi__grid`).

**Rejilla de la viñeta (§6.3, tercios foto-izquierda / texto-derecha):**

```css
.sobremi__grid {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);   /* ≈ tercio / dos tercios */
  column-gap: clamp(2rem, 6vw, 6rem);
  align-items: start;
}
@media (max-width: 820px) {
  .sobremi__grid { grid-template-columns: 1fr; row-gap: 2.6rem; }  /* apila */
}
```

**La foto (estado base):**

| Clase | Qué controla |
|---|---|
| `.foto-marco` | `<figure>` raíz. `max-width: 300px` (240px ≤820px) · `aspect-ratio: 4/5` · `margin-bottom: clamp(2.2rem, 4.5vh, 3rem)` (separa del árbol) · fondo crema+cuadrícula · sombra `0 14px 34px -16px rgba(10,10,10,0.3)` |
| `.foto-marco__clip` | capa interior `inset: 0; overflow: hidden` — la foto recorta aquí, las esquinas quedan fuera del clip |
| `.foto-marco img` | `object-fit: cover; object-position: center 28%` (el rostro manda en el encuadre) · `filter: grayscale(1)` · `transition: filter var(--dur-slow)` |
| `.foto-marco:hover img` | `filter: none` → revela color |
| `.fcorner--tl/tr/bl/br` | esquinas 16×16, borde 2px terracota, `z-index: 1` |

---

## 4. Tokens que usa (de `src/app/globals.css` — no duplicar valores)

- `--terracotta: #C0542A` — esquinas, cuadrícula (en rgba), color de marca.
- `--dur-slow: 400ms` · `--ease-out: cubic-bezier(0.16,1,0.3,1)` — transiciones.
- Crema del marco `#FAF8F6` — valor local del marco (no es token global).
- Tipografía: la foto no lleva texto. Si el rediseño añade caption/etiqueta:
  `--font-banner` (Oswald) para metadatos, `--fs-meta: 0.72rem`.
- Radios: `--radius: 0px` — **esquinas vivas en toda la web** (§3). El marco es rectangular.
- Fondo de la viñeta: clara (`--white`), texto `--ink`.

---

## 5. Restricciones del sistema (ley — el rediseño las respeta)

- **§7 · solo DOS imágenes en toda la web**: esta foto + las capturas de Atlas. El
  rediseño no añade más imágenes (ni texturas fotográficas de relleno).
- **§7 · b/n→color SOLO en la foto** (imagen humana/evocadora). Nunca en las capturas
  de Atlas (imágenes-prueba, siempre nítidas). El revelado b/n→color es el gesto
  canónico de esta foto (§6.3: "Interacción: hover b/n→color en la foto").
- **§0 · calibración**: Sobre mí es CREDIBILIDAD — metáfora contenida, al servicio de
  la lectura rápida de los 3 párrafos. *"Un gesto; después, quieto."* El tratamiento
  de la foto NO puede convertirse en un pico que compita con Hero/Cita/Atlas.
- **§3 · tokens**: nada a pelo; color/duración/easing salen de los tokens.
- **Accesibilidad**: `alt="Marc Sola Bel"` se conserva; esquinas decorativas con
  `aria-hidden`; AA en cualquier texto que se añada sobre el marco.
- La **foto está decidida**: `public/foto-perfil.jpg` (terracota). No se sustituye.

---

## 6. Comportamiento actual (estado base)

| Contexto | Comportamiento |
|---|---|
| **Hover (puntero fino)** | la foto pasa de b/n a color (fundido 400ms). Único efecto. |
| **Táctil** | sin hover: la foto queda en b/n (en algunos navegadores el tap dispara `:hover` y revela color). Comportamiento heredado del diseño original — el rediseño puede decidir algo mejor para táctil. |
| **Reduced-motion** | sin excepciones necesarias: lo único animado es un fundido de color (no movimiento). Si el rediseño añade transforms/parallax, debe volver el bloque `@media (prefers-reduced-motion: reduce)`. |
| **360px** | grid apilada (1 columna desde ≤820px); foto `max-width: 240px`, arriba de la columna; texto debajo. |
| **768px** | igual que 360 (sigue ≤820px): apilada, foto 240px. |
| **1440px** | dos columnas 4fr/7fr; foto 300px arriba-izquierda, árbol debajo, texto a la derecha. |
| **Sin JS** | la foto es server component: renderiza completa sin JavaScript. |

---

## 7. Assets — estado e inventario

| Asset | Estado | Notas |
|---|---|---|
| `public/foto-perfil.jpg` | **EN USO** (la única imagen que renderiza la viñeta) | 1200×1600 RGB · ~82 KB · JPEG comprimido de WhatsApp → **algo blando**. Sirve, pero si el rediseño quiere más calidad, conviene re-export con menos compresión / denoise+nitidez suaves, misma identidad. Encuadre actual `center 28%`. |
| `public/foto-perfil-cut.png` | **HUÉRFANO** tras la reversión (era la capa del pop-out) | 900×1200 RGBA · ~914 KB. Candidato a eliminar; **no borrado** por si el rediseño necesita un sujeto recortado. |
| `scripts/recortar-perfil.mjs` | **SIN USO** tras la reversión | Pipeline `sharp` (devDependency) que genera el recorte: BFS desde los bordes con referencia de fondo + escudo central + feather. Candidato a eliminar; **no borrado** — si el rediseño necesita un recorte (incluso con otros parámetros), este script es el punto de partida: `node scripts/recortar-perfil.mjs [entrada] [salida]`. |
| `sharp` (devDependency) | solo lo usa el script | si el script se va, puede irse con él. |

---

## 8. Cómo integrar el rediseño (cuando llegue de Design)

1. El rediseño llega como HTML/CSS/JS vivo de Design → se **porta** a
   `FotoPerfil.tsx` + bloque CSS en `vinetas.css` (o un `foto.css` propio si crece),
   siguiendo el patrón de port del repo (CSS scopeado, tokens reutilizados,
   `next/font` ya carga Bricolage/Oswald/Cormorant).
2. La interfaz con la viñeta es estable: `SobreMi.tsx` solo hace `<FotoPerfil />`
   dentro de `.sobremi__col`. Mientras el componente respete `max-width` razonable
   y el `margin-bottom` hacia el árbol, nada más cambia.
3. Si necesita un recorte del sujeto: regenerar con `recortar-perfil.mjs`
   (ajustando `TOL_REF`/escudo si cambia el tratamiento de la foto).
4. Verificación mínima: `npm run build` (TS+lint) + revisar 360/768/1440 +
   reduced-motion + que el §7 (b/n→color solo aquí) se mantiene.
