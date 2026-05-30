"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
  type Variants,
} from "motion/react";
import TextReveal from "@/components/TextReveal";
import SectionTransition from "@/components/SectionTransition";
import TiltCard from "@/components/TiltCard";
import Kanban from "@/components/Kanban";
import ExperienceTimeline, { type ExperienceItem } from "@/components/ExperienceTimeline";
import SlideShow from "@/components/SlideShow";
import ImageSlot from "@/components/ImageSlot";
import NavDots from "@/components/NavDots";
import ContactFab from "@/components/ContactFab";
import ProjectSpotlight from "@/components/ProjectSpotlight";

/* ─── Section registry ──────────────────────────────────────────────────── */

const SECTIONS = [
  { id: "hero", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "experiencia", label: "Experiencia" },
  { id: "estudios", label: "Estudios" },
  { id: "habilidades", label: "Habilidades" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
];

/* ─── Data ──────────────────────────────────────────────────────────────── */

const experienceItems: ExperienceItem[] = [
  {
    period: "2024 — Actualidad",
    role: "Cofundador · Director Comercial",
    org: "proyecto-beta",
    detail:
      "Dropshipping B2C especializado para el mercado español y europeo. Análisis de nichos con IA, negociación con fabricantes, pricing estratégico, copywriting de producto y gestión de operaciones de canal.",
  },
  {
    period: "2021 — 2024",
    role: "Responsable de Ventas",
    org: "Beral Projects",
    detail:
      "Cartera B2B, apertura de nuevas cuentas y cierre de acuerdos comerciales. Relaciones a largo plazo con clientes industriales y de servicios.",
  },
];

const educationItems = [
  {
    label: "Comunicación Audiovisual",
    sub: "Semiótica visual · Narrativa audiovisual aplicada",
  },
  {
    label: "Game Design",
    sub: "Mecánicas narrativas · Diseño de experiencias",
  },
  {
    label: "IA Aplicada al Negocio",
    sub: "Análisis de mercado · Automatización de flujos",
  },
];

const skills = [
  {
    domain: "Comercial",
    items: ["Prospección B2B y B2C", "Negociación y cierre", "Gestión de cartera", "CRM"],
  },
  {
    domain: "E-commerce",
    items: [
      "Dropshipping especializado",
      "Gestión de proveedores",
      "Pricing estratégico",
      "Selección de nicho",
    ],
  },
  {
    domain: "Marketing & Copy",
    items: [
      "Copywriting de producto",
      "Research de mercado",
      "Análisis de competencia",
      "Posicionamiento",
    ],
  },
  {
    domain: "IA & Herramientas",
    items: [
      "IA aplicada al análisis",
      "Research con datos",
      "Automatización de flujos",
      "Google Workspace",
    ],
  },
  {
    domain: "Operaciones",
    items: [
      "Contabilidad básica",
      "Gestión administrativa",
      "Coordinación de proyectos",
      "Planificación operativa",
    ],
  },
];

const aboutLines = [
  "Me especializo en la intersección entre venta directa y comercio digital.",
  "He construido relaciones comerciales en entornos B2B tradicionales",
  "y aprendido a leer mercados con datos y a encontrar oportunidades",
  "donde otros ven ruido.",
  "La comunicación audiovisual y el diseño de experiencias",
  "son el lenguaje con el que pienso los problemas.",
  "Actualmente cofundo proyecto-beta, una operación de e-commerce",
  "especializado para el mercado español y europeo.",
];

/* ─── Utilities ─────────────────────────────────────────────────────────── */

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
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

/* ─── Scroll Progress ───────────────────────────────────────────────────── */

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

/* ─── Navigation ─────────────────────────────────────────────────────────── */

const navLinks = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
  { href: "/chat", label: "Assistant" },
];

