import type { Metadata } from "next";
import { Bricolage_Grotesque, Cormorant_Garamond, Oswald } from "next/font/google";
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
      className={`${bricolage.variable} ${cormorant.variable} ${oswald.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
