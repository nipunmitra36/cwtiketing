export default async function run(page, ui) {
  const log = [];
  await page.locator("#full_name").waitFor({ timeout: 20000 });
  await page.locator("#full_name").fill("NIPUN MITRA");
  await page.locator("#email").fill("nipunmitra03@gmail.com");
  await page.locator("#message").fill("Contact form end-to-end verification test.");

  // Give the Turnstile widget time to mount and auto-solve.
  await page.waitForTimeout(6000);

  const iframe = page.locator('iframe[src*="challenges.cloudflare.com"]').first();
  if (await iframe.count()) {
    const box = await iframe.boundingBox();
    log.push("turnstile iframe present " + JSON.stringify(box));
    if (box) {
      await page.mouse.click(box.x + 30, box.y + box.height / 2);
      log.push("clicked checkbox region");
    }
  } else {
    log.push("no turnstile iframe found");
  }
  await page.waitForTimeout(4000);

  await page.getByRole("button", { name: /send message/i }).click();
  log.push("submitted");

  // Outcome: success panel or an error line inside the form card.
  let outcome = "timeout waiting for outcome";
  try {
    await page
      .getByText(/Your message has been submitted|Please fix the highlighted fields|Captcha|couldn't|couldn’t/i)
      .first()
      .waitFor({ timeout: 25000 });
  } catch {
    /* fall through to snapshot */
  }
  const card = page.locator("div.rounded-2xl").first();
  outcome = (await card.innerText().catch(() => "")).replace(/\s+/g, " ").slice(0, 600);
  log.push("outcome: " + outcome);
  return { log, outcome };
}
