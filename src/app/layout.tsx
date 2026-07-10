import type { Metadata } from "next";
import { Bricolage_Grotesque, Cormorant_Garamond, Oswald, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

/* solo las caras usadas: 600 normal (seed) + 600 italic (sprites «sistema») */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Pancarta constructivista (topbar, índice, labels) — decisión de Design
   validada en el Hero/Cita vivos; complementa al sistema Bricolage+Cormorant. */
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

/* Mono técnica (estética microsite, ADR-0030 Fulgor): "la mono dice dato
   técnico" — reservada a ficha técnica y metadatos numéricos (Atlas).
   Continuidad con el CV PDF, que ya usa IBM Plex Mono para lo mismo. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marc Sola Bel — CV",
  description:
    "Pienso en sistemas; construyo soluciones. Gestión de proyectos, coordinación de equipo y automatización con IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${cormorant.variable} ${oswald.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
