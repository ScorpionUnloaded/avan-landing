import { expect, test } from "@playwright/test";
import { ROUTES } from "../routes";

test.describe("metadata", () => {
  for (const r of ROUTES) {
    test(`${r.name} has a canonical URL and language alternates`, async ({ page }) => {
      await page.goto(r.path);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical, "canonical").toBeTruthy();
      expect(new URL(canonical!).pathname).toBe(r.path);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
      await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveCount(1);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(8);
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThan(40);
    });
  }

  test("robots.txt and sitemap.xml are served", async ({ request }) => {
    expect((await request.get("/robots.txt")).status()).toBe(200);
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("<urlset");
  });
});
