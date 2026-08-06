export default async function run(page, ui) {
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  const link = page.getByRole("link", { name: "Product Demo" }).first();
  await link.waitFor({ state: "visible", timeout: 10000 });
  await link.click();
  await page.waitForURL("**/features", { timeout: 10000 });
  await page.waitForTimeout(600);
  return { url: page.url(), heading: await page.locator("h2").first().innerText() };
}
