/* Captura de verificación del port SOBRE MÍ (handoff 2026-06-12).
   Para cada ancho del checklist (1440/768/360) captura la sección en el
   sitio local (tras dejar asentar la entrada) y en la referencia viva del
   handoff, más una pasada con prefers-reduced-motion. Salida: /tmp/sobremi-*.png */
import { chromium } from "playwright";
import { pathToFileURL } from "node:url";

const REF = pathToFileURL("design_handoff_sobre_mi/Sobre mí.html").href;
const LOCAL = "http://localhost:3111/";
const WIDTHS = [
  { w: 1440, h: 900 },
  { w: 768, h: 1024 },
  { w: 360, h: 780 },
];

const browser = await chromium.launch();

async function shot(url, sel, file, { width, height, reducedMotion }) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  const el = page.locator(sel);
  await el.scrollIntoViewIfNeeded();
  /* entrada (~2.4s) + settle (3s) — capturamos el reposo ya asentado */
  await page.waitForTimeout(reducedMotion ? 800 : 5600);
  await el.screenshot({ path: file, animations: "disabled" });
  await ctx.close();
  console.log("ok", file);
}

for (const { w, h } of WIDTHS) {
  await shot(LOCAL, "#sobre-mi", `/tmp/sobremi-local-${w}.png`, { width: w, height: h });
  await shot(REF, "#sobre-mi", `/tmp/sobremi-ref-${w}.png`, { width: w, height: h });
}
await shot(LOCAL, "#sobre-mi", "/tmp/sobremi-local-1440-rm.png", {
  width: 1440,
  height: 900,
  reducedMotion: true,
});

await browser.close();
