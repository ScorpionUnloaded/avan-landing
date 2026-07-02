"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { duration, ease, SLIDE_DISTANCE } from "@/lib/tokens";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Extra delay in seconds before this block enters. */
  delay?: number;
  as?: "div" | "section" | "li" | "figure";
};

/**
 * The workhorse scroll reveal (plan §F.3): opacity 0→1 + rise 16px,
 * 500ms emphasized, once. Under reduced motion it becomes an opacity-only fade.
 */
export function Reveal({ delay = 0, as = "div", children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: SLIDE_DISTANCE }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: reduce ? duration.fast : duration.deliberate,
        ease: reduce ? "linear" : ease.emphasized,
        delay,
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
