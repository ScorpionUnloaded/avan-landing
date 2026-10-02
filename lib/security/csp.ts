/**
 * Content-Security-Policy for every HTML document, issued per request by
 * proxy.ts with a fresh nonce.
 *
 * Why a nonce rather than hashes (see docs/engineering-decisions.md, E1): Next
 * inlines each page's flight data as a script whose content differs per page
 * and per build, so a static hash list cannot allow it. Next stamps the nonce
 * on its own scripts during dynamic rendering; `'strict-dynamic'` then trusts
 * whatever those scripts load (chunks, Vercel Analytics, Turnstile).
 *
 * `https:` and `'unsafe-inline'` are fallbacks for CSP level 1–2 browsers only:
 * level 3 browsers ignore both when a nonce and 'strict-dynamic' are present.
 */
export const CSP_REPORT_PATH = "/api/csp-report";

const TURNSTILE = "https://challenges.cloudflare.com";

export function contentSecurityPolicy(nonce: string, { dev = false } = {}): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      "https:",
      "'unsafe-inline'",
      // React's development build evaluates code for error overlays.
      ...(dev ? ["'unsafe-eval'"] : []),
    ],
    // Inline style attributes are server-rendered by React (motion initial
    // states, image placeholders); style injection is not a script vector here.
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'"],
    "media-src": ["'self'"],
    "connect-src": ["'self'", TURNSTILE, ...(dev ? ["ws:"] : [])],
    "frame-src": [TURNSTILE],
    "worker-src": ["'self'", "blob:"],
    "manifest-src": ["'self'"],
    "object-src": ["'none'"],
    "base-uri": ["'none'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "report-uri": [CSP_REPORT_PATH],
    "report-to": ["csp"],
  };
  return Object.entries(directives)
    .map(([name, values]) => `${name} ${values.join(" ")}`)
    .join("; ");
}

/** 128 bits of randomness, base64 — unguessable and unique per response. */
export function createNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return btoa(String.fromCharCode(...bytes));
}
