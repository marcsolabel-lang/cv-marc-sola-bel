"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";

interface Slide {
  question: string;
  body: string[];
  accent?: string;
}

const SLIDES: Slide[] = [
  {
    question: "¿Quién es Marc?",
    body: [
      "Comunicador audiovisual reconvertido en constructor de negocios digitales.",
      "Piensa en sistemas; ejecuta con datos y relaciones directas.",
    ],
  },
  {
    question: "¿Qué construye ahora?",
    accent: "proyecto-beta",
    body: [
      "Dropshipping B2C especializado para ES/EU, operando desde 2024.",
      "IA aplicada al análisis de nichos + negociación directa con fabricantes.",
    ],
  },
  {
    question: "Aptitudes clave",
    body: [
      "Análisis de mercado · Prospección B2B/B2C · Cierre con proveedor.",
      "Copywriting de producto · Pricing estratégico · Automatización de flujos.",
    ],
  },
  {
    question: "¿Dónde ha estado?",
    body: [
      "Ventas B2B en Beral Projects (2021-2024): apertura de cuentas, acuerdos a largo plazo.",
      "Formación en comunicación audiovisual y semiótica visual aplicada.",
    ],
  },
  {
    question: "Oportunidades de colaboración",
    accent: "open to",
    body: [
      "Proveedores EU · Socios de canal · Proyectos de e-commerce especializado.",
      "Consultoría comercial · Análisis de nicho · Estrategia de entrada a mercado.",
    ],
  },
];

const transition = { type: "spring", stiffness: 260, damping: 30 } as const;
const SWIPE_THRESHOLD = 60;

export default function SlideShow() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);

  const paginate = (next: number) => {
    if (next < 0 || next >= SLIDES.length) return;
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(index + 1);
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(index - 1);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setIndex((i) => {
          if (i <= 0) return i;
          setDir(-1);
          return i - 1;
        });
      }
      if (e.key === "ArrowRight") {
        setIndex((i) => {
          if (i >= SLIDES.length - 1) return i;
          setDir(1);
          return i + 1;
        });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const slide = SLIDES[index];

  return (
    <div className="relative w-full select-none">
      <div className="relative h-[260px] overflow-hidden rounded-xl border border-line bg-sand md:h-[320px]">
        <AnimatePresence custom={dir} mode="popLayout" initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            className="absolute inset-0 flex cursor-grab flex-col justify-center px-8 active:cursor-grabbing md:px-16"
          >
            {slide.accent ? (
              <span className="mb-2 font-serif text-lg italic text-amber">
                {slide.accent}
              </span>
            ) : null}
            <h3 className="text-2xl font-bold text-ink md:text-3xl">{slide.question}</h3>
            <div className="mt-4 space-y-1">
              {slide.body.map((line, i) => (
                <p key={i} className="text-muted md:text-lg">
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          aria-label="Anterior"
          onClick={() => paginate(index - 1)}
          disabled={index === 0}
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-line bg-sand/80 p-2 text-ink transition-colors hover:border-amber disabled:opacity-30 md:block"
        >
          ←
        </button>
        <button
          aria-label="Siguiente"
          onClick={() => paginate(index + 1)}
          disabled={index === SLIDES.length - 1}
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-line bg-sand/80 p-2 text-ink transition-colors hover:border-amber disabled:opacity-30 md:block"
        >
          →
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-1">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => paginate(i)}
            className="flex min-h-[24px] min-w-[24px] items-center justify-center p-2"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                height: 8,
                width: i === index ? 24 : 8,
                backgroundColor:
                  i === index ? "var(--color-amber)" : "var(--color-line)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
