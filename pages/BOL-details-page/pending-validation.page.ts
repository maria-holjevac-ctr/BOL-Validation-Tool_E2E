import { Page, Locator, expect } from "@playwright/test";

export class PendingValidationBOL {
  readonly page: Page;
  readonly tableRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tableRow = page.getByRole("cell", { name: "Pending validation" });
  }
}
