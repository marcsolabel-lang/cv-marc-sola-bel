# AUDITORÍA DE LA LANDING — 2026-06-10 (consejo crítico, dos fases)

Auditoría técnica y visual de la landing completa (commit `121ca67`), en dos
fases estrictas: PHASE A solo lectura (hallazgos), PHASE B solo fixes de la
clase decision-free (aplicados en `f483f46`). Todo lo que requería decisión
quedó en la tabla de pendientes del final.

## 1. Resumen ejecutivo

- **Conteo de hallazgos:** 0 críticos · 6 altos · 13 medios · 12 bajos.
- **Aplicado en PHASE B:** 24 fixes (los 6 altos, 10 medios, 8 bajos).
- **Pendiente de decisión de Marc:** 9 entradas (tabla final).
- **Qué atacar primero (humano):** los assets del Crown Planner (capturas +
  Excel ficticios, URL de demo) — es el único hueco de contenido del clímax;
  después las 4 decisiones de sistema (espaciado rem vs px, duraciones,
  "Se" de la Cita, peso 830) que cierran la deriva doc↔código.
- **Estado tras PHASE B:** build y lint verdes; sin overflow lateral en
  ningún viewport; sin errores de consola; reduced-motion correcto en las
  8 viñetas (verificado byte a byte en la Cita); overlays accesibles por
  teclado; outline semántico limpio; AA en todos los pares texto/fondo.

## 2. Alcance y metodología

- **Cubierto:** las 8 viñetas + topbar/índice + panel de Tweaks + visor del
  Crown, en 1440/1024/768/360, modos animado y reduced-motion, interacciones
  reales (menú, Escape, clic en DISEÑAR, fallback de 6 s, carrusel completo,
  visor, hover del email, Tab), overflow lateral programático, errores de
  consola, y lectura crítica de todo el código fuente.
- **Métodos:** navegador headless gobernado por CDP (scroll exacto, emulación
  de viewport y de prefers-reduced-motion, screenshots por sección y por
  interacción, sondas de DOM computado) + segunda lectura independiente del
  código delegada a un revisor con presupuesto máximo de razonamiento
  (hallazgos LECT-*), integrada aquí manteniendo sus IDs.
- **Fuera de alcance (futuro):** assets reales del Crown (los prepara Marc),
  verificación en dispositivos físicos (iOS Safari: svh/DPR/touch real),
  rendimiento medido en gama media (Lighthouse/Web Vitals de campo).
- **Limitación conocida del método:** el compositor del headless pinta a
  veces la topbar fija desincronizada tras scroll programático. Verificado
  con sondas de DOM que es artefacto de captura, no defecto (AUD-7).

## 3. Hallazgos (consolidados, con estado)

Formato: ID · severidad · estado · qué era.

### Aplicados en PHASE B (`f483f46`, salvo indicación)

