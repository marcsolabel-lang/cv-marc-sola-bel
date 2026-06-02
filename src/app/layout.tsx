import type { Metadata } from "next";
import { Bricolage_Grotesque, Cormorant_Garamond } from "next/font/google";
import { MotionConfig } from "motion/react";
import Script from "next/script";
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
  description: "Proyectos, automatización con IA y estrategia comercial.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Marc Sola",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bricolage.variable} ${cormorant.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#C0542A" />
      </head>
      <body className="bg-sand text-ink antialiased overflow-x-hidden" suppressHydrationWarning>
        <MotionConfig reducedMotion="user">
          <SmoothScroll>{children}</SmoothScroll>
        </MotionConfig>
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');`,
          }}
        />
      </body>
    </html>
  );
}
