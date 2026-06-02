import type { Metadata } from "next";
import { Bricolage_Grotesque, Cormorant_Garamond } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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

export const metadata: Metadata = {
  title: "Marc Sola — CV",
  description:
    "Proyectos, automatización con IA y estrategia comercial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bricolage.variable} ${cormorant.variable}`}>
      <body className="bg-sand text-ink antialiased overflow-x-hidden">
        <MotionConfig reducedMotion="user">
          <SmoothScroll>{children}</SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}
