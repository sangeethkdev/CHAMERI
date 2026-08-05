const { chromium } = require('playwright');
const path = require('path');
const OUT = 'C:/Users/TUF/AppData/Local/Temp/claude/c--Users-TUF-Desktop-CHAMERI-WEB-CHAMERI/43e5cc34-d2ed-40f3-8c79-597dd4bb3ee4/scratchpad';

const tag = process.argv[2] || 'after';

(async () => {
  const browser = await chromium.launch();
  for (const [name, url] of [['about', '/about'], ['home', '/']]) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 950 } });
    await page.goto('http://localhost:3000' + url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(900);
    const sec = page.locator('section').filter({ hasText: 'What Our Clients' }).first();
    await sec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1600);

    // For each visible card, is the overlay's bottom inside the card's *clipped* box?
    const m = await page.evaluate(() => {
      const track = document.querySelector('section [style*="translateX"]');
      if (!track) return null;
      const cards = Array.from(track.children).filter(c => {
        const o = parseFloat(getComputedStyle(c).opacity);
        return o > 0.05;
      });
      return cards.map(c => {
        const cs = getComputedStyle(c);
        const cb = c.getBoundingClientRect();
        // clip inset % off the top/bottom
        const m = cs.clipPath.match(/inset\(([\d.]+)%/);
        const pct = m ? parseFloat(m[1]) : 0;
        const trim = (pct / 100) * cb.height;
        const visibleBottom = cb.bottom - trim;
        // last text node in the overlay
        const ps = c.querySelectorAll('p');
        const last = ps[ps.length - 1];
        const lb = last ? last.getBoundingClientRect() : null;
        return {
          clipPct: +pct.toFixed(1),
          // negative = text overflows past the visible clipped edge (the bug)
          textToVisibleEdge: lb ? Math.round(visibleBottom - lb.bottom) : null,
        };
      });
    });
    console.log(name.padEnd(6), JSON.stringify(m));
    await sec.screenshot({ path: path.join(OUT, `testi_${tag}_${name}.png`) });
    await page.close();
  }
  await browser.close();
})();
