"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useMotionValue,
  animate,
  useTransform,
} from "motion/react";

function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ type: "spring", stiffness: 120, damping: 22, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-amber origin-left z-50"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}

function useVariableWeight() {
  const fw = useMotionValue(200);
  const fontVariationSettings = useTransform(
    fw,
    (v: number) => `'wght' ${Math.round(v)}`
  );
  useEffect(() => {
    const controls = animate(fw, 800, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    });
    return controls.stop;
  }, [fw]);
  return fontVariationSettings;
}

export default function CVPage() {
  const fontVariationSettings = useVariableWeight();

  return (
    <>
      <ScrollProgress />
      <main>
        <section id="hero" className="bg-dark min-h-[100dvh] flex items-center px-6 md:px-12">
          <div className="relative z-10 pt-20 space-y-5 max-w-[900px]">
            <Reveal>
              <p className="section-label text-amber/70">
                PROYECTOS · AUTOMATIZACIÓN CON IA · ESTRATEGIA COMERCIAL
              </p>
            </Reveal>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 22, delay: 0.08 }}
              style={{ fontVariationSettings }}
              className="text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.95] tracking-[-0.04em] text-sand"
            >
              Marc Sola
            </motion.h1>
            <Reveal delay={0.18}>
              <p className="text-[clamp(1.25rem,3.5vw,2.25rem)] leading-tight font-medium text-sand/90 max-w-2xl">
                Pienso en sistemas, construyo soluciones.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="text-lg text-sand/50 leading-relaxed max-w-xl">
                Una década entre comunicación, ventas y liderazgo de equipo —
                hoy volcada en diseñar y automatizar procesos con IA.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="contacto" className="bg-dark min-h-[40vh] flex items-center px-6 md:px-12">
          <Reveal y={16}>
            <a
              href="mailto:marcsolabel@gmail.com"
              className="text-xl font-medium text-sand hover:text-amber transition-colors duration-300"
              aria-label="Enviar email a Marc Sola"
            >
              marcsolabel@gmail.com
            </a>
          </Reveal>
        </section>
      </main>
    </>
  );
}
