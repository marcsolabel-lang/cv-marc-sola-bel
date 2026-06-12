# Dirección de arte: narrativa por scroll — programa y decisión

> Origen: auditoría móvil de Marc S (2026-06-12, noche). Referencia declarada:
> **Apple** (página de producto iPhone 17 Pro) — «la forma en la que trabaja las
> animaciones por scroll es súper integrada, explicativa y agradable. Es natural
> y lógico que se te muestre de una forma fluida la página.»
> Este documento es el prompt ordenado de ese encargo: decisión, lo ejecutado
> hoy y el programa por fases. El director visual del navegador lo lee del
> repo remoto.

---

## 1 · La decisión (estructura Rumelt)

**Diagnóstico.** El CV tiene picos teatrales por viñeta (peonza, tormenta,
carrusel), pero el tránsito entre ellas es seco: las entradas disparan una vez
por umbral (IntersectionObserver) y el resto del scroll es inerte. En móvil,
los gestos centrados en pulsación/hover pierden sentido o se vuelven
invisibles. El texto es denso para lectura móvil. Resultado: falta fluidez,
falta diégesis — el visitante salta entre escenas en lugar de recorrer un
relato continuo.

**Guiding policy.** UNA sola página **responsive con narrativa scroll-driven**.
El scroll es la línea de tiempo del relato (modelo Apple): avanzar revela,
explica y encadena; las animaciones ayudan a entender, no decoran. Cada viñeta
conserva su metáfora aprobada, pero su entrada, desarrollo y salida se
coreografían con el scroll. La pulsación queda como enriquecimiento opcional
con **paridad táctil garantizada** — nunca como única vía a un contenido.

**Qué elimina esta política** (decidido, no se revisita):
- La opción «página solo PC». Descartada.
- Interacciones exclusivas de hover sin equivalente táctil o por scroll.
- Añadir más texto. La dirección es condensar (tratamiento periodístico).

---

## 2 · Ejecutado hoy (F0 — quick wins, ya en master)

1. **Hero**: la frase estrella puntuada como tesis — «Pienso en sistemas;
   construyo soluciones.» (punto y coma + punto final). Lead sin guion largo.
2. **Puntuación hipercorregida** en todo el copy visible: guiones largos
   sustituidos por dos puntos, punto y coma, paréntesis o «·» en metadatos
   (Sobre mí, Formación, Experiencia, Liderazgo, Atlas). Rangos de fechas con
   semirraya.
3. **Atlas enuncia su nombre**: «Atlas · Crown Planner» en el kick de cada
   slide; el HUD lleva aviso persistente «Demo pública con datos 100 %
   ficticios; ninguna información real de la empresa».
4. **Coherencia de cifras** con las capturas (chip ~1.500 máquinas) y
   auditoría completa del set → `AUDITORIA-CAPTURAS-ATLAS.md`.
5. **TopBar con filtro de opacidad al navegar**: vidrio esmerilado
   (backdrop-filter) que aparece solo con scroll; arriba del todo la barra
   sigue sin fondo (la decisión «sin fondos» de 2026-06-10 queda intacta en el
   arranque).
6. **Manifiesto — léxico del sistema**: pulsar el torbellino (ratón o dedo)
   alterna «sistema» con el vocabulario de su arquitectura: estructura,
   módulo, flujo, jerarquía, patrón, proceso, equilibrio, feedback,
   iteración, escala, orden. Paridad táctil: es click/tap, no hover.

---

## 3 · Programa por fases (cada una entregable por sí sola)

### F1 — Fundamento de movimiento (técnica, sin rediseño visual)
- **Motor de scroll**: evaluar CSS scroll-driven animations nativas
  (`animation-timeline: view()`) con fallback IO frente a **GSAP +
  ScrollTrigger** (gratuito desde 2024). Criterio: si las secuencias de F2
  piden pinning y scrub encadenado (Atlas lo pedirá), GSAP; si bastan
  progresiones por viewport, nativo. Decidir con UNA prueba sobre Experiencia.
