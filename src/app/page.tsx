import TopBar from "@/components/TopBar";
import TweaksHost from "@/components/TweaksHost";
import Hero from "@/components/hero/Hero";
import Cita from "@/components/cita/Cita";
import SobreMi from "@/components/vinetas/SobreMi";
import Formacion from "@/components/vinetas/Formacion";
import Experiencia from "@/components/vinetas/Experiencia";
import Liderazgo from "@/components/vinetas/Liderazgo";
import CrownPlanner from "@/components/vinetas/CrownPlanner";
import Contacto from "@/components/vinetas/Contacto";

/* CV de una página (doc-A v3 §2) — tres actos, ritmo O-O-C-C-C-C-O-O:
   apertura oscura (Hero + Cita) → cuerpo claro de credibilidad
   (Sobre mí, Formación, Experiencia, Liderazgo) → clímax y cierre
   oscuros (Crown Planner + Contacto). */

export default function CVPage() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Cita />
        <SobreMi />
        <Formacion />
        <Experiencia />
        <Liderazgo />
        <CrownPlanner />
        <Contacto />
      </main>
      <TweaksHost />
    </>
  );
}
