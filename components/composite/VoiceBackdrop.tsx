"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Moody full-bleed backdrop for the Voice section (library still, heavily washed).
 * A leaf client component so the parent Section stays server-rendered. next/image
 * serves responsive variants; on load failure it unmounts, leaving the navy field.
 */
export function VoiceBackdrop() {
  const [failed, setFailed] = useState(false);

  return (
    // The wrapper is the image's positioned parent (next/image `fill` requires
    // one); `absolute inset-0` resolves against the section's `relative`, so
    // the backdrop stays full-bleed even though it renders inside Container.
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {!failed && (
        <Image
          src="/imgs/library.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          onError={() => setFailed(true)}
        />
      )}
      <span aria-hidden className="wash-deep absolute inset-0" />
    </div>
  );
}
