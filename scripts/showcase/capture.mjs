#!/usr/bin/env node
/**
 * Showcase capture harness — identical for the "before" and "after" runs so the
 * pairs are honest. For every route × viewport it saves a full-page shot, one shot
 * per landmark (header, each main>section[id], footer), and records 4xx/5xx
 * responses, console errors and axe violations.
 *
 *   node scripts/showcase/capture.mjs --base http://localhost:3100 --label before
 *   node scripts/showcase/capture.mjs --base http://localhost:3000 --label after --routes after
 *
 * Output: showcase/<label>/<viewport>/<route>/<shot>.webp + showcase/<label>/report.json
 */
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { AFTER_ROUTES, BEFORE_ROUTES, VIEWPORTS } from "./routes.mjs";

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
const ROUTES = args.routes === "after" ? AFTER_ROUTES : BEFORE_ROUTES;
const OUT = path.resolve("showcase", LABEL);
const WEBP_MAX = 16_000; // WebP's hard limit is 16383px per side.

const executablePath = process.env.PW_CHROMIUM ?? "/opt/pw-browsers/chromium";

async function saveWebp(buffer, file) {
  await mkdir(path.dirname(file), { recursive: true });
  const img = sharp(buffer);
  const { width = 0, height = 0 } = await img.metadata();
  const scale = Math.min(1, WEBP_MAX / Math.max(width, height));
  const pipeline = scale < 1 ? img.resize(Math.floor(width * scale)) : img;
  await pipeline.webp({ quality: 85 }).toFile(file);
}

/** Scroll the whole page in viewport steps so every in-view reveal fires. */
async function settle(page) {
  // Programmatic scrolls must be instant or shots land mid-animation.
  await page.addStyleTag({ content: "html,body{scroll-behavior:auto!important}" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const step = Math.max(200, Math.floor(window.innerHeight * 0.6));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
    // Freeze footage on a representative frame so shots are comparable.
    for (const v of document.querySelectorAll("video")) {
      try {
        v.pause();
        if (v.readyState > 0) v.currentTime = Math.min(2, v.duration || 2);
      } catch {}
    }
  });
  await page.waitForTimeout(500);
}

async function captureRoute(context, route, vp, report) {
  const page = await context.newPage();
  const failures = [];
  const consoleErrors = [];
  page.on("response", (res) => {
    if (res.status() >= 400 && !res.url().endsWith(route.path)) {
      failures.push({ status: res.status(), url: res.url().replace(BASE, "") });
    }
  });
  page.on("console", (msg) => msg.type() === "error" && consoleErrors.push(msg.text()));

  const res = await page.goto(BASE + route.path, { waitUntil: "load" });
  await page.waitForLoadState("networkidle").catch(() => {});
  await settle(page);

  const dir = path.join(OUT, vp.key, route.key);
  await saveWebp(await page.screenshot({ fullPage: true, animations: "disabled" }), path.join(dir, "00-full.webp"));

  // Landmark shots. The fixed header is hidden while shooting sections so it never
  // overlaps them, then shot on its own at the top of the page.
  const landmarks = await page.$$eval("main > section[id], main section[id], footer", (els) =>
    [...new Set(els)].map((el, i) => ({
      i,
      id: el.id || el.tagName.toLowerCase(),
    })),
  );
  await page.addStyleTag({ content: "header{visibility:hidden!important}" });
  const handles = await page.$$("main > section[id], main section[id], footer");
  const seen = new Set();
  for (let i = 0; i < handles.length; i++) {
    const id = landmarks[i]?.id ?? `block-${i}`;
    if (seen.has(id)) continue;
    seen.add(id);
    try {
      await handles[i].scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      const shot = await handles[i].screenshot({ animations: "disabled" });
      await saveWebp(shot, path.join(dir, `${String(i + 1).padStart(2, "0")}-${id}.webp`));
    } catch (err) {
      report.warnings.push(`${vp.key}/${route.key}/${id}: ${err.message.split("\n")[0]}`);
    }
  }
  await page.evaluate(() => {
    document.querySelectorAll("style").forEach((s) => {
      if (s.textContent?.includes("header{visibility:hidden")) s.remove();
    });
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
  const header = await page.$("header");
  if (header) {
    await saveWebp(
      await page.screenshot({ clip: { x: 0, y: 0, width: vp.viewport.width, height: vp.viewport.height } }),
      path.join(dir, "00-first-screen.webp"),
    );
  }

  let axe = null;
  if (vp.key === "desktop" || vp.key === "mobile") {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    axe = results.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }));
  }

  report.pages.push({
    viewport: vp.key,
    route: route.key,
    path: route.path,
    status: res?.status() ?? null,
    failedRequests: failures,
    consoleErrors,
    axe,
  });
  await page.close();
}

async function captureFormStates(context, vp, report) {
  // Home-page form: empty-submit error state + intercepted success state.
  const page = await context.newPage();
  await page.route("**/api/inquiry", (r) =>
    r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }),
  );
  await page.goto(BASE + "/", { waitUntil: "load" });
  await settle(page);
  const form = page.locator("form").first();
  if ((await form.count()) === 0) return page.close();
  await form.scrollIntoViewIfNeeded();
  await page.addStyleTag({ content: "header{visibility:hidden!important}" });
  // Resolve the section once: the success state replaces the form, so a
  // `:has(form)` locator would stop matching after submit.
  const section = await page.locator("section:has(form)").first().elementHandle();
  const dir = path.join(OUT, vp.key, "form");
  try {
    await form.locator('[type="submit"]').first().click();
    await page.waitForTimeout(400);
    await saveWebp(await section.screenshot({ animations: "disabled" }), path.join(dir, "01-error.webp"));
    await form.locator('input[name="name"]').fill("Hélène Marchand");
    await form.locator('input[name="email"]').fill("helene@example.com");
    await form.locator('[type="submit"]').first().click();
    await page.waitForTimeout(900);
    await saveWebp(await section.screenshot({ animations: "disabled" }), path.join(dir, "02-success.webp"));
  } catch (err) {
    report.warnings.push(`${vp.key}/form: ${err.message.split("\n")[0]}`);
  }
  await page.close();
}

const browser = await chromium.launch({ executablePath });
const report = { label: LABEL, base: BASE, capturedAt: new Date().toISOString(), pages: [], warnings: [] };
for (const vp of VIEWPORTS) {
  const { key, ...contextOptions } = vp;
  const context = await browser.newContext({ ...contextOptions, reducedMotion: "no-preference" });
  for (const route of ROUTES) {
    process.stdout.write(`${key} ${route.path} … `);
    await captureRoute(context, route, vp, report);
    process.stdout.write("done\n");
  }
  if (args.form !== "skip") await captureFormStates(context, vp, report);
  await context.close();
}
await browser.close();
await mkdir(OUT, { recursive: true });
await writeFile(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
console.log(`\nSaved ${report.pages.length} page captures to ${path.relative(process.cwd(), OUT)}`);
if (report.warnings.length) console.log("Warnings:\n  " + report.warnings.join("\n  "));
