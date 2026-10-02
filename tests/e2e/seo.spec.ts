import { expect, test } from "@playwright/test";
import { ROUTES } from "../routes";

test.describe("metadata", () => {
  for (const r of ROUTES) {
    test(`${r.name} has a canonical URL, language alternates and a social card`, async ({ page, request }) => {
      await page.goto(r.path);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical, "canonical").toBeTruthy();
      expect(new URL(canonical!).pathname).toBe(r.path);
      for (const lang of ["en", "fr", "x-default"]) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveCount(1);
      }
      const title = await page.title();
      expect(title.length).toBeGreaterThan(8);
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThan(40);

      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
      expect(new URL(ogUrl!).pathname).toBe(r.path);
      await expect(page.locator('meta[property="og:image:alt"]')).toHaveCount(1);
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
      // Served where it is linked: a crawler gets the PNG in one request, no redirect.
      const img = await request.get(new URL(ogImage!).pathname + new URL(ogImage!).search, { maxRedirects: 0 });
      expect(img.status()).toBe(200);
      expect(img.headers()["content-type"]).toBe("image/png");
    });

    test(`${r.name} describes itself in structured data`, async ({ page }) => {
      await page.goto(r.path);
      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(blocks).toHaveLength(1);
      const graph = JSON.parse(blocks[0])["@graph"] as { "@type": string; inLanguage?: string }[];
      const types = graph.map((n) => n["@type"]);
      expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite", "WebPage"]));
      expect(graph.find((n) => n["@type"] === "WebPage")?.inLanguage).toBe(r.locale);
      if (r.path !== "/" && r.path !== "/fr") expect(types).toContain("BreadcrumbList");
    });
  }

  test("robots.txt, the sitemap and the manifest are served", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("Sitemap:");
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    expect(xml).toContain("<urlset");
    expect((xml.match(/<url>/g) ?? []).length).toBe(ROUTES.length);
    const manifest = await request.get("/manifest.webmanifest");
    expect(manifest.status()).toBe(200);
    const json = await manifest.json();
    expect(json.icons.map((i: { purpose: string }) => i.purpose)).toContain("maskable");
    for (const icon of json.icons as { src: string }[]) {
      expect((await request.get(icon.src)).status(), icon.src).toBe(200);
    }
  });

  test("the icon set is linked and served", async ({ page, request }) => {
    await page.goto("/");
    for (const sel of ['link[rel="icon"][type="image/svg+xml"]', 'link[rel="icon"][type="image/x-icon"]', 'link[rel="apple-touch-icon"]']) {
      const href = await page.locator(sel).getAttribute("href");
      expect((await request.get(href!)).status(), sel).toBe(200);
    }
  });
});
