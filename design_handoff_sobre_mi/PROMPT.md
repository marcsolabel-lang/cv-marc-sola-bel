# PROMPT PARA CLAUDE CODE — Integrar la viñeta «SOBRE MÍ» (retrato + entramado neuronal)

> Copia esta carpeta (`design_handoff_sobre_mi/`) a la raíz del repo `cv-linkedin` y pega
> el prompt de abajo en Claude Code. Todo lo que necesita está aquí dentro.

---

Integra la sección **«Sobre mí»** del CV one-page siguiendo la referencia de diseño incluida en
`design_handoff_sobre_mi/Sobre mí.html`. Ese archivo es un **prototipo HTML de alta fidelidad**:
muestra el aspecto y el comportamiento finales, pero NO es código de producción para copiar tal
cual. Tu tarea es **recrearlo dentro del entorno y los patrones existentes de este repo** (mismo
stack, misma organización de CSS/JS que las demás secciones del sitio).

## 0 · Antes de tocar nada
1. Explora el repo: identifica cómo están construidas las secciones existentes (Hero, Cita,
   Atlas/Crown Planner), dónde viven los tokens de color/tipografía y cómo se registran las
   animaciones de entrada por viewport. **Reutiliza esos mecanismos**, no inventes otros.
2. Abre `design_handoff_sobre_mi/Sobre mí.html` en un navegador para ver la referencia viva
   (entrada, hover, parallax, pulsos). Lee su CSS/JS: está comentado por bloques.
3. La foto está en `design_handoff_sobre_mi/assets/marc.jpg` — muévela a la carpeta de assets
   del repo con el resto de imágenes.

## 1 · Qué es esta sección
Acto 2 del CV (credibilidad) · **fondo blanco puro #FFFFFF** · dos columnas:
- **Izquierda (310–400px):** retrato con placa terracota offset + entramado neuronal que
  desciende (la trayectoria como sistema).
- **Derecha:** prosa. Eyebrow «SOBRE MÍ», título-síntesis y 3 párrafos EXACTOS (ver §4).

Significado del entramado: **cada nodo = una etapa profesional; cada conexión = aprendizaje que
se transfiere**. El retrato es el soma del que crece la red, que culmina en «Pienso en sistemas.»

## 2 · Tokens (deben coincidir con los del repo; si difieren, ganan los del repo)
- Tinta `#0A0A0A` · terracota-vivo `#C0542A` (acentos/gráfica) · terracota-profundo `#A8421E`
  (texto AA sobre blanco) · terracota-tenue `#E8C7B6` (neuronas de fondo)
- Texto: principal `#141210` · secundario `#6B6560` · meta `#9A938B` · hairline `rgba(10,10,10,.12)`
- Tipos: Bricolage Grotesque (display/prosa) · Oswald (labels uppercase tracked) 
- Easing global: `cubic-bezier(0.16,1,0.3,1)` · esquinas vivas (radius 0) · base-8

## 3 · Anatomía de la columna izquierda
1. **Retrato**: placa blanca (padding 11px, keyline hairline, sombra suave) con la foto
   (aspect-ratio 4/4.2, `object-position: 50% 14%`) y base con nombre + regla terracota 30px +
   «RETRATO». Detrás, **placa terracota** `#C0542A` desplazada `translate(15px,15px)` con sombra
   terracota — es el «puerto» del que cuelga la red y la capa de profundidad.
2. **Viñeta de la foto**: overlay radial (oscuro + terracota) con centro transparente —
   el rostro SIEMPRE a color pleno; opacidad reposo `0.4` (recalibrada para blanco).
3. **Entramado neuronal** (SVG `viewBox 0 0 380 440`, copiar paths exactos de la referencia):
   - 2 raíces que salen del borde inferior de la placa → primer nodo.
   - Espina cronológica serpenteante: 4 nodos-rombo 14px (Comunicación audiovisual → Ventas B2B
     → Dirección comercial → Coordinación + automatización), labels Oswald 0.78rem alternando
     lado izq/dcha.
   - 3 dendritas cruzadas (opacity .32, stroke fino) = transferencia entre etapas no contiguas.
   - 5 rombos de fondo `#E8C7B6` (profundidad, plano trasero).
   - Nodo final 22px + «Pienso en sistemas.» (Bricolage 700, ~1.6rem).
   - 5 **pulsos viajeros** (círculos r≈3 con `animateMotion` SMIL sobre los paths, 5.5–7.5s).

