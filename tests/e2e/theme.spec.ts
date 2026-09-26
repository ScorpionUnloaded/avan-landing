import { expect, test } from "@playwright/test";

test.describe("theme", () => {
  test("follows the system preference when no choice is stored", async ({ browser }) => {
    const page = await browser.newPage({ colorScheme: "dark" });
    await page.goto("/");
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe("rgb(14, 23, 34)"); // semantic.dark.surface-base
    await page.close();
  });

  test("the toggle cycles system → light → dark and persists without a flash", async ({ page }) => {
    await page.goto("/legal");
    const toggle = page.locator("header button[aria-label]").filter({ visible: true }).first();
    await toggle.click(); // → light
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await toggle.click(); // → dark
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    // Applied by the head script before paint, not after hydration.
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await toggle.click(); // → system
    await expect(page.locator("html")).not.toHaveAttribute("data-theme", /.+/);
  });

  test("navy sections re-scope their colours", async ({ page }) => {
    await page.goto("/");
    const heroText = await page.locator("#hero h1").evaluate((el) => getComputedStyle(el).color);
    expect(heroText).toBe("rgb(244, 241, 234)"); // cream on ink
  });
});
