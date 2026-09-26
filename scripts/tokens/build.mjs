#!/usr/bin/env node
/**
 * AVAN token build. One source of truth → every runtime layer.
 *
 *   tokens/brand/*.json        the brand's DTCG files, verbatim (never edited)
 *   tokens/semantic/*.json     colour roles per scope (light, dark, inverse, inverse-dark)
 *   tokens/extensions/*.json   values the landing needs that the brand files lack,
 *                              each citing its source (docs/brand-decisions.md)
 *
 * Emits (committed; `--check` fails when they drift from the sources):
 *   styles/tokens.generated.css     CSS custom properties, scoped per theme/surface
 *   styles/theme.generated.css      Tailwind v4 @theme mapping utilities to the vars
 *   lib/tokens/tokens.generated.ts  typed values for Motion/GSAP, OG images, emails, /system
 *
 *   node scripts/tokens/build.mjs [--check]
 */
import StyleDictionary from "style-dictionary";
import { formatHex, converter } from "culori";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const CHECK = process.argv.includes("--check");
const ROOT = path.resolve(import.meta.dirname, "../..");

const sd = new StyleDictionary({
  source: [
    "tokens/brand/avan-color-tokens.json",
    "tokens/brand/avan-typography-tokens.json",
    "tokens/brand/avan-spacing-tokens.json",
    "tokens/brand/avan-motion-tokens.json",
    "tokens/brand/avan-state-tokens.json",
    "tokens/semantic/*.json",
    "tokens/extensions/*.json",
  ].map((p) => path.join(ROOT, p)),
  usesDtcg: true,
  log: { verbosity: "silent", warnings: "disabled" },
  platforms: { raw: {} },
});

const { allTokens } = await sd.getPlatformTokens("raw");
const byPath = new Map(allTokens.map((t) => [t.path.join("."), t]));
const get = (p) => {
  const t = byPath.get(p);
  if (!t) throw new Error(`Missing token: ${p}`);
  return t.$value;
};
const under = (prefix) =>
  allTokens.filter((t) => t.path.join(".").startsWith(prefix + ".")).map((t) => ({
    key: t.path.slice(prefix.split(".").length).join("-"),
    value: t.$value,
    token: t,
  }));

const toOklch = converter("oklch");
function oklchOf(hex) {
  const c = toOklch(hex);
  if (!c) return null;
  const h = Number.isFinite(c.h) ? c.h : 0;
  return `oklch(${(c.l * 100).toFixed(2)}% ${c.c.toFixed(4)} ${h.toFixed(2)})`;
}
const bezier = (v) => `cubic-bezier(${v.join(", ")})`;
const shadowCss = (layers) =>
  layers.map((l) => `${l.offsetX} ${l.offsetY} ${l.blur} ${l.spread} ${l.color}`).join(", ");

/* ---------------------------------------------------------------- primitives */
const RAMPS = ["ink", "bronze", "verdant", "amber", "oxblood", "azure", "neutral"];
const palette = {};
for (const ramp of RAMPS) {
  for (const { key, value } of under(`color.${ramp}`)) palette[`${ramp}-${key}`] = value;
}
for (const { key, value } of under("color.base")) palette[key] = value;

const SCOPES = ["light", "dark", "inverse", "inverse-dark"];
const roles = {};
for (const scope of SCOPES) {
  roles[scope] = Object.fromEntries(under(`theme.${scope}`).map(({ key, value }) => [key, value]));
}
const roleNames = Object.keys(roles.light);
for (const scope of SCOPES) {
  const missing = roleNames.filter((r) => !(r in roles[scope]));
  if (missing.length) throw new Error(`Scope ${scope} is missing roles: ${missing.join(", ")}`);
}

