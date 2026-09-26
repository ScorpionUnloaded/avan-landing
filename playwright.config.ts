import { defineConfig, devices } from "@playwright/test";

/**
 * E2E + accessibility + budgets run against a production build (`next start`).
 * Locally the preinstalled Chromium is used (PLAYWRIGHT_BROWSERS_PATH); CI runs
 * inside mcr.microsoft.com/playwright:v1.56.1-noble, which also ships Firefox
 * and WebKit.
 */
const PORT = Number(process.env.PORT ?? 3000);
const baseURL = process.env.BASE_URL ?? `http://localhost:${PORT}`;
const ci = !!process.env.CI;

export default defineConfig({
  testDir: "tests",
  testMatch: ["e2e/**/*.spec.ts", "a11y/**/*.spec.ts"],
  fullyParallel: true,
  forbidOnly: ci,
  retries: ci ? 1 : 0,
  reporter: ci ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    ...(ci
      ? [
          { name: "firefox", use: { ...devices["Desktop Firefox"] } },
          { name: "webkit", use: { ...devices["Desktop Safari"] } },
          { name: "mobile-safari", use: { ...devices["iPhone 15"] } },
        ]
      : []),
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npm run start -- -p ${PORT}`,
        url: baseURL,
        reuseExistingServer: !ci,
        timeout: 120_000,
      },
});
