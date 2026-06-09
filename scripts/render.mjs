#!/usr/bin/env node
/**
 * Render a carousel deck (HTML with .slide sections) to PNG slides and,
 * optionally, a single PDF (the format LinkedIn document posts require).
 *
 * Usage:
 *   node render.mjs deck.html [--out out/] [--pdf] [--scale 2]
 *
 * Output:
 *   out/slide-01.png … slide-NN.png   (scale× resolution, default 2×)
 *   out/carousel.pdf                  (with --pdf; one page per slide, real text)
 *
 * Requires Playwright with Chromium:
 *   npm i playwright && npx playwright install chromium
 */

import { mkdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const args = process.argv.slice(2);
const htmlFile = args.find((a) => !a.startsWith("--"));
const outDir = args.includes("--out") ? args[args.indexOf("--out") + 1] : "out";
const wantPdf = args.includes("--pdf");
const scale = args.includes("--scale")
  ? Number(args[args.indexOf("--scale") + 1]) || 2
  : 2;

if (!htmlFile) {
  console.error("Usage: node render.mjs <deck.html> [--out dir] [--pdf] [--scale 2]");
  process.exit(1);
}
const htmlPath = resolve(htmlFile);
if (!existsSync(htmlPath)) {
  console.error(`File not found: ${htmlPath}`);
  process.exit(1);
}

// look for playwright next to this script, then in the directory the user ran
// the command from (where `npm i playwright` typically put it)
async function loadChromium() {
  const cwdRequire = createRequire(join(process.cwd(), "package.json"));
  const pick = (mod) => mod.chromium ?? mod.default?.chromium ?? null;
  for (const pkg of ["playwright", "playwright-core"]) {
    try {
      const c = pick(await import(pkg));
      if (c) return c;
    } catch {}
    try {
      const resolved = pathToFileURL(cwdRequire.resolve(pkg)).href;
      const c = pick(await import(resolved));
      if (c) return c;
    } catch {}
  }
  return null;
}

const chromium = await loadChromium();
if (!chromium) {
  console.error(
    [
      "Playwright is not installed. Fix with:",
      "",
      "  npm i playwright && npx playwright install chromium",
      "",
      "No Node access? Open the deck in any browser and use the print dialog —",
      "the built-in print CSS produces a correct one-slide-per-page PDF.",
    ].join("\n")
  );
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ deviceScaleFactor: scale });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
  // make sure webfonts are painted before screenshotting
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);

  const slides = page.locator(".slide");
  const count = await slides.count();
  if (count === 0) {
    console.error('No elements with class "slide" found in the deck.');
    process.exit(1);
  }

  const box = await slides.first().boundingBox();
  console.log(
    `Rendering ${count} slides at ${box.width}x${box.height} (${scale}x = ${box.width * scale}x${box.height * scale}px)`
  );

  for (let i = 0; i < count; i++) {
    const file = join(outDir, `slide-${String(i + 1).padStart(2, "0")}.png`);
    await slides.nth(i).screenshot({ path: file });
    console.log(`  ✓ ${file}`);
  }

  if (wantPdf) {
    // page.pdf uses print media, where the deck's @media print rules put
    // exactly one slide per page with no gaps or preview background
    const pdfPath = join(outDir, "carousel.pdf");
    await page.pdf({
      path: pdfPath,
      width: `${box.width}px`,
      height: `${box.height}px`,
      printBackground: true,
      pageRanges: `1-${count}`,
    });
    console.log(`  ✓ ${pdfPath} (upload this for LinkedIn document posts)`);
  }

  console.log("Done.");
} finally {
  await browser.close();
}
