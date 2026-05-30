"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { ChatMessage } from "@/app/api/chat/route";

/* ── Suggestion prompts ─────────────────────────────────────────── */

const SUGGESTIONS = [
  {
    label: "Revisar UI",
    detail: "Detecta AI tells y pre-flight fails en un componente.",
    prompt:
      "Revisa este componente con el pre-flight checklist de taste-skill. Identifica AI tells y da correcciones concretas con tabla Before/After/Why.",
  },
  {
    label: "Spring values",
    detail: "Configuracion optima para drag, modales y reveals.",
    prompt:
      "Dame los spring values correctos (stiffness/damping) para: 1) drag-to-dismiss mobile, 2) modal enter, 3) scroll reveal. Justifica cada uno.",
  },
  {
    label: "Easing guide",
    detail: "Que curva usar segun el tipo de animacion.",
    prompt:
      "Explica que easing usar para: entradas, salidas, movimiento en pantalla, hover. Con los cubic-bezier concretos del skill de Emil Kowalski.",
  },
  {
    label: "Auditar animaciones",
    detail: "Solo transform y opacity. Sin ease-in. Sin scale(0).",
    prompt:
      "Audita estas animaciones siguiendo los principios de Emil Kowalski: solo transform/opacity, no ease-in, no scale(0), duracion correcta. Dame tabla Before/After/Why.",
  },
  {
    label: "Hold-to-delete",
    detail: "Patron clip-path con timing asimetrico.",
    prompt:
      "Como implementar hold-to-delete con clip-path en React/Motion: press lento (2s linear), release rapido (200ms ease-out), con scale(0.97) en active.",
  },
  {
    label: "Design read",
    detail: "Brief inference + dials antes de cualquier layout.",
    prompt:
      "Aplica el proceso de brief inference de taste-skill a mi proyecto. Dame: design read, los 3 dials (VARIANCE/MOTION/DENSITY) justificados, y 3 decisiones de layout que se derivan de esos dials.",
  },
];

/* ── Simple message formatter (no extra deps) ─────────────────── */

function formatContent(text: string): React.ReactNode {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const inner = part.slice(3, -3).replace(/^\w+\n/, "");
      return (
        <pre
          key={i}
          className="my-3 overflow-x-auto rounded-lg border border-line bg-dark/90 p-4 text-[0.8125rem] leading-relaxed text-sand/80"
        >
          <code>{inner}</code>
        </pre>
      );
    }
    const lines = part.split("\n");
    return lines.map((line, j) => {
      if (!line.trim()) return null;
      /* Markdown table passthrough */
      if (line.startsWith("|")) {
        return (
          <p key={`${i}-${j}`} className="font-mono text-[0.8125rem] text-ink/70">
            {line}
          </p>
        );
      }
      return (
        <p key={`${i}-${j}`} className="mb-1.5 text-[0.9375rem] leading-relaxed">
          {line}
        </p>
      );
    });
  });
}

/* ── Typing indicator ──────────────────────────────────────────── */

function TypingDots() {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center gap-1 py-1 pl-1" aria-label="Procesando">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-1.5 w-1.5 rounded-full bg-amber"
          animate={reduce ? {} : { y: [0, -4, 0] }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            repeat: Infinity,
            delay: i * 0.12,
          }}
        />
      ))}
    </div>
  );
}

/* ── Message bubble ─────────────────────────────────────────────── */

function MessageBubble({
  msg,
  index,
}: {
  msg: ChatMessage;
  index: number;
}) {
  const reduce = useReducedMotion();
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: index * 0.04 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      {isUser ? (
        <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-amber px-4 py-2.5 text-[0.9375rem] leading-relaxed text-sand">
          {msg.content}
        </div>
      ) : (
        <div className="max-w-[92%] rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-3 text-ink">
          {formatContent(msg.content)}
        </div>
      )}
    </motion.div>
  );
}

/* ── Suggestion card ───────────────────────────────────────────── */

