"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Editorial image in a hairline frame with a duotone wash (plan §C.5).
 * Uses next/image (fill) so the optimizer serves responsive AVIF/WebP variants —
 * sharp on Retina, lean on mobile. If the source is missing it fades out,
 * leaving the cream-raised frame — never a broken-image glyph.
 */
export function EditorialImage({
  src,
  alt,
  ratio = "16 / 9",
  overlay = "warm",
  sizes = "(max-width: 1380px) 100vw, 1320px",
  className,
}: {
  src: string;
  alt: string;
  ratio?: string;
  overlay?: "warm" | "dark";
  /** next/image sizes hint — override when the image doesn't span the container. */
  sizes?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={cn(
        "group relative overflow-hidden border border-hairline bg-raised",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-deliberate ease-standard motion-safe:group-hover:scale-[1.03]"
          onError={() => setFailed(true)}
        />
      )}
      <span
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", overlay === "dark" ? "wash-ink" : "wash-ink-soft")}
      />
    </figure>
  );
}
