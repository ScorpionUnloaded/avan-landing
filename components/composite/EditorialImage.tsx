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
        "group relative overflow-hidden border border-(--avan-border-hairline) bg-cream-raised",
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
          className="object-cover transition-transform duration-1600 ease-standard motion-safe:group-hover:scale-[1.03]"
          onError={() => setFailed(true)}
        />
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            overlay === "dark"
              ? "linear-gradient(180deg, rgba(14,23,34,0.15) 0%, rgba(14,23,34,0.55) 100%)"
              : "linear-gradient(180deg, rgba(20,30,45,0.04) 0%, rgba(20,30,45,0.16) 100%)",
        }}
      />
    </figure>
  );
}
