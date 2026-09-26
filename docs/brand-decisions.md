# Brand decisions log

Every place this site resolves a conflict between brand sources, fills a gap, or
deliberately departs from a brand rule. Nothing below is silent: each entry names
the rule, the decision and why.

**Source precedence** (when brand documents disagree):
1. the owner's explicit decisions for this redesign;
2. the DTCG token files (`tokens/brand/*.json`), which are the authoritative palette and values;
3. `AVAN_LANDING_BUILD_PLAN.md`, the landing-specific plan and the most recent document;
4. the A1–A6 brand book;
5. the Brand Token Sheet (YAML), which is AI-extracted and so ranks lowest.

Values the landing needs that the brand files lack are **added to the token source**
(`tokens/extensions/*.json`, each with a `$description` citing its origin) before
use. They are never inlined in a component.

## Colour

| # | Rule / source | Decision | Why |
|---|---|---|---|
| C1 | `semantic.light.text-eyebrow` = bronze.600 | Eyebrows use **bronze.700** on light surfaces | bronze.600 is 4.23:1 on cream, which passes AA only for large text. Eyebrows are 12px. A2.1: "any cell below AA fails the build." |
| C2 | `focus.ring-color` = alias.brand-secondary (bronze.500) | Focus ring is **bronze.600** on light and bronze.400 on dark/inverse | bronze.500 is 2.9:1 on cream; focus indicators need 3:1 (WCAG 1.4.11). |
| C3 | Owner: "refine the palette in OKLCH"; brand logo rules: "do not change the documented colours" | Every documented hex is kept **exactly** (a unit test enforces it). OKLCH is the interpolation space (`color-mix(in oklch, …)`) and is published beside each hex in `lib/tokens`. | The two instructions only both hold if the colours stay put and the modern colour space does the work around them. |
| C4 | Build plan §0: "not a dark-mode toggle site" | **Light / Dark / System** theme toggle | Owner decision. The brand already defines `semantic.dark` ("a re-mapped second palette, not an inversion", A2.1) and A6-1 specifies `[data-theme="dark"]` plus `prefers-color-scheme`. |
| C5 | Brand component tokens reference `semantic.light.*` directly | Components use scope-agnostic roles (`--avan-fg`, `--avan-surface-canvas`, …) redefined per scope | Otherwise dark mode and the navy sections cannot flow through components. |
| C6 | — | New role **fg-gilt** (bronze.600 light / bronze.400 dark) for gilt numerals at display size only | Large text needs 3:1; bronze.600 gives 4.2:1 on cream. Body text never uses it. |
| C7 | — | Dark theme "inverse" beats go one step deeper, to `color.base.black` | Keeps the navy/cream cadence legible when the canvas itself is dark. |

## Typography

| # | Rule / source | Decision | Why |
|---|---|---|---|
| T1 | Suisse Int'l is the text face | **Hanken Grotesk** (OFL, variable) in the `--font-text` slot until Suisse is licensed | The previous build shipped a "Suisse" file downloaded from OnlineWebFonts, which was not licensed for this use. It has been removed. Hanken was the grotesque already named as fallback in the original code. |
| T2 | A2.2 names Inter as the sanctioned fallback; the build plan and audit spec say never ship Inter | Inter is **not loaded and not in the stack** | The audit spec ranks "Inter font syndrome" as a critical brand-dilution risk. Owner chose a distinctive substitute. |
| T3 | Build plan: overlines in Suisse Int'l Mono | Overlines use the **text face** (tokens: `semantic.overline` = text, 500, 0.32em) | Token files outrank the build plan. Mono (IBM Plex Mono) is kept for figures and ledger numerals. |
| T4 | Brand JSON sizes are fixed rem | The **A2.2 fluid clamps** (360→1280px) are added to `tokens/extensions/typography.json` | Values are copied verbatim from the brand book. |
| T5 | Build plan display-xl `clamp(72px, 12vw, 200px)` | Hero wordmark token, with tracking from the lockup spec (0.15em) | Keeps the monumental wordmark while matching the logo's tracking. |

## Layout

| # | Rule / source | Decision | Why |
|---|---|---|---|
| L1 | Build plan container 1320px; A2.3 container-2xl 1200px | **1200px** content inside the A2.3 outer margins (20 → 48px) | Token source outranks the build plan (audit spec F3). |
| L2 | Tokens `section-gap` 64px; build plan `clamp(96px, 12vh, 160px)` | Build plan rhythm, added as `layout.section.pad` | The 64px gap is the app value. The marketing template (A5-2) and the build plan call audit-grade whitespace a brand signal. |
| L3 | A2.3 radius scale up to 12px; build plan "0–2px everywhere" | Tailwind exposes only `rounded-sm` (2px) and `rounded-full` (true circles) | The landing's geometry rule, enforced by a unit test. |

## Motion

| # | Rule / source | Decision | Why |
|---|---|---|---|
| M1 | A3-1: "anything past deliberate (500ms) is disallowed" | Two tokenised exceptions: the **home overture** (1400ms) and the **/pfi crest reveal** (800ms); the hero **wordmark settle** (1100ms) is part of the overture | The Token Sheet reserves "extended" and "slow" timings for exactly these brand-film moments. None of them delays access to content. |
| M2 | Owner chose "cinematic" scroll; build plan forbids scroll-jacking and pinning; Token Sheet caps parallax at 3% (5% in the hero) | **Native scroll**, no pinning, no Lenis. Scroll-*triggered* choreography only, animating transform and opacity, with parallax ≤ 3% (hero ≤ 5%) on background imagery. | Owner confirmed the brand-compliant reading. |
| M3 | Logo rules: "do not rotate the mark" | The hero gem no longer rotates in | The previous build's 1.4s rotation contradicted the lockup rules. |
| M4 | Token Sheet: "no continuous looping motion except a subtle ambient hero shift" | Only the hero loops. Chapter films play once and rest on their last frame. | Keeps the owner's ambient films inside the guardrail. |
| M5 | Custom cursor and magnetic buttons (owner) vs "utility motion nearly invisible" / hover lift ≤ 2px | A bronze **cursor ring** on fine pointers only, with the native cursor kept. **No magnetism.** | Owner confirmed. |
