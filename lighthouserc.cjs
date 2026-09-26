/**
 * Lighthouse CI — mobile (default form factor) against a production build.
 * Targets from the plan: ≥ 95 in every category, LCP < 2.5 s, CLS < 0.05.
 * Assertions warn until STRICT_BUDGETS is set, then they fail the build.
 */
const level = process.env.STRICT_BUDGETS ? "error" : "warn";
const port = 3100;

module.exports = {
  ci: {
    collect: {
      startServerCommand: `npm run start -- -p ${port}`,
      startServerReadyPattern: "Ready",
      url: [`http://localhost:${port}/`, `http://localhost:${port}/fr`],
      numberOfRuns: 1,
      chromePath: process.env.CHROME_PATH,
      settings: { chromeFlags: "--no-sandbox --headless=new" },
    },
    assert: {
      assertions: {
        "categories:performance": [level, { minScore: 0.95 }],
        "categories:accessibility": [level, { minScore: 0.95 }],
        "categories:best-practices": [level, { minScore: 0.95 }],
        "categories:seo": [level, { minScore: 0.95 }],
        "largest-contentful-paint": [level, { maxNumericValue: 2500 }],
        "cumulative-layout-shift": [level, { maxNumericValue: 0.05 }],
      },
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci" },
  },
};
