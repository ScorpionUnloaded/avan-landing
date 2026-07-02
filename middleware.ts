import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale routing. English is canonical at the root (`/`, `/pfi`, …) and is
 * internally rewritten to the `/en/*` tree; French lives at `/fr/*`. A direct
 * hit on `/en/*` redirects to the clean root so there is exactly one URL per page.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals, and any path with a file extension
  // (images, videos, fonts, favicon…).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
