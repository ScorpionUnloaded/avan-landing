import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must be taught the brand's named font sizes: otherwise it
 * can't tell `text-display-l` (size) from `text-cream` (color), treats them as
 * one group, and silently drops the size when a color class is merged in.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display-xl", "display-l", "display-m", "stat", "body-lg", "body", "caption", "overline"],
    },
  },
});

/** Merge conditional class names, de-duplicating conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
