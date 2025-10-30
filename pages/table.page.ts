import { Page, Locator } from "@playwright/test";

export class Table {
  readonly page: Page;
  readonly tableHeader: Locator;
  readonly pageTitle: Locator;
  // Filtering data
  readonly siteNameLabel: Locator;
  readonly siteNameFilter: Locator;
  readonly fabricatorLabel: Locator;
  readonly fabricatorFilter: Locator;
  readonly loadNumLabel: Locator;
  readonly loadNumFilter: Locator;
  readonly updatedByLabel: Locator;
  readonly updatedByFilter: Locator;
  readonly scanningTimeLabel: Locator;
  readonly scanningTimeFilter: Locator;
  readonly statusLabel: Locator;
  readonly statusFilter: Locator;
  readonly pendingValidationBOL: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tableHeader = page.getByRole("heading", { name: "BOL Validation" });
    this.pageTitle = page.locator("h2");
    // Filtering data
    this.siteNameLabel = page.locator(".m_8fdc1311").first();
    this.siteNameFilter = page.locator(".m_8fb7ebe7").first();
    this.fabricatorLabel = page.locator(".m_8fdc1311").nth(1);
    this.fabricatorFilter = page.getByRole("textbox", { name: "Fabricator" });
    this.loadNumLabel = page.locator(".m_8fdc1311").nth(2);
    this.loadNumFilter = page.getByRole("textbox", { name: "Load number" });
    this.updatedByLabel = page.locator(".m_8fdc1311").nth(3);
    this.updatedByFilter = page.locator(
      "div:nth-child(5) > .m_6c018570 > .m_8fb7ebe7"
    );
    this.scanningTimeLabel = page.locator(".m_8fdc1311").nth(4);
    this.scanningTimeFilter = page.getByRole("button", {
      name: "Scanning time",
      exact: true,
    });
    this.statusLabel = page.locator(".m_8fdc1311").nth(5);
    this.statusFilter = page.locator(
      "div:nth-child(9) > .m_6c018570 > .m_8fb7ebe7"
    );
    this.pendingValidationBOL = page
      .getByRole("cell", {
        name: "Pending validation",
      })
      .first();
  }
}
