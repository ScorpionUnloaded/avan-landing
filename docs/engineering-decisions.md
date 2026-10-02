# Engineering decisions

Choices with a real trade-off, why they were made, and what would reverse
them. Brand-rule conflicts live in [brand-decisions.md](brand-decisions.md).

## E1 — CSP: per-request nonce, pages rendered dynamically

**Decision.** Every HTML document gets a fresh nonce from `proxy.ts`; the
policy is `script-src 'nonce-…' 'strict-dynamic'` with `object-src 'none'`,
`base-uri 'none'`, `frame-ancestors 'none'` and no `'unsafe-eval'`
(`lib/security/csp.ts`). Reading the nonce in the root layout renders pages
per request.

**Tried first: a static, hash-based policy** with `experimental.sri`, which
keeps pages prerendered and CDN-cached. SRI did add `integrity` to every
external chunk, but Next also inlines each page's flight data as a script
whose content differs per page and per build. Under `script-src 'self'` plus
the theme script's hash, Chromium blocked two inline scripts on every route
and hydration failed (React error #412). A static header cannot list hashes
that only exist after the build.

**Cost.** No CDN caching of HTML. Measured locally with `next start`: about
90 ms server time warm, about 400 ms on a cold first request. Open Graph
images, icons, robots and the sitemap stay static.

**Verified by.** `tests/e2e/security.spec.ts`: every route runs with zero
`securitypolicyviolation` events and hydrates, every executable script
carries the response's nonce, and the nonce differs between responses.
Violations in the field are reported to `/api/csp-report`, which logs the
directive, blocked origin and page path only.

**Would reverse if** Next ships hash support for its inline flight scripts,
or moves flight data out of inline scripts.

## E2 — zod runs JIT-less

zod 4 compiles validators with `new Function` and probes for it on load,
which a CSP without `'unsafe-eval'` reports as a violation on every home page
view. `z.config({ jitless: true })` (in `lib/inquiry-schema.ts`) removes the
probe.

## E3 — Analytics only on Vercel

`@vercel/analytics` and `@vercel/speed-insights` load their scripts from
`/_vercel/*`, which exists only on Vercel. Elsewhere (local, CI) they would
404 on every view and cost Lighthouse's best-practices score, so the layout
renders them only when `VERCEL` is set. Both are cookieless; `beforeSend`
strips query strings so nothing a link appended leaves the browser.

## E4 — Indexing follows the deployment

`VERCEL_ENV=preview|development` answers `noindex` in metadata and
`Disallow: /` in robots.txt. Without `VERCEL_ENV` (local, CI) the site
behaves as production, so Lighthouse audits the real policy.

## E5 — Open Graph cards in the brand faces

`next/og` (Satori) cannot read woff2, so `lib/og/fonts/` carries woff subsets
of Cormorant Garamond and Hanken Grotesk (Latin + Latin-1 + Latin Extended-A,
about 30 KB each) with their OFL licences. Cards render at build on the Node
runtime and are served at the path Next links them from: `proxy.ts` no longer
redirects `/en/**/opengraph-image/*`, which removes a hop for every crawler.