const easings = Object.fromEntries(under("easing").map(({ key, value }) => [key, value]));
const durations = Object.fromEntries(under("duration").map(({ key, value }) => [key, value]));
const fluid = Object.fromEntries(under("type.fluid").map(({ key, value }) => [key, value]));
const fixedSizes = Object.fromEntries(under("font.size").map(({ key, value }) => [key, value]));
const lineHeights = Object.fromEntries(under("font.lineHeight").map(({ key, value }) => [key, value]));
const letterSpacings = Object.fromEntries(under("font.letterSpacing").map(({ key, value }) => [key, value]));
const typeRoles = Object.fromEntries(
  allTokens
    .filter((t) => t.path[0] === "type" && t.path[1] === "role")
    .map((t) => [t.path[2], t.$value]),
);
const families = Object.fromEntries(under("type.family").map(({ key, value }) => [key, value]));
const shadows = Object.fromEntries(
  under("shadow").filter(({ value }) => Array.isArray(value)).map(({ key, value }) => [key, value]),
);
const breakpoints = Object.fromEntries(under("breakpoint").map(({ key, value }) => [key, value]));

const motion = {
  reveal: { duration: get("motion.reveal.duration"), easing: get("motion.reveal.easing"), distance: get("motion.reveal.distance") },
  staggerInterval: get("motion.stagger.interval"),
  staggerCap: get("motion.stagger.cap"),
  hoverDuration: get("motion.hover.duration"),
  hoverLift: get("motion.hover.lift"),
  pressDuration: get("motion.press.duration"),
  pressScale: get("motion.press.scale"),
  underline: { duration: get("motion.underline.duration"), easing: get("motion.underline.easing") },
  goldRule: { duration: get("motion.gold-rule.duration"), easing: get("motion.gold-rule.easing") },
  overture: { duration: get("motion.overture.duration"), easing: get("motion.overture.easing") },
  wordmarkSettle: {
    duration: get("motion.wordmark-settle.duration"),
    fromTracking: get("motion.wordmark-settle.from-tracking"),
    rise: get("motion.wordmark-settle.rise"),
  },
  crestReveal: { duration: get("motion.crest-reveal.duration"), easing: get("motion.crest-reveal.easing") },
  parallax: { default: get("motion.parallax.default"), hero: get("motion.parallax.hero") },
  reduced: { duration: get("motion.reduced.duration"), easing: get("motion.reduced.easing") },
  pattern: {
    pageEnter: get("pattern.page-enter-forward"),
    sharedElement: get("pattern.shared-element"),
    sheetEnter: get("pattern.sheet-enter"),
  },
};

const layout = {
  page: get("layout.container.page"),
  measure: get("layout.container.measure"),
  margin: Object.fromEntries(under("layout.margin").map(({ key, value }) => [key, value])),
  gutter: Object.fromEntries(under("layout.gutter").map(({ key, value }) => [key, value])),
  sectionPad: get("layout.section.pad"),
  sectionPadSm: get("layout.section.pad-sm"),
  navHeight: get("layout.nav.height"),
  navHeightMd: get("layout.nav.height-md"),
  touchTarget: get("layout.touch-target"),
};

const focus = {
  width: get("focus.ring-width"),
  offset: get("focus.ring-offset"),
};

/* ---------------------------------------------------------------- CSS vars */
const HEADER = (what) =>
  `/* ${what}\n   GENERATED by scripts/tokens/build.mjs from tokens/**. Do not edit by hand. */\n`;

function block(selector, lines, indent = "") {
  return `${indent}${selector} {\n${lines.map((l) => `${indent}  ${l}`).join("\n")}\n${indent}}\n`;
}
const roleLines = (scope) => [
  ...roleNames.map((r) => `--avan-${r}: ${roles[scope][r]};`),
  `color-scheme: ${scope === "light" ? "light" : "dark"};`,
];

