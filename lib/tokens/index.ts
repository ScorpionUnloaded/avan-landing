/**
 * Runtime token access. Everything here is generated from tokens/** by
 * scripts/tokens/build.mjs — import from "@/lib/tokens", never hard-code values.
 */
export * from "./tokens.generated";
import { motion } from "./tokens.generated";

/** Section entrance — the workhorse reveal (opacity + 16px rise). */
export const SLIDE_DISTANCE = motion.reveal.distance;
export const STAGGER_INTERVAL = motion.stagger.interval;
export const STAGGER_CAP = motion.stagger.cap;
