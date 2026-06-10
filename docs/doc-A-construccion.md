# CV MARC SOLA — ESPECIFICACIÓN DE CONSTRUCCIÓN (Documento A · v3)

Para implementación (Claude Code) y versionado en repo. Contiene el QUÉ y el CÓMO
construir: contenido, sistema de diseño, fichas de sección, efectos. La estrategia
personal y el guion de entrevista están en un documento aparte (privado, no en repo).

Objetivo: web de una página, en español, que sirva de CV para una candidatura en Sylo
(departamento de proyectos). Plazo orientativo: ~1-2 semanas, calidad por encima de prisa.

───────────────────────────────────────────────────────────
CAMBIO DE PARADIGMA (v3 — leer antes que nada)
───────────────────────────────────────────────────────────
Las versiones previas describían una web SOBRIA con efectos discretos y un catálogo de
efectos CERRADO. Tras ejecutar Hero y Cita en Design, el proyecto ha dado un giro deliberado
hacia un principio más ambicioso, ya probado y validado:

  → Cada viñeta encarna su concepto mediante una METÁFORA VISUAL PORTADORA (ver §0).

Esto FLEXIBILIZA dos cosas que antes estaban cerradas, y se hace A CONCIENCIA:
- El §5 deja de ser un "catálogo cerrado de efectos": ahora cada viñeta puede tener su
  propio dispositivo conceptual original. Las REGLAS GLOBALES del §5 (transform/opacity,
  prefers-reduced-motion, un foco por viñeta) SIGUEN vigentes; lo que se abre es el repertorio.
- El §10 (no-objetivos) se relaja: "La Red" como recurso conceptual ya NO está prohibida en
  general — puede aparecer como metáfora de una viñeta si la sirve. Lo que sí se mantiene
  prohibido: clichés vacíos (count-up, marquee, glitch porque sí) y decoración sin función.

La libertad es CONCEPTUAL (qué metáfora), nunca de SISTEMA (tokens, rejilla, tipografía,
accesibilidad siguen siendo ley). Y está CALIBRADA por acto narrativo (ver §0). Es un cambio
registrado, no una deriva: el norte sigue siendo "arquitecto que ordena", no "diseñador que
se luce".

═══════════════════════════════════════════════════════════
0. PRINCIPIO RECTOR — METÁFORA VISUAL PORTADORA + CALIBRACIÓN
═══════════════════════════════════════════════════════════

PRINCIPIO (el alma del proyecto):
Cada viñeta encarna su concepto a través de una metáfora visual/interactiva original — un
dispositivo de composición o animación que DEMUESTRA el mensaje en lugar de decorarlo. La
forma ejecuta el argumento. No es un efecto añadido a un texto: es el texto hecho mecánica.

Ejemplos ya construidos (son el listón a igualar o superar):
- HERO: un poliedro/octaedro de nodos con física real ES el sistema del que habla "pienso en
  sistemas". La estructura geométrica encarna la palabra.
- CITA: la palabra "sistema" repetida CONSTRUYE una forma (reloj de arena/diamante); entra
  en caos y se ORDENA en oleada al pasar el cursor (caos→orden). La mecánica DEMUESTRA la
  tesis "diseñar es poner orden". El medio es el mensaje.

Las viñetas futuras (Sobre mí, Formación, Experiencia, Liderazgo, Crown Planner, Contacto)
requieren CADA UNA su propia metáfora portadora. No se acepta "texto sobrio + gesto base"
como solución para una viñeta: hay que encontrar qué dispositivo encarna su idea.

PRINCIPIO DE CALIBRACIÓN (igual de importante — esto evita el "todo boom"):
No todas las viñetas gritan con la misma fuerza. La intensidad de la metáfora se calibra
según el papel narrativo (ver §2, los tres actos):
- PICOS (Hero, Cita, Crown Planner, Contacto): metáfora al MÁXIMO. Conceptual, memorable,
  el lector se detiene. Son los momentos donde la web deslumbra.
- CREDIBILIDAD (Sobre mí, Formación, Experiencia, Liderazgo): metáfora CONTENIDA. Tienen su
  dispositivo original, pero al servicio de la LECTURA RÁPIDA, no por encima de ella. Son la
  "zona de riesgo" (§2): si se sienten lentas o exigen demasiado descifrado, se pierde al
  lector antes del clímax. Originalidad sí, pero que se lea de un vistazo.

Por qué la calibración ES criterio profesional: una web que grita constantemente AGOTA y
lee como "diseñador luciéndose". Una que sabe cuándo intensificar y cuándo contener
demuestra dominio — y refuerza el mensaje de Marc ("claridad bajo complejidad"). El contraste
de intensidad entre picos y credibilidad es, en sí mismo, el ritmo de la web. Sin valles no
hay picos.

REGLA PRÁCTICA: si una metáfora de viñeta de credibilidad obliga al lector a "trabajar" para
entender qué pasa, está mal calibrada — recórtala. Si una de pico es tímida, súbela.

═══════════════════════════════════════════════════════════
1. CONTENIDO (texto final, literal)
═══════════════════════════════════════════════════════════

HERO
- Eyebrow: PROYECTOS · AUTOMATIZACIÓN CON IA · ESTRATEGIA COMERCIAL
- Nombre: Marc Sola
- Tagline: "Pienso en sistemas, construyo soluciones."
- Lead: "Una década entre comunicación, ventas y liderazgo de equipo — hoy volcada
  en diseñar y automatizar procesos con IA."