const primitiveLines = [
  "/* Palette — brand hex values, exact (OKLCH equivalents in lib/tokens). */",
  ...Object.entries(palette).map(([k, v]) => `--avan-${k}: ${v};`),
  "/* Type */",
  ...Object.entries(families).map(([k, v]) => `--avan-font-${k}: ${v};`),
  "/* Layout */",
  `--avan-page: ${layout.page};`,
  `--avan-measure: ${layout.measure};`,
  `--avan-margin: ${layout.margin.base};`,
  `--avan-gutter: ${layout.gutter.base};`,
  `--avan-section-pad: ${layout.sectionPadSm};`,
  `--avan-nav-h: ${layout.navHeight};`,
  `--avan-touch: ${layout.touchTarget};`,
  "/* Focus (avan-state-tokens) */",
  `--avan-focus-width: ${focus.width};`,
  `--avan-focus-offset: ${focus.offset};`,
  "/* Motion */",
  ...Object.entries(easings).map(([k, v]) => `--avan-ease-${k}: ${bezier(v)};`),
  ...Object.entries(durations).map(([k, v]) => `--avan-dur-${k}: ${v};`),
  `--avan-reveal-distance: ${motion.reveal.distance};`,
  `--avan-stagger: ${motion.staggerInterval};`,
  `--avan-hover-lift: ${motion.hoverLift};`,
  `--avan-press-scale: ${motion.pressScale};`,
  `--avan-overture-dur: ${motion.overture.duration};`,
  `--avan-wordmark-dur: ${motion.wordmarkSettle.duration};`,
  `--avan-wordmark-from-tracking: ${motion.wordmarkSettle.fromTracking};`,
  `--avan-wordmark-rise: ${motion.wordmarkSettle.rise};`,
  `--avan-crest-dur: ${motion.crestReveal.duration};`,
];

const bp = (name) => breakpoints[name];
const tokensCss =
  HEADER("AVAN design tokens — CSS custom properties.") +
  "\n" +
  block(":root", [...primitiveLines, "/* Semantic roles — light theme */", ...roleLines("light")]) +
  `\n@media (min-width: ${bp("md")}) {\n` +
  block(":root", [`--avan-margin: ${layout.margin.md};`, `--avan-gutter: ${layout.gutter.md};`, `--avan-section-pad: ${layout.sectionPad};`, `--avan-nav-h: ${layout.navHeightMd};`], "  ") +
  `}\n@media (min-width: ${bp("lg")}) {\n` +
  block(":root", [`--avan-margin: ${layout.margin.lg};`, `--avan-gutter: ${layout.gutter.lg};`], "  ") +
  `}\n@media (min-width: ${bp("xl")}) {\n` +
  block(":root", [`--avan-margin: ${layout.margin.xl};`], "  ") +
  `}\n@media (min-width: ${bp("2xl")}) {\n` +
  block(":root", [`--avan-margin: ${layout.margin["2xl"]};`, `--avan-gutter: ${layout.gutter["2xl"]};`], "  ") +
  "}\n\n/* Dark theme — explicit choice, or the system preference when none is stored. */\n" +
  block(':root[data-theme="dark"]', roleLines("dark")) +
  "@media (prefers-color-scheme: dark) {\n" +
  block(':root:not([data-theme="light"])', roleLines("dark"), "  ") +
  "}\n\n/* Surface scopes. `inverse` is the navy authority beat; `canvas` resets to the theme. */\n" +
  block('[data-surface="inverse"]', roleLines("inverse")) +
  block('[data-surface="canvas"]', roleLines("light")) +
  block(':root[data-theme="dark"] [data-surface="inverse"]', roleLines("inverse-dark")) +
  block(':root[data-theme="dark"] [data-surface="canvas"]', roleLines("dark")) +
  "@media (prefers-color-scheme: dark) {\n" +
  block(':root:not([data-theme="light"]) [data-surface="inverse"]', roleLines("inverse-dark"), "  ") +
  block(':root:not([data-theme="light"]) [data-surface="canvas"]', roleLines("dark"), "  ") +
  "}\n";

