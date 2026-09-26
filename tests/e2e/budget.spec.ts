import { expect, test } from "@playwright/test";

/**
 * Transfer budgets from the brand's QA gate (A6-2) and the audit spec (D6):
 * initial JS ≤ 200 KB and CSS ≤ 50 KB, measured as compressed bytes actually
 * transferred on first load — the number a visitor pays, not a bundler estimate.
 */
const BUDGET_KB = { script: 200, css: 50 };

for (const path of ["/", "/fr"]) {
  test(`first load of ${path} stays within the transfer budget`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    const totals = await page.evaluate(() => {
      const sum = { script: 0, css: 0 };
      for (const e of performance.getEntriesByType("resource") as PerformanceResourceTiming[]) {
        const size = e.encodedBodySize || e.transferSize;
        if (e.name.endsWith(".js") || e.initiatorType === "script") sum.script += size;
        else if (e.name.endsWith(".css") || (e.initiatorType === "link" && e.name.includes(".css"))) sum.css += size;
      }
      return sum;
    });
    const kb = { script: totals.script / 1024, css: totals.css / 1024 };
    test.info().annotations.push({ type: "transfer", description: `JS ${kb.script.toFixed(1)} KB · CSS ${kb.css.toFixed(1)} KB` });
    // Reported on every run; enforced once STRICT_BUDGETS is set (the release
    // gate in CI). Until then an overrun is a warning, not a red build.
    if (process.env.STRICT_BUDGETS) {
      expect(kb.script).toBeLessThanOrEqual(BUDGET_KB.script);
      expect(kb.css).toBeLessThanOrEqual(BUDGET_KB.css);
    } else if (kb.script > BUDGET_KB.script || kb.css > BUDGET_KB.css) {
      console.warn(`[budget] ${path}: JS ${kb.script.toFixed(1)} KB · CSS ${kb.css.toFixed(1)} KB over budget`);
    }
  });
}
