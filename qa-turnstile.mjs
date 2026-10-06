export default async function run(page) {
  const apiCalls = [];
  page.on("response", (r) => {
    if (r.url().includes("/api/contact")) apiCalls.push({ status: r.status(), body: r.request().postData() });
  });
  page.on("request", (r) => {
    if (r.url().includes("/api/contact")) apiCalls.push({ req: true, body: r.postData() });
  });

  const before = await page.evaluate(() => ({
    name: document.querySelector("#full_name")?.value,
    valuesSet: false,
    formExists: Boolean(document.querySelector("form")),
    submitDisabled: document.querySelector('button[type="submit"]')?.disabled,
  }));

  await page.locator("#full_name").fill("QA Tester");
  await page.locator("#email").fill("qa@example.com");
  await page.locator("#message").fill("Automated QA message.");

  const filled = await page.evaluate(() => ({
    name: document.querySelector("#full_name")?.value,
    email: document.querySelector("#email")?.value,
    msg: document.querySelector("#message")?.value,
  }));

  await page.evaluate(() => {
    document.querySelector("form")?.requestSubmit();
  });
  await page.waitForTimeout(12000);

  const after = await page.evaluate(() => ({
    alert: document.querySelector('[role="alert"]')?.innerText ?? null,
    live: document.querySelector('[role="status"]')?.innerText ?? null,
    success: document.body.innerText.includes("message received"),
    button: document.querySelector('button[type="submit"]')?.innerText ?? null,
  }));

  return { before, filled, after, apiCalls };
}
