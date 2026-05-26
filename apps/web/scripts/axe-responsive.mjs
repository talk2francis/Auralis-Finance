import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.AURALIS_BASE_URL || 'http://127.0.0.1:3101';
const routes = ['/', '/ratings', '/app', '/app/dashboard', '/app/opportunities', '/app/opportunities/usdy', '/app/compliance', '/app/simulator', '/app/copilot', '/app/policies', '/app/decisions', '/app/agent'];
const breakpoints = [360, 768, 1280];

const browser = await chromium.launch({ headless: true });
const results = [];
let seriousCritical = 0;

for (const route of routes) {
  for (const width of breakpoints) {
    console.error(`checking ${route} @ ${width}px`);
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const response = await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(900);
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const severe = axe.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
    seriousCritical += severe.length;
    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    results.push({ route, width, status: response?.status() ?? 0, seriousCritical: severe.length, horizontalOverflow });
    await context.close();
  }
}
await browser.close();

console.log('AXE_SERIOUS_CRITICAL=' + seriousCritical);
for (const row of results) {
  console.log(`${row.route} @ ${row.width}px :: HTTP ${row.status} :: axe serious/critical ${row.seriousCritical} :: responsive ${row.horizontalOverflow ? 'FAIL overflow' : 'PASS'}`);
}
if (seriousCritical > 0 || results.some((r) => r.status >= 400 || r.horizontalOverflow)) process.exit(1);
