import { locales, localizedPath, type Locale } from "../lib/i18n/config";
import { routes } from "../lib/i18n/routes";

/**
 * Every public route × locale, generated from the route table, so a page added
 * there is covered by the e2e, SEO and axe suites with no further edits.
 */
export type RouteCase = { path: string; locale: Locale; name: string };

export const ROUTES: RouteCase[] = routes.flatMap((r) =>
  locales.map((locale) => ({ path: localizedPath(locale, r.path), locale, name: `${locale} ${r.path}` })),
);
