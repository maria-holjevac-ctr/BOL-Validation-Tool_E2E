import { test, expect } from "../fixtures/user.fixture";

test.describe("BOL Table", () => {
  test.use({ user: "maria" });
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });
  test("TBD", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "BOL Documents" })
    ).toBeVisible();
  });
});
