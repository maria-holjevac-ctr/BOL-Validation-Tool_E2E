import { generateKey } from "crypto";
import { test, expect } from "../../fixtures/user.fixture";

test.describe("", () => {
  test.use({ user: "maria" });
  test.beforeEach(async ({ page, generalDetails, table }) => {
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await table.pendingValidationBOL.click();
    await page.waitForTimeout(2000);
  });

  test("Empty fields state on a Pending validation BOL", async ({
    page,
    generalDetails,
    table,
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
  test("Valid/Illegible buttons functionality", async ({ generalDetails }) => {
    // user can toggle between Valid/Illegible when critical data is available
    await generalDetails.validBtn.click();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "valid-button.png"
    );
    await generalDetails.illegibleBtn.click();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "illegible-button.png"
    );
    // empty critical data disables buttons
    await generalDetails.qty1Input.click();
    await generalDetails.input.fill("");
    await generalDetails.mark1Input.click();
    await expect(generalDetails.validBtn).toBeDisabled();
    await expect(generalDetails.illegibleBtn).toBeEnabled();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "qty-missing.png"
    );
    await generalDetails.qty1Input.click();
    await generalDetails.input.fill("1");
    await generalDetails.mark1Input.click();
    await generalDetails.input.fill("");
    await generalDetails.qty1Input.click();
    await expect(generalDetails.validBtn).toBeDisabled();
    await expect(generalDetails.illegibleBtn).toBeEnabled();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "mark-missing.png"
    );
    // filling data back enables buttons
    await generalDetails.mark1Input.click();
    await generalDetails.input.fill("34011");
    await generalDetails.qty1Input.click();
    await expect(generalDetails.validBtn).toBeEnabled();
    await expect(generalDetails.illegibleBtn).toBeEnabled();
    // empty non-critical data has buttons enabled
    await generalDetails.weight1Input.click();
    await generalDetails.input.fill("");
    await generalDetails.sequence1Input.click();
    await generalDetails.input.fill("");
    await generalDetails.validBtn.click();
    await expect(generalDetails.tableContainer).toHaveScreenshot(
      "non-critical-empty.png"
    );
  });
  test("Validate Guide feature", async ({ page }) => {});
  test("Validate Magnify feature", async ({ page }) => {});
  test("Validate Rotate feature", async ({ page }) => {});
  test("Validate Zoom in/out feature", async ({ page }) => {});
  test("Validate No data scan", async ({ page }) => {});
});
