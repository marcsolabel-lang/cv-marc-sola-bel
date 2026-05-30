"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
  animate,
  type Variants,
  type PanInfo,
} from "motion/react";
import TextReveal from "@/components/TextReveal";
import TiltCard from "@/components/TiltCard";
import Kanban from "@/components/Kanban";
import ExperienceTimeline, { type ExperienceItem } from "@/components/ExperienceTimeline";
import SlideShow from "@/components/SlideShow";
import NavDots from "@/components/NavDots";
import ContactFab from "@/components/ContactFab";
import ProjectSpotlight from "@/components/ProjectSpotlight";
import ImageBlock from "@/components/ImageBlock";

/* ─── Sections ──────────────────────────────────────────────────────────── */

const SECTIONS = [
  { id: "hero",        label: "Inicio"      },
  { id: "sobre-mi",    label: "Sobre mí"    },
  { id: "experiencia", label: "Experiencia" },
  { id: "estudios",    label: "Estudios"    },
  { id: "habilidades", label: "Habilidades" },
  { id: "proyectos",   label: "Proyectos"   },
  { id: "contacto",    label: "Contacto"    },
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
  { label: "Comunicación Audiovisual", sub: "Semiótica visual · Narrativa audiovisual aplicada" },
  { label: "Game Design",              sub: "Mecánicas narrativas · Diseño de experiencias"     },
  { label: "IA Aplicada al Negocio",   sub: "Análisis de mercado · Automatización de flujos"    },
];

const skills = [
  { domain: "Comercial",        items: ["Prospección B2B y B2C", "Negociación y cierre", "Gestión de cartera", "CRM"] },
  { domain: "E-commerce",       items: ["Dropshipping especializado", "Gestión de proveedores", "Pricing estratégico", "Selección de nicho"] },
  { domain: "Marketing & Copy", items: ["Copywriting de producto", "Research de mercado", "Análisis de competencia", "Posicionamiento"] },
  { domain: "IA & Herramientas",items: ["IA aplicada al análisis", "Research con datos", "Automatización de flujos", "Google Workspace"] },
  { domain: "Operaciones",      items: ["Contabilidad básica", "Gestión administrativa", "Coordinación de proyectos", "Planificación operativa"] },
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

const portfolioItems = [
  { hint: "pieza audiovisual 1", speed: 10  },
  { hint: "pieza audiovisual 2", speed: 20  },
  { hint: "pieza audiovisual 3", speed: 8   },
];

/* ─── Primitives ─────────────────────────────────────────────────────────── */

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

function SectionMark({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10 md:mb-14">
      <span className="font-mono text-[0.6875rem] font-bold text-amber">{num}</span>
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted/60">
        {label}
      </span>
    </div>
  );
}

/* ─── Interactive: Photo Tilt 3D ─────────────────────────────────────────── */

function PhotoTilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 18 });
  const sy = useSpring(my, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const shadowX = useTransform(sx, [-0.5, 0.5], [15, -15]);
  const shadowY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const boxShadow = useTransform(
    [shadowX, shadowY] as const,
    ([x, y]: number[]) => `${x}px ${y}px 60px rgba(0,0,0,0.18)`
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  if (reduced) {
    return <div className="cursor-default">{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        boxShadow,
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 150, damping: 18 }}
      className="cursor-default"
    >
      {children}
    </motion.div>
  );
}

/* ─── Interactive: Parallax Image ────────────────────────────────────────── */

