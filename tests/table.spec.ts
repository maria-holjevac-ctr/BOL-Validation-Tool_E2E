import { test, expect } from "../fixtures/user.fixture";

test.describe("BOL Table", () => {
  test.use({ user: "maria" });
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });
  test("Verify initial state of the table", async ({ page, table }) => {
    //BOLs in status pending validation are prefiltered in ascending order
    await expect(table.pageTitle).toBeVisible();
  });
});
