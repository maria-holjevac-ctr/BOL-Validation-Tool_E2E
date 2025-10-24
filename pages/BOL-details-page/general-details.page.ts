import { Page, Locator, expect } from "@playwright/test";

export class GeneralDetails {
  readonly page: Page;
  readonly siteName: Locator;
  readonly BOLHeader: Locator;
  readonly image: Locator;
  readonly removeStatusFilter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.siteName = page.getByRole("textbox", { name: "Site name" });
    this.BOLHeader = page.getByRole("heading", { name: "BOL #" });
    this.image = page.locator("img").nth(1);
    this.removeStatusFilter = page.locator("button").nth(4);
  }
  // make sure to provide exact string to this method
  async selectSite(siteName: any) {
    await this.siteName.fill(siteName),
      await this.page.getByRole("option", { name: `${siteName}` }).click();
    await expect(
      this.page
        .locator("div")
        .filter({ hasText: /^QA Test Site$/ })
        .nth(1)
    ).toBeVisible();
  }
}