CITA-BISAGRA
"Se puede dejar que un sistema encuentre su forma, o concebir su estructura desde los
cimientos. Elijo lo segundo: diseñar antes de construir, pensar el todo antes de la parte."

SOBRE MÍ (3 párrafos)
Llevo una década resolviendo problemas en contextos muy distintos: comunicación
audiovisual, ventas B2B, dirección comercial y, ahora, coordinación de equipo y
automatización de procesos. Ese recorrido variado tiene un hilo constante — pienso en
sistemas. Descompongo un problema en sus piezas, entiendo cómo encajan y diseño la solución.

Hoy coordino un equipo técnico, y he aprendido que liderar no es repartir tareas: es leer
dónde hay fricción, mantener la comunicación clara y cuidar la carga de cada persona.
Detecto pronto cuándo algo no fluye y me centro en resolverlo, porque me importa de verdad
que el problema se solucione, no solo que quede registrado.

Esa misma lógica me llevó a la automatización con IA. Diseño el sistema, oriento
herramientas como Claude y construyo soluciones que quitan el trabajo mecánico para que las
personas se dediquen a lo que de verdad aporta. No vengo del código — vengo del problema.
Y cada vez me obsesiona más construir la herramienta que lo resuelve.

FORMACIÓN
- Game & Concept Design — Level Up Game Dev Hub · 2023–2024. "Donde aprendí a pensar como
  arquitecto: diseñar la estructura de un sistema completo antes de construirlo, documentar
  y gestionar un proyecto de principio a fin. El contexto era el diseño de videojuegos; la
  lección — estructurar, planificar, iterar — es la que aplico hoy a cualquier sistema."
- Grado en Comunicación Audiovisual — Universitat de Lleida · 2012–2017. Con intercambio en
  la Universidade de Santiago de Compostela.
- Narrativa interactiva — ESCAC · 2025 (mención breve).
(Formación va ANTES que Experiencia por razón narrativa, no de jerarquía — ver §4.)

EXPERIENCIA
Detalladas:
- Coordinador de servicios técnicos — Crown Lift Trucks · dic. 2025–actualidad. Coordino un
  equipo técnico y la planificación de sus intervenciones; asignación de trabajo,
  comunicación del equipo y seguimiento contable. Por iniciativa propia diseñé un sistema de
  asignación inteligente de órdenes (ver Crown Planner).
- Sales Specialist — Beral Projects · feb. 2021–sept. 2024. Ventas y postventa de cartera
  B2B, contenido web, apoyo a marketing audiovisual, estrategia comercial y contabilidad.
  Superé los 2 M€ en ventas liderando la estrategia con clientes.
- Proyecto propio · E-commerce B2C · 2026–actualidad. Diseño y opero un proyecto de comercio
  digital de principio a fin: nicho con análisis de datos, automatización con IA, pricing y
  canal. Entorno donde aplico las mismas capacidades que desarrollo profesionalmente.
Comprimidas (trayectoria previa):
- Business Consultant — Ondas System · 2018–2019. Estrategia comercial B2B para pymes,
  trabajando para Vodafone en punto de venta. Entre los consultores mejor valorados.
- Socio fundador · Productor audiovisual — MalRai Studio · 2019–2020. Comunicación digital,
  guion, edición, producción.
- Ayudante de producción — Produccions Antàrtida (TV) · 2016. Concurso infantil Picalletres.

LIDERAZGO
Dirección de una asociación cultural — 2017–2021. Dirigí durante cuatro años una asociación
cultural sin ánimo de lucro de más de 70 miembros: coordinación de personas, organización de
actividades y sostenibilidad de un proyecto colectivo a lo largo del tiempo.

ATLAS (proyecto destacado / clímax) — REVISIÓN 2026-06-10
Crown Planner evolucionó a ATLAS: motor de planificación del servicio técnico con
cuatro módulos en uso (diaria, mensual, anual, asignación CAT), equidad por horas
reales calibrada con datos, tiers de prioridad operativa (emergencia → urgente →
antigüedad → revisión), memoria de flota (~4.500 máquinas) y resultados validados en
simulador (~1.500 máquinas: −26% desequilibrio, −38% km, −47% carga pico, <200 ms).
La viñeta usa RECREACIONES en HTML vivo con la identidad control-tower de Atlas y
datos 100% INVENTADOS (cero información operativa de Crown Lift Trucks, cero datos
personales). La lupa sobre capturas reales volverá cuando exista el perfil visitante
de la demo. El bloque siguiente se conserva como registro del origen:

CROWN PLANNER (texto original v3)
Crown Planner — Sistema de asignación inteligente de órdenes de servicio. Prototipo
conceptual, diseñado y construido en solitario.
- El problema: la asignación de órdenes a técnicos se hacía a mano, dependía del criterio
  del coordinador, no se veía el desequilibrio de carga hasta que daba problemas.
- La solución: sistema que distribuye automáticamente las órdenes del día; lee el informe
  del ERP, propone asignación equilibrada, marca casos sin cobertura, prepara el aviso.
- La inteligencia del sistema (4 mecánicas reales): score dinámico según perfil del técnico ·
  ponderación por proximidad + antigüedad + carga · detección de saturación por zona +
  aviso de casos sin cobertura · lectura del Excel del ERP con mapeo de columnas que se
  recuerda entre sesiones.
- Cómo: sin ser programador; diseñé la lógica y la materialicé orquestando IA (Claude, entre
  otras) sobre datos en Excel. Prototipo funcional de principio a fin.
- Qué demuestra: detectar un problema operativo, diseñar el sistema que lo resuelve y
  construirlo con las herramientas disponibles, sin esperar a que alguien lo programe.

