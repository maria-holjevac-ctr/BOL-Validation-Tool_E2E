import { Page, Locator } from "@playwright/test";

export class DuplicatedBOL {
  readonly page: Page;
  readonly tableRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tableRow = page.getByRole("cell", { name: "Duplicated" }).first();
  }
}