/* ---------------------------------------------------------------- Tailwind theme */
const SEMANTIC_COLOR_UTILS = {
  canvas: "surface-canvas",
  raised: "surface-raised",
  overlay: "surface-overlay",
  fg: "fg",
  "fg-muted": "fg-muted",
  eyebrow: "fg-eyebrow",
  "fg-gilt": "fg-gilt",
  hairline: "border-hairline",
  strong: "border-strong",
  accent: "accent",
  gilt: "gilt",
  action: "action-bg",
  "action-hover": "action-bg-hover",
  "on-action": "action-fg",
  focus: "focus-ring",
  success: "state-success",
  warning: "state-warning",
  error: "state-error",
  info: "state-info",
  scrim: "scrim",
};
for (const role of Object.values(SEMANTIC_COLOR_UTILS)) {
  if (!roleNames.includes(role)) throw new Error(`Utility maps to unknown role ${role}`);
}

const textScale = {
  xs: fixedSizes.xs,
  sm: fixedSizes.sm,
  base: fixedSizes.base,
  lg: fixedSizes.lg,
  xl: fixedSizes.xl,
  ...fluid,
};
const textLines = [];
for (const [k, v] of Object.entries(textScale)) {
  textLines.push(`--text-${k}: ${v};`);
  if (lineHeights[k] !== undefined) textLines.push(`--text-${k}--line-height: ${lineHeights[k]};`);
  if (letterSpacings[k] !== undefined) textLines.push(`--text-${k}--letter-spacing: ${letterSpacings[k]};`);
}
for (const [k, v] of Object.entries(typeRoles)) {
  textLines.push(`--text-${k}: ${v.fontSize};`);
  if (v.lineHeight !== undefined) textLines.push(`--text-${k}--line-height: ${v.lineHeight};`);
  if (v.letterSpacing !== undefined) textLines.push(`--text-${k}--letter-spacing: ${v.letterSpacing};`);
  if (v.fontWeight !== undefined) textLines.push(`--text-${k}--font-weight: ${v.fontWeight};`);
}

const themeCss =
  HEADER("AVAN Tailwind v4 theme — utilities resolve to the token custom properties.") +
  "\n/* Only brand values exist: Tailwind's default palette, type scale, radii,\n   shadows and easings are cleared first. */\n" +
  block("@theme", [
    "--color-*: initial;",
    "--font-*: initial;",
    "--text-*: initial;",
    "--radius-*: initial;",
    "--shadow-*: initial;",
    "--ease-*: initial;",
    "--container-*: initial;",
    ...Object.entries(breakpoints).map(([k, v]) => `--breakpoint-${k}: ${v};`),
    "/* Radius — build plan §C.3: 0–2px everywhere; `full` only for true circles. */",
    "--radius-sm: 2px;",
    "--radius-full: 9999px;",
    ...Object.entries(shadows).map(([k, v]) => `--shadow-${k}: ${shadowCss(v)};`),
    `--shadow-lift: ${shadowCss(get("elevation.lift"))};`,
    ...Object.entries(easings).map(([k, v]) => `--ease-${k}: ${bezier(v)};`),
    ...textLines,
  ]) +
  "\n/* `inline` so utilities read the variable at use-site — scopes can redefine it. */\n" +
  block("@theme inline", [
    ...Object.entries(SEMANTIC_COLOR_UTILS).map(([util, role]) => `--color-${util}: var(--avan-${role});`),
    ...Object.keys(palette).map((k) => `--color-${k}: var(--avan-${k});`),
    "--font-display: var(--avan-font-display);",
    "--font-serif: var(--avan-font-display);",
    "--font-text: var(--avan-font-text);",
    "--font-sans: var(--avan-font-text);",
    "--font-mono: var(--avan-font-mono);",
    "--container-page: calc(var(--avan-page) + 2 * var(--avan-margin));",
    "--container-measure: var(--avan-measure);",
    "--spacing-margin: var(--avan-margin);",
    "--spacing-gutter: var(--avan-gutter);",
    "--spacing-section: var(--avan-section-pad);",
    "--spacing-nav: var(--avan-nav-h);",
    "--spacing-touch: var(--avan-touch);",
  ]) +
  "\n/* Brand durations as utilities (v4 has no duration namespace). */\n" +
  Object.entries(durations)
    .map(([k, v]) => `@utility duration-${k} {\n  --tw-duration: ${v};\n  transition-duration: ${v};\n}\n`)
    .join("");

