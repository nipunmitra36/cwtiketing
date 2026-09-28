import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.mouse.move(720, 450);

async function state() {
  return page.evaluate(() => {
    const card = document.querySelector(".border-blue-900");
    const leftCol = card.parentElement;
    const r = leftCol.getBoundingClientRect();
    const cs = getComputedStyle(leftCol);
    const m = cs.transform.match(/matrix\(([^)]+)\)/);
    const ty = m ? parseFloat(m[1].split(",")[5]) : 0;
    return { top: Math.round(r.top), scrollY: window.scrollY, ty: Math.round(ty) };
  });
}

let y = 0;
while (y < 10900) {
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(250);
  y = await page.evaluate(() => window.scrollY);
}
await page.waitForTimeout(800);

for (let i = 0; i < 40; i++) {
  await page.mouse.wheel(0, 30);
  await page.waitForTimeout(150);
  const s = await state();
  console.log(`tick ${i}`, JSON.stringify(s));
  if (s.scrollY > 11900) break;
}

await browser.close();
