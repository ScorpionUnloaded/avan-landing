import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_HEADER } from "@/lib/i18n/config";
import { contentSecurityPolicy, createNonce, CSP_REPORT_PATH } from "@/lib/security/csp";

/** Generated Open Graph / Twitter images, which Next links at their internal path. */
const METADATA_IMAGE = /\/(?:opengraph|twitter)-image(?:\/[\w-]+)?$/;

/**
 * Locale routing and the per-request CSP.
 *
 * - The default locale is canonical at the root (`/`, `/pfi`, …) and is
 *   rewritten internally to its `/en/*` tree; other locales live under their
 *   prefix. A direct hit on `/en/*` redirects (308) to the clean root, so there
 *   is exactly one URL per page — except generated metadata images, which are
 *   served where Next links them instead of costing a crawler an extra hop.
 * - Every document gets a fresh nonce: Next reads it from the request's CSP
 *   header and stamps it on its scripts; the same policy goes on the response.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (first === defaultLocale && !METADATA_IMAGE.test(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const nonce = createNonce();
  const csp = contentSecurityPolicy(nonce, { dev: process.env.NODE_ENV === "development" });
  const locale = isLocale(first) ? first : defaultLocale;

  const headers = new Headers(req.headers);
  headers.set("x-nonce", nonce);
  headers.set("content-security-policy", csp);
  headers.set(LOCALE_HEADER, locale);

  let res: NextResponse;
  if (isLocale(first)) {
    res = NextResponse.next({ request: { headers } });
  } else {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    res = NextResponse.rewrite(url, { request: { headers } });
  }
  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("Reporting-Endpoints", `csp="${CSP_REPORT_PATH}"`);
  return res;
}

export const config = {
  // Skip API routes, Next internals, Vercel's analytics endpoints and any path
  // with a file extension (images, video, fonts, icons, robots, sitemap…).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