## 4 · Texto — EXACTO, sin parafrasear
- Eyebrow: `SOBRE MÍ`
- Título: `Una década, contextos muy distintos, un hilo constante.`
- Los 3 párrafos van VERBATIM como están en `Sobre mí.html` (son los del Documento A §Sobre mí).
- **Regla rectora del color en texto**: terracota-profundo SOLO en `sistemas` (párr. 1) y
  `problema` (en «vengo del problema»). Ninguna otra palabra encendida.

## 5 · Movimiento
**Entrada (al entrar en viewport, una vez, threshold ~0.25):**
placa sube+aparece (.7s) → placa terracota aparece (+.15s) → foto pasa de **b/n a color** y de
scale(1.05) a 1 (1.3s, es la intensidad «notable» del sistema) → raíces y dendritas se DIBUJAN
en cascada (stroke-dashoffset con `pathLength=1`, .6s→1.85s de delay) → cada nodo-rombo hace
scale-in al llegar su dendrita, su label aparece justo después → nodo final + frase al final
(~2.4s). Copiar tiempos exactos del bloque `MOVIMIENTO` de la referencia.

**Reposo (vida):** deriva muy lenta de nodos (translate ±3–5px, ciclos 11–16s desfasados),
respiración de las neuronas de fondo (opacity .35↔.62, 9s) y los pulsos SMIL viajando.

**Parallax (solo `hover:hover and pointer:fine`):** en `pointermove` sobre la sección, mover por
transform: placa terracota ×5px, placa ×−4px, SVG ×3px, nodos ×7px (variables `--mx/--my`
normalizadas −1..1). Reset a 0 en `pointerleave`.

**Hover del retrato:** viñeta baja a opacity .12 (el muro «aterriza» en color) y la regla
terracota se extiende scaleX(2.2). El sujeto no cambia.

## 6 · Reglas de ingeniería — INNEGOCIABLES (heredadas del resto del sitio)
1. **Reposo siempre visible**: los estados pre-animación (opacity 0, etc.) solo existen bajo una
   clase de armado (`html.anim`) que JS añade ANTES de la entrada y **retira ~3s después de
   dispararla** («settle»). Sin JS, con `prefers-reduced-motion: reduce`, en impresión/PDF o si
   el observer nunca dispara → la sección se ve completa en su estado final.
2. **Garantía anti-bloqueo**: además del IntersectionObserver, un `setTimeout(~1.7s)` dispara la
   entrada si el observer no lo hizo.
3. Animar **solo `transform` y `opacity`** (+ `stroke-dashoffset` para el dibujo de dendritas).
   Nada de animar layout, filtros caros ni sombras.
4. `prefers-reduced-motion: reduce` → sin entrada, sin deriva, sin parallax y pulsos SMIL
   ocultos (`display:none`). Todo legible y quieto.
5. **NO portar el panel «Tweaks» ni React/Babel** de la referencia: son herramienta de
   exploración. La sección de producción es HTML/CSS/JS vanilla (o el patrón del repo).
   Valores elegidos ya fijados: fondo Blanco · viñeta 0.4 · vida en reposo ON · acento #C0542A.

## 7 · Responsive
- ≤900px: una columna; el rail (retrato+red) arriba, max-width 440px; prosa debajo.
- ≤560px: labels de nodos 0.7rem (max-width 120px), frase final ~1.25rem, padding lateral 18px.
- El SVG escala por viewBox; los nodos HTML van posicionados en % sobre el contenedor `.net`
  (aspect-ratio 380/440) — mantener ese acoplamiento para que red y nodos no se desalineen.

## 8 · Criterio de aceptación
- [ ] Pixel-fiel a la referencia en 1440 / 768 / 360 (compárala abierta en el navegador).
- [ ] Texto idéntico; solo «sistemas» y «problema» en terracota.
- [ ] Entrada se dibuja una vez y asienta; recarga en mitad de scroll nunca deja nada invisible.
- [ ] Impresión (Ctrl+P): sección completa y estática.
- [ ] `prefers-reduced-motion`: estática y completa.
- [ ] Lighthouse: sin layout shifts causados por la sección; animaciones compuestas (sin jank).
- [ ] La sección encaja en el flujo del one-page entre «Cita» y «Formación» (Acto 2, fondo claro)
      sin romper la navegación ni los estilos globales existentes.
