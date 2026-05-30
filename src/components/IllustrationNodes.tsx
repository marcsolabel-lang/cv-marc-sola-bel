"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/* ─── Node definitions — mapped to descarga.png visual regions ────────────── */

interface NodeDef {
  id: string;
  label: string;
  sublabel: string;
  /* percentage-based box over the image */
  x: number; y: number; w: number; h: number;
}

const NODES: NodeDef[] = [
  { id: "origen",   label: "Origen",    sublabel: "Raíz",         x: 15, y:  2, w: 65, h: 22 },
  { id: "espina",   label: "Camino",    sublabel: "Proceso",      x:  0, y: 18, w: 30, h: 52 },
  { id: "centro",   label: "Presente",  sublabel: "Núcleo",       x: 22, y: 28, w: 56, h: 38 },
  { id: "raiz",     label: "Método",    sublabel: "Estructura",   x:  0, y: 62, w: 42, h: 38 },
  { id: "vision",   label: "Visión",    sublabel: "Expansión",    x: 45, y: 60, w: 55, h: 40 },
  { id: "red",      label: "Red",       sublabel: "Conexiones",   x: 62, y: 18, w: 38, h: 44 },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

interface IllustrationNodesProps {
  className?: string;
}

export default function IllustrationNodes({ className = "" }: IllustrationNodesProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const activate   = useCallback((id: string) => setActiveId(id), []);
  const deactivate = useCallback(() => setActiveId(null), []);

  return (
    <div
      className={`relative select-none overflow-hidden rounded-2xl ${className}`}
      style={{ aspectRatio: "9/16", maxHeight: "90vh" }}
      onPointerLeave={deactivate}
    >
      {/* ── Base artwork ── */}
      <Image
        src="/artwork.png"
        alt="Obra visual — nodos interactivos"
        fill
        sizes="(max-width:768px) 100vw, 50vw"
        className="object-cover"
        priority
      />

      {/* ── Global dim overlay when a node is active ── */}
      <AnimatePresence>
        {activeId && (
          <motion.div
            key="global-dim"
            className="pointer-events-none absolute inset-0 z-10 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: reduced ? 0.45 : 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
          />
        )}
      </AnimatePresence>

      {/* ── Interactive zones ── */}
      {NODES.map((node) => {
        const isActive = activeId === node.id;
        return (
          <motion.div
            key={node.id}
            className="absolute z-20 cursor-pointer"
            style={{
              left:   `${node.x}%`,
              top:    `${node.y}%`,
              width:  `${node.w}%`,
              height: `${node.h}%`,
            }}
            onPointerEnter={() => activate(node.id)}
            onPointerDown={() => activate(node.id)}
            onPointerUp={deactivate}
            animate={
              reduced
                ? {}
                : isActive
                  ? { filter: "saturate(200%) brightness(130%) contrast(108%)", opacity: 1 }
                  : activeId
                    ? { filter: "saturate(80%) brightness(85%)", opacity: 0.55 }
                    : { filter: "saturate(100%) brightness(100%)", opacity: 1 }
            }
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
          >
            {/* Active label */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="pointer-events-none absolute bottom-2 left-1/2 z-30 -translate-x-1/2"
                  initial={{ opacity: 0, y: 8, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                >
                  <div className="rounded-full border border-amber/60 bg-dark/80 px-4 py-1.5 backdrop-blur-sm">
                    <p className="text-center font-sans text-[0.65rem] font-bold uppercase tracking-[0.18em] text-amber">
                      {node.label}
                    </p>
                    <p className="text-center font-serif italic text-[0.6rem] text-sand/60">
                      {node.sublabel}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hotspot ring indicator */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    boxShadow: "inset 0 0 0 2px rgba(192,84,42,0.7), 0 0 32px rgba(192,84,42,0.25)",
                  }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* ── Resting hint (disappears after first interaction) ── */}
      {!activeId && (
        <motion.div
          className="pointer-events-none absolute bottom-4 left-0 right-0 z-20 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="rounded-full bg-dark/60 px-3 py-1 text-[0.6rem] uppercase tracking-widest text-sand/40 backdrop-blur-sm">
            toca un nodo
          </span>
        </motion.div>
      )}
    </div>
  );
}
