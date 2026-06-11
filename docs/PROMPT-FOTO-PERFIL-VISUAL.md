# Encargo — mejorar DRÁSTICAMENTE el apartado de la foto de perfil

> Para el director visual conectado al repo `cv-linkedin`. Tienes contexto del proyecto;
> esto fija el objetivo, el estado real y los límites. Lee los archivos citados antes de tocar.

## Dónde vive hoy
- `src/components/vinetas/FotoPerfil.tsx` — el componente (viñeta 3, Sobre mí).
- `src/components/vinetas/vinetas.css` — bloque `.foto3d` / `.foto-marco` (≈ líneas 18-95): el tratamiento.
- `scripts/recortar-perfil.mjs` — pipeline `sharp` que recorta el sujeto del fondo (BFS desde los bordes + feather) → genera el PNG del pop-out.
- `public/foto-perfil.jpg` (base) · `public/foto-perfil-cut.png` (sujeto recortado).
- Ficha: `docs/doc-A-construccion.md` §6.3 (Sobre mí) y §7 (reglas de imagen).

## Qué hace hoy (no rompas lo que funciona)
Marco técnico crema con cuadrícula terracota + 4 esquinas; **tilt 3D** al cursor (las esquinas flotan en un plano más cercano, parallax); la foto en **b/n que revela color** al acercarse; y un **sujeto recortado que se despega del fondo y sobresale por arriba** (pop-out, plano medio → primer plano). Reduced-motion y táctil quedan estáticos.

## La foto — DECIDIDA: la terracota (no la reabras)
La foto es **`public/foto-perfil.jpg`** (fondo **terracota**), que además **ya es la que está viva**. Es la mejor para este sistema y la elección está cerrada: el fondo es el color de marca (#C0542A), así el **revelado b/n→color** aterriza en un tono que casa con todo el CV, y el contraste sujeto/fondo (camisa blanca + piel sobre rust) es el ideal para el **recorte del pop-out**. **No la sustituyas por otra.** Único pero: es un **JPEG comprimido (~82 KB)** → si puedes, re-expórtala/limpia con denoise suave + nitidez + un leve grading cálido, **sin alterar la identidad** del retrato.

## El encargo: "drásticamente mejor", PERO calibrado
Sobre mí es **CREDIBILIDAD** (§0): contenida, de lectura rápida. La foto puede volverse más **editorial y premium**, NO un pico que compita con Hero/Cita. Lema: *"un gesto; después, quieto."* Elige y **eleva** (no acumules efectos):

- **Tratamiento de imagen**: grading que armonice con el terracota; limpieza/nitidez. El revelado podría dejar de ser `grayscale` plano y pasar por un **duotono terracota** antes del color pleno (más de marca) — explóralo, no es obligatorio.
- **Marco y profundidad**: que el marco técnico lea **más caro** (revisa cuadrícula, esquinas, sombra, parallax). Que el **recorte del pop-out sea impecable** con la foto elegida → regenera `foto-perfil-cut.png` con `recortar-perfil.mjs` ajustando tolerancias al fondo nuevo.
- **Composición en Sobre mí**: tercios foto-izquierda / texto-derecha (§6.3); la foto ancla la columna sin robar lectura a los 3 párrafos.
- **No toques**: §7 (solo 2 imágenes en todo el CV; b/n→color **solo** en la foto), fallbacks reduced-motion/táctil, `alt`, `next/image`, tokens de `globals.css`.

## Entregable
1. **Antes de codificar**, enséñame **1-2 direcciones de arte** (grading/duotono, marco, reveal, parallax) sobre la foto terracota, para que elija.
2. Implementa la elegida: `FotoPerfil.tsx` + bloque CSS, **regenera los assets** (base + recorte) con la foto definitiva, y verifica `npm run build`.
3. Respeta el sistema (terracota #C0542A, Bricolage/Oswald, esquinas vivas salvo donde el diseño pida lo contrario).

Cierra con tu recomendación priorizada: qué foto y qué cambio elevan más con menos riesgo.
