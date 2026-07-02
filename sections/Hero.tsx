"use client";

import { motion, useReducedMotion } from "framer-motion";
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
      ease: reduce ? "linear" : ease.emphasized,
      delay: reduce ? 0 : delay,
    },
  });

  return (
    <section
      id="hero"
      aria-label="AVAN Group"
      className="avan-dark relative flex min-h-[100svh] flex-col overflow-hidden bg-ink-950 text-cream"
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
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 10%, rgba(10,14,20,0.2) 0%, rgba(10,14,20,0.62) 55%, rgba(10,14,20,0.92) 100%)",
        }}
      />
      <div aria-hidden="true" className="hero-grain" />

      <div className="relative mx-auto flex w-full max-w-container flex-1 flex-col px-gutter-sm pb-14 pt-28 md:px-gutter md:pb-20 md:pt-32">
        <motion.p
          {...rise(0.05)}
          className="font-mono text-overline uppercase tracking-[0.32em] text-bronze-400"
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
              ease: reduce ? "linear" : ease.emphasized,
              delay: reduce ? 0 : 0.15,
            }}
            className="font-serif text-display-xl font-medium"
          >
            {copy.wordmark}
          </motion.h1>

          <motion.p {...rise(0.5)} className="mt-8 font-serif text-display-m italic text-cream/95">
            {copy.thesis}
          </motion.p>

          <motion.p {...rise(0.62)} className="mt-4 max-w-xl font-sans text-body-lg text-cream/70">
            {copy.headline}
          </motion.p>
        </div>

        <motion.div
          {...rise(0.75)}
          className="flex items-center justify-between gap-6 border-t border-[color:var(--avan-border-hairline-dark)] pt-6"
        >
          <a
            href={copy.secondaryCta.hash}
            className="avan-underline font-mono text-overline uppercase text-cream/80 transition-colors duration-fast hover:text-bronze-400"
          >
            {copy.secondaryCta.label}
          </a>
          <span className="flex items-center gap-3 font-mono text-overline uppercase text-cream/50">
            {copy.scrollCue}
            <span aria-hidden className="block h-8 w-px bg-bronze-400/60" />
          </span>
        </motion.div>
      </div>

      <InViewTracker event="hero_view" />
    </section>
  );
}
