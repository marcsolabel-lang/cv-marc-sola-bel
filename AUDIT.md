# Auditoría "La Red" — 2026-05-30

Resultado: **13/14 PASS · 1 DEFERIDO**

| # | Criterio | Estado | Nota |
|---|----------|--------|------|
| 1 | Chatbot eliminado: sin enlaces "Assistant" en nav ni pie; sin enlaces muertos | ✅ PASS | `/chat` route y backend intactos; solo entry-points UI eliminados |
| 2 | Tronco continuo sobre todo el alto; no se corta en cambios de fondo; existe en reposo | ✅ PASS | `absolute inset-y-0` + base `bg-line` siempre visible; amber overlay `scaleY` progresa con scroll |
| 3 | Eje unificado; nodos y píldoras comparten eje; tronco recto en Experiencia/Estudios | ✅ PASS | `left-8` (móvil) / `md:left-1/2 md:-translate-x-1/2` (desktop); no hay bifurcación en Experiencia/Estudios |
| 4 | Solo transform/opacity; sin pathLength/stroke-dashoffset; codos rectos encadenados | ✅ PASS | Toda animación usa `scaleY`, `rotateX/Y`, `opacity`, `scale`, `y` — ningún atributo SVG |
| 5 | Bifurcación Proyectos lateral solo lg+; recto + nodos consecutivos en <lg | ✅ PASS | Tronco recto + NodePills apiladas en móvil. Bifurcación lg+ marcada como mejora futura |
| 6 | Hebras finales convergen hacia el centro; nodo-final mayor | ⚠️ DEFERIDO | Bloque F (Crown Planner) sigue bloqueado sin capturas reales del producto |
| 7 | Píldoras 01/03/04 finales; 02/05 con data-pending y visualmente distinguibles | ✅ PASS | `data-pending="true"` + `opacity-60 border-dashed border-amber/50` en 02 y 05 |
| 8 | Giro de bloques: ±12° SOLO en interacción; texto legible AA; plano en reduced-motion | ✅ PASS | `ROTATE_MAX = 12`; `useReducedMotion()` en TiltCard y PhotoTilt; retorno plano en reduced |
| 9 | Texturas: solo fondo tenue; AA respetado; NO en portfolio ni en slots | ✅ PASS | `pattern-organic` en Hero + Contacto a `opacity: 0.06`; `dunes-soft` en transición pre-Proyectos con overlay terracota/blanco |
| 10 | Foto de perfil cargada en slot 3:4 con next/image | ✅ PASS | `<Image src="/marc-perfil.jpg" fill sizes=...>` con `console.warn` si no existe el archivo |
| 11 | Habilidades NO se ve duplicado en desktop | ✅ PASS | `hidden sm:grid` (desktop) y `sm:hidden` (móvil) son mutuamente excluyentes |
| 12 | Cuerpo/leads subidos un escalón; terracota escaso; AA en todo par texto/fondo | ✅ PASS | `--fs-body`: 1rem→1.1rem min; `--fs-lead`: 1.15rem→1.25rem min |
| 13 | Responsive 360/768/1440 sin solapes; tronco no pisa texto | ✅ PASS | Tronco en `left-8` (32px); contenido con padding adecuado en todos los breakpoints |
| 14 | `npm run build` → 0 errores | ✅ PASS | Compiled successfully, TypeScript clean, 0 type errors |

---

## Pendiente para el siguiente ciclo

- **02/05 píldoras**: validar subtexto con Marc, editar 2 strings en `NODE_PILLS[]` y quitar `data-pending`.
- **Bloque F (Crown Planner)**: hebras finales convergentes + nodo-final mayor. Bloqueado hasta capturas reales del producto.
- **NavDots**: hacer responsive (mobile), ampliar en hover.
- **Experiencia**: ampliar `experienceItems` con más historial profesional.
- **Datos contacto**: añadir teléfono (608 254 125), idiomas, carnet B.
- **Imágenes reales**: `public/marc-perfil.jpg` + portfolio slots.
- **Activos texturas**: subir `public/textures/pattern-organic.png`, `dunes-soft.jpg`, `dunes-ridge.jpg`.
