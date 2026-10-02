#!/usr/bin/env node
/**
 * App icons from the master gem (tokens/brand/avan-gem-mark.svg) and the brand
 * palette (tokens/brand/avan-color-tokens.json): Sovereign Bronze on Ink Navy.
 * Geometry is never redrawn; only the stroke weight is set per output size, so
 * the mark keeps the same optical weight from a 16px tab to a 512px home screen.
 *
 *   node scripts/icons/build.mjs
 *
 * Writes app/icon.svg, app/apple-icon.png, app/favicon.ico and
 * public/icons/{icon-192,icon-512,maskable-512}.png. Outputs are committed.
 */
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const colors = JSON.parse(await readFile(new URL("tokens/brand/avan-color-tokens.json", root), "utf8"));
const NAVY = colors.color.ink["900"].$value;
const GILT = colors.color.bronze["400"].$value;

const master = await readFile(new URL("tokens/brand/avan-gem-mark.svg", root), "utf8");
const lines = [...master.matchAll(/<line\b[^>]*\/>/g)].map((m) => m[0]);
if (lines.length !== 29) throw new Error(`Expected the gem's 29 strokes, found ${lines.length}`);
const [, vbW, vbH] = master.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/).map(Number);

/**
 * A square tile with the gem centred.
 * @param size     output edge in px
 * @param height   gem height as a share of the tile (maskable icons keep to the 80% safe zone)
 * @param strokePx stroke weight in output pixels
 */
function tile(size, { height, strokePx }) {
  const scale = (size * height) / vbH;
  const x = (size - vbW * scale) / 2;
  const y = (size - vbH * scale) / 2;
  const stroke = (strokePx / scale).toFixed(1);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="${NAVY}"/>
  <g transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(5)})" fill="none" stroke="${GILT}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    ${lines.map((l) => l.replace(/\s+/g, " ")).join("\n    ")}
  </g>
</svg>
`;
}

const png = (svg) => sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

/** ICO container holding PNG images (supported by every current browser). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + 16 * images.length;
  for (const { size, data } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

await mkdir(new URL("public/icons/", root), { recursive: true });

const outputs = {
  "app/icon.svg": Buffer.from(tile(64, { height: 0.8, strokePx: 2.4 })),
  "app/apple-icon.png": await png(tile(180, { height: 0.66, strokePx: 3.2 })),
  "public/icons/icon-192.png": await png(tile(192, { height: 0.7, strokePx: 3.4 })),
  "public/icons/icon-512.png": await png(tile(512, { height: 0.7, strokePx: 7 })),
  // Maskable: platforms crop to a circle or squircle; keep the gem inside the 80% safe zone.
  "public/icons/maskable-512.png": await png(tile(512, { height: 0.56, strokePx: 6 })),
  "app/favicon.ico": ico(
    await Promise.all(
      [
        [16, 1.3],
        [32, 1.9],
        [48, 2.3],
      ].map(async ([size, strokePx]) => ({ size, data: await png(tile(size, { height: 0.86, strokePx })) })),
    ),
  ),
};

for (const [file, data] of Object.entries(outputs)) {
  await writeFile(new URL(file, root), data);
  console.log(`✓ ${file} (${(data.length / 1024).toFixed(1)} KB)`);
}
