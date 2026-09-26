"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { duration, ease, SLIDE_DISTANCE, STAGGER_INTERVAL, STAGGER_CAP } from "@/lib/tokens";

/**
 * Staggered container + item (plan §F.3): children rise in sequence, 40ms apart,
 * capped at 8 (beyond which remaining children enter together via the cap).
 */
export function Stagger({ children, className, ...rest }: HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : STAGGER_INTERVAL,
            staggerDirection: 1,
          },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, ...rest }: HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: SLIDE_DISTANCE },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? duration.fast : duration.deliberate, ease: reduce ? "linear" : ease.emphasized },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export { STAGGER_CAP };
