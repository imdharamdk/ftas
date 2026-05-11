import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { chromium } from "playwright";

const baseUrl = process.env.FTAS_URL ?? "http://127.0.0.1:3000";
const outputDir = "verification";

const viewports = [
  { name: "desktop", width: 1440, height: 1000, isMobile: false },
  { name: "mobile", width: 390, height: 844, isMobile: true },
];

await mkdir(outputDir, { recursive: true });

const browserPath =
  process.env.PLAYWRIGHT_CHROMIUM_PATH ??
  (existsSync("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe")
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : existsSync("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe")
      ? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
      : undefined);

const browser = await chromium.launch(browserPath ? { executablePath: browserPath } : {});
const results = [];

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.isMobile,
    deviceScaleFactor: viewport.isMobile ? 2 : 1,
  });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);

  const screenshotPath = `${outputDir}/ftas-${viewport.name}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: false });

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= pageHeight; y += Math.floor(viewport.height * 0.72)) {
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
    await page.waitForTimeout(90);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);

  const layout = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    title: document.title,
  }));

  const canvas = await page.evaluate(() => {
    const element = document.querySelector("canvas");

    if (!(element instanceof HTMLCanvasElement)) {
      return { found: false, nonBlankSamples: 0, samples: 0 };
    }

    const gl = element.getContext("webgl2") ?? element.getContext("webgl");

    if (!gl) {
      return { found: true, nonBlankSamples: 0, samples: 0 };
    }

    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    const xs = [0.25, 0.38, 0.5, 0.62, 0.75];
    const ys = [0.25, 0.38, 0.5, 0.62, 0.75];
    let nonBlankSamples = 0;
    let samples = 0;

    for (const x of xs) {
      for (const y of ys) {
        const pixel = new Uint8Array(4);
        gl.readPixels(
          Math.max(0, Math.min(width - 1, Math.floor(width * x))),
          Math.max(0, Math.min(height - 1, Math.floor(height * y))),
          1,
          1,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          pixel,
        );
        samples += 1;
        if (pixel[0] + pixel[1] + pixel[2] + pixel[3] > 24) {
          nonBlankSamples += 1;
        }
      }
    }

    return { found: true, nonBlankSamples, samples, width, height };
  });

  const passed =
    layout.scrollWidth <= layout.clientWidth + 2 &&
    canvas.found &&
    canvas.nonBlankSamples > 0;

  results.push({
    viewport: viewport.name,
    screenshotPath,
    passed,
    layout,
    canvas,
  });

  await context.close();
}

await browser.close();

console.log(JSON.stringify(results, null, 2));

if (results.some((result) => !result.passed)) {
  process.exitCode = 1;
}
