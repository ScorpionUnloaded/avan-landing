/**
 * Every public route, per locale. Extended as routes are added; the e2e, SEO
 * and axe suites iterate this list so no page ships untested.
 */
export type RouteCase = { path: string; locale: "en" | "fr"; name: string };

const EN_PATHS = ["/", "/pfi", "/legal", "/privacy"];

export const ROUTES: RouteCase[] = EN_PATHS.flatMap((p) => [
  { path: p, locale: "en" as const, name: `en ${p}` },
  { path: p === "/" ? "/fr" : `/fr${p}`, locale: "fr" as const, name: `fr ${p}` },
]);
