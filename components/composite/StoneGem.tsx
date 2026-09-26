"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { GemMark } from "@/components/brand/GemMark";

/**
 * The gem on the Stone section, with a faint pointer parallax (≤6px), desktop only,
 * disabled under reduced motion and on touch. On reveal it eases up once.
 */
export function StoneGem({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    const MAX = 6;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      x.set(nx * MAX);
      y.set(ny * MAX);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y]);

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
      className={className}
    >
      <GemMark className="h-full w-auto" aria-hidden="true" title="" />
    </motion.div>
  );
}
