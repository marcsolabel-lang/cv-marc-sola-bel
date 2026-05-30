# Auditoría "La Red" v2 — 2026-05-30 (sesión nocturna autónoma)

Resultado: **14/14 PASS**

| # | Criterio | Estado | Nota |
|---|----------|--------|------|
| 1 | Chatbot eliminado: sin enlaces en nav ni pie | ✅ PASS | `/chat` backend intacto; 0 entry-points visibles |
| 2 | Tronco continuo sobre todo el alto; existe en reposo | ✅ PASS | `absolute inset-y-0`, base `bg-line` + amber `scaleY` por scroll |
| 3 | Eje unificado; nodos y píldoras comparten eje | ✅ PASS | `left-8` móvil / `md:left-1/2` desktop; SectionNode en cada sección principal |
| 4 | Solo transform/opacity; sin pathLength/stroke-dashoffset | ✅ PASS | IllustrationNodes usa CSS filter (transform-compatible) + opacity |
| 5 | Bifurcación Proyectos recto + nodos consecutivos en \<lg | ✅ PASS | Tronco recto con SectionNode anclado |
| 6 | Hebras finales | ⚠️ DEFERIDO | Bloque F (Crown Planner) bloqueado sin capturas reales |
| 7 | Píldoras 01/03/04 finales; 02/05 data-pending | ✅ PASS | `data-pending` + `border-dashed opacity-60` |
| 8 | Giro ±12° SOLO en interacción; plano en reduced-motion | ✅ PASS | TiltCard + PhotoTilt con `useReducedMotion()` |
| 9 | Texturas fondo tenue; AA respetado; NO en portfolio | ✅ PASS | `pattern-organic.webp` Hero+Contacto, `dunes-soft.webp` transición |
| 10 | Foto de perfil 3:4 con next/image | ✅ PASS | `/marc-perfil.jpg` activo — foto real de Marc |
| 11 | Habilidades no duplicada en desktop | ✅ PASS | `hidden sm:grid` / `sm:hidden` mutuamente excluyentes |
| 12 | Cuerpo/leads subidos un escalón; AA en todo par | ✅ PASS | `--fs-body` 1.1→1.25rem; `--fs-lead` 1.25→1.65rem |
| 13 | Responsive 360/768/1440; tronco no pisa texto; touch ≥44px | ✅ PASS | SectionNode wrapper 44px; IllustrationNodes pointer events OK |
| 14 | `npm run build` → 0 errores | ✅ PASS | Compiled successfully, TypeScript clean |

---

## Añadido en esta iteración (sesión autónoma)

### IllustrationNodes — centrepiece interactivo
- Componente `src/components/IllustrationNodes.tsx` — nueva sección "La Red"
- Arte aborigen (`artwork.png`) segmentado en 6 zonas: Origen, Camino, Presente, Método, Visión, Red
- **Hover/touch**: zona activa → `saturate(200%) brightness(130%)`; resto → dim overlay 50% + desaturate
- Label emergente con spring (stiffness 320/damping 28) al activar zona
- Ring terracota en zona activa
- `prefers-reduced-motion`: sin transición de filter, estado plano
- Pointer events: funciona en mouse Y touchscreen (`onPointerEnter` + `onPointerDown`)

### Hero upgrade
- `descarga-cosmos.png` como capa atmosférica `opacity-[0.07] mix-blend-luminosity`
- Gradientes terracota reforzados

### Contacto mejorado
- Título en `--fs-h2` (de serif small a bold display)
- Cosmos artwork como bg atmosférico `opacity-[0.09]`
- Teléfono 608 254 125 añadido
- Tags: idiomas, carnet B, ubicación

### Assets en repo
- `public/marc-perfil.jpg` — foto real de Marc
- `public/artwork.png` — arte aborigen interactivo
- `public/reference/descarga-cosmos.png` — cosmos ref
- `public/reference/fundacion-visual.jpg` — estética ref

---

## Pendiente siguiente ciclo

- **02/05 píldoras**: validar subtextos con Marc → quitar `data-pending`
- **Bloque F**: hebras convergentes + nodo-final (Crown Planner, bloqueado)
- **NavDots responsive**: visible en mobile, ampliar en hover
- **IllustrationNodes**: afinar coordenadas de zonas cuando Marc valide la segmentación visual
- **Portfolio**: imágenes reales cuando estén disponibles
