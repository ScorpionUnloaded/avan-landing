/**
 * JS-side mirror of the motion tokens (../avan-motion-tokens.json) for Framer Motion.
 * Durations are in seconds (Framer Motion's unit). Easings are cubic-bezier arrays.
 */
export const ease = {
  standard: [0.2, 0.7, 0.2, 1],
  accelerate: [0.4, 0, 1, 1],
  inOut: [0.65, 0, 0.35, 1],
  emphasized: [0.2, 0, 0, 1],
  settle: [0.34, 1.16, 0.64, 1],
} as const;

export const duration = {
  fast: 0.1,
  normal: 0.2,
  slow: 0.3,
  deliberate: 0.5,
} as const;

/** Section entrance — the workhorse reveal (opacity + rise). */
export const SLIDE_DISTANCE = 16; // px
export const STAGGER_INTERVAL = 0.04; // 40ms
export const STAGGER_CAP = 8;
