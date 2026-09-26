#!/usr/bin/env node
/**
 * Pixel-diff two capture runs (same viewport/route/shot names). Prints the share
 * of pixels that differ noticeably per shot — used to prove "no visual change"
 * phases really are invisible.
 *   node scripts/showcase/diff.mjs showcase/before showcase/.raw/phase1
 */
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const [a, b] = process.argv.slice(2);
const THRESHOLD = 24; // per-channel delta that counts as "changed"

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith(".webp")) out.push(p);
  }
  return out;
}

for (const fa of await walk(a)) {
  const rel = path.relative(a, fa);
  const fb = path.join(b, rel);
  try {
    const ia = sharp(fa);
    const { width, height } = await ia.metadata();
    const [ra, rb] = await Promise.all([
      ia.removeAlpha().raw().toBuffer(),
      sharp(fb).resize(width, height, { fit: "fill" }).removeAlpha().raw().toBuffer(),
    ]);
    let changed = 0;
    for (let i = 0; i < ra.length; i += 3) {
      if (
        Math.abs(ra[i] - rb[i]) > THRESHOLD ||
        Math.abs(ra[i + 1] - rb[i + 1]) > THRESHOLD ||
        Math.abs(ra[i + 2] - rb[i + 2]) > THRESHOLD
      )
        changed++;
    }
    const pct = (100 * changed) / (ra.length / 3);
    console.log(`${pct.toFixed(2).padStart(6)}%  ${rel}`);
  } catch {
    console.log(`   n/a  ${rel}`);
  }
}
