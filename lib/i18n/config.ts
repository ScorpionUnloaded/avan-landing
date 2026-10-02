/**
 * The locale table. Adding a language is one entry here plus one copy file in
 * content/; routing (proxy.ts), metadata, the sitemap and the tests all derive
 * from this list. Kept free of "@/" imports so Playwright can load it directly.
 */
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

/** Canonical at the bare root; every other locale is path-prefixed. */
export const defaultLocale: Locale = "en";

export const localeMeta: Record<Locale, { ogLocale: string; label: string }> = {
  en: { ogLocale: "en_US", label: "English" },
  fr: { ogLocale: "fr_FR", label: "Français" },
};

/**
 * Request header in which proxy.ts passes the resolved locale to Server
 * Components that receive no params (not-found).
 */
export const LOCALE_HEADER = "x-avan-locale";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Path prefix for a locale: "" for the default, "/fr" for French. */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/** Public URL path of a route in a locale: ("fr", "/pfi") → "/fr/pfi", ("en", "/") → "/". */
export function localizedPath(locale: Locale, path: string): string {
  const prefix = localePrefix(locale);
  if (path === "/") return prefix || "/";
  return `${prefix}${path}`;
}