| ID | Sev. | Hallazgo | Fix |
|---|---|---|---|
| AUD-4 | alto | Canvas del Hero en móvil medía 180 px y quedaba arriba: un absoluto con `inset:0` pero `align-self` ≠ stretch (media ≤820) no estira | `align-self: stretch; height: 100%` en la comp. centrada (en `121ca67`) |
| AUD-1 | alto | Overflow lateral del documento en 1440/1024: los 70 puntos dispersos de Liderazgo (transforms) expanden el scroll antes de entrar | `overflow-x: clip` por viñeta |
| LECT-1 | alto | Terracota-vivo #C0542A (4.3:1) en texto pequeño sobre oscuro en 5 sitios (labels Cita, kicker/notas Crown, números índice) | → `--terracotta-soft` #D06A3F (5.5:1) |
| LECT-2 | alto | Bajo reduced-motion la Cita seguía girando (ry) y la arena quedaba en caos | forma final quieta, arena colocada, pintado a demanda |
| LECT-3 | alto | Los motores rAF de Hero y Cita corrían siempre, aunque la sección no se viera | IO pausa/reanuda por visibilidad |
| LECT-4 | alto | Visor del Crown: `aria-modal` sin foco gestionado ni fondo inerte | foco a Cerrar, Tab atrapado, `inert` al fondo, foco restaurado |
| AUD-2 | medio | El índice cerrado recibía Tab (contenedor scrolleable focusable) | `inert={!open}` |
| AUD-5 | medio | Eje de Experiencia no monótono (2025→2021→2026) rompía la metáfora | orden descendente 2026→2025→2021 (en `121ca67`) |
| LECT-5 | medio | Sprites de «sistema» podían rasterizarse con la serif de fallback (la cara italic 600 no la usa el DOM y `fonts.ready` no la espera) | `fonts.load(...)` + re-rasterizado |
| LECT-6 | medio | Outline semántico: secciones sin encabezado, saltos h2→h3 | sect-label → h2; lección y Crown reubicados (h3/h4) |
| LECT-7 | medio | Touch targets <44 px: dots (7 px), Menú, DISEÑAR, toggle Tweaks | hit-areas ≥44 px sin cambio visual |
| LECT-8 | medio | `pan-y` roba el drag táctil con `pointercancel`: peonza congelada en "dragging" | `pointercancel` → mismo handler que pointerup |
| LECT-9 | medio | Texto de la cita en spans sin espacios: SR lo lee pegado | frase íntegra en `.sr-only`, juego de palabras `aria-hidden` |
| LECT-10 | medio | Z-index a pelo: caja de la Cita en hover empataba con la topbar (60) | escala tokenizada (`--z-side-hover: 30`, `--z-viewer: 80`) |
| LECT-11 | medio | Índice abierto: fondo tabulable y scrolleable | `inert` en main/tweaks + scroll-lock |
| LECT-13 | medio | `role="tablist"` sin tabs (ARIA inválido) en los dots | `role="group"` |
| LECT-14 | medio | `fonts.ready.then(start)` podía arrancar un bucle huérfano tras cleanup (StrictMode) | flag `disposed` |
| AUD-3 | bajo | Slide final del carrusel con hueco muerto (mantiene filas de slide con captura) | contenido centrado en su hueco |
| LECT-16 | bajo | `motion`/`MotionConfig` sin un solo consumidor; Cormorant cargaba 6 caras usando 2 | podados; solo cara 600 |
| LECT-17 | bajo | Componente `Reveal` y clase `.reveal` muertos | eliminados |
| LECT-18 | bajo | `transition-delay` en el `<li>` no se hereda: stagger inoperante | `--d` consumida con `calc()` en los hijos |
| LECT-19 | bajo | Raíces de Experiencia no monótonas con el eje | 2019–20 → 2018–19 → 2016 |
| LECT-21a | bajo | Timeout del peso del titular sin limpiar | limpiado en cleanup |
| LECT-23 | bajo | DISEÑAR sin estado accesible del toggle | `aria-pressed` dinámico |

### Verificado y limpio (que conste)

Sin errores de consola en ninguna pasada; sin riesgos de hydration (la
dispersión de Liderazgo es determinista); cleanup completo de listeners y
observers; divisiones por cero protegidas en ambos motores; fallback de 6 s
y clic en DISEÑAR funcionando (capturado); mapa §5 de palabras encendidas
completo y sin extras; tema adaptable de la topbar correcto (sonda DOM);
ritmo O-O-C-C-C-C-O-O intacto; kill-switch del SW correcto; copy literal
del §1 fiel (em-dashes incluidos, que son del autor).

## 4. Pendientes para revisión (la decisión es de Marc)

