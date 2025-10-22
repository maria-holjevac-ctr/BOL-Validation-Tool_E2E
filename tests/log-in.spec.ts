import { test, expect } from "../fixtures/user.fixture";

test.describe("Log into BOL Validation tool", () => {
  test.use({ user: "maria" });
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });
  test("Verify that user can log in with valid credentials", async ({
    logIn,
  }) => {
    await logIn.login(process.env.USERNAME, process.env.PASSWORD);
    await expect(logIn.pageTitle).toBeVisible();
  });
  test("Verify that user cannot log in with invalid credentials", async ({
    logIn,
  }) => {
    await logIn.login("maria", "test");
    await expect(logIn.pageTitle).not.toBeVisible();
    //add different assertion
  });
  test("Verify that user cannot log in if missing data", async ({ logIn }) => {
    await logIn.login("maria", "");
    await expect(logIn.pageTitle).not.toBeVisible();
    //add different assertion
  });
});
