"use client";

import { motion, useReducedMotion } from "motion/react";
import { GemMark } from "@/components/brand/GemMark";
import { InViewTracker } from "@/components/motion/InViewTracker";
import { duration, ease } from "@/lib/tokens";
import { useConnectionAllowsVideo } from "@/lib/useConnectionAllowsVideo";
import type { Copy } from "@/content";

export function Hero({ copy }: { copy: Copy["hero"] }) {
  const reduce = useReducedMotion();
  const allowVideo = useConnectionAllowsVideo();

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? duration.fast : duration.deliberate,
      ease: reduce ? ("linear" as const) : ease.emphasized,
      delay: reduce ? 0 : delay,
    },
  });

  return (
    <section
      id="hero"
      aria-label="AVAN Group"
      data-surface="inverse"
      className="relative flex min-h-svh flex-col overflow-hidden bg-canvas text-fg"
    >
      {/* Designed atmosphere — the intentional fallback shown until hero footage exists. */}
      <div aria-hidden="true" className="hero-atmosphere" />

      {/* Decorative footage, layered over the designed atmosphere (its fallback/backdrop).
          Skipped entirely on data-saver / slow connections (useConnectionAllowsVideo) —
          the atmosphere alone carries those visits, at zero extra bytes. */}
      {allowVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          autoPlay={!reduce}
          muted
          loop
          playsInline
          poster="/videos/hero-poster.jpg"
          aria-hidden="true"
          tabIndex={-1}
        >
          {/* webm (VP9, ~0.8MB) first; mp4 (H.264, ~2.7MB) as the universal fallback. */}
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      )}
      {/* Duotone legibility wash. */}
      <div aria-hidden="true" className="hero-wash" />
      <div aria-hidden="true" className="hero-grain" />

      <div className="relative mx-auto flex w-full max-w-page flex-1 flex-col px-margin pb-14 pt-28 md:pb-20 md:pt-32">
        <motion.p
          {...rise(0.05)}
          className="font-sans text-overline uppercase tracking-[0.32em] text-eyebrow"
        >
          {copy.eyebrow}
        </motion.p>

        <div className="flex flex-1 flex-col items-start justify-center">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -8, scale: 0.96 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: reduce ? duration.fast : 1.4, ease: ease.emphasized }}
            className="mb-8 md:mb-10"
          >
            <GemMark className="h-20 w-auto md:h-28" aria-hidden="true" title="" />
          </motion.div>

          {/* Wordmark tracking-settle — the Brand Token Sheet's documented
              wordmark_reveal: "subtle tracking normalization from slightly open
              to final tracking." Letterform arrives, then composes itself. */}
          <motion.h1
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, y: 20, letterSpacing: "0.22em" }
            }
            animate={
              reduce ? { opacity: 1 } : { opacity: 1, y: 0, letterSpacing: "0.08em" }
            }
            transition={{
              duration: reduce ? duration.fast : 1.1,
              ease: reduce ? ("linear" as const) : ease.emphasized,
              delay: reduce ? 0 : 0.15,
            }}
            className="font-serif text-display-xl font-medium"
          >
            {copy.wordmark}
          </motion.h1>

          <motion.p {...rise(0.5)} className="mt-8 font-serif text-display-m italic text-fg">
            {copy.thesis}
          </motion.p>

          <motion.p {...rise(0.62)} className="mt-4 max-w-xl font-sans text-body-lg text-fg-muted">
            {copy.headline}
          </motion.p>
        </div>

        <motion.div
          {...rise(0.75)}
          className="flex items-center justify-between gap-6 border-t border-hairline pt-6"
        >
          <a
            href={copy.secondaryCta.hash}
            className="avan-underline font-sans text-overline uppercase text-fg transition-colors duration-fast hover:text-eyebrow"
          >
            {copy.secondaryCta.label}
          </a>
          <span className="flex items-center gap-3 font-sans text-overline uppercase text-fg-muted">
            {copy.scrollCue}
            <span aria-hidden className="block h-8 w-px bg-gilt/60" />
          </span>
        </motion.div>
      </div>

      <InViewTracker event="hero_view" />
    </section>
  );
}
