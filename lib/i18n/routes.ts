/**
 * The route table: one row per public page. The sitemap, the metadata helper's
 * breadcrumbs and every e2e/axe/SEO suite iterate it, so a page added here is
 * indexed and tested everywhere at once. Kept free of "@/" imports so
 * Playwright can load it directly.
 */
export type RouteKey = "home" | "pfi" | "legal" | "privacy";

export type RouteEntry = {
  key: RouteKey;
  /** Path without locale prefix. */
  path: string;
  /** Parent route for breadcrumbs; the home page has none. */
  parent?: RouteKey;
  /** Content date for the sitemap — fixed, so the sitemap only changes when a page does. */
  lastModified: string;
  priority: number;
};

export const routes: readonly RouteEntry[] = [
  { key: "home", path: "/", lastModified: "2026-10-02", priority: 1 },
  { key: "pfi", path: "/pfi", parent: "home", lastModified: "2026-10-02", priority: 0.8 },
  { key: "legal", path: "/legal", parent: "home", lastModified: "2026-10-02", priority: 0.3 },
  { key: "privacy", path: "/privacy", parent: "home", lastModified: "2026-10-02", priority: 0.3 },
];

export function routeByKey(key: RouteKey): RouteEntry {
  const route = routes.find((r) => r.key === key);
  if (!route) throw new Error(`Unknown route: ${key}`);
  return route;
}
