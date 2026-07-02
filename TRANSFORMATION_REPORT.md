# AVAN Group — Website Transformation Report
**Date:** 2026-07-02 · **Scope:** full audit against award-grade criteria + conversion elevation pass (Phase 2)

---

## 1. Executive summary

The site was audited live against the dimensions award juries score — UX, visual design,
storytelling, motion, accessibility, performance, technical craft — and against the build plan's own
self-improvement register (§J). Finding: **the foundation is already at the intended premium level.**
The token system, editorial typography (Suisse Int'l / Cormorant Garamond), motion language,
WCAG-checked contrast math, and narrative arc (Hero → Provenance → Rivers → Layers → Stone →
Register → Figures → Voice → Privé) are coherent and handcrafted, not template-derived.

The genuine gap was **conversion engineering at the ask** — the plan's §J.3 levers were documented
but never built. This pass built the two highest-leverage ones, and fixed one latent rendering
defect found during the audit. Production build is green; every change was verified in the browser.

## 2. Audit scorecard

| Dimension | State found | Action |
|---|---|---|
| Brand & storytelling | Strong: single-voice copy deck, patrimonial narrative, no inflation | Kept intact |
| Visual identity | Token-driven; bronze budget respected; no hardcoded hex | Kept intact |
| Motion | Reduced-motion honored everywhere; signature wordmark tracking-settle; scroll choreography | Kept intact |
| Accessibility | Skip link, focus rings, 44px targets, contrast-corrected bronze, aria-live form states | Kept intact |
| Performance | Poster-first connection-aware hero video (webm 0.8MB), next/image AVIF/WebP, 161 kB first-load JS, static homepage | Verified green |
| **Conversion** | **Generic reassurance/success copy for all five principal registers; no trust density at the form** | **Elevated — see §3** |
| Technical hygiene | One defect: next/image `fill` warning in Voice backdrop (static parent) | Fixed |

## 3. What was built (Phase 2)

### 3.1 Self-qualification path (plan §J.3, lever #1)
The "Nature of inquiry" select now re-addresses the form in the chosen principal's register:
- **`content/copy.ts`** — new `prive.registers`: per-nature reassurance + success copy
  (Capital / Advisory / Institutional / Cultural / Other), written in the house voice and mapped to
  the same five principals as the Register section's litany.
- **`components/composite/InquiryForm.tsx`** — the select is controlled; the reassurance line
  beside the submit button and the post-submit acknowledgment both speak in the selected register.
  The line crossfades via a new opacity-only `.fade-soft` (no travel — the form never appears to
  move), keyed off the nature, still `aria-live="polite"`.

### 3.2 Trust density at the ask (plan §J.3, lever #3)
- **`sections/Prive.tsx`** — a discreet "protocol" definition list in the sticky column, under a
  hairline rule: **In confidence / Personal review / No obligation**, each with one plain sentence.
  No fake logos, no invented signatories — role-true statements only.

### 3.3 Defect fix
- **`components/composite/VoiceBackdrop.tsx`** — the `fill` image now has its own
  absolutely-positioned wrapper (its required positioned parent), resolving against the section's
  `relative`, so the backdrop stays full-bleed and the console warning is gone.

## 4. Verification (browser + build)
- Nature select → reassurance re-addresses correctly (Capital register confirmed live).
- Full submit flow → tailored success panel (Cultural register confirmed live).
- Protocol block renders in the house idiom (mono overline terms, hairline rule) — screenshot-verified.
- Voice backdrop: wrapper `position:absolute` confirmed in computed styles; no new console warnings.
- `next build`: compiled clean, types valid, homepage prerendered static, **161 kB** first-load JS.

## 5. Deliberate non-actions
- **Concierge alternative (§J.3 lever #2)** — a "private line" needs a real address/calendar on the
  production domain; wiring a placeholder mailto would ship a dead endpoint. Deferred until the
  domain and inbox exist (both env-driven already).
- **A/B variants (§J.5)** — hero headline variants a/b/c are already staged in `content/copy.ts`;
  they need traffic and an experiment layer, not code.

## 6. Ranked remaining roadmap
1. **Concierge line** beside the form once `prive@<domain>` or a scheduling link exists.
2. **`/pfi` sub-route** — carry the institutional audience deeper without diluting the AVAN homepage.
3. **Methodology page** — credible proof for a discreet house that cannot name mandates.
4. **Shared-element transition** from a river card to its future detail route.
5. **CMS-back the copy deck** (`content/copy.ts` → Sanity/MDX) once wording stabilizes; the file is
   already structured for an `fr` locale.
6. **Field-measure Core Web Vitals** on the production domain after deploy (lab numbers are green;
   the video-led hero is the metric to watch — poster-first + connection-gating already mitigates it).
