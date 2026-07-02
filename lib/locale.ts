export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Home path for a locale — English is canonical at the root, French prefixed. */
export function homePath(locale: Locale): string {
  return locale === "en" ? "/" : "/fr";
}

/** Locale-aware path for a route like "/pfi" or "/legal". */
export function localeHref(locale: Locale, path: string): string {
  return locale === "en" ? path : `/fr${path}`;
}

/** Same-page-or-cross-page anchor into the home page (e.g. "#privé"). */
export function homeAnchor(locale: Locale, hash: string): string {
  return `${homePath(locale)}${hash}`;
}
