import { en, type Copy } from "./en";
import { fr } from "./fr";
import type { Locale } from "@/lib/locale";

const copies: Record<Locale, Copy> = { en, fr };

export function getCopy(locale: Locale): Copy {
  return copies[locale];
}

export type { Copy };