function ParallaxImage({
  speed = 15,
  hint,
  src,
  alt,
}: {
  speed?: number;
  hint?: string;
  src?: string;
  alt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed}px`, `-${speed}px`]);

  return (
    <div ref={ref} className="overflow-hidden rounded-xl">
      <motion.div style={{ y }}>
        <ImageBlock
          src={src}
          alt={alt}
          hint={hint}
          aspect="landscape"
          className="w-full scale-[1.12]"
        />
      </motion.div>
    </div>
  );
}

/* ─── Interactive: Skills Carousel (mobile) ──────────────────────────────── */

function SkillsCarousel() {
  const idxRef = useRef(0);
  const x = useMotionValue(0);
  const CARD_W = 252;

  function onDragEnd(_: unknown, info: PanInfo) {
    const cur = idxRef.current;
    if (info.offset.x < -50 && cur < skills.length - 1) {
      idxRef.current = cur + 1;
    } else if (info.offset.x > 50 && cur > 0) {
      idxRef.current = cur - 1;
    }
    animate(x, -idxRef.current * CARD_W, { type: "spring", stiffness: 260, damping: 30 });
  }

  return (
    <div className="overflow-hidden">
      <motion.div
        style={{ x, width: skills.length * CARD_W }}
        drag="x"
        dragConstraints={{ left: -(skills.length - 1) * CARD_W, right: 0 }}
        dragElastic={0.15}
        onDragEnd={onDragEnd}
        className="flex gap-3 cursor-grab active:cursor-grabbing"
      >
        {skills.map((s, i) => (
          <div key={s.domain} className="shrink-0 w-60">
            <SkillCard domain={s.domain} items={s.items} index={i} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Scroll Progress ───────────────────────────────────────────────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-amber origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}

/* ─── Nav ────────────────────────────────────────────────────────────────── */

const navLinks = [
  { href: "#sobre-mi",    label: "Sobre mí"    },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#proyectos",   label: "Proyectos"   },
  { href: "#contacto",    label: "Contacto"    },
];

function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 22, delay: 0.8 }}
      className="fixed top-0 left-0 right-0 z-40 flex justify-end px-6 py-5 pointer-events-none"
      aria-label="Navegación principal"
    >
      <ul className="flex gap-6 pointer-events-auto bg-dark/90 backdrop-blur-xl px-5 py-2.5 rounded-full border border-sand/10">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className="text-sand/50 hover:text-sand text-xs font-medium tracking-wide transition-colors duration-200"
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

const heroStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 22 } },
};

function Hero({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const fw = useMotionValue(300);
  const fontVariationSettings = useTransform(fw, (v: number) => `'wght' ${Math.round(v)}`);

  useEffect(() => {
    const controls = animate(fw, 800, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [fw]);

  /* Cursor parallax */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const bgY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * -12);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * -12);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-dark min-h-[100svh] flex flex-col justify-end overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Parallax background layer */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="pointer-events-none absolute inset-[-5%] z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_72%_28%,rgba(192,84,42,0.13)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_20%_75%,rgba(192,84,42,0.07)_0%,transparent_65%)]" />
      </motion.div>

      {/* Terracotta vertical spine */}
      <div className="spine" aria-hidden="true" />

      {/* Section number watermark */}
      <span className="section-num section-num--light" aria-hidden="true">00</span>

      {/* Content */}
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-[64rem] mx-auto pl-10 pr-6 pb-16 pt-28 md:pl-16 md:pr-12 md:pb-20"
      >
        <motion.p variants={heroItem} className="section-label text-amber/80 mb-6">
          Dirección Comercial · E-commerce B2C
        </motion.p>

        <motion.h1
          variants={heroItem}
          style={{ fontSize: "var(--fs-display)", fontVariationSettings }}
          className="leading-[0.88] tracking-[-0.04em] text-sand font-black mb-8"
        >
          Marc<br className="md:hidden" /> Sola
        </motion.h1>

        <motion.p
          variants={heroItem}
          style={{ fontSize: "var(--fs-serif)" }}
          className="font-serif italic text-sand/55 max-w-lg mb-4 leading-snug"
        >
          Construyo operaciones comerciales desde cero.
        </motion.p>

        <motion.p
          variants={heroItem}
          style={{ fontSize: "var(--fs-lead)" }}
          className="text-sand/35 max-w-md mb-10 leading-relaxed"
        >
          Del análisis de mercado al cierre con el proveedor.
        </motion.p>

        <motion.div variants={heroItem} className="flex flex-wrap gap-x-6 gap-y-2 items-center">
          <a
            href="mailto:marcsolabel@gmail.com"
            className="group relative text-sm text-sand/40 hover:text-sand/70 transition-colors duration-200"
          >
            marcsolabel@gmail.com
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
          </a>
          <span className="text-sand/20 select-none" aria-hidden="true">·</span>
          <span className="text-sm text-sand/25">Esparreguera, Barcelona</span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-10 md:left-16 flex items-center gap-2 text-sand/20 text-[0.65rem] tracking-widest uppercase"
        aria-hidden="true"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        scroll
      </motion.div>
    </section>
  );
}

/* ─── Skill Card ──────────────────────────────────────────────────────────── */

function SkillCard({ domain, items, index }: { domain: string; items: string[]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 120, damping: 22, delay: index * 0.06 }}
    >
      <TiltCard>
        <p className="section-label mb-4">{domain}</p>
        <ul className="space-y-2" aria-label={`Competencias de ${domain}`}>
          {items.map((item) => (
            <li key={item} className="text-[0.9rem] text-muted leading-snug">{item}</li>
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
        <p className="text-xs text-sand/25">© {new Date().getFullYear()} Marc Sola</p>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function CVPage() {
  /* ── Vertebra: scroll values for Hero→SlideShow connector ── */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const lineScale    = useTransform(heroScroll, [0, 0.35], [0, 1], { clamp: true });
  const nodeOpacity  = useTransform(heroScroll, [0.3, 0.35], [0, 1], { clamp: true });
  const rawNodeScale = useTransform(heroScroll, [0.3, 0.35], [0.4, 1], { clamp: true });
  const nodeScale    = useSpring(rawNodeScale, { stiffness: 180, damping: 20 });

  return (
    <>
      <ScrollProgress />
      <Nav />
      <NavDots sections={SECTIONS} />
      <ContactFab email="marcsolabel@gmail.com" />

      <main>
        {/* 1 ─ HERO */}
        <Hero sectionRef={heroRef} />

        {/* VÉRTEBRA — segmento 01: Hero → SlideShow */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative h-20 select-none"
          style={{ background: "linear-gradient(to bottom, #0A0A0A, #FFFFFF)" }}
        >
          {/* line — grows scaleY from top, clamped at 0.35 */}
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute left-0 top-0 h-full w-[3px] bg-amber"
          />
          {/* node — settles with spring as line completes */}
          <motion.div
            style={{
              opacity: nodeOpacity,
              scale: nodeScale,
              x: "-33%",   /* center 12px circle on 3px line */
            }}
            className="absolute bottom-0 left-0 h-3 w-3 rounded-full bg-amber"
          />
        </div>

        {/* Narrative spine / slideshow */}
        <section className="block border-t border-line bg-sand">
          <div className="block__inner" style={{ maxWidth: "48rem" }}>
            <SlideShow />
          </div>
        </section>

        {/* 2 ─ SOBRE MÍ */}
        <section id="sobre-mi" className="block border-t border-line bg-sand">
          <div className="block__inner relative">
            <span className="section-num section-num--dark" aria-hidden="true">01</span>
            <div className="relative z-10">
              <Reveal>
                <SectionMark num="01" label="Sobre mí" />
                <h2 className="block__title mb-10">
                  Construyo operaciones<br />desde cero.
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-start mt-10">
                <TextReveal lines={aboutLines} serifLines={[4, 5]} className="space-y-3 text-left" />
                <Reveal delay={0.12}>
                  <PhotoTilt>
                    <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-2xl bg-shade">
                      <Image
                        src="/marc-perfil.jpg"
                        alt="Marc Sola"
                        fill
                        sizes="(max-width:768px) 100vw, 384px"
                        className="object-cover"
                        priority={false}
                        onError={() => {
                          if (typeof window !== "undefined") console.warn("marc-perfil.jpg not found — using CSS fallback");
                        }}
                      />
                    </div>
                  </PhotoTilt>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 3 ─ EXPERIENCIA */}
        <section id="experiencia" className="block border-t border-line bg-sand">
          <div className="block__inner relative w-full">
            <span className="section-num section-num--dark" aria-hidden="true">02</span>
            <div className="relative z-10">
              <SectionMark num="02" label="Experiencia" />
              <ExperienceTimeline items={experienceItems} />
            </div>
          </div>
        </section>

        {/* 4 ─ ESTUDIOS */}
        <section id="estudios" className="block border-t border-line bg-shade">
          <div className="block__inner relative">
            <span className="section-num section-num--dark" aria-hidden="true">03</span>
            <div className="relative z-10">
              <Reveal>
                <SectionMark num="03" label="Estudios" />
                <h2 className="block__title mb-14">Formación</h2>
              </Reveal>
              <div className="flex flex-col gap-12">
                {educationItems.map((item, i) => (
                  <Reveal key={item.label} delay={i * 0.09}>
                    <div className="border-l-2 border-amber pl-6">
                      <p
                        style={{ fontSize: "var(--fs-h3)" }}
                        className="font-bold text-ink leading-tight"
                      >
                        {item.label}
                      </p>
                      <p className="block__body mt-2">{item.sub}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5 ─ HABILIDADES */}
        <section id="habilidades" className="block border-t border-line bg-sand">
          <div className="block__inner relative w-full">
            <span className="section-num section-num--dark" aria-hidden="true">04</span>
            <div className="relative z-10">
              <Reveal>
                <SectionMark num="04" label="Habilidades" />
                <h2 className="block__title mb-10">Competencias</h2>
              </Reveal>

              {/* Desktop grid */}
              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                {skills.map((s, i) => (
                  <SkillCard key={s.domain} domain={s.domain} items={s.items} index={i} />
                ))}
              </div>

              {/* Mobile drag carousel */}
              <div className="sm:hidden mt-2">
                <SkillsCarousel />
                <p className="mt-4 text-[0.65rem] text-muted/50 tracking-wide uppercase">
                  ← arrastra →
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5b ─ CÓMO TRABAJO */}
        <section className="block border-t border-line bg-shade">
          <div className="block__inner relative w-full">
            <span className="section-num section-num--dark" aria-hidden="true">05</span>
            <div className="relative z-10">
              <SectionMark num="05" label="Metodología" />
              <Kanban />
            </div>
          </div>
        </section>

        {/* 6 ─ PROYECTOS */}
        <section id="proyectos" className="block border-t border-line bg-sand">
          <div className="block__inner relative w-full">
            <span className="section-num section-num--dark" aria-hidden="true">06</span>
            <div className="relative z-10">
              <Reveal>
                <SectionMark num="06" label="Proyectos" />
                <h2 className="block__title mb-12">Trabajo actual</h2>
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
                imageHint="captura del proyecto"
              />

              {/* Portfolio masonry parallax */}
              <div className="mt-16">
                <Reveal>
                  <SectionMark num="06b" label="Portfolio audiovisual" />
                </Reveal>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mt-4">
                  {portfolioItems.map((item, i) => (
                    <Reveal key={item.hint} delay={i * 0.08}>
                      <ParallaxImage
                        hint={item.hint}
                        speed={item.speed}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7 ─ CONTACTO */}
        <section
          id="contacto"
          className="relative bg-dark min-h-[80svh] flex flex-col justify-end overflow-hidden border-t border-sand/5"
        >
          <div className="spine" aria-hidden="true" />
          <span className="section-num section-num--light" aria-hidden="true">07</span>

          <div className="relative z-10 w-full max-w-[64rem] mx-auto pl-10 pr-6 pb-16 pt-20 md:pl-16 md:pr-12">
            <Reveal y={16}>
              <SectionMark num="07" label="Contacto" />
            </Reveal>
            <Reveal delay={0.05} y={20}>
              <p
                style={{ fontSize: "var(--fs-serif)" }}
                className="font-serif italic leading-[1.05] text-sand mb-12 max-w-xl"
              >
                Hablemos de la próxima oportunidad.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <a
                  href="mailto:marcsolabel@gmail.com"
                  className="group relative inline-block text-xl font-medium text-sand hover:text-amber transition-colors duration-300"
                  aria-label="Enviar email a Marc Sola"
                >
                  marcsolabel@gmail.com
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-amber transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </a>
                <span className="hidden sm:inline text-sand/20 select-none" aria-hidden="true">·</span>
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