CONTACTO
- Frase de cierre: "Hablemos de la próxima oportunidad."
- Email: marcsolabel@gmail.com · Tel: 608 254 126 · Esparreguera, Barcelona
- Idiomas (fundidos aquí): Catalán · Español (nativos) · Inglés B2 (IELTS, destacado) ·
  Portugués (básico).
- LinkedIn: /in/marc-sola-bel — PENDIENTE actualizar antes de enlazar, o no enlazar (hoy el
  perfil está orientado a Game Designer, desalineado con este CV).

═══════════════════════════════════════════════════════════
2. ORDEN NARRATIVO — TRES ACTOS
═══════════════════════════════════════════════════════════

ACTO 1 — APERTURA / gancho conceptual (fondo oscuro):
  1. HERO — qué aportas.
  2. CITA DEL ARQUITECTO — cómo piensas. (Hero+Cita = bloque de apertura oscuro de 2 tiempos.)
ACTO 2 — CREDIBILIDAD (fondo claro):
  3. SOBRE MÍ — quién eres.
  4. FORMACIÓN — dónde aprendiste a pensar así (la raíz).
  5. EXPERIENCIA — la década que lo respalda.
ACTO 3 — CRESCENDO, CLÍMAX Y CIERRE:
  6. LIDERAZGO +70 (claro) — golpe de credibilidad que eleva hacia el pico.
  7. CROWN PLANNER (oscuro) — el clímax. La prueba.
  8. CONTACTO (oscuro) — clímax pegado al CTA, sin enfriamiento.

RITMO DE FONDOS: O–O–C–C–C–C–O–O. No es alternancia mecánica: dos bloques oscuros (apertura
y clímax+cierre) enmarcan un cuerpo claro de credibilidad. El fondo refuerza los tres actos.

DECISIÓN 2026-06-10 (Marc, sobre lo construido): la CITA pasa a ir DESPUÉS de Sobre mí.
Orden vigente: Hero (O) · Sobre mí (C) · Cita (O) · Formación (C) · Experiencia (C) ·
Liderazgo (C) · Crown Planner (O) · Contacto (O) — ritmo O–C–O–C–C–C–O–O. Razón: los dos
picos oscuros de apertura pegados se fundían sin separación; el blanco intermedio crea el
contraste negro·blanco·negro y deja respirar ambos dispositivos. La cita sigue siendo la
bisagra conceptual (declara el cómo pienso) y conserva su calibración de PICO. En la misma
revisión: idiomas salen de Contacto (nada que genere duda pegado al CTA) y se reubican
discretos en Formación; se preparan slots de logo (instituciones y empresas) y el marco de
la foto de perfil en Sobre mí.

CURVA DE ENGAGEMENT: gancho fuerte → bajada controlada a credibilidad → subida (Liderazgo) →
pico (Crown Planner) → conversión (Contacto). Clímax tardío elegido a conciencia: máximo
impacto para quien llega, A CAMBIO de que cada viñeta previa se gane el siguiente scroll.
ZONA DE RIESGO: viñetas 3-4-5 (cuerpo claro). Deben ser impecables y ágiles — breves, con
contraste de escala que sostenga el interés. Si se sienten lentas, se pierde al lector.

ORDEN FORMACIÓN→EXPERIENCIA: por importancia Experiencia pesa más y normalmente iría antes.
Aquí Formación la precede por razón NARRATIVA (causa→efecto): explica el origen del
arquitecto; Experiencia lo aplica. Funciona solo si Formación se mantiene breve y subordinada.
NO reordenar como si fuera error de jerarquía: es deliberado.

═══════════════════════════════════════════════════════════
3. SISTEMA DE DISEÑO (capa profesional — tokens centralizados)
═══════════════════════════════════════════════════════════

Todo lo de esta sección se implementa como TOKENS (CSS custom properties): color,
tipografía, espaciado, radios, duraciones. Nada "a pelo". Cambiar un valor = editar el token.

NOTA DE RESPONSABILIDAD: la REJILLA (§3.3) y el ESPACIADO (§3.4) están definidos y auditados
por dirección con criterio profesional. Son valores estándar y deliberados. NO modificar a
ojo ni "ajustar por intuición" — si algo se ve descuadrado al bocetar, reportarlo a dirección
para ajuste con criterio, no cambiar los valores directamente. Esta capa es técnica, no de
gusto.

--- 3.1 TIPOGRAFÍA ---
Familias:
- Display/UI/cuerpo: "Bricolage Grotesque", variable 200–800.
  Font stack: Bricolage Grotesque, -apple-system, "Segoe UI", Roboto, sans-serif.
- Acento (solo cita y momentos puntuales): "Cormorant Garamond", italic.
  Font stack: Cormorant Garamond, Georgia, "Times New Roman", serif.
- Ambas con font-display: swap. Bricolage manda en 5 de los 6 niveles; Cormorant solo en
  la cita (si dudas, va en Bricolage).

Unidad: REM (no px fijos), base 1rem = 18px (cuerpo generoso). Respeta preferencias de
accesibilidad del usuario.

Escala — DOBLE razón con arma selectiva:
- Niveles de uso normal: escala CONTENIDA razón 1.25 desde 18px. Cuerpo, subtítulos,
  metadatos, titulares estándar. Armónica, legible, sin drama.
- Niveles DISPLAY (el "arma"): RUPTURA hiperbólica de escala, no el siguiente paso —
  tamaño deliberadamente desproporcionado respecto al cuerpo. Escalado FLUIDO con clamp()
  (mín, valor que escala con viewport, máx): contraste relativo brutal constante, tamaño
  absoluto responsive (se achica en móvil sin romper layout).

