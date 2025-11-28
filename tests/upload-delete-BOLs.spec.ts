import { test, expect } from "../fixtures/user.fixture";
import { uploadDocumentImages, deleteBolDocument } from "../util/helper";

test.describe("Upload and delete BOLs", () => {
  test.use({ user: "maria" });
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Upload one BOL image", async ({ request }) => {
    const result = await uploadDocumentImages({
      request,
      siteId: 10000307,
      uploadedBy: 3226,
      filePaths: ["BOLs/1page/ohio-00004.png"],
      note: "Automated upload of 1 BOL",
    });
    expect(result.registerStatus).toBe(201);
  });

  test("Upload 3 BOL images", async ({ request }) => {
    const result = await uploadDocumentImages({
      request,
      siteId: 10000307,
      uploadedBy: 3226,
      filePaths: [
        "BOLs/3pages/ohio-00003-1.png",
        "BOLs/3pages/ohio-00003-2.png",
        "BOLs/3pages/ohio-00003-3.png",
      ],
      note: "Automated upload of 3 BOLs",
    });
    expect(result.registerStatus).toBe(201);
  });

  test("Upload 10 BOL images", async ({ request }) => {
    const result = await uploadDocumentImages({
      request,
      siteId: 10000307,
      uploadedBy: 3226,
      filePaths: [
        "BOLs/3pages/ohio-00003-1.png",
        "BOLs/3pages/ohio-00003-2.png",
        "BOLs/3pages/ohio-00003-2.png",
        "BOLs/3pages/ohio-00003-2.png",
        "BOLs/3pages/ohio-00003-2.png",
        "BOLs/3pages/ohio-00003-2.png",
        "BOLs/3pages/ohio-00003-2.png",
        "BOLs/3pages/ohio-00003-2.png",
        "BOLs/3pages/ohio-00003-2.png",
        "BOLs/3pages/ohio-00003-3.png",
      ],
      note: "Automated upload of 10 BOLs",
    });
    expect(result.registerStatus).toBe(201);
  });

  test("Upload no data BOL image", async ({ request }) => {
    const result = await uploadDocumentImages({
      request,
      siteId: 10000307,
      uploadedBy: 3226,
      filePaths: ["BOLs/noData/no-data-image.png"],
      note: "Automated upload of no data BOL",
    });
    expect(result.registerStatus).toBe(201);
  });

  test("Delete all recently uploaded BOLs", async ({
    request,
    page,
    generalDetails,
  }) => {
    let i = 1;
    for (i; i <= 4; i++) {
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
  });
});
