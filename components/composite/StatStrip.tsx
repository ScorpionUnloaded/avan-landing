"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { duration, ease, STAGGER_INTERVAL } from "@/lib/tokens";

type Stat = { value: string; label: string };

/** A single figure. Numeric values count up once on entry; others render static. */
function Figure({ value, label, active }: Stat & { active: boolean }) {
  const reduce = useReducedMotion();
  const isNumeric = /^\d+$/.test(value);
  const target = isNumeric ? parseInt(value, 10) : 0;
  const pad = value.length;
  const [counted, setCounted] = useState("0".padStart(pad, "0"));
  // Non-numeric figures (∞) and reduced motion show the final value outright.
  const display = !isNumeric || reduce ? value : counted;

  useEffect(() => {
    if (!active || !isNumeric || reduce) return;
    let raf = 0;
    const start = performance.now();
    const ms = 600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(eased * target);
      setCounted(String(current).padStart(pad, "0"));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, isNumeric, reduce, target, pad, value]);

  return (
    <div className="flex flex-col gap-3 border-t border-hairline pt-5">
      {/* bronze-600 on cream-raised = 4.50:1 — passes AA even at normal size,
          comfortably at this monumental size. The gild returns where it's legal. */}
      <span className="font-mono text-stat font-normal tabular-nums text-fg-gilt">
        {display}
      </span>
      <span className="font-sans text-overline uppercase text-eyebrow">
        {label}
      </span>
    </div>
  );
}

export function StatStrip({ stats }: { stats: readonly Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: reduce ? duration.fast : duration.deliberate,
            ease: reduce ? "linear" : ease.emphasized,
            delay: reduce ? 0 : i * STAGGER_INTERVAL,
          }}
        >
          <Figure {...s} active={inView} />
        </motion.div>
      ))}
    </div>
  );
}
