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
