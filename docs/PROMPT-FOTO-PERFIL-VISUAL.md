# Encargo 1 — Foto de perfil (viñeta 3): propuestas WOW

> Para el director visual (este Project, conectado al repo de GitHub). **Sustituye al
> encargo anterior de este archivo** (aquel pedía elevar el tratamiento de profundidad;
> ese tratamiento ya se revirtió). Este encargo va ANTES y POR SEPARADO de la revisión
> general (`docs/PROMPT-REVISION-GENERAL.md`): primero se resuelve la foto.
>
> Lee antes: `docs/FOTO-PERFIL-ESTADO.md` (estado técnico real tras la reversión, commit
> `fce1d29`) y mira `public/foto-perfil.jpg`. No improvises sobre memoria de versiones viejas.

---

## Situación

El tratamiento anterior (tilt 3D + pop-out con ampliación del sujeto) **desvirtuaba la
viñeta** y se revirtió. Hoy la foto está en un estado base sobrio: marco técnico de
esquinas terracota + hover b/n→color. Es correcto y profesional — **pero no convence:
aporta poco**. La foto debería ser un momento visual **impactante y resolutivo** de la
viñeta, no "una foto con marco".

## El encargo

**Genera 3 propuestas de tratamiento, priorizadas**, con un objetivo claro: **WOW
elegante**. Que quien llegue a Sobre mí sienta que la foto es una pieza diseñada — no un
retrato colocado. Cada propuesta debe ser un CONCEPTO (no una lista de efectos): qué idea
encarna (idealmente dialoga con la tesis de la viñeta — el hilo constante, "pienso en
sistemas"), cómo se ve en reposo, qué hace al interactuar, y por qué es memorable.

**La tensión que debes resolver** (es el corazón del encargo): Sobre mí es CREDIBILIDAD
(§0 del doc-A) — lectura rápida, "un gesto; después, quieto". Pero el encargo pide WOW.
Resuélvelo con criterio de director: impacto sí, **al servicio de la viñeta** — la foto
puede ser el golpe visual de Sobre mí sin convertir la viñeta en un pico que compita con
Hero/Cita/Atlas, y sin robar la lectura de los 3 párrafos. Si crees que Sobre mí admite
subir un punto su intensidad (es la primera viñeta tras el Hero), decláralo y justifícalo
contra el doc-A. Lo aprendido con el pop-out: la ampliación agresiva al interactuar
ROMPE la viñeta — no vuelvas a ese patrón.

## La fotografía: qué se puede tocar

- La base es el retrato terracota (`public/foto-perfil.jpg`, 1200×1600, JPEG ~82 KB algo
  blando). **Se puede — y se anima a — modificar o recrear con IA** para jugar
  visualmente: fondo, iluminación, grading, separación sujeto/fondo, outpainting del
  fondo para encuadres nuevos, versiones duotono/tritono, limpieza y re-export a más
  calidad.
- **Línea roja: el rostro es intocable.** Nada de regenerar/embellecer/alterar la cara
  con IA — es un CV; un retrato que huela a sintético destruye exactamente la
  credibilidad que la viñeta construye. El juego es todo lo que rodea al rostro.
- **Listón de calidad (innegociable):** elegante; nada pixelado ni mal renderizado; sin
  halos de recorte, bordes sucios, sombras falsas ni efectos "AI-slop" (glows baratos,
  plástico, HDR falso). Salida mínima 1200×1600 (mejor 2×). Revisar al 200% antes de dar
  por bueno.

## Rutas de ejecución (elige una POR PROPUESTA — parte del encargo es decidir esto)

- **(A) Claude Design** → prototipo HTML vivo → Claude Code lo porta al repo (patrón ya
  rodado con Atlas). Útil si la propuesta necesita iteración visual en vivo (motion,
  composición, interacción).
- **(B) Directo a Claude Code** → entregas una spec precisa (comportamiento, valores,
  estados) y Code lo implementa sin pasar por Design. **Nos ahorramos un paso** — elige
  esta ruta siempre que la propuesta sea implementable sin iteración visual (tratamientos
  CSS/sharp bien definidos).
- **(C) IA de imagen externa** → si la propuesta exige retocar/recrear la foto: entrega el
  **brief exacto de retoque** (herramienta sugerida, prompt/instrucciones literales, specs
  de salida) para que Marc lo ejecute y el asset vuelva al repo. Luego (A) o (B) aplican
  el tratamiento. Ni este Project ni Design ni Code generan fotografía — sé explícito en
  qué pides exactamente.

## Restricciones del sistema (ley)

- §7: solo DOS imágenes en toda la web (esta foto + capturas Atlas); b/n→color SOLO en
  esta foto (si tu propuesta sustituye ese gesto por algo mejor, decláralo — es el gesto
  canónico del §6.3, cambiarlo es decisión de dirección, no un default).
- Tokens y tipografías del sistema (`globals.css`): terracota #C0542A, esquinas vivas
  (--radius: 0), Bricolage/Oswald/Cormorant. Nada a pelo.
- Accesibilidad: alt intacto, AA en cualquier texto, reduced-motion con fallback digno
  (no "sin nada": una versión estática bien compuesta).
- Táctil/móvil: la propuesta debe decir qué pasa sin hover (el estado de reposo debe
  sostenerse solo).
- La interfaz técnica es estable: `<FotoPerfil />` dentro de `.sobremi__col`
  (ver FOTO-PERFIL-ESTADO.md §2 y §8). El resto de Sobre mí (árbol, texto) no se toca.

## Entregable

1. **3 propuestas priorizadas.** Por cada una: concepto y por qué es WOW · reposo/hover/
   táctil/reduced-motion · qué necesita (CSS puro / sharp / IA externa con brief) · ruta
   de ejecución (A/B/C) · riesgo principal y cómo lo mitiga · veredicto de calibración
   (por qué no rompe §0).
2. **Tu recomendación: UNA ganadora** y el primer paso concreto para ejecutarla.
3. **No implementes nada todavía** — Marc elige primero.
