import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { textSizes } from "@/lib/tokens/tokens.generated";

/**
 * tailwind-merge must be taught the brand's named font sizes: otherwise it
 * can't tell `text-display-l` (size) from `text-fg` (colour), treats them as
 * one group, and silently drops the size when a colour class is merged in.
 * The list is generated from the type tokens, so it can never fall out of sync.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [...textSizes],
    },
  },
});

/** Merge conditional class names, de-duplicating conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
