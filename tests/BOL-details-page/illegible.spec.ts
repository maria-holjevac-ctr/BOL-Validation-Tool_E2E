import { test, expect } from "../../fixtures/user.fixture";

test.describe("Illegible BOL details page", () => {
  test.use({ user: "maria" });
  test.beforeEach(async ({ page, generalDetails, illegibleBOL }) => {
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await generalDetails.removeStatusFilter.click();
    await illegibleBOL.tableRow.click();
  });
  // Details of Illegible BOL are initialy presented in View mode, with Edit button in the top right corner
  test("Verify UI of whole Illegible BOL details page", async ({
    page,
    illegibleBOL,
    generalDetails,
  }) => {
    //waiting for image to load to UI
    await page.waitForTimeout(2000);
    await expect(generalDetails.BOLHeader).toBeVisible();
    await expect(illegibleBOL.page).toHaveScreenshot(
      "illegible-BOL-details.png"
    );
  });
});
