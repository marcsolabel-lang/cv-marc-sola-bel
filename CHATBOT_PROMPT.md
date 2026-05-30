# PROMPT PARA EL CHATBOT DEL NAVEGADOR
# Pega esto directamente en Claude.ai (con el Proyecto de skills activado)
# ─────────────────────────────────────────────────────────────────────────────

---

Antes de responder, ejecuta en orden:

1. Aplica el **brief inference** de taste-skill (una sola linea).
2. Declara los **3 dials** justificados desde el brief.
3. Aplica el framework de animacion de **Emil Kowalski** a cada elemento que anime.
4. Aplica las reglas de tipografia e **Impeccable** al sistema de tipos.
5. Ejecuta el **pre-flight checklist** completo antes de entregar cualquier especificacion.
6. Devuelve exclusivamente las 9 secciones del formato que indico al final. Sin introduccion ni conclusion fuera del formato.

---

## QUIEN ES MARC SOLA

Marc Sola, 31 anos. Olesa de Montserrat, Barcelona. Cofundador y Director Comercial de **proyecto-beta** (2024, presente): operacion de dropshipping B2C especializado para mercado espanol y europeo. Background en comunicacion audiovisual y semiotica visual aplicada a UX y negocio.

**Experiencia:**
- 2024-hoy: Cofundador / Director Comercial, proyecto-beta. Analisis de nichos con IA, negociacion directa con fabricantes, pricing estrategico, copywriting de producto, gestion de canal ES/EU.
- 2021-2024: Responsable de Ventas, Beral Projects. Cartera B2B, apertura de cuentas, cierre de acuerdos comerciales con clientes industriales y de servicios.

**Skills en 4 dominios:**
- Comercial: Prospeccion B2B y B2C, Negociacion y cierre, Gestion de cartera, CRM
- E-commerce: Dropshipping especializado, Gestion de proveedores, Pricing estrategico, Seleccion de nicho
- Marketing y Copy: Copywriting de producto, Research de mercado, Analisis de competencia, Posicionamiento
- Herramientas e IA: IA aplicada al analisis, Research con datos, Google Workspace, Automatizacion de flujos

**Metodologia de trabajo (5 etapas):**
01 Analisis — entender mercado, margenes y demanda real.
02 Proveedor — sourcing, validacion y negociacion directa.
03 Canal — elegir plataforma y definir posicionamiento.
04 Lanzamiento — creatividad, copy y automatizacion de flujos.
05 Iteracion — datos, ajuste y escalado controlado.

**Sobre mi (texto base):**
"Me especializo en la interseccion entre venta directa y comercio digital. He construido relaciones comerciales en entornos B2B tradicionales y aprendido a leer mercados con datos y a encontrar oportunidades donde otros ven ruido. La comunicacion audiovisual y el diseno de experiencias son el lenguaje con el que pienso los problemas."

**Tagline actual:** "Construyo operaciones comerciales desde cero."
**Subtitulo actual:** "Del analisis de mercado al cierre con el proveedor."
**Contacto:** marcsolabel@gmail.com | Olesa de Montserrat, Barcelona, Espana

---

## STACK TECNICO EXISTENTE

Framework: Next.js 16, TypeScript strict, Tailwind v4, Motion v12 (import desde "motion/react"), Lenis scroll.

Tokens de diseno:
- amber #C4843A (unico acento)
- dark #111110 (fondo cinematico)
- sand #FAFAF8 (fondo claro)
- muted #7A7570 (texto secundario)
- shade #F0EAE0 (superficie neutra)
- line #E8E3DC (bordes)
- ink #0D0D0D (texto primario)

Fuentes: Bricolage Grotesque variable (200-800, sans), Cormorant Garamond (serif, 400/500/600 + italic). NO usar Inter.

Springs del proyecto:
- Reveal entry: stiffness 120, damping 20
- Slide transition: stiffness 260, damping 30
- Drag snap: stiffness 300, damping 35
- Arrow hover: stiffness 400, damping 25

Componentes ya existentes (no recrear, reutilizar o modificar):
- SlideShow: swiper horizontal con drag, arrows, dots de progreso y spring transition
- ImageSlot: textura CSS cinematica sin imagen (clase .wkw-bg, variante .wkw-bg--noir)
- ExperienceTimeline: tarjetas en scroll horizontal con progress bar
- Kanban: 5 tarjetas de etapas con linea conectora animada
- TiltCard: card con 3D tilt en hover (pointer physics)
- TextReveal: reveal por linea con clip-path
- SectionTransition: linea amber animada de ancho completo

Sistema de bloques: clase .cv-section (position relative, width 100%), .cv-section--pad (padding 6rem 1.5rem / 7rem 3rem desktop). Columna de contenido: max-w-[720px] mx-auto. WKW texture: clase .wkw-bg.

---

## EL RETO DE DISENO

Necesito una pagina CV que resuelva estos 5 problemas en orden de prioridad:

**P1. Jerarquia estricta de informacion.**
La primera informacion visible debe ser la mas importante. El visitante identifica nombre, rol y propuesta de valor en menos de 3 segundos sin scroll. El orden de aparicion de bloques debe reflejar importancia, no convencion.

**P2. Bloques visuales conectables que formen un roadmap.**
Cada bloque es una unidad informativa independiente con fondo, padding y animacion propios. Juntos deben narrar una trayectoria progresiva: origen de Marc, momento actual, metodologia, skills, hacia donde va. No son secciones aisladas, son nodos de una historia.

