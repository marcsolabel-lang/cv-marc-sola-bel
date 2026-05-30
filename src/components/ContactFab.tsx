"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ContactFabProps {
  email: string;
  linkedin?: string;
}

export default function ContactFab({ email, linkedin }: ContactFabProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col gap-2 rounded-xl border border-line bg-sand/95 p-3 shadow-lg backdrop-blur"
          >
            <a href={`mailto:${email}`} className="text-sm text-ink hover:text-amber transition-colors">
              {email}
            </a>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-ink hover:text-amber transition-colors"
              >
                LinkedIn
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        aria-expanded={open}
        aria-label="Contacto"
        className="rounded-full bg-amber px-5 py-3 text-sm font-semibold text-ink shadow-lg"
      >
        {open ? "Cerrar" : "Contacto"}
      </motion.button>
    </div>
  );
}
