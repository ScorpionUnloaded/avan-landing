import { expect, test } from "@playwright/test";
import { ROUTES } from "../routes";

test.describe("routing", () => {
  for (const r of ROUTES) {
    test(`${r.name} renders with the right language`, async ({ page }) => {
      const res = await page.goto(r.path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", r.locale);
      await expect(page.locator("h1").first()).toBeVisible();
    });
  }

  test("literal /en paths redirect to the canonical root", async ({ request }) => {
    const res = await request.get("/en/pfi", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toMatch(/\/pfi$/);
  });

  for (const [path, lang, head] of [
    ["/this-door-does-not-open", "en", "This door doesn't open."],
    ["/fr/cette-porte", "fr", "Cette porte ne s'ouvre pas."],
  ] as const) {
    test(`unknown paths return a real, localized 404 (${lang})`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(404);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator("h1")).toHaveText(head);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    });
  }

  test("the locale switch leads to the other language", async ({ page }) => {
    await page.goto("/");
    await page.locator('a[href="/fr"]:visible').first().click();
    await expect(page).toHaveURL(/\/fr$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  });

  test("no request on the home page fails", async ({ page }) => {
    const failures: string[] = [];
    page.on("response", (r) => r.status() >= 400 && failures.push(`${r.status()} ${r.url()}`));
    await page.goto("/", { waitUntil: "networkidle" });
    expect(failures).toEqual([]);
  });
});
