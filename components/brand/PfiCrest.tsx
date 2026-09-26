"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CrownMark } from "./CrownMark";
import { PfiMark } from "./PfiMark";
import { DrawnRule } from "@/components/motion/DrawnRule";
import { ease } from "@/lib/tokens";

/**
 * The crest's debut (Brand Token Sheet, `crest_reveal`): the composition fades
 * in as a unified silhouette over ~850ms, gold detail arrives as a restrained
 * luminance lift, and it settles with a slight scale reduction. Lion and Stag
 * supporters are commissioned-artwork slots (public/brand/crest-{lion,stag}.webp)
 * that mount gracefully when the files exist — generation prompts in NOTES.md.
 */
export function PfiCrest({ motto, crestAlt }: { motto: string; crestAlt: string }) {
  const reduce = useReducedMotion();
  const [lionOk, setLionOk] = useState(true);
  const [stagOk, setStagOk] = useState(true);

  return (
    <motion.figure
      role="img"
      aria-label={crestAlt}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: reduce ? 0.1 : 0.85, ease: reduce ? "linear" : ease.emphasized }}
      className="relative flex flex-col items-center gap-7"
    >
      {/* Restrained luminance lift behind the composition — never sparkle. */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, delay: reduce ? 0 : 0.45, ease: ease.standard }}
        className="absolute -inset-24 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(197,165,114,0.14) 0%, rgba(197,165,114,0.04) 55%, transparent 100%)",
        }}
      />

      {/* Supporters — commissioned artwork slots; hidden until the files exist. */}
      {lionOk && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/brand/crest-lion.webp"
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-1/2 h-40 w-auto translate-x-[-110%] -translate-y-1/2 lg:h-52"
          onError={() => setLionOk(false)}
        />
      )}
      {stagOk && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/brand/crest-stag.webp"
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-1/2 h-40 w-auto -translate-y-1/2 translate-x-[110%] lg:h-52"
          onError={() => setStagOk(false)}
        />
      )}

      <CrownMark className="relative h-14 w-auto md:h-16" />
      <PfiMark className="relative h-40 w-auto md:h-48" />
      <DrawnRule className="relative w-16" />
      <figcaption className="relative font-mono text-overline uppercase tracking-[0.32em] text-bronze-400">
        {motto}
      </figcaption>
    </motion.figure>
  );
}