REGLA DE USO DEL ARMA (crítica): el salto hiperbólico se usa MÁXIMO una vez por viñeta y
SOLO en viñetas de impacto: statement del Hero, "+70" de Liderazgo, años de Experiencia, y
la cita (a su manera con Cormorant). En el resto (Sobre mí, Formación, Contacto) NO se
dispara: viven en la escala contenida. El contraste extremo es escaso — por eso golpea.

Los 6 niveles:
- N1 Display/statement — Bricolage 700–800, arma. Hero, +70, años.
- N2 Titular de sección — Bricolage 600–700.
- N3 Subtítulo/destacado — Bricolage 500–600. Cargos, frase-lección.
- N4 Cuerpo — Bricolage 400, base 18px. Prioridad legibilidad.
- N5 Cita — Cormorant italic, tamaño entre N2 y N1, peso ligero de serif.
- N6 Metadatos/nav/pies — Bricolage 400 pequeño, a veces versalita/tracking. Eyebrow, barra,
  fechas, datos secundarios.

Line-height por nivel: Display 1.05–1.1 (apretado, bloque con fuerza) · titulares 1.2 ·
cuerpo 1.55 (holgado, cómodo) · cita 1.7 (muy holgado, meditación) · metadatos 1.3.

Cuidado milimétrico en lo grande (N1/N2): con contraste agresivo, cada salto de línea,
corte de palabra y aire encima/debajo se amplifica. Componer N1/N2 con precisión.

--- 3.2 COLOR ---
Neutros:
- Blanco #FFFFFF (fondo claro base) · Negro #0A0A0A (fondo oscuro, texto sobre claro).
- Escala de grises con FUNCIÓN (valores exactos a calcular verificando contraste):
  gris-borde (líneas finas/divisorias) · gris-texto-2 (#6B6560, texto secundario sobre
  claro) · gris-sobre-oscuro (claro no-blanco, jerarquía de texto en viñetas oscuras) ·
  gris-sutil (deshabilitado/estados).

Terracota — UN tono en ESCALA DE PROFUNDIDADES (no varios colores):
- terracota-vivo #C0542A — acentos grandes, elementos, rombo, momentos de impacto. Donde
  AA de texto pequeño no aplica (es grande o no es texto).
- terracota-profundo (versión más oscura del mismo tono, a calcular) — SÍ pasa WCAG AA sobre
  blanco. Para terracota en texto pequeño/normal (un enlace, palabra clave en párrafo).
- terracota-tenue (más claro/desaturado, opcional) — fondos sutiles, estados hover.
Principio: un color con registro grave/medio/agudo, no tres colores. Terracota ESCASO y
estructural siempre.

--- 3.3 REJILLA Y BREAKPOINTS ---
- Escritorio ≥1440px: 12 columnas. Contenido máximo 1280px centrado (legibilidad: línea de
  texto 50–75 caracteres). FONDOS a sangre completa (borde a borde); CONTENIDO contenido a
  1280 dentro.
- Tablet 768px: 8 columnas.
- Móvil 360px: 4 columnas (la mayoría del contenido a ancho completo; rejilla da flexibilidad).
- La "regla de tercios" vive dentro de la rejilla: un tercio = 4 col, dos tercios = 8 col.
  Ej. Hero "peso izquierda/aire derecha" = contenido col 1-7, aire col 8-12.

--- 3.4 ESPACIADO ---
Escala base 8px: 4 (microajuste) · 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160. Todo espacio
sale de aquí; nunca un valor fuera de escala.
Jerarquía de aire: entre secciones = alto (96–160, luxury pacing) · dentro de sección =
medio (24–48) · entre elementos relacionados = bajo (8–16). El espacio comunica estructura
(proximidad = relación).

--- 3.5 COHERENCIA DEL DETALLE ---
- Radios de esquina: un único valor en toda la web (o esquinas vivas; decisión menor al
  bocetar). Coherente siempre.
- Duraciones de transición (escala): rápida 150ms · media 250ms · lenta 400ms.
- Easing: ease-out para entradas/apariciones; ease-in-out para cambios de estado (hover).
- Foco y cursor coherentes en toda la web.

═══════════════════════════════════════════════════════════
4. BARRA SUPERIOR (elemento transversal — modelo Yann Novak)
═══════════════════════════════════════════════════════════

MODELO DE REFERENCIA: la barra de yannnovak.com. Input innegociable.

COMPOSICIÓN EXACTA DE LA BARRA DE YANN NOVAK (a replicar estructuralmente):
Cuatro elementos repartidos a lo ancho sobre UNA SOLA LÍNEA, conectados por una línea
horizontal fina que cruza todo el ancho de pantalla. De izquierda a derecha:
  [extremo izq] NOMBRE · [centro-izq] DESCRIPTOR · [centro-der] RANGO TEMPORAL · [extremo der] ACCESO
En Yann Novak: "Yann Novak" · "Selected Works" · "2008—26" · "[MENU]".
- Los cuatro a la misma altura, tipografía PEQUEÑA, peso medio.
- Espaciado GENEROSO entre ellos (repartidos a lo ancho, no agrupados).
- La línea fina horizontal conecta los huecos entre los elementos, cruzando el ancho completo.
- "[MENU]" entre corchetes (detalle de estilo técnico).

TRADUCCIÓN A MARC SOLA:
  "Marc Sola" · "CV" (o rol breve) · "2016—26" (la década) · "[MENÚ]" (o shortcuts a secciones)
