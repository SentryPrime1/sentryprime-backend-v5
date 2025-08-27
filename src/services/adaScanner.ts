import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

export async function scanWebsiteForADA(url: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

// Inject axe-core manually by reading it from node_modules
const axePath = require.resolve('axe-core/axe.min.js'); // ✅ points directly to the file
const axeScript = fs.readFileSync(axePath, 'utf8');
await page.evaluate(axeScript);


  // Run axe in page context
  const results = await page.evaluate(async () => {
    // @ts-ignore
    return await axe.run();
  });

  await browser.close();
  return results;
}
