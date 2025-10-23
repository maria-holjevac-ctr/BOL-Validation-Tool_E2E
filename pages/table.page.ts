import { Page, Locator } from "@playwright/test";

export class Table {
  readonly page: Page;
  readonly tableHeader: Locator;
  readonly pageTitle: Locator;
  // Filtering data
  readonly siteNameLabel: Locator;
  readonly siteNameInput: Locator;
  readonly fabricatorLabel: Locator;
  readonly fabricatorInput: Locator;
  readonly loadNumLabel: Locator;
  readonly loadNumInput: Locator;
  readonly updatedByLabel: Locator;
  readonly updatedByInput: Locator;
  readonly scanningTimeLabel: Locator;
  readonly scanningTimeInput: Locator;
  readonly statusLabel: Locator;
  readonly statusInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tableHeader = page.getByRole("heading", { name: "BOL Validation" });
    this.pageTitle = page.locator("h2");
    // Filtering data
    this.siteNameLabel = page.locator(".m_8fdc1311").first();
    this.siteNameInput = page.locator(".m_8fb7ebe7").first();
    this.fabricatorLabel = page.locator(".m_8fdc1311").nth(1);
    this.fabricatorInput = page.getByRole("textbox", { name: "Fabricator" });
    this.loadNumLabel = page.locator(".m_8fdc1311").nth(2);
    this.loadNumInput = page.getByRole("textbox", { name: "Load number" });
    this.updatedByLabel = page.locator(".m_8fdc1311").nth(3);
    this.updatedByInput = page.locator(
      "div:nth-child(5) > .m_6c018570 > .m_8fb7ebe7"
    );
    this.scanningTimeLabel = page.locator(".m_8fdc1311").nth(4);
    this.scanningTimeInput = page.getByRole("button", {
      name: "Scanning time",
      exact: true,
    });
    this.statusLabel = page.locator(".m_8fdc1311").nth(5);
    this.statusInput = page.locator(
      "div:nth-child(9) > .m_6c018570 > .m_8fb7ebe7"
    );
  }
}
