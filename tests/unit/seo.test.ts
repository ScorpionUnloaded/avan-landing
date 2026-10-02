import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { GEM_STROKES, GEM_VIEWBOX } from "@/lib/brand/gem";
import { buildMetadata } from "@/lib/i18n/metadata";
import { locales } from "@/lib/i18n/config";
import { routes } from "@/lib/i18n/routes";
import { pageGraph, serializeJsonLd } from "@/lib/seo/jsonld";
import { contentSecurityPolicy, createNonce } from "@/lib/security/csp";
import sitemap from "@/app/sitemap";

describe("the gem", () => {
  it("is exactly the master vector's 29 strokes, in order (never redrawn)", () => {
    const master = readFileSync("tokens/brand/avan-gem-mark.svg", "utf8");
    const strokes = [...master.matchAll(/<line x1="([\d.]+)"\s+y1="([\d.]+)"\s+x2="([\d.]+)"\s+y2="([\d.]+)"/g)].map(
      (m) => m.slice(1, 5).map(Number),
    );
    expect(strokes).toHaveLength(29);
    expect(GEM_STROKES.map((s) => [...s])).toEqual(strokes);
    expect(master).toContain(`viewBox="0 0 ${GEM_VIEWBOX.width} ${GEM_VIEWBOX.height}"`);
  });
});

describe("page metadata", () => {
  it("gives every route a canonical URL and every language version, plus x-default", () => {
    for (const route of routes) {
      for (const locale of locales) {
        const m = buildMetadata({ locale, route: route.key, title: "T", description: "D" });
        const prefix = locale === "en" ? "" : "/fr";
        const expected = route.path === "/" ? prefix || "/" : `${prefix}${route.path}`;
        expect(m.alternates?.canonical).toBe(expected);
        expect(Object.keys(m.alternates?.languages ?? {}).sort()).toEqual(["en", "fr", "x-default"]);
        expect((m.openGraph as { url?: string }).url).toBe(expected);
      }
    }
  });

  it("is indexable outside Vercel previews, and closed on them", () => {
    const previous = process.env.VERCEL_ENV;
    try {
      delete process.env.VERCEL_ENV;
      expect(buildMetadata({ locale: "en", route: "home", title: "T", description: "D" }).robots).toMatchObject({ index: true });
      process.env.VERCEL_ENV = "preview";
      expect(buildMetadata({ locale: "en", route: "home", title: "T", description: "D" }).robots).toMatchObject({ index: false });
    } finally {
      if (previous === undefined) delete process.env.VERCEL_ENV;
      else process.env.VERCEL_ENV = previous;
    }
  });
});

describe("structured data", () => {
  it("links the organization, site and page, with breadcrumbs below the home page", () => {
    const home = pageGraph({ locale: "en", route: "home", name: "Home" })["@graph"];
    expect(home.map((n) => n["@type"])).toEqual(["Organization", "WebSite", "WebPage"]);
    const pfi = pageGraph({ locale: "fr", route: "pfi", name: "PFI" })["@graph"];
    expect(pfi.map((n) => n["@type"])).toEqual(["Organization", "WebSite", "WebPage", "BreadcrumbList"]);
    expect(pfi[2]).toMatchObject({ inLanguage: "fr" });
    expect(String(pfi[2].url)).toMatch(/\/fr\/pfi$/);
  });

  it("cannot break out of its script element", () => {
    expect(serializeJsonLd({ x: "</script><script>alert(1)</script>" })).not.toContain("<");
  });
});

describe("content security policy", () => {
  it("allows scripts only by nonce, and forbids plugins, base rewriting and framing", () => {
    const nonce = createNonce();
    const csp = contentSecurityPolicy(nonce);
    expect(csp).toContain(`script-src 'nonce-${nonce}' 'strict-dynamic'`);
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(contentSecurityPolicy(nonce, { dev: true })).toContain("'unsafe-eval'");
  });

  it("issues a fresh, unguessable nonce per response", () => {
    const nonces = new Set(Array.from({ length: 200 }, createNonce));
    expect(nonces.size).toBe(200);
    for (const n of nonces) expect(atob(n)).toHaveLength(16);
  });
});

describe("sitemap", () => {
  it("lists every route in every locale with fixed dates and alternates", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(routes.length * locales.length);
    for (const e of entries) {
      expect(e.lastModified).toBeInstanceOf(Date);
      expect(Object.keys(e.alternates?.languages ?? {})).toContain("x-default");
    }
  });
});