sobre la misma línea fina horizontal, mismo reparto a lo ancho con espacio generoso.

A replicar además:
- Texto pequeño, discreto, minúscula o versalita fina. CERO decoración, cero botones con
  fondo, cero subrayados. Acompaña, no compite.
- ADAPTABLE AL FONDO: color del texto y la línea según la sección (claro sobre oscuro,
  oscuro sobre claro). Requisito.
- Hover de opacidad en los enlaces (principio de hover unificado, §5).
- Función: acceso directo a cada sección. Responsive: en móvil colapsa a menú compacto
  (no apelotonar los 4 elementos en 360px).

═══════════════════════════════════════════════════════════
5. EFECTOS E INTERACCIÓN (repertorio abierto — gobernado por reglas, no cerrado)
═══════════════════════════════════════════════════════════

CAMBIO v3: esto ya NO es un catálogo cerrado. Cada viñeta puede tener su metáfora portadora
con su dispositivo propio (§0). Lo que permanece son las REGLAS GLOBALES (abajo) y el sistema
de HOVER UNIFICADO, que dan coherencia aunque las mecánicas varíen.

REGLAS GLOBALES (siguen siendo LEY, gobiernan cualquier metáfora nueva):
- Se anima preferentemente TRANSFORM y OPACITY (rendimiento). Si una metáfora necesita canvas
  u otra técnica (como la peonza del Hero), está permitido, pero debe rendir bien y degradar.
- Nada rebota de forma cinematográfica gratuita; el movimiento sirve al concepto, no al lucimiento.
- prefers-reduced-motion desactiva animaciones dejando los ESTADOS FINALES visibles y legibles.
- Idealmente UN foco de interacción por viñeta (el dispositivo portador). No saturar con
  micro-efectos que compitan con él.
- Duraciones y easing según §3.5.
- Fallback digno siempre: si el JS falla, la viñeta se lee y se entiende.

PRINCIPIO DE HOVER UNIFICADO: "al interactuar, el elemento revela color/intensidad." Un solo
idioma en tres INTENSIDADES según importancia:
- Notable: foto de perfil b/n → color.
- Media: DATOS-ANCLA y PALABRAS DEL HILO VECTOR negro → terracota-profundo (el tono que pasa
  AA, §3.2). REGLA RECTORA: el terracota de texto solo enciende (a) números/datos singulares
  destacados, y (b) palabras del HILO VECTOR — sistemas / problema / arquitecto /
  automatización-IA. NUNCA otras palabras, NUNCA prosa entera, NUNCA adjetivos de relleno. El
  color narra el mensaje en una capa: las palabras encendidas, leídas juntas, SON la tesis.
  Una por viñeta como máximo, a veces ninguna.

  MAPA EXACTO de palabras encendidas:
  · Hero (tagline): "sistemas".
  · Sobre mí: "sistemas" (párr. 1) + "problema" (en "vengo del problema").
  · Formación: "arquitecto".
  · Crown Planner: "automatización" o "IA" en un slide clave.
  · Liderazgo: el "+70" (dato-ancla).
  · Experiencia: los años del eje (dato-ancla).
  · Contacto: "oportunidad" — EXCEPCIÓN consciente al hilo vector (registro emocional del
    cierre, no técnico). Es deliberada, no un descuido. Si se prefiere pureza, omitir.
  · Cita: el "Se" inicial y el encendido acumulativo de cada "sistema" a blanco (ver §6.2).

- Sutil: enlaces y nav, opacidad (tenue → encendido).

DISPOSITIVOS PORTADORES YA DEFINIDOS (los demás se proponen por viñeta, ver §6):
- GESTO BASE: aparición fade + leve subida al entrar en viewport. Base común de TODAS las
  viñetas (compatible con su metáfora portadora, no la sustituye).
- HERO: statement con PESO VARIABLE de Bricolage reactivo al cursor (200↔800 según proximidad)
  + poliedro/octaedro de nodos con física (momento+fricción+rebote), autoajustado para no
  recortar. En móvil: reacciona a scroll / entra con animación de peso al cargar. Fallback:
  peso fijo digno. (Ver §6.1 y §8.)
- CITA: "sistema" repetida construye una forma (reloj de arena/diamante); mecánica caos→orden
  activada por cursor (fallback ~2.4s); encendido acumulativo; cajas laterales con hover
  blanco⇄terracota. (Ver §6.2.)
- CROWN PLANNER (pico): CARRUSEL de slides (swipe horizontal, vuelta atrás) + ZOOM-LUPA
  localizado sobre captura HD. En móvil: pinch/tap. Affordance horizontal clara (puntos/flecha/
  borde del siguiente slide asomando) porque vive dentro de scroll vertical. (Ver §6.7.)
- CONTACTO: marco técnico de esquinas en el email (firma de precisión), afinable al hover, +
  su metáfora de cierre (eco invertido del Hero, ver §6.8).

ELIMINADOS a conciencia (clichés vacíos — NO reintroducir como recurso gratuito): count-up de
cifras, marquee/teletipo, glitch porque sí. Si alguno reapareciera, tendría que justificarse
como metáfora portadora genuina, no como adorno.

═══════════════════════════════════════════════════════════
6. FICHAS DE VIÑETA (composición + metáfora portadora de cada sección)
═══════════════════════════════════════════════════════════

Constantes en todas: rejilla · paleta · Bricolage+Cormorant · gesto base · fondo asignado ·
sistema de hover unificado. Cada viñeta DEBE tener su metáfora visual portadora (§0),
calibrada según su acto: máxima en picos, contenida y legible en credibilidad.

