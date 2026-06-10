"use client";

import { useEffect, useState } from "react";

/* Panel de Tweaks (§11): React montado solo para los controles.
   Replica los paneles de los HTML vivos de Hero y Cita en un único host;
   comunica por CSS vars en :root + evento "tweakchange" (mismo contrato). */

const VOZ: Record<string, { fs: string; w: number; lh: string; ls: string }> = {
  Contenida:  { fs: "clamp(2rem, 4.4vw, 3.3rem)",   w: 560, lh: "1.14", ls: "-0.012em" },
  Editorial:  { fs: "clamp(2.6rem, 6vw, 4.5rem)",   w: 760, lh: "1.04", ls: "-0.025em" },
  Manifiesto: { fs: "clamp(3.1rem, 7.4vw, 6.4rem)", w: 830, lh: "0.96", ls: "-0.04em" },
};
const TORN: Record<string, number> = { Suave: 0.6, Media: 1.0, Violenta: 1.55 };
const DENS: Record<string, number> = { Compacta: 0.7, Media: 1.0, Densa: 1.35 };
const ACENTOS = ["#C0542A", "oklch(0.575 0.13 255)", "oklch(0.575 0.13 150)", "oklch(0.575 0.13 350)"];

declare global {
  interface Window {
    __cita?: {
      setIntensity(v: number): void;
      setDensity(v: number): void;
      setAccent(c: string): void;
      order(): void;
      scatter(): void;
      state(): { mode: string; t: number; vMedia: number; rStd: number };
    };
  }
}

export default function TweaksHost() {
  const [open, setOpen] = useState(false);
  const [voz, setVoz] = useState("Manifiesto");
  const [comp, setComp] = useState("Centrada");
  const [torn, setTorn] = useState("Media");
  const [dens, setDens] = useState("Densa");
  const [acento, setAcento] = useState(ACENTOS[0]);

  useEffect(() => {
    const root = document.documentElement;
    const v = VOZ[voz] ?? VOZ.Manifiesto;
    root.style.setProperty("--fs-display", v.fs);
    root.style.setProperty("--hl-weight", String(v.w));
    root.style.setProperty("--hl-lh", v.lh);
    root.style.setProperty("--hl-tracking", v.ls);
    root.style.setProperty("--terracotta", acento);
    const hero = document.getElementById("hero");
    if (hero) hero.dataset.comp = comp.toLowerCase();
    if (window.__cita) {
      window.__cita.setAccent(acento);
      window.__cita.setIntensity(TORN[torn] ?? 1);
      window.__cita.setDensity(DENS[dens] ?? 1);
    }
    window.dispatchEvent(new Event("tweakchange"));
  }, [voz, comp, torn, dens, acento]);

  return (
    <div className="tweaks">
      <div className={`tweaks__panel ${open ? "open" : ""}`} role="group" aria-label="Controles de diseño">
        <p className="tweaks__section">Hero · Voz del titular</p>
        <div className="tweaks__row">
          {Object.keys(VOZ).map((k) => (
            <button key={k} className="tweaks__opt" aria-pressed={voz === k} onClick={() => setVoz(k)}>{k}</button>
          ))}
        </div>
        <p className="tweaks__section">Hero · Composición</p>
        <div className="tweaks__row">
          {["Editorial", "Centrada", "Elevada"].map((k) => (
            <button key={k} className="tweaks__opt" aria-pressed={comp === k} onClick={() => setComp(k)}>{k}</button>
          ))}
        </div>
        <p className="tweaks__section">Cita · El tornado</p>
        <div className="tweaks__row">
          {Object.keys(TORN).map((k) => (
            <button key={k} className="tweaks__opt" aria-pressed={torn === k} onClick={() => setTorn(k)}>{k}</button>
          ))}
        </div>
        <p className="tweaks__section">Cita · Densidad</p>
        <div className="tweaks__row">
          {Object.keys(DENS).map((k) => (
            <button key={k} className="tweaks__opt" aria-pressed={dens === k} onClick={() => setDens(k)}>{k}</button>
          ))}
        </div>
        <p className="tweaks__section">El acento</p>
        <div className="tweaks__row">
          {ACENTOS.map((c) => (
            <button
              key={c}
              className="tweaks__swatch"
              style={{ background: c }}
              aria-pressed={acento === c}
              aria-label={`Acento ${c}`}
              onClick={() => setAcento(c)}
            />
          ))}
        </div>
      </div>
      <button className="tweaks__toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        Tweaks
      </button>
    </div>
  );
}
