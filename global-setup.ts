import { chromium, FullConfig, expect } from "@playwright/test";
import fs from "fs/promises";

const users = [
  {
    name: "Maria",
    username: process.env.USERNAME!,
    pass: process.env.PASSWORD!,
  },
];

async function globalSetup(_config: FullConfig) {
  await fs.mkdir(".auth", { recursive: true });
  const browser = await chromium.launch();

  for (const u of users) {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(process.env.BASE_URL!);
    await page.getByRole("textbox", { name: "Username" }).fill(u.username);
    await page.getByRole("textbox", { name: "Password" }).fill(u.pass);
    await page.getByRole("button", { name: "Sign in" }).click();
    console.log(`Successful log in of user: ${u.name}`);
    await expect(
      page.getByRole("heading", { name: "BOL Documents" })
    ).toBeVisible({
      timeout: 10000,
    });
    await page.waitForLoadState("domcontentloaded");
    const tokenCookie = (await context.cookies()).find(
      (c) => c.name === "csrftoken"
    );
    if (!tokenCookie)
      throw new Error(`Login failed for ${u.name}: no "token" cookie found`);

    await context.storageState({ path: `.auth/auth_${u.name}.json` });
    await context.close();
  }
  await browser.close();
}
export default globalSetup;
