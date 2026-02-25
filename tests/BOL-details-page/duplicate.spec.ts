// THIS LOGIC IS DEPRICATED
// NEW LOGIC SHOULD BE IMPLEMENTED

// import { test, expect } from "../../fixtures/user.fixture";

// test.describe("Illegible BOL details page", () => {
//   test.use({ user: "maria" });
//   test.beforeEach(async ({ page, generalDetails, duplicatedBOL }) => {
//     await page.goto("");
//     await generalDetails.selectSite("QA Test Site");
//     await generalDetails.removeStatusFilter.click();
//     await duplicatedBOL.tableRow.click();
//   });
//   // Details of Duplicate BOL are presented in Read Only mode
//   test("Verify UI of whole Illegible BOL details page", async ({
//     page,
//     duplicatedBOL,
//     generalDetails,
//   }) => {
//     //waiting for image to load to UI
//     await page.waitForTimeout(2000);
//     await expect(generalDetails.BOLHeader).toBeVisible();
//     await expect(duplicatedBOL.page).toHaveScreenshot(
//       "duplicated-BOL-details.png"
//     );
//   });
// });
