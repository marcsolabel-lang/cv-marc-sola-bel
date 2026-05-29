"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface Stage {
  num: string;
  title: string;
  descriptor: string;
}

const STAGES: Stage[] = [
  { num: "01", title: "Análisis", descriptor: "Entender mercado, márgenes y demanda real." },
  { num: "02", title: "Proveedor", descriptor: "Sourcing, validación y negociación directa." },
  { num: "03", title: "Canal", descriptor: "Elegir plataforma y definir posicionamiento." },
  { num: "04", title: "Lanzamiento", descriptor: "Creatividad, copy y automatización de flujos." },
  { num: "05", title: "Iteración", descriptor: "Datos, ajuste y escalado controlado." },
];

export default function Kanban() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-shade px-6 py-24 md:px-12" aria-label="Metodología de trabajo">
      {/* Heading alineado al grid de 720px */}
      <div className="max-w-[720px] mx-auto mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="text-3xl font-bold text-ink md:text-4xl"
        >
          Cómo trabajo
        </motion.h2>
      </div>

      {/* Cards: ancho completo dentro del padding del section */}
      <div ref={ref} className="relative flex flex-col gap-4 md:flex-row md:gap-4">
        {/* Connecting line — desktop only */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ originX: 0 }}
          className="absolute left-0 top-10 hidden h-[2px] w-full bg-amber/30 md:block"
          aria-hidden="true"
        />

        {STAGES.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              delay: i * 0.1,
            }}
            className="relative z-10 flex-1 rounded-sm border border-line bg-sand p-6"
          >
            <span className="font-serif text-2xl italic text-amber">{s.num}</span>
            <h3 className="mt-2 text-base font-semibold text-ink">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted leading-snug">{s.descriptor}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