| ID | Área | Qué es | Por qué quedó pendiente | Caminos | Recomendación |
|---|---|---|---|---|---|
| PEND-1 | Contenido (alto) | Capturas + Excel 100% ficticios del Crown y URL de la demo; foto de perfil (¿entra o plan B tipográfico?) | Assets que prepara Marc (§7) | — | Es lo único que falta del clímax; prioridad 1 humana |
| PEND-2 | Sistema (medio) | Escala de espaciado construida en rem (9/18/27/36… px efectivos) vs base-8 en px del §3.4 ("nunca un valor fuera de escala") | La nota del §3 prohíbe ajustar sin dirección | (a) registrar "base-8 proporcional al cuerpo 18" como desviación consciente; (b) recalcular tokens a px | (a): lo construido es coherente y proporcional; recalcular ahora toca todo el layout |
| PEND-3 | Cita (medio) | Landscape móvil (~360 px de alto): las dos cajas + reloj pueden solapar | Requiere dispositivo real y decisión de composición | (a) `min-height:100svh` + cajas en flujo; (b) reducir cuerpo/ancho de cajas en landscape | Verificar primero en 740×360; si se confirma, (a) |
| PEND-4 | Sistema (bajo) | Duraciones fuera de la escala §3.5 (varias heredadas del HTML vivo: topbar .45/.5/.8 s, navscreen .5/.38 s) y breakpoints reales 600/820/1024 vs 360/768/1440 del §3.3 | Tempos aprobados en Design: normalizarlos es decisión de gusto | (a) ampliar la escala de tokens y migrar literales; (b) registrar la desviación | (b) ahora, (a) si se reabre el sistema |
| PEND-5 | Hero (bajo) | `--hl-weight: 830` y NEAR 900 exceden el eje real de Bricolage (200–800): el navegador clampa en silencio | Normalizar a 800 ampliaría sutilmente el rango FAR del peso variable (cambio visual) | (a) dejar 830 y registrarlo; (b) normalizar a 800 y revalidar la sensación | (a): el efectivo ya es 800 y el efecto está validado así |
| PEND-6 | Cita (bajo) | El mapa §5 dice que el «Se» inicial enciende; el HTML vivo no lo implementaba y el port es fiel al vivo. Además `.fire` es hover-only: en táctil la capa narrativa no existe | Divergencia doc↔vivo + laguna del doc | (a) implementar el «Se»; (b) corregir el §5; táctil: (c) encender al entrar en viewport en pointer:coarse | Decidir con el doc delante; para táctil, (c) es barato y fiel al espíritu |
| PEND-7 | Liderazgo (bajo) | Antes de entrar en viewport, los puntos dispersos pueden asomar en vertical (opacity 0.25) sobre el aire entre secciones | Solo verificable en dispositivo/scroll real | (a) clip total del grid; (b) reducir amplitud en móvil; (c) dejarlo (es tenue y transitorio) | (c) salvo que moleste en el dispositivo de Marc |
| PEND-8 | Hero (bajo) | DPR capturado una vez (monitor externo ≠ retina) y lecturas de layout por pointermove cacheables | Optimización con matices, no defecto visible | matchMedia resolution + cacheo de rect | Solo si se nota borrosidad al mover de pantalla |
| PEND-9 | Cita (nota) | El reloj ordenado se percibe pequeño en 360 vertical; copy/paste de la cita pega las palabras (el SR ya está resuelto) | Gusto / limitación del dispositivo del vivo | subir S en estrecho; espacios reales + margins compensados | Valorar tras verlo en móvil real |

## 5. Conclusión

La landing está **apta para su fase actual**: candidatura visible con Hero y
Cita al nivel aprobado en Design, seis viñetas con metáfora portadora
calibrada, sistema de tokens AA verificado y accesibilidad de teclado/SR
real. Las puertas antes de "definitiva": PEND-1 (assets del clímax),
verificación en dispositivos físicos (PEND-3/7/9) y las 4 decisiones de
sistema (PEND-2/4/5/6). No es un veredicto binario de producción: es apta
para enseñarse hoy, con el clímax en placeholders honestos.

## 6. Lecciones para las skills (notas, no editadas este run)

1. **El contraste AA se rompe donde el token es "el bonito"**: el revisor
   debería buscar por defecto usos del acento vivo en font-size < 1rem.
2. **reduced-motion no es "quitar animaciones de entrada"**: los motores
   continuos (canvas/rAF) son el caso que se escapa; comprobar SIEMPRE que
   el estado final es quieto (dos capturas espaciadas byte-idénticas es un
   test barato y concluyente).
3. **Todo overlay full-screen necesita el trío**: inert del fondo +
   scroll-lock + gestión de foco (abrir/atrapar/restaurar). Revisarlo como
   checklist, no como hallazgo individual.
4. **Los contenedores scrolleables son focusables en Chromium**: un panel
   oculto por clip-path/opacity sigue recibiendo Tab si no es inert.
5. **transition-delay no se hereda**: cualquier stagger aplicado al padre
   con hijos transicionando es sospechoso por defecto.
6. **Los transforms expanden el scrollable overflow**: estados "dispersos"
   previos a la entrada deben clipearse en el eje X a nivel de sección.
7. **Headless + scroll programático pinta capas fijas desincronizadas**:
   verificar topbars/fixed con sondas de DOM antes de declarar el bug.
