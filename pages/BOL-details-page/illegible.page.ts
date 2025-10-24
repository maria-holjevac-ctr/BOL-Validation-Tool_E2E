import { Page, Locator } from "@playwright/test";

export class IllegibleBOL {
  readonly page: Page;
  readonly tableRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tableRow = page.getByRole("cell", { name: "Validation failed" });
  }
}
