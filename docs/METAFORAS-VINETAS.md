# METÁFORAS PORTADORAS — viñetas 3–8 (doc-A v3 §0/§6)

Registro para revisión de Marc y dirección. Para cada viñeta: el consejo de
perspectivas convocado, la metáfora elegida, el principio de diseño que la
justifica, su calibración por acto y su coste con mitigación. Las viñetas 1–2
(Hero, Cita) llegaron cerradas de Design y no se rediseñan aquí.

Las metáforas se construyeron al 90% para poder verlas funcionando; ninguna se
da por CERRADA hasta validación de Marc.

---

## 3 · SOBRE MÍ — "El hilo constante"

- **Consejo.** Dirección de arte: el hilo literal del texto ("ese recorrido
  variado tiene un hilo constante") pedía hacerse visible, no decorar.
  UX-legibilidad: zona de riesgo — el dispositivo no puede pedir interacción ni
  robar tiempo a los 3 párrafos. Motion: un solo gesto de entrada, después
  quietud. Marca: la tesis debe quedar cosida al recorrido, no flotar.
- **Metáfora.** Los cuatro contextos del párrafo 1 (comunicación audiovisual,
  ventas B2B, dirección comercial, coordinación + automatización) como
  estaciones tipográficas dispersas que una línea-costura terracota recorre y
  une, desembocando en la síntesis "Pienso en sistemas."
- **Principio.** Gestalt de continuidad: elementos unidos por una línea se
  perciben como una misma trayectoria. La forma ejecuta el argumento.
- **Calibración.** Credibilidad, contenida: la costura se dibuja una vez
  (~1.3 s) al entrar y queda quieta. Legible de un vistazo.
- **Coste y mitigación.** Riesgo de robar foco a los párrafos → sin loop, sin
  interacción requerida, columna compacta que pasa arriba en móvil.
  reduced-motion: hilo ya cosido.
- **Decisión registrada.** El mapa §5 sitúa "sistemas" en el párrafo 1; aquí la
  palabra encendida vive en su eco display (el remate del hilo) para no
  duplicar el encendido en texto corrido. "problema" sí enciende en el
  párrafo 3. Si dirección prefiere literalidad estricta, es un cambio de
  una línea.

## 4 · FORMACIÓN — "El papel de plano"

- **Consejo.** Arte: el blueprint es la imagen natural del arquitecto; debe ser
  fondo, no ilustración. UX: la viñeta más subordinada del acto — un susurro
  que no compita con la Cita ni con Experiencia. Motion: revelado tenue, nada
  más. Marca: "diseñar la estructura antes de construirla" = el plano precede
  al edificio.
- **Metáfora.** Una rejilla milimetrada terracota al ~7% de opacidad nace tras
  la lección ("Donde aprendí a pensar como arquitecto") y la ficha del máster;
  el borde izquierdo terracota es el primer trazo del plano. La rejilla además
  alinea de verdad las fichas (función real, no decoración).
- **Principio.** Figura-fondo: el fondo da contexto semántico sin competir con
  la figura.
- **Calibración.** El susurro del acto 2: fade único de 0.9 s, cero interacción.
- **Coste y mitigación.** Riesgo de leerse como textura decorativa → opacidad
  mínima, anclada solo al bloque de la lección, alineación funcional.

## 5 · EXPERIENCIA — "La década que se erige"

- **Consejo.** Arte: eje vertical con nodos-rombo (eco lejano del Hero
  permitido por §8: marca simple, no el poliedro). UX: la viñeta más larga —
  la metáfora debe AYUDAR a escanear (año → cargo → 1-2 líneas). Motion:
  progressive disclosure ligada al scroll, stagger descendente (§6.5).
- **Metáfora.** El eje temporal se traza tramo a tramo conforme el lector
  desciende; cada nodo encadena un rol. La década se construye delante del
  lector — que es exactamente lo que el CV afirma de Marc.
- **Principio.** Convención de timeline editorial (reconocible al instante =
  legibilidad) + revelado progresivo.
- **Calibración.** Contenida con ritmo; raíces comprimidas a una línea con
  hover de opacidad (§6.5).
- **Decisión registrada.** El §1 lista Crown → Beral → Proyecto propio (por
  importancia). Un eje temporal no monótono (2025→2021→2026) rompe la
  metáfora: se ordenó cronológicamente descendente (2026 → 2025 → 2021).
  Lo reciente sigue pesando y Crown tiene su clímax en sección propia.
- **Coste y mitigación.** Longitud → compresión dura del texto del §1, banda
  de raíces de una línea.

## 6 · LIDERAZGO — "+70 en formación"

- **Consejo.** Arte: el golpe visual del acto — muchos elementos que un orden
  coordina, eco conceptual del caos→orden de la Cita en miniatura, en claro y
  sin copiar su mecánica (allí palabras 3D; aquí puntos 2D que se alinean una
  vez). UX: un solo golpe breve; el +70 manda. Motion: 70 transforms CSS con
  stagger de 12 ms, una vez.
- **Metáfora.** Setenta puntos (los miembros) viajan de la dispersión a una
  retícula 14×5 perfecta al entrar la viñeta: el liderazgo como sistema que
  organiza a muchos. El "+70" aparece limpio y quieto — sin count-up (§5).
- **Principio.** Gestalt de destino común: lo que se mueve junto se percibe
  como grupo coordinado.
- **Calibración.** Transición de credibilidad a clímax: algo más enérgica que
  el resto del acto 2, pero un único golpe (~0.85 s + stagger).
- **Coste y mitigación.** 70 nodos animados → solo transform/opacity,
  posiciones de dispersión deterministas (sin Math.random en render: evita
  divergencia servidor/cliente), reduced-motion arranca en retícula.

## 7 · CROWN PLANNER — "el sistema funcionando" (formato cerrado por doc)

- **Metáfora.** No abstracta: la prueba ES la máquina operando. Carrusel de
  7 slides (problema → solución → 4 mecánicas → la prueba) con zoom-lupa
  localizado sobre la captura (§5/§6.7).
- **Affordance.** Peek del siguiente slide (86%), flechas, puntos de progreso,
  scroll-snap nativo (swipe en móvil), tap para ampliar en visor.
- **Calibración.** PICO. La palabra encendida del hilo vector ("IA") vive en
  el slide final, junto al cómo.
- **Estado.** Placeholders claros (marco + rejilla de plano + etiqueta
  "Captura pendiente · datos 100% ficticios") hasta que Marc prepare capturas
  y Excel ficticios. La lupa ya opera sobre el placeholder: al llegar los
  assets solo se cambia el fondo por la imagen (mismo dispositivo). Los CTAs
  del slide final (demo + Excel) están en estado "Próximamente/Pendiente",
  honestos y visibles.

## 8 · CONTACTO — "el sistema se completa"

- **Consejo.** Arte: el espejo del Hero no se copia, se RESUELVE — del
  wireframe en movimiento (pensar) al rombo sólido y quieto (resuelto). UX:
  pico al servicio de la conversión — el email es lo más claro de la viñeta.
  Motion: ensamblaje de precisión, una vez.
- **Metáfora.** El rombo-sello sólido se posa; el marco técnico del email se
  ensambla desde las cuatro esquinas (cierre perceptivo) y respira al hover.
  Empezó "pienso en sistemas"; termina "hablemos".
- **Principio.** Gestalt de closure + composición en anillo (apertura/cierre).
- **Calibración.** PICO contenido al CTA: tras el ensamblaje, todo queda
  quieto. "oportunidad" enciende (excepción consciente del §5).
- **Coste y mitigación.** Nada compite con el email; datos secundarios e
  idiomas en N6. Sin LinkedIn (§10: no enlazar sin actualizar).

---

## Revisión de Marc sobre lo construido (2026-06-10, registro)

1. **Orden narrativo**: la Cita pasa tras Sobre mí (ritmo O–C–O–C–C–C–O–O):
   los dos picos oscuros pegados se fundían. Registrado también en doc-A §2.
2. **Sobre mí**: el hilo gana protagonismo — rediseñado como ÁRBOL DE
   CONVERGENCIA (tronco 3px + ramas a 45° + nodos rombo, geometría del Hero
   en marca simple) y se añade el MARCO TÉCNICO de la foto de perfil
   (esquinas como el CTA; hover b/n→color listo; falta el asset).
3. **Topbar**: la línea de la barra ahora cruza el hueco 2016—26 en reposo
   (solo los números la enmascaran); el eje la tapa al activarse.
4. **Cita**: cajas más anchas e igualadas (min-height común, cuerpo +8%) y
   reloj con más presencia (colchón 3.5%→2%).
5. **Logos**: slots tipográficos con data-logo en Formación (Level Up, UdL,
   ESCAC) y Experiencia (Crown, Beral, rombo para el proyecto propio) — se
   sustituyen por las imágenes reales cuando Marc las aporte. Se decidió NO
   añadir "fotografías de muestra" en Formación: §7 las excluye (solo foto
   de perfil + capturas del Crown); si Marc las quiere, decisión consciente
   contra §7 a registrar.
6. **Idiomas**: fuera de Contacto (nada que genere duda pegado al CTA;
   el B2 le restaba seguridad a Marc) → ficha discreta en Formación, sin
   destacar el nivel.

## Cita — física de tormenta y escenario móvil (2026-06-10, segunda pasada)

Marc detectó que el tornado "empeoraba con el tiempo" y no transmitía la
tormenta desenfrenada del concepto, y que en móvil el reloj seguía asfixiado.

- **Tres defectos del motor heredado**: damping aplicado por frame (doble
  freno a 120 Hz), pared del embudo rígida que asentaba las palabras en
  órbita laminar (el caos degeneraba en cilindro), y un NaN silencioso del
  HTML vivo (seed vertical fuera de rango → `pow(neg, 1.5)`) que perdía ~9%
  de las palabras y dejaba huecos en el reloj.
- **Física nueva**: damping normalizado por dt; remolino estratificado
  (spin propio por palabra); embudo más ancho de pared elástica; ráfagas
  coherentes con oleadas globales; recirculación por kicks (la tormenta
  escupe y vuelve a tragar — nada se asienta); autocuración con contador
  (ninguna partícula puede perderse). Verificado: energía sostenida sin
  decaer en 32 s (vMedia 0.92→0.76→0.81, healed 0).
- **Móvil**: el escenario pasa a pantalla propia (~82svh) y las cajas se
  leen DEBAJO en flujo — la tormenta ya no compite con el texto.
- **Fallback**: 6 s → 9 s visible sin interacción (el teatro también es
  tesis). Giro de cámara del tornado 0.22→0.26.

## Glifos-leyenda e índice de 8 (2026-06-10, tercera pasada)

1. **Los glifos del índice pasan a las secciones** (junto al sect-label,
   20 px, terracota): el índice se vuelve leyenda del mapa — consejo:
   refuerza orientación, es material propio del sistema (familia wireframe
   del poliedro), no icon-soup. Contraste gráfico 3.45:1 sobre blanco
   (supera el 3:1 de WCAG para no-texto).
2. **Tres glifos refinados** para dialogar con las metáforas construidas:
   Sobre mí (convergencia: tres ramas a un nodo-rombo), Experiencia (eje
   con nodos-rombo), Liderazgo (retícula de puntos en formación). Única
   fuente en src/components/glifos.tsx.
3. **La Cita entra al índice como "MANIFIESTO"** (03, glifo reloj de
   arena): es la declaración del cómo pienso y dialoga con la voz
   Manifiesto del Hero. Ocho entradas.
4. **Más presencia del tornado/reloj**: boca del embudo +6% (RAD 1.06),
   proyección menos estirada (VY 1.12 → +5% de escala), colchón 0.8%/12px,
   palabras +7% y granos +8% adicionales. El reloj nunca se recorta.
5. **Panel de Tweaks eliminado** (decisión de Marc): voz Manifiesto,
   composición centrada y acento #C0542A consagrados como definitivos en
   los tokens; las composiciones editorial/elevada retiradas del código.
   window.__cita queda como contrato de auditoría sin UI.

## Decisiones de integración transversales (registro)

1. **Oswald como tercera familia** (--font-banner): la traen los HTML vivos
   aprobados (topbar, índice, labels, cajas de la Cita). Desviación del §3.1
   validada de facto en Design; cargada con next/font.
2. **Cita — activador**: el HTML vivo activa por clic/tap en "DISEÑAR" (la
   palabra-acto: clicar "diseñar" ES ordenar el sistema). Se añadió el
   fallback del §6.2: ~6 s visible sin interacción → la forma se ordena sola.
   El seed es un botón real (teclado accesible).
3. **Cita — ediciones manuales de Marc** en el editor de Design respetadas:
   "DISEÑAR" a 34 px fijos y cuerpo de cajas +11%.
4. **Topbar fija y adaptable** (§4): los standalone la llevaban absoluta
   dentro del Hero; en la página completa pasa a fija con tema claro/oscuro
   según la sección que cruza (requisito "adaptable al fondo").
5. **Tweaks unificados**: un único panel global (grupos Hero/Cita + acento
   global) con el mismo contrato del vivo (CSS vars + evento tweakchange +
   window.__cita).
6. **terracota-tenue #D06A3F**: tercera profundidad calculada para palabras
   encendidas sobre fondo oscuro (5.5:1 AA); el vivo #C0542A se queda en
   acentos grandes y el profundo #A8421E en texto pequeño sobre blanco (6.9:1).
