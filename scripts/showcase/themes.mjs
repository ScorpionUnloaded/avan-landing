#!/usr/bin/env node
/**
 * Quick theme sweep: first screen + full page of a few routes in light and dark
 * (prefers-color-scheme emulation). Output: showcase/.raw/themes/<scheme>/<route>.webp
 *   node scripts/showcase/themes.mjs --base http://localhost:3000
 */
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const base = process.argv.includes("--base") ? process.argv[process.argv.indexOf("--base") + 1] : "http://localhost:3000";
const routes = [["home", "/"], ["legal", "/legal"], ["pfi", "/pfi"]];
const browser = await chromium.launch();
for (const scheme of ["light", "dark"]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, reducedMotion: "reduce" });
  for (const [key, path] of routes) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);
    const dir = `showcase/.raw/themes/${scheme}`;
    await mkdir(dir, { recursive: true });
    await sharp(await page.screenshot()).webp({ quality: 80 }).toFile(`${dir}/${key}-first.webp`);
    const full = await page.screenshot({ fullPage: true });
    const img = sharp(full); const { height } = await img.metadata();
    await img.resize({ width: 720, height: Math.min(16000, Math.round(height / 2)), fit: "fill" }).webp({ quality: 70 }).toFile(`${dir}/${key}-full.webp`);
  }
  await page.close();
}
await browser.close();
console.log("done");