CÓMO PROPONER LA METÁFORA DE LAS VIÑETAS AÚN ABIERTAS (3,4,5,6,7,8): para cada una, antes de
construir, (a) convocar un consejo de perspectivas (dirección de arte / UX-legibilidad /
motion / estrategia de marca), (b) proponer el dispositivo que encarna su mensaje conectado
al contenido real del §1, citando un principio de diseño, (c) declarar su coste y mitigación
(legibilidad, rendimiento, reduced-motion, responsive), (d) verificar coherencia con el
sistema (§3) y la calibración (§0). Solo entonces construir. Hero y Cita ya están cerradas y
sirven de listón.

Las metáforas-candidatas que se anotan abajo son PISTAS, no órdenes: el consejo puede
superarlas si encuentra algo mejor y mejor calibrado.

1. HERO · oscuro · CERRADO · viñeta-modelo · metáfora portadora: el poliedro ES el sistema
   - Domina: el statement (arma tipográfica). Texto: "Pienso en sistemas / construyo
     soluciones." (SIN coma tras "sistemas" — la palabra encendida queda limpia). Tercios:
     peso izquierda (col 1-7), aire derecha (col 8-12).
   - Metáfora: poliedro/octaedro de nodos conectados con física real (momento+fricción+rebote),
     terracota, autoajustado para no recortar nunca; ES la estructura-sistema de la que habla
     el statement. Lanzable/rotable al cursor. Exclusivo del Hero (§8).
   - Interacción: peso variable al cursor en el statement (200↔800) + poliedro reactivo.
     "sistemas" enciende a terracota. Menú-índice desplegable bajo [MENÚ] (7 entradas).
   - Tweaks (panel de controles): Voz (Contenida/Editorial/Manifiesto) · Composición
     (Editorial/Centrada/Elevada) · Acento. Pendiente menor: suavizar el recentrado del
     arrastre (lerp).
   - Calibración: es PICO (acto 1). Metáfora al máximo.

2. CITA · oscuro · CERRADA · metáfora portadora: caos→orden
   - Metáfora: la palabra "sistema" repetida en muchos tamaños CONSTRUYE una forma generada
     por código (reloj de arena con diamante central; variantes en Tweaks: Reloj/Diamante/
     Cascada). Encarna "pienso en sistemas" + demuestra "diseñar es ordenar".
   - Mecánica caos→orden: al cargar, cada "sistema" entra dispersa, girada y en movimiento
     (chaosDrift). Un activador —el cursor entrando en la composición, con fallback automático
     a ~2.4s— la ordena en oleada hasta la forma limpia y la asienta en flotación sutil
     (floatSis). La interacción ES la tesis: el diseño pone orden en el sistema.
   - "sistema" en terracota; encendido acumulativo: al pasar el cursor sobre cualquier
     "sistema" se vuelve blanca y se queda (revelado progresivo).
   - Cajas laterales (la cita en prosa, repartida): recuadradas y alineadas, en blanco;
     hover alterna blanco⇄terracota en cada entrada del cursor (no permanente, ~0.5s). Son
     texto estructurado, no decoración. Cormorant italic.
   - Calibración: es PICO (acto 1). Metáfora al máximo.

3. SOBRE MÍ · claro · ABIERTA · metáfora portadora: A PROPONER (calibrada — credibilidad)
   - Domina: frase-síntesis grande + 3 párrafos en N4 cómodo. Tercios: foto izquierda, texto
     derecha (alterna con Hero).
   - Ilustración: FOTO DE PERFIL (condicional a calidad; si no, tipográfica — ver nota
     plan B abajo). Interacción: hover b/n→color en la foto.
   - Metáfora-candidata (pista): el "hilo constante" hecho visible — piezas/contextos dispersos
     (comunicación, ventas, automatización) que revelan un patrón común, un hilo que los cose.
     CALIBRADA: contenida, legible de un vistazo (zona de riesgo). No debe robar tiempo de
     lectura a los 3 párrafos.

4. FORMACIÓN · claro · ABIERTA · metáfora portadora: A PROPONER (calibrada — credibilidad)
   - Domina: frase "aprendí a pensar como arquitecto" en grande, ANCLADA a su contexto (no
     flota). Breve y subordinada (no competir con la Cita: la cita declara, esto demuestra
     el origen). Interacción base: gesto base. "arquitecto" enciende a terracota.
   - Metáfora-candidata (pista): el origen/raíz del sistema — un plano, un cimiento, un primer
     trazo del que nace la estructura. CALIBRADA: muy contenida, es la viñeta más subordinada
     del acto. Su metáfora debe ser un susurro, no competir con la Cita ni con Experiencia.

5. EXPERIENCIA · claro · ABIERTA · metáfora portadora: A PROPONER (calibrada — credibilidad)
   - Domina: los años en grande (arma), anclando un eje temporal vertical ligero. 3 roles
     detallados arriba + 3 comprimidos abajo (raíces). Lo reciente pesa. Los años del eje
     encienden a terracota (dato-ancla).
   - Metáfora-candidata (pista): el tiempo como ESTRUCTURA que se construye — nodos en una
     línea/eje que se van encadenando, una década que se erige. Puede dialogar con la idea de
     sistema sin copiar el poliedro del Hero (ese es exclusivo, §8): aquí marca/punto simple.
   - CALIBRADA: contenida, pero es la más larga del acto — la metáfora debe AYUDAR a recorrer
     la década rápido (ritmo, jerarquía), no entorpecerla. Interacción: gesto base con stagger
     descendente; hover de opacidad en los comprimidos.

