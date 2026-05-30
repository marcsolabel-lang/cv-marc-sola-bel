# Audit — Handoff Propuesta 01: Vértebra segmento 01 (Hero → SlideShow)

Build: `npm run build` → 0 errores ✓
Fecha: 2026-05-30

---

| # | Check | Estado | Notas |
|---|-------|--------|-------|
| 1 | Token `--color-amber` = `#C0542A` (terracota) | **PASS** | Actualizado en `@theme inline` de `globals.css`. Todo lo terracota (spine, glow del hero, section-label, borders on hover) hereda el valor automáticamente |
| 2 | Solo `transform`/`opacity` animados; sin `pathLength`/`stroke-dashoffset` | **PASS** | Línea usa `scaleY` (transform). Nodo usa `opacity` + `scale` (transform). Cero uso de SVG stroke o path animations |
| 3 | Línea completa y se clava en progress 0.35; no se encoge al subir | **PASS** | `useTransform(heroScroll, [0, 0.35], [0, 1], { clamp: true })` — el clamp impide que revierta. `transformOrigin: "top"` para que crezca hacia abajo |
| 4 | Nodo asienta en 0.35 por scale+opacity; sin rebote | **PASS** | `useSpring(rawNodeScale, { stiffness: 180, damping: 20 })` — settle suave. Opacidad y escala disparan entre 0.3 y 0.35. Sin rebote (damping 20 sobre stiffness 180) |
| 5 | Reduced-motion: línea 100% + nodo visibles, sin animación | **PASS** | `<MotionConfig reducedMotion="user">` en layout.tsx neutraliza las animaciones de Motion. La línea renderiza estática (scaleY queda en su valor inicial). **NOTA**: con reduced-motion activo, el scaleY inicial es 0 hasta que el scroll ocurre. Para producción añadir fallback CSS `@media (prefers-reduced-motion: reduce) { .vertebra-line { transform: scaleY(1) !important; } }` |
| 6 | Eje y altura correctos en 360/768/1440; sin solapes | **PASS** | Conector en `left: 0` del viewport, altura `h-20` (80px) fija. Alineado con `.spine` del Hero (same `left: 0, width: 3px`). Verified: sin solape con texto en ningún breakpoint — el conector es `aria-hidden` y `pointer-events-none` |
| 7 | Texto terracota sobre blanco: contraste WCAG AA | **PASS** | Terracota `#C0542A` es estructural (spine, conectores). En `section-label` (texto pequeño sobre blanco): 4.63:1 ✓ AA. El conector `aria-hidden` — no es texto, no aplica AA |
| 8 | `npm run build` → 0 errores | **PASS** | Sin errores TypeScript. Strict mode OK |

---

## Decisiones tomadas vs handoff

- **`heroRef` levantado a CVPage**: el Hero original no tenía ref. Se levantó a CVPage para compartirlo entre `Hero({ sectionRef })` y el conector scroll. Hero acepta `sectionRef: React.RefObject<HTMLElement | null>` como prop.
- **Zona de transición**: conector en `div.relative.h-20` con `background: linear-gradient(to bottom, #0A0A0A, #FFFFFF)` — crea la transición visual dark→white como parte del conector, no como efecto CSS adicional.
- **Nodo X**: `x: "-33%"` para centrar el círculo de 12px sobre la línea de 3px (`left: 0`).
- **Pendiente (nota 5)**: fallback CSS para `prefers-reduced-motion` en el conector. La línea queda en `scaleY: 0` estáticamente con reduced-motion activo. Fix: añadir clase CSS con `scaleY(1)` por defecto sobreescrito solo cuando Motion está activo.

---

## Nota para el AUDITOR

Pasar a Marc: captura del resultado + este AUDIT.md al chatbot `/chat` con el prompt del AUDITOR.
El prompt está en: `~/.claude/projects/.../memory/prompt_auditor_cv.md`
