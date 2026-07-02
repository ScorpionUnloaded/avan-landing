"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * The Brand Token Sheet's documented `gold_rule_draw` signature transition:
 * a thin gold rule draws left-to-right in 220–320ms, fading rather than snapping.
 * Decorative (aria-hidden); collapses to a fade under reduced motion.
 */
export function DrawnRule({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={cn("inline-block h-px w-8 origin-left bg-bronze-400", className)}
      initial={reduce ? { opacity: 0 } : { scaleX: 0, opacity: 0.4 }}
      whileInView={reduce ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
    />
  );
}
