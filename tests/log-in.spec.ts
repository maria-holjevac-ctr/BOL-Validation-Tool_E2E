import { test } from "../fixtures/base.fixture";

test.describe("Log into BOL Validation tool", () => {
  test("Open BOL validation tool", async ({ page, logIn }) => {
    await page.goto("");
    await logIn.login(process.env.USERNAME, process.env.PASSWORD);
  });
});
