import { test, expect } from "../../fixtures/user.fixture";

test.describe("General details of uploaded BOLs", () => {
  test.use({ user: "maria" });
  test.beforeEach(async ({ page, generalDetails, table }) => {
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await table.pendingValidationBOL.click();
    await page.waitForTimeout(2000);
  });

  test("Empty fields state on a Pending validation BOL", async ({
    generalDetails,
  }) => {
    await generalDetails.fabricatorInput.fill("");
    await generalDetails.loadNumberInput.fill("");
    await generalDetails.deleteDateBtn.click();
    await generalDetails.qty1Input.click();
    await generalDetails.input.fill("");
    await generalDetails.mark1Input.click();
    await generalDetails.input.fill("");
    await generalDetails.weight1Input.click();
    await generalDetails.input.fill("");
    await generalDetails.sequence1Input.click();
    await generalDetails.input.fill("");
    await expect(generalDetails.page).toHaveScreenshot(
      "critical-fields_BOL-details.png"
    );
  });

  test("Add new row to the table", async ({ generalDetails }) => {
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "table-initial.png"
    );
    await generalDetails.verticalDots.first().click();
    await expect(generalDetails.menuRowDropdown).toHaveScreenshot(
      "add-delete-row-dropdown.png"
    );
    await generalDetails.addRowAbove.click();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "new-row-above.png"
    );
    await generalDetails.verticalDots.nth(1).click();
    await generalDetails.addRowBelow.click();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "new-row-below.png"
    );
  });

  test("Delete row from the table", async ({ generalDetails }) => {
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "table-before-delete.png"
    );
    //delete first row from the table
    await generalDetails.verticalDots.first().click();
    await generalDetails.deleteRow.click();
    await expect(generalDetails.deleteRowDialog).toHaveScreenshot(
      "delete-row-dialog.png"
    );
    await generalDetails.deleteRowYesBtn.click();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "table-after-delete.png"
    );
    //cancel button - delete dialog
    await generalDetails.verticalDots.first().click();
    await generalDetails.deleteRow.click();
    await expect(generalDetails.deleteRowDialog).toHaveScreenshot(
      "delete-row-dialog.png"
    );
    await generalDetails.deleteRowCancelBtn.click();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "table-after-delete.png"
    );
    // X button - delete dialog
    await generalDetails.verticalDots.first().click();
    await generalDetails.deleteRow.click();
    await expect(generalDetails.deleteRowDialog).toHaveScreenshot(
      "delete-row-dialog.png"
    );
    await generalDetails.xBtn.click();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "table-after-delete.png"
    );
  });
  test("Valid/Illegible buttons for Fabricator and Load", async ({
    generalDetails,
  }) => {
    // user can toggle between Valid/Illegible when Fabricator and Load data is available
    await generalDetails.validBtn.nth(1).click();
    await expect(generalDetails.headerContainer).toHaveScreenshot(
      "valid-button1st.png"
    );
    await generalDetails.illegibleBtn.first().click();
    await expect(generalDetails.headerContainer).toHaveScreenshot(
      "illegible-button1st.png"
    );
    // empty critical data disables buttons
    await generalDetails.fabricatorInput.fill("");
    await expect(generalDetails.validBtn.nth(1)).toBeDisabled();
    await expect(generalDetails.illegibleBtn.first()).toBeEnabled();
    await expect(generalDetails.headerContainer).toHaveScreenshot(
      "fabricator-missing.png"
    );
    await generalDetails.fabricatorInput.fill("Ohio Structural Steel Inc.");
    await generalDetails.loadNumberInput.fill("");
    await expect(generalDetails.validBtn.nth(1)).toBeDisabled();
    await expect(generalDetails.illegibleBtn.first()).toBeEnabled();
    await expect(generalDetails.headerContainer).toHaveScreenshot(
      "load-missing.png"
    );
    // filling data back enables buttons
    await generalDetails.loadNumberInput.fill("00012");
    await expect(generalDetails.validBtn.nth(1)).toBeEnabled();
    await expect(generalDetails.illegibleBtn.first()).toBeEnabled();
    // empty non-critical data has buttons enabled
    await generalDetails.resetDateInput.click();
    await generalDetails.validBtn.nth(1).click();
    await expect(generalDetails.headerContainer).toHaveScreenshot(
      "date-empty.png"
    );
  });
  test("Valid/Illegible buttons functionality in the table", async ({
    generalDetails,
  }) => {
    // user can toggle between Valid/Illegible when critical data is available
    await generalDetails.validBtn.nth(2).click();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "valid-button2nd.png"
    );
    await generalDetails.illegibleBtn.nth(1).click();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "illegible-button2nd.png"
    );
    // empty critical data disables buttons
    await generalDetails.qty1Input.click();
    await generalDetails.input.fill("");
    await generalDetails.mark1Input.click();
    await expect(generalDetails.validBtn.nth(2)).toBeDisabled();
    await expect(generalDetails.illegibleBtn.nth(1)).toBeEnabled();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "qty-missing.png"
    );
    await generalDetails.qty1Input.click();
    await generalDetails.input.fill("1");
    await generalDetails.mark1Input.click();
    await generalDetails.input.fill("");
    await generalDetails.qty1Input.click();
    await expect(generalDetails.validBtn.nth(2)).toBeDisabled();
    await expect(generalDetails.illegibleBtn.nth(1)).toBeEnabled();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "mark-missing.png"
    );
    // filling data back enables buttons
    await generalDetails.mark1Input.click();
    await generalDetails.input.fill("34011");
    await generalDetails.qty1Input.click();
    await expect(generalDetails.validBtn.nth(2)).toBeEnabled();
    await expect(generalDetails.illegibleBtn.nth(1)).toBeEnabled();
    // empty non-critical data has buttons enabled
    await generalDetails.weight1Input.click();
    await generalDetails.input.fill("");
    await generalDetails.sequence1Input.click();
    await generalDetails.input.fill("");
    await generalDetails.validBtn.nth(2).click();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "non-critical-empty.png"
    );
  });
  test("Validate Guide feature", async ({ page, generalDetails }) => {
    // initial state - guide is on
    await expect(generalDetails.guideLine).toBeVisible();
    await expect(generalDetails.imageContainer).toHaveScreenshot(
      "guide-on.png"
    );
    // user can toggle between guide on and off
    await generalDetails.guideToggle.click();
    await expect(generalDetails.guideLine).not.toBeVisible();
    await expect(generalDetails.imageContainer).toHaveScreenshot(
      "guide-off.png"
    );
    // user can drag guide up and down
    await generalDetails.guideToggle.click();
    const box = await generalDetails.guideLine.boundingBox();
    if (!box) throw new Error("Guide not visible");
    // go to the center of the element
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    // move from center down for 300px
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 + 300);
    await expect(generalDetails.imageContainer).toHaveScreenshot(
      "guideline-down.png"
    );
    //move from center up for 300px
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 - 300);
    await expect(generalDetails.imageContainer).toHaveScreenshot(
      "guideline-up.png"
    );
  });
  test("Validate Magnify feature", async ({ page, generalDetails }) => {
    await generalDetails.magnifyBtn.click();
    // access coordinates of image container
    const box = await generalDetails.imageContainer.boundingBox();
    if (!box) throw new Error("No image container displayed");
    //position playwright cursor in the center
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await expect(generalDetails.imageContainer).toHaveScreenshot("magnify.png");
  });
  test("Validate Rotate feature", async ({ page, generalDetails }) => {
    //initial state
    await expect(generalDetails.imageContainer).toHaveScreenshot(
      "non-rotated-image.png"
    );
    await generalDetails.rotateBtn.click();
    await expect(generalDetails.toastMsg).toHaveScreenshot(
      "success-rotate.png"
    );
    //waiting for image to rotate
    await page.waitForTimeout(2000);
    await expect(generalDetails.imageContainer).toHaveScreenshot(
      "rotated-image.png"
    );
    // BUG: rotate is saved even when user does not explicitly save it on 'Save' button
    // thats why I am clicking though again to rotate it to initial position
    await generalDetails.rotateBtn.click();
    await page.waitForTimeout(2000);
    await generalDetails.rotateBtn.click();
    await page.waitForTimeout(2000);
    await generalDetails.rotateBtn.click();
    await page.waitForTimeout(2000);
    await expect(generalDetails.imageContainer).toHaveScreenshot(
      "non-rotated-image.png"
    );
  });
  test("Validate Zoom in/out feature", async ({ page, generalDetails }) => {
    await generalDetails.zoomInBtn.dblclick();
    await expect(generalDetails.imageContainer).toHaveScreenshot(
      "zoomed-in-image.png"
    );
    await generalDetails.zoomOutBtn.dblclick();
    await generalDetails.zoomOutBtn.dblclick();
    await expect(generalDetails.imageContainer).toHaveScreenshot(
      "zoomed-out-image.png"
    );
  });
  test("Validate No data scan", async ({ page }) => {
    await page.goto("/bol-validation?bolId=635&siteId=10000307");
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot("no-data-BOL.png");
    // no data BOLs have empty state in table, they can manually add data
  });
  test("Validate Note", async ({ generalDetails, page }) => {
    await expect(generalDetails.noteContainer).toHaveScreenshot(
      "note-container.png"
    );
    await generalDetails.noteContainer.click();
    await expect(generalDetails.noteDialog).toBeVisible();
    await expect(page).toHaveScreenshot("open-note-dialog.png");
  });
});
