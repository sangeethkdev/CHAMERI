const { chromium } = require('playwright');

const OUT = String.raw`C:\Users\TUF\AppData\Local\Temp\claude\c--Users-TUF-Desktop-CHAMERI-WEB-CHAMERI\43e5cc34-d2ed-40f3-8c79-597dd4bb3ee4\scratchpad`;

const tag = process.argv[2] || 'before';
const sizes = [
  { w: 1024, h: 690 },
  { w: 1280, h: 800 },
  { w: 1440, h: 900 },
  { w: 1920, h: 1080 },
  { w: 820,  h: 1180 },
];

(async () => {
  const browser = await chromium.launch();
  for (const { w, h } of sizes) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(900);
    // MenuSection's `open` prop only drives opacity/transform/pointer-events on the
    // fixed z-100 overlay; force those so we can inspect the panel's internal layout.
    const ok = await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('div'))
        .find(d => d.style && d.style.position === 'fixed' && d.style.zIndex === '100');
      if (!el) return false;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.pointerEvents = 'auto';
      el.style.transition = 'none';
      return true;
    });
    if (!ok) { console.log(`overlay not found @ ${w}x${h}`); await page.close(); continue; }
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}\\menu_${tag}_${w}x${h}.png` });
    await page.close();
  }
  await browser.close();
  console.log('done');
})();
