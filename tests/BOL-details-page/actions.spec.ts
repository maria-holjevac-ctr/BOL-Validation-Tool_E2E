import { test, expect } from "../../fixtures/user.fixture";
import { uploadDocumentImages, deleteBolDocument } from "../../util/helper";

test.describe("Actions on BOLs", () => {
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

  test("Mark BOL Illegible - Critical fields missing", async ({ page }) => {
    await page.waitForTimeout(2000);
  });
  test("Mark BOL Illegible - row in table marked as Illegible", async ({
    page,
  }) => {
    await page.waitForTimeout(2000);
  });

  test("Mark BOL Valid", async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test("Commit BOL without all rows being marked Valid/Illegible", async ({
    page,
  }) => {
    await page.waitForTimeout(2000);
  });
});
