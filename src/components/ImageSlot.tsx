import Image from "next/image";

interface ImageSlotProps {
  /** AI prompt text, exposed as data-prompt for reference in DevTools. */
  prompt: string;
  /** Optional real image. If absent, only the CSS WKW texture shows. */
  src?: string;
  alt?: string;
  /** Extra classes for the wrapper (sizing, rounding, etc.). */
  className?: string;
  /** WKW variant. */
  variant?: "default" | "noir";
}

export default function ImageSlot({
  prompt,
  src,
  alt = "",
  className = "",
  variant = "default",
}: ImageSlotProps) {
  return (
    <div
      data-prompt={prompt}
      className={`wkw-bg ${variant === "noir" ? "wkw-bg--noir" : ""} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ zIndex: 2 }}
        />
      ) : null}
    </div>
  );
}
