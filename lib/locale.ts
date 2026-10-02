import { localizedPath, type Locale } from "./i18n/config";

export { locales, defaultLocale, isLocale, type Locale } from "./i18n/config";

/** Home path for a locale — English is canonical at the root, French prefixed. */
export function homePath(locale: Locale): string {
  return localizedPath(locale, "/");
}

/** Locale-aware path for a route like "/pfi" or "/legal". */
export function localeHref(locale: Locale, path: string): string {
  return localizedPath(locale, path);
}

/** Same-page-or-cross-page anchor into the home page (e.g. "#privé"). */
export function homeAnchor(locale: Locale, hash: string): string {
  return `${homePath(locale)}${hash}`;
}
