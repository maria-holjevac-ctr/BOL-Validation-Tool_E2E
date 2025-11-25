import { test, expect } from "../fixtures/user.fixture";
import { uploadDocumentImages } from "../util/helper";

test.describe("Upload new BOL", () => {
  test.use({ user: "maria" });
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Upload one BOL image", async ({ request }) => {
    const result = await uploadDocumentImages({
      request,
      siteId: 10000222,
      uploadedBy: 3226,
      filePaths: ["BOLs/1page/ohio-00004.png"],
      note: "Automated upload of 1 BOL",
    });
    expect(result.registerStatus).toBe(201);
  });

  test("Upload 3 BOL images", async ({ request }) => {
    const result = await uploadDocumentImages({
      request,
      siteId: 10000222,
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
      siteId: 10000222,
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
      siteId: 10000222,
      uploadedBy: 3226,
      filePaths: [
        "BOLs/3pages/ohio-00003-1.png",
        "BOLs/3pages/ohio-00003-2.png",
        "BOLs/3pages/ohio-00003-3.png",
      ],
      note: "Automated upload of no data BOL",
    });
    expect(result.registerStatus).toBe(201);
  });
});
