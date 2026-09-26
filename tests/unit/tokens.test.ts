import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { wcagContrast } from "culori";
import { describe, expect, it } from "vitest";
import { palette, roles, type Scope } from "@/lib/tokens";

const brand = JSON.parse(readFileSync("tokens/brand/avan-color-tokens.json", "utf8"));

/** Composite a translucent colour over its surface so contrast is measured as seen. */
function flatten(fg: string, bg: string): string {
  const m = fg.match(/rgba?\(([^)]+)\)/);
  if (!m) return fg;
  const [r, g, b, a = "1"] = m[1].split(",").map((x) => x.trim());
  const alpha = Number(a);
  const hex = bg.replace("#", "");
  const [br, bgc, bb] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const mix = (f: string, c: number) => Math.round(Number(f) * alpha + c * (1 - alpha));
  return `rgb(${mix(r, br)}, ${mix(g, bgc)}, ${mix(b, bb)})`;
}
const ratio = (fg: string, bg: string) => wcagContrast(flatten(fg, bg), bg);

describe("brand anchors", () => {
  it("keeps every documented brand hex exactly (no drift from the DTCG source)", () => {
    for (const ramp of ["ink", "bronze", "verdant", "amber", "oxblood", "azure", "neutral"]) {
      for (const [step, t] of Object.entries(brand.color[ramp] as Record<string, { $value: string }>)) {
        expect(palette[`${ramp}-${step}` as keyof typeof palette].hex, `${ramp}.${step}`).toBe(t.$value.toUpperCase());
      }
    }
    expect(palette["ink-900"].hex).toBe("#141E2D");
    expect(palette["ink-950"].hex).toBe("#0E1722");
    expect(palette["bronze-400"].hex).toBe("#C5A572");
    expect(palette.cream.hex).toBe("#F4F1EA");
  });
});

describe("contrast in every scope (WCAG 2.2 AA; A2.1: any cell below AA fails the build)", () => {
  const scopes = Object.keys(roles) as Scope[];
  for (const scope of scopes) {
    const r = roles[scope];
    describe(scope, () => {
      for (const surface of ["surface-canvas", "surface-raised"] as const) {
        it(`text on ${surface}`, () => {
          expect(ratio(r.fg, r[surface])).toBeGreaterThanOrEqual(7); // AAA, the house preference
          expect(ratio(r["fg-muted"], r[surface])).toBeGreaterThanOrEqual(4.5);
          expect(ratio(r["fg-eyebrow"], r[surface])).toBeGreaterThanOrEqual(4.5);
          expect(ratio(r["state-error"], r[surface])).toBeGreaterThanOrEqual(4.5);
          expect(ratio(r["fg-gilt"], r[surface])).toBeGreaterThanOrEqual(3); // display sizes only
        });
        it(`focus ring and control boundaries on ${surface}`, () => {
          expect(ratio(r["focus-ring"], r[surface])).toBeGreaterThanOrEqual(3);
          expect(ratio(r["border-strong"], r[surface])).toBeGreaterThanOrEqual(3);
        });
      }
      it("primary action label on its fill", () => {
        expect(ratio(r["action-fg"], r["action-bg"])).toBeGreaterThanOrEqual(4.5);
        expect(ratio(r["action-fg"], r["action-bg-hover"])).toBeGreaterThanOrEqual(4.5);
      });
    });
  }
});

/** Recursively list source files under a directory. */
function files(dir: string, ext: RegExp): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    return statSync(p).isDirectory() ? files(p, ext) : ext.test(p) ? [p] : [];
  });
}

describe("token hygiene (audit spec D1 invariants)", () => {
  const sources = [...files("components", /\.tsx?$/), ...files("sections", /\.tsx?$/)];

  it("uses no raw colour values in components or sections", () => {
    const offenders = sources.flatMap((f) =>
      readFileSync(f, "utf8")
        .split("\n")
        .map((line, i) => ({ line, i }))
        .filter(({ line }) => /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?!["\w-])|rgba?\(|hsla?\(|oklch\(/.test(line))
        .filter(({ line }) => !/href=|hash|#main/.test(line))
        .map(({ i, line }) => `${f}:${i + 1}: ${line.trim()}`),
    );
    expect(offenders).toEqual([]);
  });

  it("never animates layout or paint properties, and never `transition-all`", () => {
    const bad = /transition-all|transition-\[[^\]]*(width|height|top|left|right|bottom|margin|padding|box-shadow)/;
    const offenders = sources.filter((f) => bad.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });

  it("keeps radii within the brand's 0–2px (circles excepted)", () => {
    const bad = /\brounded-(md|lg|xl|2xl|3xl|\[)/;
    expect(sources.filter((f) => bad.test(readFileSync(f, "utf8")))).toEqual([]);
  });

  it("never loads Inter", () => {
    const layout = readFileSync("app/[locale]/layout.tsx", "utf8");
    expect(layout).not.toMatch(/\bInter\b/);
  });
});
