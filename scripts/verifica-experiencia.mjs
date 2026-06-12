/* Verificación del piloto F1 (motor de scroll · Experiencia).
   Comprueba programáticamente las garantías del programa y deja capturas:
   1. SCRUB: bajo el fold el eje está plegado (scaleY≈0); tras recorrerlo,
      erigido (scaleY≈1); al volver a subir, plegado otra vez (reversible).
   2. REDUCED-MOTION: con la preferencia activa el motor no construye nada
      y la sección está completa sin scroll.
   3. SIN JS: el documento es el estado final.
   Requiere el server en :3111 (npx next start -p 3111). Salida /tmp/exp-*. */
import { chromium } from "playwright";

const LOCAL = "http://localhost:3111/";
const browser = await chromium.launch();
let fallos = 0;

function scaleYDe(transform) {
  if (!transform || transform === "none") return 1;
  const m = transform.match(/matrix\(([^)]+)\)/);
  return m ? parseFloat(m[1].split(",")[3]) : 1;
}

async function leerEstado(page, sel = ".exp__item:first-child") {
  return page.evaluate((sel) => {
    const item = document.querySelector(sel);
    const css = (el, prop) => getComputedStyle(el).getPropertyValue(prop);
    return {
      seg: css(item.querySelector(".exp__seg"), "transform"),
      bodyOpacity: parseFloat(css(item.querySelector(".exp__body"), "opacity")),
      /* el rombo interior debe conservar su rotación CSS (≈matrix(0.707…)) */
      rombo: css(item.querySelector(".exp__nodo-rombo"), "transform"),
    };
  }, sel);
}

function rotado45(transform) {
  const m = transform.match(/matrix\(([^)]+)\)/);
  return m ? Math.abs(parseFloat(m[1].split(",")[0]) - Math.SQRT1_2) < 0.01 : false;
}

function check(nombre, ok, detalle) {
  console.log(`${ok ? "OK " : "FALLO"} ${nombre}${detalle ? ` — ${detalle}` : ""}`);
  if (!ok) fallos++;
}

/* ── 1 · scrub + reversibilidad (por ancho del checklist) ── */
for (const { w, h } of [{ w: 1440, h: 900 }, { w: 768, h: 1024 }, { w: 360, h: 780 }]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto(LOCAL, { waitUntil: "networkidle" });

  const box = await page.locator("#experiencia").boundingBox();
  const irA = async (y, espera = 900) => {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await page.waitForTimeout(espera); /* deja asentar la inercia --scrub-suave */
  };

  /* llegada: la sección aún bajo la línea del 88% → plegada */
  await irA(box.y - h);
  const llegada = await leerEstado(page);
  check(`scrub plegado @${w}`, scaleYDe(llegada.seg) < 0.05 && llegada.bodyOpacity < 0.05,
    `scaleY=${scaleYDe(llegada.seg).toFixed(2)} opacity=${llegada.bodyOpacity.toFixed(2)}`);

  /* medio: primer item cruzando la franja 88%→42% */
  await irA(box.y - h * 0.62);
  await page.screenshot({ path: `/tmp/exp-${w}-medio.png` });

  /* recorrida: primer item por encima del 42% → erigida */
  await irA(box.y - h * 0.1);
  const fin = await leerEstado(page);
  check(`scrub erigido @${w}`, scaleYDe(fin.seg) > 0.95 && fin.bodyOpacity > 0.95,
    `scaleY=${scaleYDe(fin.seg).toFixed(2)} opacity=${fin.bodyOpacity.toFixed(2)}`);
  check(`rombo intacto @${w}`, rotado45(fin.rombo), fin.rombo);
  await page.screenshot({ path: `/tmp/exp-${w}-erigida.png` });

  /* reversible: subir deshace lo que bajar hizo */
  await irA(box.y - h);
  const vuelta = await leerEstado(page);
  check(`scrub reversible @${w}`, scaleYDe(vuelta.seg) < 0.05 && vuelta.bodyOpacity < 0.05,
    `scaleY=${scaleYDe(vuelta.seg).toFixed(2)}`);
  await ctx.close();
}

/* ── 2 · reduced-motion: el motor no se construye ── */
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(LOCAL, { waitUntil: "networkidle" });
  const e = await leerEstado(page); /* sin scrollear: arriba del todo */
  check("reduced-motion completo", scaleYDe(e.seg) === 1 && e.bodyOpacity === 1,
    `seg=${e.seg} opacity=${e.bodyOpacity}`);
  await page.locator("#experiencia").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "/tmp/exp-1440-rm.png" });
  await ctx.close();
}

/* ── 3 · sin JS: estado final servido ── */
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    javaScriptEnabled: false,
  });
  const page = await ctx.newPage();
  await page.goto(LOCAL, { waitUntil: "load" });
  const e = await leerEstado(page);
  check("sin-JS completo", scaleYDe(e.seg) === 1 && e.bodyOpacity === 1,
    `seg=${e.seg} opacity=${e.bodyOpacity}`);
  await ctx.close();
}

console.log(fallos === 0 ? "\nTodo verificado." : `\n${fallos} comprobaciones fallaron.`);
/* browser.close() puede colgarse en Windows: carrera con timeout y salida dura */
await Promise.race([browser.close(), new Promise((r) => setTimeout(r, 5000))]);
process.exit(fallos === 0 ? 0 : 1);
