#!/usr/bin/env node
/**
 * Lighthouse scores (mobile + desktop) for the showcase metrics table.
 *   node scripts/showcase/lighthouse.mjs --base http://localhost:3100 --label before
 */
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .join(" ")
    .split("--")
    .filter(Boolean)
    .map((pair) => pair.trim().split(/\s+/)),
);
const BASE = args.base ?? "http://localhost:3000";
const LABEL = args.label ?? "after";
const PATHS = (args.paths ?? "/,/fr").split(",");

const chrome = await chromeLauncher.launch({
  chromePath: process.env.PW_CHROMIUM ?? "/opt/pw-browsers/chromium",
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
});

const results = [];
for (const formFactor of ["mobile", "desktop"]) {
  for (const p of PATHS) {
    const config =
      formFactor === "desktop"
        ? (await import("lighthouse/core/config/desktop-config.js")).default
        : undefined;
    const run = await lighthouse(
      BASE + p,
      { port: chrome.port, output: "json", logLevel: "error" },
      config,
    );
    const { categories, audits } = run.lhr;
    const row = {
      formFactor,
      path: p,
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories["best-practices"].score * 100),
      seo: Math.round(categories.seo.score * 100),
      lcpMs: Math.round(audits["largest-contentful-paint"].numericValue),
      cls: Number(audits["cumulative-layout-shift"].numericValue.toFixed(3)),
      tbtMs: Math.round(audits["total-blocking-time"].numericValue),
      totalKB: Math.round(audits["total-byte-weight"].numericValue / 1024),
    };
    results.push(row);
    console.log(row);
  }
}
await chrome.kill();
const out = path.resolve("showcase", LABEL);
await mkdir(out, { recursive: true });
await writeFile(path.join(out, "lighthouse.json"), JSON.stringify(results, null, 2));
