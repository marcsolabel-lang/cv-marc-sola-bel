"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import ImageBlock from "@/components/ImageBlock";

interface ProjectSpotlightProps {
  label: string;
  title: string;
  description: string;
  points: string[];
  imageSrc?: string;
  imageHint?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export default function ProjectSpotlight({
  label,
  title,
  description,
  points,
  imageSrc,
  imageHint = "screenshot del proyecto",
  ctaHref,
  ctaLabel = "Ver proyecto",
}: ProjectSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      className="w-full"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-start">
        {/* Text */}
        <div className="text-left">
          <span className="font-serif text-xl italic text-amber">{label}</span>
          <h3
            className="mt-2 font-extrabold text-ink leading-tight"
            style={{ fontSize: "var(--fs-h3)" }}
          >
            {title}
          </h3>
          <p
            className="mt-4 text-muted"
            style={{ fontSize: "var(--fs-body)" }}
          >
            {description}
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p, i) => (
              <li
                key={i}
                className="flex gap-3 text-ink"
                style={{ fontSize: "var(--fs-body)" }}
              >
                <span className="text-amber shrink-0 mt-0.5">—</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {ctaHref && (
            <a
              href={ctaHref}
              className="mt-8 inline-block rounded-full border border-amber px-5 py-2.5 text-sm font-semibold text-amber hover:bg-amber hover:text-sand transition-colors duration-200"
            >
              {ctaLabel}
            </a>
          )}
        </div>

        {/* Image */}
        <ImageBlock
          src={imageSrc}
          alt={title}
          hint={imageHint}
          aspect="landscape"
          className="w-full"
        />
      </div>
    </motion.div>
  );
}
