import type { Metadata } from "next";
import Link from "next/link";
import ChatClient from "@/components/ChatClient";

export const metadata: Metadata = {
  title: "Design Assistant | Marc Sola",
  description:
    "Asistente de diseno y codigo con Emil Kowalski, Impeccable y taste-skill como base de conocimiento.",
};

export default function ChatPage() {
  return (
    <div className="flex h-[100dvh] flex-col bg-sand">
      {/* Header */}
      <header className="flex flex-shrink-0 items-center justify-between border-b border-line bg-dark px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-1.5 text-[0.75rem] font-medium text-sand/40 transition-colors hover:text-sand/80"
            aria-label="Volver al CV"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-0.5"
            >
              <path
                d="M9 2L4 7l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            CV
          </Link>

          <span className="text-sand/15 select-none" aria-hidden="true">
            /
          </span>

          <span className="text-[0.8125rem] font-medium text-sand/70">
            Design Assistant
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-sand/30 sm:block">
            Emil · Impeccable · Taste-skill
          </span>
          <div
            className="h-1.5 w-1.5 rounded-full bg-amber"
            aria-label="Activo"
            title="Claude Opus 4.8 activo"
          />
        </div>
      </header>

      {/* Chat */}
      <main className="min-h-0 flex-1 overflow-hidden">
        <ChatClient />
      </main>
    </div>
  );
}