- **Tokens de movimiento**: catálogo de duraciones y easings *explicativos*
  (entrada que presenta, scrub que acompaña, settle que asienta) en
  `globals.css`, documentados. Solo `transform`/`opacity`; presupuesto: cero
  jank en móvil medio.
- **Política transversal** (ya ley, se extiende al scrub): reduced-motion,
  impresión y sin-JS ven SIEMPRE el estado final completo; todo scrub es
  reversible (subir deshace lo que bajar hizo).

### F2 — Secuencias por acto (encargos al director visual, uno por viñeta)
Lenguaje audiovisual aplicado: secuencias, travelings, cambios de plano,
diégesis — el scroll como cámara.
- **Hero → Sobre mí**: transición de plano (oscuro→claro) coreografiada, no
  corte seco.
- **Sobre mí**: las neuronas deben **emerger del retrato** — las raíces nacen
  dentro de la placa y el entramado se dibuja ligado al scroll (scrub), no de
  una vez. La metáfora que pidió Marc: «de mí emergen los sistemas complejos
  que convergen mis habilidades».
- **Experiencia**: la década se erige con el scroll (el eje crece en scrub,
  no por umbral). Candidata a prueba piloto de F1.
- **Atlas (prioridad)**: traveling con pinning entre pantallas; easings
  explicativos en cada transición; **pop-ups circulares** (terracota, negro,
  blanco/crema) que expliquen los puntos difíciles: qué es el CoV, qué hace
  el solver GAP, qué son las 4 capas. Apertura por tap/click con paridad
  táctil.
- **Contacto**: el cierre ensambla con el último tramo de scroll.

### F3 — Copy periodístico completo
Pasada sección a sección con estructura de prensa y una regla doble que
precisó Marc (2026-06-12):
- **Lo clave, grande y destacado**: la letra debe seguir captando atención.
  Usar toda la caja de recursos periodísticos para jerarquizar — titulares,
  entradillas, subtítulos, ladillos, citas destacadas (pull quotes), cifras
  en cuerpo display, destacados. Aquello que merezca saberse y verse debe
  destacar de forma acorde a su peso.
- **El cuerpo, resumido**: condensar 30–40 %, bien contado y narrado, pero
  siempre señalando los datos más relevantes (cifras-ancla, nombres, fechas).
  Resumir no es diluir: cada párrafo conserva su dato.
Puntuación canónica (la norma de F0 ya aplicada se mantiene como ley). Marc
da el veredicto de voz sección a sección antes de integrar.

### F4 — Regeneración de capturas Atlas (depende de la app Crown Planner)
Según `AUDITORIA-CAPTURAS-ATLAS.md`: nombres internos genéricos (prioritario),
estado del día unificado entre capturas, fecha bien capitalizada, labels sin
em-dash.

### F5 — QA Apple-grade
1440 / 768 / 360 + dispositivo táctil real; Lighthouse sin regresiones (CLS 0,
animaciones compuestas); reduced-motion e impresión completos; navegación por
teclado.

---

## 4 · Orden de ataque propuesto

F1 (prueba piloto sobre Experiencia) → F2-Atlas → F2-Sobre mí → F3 → resto de
F2 → F4 cuando haya acceso a la app → F5 continuo. Un encargo por sesión de
Design; cada port se verifica contra la referencia viva como se hizo con
Sobre mí (capturas 1440/768/360 + reduced-motion).

## 5 · Reglas que no se negocian (heredadas + nuevas)

- Estado final siempre visible: sin JS, impresión, reduced-motion, observer
  que no dispara. Garantía anti-bloqueo en toda entrada.
- Solo `transform` + `opacity` (+ `stroke-dashoffset` para dibujo de líneas).
- Paridad táctil: nada de contenido accesible solo por hover. **(nueva)**
- Todo scrub reversible y sin secuestrar el scroll nativo. **(nueva)**
- Tokens: color, duración y easing salen de `globals.css`; nada a pelo.
- El copy aprobado por Marc es contrato; condensar requiere su veredicto (F3).
