import { test, expect } from "../fixtures/user.fixture";
import fs from "node:fs";
import * as dotenv from "dotenv";

dotenv.config();

test.describe("Upload new BOL", () => {
  test.use({ user: "maria" });
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });
  // WIP - this will be a helper method and will be reused for multiple different uploads
  test.only("Upload one page BOL", async ({ request }) => {
    const api = process.env.DOCUMENT_PROCESSING_API;
    const siteId = 10000222;
    const contentType = "image/png";
    // generate pre-signed S3 URLs for uploading BOL document images directly to cloud storage
    const res = await request.post(`${api}upload/generate-urls`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        siteId,
        files: [{ fileName: "ohio-00004.png", contentType }],
      },
    });
    expect(res.ok()).toBeTruthy();

    const uploadedBy = 304;
    const filePath = "BOLs/1page/ohio-00004.png";

    const generateUrlsBody = await res.json();

    const documentUuid = generateUrlsBody.documentUuid;
    const fileInfo = generateUrlsBody.files[0];

    const fileBytes = await fs.promises.readFile(filePath);

    //sends your local file’s bytes to the AWS S3 bucket using the presigned URL
    const put = await request.put(fileInfo.url, {
      headers: { "Content-Type": contentType },
      data: fileBytes,
    });

    expect(put.ok()).toBeTruthy();

    //registers metadata about the uploaded file so the backend knows what to do next
    const register = await request.post(`${api}${documentUuid}`, {
      headers: { "Content-Type": "application/json" },
      data: {
        siteId,
        uploadedBy,
        note: "Automated upload",
        files: [
          {
            fileName: fileInfo.fileName,
            fingerprint: "dummy-fingerprint",
            objectKey: fileInfo.objectKey,
            contentType,
          },
        ],
      },
    });
    expect(register.ok()).toBeTruthy();
  });
});
