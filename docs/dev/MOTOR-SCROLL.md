# Motor de scroll (F1) — decisión, API y receta

> Registro de la F1 del programa `docs/DIRECCION-SCROLL-NARRATIVA.md`,
> ejecutada el 2026-06-13 (encargo nocturno). Piloto verificado sobre
> Experiencia con `scripts/verifica-experiencia.mjs`.

---

## 1 · Decisión: GSAP + ScrollTrigger

El criterio del programa se aplicó tal cual: *«si las secuencias de F2 piden
pinning y scrub encadenado (Atlas lo pedirá), GSAP»*. Atlas pide traveling con
pinning entre pantallas y timelines encadenadas — eso en CSS scroll-driven
nativo exige coordinar `position: sticky` + `view-timeline` a mano y sin
timeline maestra. Se descartó además el modelo híbrido (nativo para
progresiones simples + GSAP para Atlas): dos motores son dos modelos mentales
y dos familias de bugs. **Un solo motor: `gsap` + `ScrollTrigger`**
(gratuito desde 3.13; instalado `gsap@^3.15`).

Revisable a futuro solo si GSAP diera problemas de presupuesto en móvil; el
piloto no los muestra (solo `transform`/`opacity`, compuestas en GPU).

## 2 · API: `useScrollScene` (src/components/useScrollScene.ts)

```tsx
const ref = useScrollScene<HTMLElement>(({ root, gsap, scrub }) => {
  // construir aquí timelines con scrollTrigger; scopear selectores a `root`
});
return <section ref={ref} …>
```

Qué garantiza el hook (las leyes del programa, ya cableadas):

- **Reduced-motion**: el build solo corre bajo
  `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. Si la
  preferencia cambia en vivo, gsap revierte los estilos inline y el documento
  vuelve solo a su reposo.
- **Cleanup**: `mm.revert()` al desmontar — ningún estilo inline sobrevive.
- **Mobile-first**: `ScrollTrigger.config({ ignoreMobileResize: true })`
  (el colapso de la barra de URL no recalcula ni salta).
- **Tokens**: la inercia del scrub llega como argumento `scrub`, leída del
  token `--scrub-suave` de `globals.css` (catálogo F1: presenta / acompaña /
  asienta, documentado junto a §3.5).

## 3 · Las tres reglas de toda escena (no negociables)

1. **El reposo del CSS es el estado final.** El motor solo introduce estados
   iniciales/intermedios con tweens `from`. Sin JS, con reduced-motion o si
   algo falla: página completa. Nada de clases `.in` ni estados ocultos en CSS.
2. **Solo `[data-anim]` con reposo neutro** (transform `none`, opacidad 1).
   La garantía de impresión de `globals.css` anula con `!important` cualquier
   estado intermedio sobre `[data-anim]`. Si una pieza necesita transform de
   reposo (el rombo rotado), **se envuelve**: el motor anima el envoltorio
   neutro. Ojo: no sirve la propiedad individual `rotate` — GSAP la pliega en
   su matriz y la deja a `none` (verificado en el piloto).
3. **Scrub con `ease: "none"`** (el scroll es la línea de tiempo) **y
   reversible por construcción**; jamás secuestrar el scroll nativo (nada de
   `normalizeScroll` ni smooth-scroll artificial).

## 4 · Receta para una secuencia F2

1. Markup con el estado final; `data-anim` en cada pieza que el motor toque.
2. Quitar del CSS los estados iniciales y transiciones de entrada antiguas
   (IO); el bloque reduced-motion de esa sección suele quedar vacío.
3. Escena en el componente: una timeline por unidad narrativa con
   `scrollTrigger: { trigger, start, end, scrub }`; posiciones relativas
   (`0.15`, `0.25`…) para encadenar; `stagger` para series.
   Para pinning (Atlas): `pin: true` + `end: "+=N%"` en la misma timeline.
4. Verificar con un script gemelo de `scripts/verifica-experiencia.mjs`:
   plegado bajo el fold → erigido tras recorrer → reversible al subir →
   reduced-motion completo → sin-JS completo, en 1440/768/360.
   (Playwright se instala con `npm i playwright --no-save`; ojo: cualquier
   `npm install` posterior lo poda, reinstalar si falta.)

## 5 · Piloto Experiencia (referencia viva)

`src/components/vinetas/Experiencia.tsx` — una escena de scrub por tramo de
la década: el segmento se erige (`scaleY` 0→1) mientras el item cruza la
franja 88 %→42 % del viewport, el nodo asoma a medio trazo y año + cuerpo se
alzan con stagger. 14/14 comprobaciones del script en verde (2026-06-13).
