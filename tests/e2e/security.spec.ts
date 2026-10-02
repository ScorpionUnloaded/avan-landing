import { expect, test } from "@playwright/test";
import { ROUTES } from "../routes";

test.describe("security headers", () => {
  test("every document carries the hardening headers", async ({ request }) => {
    const res = await request.get("/");
    const h = res.headers();
    expect(h["strict-transport-security"]).toContain("max-age=63072000");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["cross-origin-opener-policy"]).toBe("same-origin");
    expect(h["permissions-policy"]).toContain("camera=()");
    expect(h["x-powered-by"]).toBeUndefined();
  });

  test("the CSP nonce is fresh on every response and stamped on the page's scripts", async ({ request }) => {
    const nonceOf = (csp: string) => csp.match(/'nonce-([^']+)'/)?.[1];
    const a = await request.get("/");
    const b = await request.get("/");
    const na = nonceOf(a.headers()["content-security-policy"] ?? "");
    const nb = nonceOf(b.headers()["content-security-policy"] ?? "");
    expect(na).toBeTruthy();
    expect(na).not.toBe(nb);
    const html = await a.text();
    // Every executable script — Next's and the theme script — carries the nonce.
    const scripts = [...html.matchAll(/<script\b(?![^>]*type="application\/ld\+json")[^>]*>/g)].map((m) => m[0]);
    expect(scripts.length).toBeGreaterThan(2);
    for (const tag of scripts) expect(tag, tag).toContain(`nonce="${na}"`);
  });
});

test.describe("content security policy in the browser", () => {
  for (const r of ROUTES) {
    test(`${r.name} runs with zero CSP violations`, async ({ page }) => {
      await page.addInitScript(() => {
        (window as unknown as { __csp: string[] }).__csp = [];
        document.addEventListener("securitypolicyviolation", (e) =>
          (window as unknown as { __csp: string[] }).__csp.push(`${e.effectiveDirective} ${e.blockedURI}`),
        );
      });
      await page.goto(r.path, { waitUntil: "networkidle" });
      // Hydration happened: the theme toggle is interactive.
      await page.locator("header button[aria-label]").filter({ visible: true }).first().click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", /light|dark/);
      expect(await page.evaluate(() => (window as unknown as { __csp: string[] }).__csp)).toEqual([]);
    });
  }
});
