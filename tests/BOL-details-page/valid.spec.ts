import { test, expect } from "../../fixtures/user.fixture";

test.describe("Valid BOL details page", () => {
  test.use({ user: "maria" });
  test.beforeEach(async ({ page, generalDetails, validBOL }) => {
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await generalDetails.removeStatusFilter.click();
    await validBOL.tableRow.click();
  });
  // Details of Valid BOL are initialy presented in View mode, with Edit button in the top right corner
  test("Verify UI of whole Valid BOL details page", async ({
    page,
    generalDetails,
    validBOL,
  }) => {
    //waiting for image to load to UI
    await page.waitForTimeout(2000);
    await expect(generalDetails.BOLHeader).toBeVisible();
    await expect(validBOL.page).toHaveScreenshot("valid-BOL-details.png", {
      mask: [generalDetails.bolID, generalDetails.lastUpdatedDate],
      maskColor: "#e7c742",
    });
  });
});
