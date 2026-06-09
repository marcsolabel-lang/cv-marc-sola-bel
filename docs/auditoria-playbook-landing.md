# PLAYBOOK — auditoría de la landing (reutilizable, agnóstico de modelo)

Plantilla destilada de la auditoría 2026-06-10. Para repetirla tras cambios
grandes (nuevos assets del Crown, rediseños de viñeta, propuestas aceptadas).

## 0. Principios

- **Dos fases estrictas.** PHASE A solo lectura (hallazgos formales).
  PHASE B aplica ÚNICAMENTE la clase decision-free. Nunca mezclarlas.
- **El doc-A v3 es el contrato**; el HTML vivo aprobado en Design manda
  sobre el doc cuando divergen (y la divergencia se REGISTRA, no se
  "corrige" en silencio). Las decisiones de docs/METAFORAS-VINETAS.md no se
  re-litigan.
- **Severidad honesta**: crítico / alto / medio / bajo. No fabricar
  hallazgos; separar defecto real de deuda registrada y de gusto.
- **En la duda sobre si un fix es decision-free: NO lo es.** A la tabla de
  pendientes con caminos y recomendación.

## 1. Pre-vuelo (leer en orden)

1. `docs/doc-A-construccion.md` — §0 calibración, §3 tokens, §5 reglas
   globales + mapa de palabras encendidas, §9 fallbacks/accesibilidad.
2. `docs/METAFORAS-VINETAS.md` — decisiones registradas (incluye las
   desviaciones conscientes: Oswald, clic+fallback de la Cita, etc.).
3. Auditoría anterior (`docs/dev/auditoria-landing-*.md`) = línea base:
   rastrear deltas (corregido / regresado / sigue abierto / nuevo) y
   reutilizar el esquema de IDs.

## 2. PHASE A — qué cubrir

**Programático (CDP headless; ver §4):**
- Overflow lateral (`scrollWidth > innerWidth`) en 1440/1024/768/360 + lista
  de culpables.
- Errores/warnings de consola en carga e interacción.
- Capturas por sección × viewport × {animado, reduced}.
- Interacciones: menú (abrir, Escape, tema), Tweaks, clic en DISEÑAR,
  fallback 6 s, carrusel hasta el final, visor (abrir/Escape), hover del
  email, 2–4 Tabs (¿dónde cae el foco?).
- Sondas de DOM para todo lo que el screenshot no prueba (fixed, computed
  styles, medidas de canvas).

**Lectura de código (segunda opinión independiente, presupuesto máximo):**
- Motores canvas: cleanup, visibilidad (¿pausan fuera de viewport?),
  reduced (¿estado final QUIETO?), carreras de fuentes (`fonts.load` de
  caras que el DOM no usa), pointercancel en drags, DPR.
- React: hydration (nada aleatorio en render), efectos con deps, StrictMode
  (flags `disposed`).
- CSS: AA por par texto/fondo real (ojo acento vivo en texto pequeño),
  z-index contra la escala tokenizada, touch targets ≥44 px, absolutos
  dentro de flex (align-self rompe el estiramiento por inset), staggers
  (transition-delay no se hereda), transforms que expanden scroll.
- A11y: outline de encabezados, overlays (inert + scroll-lock + foco),
  roles ARIA válidos, texto real para SR donde el visual es un juego.

**Formato de hallazgo:** ID (AUD-/LECT-) · severidad · ubicación
(`ruta:línea`) · evidencia mínima · qué regla/§ rompe · recomendación
DESCRITA. Lo no demostrable desde código/headless → "requiere verificación
en dispositivo".

## 3. PHASE B — clase elegible (y solo esta)

- Contraste AA objetivo (cambiar a la profundidad de token correcta).
- Overflow/encuadre/solape accidental con causa única clara.
- Accesibilidad mecánica: inert, foco de dialog, roles inválidos,
  hit-areas, sr-only, aria-pressed.
- Estados reduced-motion que no cumplen "final visible y quieto".
- Fugas/carreras con fix local evidente (cleanup, pointercancel, flags).
- Código muerto y dependencias sin consumidor.

Por lote: build + lint verdes y verificación programática del fix concreto.
**No tocar:** composición/gusto, copy del §1, tempos aprobados en Design,
nada con dos caminos razonables → tabla de pendientes.

## 4. Herramientas del repo de auditoría

Los scripts CDP viven fuera del repo (temporales); recrearlos es barato:
un WebSocket nativo de Node contra `--remote-debugging-port` de Edge
(`--headless=new`), con `Emulation.setDeviceMetricsOverride`,
`Emulation.setEmulatedMedia` (reduced-motion), `Runtime.evaluate`
(scroll/click/sondas) y `Page.captureScreenshot`. Trucos aprendidos:
- `virtual-time-budget` NO espera de forma fiable: usar sleeps reales.
- Perfil (`--user-data-dir`) único por proceso o Edge reusa el singleton.
- Mantener la pipa de stderr o Edge se desacopla del shell.
- El test "dos capturas espaciadas byte-idénticas" prueba quietud reduced.
- Tras scroll programático, las capas fijas pueden pintarse desincronizadas
  en el screenshot: confirmar con `getBoundingClientRect` antes de declarar
  bug.

## 5. Entregables

1. `docs/dev/auditoria-landing-AAAA-MM-DD.md` (español): resumen ejecutivo
   con conteos y "qué atacar primero", alcance/metodología, hallazgos con
   estado, **tabla de pendientes** (ID · área · qué es · por qué pendiente ·
   caminos · recomendación, ordenada por severidad), conclusión de aptitud
   por fase (no veredicto binario), lecciones para las skills.
2. Fixes en commits por lote conceptual (mensaje convencional).
3. Cierre: estado en texto plano para Marc — hallazgos por severidad,
   aplicados vs pendientes, decisiones que le esperan.