6. LIDERAZGO · claro · sección propia breve · ABIERTA · metáfora portadora: A PROPONER
   - Domina: "+70" en grande (arma) con "miembros" pegado pequeño + frase en N4. Mucho aire
     (la viñeta más luxury en espacio). El "+70" aparece limpio (sin count-up). Enciende a
     terracota (dato-ancla).
   - Metáfora-candidata (pista): muchos elementos que un orden coordina — +70 puntos/personas
     que una estructura alinea, el liderazgo como sistema que organiza a muchos. Un golpe
     visual breve. CALIBRADA: es transición de credibilidad a clímax (eleva hacia el pico);
     puede ser algo más enérgica que las otras de credibilidad, pero sigue siendo BREVE — un
     solo golpe, no un desarrollo.

7. CROWN PLANNER · oscuro · clímax · PICO · metáfora portadora: el sistema FUNCIONANDO
   - FORMATO: carrusel de slides (un concepto por slide, swipe, vuelta atrás). Cada slide =
     captura de alta calidad + explicación. Slide final: enlace a la web (probarla) + icono
     de Excel descargable (cargarlo en la demo). "automatización"/"IA" enciende en slide clave.
   - Metáfora: la prueba ES el propio sistema operando — el carrusel + zoom-lupa permiten ver
     la inteligencia real (las 4 mecánicas). Aquí la metáfora no es abstracta: es enseñar la
     máquina funcionando. CALIBRADA: PICO, el clímax de la web. Máximo cuidado.
   - Affordance del carrusel (§5). Capturas nítidas siempre (son prueba).
   - RIESGO CONFIDENCIALIDAD (crítico): Excel y capturas con datos 100% FICTICIOS (inventados,
     no anonimizados): técnicos, zonas, órdenes ficticios. Revisar antes de publicar. Los
     assets los prepara Marc — si no están, dejar PLACEHOLDERS claros.
   - ESTADO: pendiente de las capturas reales de Marc + retoques de coherencia visual.

8. CONTACTO · oscuro · espejo del Hero · PICO · metáfora portadora: el sistema se completa
   - Domina: frase de cierre grande + email con marco técnico de esquinas (CTA, email directo,
     no botón genérico). Datos secundarios + idiomas en N6 debajo. "oportunidad" enciende
     (excepción consciente, §5).
   - Metáfora: eco invertido de la apertura — el sistema que se CIERRA/completa. Puede evocar
     el poliedro del Hero por composición o ritmo (espejo), SIN repetirlo literal (es exclusivo
     del Hero, §8). El círculo se cierra: empezó "pienso en sistemas", termina "hablemos".
   - Tercios: espejo invertido del Hero. Terracota brilla sobre negro, espejo del Hero.
   - CALIBRADA: PICO (cierre pegado al CTA, sin enfriamiento). Metáfora cuidada pero al
     servicio de la conversión — el email debe ser lo más claro de la viñeta.

═══════════════════════════════════════════════════════════
7. REGLAS DE IMAGEN Y ASSETS
═══════════════════════════════════════════════════════════

- Solo DOS imágenes: foto de perfil + capturas del Crown Planner. NO añadir fotos de relleno
  (decoración sin función baja la sobriedad). El resto vive de tipografía y espacio.
- b/n→color SOLO en imágenes humanas/evocadoras (la foto). NUNCA en imágenes-prueba (las
  capturas): lo informativo se muestra nítido siempre.
- Si hubiera ilustraciones: de mano de Marc (esqueleto Miro tratado a lápiz, trazo
  consistente), nunca IA genérica. Por defecto: sin ilustraciones, web tipográfica.

ASSETS QUE PREPARA MARC:
- Capturas del Crown Planner: alta resolución, ventana limpia (sin barras/pestañas del
  navegador), datos de ejemplo. Es el asset más crítico de la web.
- Excel descargable: datos 100% ficticios (riesgo de confidencialidad).
- Diagramas/esqueletos de ilustración en Miro (solo si se decide ilustrar).
- Foto de perfil: a evaluar (entra solo si es profesional y buena).

PLAN B SIN FOTO (Sobre mí): si la foto no entra, el tercio izquierdo no queda vacío — se
ancla con la frase-síntesis grande desplazada a ese tercio, o con un elemento tipográfico.
La viñeta debe funcionar sin foto, no quedar coja.

═══════════════════════════════════════════════════════════
8. EL ELEMENTO GRÁFICO DEL HERO (decisión revisada en ejecución)
═══════════════════════════════════════════════════════════

DECISIÓN ACTUALIZADA (sustituye al "rombo-firma discreto repetido"): el Hero lleva un
ELEMENTO GEOMÉTRICO PROTAGONISTA — una estructura tipo rombo/poliedro de líneas y nodos
conectados, en terracota, grande, sin marco que lo limite, desplazable/rotable al cursor.
Semánticamente coherente: "pienso en sistemas" sobre una estructura de nodos conectados =
metáfora visual de la tesis.

ACOTACIÓN: este poliedro concreto es la metáfora PROPIA del Hero — no se copia literal en
otras viñetas (cada una tiene la suya, §0/§6). No es que "la geometría esté prohibida salvo
aquí" (eso cambió en v3, §10); es que este dispositivo específico identifica al Hero. Otras
viñetas pueden usar geometría/movimiento si su concepto lo pide, pero con SU forma, no esta.
El impacto del Hero se concentra en su entrada; cada viñeta tiene su propio carácter.

