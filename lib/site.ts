/**
 * Canonical site origin. Resolution order: an explicit NEXT_PUBLIC_SITE_URL,
 * then Vercel's production domain, then the known production URL — never a
 * placeholder, so canonical/OG/sitemap URLs are always real.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "https://avan-landing.vercel.app";
}

export const SITE_URL = resolveSiteUrl();

/**
 * Search engines index production only. Vercel preview and development
 * deployments answer `noindex` and disallow crawling; outside Vercel (local,
 * CI) the site behaves as production so Lighthouse audits the real policy.
 */
export function isIndexable(): boolean {
  const env = process.env.VERCEL_ENV;
  return !env || env === "production";
}