function SuggestionCard({
  s,
  onClick,
}: {
  s: (typeof SUGGESTIONS)[0];
  onClick: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      onClick={onClick}
      whileHover={reduce ? {} : { x: 3 }}
      whileTap={reduce ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group w-full rounded-xl border border-line bg-sand p-3.5 text-left transition-colors hover:border-amber/50 hover:bg-shade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
    >
      <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-amber">
        {s.label}
      </span>
      <span className="mt-1 block text-[0.8125rem] text-muted leading-snug">
        {s.detail}
      </span>
    </motion.button>
  );
}

/* ── Main ChatClient component ─────────────────────────────────── */

export default function ChatClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const reduce = useReducedMotion();

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [reduce]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: ChatMessage = { role: "user", content: trimmed };
      const next = [...messages, userMsg];
      setMessages(next);
      setInput("");
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error ?? "Error en la respuesta");
        setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error desconocido");
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setLoading(false);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    },
    [messages, loading]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const reset = () => {
    setMessages([]);
    setError(null);
    inputRef.current?.focus();
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-full min-h-0 flex-col md:flex-row">
      {/* ── Left: suggestions ─────────────────────────────────── */}
      <aside
        className={`
          flex-shrink-0 border-line bg-sand transition-all
          ${hasMessages ? "md:w-56 md:border-r" : "md:w-72 md:border-r"}
          w-full border-b md:border-b-0
        `}
      >
        <div className="flex h-full flex-col">
          <div className="px-4 pb-3 pt-5">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
              Sugerencias
            </p>
          </div>

          {/* Mobile: horizontal scroll | Desktop: vertical list */}
          <div className="flex gap-2 overflow-x-auto px-4 pb-4 md:flex-col md:overflow-x-visible md:gap-2 md:overflow-y-auto md:pb-4">
            {SUGGESTIONS.map((s) => (
              <div key={s.label} className="min-w-[180px] md:min-w-0">
                <SuggestionCard s={s} onClick={() => send(s.prompt)} />
              </div>
            ))}
          </div>

          {hasMessages && (
            <div className="mt-auto border-t border-line px-4 py-3">
              <button
                onClick={reset}
                className="w-full rounded-lg border border-line px-3 py-2 text-[0.75rem] font-medium text-muted transition-colors hover:border-amber/50 hover:text-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                Nueva conversacion
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ── Right: chat area ────────────────────────────────────── */}
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
          {!hasMessages && !loading ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="flex h-full flex-col items-center justify-center text-center"
            >
              <p className="font-serif italic text-2xl text-ink/30 md:text-3xl">
                Haz una pregunta o elige una sugerencia.
              </p>
              <p className="mt-3 text-sm text-muted">
                Emil · Impeccable · Taste-skill
              </p>
            </motion.div>
          ) : (
            <div className="mx-auto max-w-[720px] space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <MessageBubble key={i} msg={msg} index={i} />
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-3">
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                  <button
                    onClick={() => setError(null)}
                    className="ml-3 underline hover:no-underline"
                  >
                    Cerrar
                  </button>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-line bg-sand px-4 py-3 md:px-6">
          <div className="mx-auto flex max-w-[720px] items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Pregunta sobre diseno, animaciones, code review... (Enter para enviar)"
              disabled={loading}
              rows={1}
              className="flex-1 resize-none rounded-xl border border-line bg-white px-4 py-3 text-[0.9375rem] text-ink placeholder:text-muted/60 transition-colors focus-visible:border-amber focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber disabled:opacity-50"
              style={{ maxHeight: "120px", overflowY: "auto" }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
              }}
            />
            <motion.button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              whileTap={reduce ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-xl bg-amber text-sand transition-opacity disabled:opacity-40 hover:bg-amber/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
              aria-label="Enviar mensaje"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 9h12M9 3l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
          <p className="mt-2 text-center text-[0.6875rem] text-muted/60">
            Enter para enviar · Shift+Enter para nueva linea · max 1 024 tokens por respuesta
          </p>
        </div>
      </div>
    </div>
  );
}
