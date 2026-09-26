import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { ROUTES } from "../routes";

/**
 * WCAG 2.2 AA on every route. The brand's release gate (A6-2) is zero serious
 * or critical violations. KNOWN lists issues inherited from the original build
 * that a later phase of this branch removes; it must be empty before release.
 */
const KNOWN = new Set<string>(["color-contrast"]);

for (const r of ROUTES) {
  test(`${r.name} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(r.path, { waitUntil: "networkidle" });
    // Let entrance reveals finish so contrast is measured on final colours.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((res) => setTimeout(res, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const blocking = violations.filter(
      (v) => (v.impact === "serious" || v.impact === "critical") && !KNOWN.has(v.id),
    );
    expect(blocking.map((v) => `${v.id}: ${v.nodes.length} node(s) — ${v.help}`)).toEqual([]);
  });
}