Comportamiento: reacciona al cursor con elegancia (rotación/parallax/desplazamiento), sin
pulsos frenéticos. Sobrio en movimiento pese a ser protagonista en presencia.
NOTA: el texto (statement) sigue mandando; el elemento es el protagonista GRÁFICO, no debe
tapar ni competir en legibilidad con la frase. Equilibrio: presencia fuerte, pero detrás/
alrededor del texto, no encima de su lectura.

═══════════════════════════════════════════════════════════
9. ESTADOS, FALLBACKS Y ACCESIBILIDAD
═══════════════════════════════════════════════════════════

ESTADOS/FALLBACKS (la web nunca depende de que todo vaya bien):
- Imagen que no carga: fondo neutro con el espacio reservado (sin saltos de layout).
- JS del peso variable falla: statement en peso fijo digno.
- prefers-reduced-motion: sin animaciones, estados finales visibles.
- Rendimiento: dos imágenes optimizadas, fuentes con font-display: swap, carga rápida.

ACCESIBILIDAD (verificada en el diseño, no después):
- WCAG AA en todos los pares texto/fondo. El terracota en texto pequeño usa terracota-profundo
  (no el vivo). Verificar cada par con medidor de contraste.
- Navegación completa por teclado; foco visible.
- Alt en imágenes; jerarquía semántica de encabezados (un solo h1, orden correcto).
- Objetivos táctiles mínimo 44px en móvil.

═══════════════════════════════════════════════════════════
10. NO-OBJETIVOS (fuera de alcance — actualizado v3)
═══════════════════════════════════════════════════════════

SIGUE descartado a conciencia (no "mejorar" reincorporando):
- Versión en inglés (v2; ahora solo español).
- Más de 2 imágenes "de archivo" / fotos de relleno decorativas sin función. (Las metáforas
  generadas por código —poliedro, formas tipográficas— no cuentan como "imágenes": son parte
  del lenguaje.)
- Clichés VACÍOS: count-up de cifras, marquee/teletipo, glitch usado como adorno. Solo
  entrarían si fueran una metáfora portadora genuina y justificada, nunca como relleno.
- LinkedIn enlazado sin actualizar.

YA NO descartado (cambio v3, deliberado):
- "La Red" / nodos / estructuras geométricas dejan de estar prohibidas como recurso. El
  paradigma de metáfora portadora (§0) las admite cuando sirven al concepto de una viñeta. La
  antigua regla "rombo solo discreto en 3 sitios" queda DEROGADA: el poliedro es protagonista
  del Hero (§8) y otras viñetas pueden tener sus propias metáforas geométricas/de movimiento,
  siempre CALIBRADAS por acto y al servicio del mensaje, no del lucimiento.

El límite real ya no es "qué efectos están permitidos" sino DOS preguntas: ¿la metáfora
DEMUESTRA el mensaje de la viñeta (no solo decora)? ¿está CALIBRADA para su acto (no rompe la
legibilidad de la zona de credibilidad)? Si ambas son sí, entra.

═══════════════════════════════════════════════════════════
11. MÉTODO DE EJECUCIÓN Y CABOS
═══════════════════════════════════════════════════════════

ESTADO ACTUAL (v3): HERO y CITA cerradas en Design y validadas. Hero integrándose en el repo
Next.js (HTML vivo). Cita aún en sandbox de Design (NO integrar su código hasta validación).
Faltan 6 viñetas: Sobre mí, Formación, Experiencia, Liderazgo, Crown Planner, Contacto.

MÉTODO:
- Cada viñeta nueva: PRIMERO proponer su metáfora portadora con consejo de perspectivas
  (arte/UX/motion/marca), justificarla, declarar coste, verificar sistema y calibración (§0,
  §6). LUEGO construir. El director (en chat aparte) y Marc validan las metáforas propuestas
  antes de dar nada por cerrado.
- Hero es la viñeta-modelo: su lenguaje técnico (tokens, canvas/JS, fallbacks) lo heredan las
  demás. Prioridad de esfuerzo: los PICOS (Hero ✓, Cita ✓, Crown Planner, Contacto) deciden
  la entrevista. La credibilidad (Sobre mí, Formación, Experiencia, Liderazgo) con metáfora
  CONTENIDA y legible.
- Calibración por acto es ley (§0): no convertir la web en "todo boom". Picos gritan, valles
  respiran. El contraste es el ritmo.
- Tokens primero, construir sobre ellos. prefers-reduced-motion y responsive en cada viñeta.
- Principio de plazo: una web coherente e impecable vence a una recargada a medias. Si una
  metáfora amenaza con quedar a medias o rompe la legibilidad, se simplifica.

PANEL DE TWEAKS: el Hero y la Cita llevan un panel de controles (React montado solo para eso;
el resto es HTML vanilla autocontenido). Mantener ese patrón si se extiende a otras viñetas.

CABOS PENDIENTES:
- Pulir el arrastre de la peonza del Hero (suavizar recentrado con lerp).
- Capturas reales del Crown Planner (datos 100% FICTICIOS) + Excel ficticio — los prepara
  Marc. Hasta entonces, placeholders.
- Despliegue: repo en GitHub + auto-deploy Vercel. Verificar que dispara.
- Demo Crown Planner: el enlace público debe apuntar a la versión con datos de ejemplo.
- LinkedIn /in/marc-sola-bel: actualizar antes de enlazar, o no enlazar.
- Valores exactos a calcular al implementar: px del salto Display, terracota-profundo que
  pasa AA, grises de la escala de neutros, radio de esquina.
- Documento B (estrategia/entrevista) NUNCA se sube al repo.
