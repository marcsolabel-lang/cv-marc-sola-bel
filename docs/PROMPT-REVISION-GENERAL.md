# Encargo 2 — Revisión general: transferencia Atlas, depurado y Fable 5

> Para el director visual (este Project, conectado al repo de GitHub).
> **Secuencia:** este encargo va DESPUÉS del de la foto (`docs/PROMPT-FOTO-PERFIL-VISUAL.md`).
> La foto de Sobre mí se está resolviendo por separado — **no la trates aquí** ni
> condiciones tus juicios a ella; asume que tendrá su tratamiento propio.

---

## El proyecto (recordatorio)

CV de una sola página de Marc Sola (perfil comercial/coordinación que construye con IA).
Sistema: Documento A v3 (`docs/doc-A-construccion.md`). Principio rector (§0): cada
viñeta encarna su concepto con una **metáfora visual portadora** — la forma EJECUTA el
argumento, no lo decora —, **calibrada** por acto narrativo: los PICOS (Hero · Cita ·
Atlas · Contacto) gritan; las de CREDIBILIDAD (Sobre mí · Formación · Experiencia ·
Liderazgo) van CONTENIDAS, al servicio de la lectura rápida. Si una de credibilidad
obliga a "trabajar" para entenderla, está mal calibrada.

Modo noche + terracota #C0542A. Bricolage Grotesque (display) · Oswald (banner) ·
Cormorant (serif). 8 viñetas, ritmo de fondos O-C-O-C-C-C-O-O. Cerradas: Hero (un
poliedro de nodos ES el sistema) y Cita («sistema» en caos→orden). Recién integrada:
la viñeta 7, **Atlas — el clímax**.

## Lo que se acaba de aplicar en Atlas (viñeta 7, PICO)

Pasó de recreaciones en CSS a la **demo real** del producto (datos 100% inventados):

- Carrusel cinematográfico de 6 pantallas con transición de **profundidad 3D** (las
  slides entran y salen en el eje Z).
- Cada captura enmarcada como **monitor de torre de control**: barra con semáforo, URL
  y "● EN VIVO".
- **Lupa magnificadora** (1.6×) al cursor, con pista pulsante sobre el panel «cómo
  decidió el motor» en las slides clave (CAT y Diaria): invita a INSPECCIONAR la
  inteligencia real.
- Columna de texto **editorial**: número-ghost gigante en outline, kick con punto
  «en vivo» + contador 01/06, título con palabra-clave en terracota, **chips de cifras**
  (−28% desequilibrio · −38% km · −47% pico), CTA «Probar Atlas en vivo».
- Halo terracota ambiental que se desplaza con la slide; HUD inferior (nº — módulo +
  dots). En móvil, mockup de teléfono con scroll vertical de la captura.
- Flechas/teclado/swipe/dots; reduced-motion respetado; fuentes y tokens del sistema.
  Metáfora al máximo, por ser PICO.

Código real: `src/components/vinetas/Atlas.tsx` + `atlas.css`. Míralo si lo necesitas.

## Lo que te adjunto en el chat

- La viñeta Atlas VIVA (capturas desktop + móvil) — el resultado nuevo.
- Las viñetas de credibilidad como están hoy (Sobre mí · Formación · Experiencia ·
  Liderazgo) y Contacto.
- Hero y Cita (cerradas), como referencia del listón superior.

## Lo que te pido — TRES juicios, priorizados (no listas neutras)

### 1) ¿Qué de Atlas eleva al resto sin romper la calibración?

Atlas es un pico; las viñetas 3–6 NO pueden gritar igual o pierdo al lector antes del
clímax. No quiero "copiar Atlas". Quiero saber qué recursos del lenguaje que estrenó
(chips de cifras · número-ghost · HUD/contador · sistema de "monitor" para imágenes ·
punto «en vivo» · tratamiento de palabra-acento) **suben el conjunto si se aplican
CONTENIDOS** a las de credibilidad — y cuáles NO debería tocar. Dímelo **por viñeta**:
qué sí, qué no, qué dejar intacto. Y al revés: ¿hay algo en Atlas tan fuerte que convenga
matizar para que no eclipse a Hero/Cita?

### 2) Depurado y revisión general

Auditoría de director sobre el conjunto, priorizada por impacto:
- **Coherencia del sistema**: tipografía, espaciados, acentos terracota, idioma de
  esquinas/glifos — ¿hay desviaciones entre viñetas que delaten construcción por fases?
- **Ritmo narrativo**: ¿la curva gancho → credibilidad → clímax → conversión se siente al
  hacer scroll? ¿Dónde se cae? ¿El paso oscuro↔claro funciona en todas las costuras?
- **Detalles que restan**: transiciones bruscas, jerarquías dudosas, anchos de línea,
  estados hover inconsistentes, cualquier cosa "casi bien" que un ojo entrenado nota.
- **Móvil**: el CV entero en 390px — qué viñeta sufre más y qué arreglo propones.
- Entrega: lista priorizada de fixes concretos (viñeta · problema · arreglo), separando
  "imprescindible antes de publicar" de "pulido".

### 3) ¿Fable 5 ahora, para el remate?

Ya tengo Fable 5 activado en Claude Code. Para lo que queda (cerrar las metáforas de
Sobre mí / Formación / Experiencia / Liderazgo y pulir el conjunto), ¿merece la pena
usarlo como modelo de trabajo? Quiero el trade-off honesto, no entusiasmo: ¿en qué
TAREAS concretas aportaría (composición · motion · código de UI · criterio visual) y en
cuáles no? ¿Qué gano frente al flujo actual y a qué coste/fricción? Si NO lo justifica
para esta recta final, dilo claro.

## Cierre

Tu recomendación priorizada: **el siguiente paso que más eleva el CV con menos riesgo**,
contando con que la foto de Sobre mí ya tiene su encargo aparte en curso.
