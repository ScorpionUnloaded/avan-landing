// Asset pipeline: regenerate the editorial stills from the original ChatGPT PNGs
// at FULL native resolution (no downscale) — next/image generates the responsive
// srcset variants at request time, so we keep the largest source available.
// Run with: node scripts/optimize-assets.mjs   (requires `sharp`, a real dependency)
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "imgs");
const DOWNLOADS = "C:/Users/TK/Downloads";

const jobs = [
  { src: "ChatGPT Image Jul 1, 2026, 11_50_12 PM.png", out: "ledger.jpg" },
  { src: "ChatGPT Image Jul 1, 2026, 11_51_30 PM.png", out: "facade.jpg" },
  { src: "ChatGPT Image Jul 1, 2026, 11_52_46 PM.png", out: "seal.jpg" },
  { src: "ChatGPT Image Jul 1, 2026, 11_54_36 PM.png", out: "library.jpg" },
  { src: "ChatGPT Image Jul 1, 2026, 11_57_01 PM.png", out: "bronze.jpg" },
];

for (const job of jobs) {
  const srcPath = path.join(DOWNLOADS, job.src);
  const outPath = path.join(OUT, job.out);
  const info = await sharp(srcPath).jpeg({ quality: 85, mozjpeg: true }).toFile(outPath);
  console.log(`${job.out}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`);
}
