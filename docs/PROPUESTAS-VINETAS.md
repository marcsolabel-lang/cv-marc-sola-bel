# PROPUESTAS DEL CONSEJO CREATIVO — rama `marcs/propuestas-vinetas`

Cinco propuestas para elevar viñetas hacia el listón Hero/Cita, calibradas
por acto (§0): lo rompedor se concentra en los PICOS; el acto de credibilidad
recibe inteligencia, no ruido. **Dos están implementadas en esta rama** (sin
PR, sin merge: master queda con la versión auditada; Marc decide).

Cómo probarlas: `git checkout marcs/propuestas-vinetas && npm run build &&
npm start` → slides del Crown (slide 2) y Contacto.

---

## P1 · CROWN VIVO — el planner operando (IMPLEMENTADA) ★ la apuesta

- **Qué.** El slide "La solución" sustituye la captura muerta por el sistema
  FUNCIONANDO con datos 100% ficticios: seis órdenes entran, los scores se
  calculan (barras + números tabulares), la asignación se resuelve sola y
  una orden queda marcada SIN COBERTURA (la mecánica 3, visible). Bucle
  sereno con pausa larga; etiqueta "Simulación · datos 100% ficticios".
- **Consejo.** Arte: es la traducción literal del §6.7 ("la prueba ES el
  propio sistema operando") — una captura es testimonio, una simulación es
  demostración. UX: aporta lo que ninguna captura puede — el ANTES/DESPUÉS
  del problema operativo. Marca: el lector VE el criterio del sistema, que
  es exactamente lo que Marc vende.
- **Principio.** Show, don't tell llevado al límite del formato.
- **Calibración.** PICO. Un solo foco (el doc §5): la simulación es el foco
  del slide 2; las demás slides mantienen captura/placeholder y la lupa.
- **Coste y mitigación.** Riesgo de parecer "fake" → etiqueta honesta +
  datos evidentemente ficticios; reduced-motion: tablero resuelto y quieto;
  pausa fuera de viewport (IO). Si las capturas reales del slide 2 son
  mejores que la sim, se revierte un flag (`sim: true` → `shot: true`).

## P2 · SELLO CONVERGENTE — el sistema se completa, literal (IMPLEMENTADA)

- **Qué.** En Contacto, la materia del Hero (trazos de alambre terracota)
  converge una sola vez sobre las aristas del rombo y se "suelda" en el
  sello sólido. Apertura: wireframe en movimiento (pensar). Cierre: forma
  resuelta y quieta (hecho). ~1.6 s, sin loop.
- **Consejo.** Arte: cierra el círculo material de la web — el mismo trazo
  del poliedro, resuelto. Motion: una vez, ease-out, luego quietud total al
  servicio del CTA. Marca: "empezó pensando en sistemas, termina con el
  sistema completo" sin decir una palabra.
- **Principio.** Composición en anillo + closure (Gestalt).
- **Calibración.** PICO contenido al CTA: ocurre al entrar, antes de que el
  email reclame el foco. reduced/no-JS: sello sólido visible directamente.
- **Coste.** Canvas pequeño autodetenido; cero coste tras el segundo 2.

## P3 · LA DÉCADA QUE SE CONSTRUYE (documentada, no implementada)

- **Qué.** En Experiencia, los años-display no aparecen: CAEN y ENCAJAN como
  piezas sobre el eje (translateY corto + asentamiento sin rebote, 1 gesto
  por nodo). La década se construye al recorrerla.
- **Por qué no entra aún.** El timeline actual ya cumple y es zona de
  riesgo (§2): subir su intensidad merece verse con el resto del acto 2 en
  dispositivo real antes de decidir. Coste bajo si se aprueba (es CSS).

## P4 · EL HILO QUE RESPONDE (documentada, no implementada)

- **Qué.** En Sobre mí, hover sobre cada estación del hilo → su nodo y su
  tramo laten una vez (scale 1→1.15→1, 250 ms) y la estación enciende a
  terracota-profundo. El hilo deja de ser ilustración y pasa a responder.
- **Calibración.** Sigue contenida (respuesta local, sin loop); en táctil no
  existe (coherente con el hover unificado §5 — ver PEND-6 del informe).

## P5 · EL EQUIPO SE ORIENTA (documentada, no implementada)

- **Qué.** En Liderazgo, los 70 puntos ya alineados se ORIENTAN sutilmente
  hacia el cursor (cada punto, una elipse mínima que apunta; transform puro,
  amplitud 2-3 px). El sistema sigue ordenado, pero VIVO: setenta personas
  atentas a una dirección.
- **Riesgo.** Es la frontera del "todo boom": solo si tras verlo no roba
  protagonismo al "+70". Prototipo de 30 líneas si se quiere valorar.
