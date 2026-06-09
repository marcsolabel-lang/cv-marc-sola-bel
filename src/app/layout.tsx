import type { Metadata } from "next";
import { Bricolage_Grotesque, Cormorant_Garamond, Oswald } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    "Pienso en sistemas, construyo soluciones. Proyectos, automatización con IA y estrategia comercial.",
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
      <body className="antialiased">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
