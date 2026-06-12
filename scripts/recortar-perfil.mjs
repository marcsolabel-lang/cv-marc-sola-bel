/* Genera el recorte del sujeto de la foto de perfil (capa "sujeto siempre
   a color" del retrato-en-sistema, viñeta 3). Pipeline en dos pasos:

   1. rembg (matting con u2net + alpha matting) — borde impecable, sin halos.
      Sustituye al antiguo BFS determinista de este script: aquel dejaba
      residuo de fondo junto a la silueta, aceptable cuando el recorte caía
      sobre la misma foto, inaceptable ahora que cae sobre un fondo duotono.
   2. sharp — redimensiona a 900px de ancho (sobra para 300px de render @2x/@3x)
      y comprime el PNG.

   Requiere rembg en el PATH (pip install "rembg[cli]"; modelo u2net se
   cachea en ~/.u2net). Uso: node scripts/recortar-perfil.mjs [entrada] [salida]
   Por defecto: public/foto-perfil.jpg → public/foto-perfil-cut.png
   Reejecutar si cambia la fotografía base. */

import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const IN = process.argv[2] ?? "public/foto-perfil.jpg";
const OUT = process.argv[3] ?? "public/foto-perfil-cut.png";
const MAX_W = 900;

const tmp = mkdtempSync(join(tmpdir(), "recorte-"));
const full = join(tmp, "cut-full.png");
try {
  /* -a: alpha matting (borde con transición real, no máscara dura);
     -ae: erosión de la máscara antes del matting — subir si aparece halo,
     bajar si se come pelo/contorno fino. */
  execFileSync("rembg", ["i", "-a", "-ae", "12", IN, full], { stdio: "inherit" });

  const info = await sharp(full)
    .resize({ width: MAX_W, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(OUT);
  console.log(`OK ${OUT} — ${info.width}x${info.height}, ${Math.round(info.size / 1024)}KB`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
