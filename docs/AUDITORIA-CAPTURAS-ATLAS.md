# Auditoría de las capturas de Atlas — 2026-06-12

> Encargo de Marc S (auditoría móvil 2026-06-12): «hay información incoherente
> que afecta a cómo se entiende la información e impide que sea limpio. Debería
> dejarse claro que la demo contiene información inventada y que para nada
> filtra datos privados de la empresa.»
>
> Revisadas las 6 capturas desktop de `public/atlas/` contra el copy de los
> slides (`Atlas.tsx`). Veredicto: **las cifras ficticias son internamente
> coherentes** (0.550→0.396 = −28 %; 22,1→13,6 km = −38 %; 258 %→136 % = −47 %;
> reparto 9+11+11+9+10 = 50; backlog 12+2+1+0 = 15; 14/15 = 93 %; WO 11+PM 3 = 14;
> fecha y hora consistentes JUE 11 JUN · 21:24). Los hallazgos reales son seis.

## Hallazgos

| # | Captura | Hallazgo | Severidad | Dónde se arregla |
|---|---------|----------|-----------|------------------|
| 1 | 1, 2, 3 | **Nombres internos reales de la empresa** visibles: «Power BI · EMEA PM & Prospects», «Active PM Schedules», «PM Forecast», «Bulk WIP (Baan)», «WIP Scorecard». Los datos son inventados, pero estos nombres de informes/ERP internos no lo son. Es exactamente la fuga que el aviso de confidencialidad promete que no existe. | **ALTA** | App Crown Planner → regenerar capturas con nombres genéricos («Informe PM mensual», «ERP», «Previsión PM») |
| 2 | slide 01 | El chip del CV decía «~4.500 máquinas en memoria»; todas las capturas muestran cartera de **1.479** («1479 CARTERA», «CIFRAS DEL SIMULADOR · 1.479 MÁQUINAS»). El visitante que mira la pantalla no encuentra el 4.500 por ningún sitio. | MEDIA | **CV — CORREGIDO** (chip → «~1.500 máquinas en cartera») |
| 3 | 4 vs 5 | Mismo día simulado con estados distintos: la 4 muestra Desbordamiento 0 · ID 21:24:30; la 5 muestra Desbordamiento 1 · ID «simulador». Quien compare slides ve que «el mismo día» no cuadra. | MEDIA | App → regenerar la 5 desde la misma corrida que la 4 |
| 4 | 1 | «Jueves, 11 De Junio» — capitalización incorrecta («de junio»). Choca con la norma de dicción hipercorregida. | BAJA | App → fix de formato de fecha y regenerar |
| 5 | 1, 3, 6 | Em-dashes en la UI de la app («ATLAS — Inicio», «Asignación CAT — Cartera de máquinas», «sin cargar — actualizar»). Contradice la nueva norma de puntuación (menos guiones). | BAJA | App → ajustar labels y regenerar |
| 6 | 5 | Etiqueta «CATALONIA» en inglés en el mapa base. | BAJA | App → idioma del tile provider, si es configurable |

## Acciones tomadas hoy en el CV (sin tocar la app)

- Chip del slide 01 corregido a «~1.500 máquinas en cartera» (hallazgo 2).
- Aviso de confidencialidad **persistente** en el HUD de la sección:
  «Demo pública con datos 100 % ficticios; ninguna información real de la
  empresa.» Antes solo lo decía el copy del slide 06.
- La sección enuncia el nombre del producto: «Atlas · Crown Planner» en el
  kick de cada slide (antes solo «Crown Planner»).

## Pendiente (requiere la app Crown Planner)

Regenerar el set de capturas (desktop + móvil, mismos nombres de archivo)
con: nombres internos genéricos (hallazgo 1, prioritario), estado del día
unificado (3), fecha bien capitalizada (4), labels sin em-dash (5). Mientras
tanto, el aviso persistente del HUD cubre el riesgo de interpretación: deja
dicho que nada de lo visible es información real.
