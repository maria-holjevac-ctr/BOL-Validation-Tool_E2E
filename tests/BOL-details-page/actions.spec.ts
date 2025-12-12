import { test, expect } from "../../fixtures/user.fixture";
import { uploadDocumentImages, deleteBolDocument } from "../../util/helper";
// also skipping, I do not want to run it each time, only specific situations (one time)
test.describe.skip("Actions on BOLs", () => {
  test.use({ user: "maria" });
  test.beforeEach(
    "Upload new BOL, navigate to it an make actions",
    async ({ request }) => {
      const result = await uploadDocumentImages({
        request,
        siteId: 10000307,
        uploadedBy: 3226,
        filePaths: ["BOLs/1page/ohio-00004.png"],
        note: "Automated upload of 1 BOL",
      });
      expect(result.registerStatus).toBe(201);
    }
  );
  test.afterEach(
    "Delete BOL after test finishes",
    async ({ page, request, generalDetails }) => {
      await page.goto("");
      await generalDetails.selectSite("QA Test Site");
      await generalDetails.removeStatusFilter.click();
      await generalDetails.sortBolId.dblclick();
      const bolId = await page
        .locator("td.mantine-Table-td")
        .first()
        .innerText();
      const result = await deleteBolDocument(
        request,
        10000307,
        bolId.trim(),
        3226
      );
      expect(result.status).toBe(201);
      expect(result.body).toBe("");
    }
  );
  // Upload 1 BOL, find it in UI, open it, work on it - delete it (mask ID from screenshot)
  test("Saving of BOL", async ({
    page,
    generalDetails,
    pendingValidationBOL,
  }) => {
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await generalDetails.removeStatusFilter.click();
    await generalDetails.sortBolId.dblclick();
    await pendingValidationBOL.tableRow.click();
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot("before-save.png", {
      mask: [generalDetails.bolID, generalDetails.lastUpdatedDate],
      maskColor: "#e7c742",
    });
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

    // wait for PUT request triggered by Save btn
    const responsePromise = page.waitForResponse((response) => {
      return (
        response.request().method() === "PUT" &&
        response.url().includes("api/v1/sites/10000307/documents")
      );
    });
    // trigger the PUT request
    await generalDetails.saveBtn.click();
    await expect(generalDetails.toastMsg).toHaveScreenshot("save-success.png");
    const response = await responsePromise;
    expect(response.status()).toBe(200);

    // refresh page and make sure data is saved
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await generalDetails.removeStatusFilter.click();
    await generalDetails.sortBolId.dblclick();
    await pendingValidationBOL.tableRow.click();
    await expect(page).toHaveScreenshot("after-save.png", {
      mask: [generalDetails.bolID, generalDetails.lastUpdatedDate],
      maskColor: "#e7c742",
    });
  });

  test("Mark BOL Illegible - Fabricator and Load Number Illegible", async ({
    page,
    generalDetails,
    pendingValidationBOL,
  }) => {
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await generalDetails.removeStatusFilter.click();
    await generalDetails.sortBolId.dblclick();
    await pendingValidationBOL.tableRow.click();
    await generalDetails.illegibleBtn.nth(0).click();

    for (let i = 2; i <= 12; i++) {
      await generalDetails.validBtn.nth(i).click();
    }
    await generalDetails.commitBtn.click();
    await expect(generalDetails.commitDialog).toHaveScreenshot(
      "illegible-commit-dialog.png"
    );
    await generalDetails.yesCommitBtn.click();
    await expect(generalDetails.toastMsg).toHaveScreenshot(
      "illegible-bol-msg.png"
    );
    await expect(page).toHaveScreenshot("illegible-BOL-status.png", {
      mask: [generalDetails.bolID, generalDetails.lastUpdatedDate],
      maskColor: "#e7c742",
    });
  });

  test("Mark BOL Illegible - row in table marked as Illegible", async ({
    page,
    generalDetails,
    pendingValidationBOL,
  }) => {
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await generalDetails.removeStatusFilter.click();
    await generalDetails.sortBolId.dblclick();
    await pendingValidationBOL.tableRow.click();
    await generalDetails.illegibleBtn.nth(0).click();

    for (let i = 1; i <= 11; i++) {
      await generalDetails.validBtn.nth(i).click();
    }
    await generalDetails.illegibleBtn.nth(11).click();
    await generalDetails.commitBtn.click();
    await expect(generalDetails.commitDialog).toHaveScreenshot(
      "illegible-commit-dialog.png"
    );
    await generalDetails.yesCommitBtn.click();
    await expect(generalDetails.toastMsg).toHaveScreenshot(
      "illegible-bol-msg.png"
    );
    await expect(page).toHaveScreenshot("illegible-BOL-status2.png", {
      mask: [generalDetails.bolID, generalDetails.lastUpdatedDate],
      maskColor: "#e7c742",
    });
  });

  test("Mark BOL Valid", async ({
    page,
    generalDetails,
    pendingValidationBOL,
  }) => {
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await generalDetails.removeStatusFilter.click();
    await generalDetails.sortBolId.dblclick();
    await pendingValidationBOL.tableRow.click();

    for (let i = 1; i <= 12; i++) {
      await generalDetails.validBtn.nth(i).click();
    }
    await generalDetails.commitBtn.click();
    await expect(generalDetails.commitDialog).toHaveScreenshot(
      "valid-commit-dialog.png"
    );
    await generalDetails.yesCommitBtn.click();
    await expect(generalDetails.toastMsg).toHaveScreenshot(
      "validated-bol-msg.png"
    );
    await expect(page).toHaveScreenshot("validated-BOL-status.png", {
      mask: [generalDetails.bolID, generalDetails.lastUpdatedDate],
      maskColor: "#e7c742",
    });
  });

  test("Commit BOL without all rows being marked Valid/Illegible", async ({
    page,
    generalDetails,
    pendingValidationBOL,
  }) => {
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await generalDetails.removeStatusFilter.click();
    await generalDetails.sortBolId.dblclick();
    await pendingValidationBOL.tableRow.click();
    await generalDetails.commitBtn.click();
    await expect(generalDetails.commitDialog).toHaveScreenshot(
      "validation-incomplete-dialog.png"
    );
    await generalDetails.closeBtn.click();
    await expect(page).toHaveScreenshot("status-remains-pending.png", {
      mask: [generalDetails.bolID, generalDetails.lastUpdatedDate],
      maskColor: "#e7c742",
    });
  });

  test("Edit Illegible BOL to Validated status", async ({
    page,
    generalDetails,
    pendingValidationBOL,
  }) => {
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await generalDetails.removeStatusFilter.click();
    await generalDetails.sortBolId.dblclick();
    await pendingValidationBOL.tableRow.click();
    await generalDetails.illegibleBtn.nth(0).click();
    for (let i = 1; i <= 11; i++) {
      await generalDetails.validBtn.nth(i).click();
    }
    await generalDetails.illegibleBtn.nth(11).click();
    await generalDetails.commitBtn.click();
    await generalDetails.yesCommitBtn.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("illegible-BOL3.png", {
      mask: [generalDetails.bolID, generalDetails.lastUpdatedDate],
      maskColor: "#e7c742",
    });
    await generalDetails.editBtn.click();
    await generalDetails.validBtn.nth(12).click();
    await generalDetails.commitBtn.click();
    await generalDetails.yesCommitBtn.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("validated-BOL3.png", {
      mask: [generalDetails.bolID, generalDetails.lastUpdatedDate],
      maskColor: "#e7c742",
    });
  });

  test("Edit Validated BOL to Illegible status", async ({
    page,
    generalDetails,
    pendingValidationBOL,
  }) => {
    await page.goto("");
    await generalDetails.selectSite("QA Test Site");
    await generalDetails.removeStatusFilter.click();
    await generalDetails.sortBolId.dblclick();
    await pendingValidationBOL.tableRow.click();

    for (let i = 1; i <= 12; i++) {
      await generalDetails.validBtn.nth(i).click();
    }
    await generalDetails.commitBtn.click();
    await generalDetails.yesCommitBtn.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("validated-BOL4.png", {
      mask: [generalDetails.bolID, generalDetails.lastUpdatedDate],
      maskColor: "#e7c742",
    });
    await generalDetails.editBtn.click();
    await generalDetails.illegibleBtn.nth(1).click();
    await generalDetails.commitBtn.click();
    await generalDetails.yesCommitBtn.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("illegible-BOL4.png", {
      mask: [generalDetails.bolID, generalDetails.lastUpdatedDate],
      maskColor: "#e7c742",
    });
  });
});
