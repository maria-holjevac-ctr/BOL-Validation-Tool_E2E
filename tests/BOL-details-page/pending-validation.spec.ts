import { test, expect } from "../../fixtures/user.fixture";

test.describe("Pending Validation BOL details page", () => {
  test.use({ user: "maria" });
  test.beforeEach(async ({ page, generalDetails, pendingValidationBOL }) => {
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await pendingValidationBOL.tableRow.click();
  });
  // Details of Pending Validation BOL are initialy presented in edit mode, with Save and Commit button in the top right corner
  test("Verify UI of whole Pending Validation BOL details page", async ({
    page,
    pendingValidationBOL,
    generalDetails,
  }) => {
    //waiting for image to load to UI
    await page.waitForTimeout(2000);
    await expect(generalDetails.BOLHeader).toBeVisible();
    await expect(pendingValidationBOL.page).toHaveScreenshot(
      "pending-validation-BOL-details.png"
    );
  });
});