**P3. Slides como proyeccion de trayectoria y habilidades.**
El componente SlideShow debe funcionar como un roadmap swipeable. Cada slide es un nodo de la trayectoria: quien soy, que construyo, como pienso, donde he estado, que busco. La secuencia de slides debe tener una logica narrativa clara, de pasado a futuro.

**P4. Interfaz medible.**
Cualquier elemento de diseno debe poder auditarse: contraste WCAG AA verificable, tamanos tipograficos con razon medible (escala de tipo explicita), espacio entre bloques con razon de densidad declarada. El diseno debe poder ser evaluado contra los 3 dials.

**P5. Multilenguaje ES/EN.**
Identificar que bloques deben tener version en ingles y como implementarlo sin duplicar componentes. El toggle de idioma debe estar en una posicion auditable y accesible.

---

## FORMATO DE RESPUESTA (9 SECCIONES EXACTAS)

Responde SOLO con estas 9 secciones, en este orden, con este formato:

---

### 1. DESIGN READ
Una sola linea: "Reading this as: [page kind] for [audience], with a [vibe] language, leaning toward [design system o aesthetic family]."

---

### 2. DIALS
- DESIGN_VARIANCE: [1-10] — [justificacion en 1 linea]
- MOTION_INTENSITY: [1-10] — [justificacion en 1 linea]
- VISUAL_DENSITY: [1-10] — [justificacion en 1 linea]

---

### 3. JERARQUIA DE BLOQUES
Lista numerada en orden de aparicion de arriba a abajo. Por cada bloque exactamente:

**[N]. NOMBRE DEL BLOQUE**
- Contenido: [que informacion exacta contiene]
- Fondo: [clase CSS exacta: bg-dark / bg-sand / bg-shade / wkw-bg / wkw-bg wkw-bg--noir]
- Altura: [min-h-[100dvh] / auto / h-[40vh] / etc]
- Animacion: [que elemento anima, spring o easing concreto, duracion en ms]
- Tipografia: [tamano exacto en clamp() o rem para el elemento principal del bloque]
- Jerarquia semantica: [H1 / H2 / H3 / p / label]
- Componente existente a usar: [nombre o "nuevo"]

---

### 4. MANIFEST DE SLIDES (roadmap narrativo)
Para cada slide (minimo 5, maximo 7), exactamente:

**Slide [N]/[total]**
- Titulo (h3): "[texto exacto]"
- Cuerpo: "[linea 1]" / "[linea 2 si aplica]"
- Accent (serif italic amber, null si no aplica): "[texto]" o null
- Nodo del roadmap: [que momento de la trayectoria representa]
- Posicion en la narrativa: [pasado / presente / futuro / habilidad]

---

### 5. DECISIONES ESTETICAS
- H1 Marc Sola: [clamp() exacto, font-weight, font-variation-settings, animacion de peso variable]
- Tagline (serif italic): [tamano, color, max-width]
- Body text: [tamano, leading, max-width en ch]
- Section label (uppercase tracking): [tamano, tracking, color]
- Espacio vertical entre bloques: [valor de padding-top y padding-bottom por tipo de bloque]
- Transicion visual entre bloques oscuros y claros: [como se resuelve con SectionTransition o alternativa]
- Tratamiento del nombre en el hero: [descripcion exacta de la animacion font-weight 200 a 800]

---

### 6. COMPONENTES A CREAR O MODIFICAR
Por cada componente:

**[NombreComponente]** — [nuevo / modificar existente]
```typescript
interface [Nombre]Props {
  // props exactas con tipos
}
```
- Comportamiento: [descripcion en 1 parrafo]
- Animacion: [spring values o easing, que propiedades, duracion]
- Emil check: [que principio de Emil Kowalski aplica aqui]

---

### 7. ESTRATEGIA MULTILENGUAJE
- Bloques que necesitan ES/EN: [lista]
- Mecanismo: [como implementar sin duplicar — context, hook, o data object]
- Toggle de idioma: posicion [describe exactamente donde y como en la UI]
- Fragmento de arquitectura:
```typescript
// esquema del objeto de contenido
```

---

### 8. PRE-FLIGHT CHECKLIST

| Check | Estado | Accion requerida |
| --- | --- | --- |
| Cero em-dashes en todo el contenido | [OK/FAIL] | [...] |
| WCAG AA 4.5:1 en todos los pares texto/fondo | [OK/FAIL] | [...] |
| Hero: max 4 elementos de texto, CTA visible sin scroll | [OK/FAIL] | [...] |
| Nav en una sola linea en desktop | [OK/FAIL] | [...] |
| Un solo acento de color en toda la pagina | [OK/FAIL] | [...] |
| Eyebrows: max 1 por cada 3 secciones | [OK/FAIL] | [...] |
| Slides con logica narrativa verificable (no lista aleatoria) | [OK/FAIL] | [...] |
| Jerarquia semantica H1 unico, H2 por seccion, H3 en slides | [OK/FAIL] | [...] |
| Solo transform y opacity en animaciones | [OK/FAIL] | [...] |
| prefers-reduced-motion implementado | [OK/FAIL] | [...] |
| min-h-[100dvh] en hero, nunca h-screen | [OK/FAIL] | [...] |
| No 3 tarjetas iguales en grid | [OK/FAIL] | [...] |

---

### 9. ORDEN DE IMPLEMENTACION PARA CLAUDE CODE
Lista numerada de tareas en el orden exacto que deben ejecutarse. Por cada tarea:

**[N]. [nombre del archivo o componente]**
Cambio: [descripcion concreta del cambio — que se crea, que se modifica, que se elimina]
Dependencias: [de que depende, que debe existir antes]

---
