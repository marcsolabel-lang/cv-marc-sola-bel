"use client";

import Image from "next/image";

interface ImageBlockProps {
  src?: string;
  alt?: string;
  hint?: string;
  aspect?: "landscape" | "portrait" | "square";
  className?: string;
}

const aspectMap = {
  landscape: "aspect-[16/9]",
  portrait:  "aspect-[3/4]",
  square:    "aspect-square",
};

export default function ImageBlock({
  src,
  alt = "",
  hint,
  aspect = "landscape",
  className = "",
}: ImageBlockProps) {
  const aspectClass = aspectMap[aspect];

  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${aspectClass} ${className}`}>
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-shade ${aspectClass} ${className}`}
    >
      <span
        className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-muted"
        aria-hidden="true"
      >
        {hint ?? "imagen"}
      </span>
      <span className="mt-1 text-[0.6rem] text-muted/50" aria-hidden="true">
        {aspect === "landscape" ? "16 : 9" : aspect === "portrait" ? "3 : 4" : "1 : 1"}
      </span>
    </div>
  );
}