/* ---------------------------------------------------------------- TypeScript */
const ms = (v) => Number(String(v).replace("ms", ""));
const ts = `/* GENERATED by scripts/tokens/build.mjs from tokens/**. Do not edit by hand. */

/** Brand palette: exact hex from the brand DTCG file, with its OKLCH equivalent. */
export const palette = ${JSON.stringify(
  Object.fromEntries(Object.entries(palette).map(([k, v]) => [k, { hex: formatHex(v).toUpperCase(), oklch: oklchOf(v) }])),
  null,
  2,
)} as const;

/** Semantic colour roles per scope (resolved values). */
export const roles = ${JSON.stringify(roles, null, 2)} as const;

export type Scope = keyof typeof roles;
export type Role = keyof (typeof roles)["light"];

/** Cubic-bézier curves (Motion/GSAP-ready arrays). */
export const ease = ${JSON.stringify(easings)} as const satisfies Record<string, readonly [number, number, number, number]>;

/** Durations in seconds. */
export const duration = ${JSON.stringify(Object.fromEntries(Object.entries(durations).map(([k, v]) => [k, ms(v) / 1000])))} as const;

export const motion = {
  reveal: { duration: ${ms(motion.reveal.duration) / 1000}, ease: ease.emphasized, distance: ${parseFloat(motion.reveal.distance)} },
  stagger: { interval: ${ms(motion.staggerInterval) / 1000}, cap: ${motion.staggerCap} },
  hover: { duration: ${ms(motion.hoverDuration) / 1000}, lift: ${parseFloat(motion.hoverLift)} },
  press: { duration: ${ms(motion.pressDuration) / 1000}, scale: ${motion.pressScale} },
  goldRule: { duration: ${ms(motion.goldRule.duration) / 1000}, ease: ease.standard },
  overture: { duration: ${ms(motion.overture.duration) / 1000}, ease: ease.emphasized },
  wordmarkSettle: { duration: ${ms(motion.wordmarkSettle.duration) / 1000}, fromTracking: "${motion.wordmarkSettle.fromTracking}", rise: ${parseFloat(motion.wordmarkSettle.rise)} },
  crestReveal: { duration: ${ms(motion.crestReveal.duration) / 1000}, ease: ease.emphasized },
  parallax: ${JSON.stringify(motion.parallax)},
  reduced: { duration: ${ms(motion.reduced.duration) / 1000}, ease: ease.linear },
  sharedElement: { duration: ${ms(motion.pattern.sharedElement.duration) / 1000}, ease: ease.emphasized },
} as const;

/** Type: fixed + fluid scale and the landing's roles. */
export const type = ${JSON.stringify({ scale: textScale, lineHeight: lineHeights, letterSpacing: letterSpacings, roles: typeRoles, families }, null, 2)} as const;

/** Names of every font-size utility — consumed by lib/cn.ts (tailwind-merge). */
export const textSizes = ${JSON.stringify([...Object.keys(textScale), ...Object.keys(typeRoles)])} as const;

export const layout = ${JSON.stringify(layout, null, 2)} as const;

export const focusRing = ${JSON.stringify(focus)} as const;

export const breakpoints = ${JSON.stringify(breakpoints)} as const;
`;

/* ---------------------------------------------------------------- write / check */
const outputs = [
  ["styles/tokens.generated.css", tokensCss],
  ["styles/theme.generated.css", themeCss],
  ["lib/tokens/tokens.generated.ts", ts],
];

let drift = 0;
for (const [rel, content] of outputs) {
  const file = path.join(ROOT, rel);
  if (CHECK) {
    const current = await readFile(file, "utf8").catch(() => "");
    if (current !== content) {
      console.error(`✗ ${rel} is out of date — run npm run tokens:build`);
      drift++;
    } else console.log(`✓ ${rel}`);
  } else {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, content);
    console.log(`wrote ${rel}`);
  }
}
if (drift) process.exit(1);
