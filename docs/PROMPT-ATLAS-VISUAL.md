# PROMPT — Elevar la viñeta ATLAS al clímax visual que merece

*Para una sesión de Claude Code conectada a este repo (cv-linkedin).
Escrito por la sesión del 2026-06-10 tras construir la versión actual.
Marc adjuntará capturas del estado actual de la página y de las muestras
generadas: úsalas como diagnóstico, no como techo.*

---

## Tu encargo, en una frase

La viñeta **Atlas** (`#proyecto`) es el CLÍMAX de este CV — la prueba que
decide la entrevista — y hoy está bien **a nivel explicativo** pero le
falta el **boom visual**: tu trabajo es llevarla a un resultado digno de
un diseñador galardonado, sin romper ni una de las reglas de
confidencialidad de abajo.

## Lee antes de tocar nada (en este orden)

1. `docs/doc-A-construccion.md` — el contrato del proyecto. §0 calibración
   por acto (Atlas es PICO: aquí se permite el máximo), §3 tokens, §5
   reglas globales, §6.7 la ficha de esta viñeta (carrusel + zoom-lupa son
   formato cerrado), §7 reglas de imagen.
2. `docs/METAFORAS-VINETAS.md` — todas las decisiones tomadas y por qué.
   Busca la entrada «Crown Planner → ATLAS (sexta pasada)».
3. `src/components/vinetas/Atlas.tsx` + el bloque ATLAS de
   `src/components/vinetas/vinetas.css` — lo construido.
4. `docs/auditoria-playbook-landing.md` — cómo verificar (CDP headless;
   los trucos de Edge están documentados ahí).