function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.0, ease }}
      className="fixed top-0 left-0 right-0 z-40 flex justify-end px-6 py-5 pointer-events-none"
      aria-label="Navegación principal"
    >
      <ul className="flex gap-6 pointer-events-auto bg-dark/85 backdrop-blur-xl px-5 py-2.5 rounded-full border border-sand/10">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className="text-sand/50 hover:text-sand/90 text-xs font-medium tracking-wide transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────────── */

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 20 },
  },
};

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const stripX = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  const fw = useMotionValue(300);
  const fontVariationSettings = useTransform(
    fw,
    (v: number) => `'wght' ${Math.round(v)}`
  );
  useEffect(() => {
    const controls = animate(fw, 800, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [fw]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="block wkw-bg min-h-[100svh]"
    >
      {/* Amber strip parallax */}
      <motion.div
        style={{ x: stripX }}
        className="pointer-events-none absolute inset-y-0 left-0 z-[3] w-[140%]"
        aria-hidden="true"
      >
        <div className="h-full w-full bg-gradient-to-r from-transparent via-amber/12 to-transparent" />
      </motion.div>

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="block__inner relative z-[4] text-left pt-20"
      >
        <motion.p variants={heroItem} className="section-label text-amber/70 mb-4">
          Dirección Comercial · E-commerce B2C
        </motion.p>

        <motion.h1
          variants={heroItem}
          style={{ fontVariationSettings, fontSize: "var(--fs-display)" }}
          className="leading-[0.9] tracking-[-0.04em] text-sand mb-6"
        >
          Marc Sola
        </motion.h1>

        <motion.p
          variants={heroItem}
          style={{ fontSize: "var(--fs-serif)" }}
          className="font-serif italic leading-snug text-amber/90 max-w-lg mb-3"
        >
          Construyo operaciones comerciales desde cero.
        </motion.p>

        <motion.p
          variants={heroItem}
          style={{ fontSize: "var(--fs-lead)" }}
          className="text-sand/50 leading-relaxed max-w-lg mb-8"
        >
          Del análisis de mercado al cierre con el proveedor.
        </motion.p>

        <motion.div variants={heroItem} className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href="mailto:marcsolabel@gmail.com"
            className="group relative inline-block text-sm text-sand/45 hover:text-sand/80 transition-colors duration-300"
            aria-label="Email Marc Sola"
          >
            marcsolabel@gmail.com
            <span
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              aria-hidden="true"
            />
          </a>
          <span className="text-sand/20 select-none" aria-hidden="true">·</span>
          <span className="text-sm text-sand/35">
            Olesa de Montserrat, Barcelona
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Skill Card ─────────────────────────────────────────────────────────── */

function SkillCard({
  domain,
  items,
  index,
}: {
  domain: string;
  items: string[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: "spring" as const,
        stiffness: 120,
        damping: 22,
        delay: index * 0.07,
      }}
    >
      <TiltCard>
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-amber mb-3.5">
          {domain}
        </p>
        <ul className="space-y-1.5 text-left" aria-label={`Competencias de ${domain}`}>
          {items.map((item) => (
            <li key={item} className="text-[0.9rem] text-muted leading-snug">
              {item}
            </li>
          ))}
        </ul>
      </TiltCard>
    </motion.div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-dark border-t border-sand/5 px-6 py-8 md:px-12">
      <div className="block__inner">
        <p className="text-xs text-sand/25">
          © {new Date().getFullYear()} Marc Sola
        </p>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function CVPage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <NavDots sections={SECTIONS} />
      <ContactFab email="marcsolabel@gmail.com" />

      <main>
        {/* 1. HERO */}
        <Hero />

        {/* Narrative spine */}
        <section className="block bg-sand">
          <div className="block__inner" style={{ maxWidth: "48rem" }}>
            <SlideShow />
          </div>
        </section>

        <SectionTransition />

        {/* 2. SOBRE MÍ */}
        <section id="sobre-mi" className="block bg-sand">
          <div className="block__inner">
            <Reveal>
              <h2 className="block__title mb-10">Sobre mí</h2>
            </Reveal>
            <div className="text-left">
              <TextReveal lines={aboutLines} serifLines={[4, 5]} className="space-y-3" />
            </div>
          </div>
        </section>

        {/* 3. EXPERIENCIA */}
        <section id="experiencia" className="block bg-sand">
          <div className="block__inner w-full">
            <ExperienceTimeline items={experienceItems} />
          </div>
        </section>

        {/* 4. ESTUDIOS */}
        <section id="estudios" className="block bg-shade">
          <div className="block__inner">
            <Reveal>
              <h2 className="block__title mb-14">Estudios</h2>
            </Reveal>
            <div className="flex flex-col gap-10">
              {educationItems.map((item, i) => (
                <Reveal key={item.label} delay={i * 0.08}>
                  <p
                    style={{ fontSize: "var(--fs-h3)" }}
                    className="font-bold text-ink leading-tight"
                  >
                    {item.label}
                  </p>
                  <p className="block__body mt-2">{item.sub}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. HABILIDADES */}
        <section id="habilidades" className="block bg-sand">
          <div className="block__inner w-full">
            <Reveal>
              <h2 className="block__title mb-10">Habilidades</h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
              {skills.map((s, i) => (
                <SkillCard key={s.domain} domain={s.domain} items={s.items} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Cómo trabajo */}
        <section className="block bg-shade">
          <div className="block__inner w-full text-left">
            <Kanban />
          </div>
        </section>

        <SectionTransition />

        {/* 6. PROYECTOS */}
        <section id="proyectos" className="block bg-sand">
          <div className="block__inner w-full">
            <Reveal>
              <h2 className="block__title mb-12">Proyectos</h2>
            </Reveal>
            <ProjectSpotlight
              label="proyecto-beta"
              title="Operación de e-commerce B2C especializado"
              description="Dropshipping especializado para el mercado español y europeo, operando desde 2024. Análisis de nichos con IA, negociación directa con fabricantes y gestión completa del canal de venta."
              points={[
                "IA aplicada al análisis de demanda, márgenes y timing de entrada",
                "Negociación directa con fabricantes europeos — sin intermediarios",
                "Pricing estratégico y copywriting de producto de alto impacto",
                "Operación de canal: plataforma, logística y atención al cliente",
              ]}
            />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Reveal delay={0.1}>
                <ImageSlot
                  prompt="minimal editorial design, warm paper texture, typographic layout, WKW aesthetic, amber tones"
                  className="h-48 w-full rounded-xl"
                />
              </Reveal>
              <Reveal delay={0.15}>
                <ImageSlot
                  prompt="e-commerce product lifestyle shot, warm amber tones, clean surfaces, premium feel, 35mm film"
                  className="h-48 w-full rounded-xl"
                />
              </Reveal>
            </div>
          </div>
        </section>

        <SectionTransition />

        {/* 7. CONTACTO */}
        <section id="contacto" className="block wkw-bg wkw-bg--noir min-h-[80svh]">
          <div className="block__inner">
            <Reveal y={16}>
              <span className="section-label block mb-8 text-amber/70">Contacto</span>
            </Reveal>
            <Reveal delay={0.05} y={20}>
              <p
                style={{ fontSize: "var(--fs-serif)" }}
                className="font-serif italic leading-[1.05] text-sand mb-12 max-w-xl mx-auto"
              >
                Hablemos de la próxima oportunidad.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 sm:gap-8">
                <a
                  href="mailto:marcsolabel@gmail.com"
                  className="group relative inline-block text-xl font-medium text-sand hover:text-amber transition-colors duration-300"
                  aria-label="Enviar email a Marc Sola"
                >
                  marcsolabel@gmail.com
                  <span
                    className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-amber transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </a>
                <span
                  className="hidden sm:inline text-sand/20 select-none"
                  aria-hidden="true"
                >
                  ·
                </span>
                <span className="text-sm text-sand/40">
                  Olesa de Montserrat · Barcelona · España
                </span>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
