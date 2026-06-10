/* Recorta el sujeto de la foto de perfil (fondo liso) para el efecto
   pop-out de Sobre mí. Crecimiento de región desde los bordes: el fondo
   (con su gradiente y sombras) se une por similitud LOCAL entre vecinos;
   el salto cromático al sujeto detiene la expansión. Borde con feather.

   Uso: node scripts/recortar-perfil.mjs [entrada] [salida]
   Por defecto: public/foto-perfil.jpg → public/foto-perfil-cut.png
   Reejecutar cuando llegue la fotografía definitiva. */

import sharp from "sharp";

const IN = process.argv[2] ?? "public/foto-perfil.jpg";
const OUT = process.argv[3] ?? "public/foto-perfil-cut.png";
const MAX_W = 900;            /* sobra para 300px de render con zoom 1.45 @2x */

const { data, info } = await sharp(IN)
  .resize({ width: MAX_W, withoutEnlargement: true })
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: W, height: H, channels: C } = info;
const px = (x, y) => (y * W + x) * C;
const dist = (i, j) => {
  const dr = data[i] - data[j], dg = data[i + 1] - data[j + 1], db = data[i + 2] - data[j + 2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
};

/* color de referencia del fondo: mediana de los píxeles del borde
   (el borde desenfocado de la silueta hace de puente entre gradientes:
   la similitud local sola no basta — el píxel debe ADEMÁS parecerse
   al fondo global para unirse) */
/* solo borde superior y laterales altos: el inferior puede ser sujeto
   (la camisa llega al borde y contaminaría la referencia) */
const muestras = [[], [], []];
for (let x = 0; x < W; x += 3) {
  for (const y of [0, 1, 2]) {
    const i = px(x, y);
    muestras[0].push(data[i]); muestras[1].push(data[i + 1]); muestras[2].push(data[i + 2]);
  }
}
for (let y = 0; y < Math.floor(H * 0.4); y += 3) {
  for (const x of [0, 1, W - 2, W - 1]) {
    const i = px(x, y);
    muestras[0].push(data[i]); muestras[1].push(data[i + 1]); muestras[2].push(data[i + 2]);
  }
}
const mediana = (a) => a.sort((m, n) => m - n)[a.length >> 1];
const REF = [mediana(muestras[0]), mediana(muestras[1]), mediana(muestras[2])];
const TOL_REF = 70;
const distRef = (i) => {
  const dr = data[i] - REF[0], dg = data[i + 1] - REF[1], db = data[i + 2] - REF[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
};

/* BFS desde los bordes — sembrando SOLO donde el borde parece fondo
   (el borde inferior puede ser sujeto) */
const fondo = new Uint8Array(W * H);
const cola = [];
const sembrar = (x, y) => {
  if (distRef(px(x, y)) < TOL_REF && !fondo[y * W + x]) {
    fondo[y * W + x] = 1;
    cola.push([x, y]);
  }
};
/* nunca desde el borde inferior: ahí vive el sujeto (pliegues oscuros
   de la camisa pueden parecerse al fondo y sembrarían dentro) */
for (let x = 0; x < W; x++) sembrar(x, 0);
for (let y = 0; y < H; y++) { sembrar(0, y); sembrar(W - 1, y); }

/* escudo central: en un retrato el sujeto domina el centro — ahí el
   criterio es ESTRICTO (el fondo liso pasa; el salto del contorno
   desenfocado hacia las sombras faciales, no). Fuera, generoso
   (sombras proyectadas sobre el fondo). */
const enEscudo = (x, y) => x > W * 0.28 && x < W * 0.72 && y > H * 0.22;

while (cola.length) {
  const [x, y] = cola.pop();
  const i = px(x, y);
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nx = x + dx, ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
    const k = ny * W + nx;
    if (fondo[k]) continue;
    if (enEscudo(nx, ny)) continue;
    const j = px(nx, ny);
    if (dist(i, j) < 30 && distRef(j) < 110) {
      fondo[k] = 1;
      cola.push([nx, ny]);
    }
  }
}

/* NOTA: el residuo de fondo que el escudo deja junto a la silueta es
   deliberadamente aceptable — en la composición real cae sobre el mismo
   fondo de la foto base (invisible en reposo, fundido por el blur en
   hover). Con la fotografía definitiva (fondo contrastado) el escudo
   apenas dejará residuo. */

/* máscara alpha: sujeto opaco; erosión 1px del sujeto + feather */
const alpha = Buffer.alloc(W * H);
for (let k = 0; k < W * H; k++) alpha[k] = fondo[k] ? 0 : 255;
/* erosión simple: un píxel de sujeto pegado al fondo se atenúa */
const erosion = Buffer.from(alpha);
for (let y = 1; y < H - 1; y++) {
  for (let x = 1; x < W - 1; x++) {
    const k = y * W + x;
    if (!alpha[k]) continue;
    if (!alpha[k - 1] || !alpha[k + 1] || !alpha[k - W] || !alpha[k + W]) erosion[k] = 140;
  }
}
/* el raw de salida puede venir con más canales: respetar su stride */
const { data: fdata, info: finfo } = await sharp(erosion, { raw: { width: W, height: H, channels: 1 } })
  .blur(1.2)
  .raw()
  .toBuffer({ resolveWithObject: true });
const feathered = (k) => fdata[k * finfo.channels];

/* componer RGBA */
const rgba = Buffer.alloc(W * H * 4);
for (let k = 0; k < W * H; k++) {
  const i = k * C, o = k * 4;
  rgba[o] = data[i]; rgba[o + 1] = data[i + 1]; rgba[o + 2] = data[i + 2];
  rgba[o + 3] = feathered(k);
}

await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const pct = Math.round((alpha.filter((v) => v > 0).length / (W * H)) * 100);
console.log(`OK ${OUT} — ${W}x${H}, sujeto ≈ ${pct}% del encuadre`);
