# AVAN Landing — build notes

Built to `AVAN/PROMPT/AVAN_LANDING_BUILD_PLAN.md`. Everything lives inside `AVAN/PROMPT/`.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Decisions & deviations (recorded per plan §J.1 / Appendix A)
- **Sans typeface:** **Suisse Int'l Regular** is now self-hosted via `next/font/local`
  (`app/fonts/SuisseIntl-Regular.woff2`, license alongside). Only Regular (400) was supplied, so
  weight 500 maps to the same file to avoid faux-bold — when a `SuisseIntl-Medium.woff2` is
  licensed, add it as a `weight: "500"` src entry in `app/layout.tsx`. Stack (`--avan-font-sans`):
  `var(--font-suisse)` → `"Suisse Int'l"` → system.
- **Mono:** `--avan-font-mono` prefers `"Suisse Int'l Mono"`, falls back to **IBM Plex Mono**.
- **Display:** Cormorant Garamond (real, via `next/font/google`).
- **Colors:** navy `#141E2D` / `#0E1722`, bronze/gilt `#C5A572`, cream `#F4F1EA` — canonical.

## Assets — real photography + footage, wired
All five Appendix B stills and the hero video are real (externally generated, then optimized here)
and live:
- `public/imgs/{facade,ledger,seal,library,bronze}.jpg` — compressed from ~2MB PNGs down to
  100–190KB via a one-off `scripts/optimize-assets.mjs` (uses `sharp`, installed with `--no-save`
  so it never entered `package.json`/lockfile; safe to `npm install sharp` again if re-running it).
- `public/videos/hero.mp4` — the vault footage. No `hero.webm` or poster frame yet (no ffmpeg on
  this machine to transcode/extract one); the hero's CSS `.hero-atmosphere` layer sits behind the
  video at all times, so load-in is never a blank frame.

Wiring: `facade.jpg` → Provenance, `ledger.jpg` → Layers, `bronze.jpg` → Stone (ambient band),
`seal.jpg` → Register (sticky side accent), `library.jpg` → Voice (full-bleed backdrop via the
`VoiceBackdrop` client component — kept as its own leaf component so `Voice.tsx` stays server-rendered).

Everything still degrades gracefully: a missing file fades to its hairline frame / navy field —
never a broken-image glyph. `EditorialImage` (`components/composite/EditorialImage.tsx`) is the
shared frame; it's a Client Component. **Note for future edits:** don't inline an `onError` handler
directly inside a Server Component (bit us once — hung static export) — always route raster
`<img>` fallback handling through a small `"use client"` leaf like `VoiceBackdrop.tsx`.

**Resolved (Phase 1, 2026-07-02):** `hero.webm` (VP9, ~0.8MB vs 2.7MB mp4) and `hero-poster.jpg`
were transcoded via `ffmpeg-static` (installed `--no-save`, one-off like sharp was originally).
Stills were regenerated at full native resolution and now serve through **next/image**
(`EditorialImage`/`VoiceBackdrop` use `fill` + `sizes`) — the optimizer emits responsive AVIF/WebP
variants, closing the Retina-softness P1. `sharp` is now a real dependency (next/image needs it in
production self-hosting).

## Conversion elevation (Phase 2, 2026-07-02)
Built the plan's §J.3 levers #1 and #3 (see `TRANSFORMATION_REPORT.md` for the full audit):
- **Self-qualification:** `prive.registers` in `content/copy.ts` carries per-nature reassurance +
  success copy; `InquiryForm` is controlled on `nature` and speaks in the selected register (the
  reassurance line crossfades via the new opacity-only `.fade-soft`). Keys mirror
  `INQUIRY_NATURES` exactly — keep them in sync if natures change.
- **Trust protocol:** discreet In confidence / Personal review / No obligation `<dl>` in the Privé
  sticky column. Role-true statements only — no invented signatories.
- **Fix:** `VoiceBackdrop`'s `fill` image now has its own absolute wrapper (was warning about a
  static parent — the Section's `Container` is the direct parent and is unpositioned).
Deferred: concierge "private line" (§J.3 #2) until a real address/calendar exists on the domain.

## Inquiry delivery (Phase 1)
`/api/inquiry` delivery chain: **Resend** (`RESEND_API_KEY` + `INQUIRY_TO_EMAIL`) → **webhook**
(`INQUIRY_WEBHOOK_URL`) → dev no-op. When Resend is active the inquirer also receives a quiet
house-voice acknowledgment. Key behavior: if any sink is configured and all fail, the API returns
**502** and the form shows the retry message — a configured pipeline never loses an inquiry
silently. See `.env.example` for the full contract.

## Phase 2 (2026-07-02): i18n + /pfi + legal
- **Locales:** English canonical at `/`, French at `/fr` (middleware rewrites `/` → internal `/en`,
  redirects literal `/en/*` → `/*`, 308). All copy lives in `content/en.ts` / `content/fr.ts`
  sharing the `Copy` type (`typeof en` — en is deliberately NOT `as const`). Sections receive copy
  as props from the page; nothing imports a copy module directly. Locale switcher (EN·FR) in nav.
  Inquiry `nature` values stay English enum; labels localize via `{value,label}` pairs.
- **/pfi — the crest's debut** (user re-confirmed; see plan Appendix C): `CrownMark` (line-art
  crown in the gem's language) + `PfiCrest` (crown → shield → drawn rule → motto) with the Token
  Sheet's ceremonial `crest_reveal` (~850ms, luminance lift, settle). **Lion/Stag supporters are
  commissioned-artwork slots** — drop `public/brand/crest-lion.webp` + `crest-stag.webp` and they
  mount automatically (until then each /pfi view logs two intentional 404s — expected).
  Generation prompts (from the Brand Token Sheet's own ai_generation_hints):
  - Lion: "A poised heraldic lion supporter in fine gold line art on transparent background,
    facing right, controlled dignity, thin monoline strokes matching an engraved crest, no fill,
    no roaring sports-mascot styling, no text."
  - Stag: "An elegant heraldic stag supporter with prominent antlers in fine gold line art on
    transparent background, facing left, composed stance, thin monoline strokes matching an
    engraved crest, no fill, no rustic hunting imagery, no text."
  /pfi's CTA deep-links home with `?nature=Institutional` — the form preselects it.
- **/legal + /privacy** via the shared `HouseDocument` template; footer links are real routes now.
- **Gotcha fixed en route:** custom font sizes (`text-display-l` etc.) must be registered in
  `lib/cn.ts` (`extendTailwindMerge`) — otherwise tailwind-merge drops the size whenever a
  `text-{color}` class is merged in. Bit us on every Heading with a color className.

## Deploy (Vercel)
Ready as-is: `next build` is green, images/OG run on Vercel natively. Steps (requires your account):
1. Push `avan-landing/` to a Git repo, import it in Vercel.
2. Set env vars: `NEXT_PUBLIC_SITE_URL` (the real domain), `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`,
   `INQUIRY_FROM_EMAIL` (verified domain sender), optionally `INQUIRY_WEBHOOK_URL`.
3. Attach the domain. Canonical/OG/sitemap/robots all derive from `NEXT_PUBLIC_SITE_URL`.
Note: the in-memory rate limiter is per-instance on serverless — acceptable for this traffic
profile; swap for Upstash/KV if volume ever matters.

## Token source of truth
Color/motion/type tokens mirror the sibling files in `AVAN/PROMPT/` (`avan-color-tokens.json`,
`avan-motion-tokens.json`, `avan-typography-tokens.json`). The runtime layer is
`styles/tokens.css` (CSS custom properties) + `tailwind.config.ts`. No hardcoded hex in components.
