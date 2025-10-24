import { test, expect } from "../fixtures/user.fixture";

test.describe("Log into BOL Validation tool", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Verify UI of Log in container", async ({ logIn }) => {
    await expect(logIn.logInContainer).toBeVisible();
    await expect(logIn.logInContainer).toHaveScreenshot("initial-log-in.png");
  });

  test("Verify that user can show/hide password", async ({ logIn }) => {
    await logIn.login("maria", "test");
    await logIn.showHideBtn.click();
    await expect(logIn.logInContainer).toHaveScreenshot("show-password.png");
    await logIn.showHideBtn.click();
    await expect(logIn.logInContainer).toHaveScreenshot("hide-password.png");
  });

  test("Verify that user cannot log in if missing data", async ({ logIn }) => {
    await logIn.login("", "");
    await expect(logIn.logInContainer).toHaveScreenshot("mandatory-msg1.png");
    await logIn.login("", "test");
    await expect(logIn.logInContainer).toHaveScreenshot("mandatory-msg2.png");
    await logIn.login("maria", "");
    await expect(logIn.logInContainer).toHaveScreenshot("mandatory-msg3.png");
    await expect(logIn.pageTitle).not.toBeVisible();
  });

  test("Verify that user can log in with valid credentials", async ({
    logIn,
  }) => {
    await logIn.login(process.env.USERNAME, process.env.PASSWORD);
    await expect(logIn.toastMessage).toHaveScreenshot("success-log-in-msg.png");
  });

  test("Verify that user cannot log in with invalid credentials", async ({
    logIn,
  }) => {
    await logIn.login("maria", "test");
    await expect(logIn.toastMessage).toHaveScreenshot("failed-log-in-msg.png");
    await expect(logIn.pageTitle).not.toBeVisible();
  });
});