5. `C:\repos\crown-planner\Crown-Planner\ESTADO_Y_ROADMAP_ATLAS.md` — qué
   es Atlas de verdad (motor de equidad por horas calibrado, 4 módulos,
   optimización GAP, memoria de flota ~4.500 máquinas, tiers de
   emergencia). Y `C:\repos\cv-linkedin\crown-planner-muestra\` — 18
   capturas REALES de la app (solo como referencia visual; ver
   confidencialidad).

## Qué hay construido hoy y por qué se hizo así

- **8 slides** en carrusel scroll-snap: problema → solución (asignación
  animada resolviéndose) → motor de equidad (barras a-mano/con-Atlas) →
  cola de prioridad (tiers semáforo) → 4 módulos → memoria → KPIs del
  simulador (−26% desequilibrio, −38% km, −47% carga pico, <200 ms) → la
  prueba con CTAs en "próximamente".
- Las pantallas son **recreaciones en HTML vivo** (`AtlasVentana` +
  componentes `Viz*` en Atlas.tsx) con la identidad control-tower de la
  app real (crema #F6F2EA, cards, sello ATLAS en naranja ≈ terracota) y
  **datos 100 % inventados**.
- **Por qué recreaciones y no capturas**: las capturas reales contienen
  nombres de técnicos, clientes y zonas de Crown Lift Trucks (sanearlas a
  píxel = riesgo de fuga) y a tamaño slide se vuelven ilegibles. Además
  el perfil visitante de la demo aún no existía.

## Diagnóstico honesto: por qué NO es el boom (barreras reales)

1. **El lienzo de las viz es pequeño**: el slide reparte 7fr/5fr entre viz
   y texto; las recreaciones quedan como tablas correctas de ~500 px —
   informan, no impresionan. El clímax pide que la IMAGEN domine el slide
   y el texto la acompañe, no al revés.
2. **Las recreaciones son sobrias por diseño defensivo**: tipografía
   pequeña, sin las piezas más espectaculares de la app real (el MAPA DE
   RUTAS, el dashboard de stat-cards, el modo noche). Compara con
   `crown-planner-muestra/mapa-rutas.png`, `kpi.png` y `MODO-NOCHE.png`:
   la app real es mucho más rica que mis miniaturas.
3. **HTML recreado nunca vende como un píxel real**: el §6.7 quiere
   capturas nítidas porque son PRUEBA ("esto existe y funciona"). Una
   recreación, por buena que sea, se lee como ilustración.
4. **La lupa del doc-A está desactivada**: sin imagen real que ampliar,
   el dispositivo estrella del formato (zoom-lupa localizado) no se usa.
   El CSS (`.crown__shot`, `.crown__lens`, `.crown__viewer`) sigue en
   vinetas.css esperando.

## El camino que propongo (en orden de valor)

### Plan A — el correcto: capturas reales del perfil visitante ⭐

Pídele a Marc el paso que ya tiene en mente y dale el checklist exacto:

1. **Crear el perfil visitante/vanilla en Atlas** con datos sembrados
   ficticios (técnicos, clientes, zonas y órdenes inventados — puede
   reusar los del CV: Ferrer/Soto/Pons/Vidal/Riba, Vallès Est/Baix
   Nord/Anoia/Litoral, Almacenes Drassana/Logística Ribera).
2. **Capturas en MODO NOCHE** — la app lo tiene y es espectacular; además
   integra de forma natural con la viñeta oscura del CV (las capturas
   crema sobre negro flotan; las dark se funden).
3. Checklist técnico de cada captura: resolución 2x (≥2560 px de ancho),
   ventana limpia (sin barras del navegador/OS — usa el modo app o
   recorta), mismas dimensiones todas, y las 5 pantallas con más fuerza:
   **Home control-tower · mapa de rutas · dashboard KPI ("Motor Atlas —
   cómo trabaja") · Plan de hoy con asignación hecha · Asignación CAT**.
4. Con las capturas en `public/atlas/`: slides con la imagen a GRAN
   formato (la viz domina ~75 % del slide), **lupa reactivada** sobre
   ellas (el código existe), `next/image` con `sizes` generosos, y el
   CTA "Probar la demo" enlazado al perfil visitante.

### Plan B — sin esperar el vanilla: subir el teatro de las recreaciones

Si Marc quiere resultados antes del perfil visitante, eleva lo que hay:

1. **Invertir la jerarquía del slide**: viz a ancho casi completo con el
   texto como caption breve debajo o en overlay. El carrusel ya da
   slides de hasta 880 px — úsalos enteros.
2. **Recrear el MAPA DE RUTAS en SVG animado** (la pieza más visual de la
   app): nodos de órdenes sobre una geografía abstracta de comarcas,
   rutas que se TRAZAN al entrar (stroke-dashoffset, ya hay patrón en el
   árbol de Sobre mí), colores por técnico, el "antes" (líneas cruzadas
   caóticas) vs "con Atlas" (rutas limpias) — esa comparación ES el boom.
3. **Versión modo-noche de `AtlasVentana`** para que las recreaciones se
   fundan con la viñeta (variante `.atlasw--dark` con los stat-cards del
   control tower: barra gold, cifras grandes).
4. **Profundidad física**: las ventanas con el tratamiento del marco de la
   foto de perfil (tilt 3D sutil + sombra + esquinas) — el patrón está en
   `FotoPerfil.tsx` / `.foto3d`.
5. El slide de KPIs ya funciona (lenguaje arma) — no lo toques salvo para
   añadirle entrada animada de cifras SIN count-up (el doc-A lo prohíbe:
   usa revelado por opacidad/peso, no números rodando).

Mi recomendación de director: **haz B.2 y B.3 ya** (el mapa de rutas
animado + modo noche transforman la viñeta solos) y deja la estructura
lista para que las capturas del Plan A caigan encima cuando existan.

## Confidencialidad — LÍMITES DUROS (no negociables)

JAMÁS puede aparecer, ni en código ni en assets ni en commits:
- Nombres reales de técnicos o empleados de Crown (en las capturas reales
  hay varios; las capturas de `crown-planner-muestra/` NO pueden subirse
  al repo ni usarse en la web tal cual).
- Clientes reales de Crown (los verás en los docs del repo crown-planner).
- Zonas operativas internas (CC3/CC9/Baleares) ni el dealer de Baleares.
- Datos operativos exactos (flotas, cargas, métricas de operación real).
  Los KPIs solo se presentan como **cifras del simulador**, etiquetadas.
- El directorio `crown-planner-muestra/` está fuera del repo git (raíz
  local): verifica que siga sin trackear antes de cada commit.
Datos ficticios ya establecidos (reúsalos por coherencia): técnicos
Ferrer/Soto/Pons/Vidal/Riba · zonas Vallès Est/Baix Nord/Anoia/Litoral/
Alt Segre · clientes Almacenes Drassana/Logística Ribera/Frío Industrial
Camp · serie 1A4790021.

## Disciplina de ejecución

- Invoca `/diseñar` (taste + impeccable + emil) antes de producir; el
  doc-A manda sobre cualquier regla genérica de las skills.
- Solo transform/opacity; reduced-motion con estados finales visibles;
  un foco de interacción por viñeta; tokens — nada "a pelo".
- Verifica con el método del playbook (CDP, no virtual-time-budget) en
  1440/768/412, modos animado y reduced, y captura los slides ANTES de
  hacer ship. Build + lint verdes.
- Registra cada decisión en `docs/METAFORAS-VINETAS.md` y, si cambias el
  contrato, en el doc-A con nota fechada.
- `/ship` al terminar (push directo a master → auto-deploy Vercel).

## El listón

El Hero (peonza con física) y la Cita (tormenta de palabras) son el nivel
visual de esta web. Atlas debe superarlos — es el único momento donde el
doc-A permite el máximo absoluto. Si al terminar el slide del mapa o las
capturas no te hacen parar el scroll, no está terminado.
