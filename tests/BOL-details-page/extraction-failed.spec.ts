import { test, expect } from "../../fixtures/user.fixture";

test.describe("Extraction Failed BOL", () => {
  test.use({ user: "maria" });
  test.beforeEach(async ({ page, generalDetails, extractionFailedBOL }) => {
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await generalDetails.removeStatusFilter.click();
    await extractionFailedBOL.tableRow.click();
  });

  // Details of Extraction Failed BOL are presented in Read Only mode
  test("Verify UI of whole Extraction Failed BOL details page", async ({
    page,
    extractionFailedBOL,
    generalDetails,
  }) => {
    //waiting for image to load to UI
    await page.waitForTimeout(3000);
    await expect(generalDetails.BOLHeader).toBeVisible();
    await expect(extractionFailedBOL.page).toHaveScreenshot(
      "extraction-failed-BOL-details.png"
    );
  });

  test("User can copy link to Archive page", async ({
    extractionFailedBOL,
    generalDetails,
  }) => {
    await generalDetails.generateLinkBtn.click();
    await expect(generalDetails.toastMsg).toHaveScreenshot(
      "generated-link-msg.png"
    );
    await generalDetails.linkForApp.click();
    await expect(generalDetails.linkForAppContainer).toHaveScreenshot(
      "link-container.png"
    );
    await generalDetails.closeBtn.click();
    await expect(extractionFailedBOL.page).toHaveScreenshot(
      "extraction-failed-BOL-details.png"
    );
  });

  //   test("User cannot edit any data", async ({
  //     page,
  //     extractionFailedBOL,
  //     generalDetails,
  //   }) => {
  //     //waiting for image to load to UI
  //     await page.waitForTimeout(3000);
  //   });
});
