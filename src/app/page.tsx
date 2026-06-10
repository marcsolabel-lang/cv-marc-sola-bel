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

/* CV de una página (doc-A v3 §2, orden revisado 2026-06-10) — ritmo
   O-C-O-C-C-C-O-O: la Cita pasa tras Sobre mí para que los dos picos
   oscuros de apertura no se fundan (negro · blanco · negro). */

export default function CVPage() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <SobreMi />
        <Cita />
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
