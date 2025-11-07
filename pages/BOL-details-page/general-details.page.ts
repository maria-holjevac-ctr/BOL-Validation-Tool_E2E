import { Page, Locator, expect } from "@playwright/test";

export class GeneralDetails {
  readonly page: Page;
  readonly siteName: Locator;
  readonly BOLHeader: Locator;
  readonly image: Locator;
  readonly removeStatusFilter: Locator;
  // BOL details input fields
  readonly fabricatorInput: Locator;
  readonly loadNumberInput: Locator;
  readonly deleteDateBtn: Locator;
  readonly qty1Input: Locator;
  readonly mark1Input: Locator;
  readonly weight1Input: Locator;
  readonly sequence1Input: Locator;
  readonly input: Locator;
  //table items
  readonly tableContainer: Locator;
  readonly verticalDots: Locator;
  readonly menuRowDropdown: Locator;
  readonly addRowAbove: Locator;
  readonly addRowBelow: Locator;
  readonly deleteRow: Locator;
  readonly deleteRowDialog: Locator;
  readonly deleteRowCancelBtn: Locator;
  readonly deleteRowYesBtn: Locator;
  readonly xBtn: Locator;
  // generate link
  readonly generateLinkBtn: Locator;
  readonly viewLink: Locator;
  readonly linkForAppContainer: Locator;
  readonly linkForApp: Locator;
  readonly closeBtn: Locator;
  readonly toastMsg: Locator;
  //toggle valid/invalid
  readonly validBtn: Locator;
  readonly illegibleBtn: Locator;
  //image features
  readonly guideToggle: Locator;
  readonly guideLine: Locator;
  readonly magnifyBtn: Locator;
  readonly rotateBtn: Locator;
  readonly zoomInBtn: Locator;
  readonly zoomOutBtn: Locator;
  readonly imageContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.siteName = page.getByRole("textbox", { name: "Site name" });
    this.BOLHeader = page.getByRole("heading", { name: "BOL #" });
    this.image = page.locator("img").nth(1);
    this.removeStatusFilter = page.locator("button").nth(3);
    // BOL details input fields
    this.fabricatorInput = page.getByRole("textbox", { name: "Fabricator" });
    this.loadNumberInput = page.getByRole("textbox", { name: "Load number" });
    this.deleteDateBtn = page
      .locator("button.mantine-UnstyledButton-root")
      .nth(3);
    this.qty1Input = page.locator("td.mantine-Table-td > div").nth(0);
    this.mark1Input = page.locator("td.mantine-Table-td > div").nth(1);
    this.weight1Input = page.locator("td.mantine-Table-td > div").nth(2);
    this.sequence1Input = page.locator("td.mantine-Table-td > div").nth(3);
    this.input = page.locator("input.mantine-TextInput-input").nth(2);
    //table items
    this.verticalDots = page.locator(
      "span.mantine-ActionIcon-icon > svg.tabler-icon-dots-vertical"
    );
    this.menuRowDropdown = page.locator("div.mantine-Menu-dropdown");
    this.addRowAbove = page.getByRole("menuitem", { name: "Add row above" });
    this.addRowBelow = page.getByRole("menuitem", { name: "Add row below" });
    this.deleteRow = page.getByRole("menuitem", { name: "Delete row" });
    this.tableContainer = page.locator("div.mantine-datatable-scroll-area");
    this.deleteRowDialog = page.getByRole("dialog", {
      name: "Delete this row?",
    });
    this.deleteRowCancelBtn = page.getByRole("button", {
      name: "No, cancel",
    });
    this.deleteRowYesBtn = page.getByRole("button", { name: "Yes, delete" });
    this.xBtn = page
      .locator('button.mantine-focus-auto > svg[viewBox="0 0 15 15"]')
      .nth(1);
    //generate link
    this.generateLinkBtn = page.getByRole("button", { name: "Generate Link" });
    this.viewLink = page.getByText("View link").nth(1);
    this.linkForAppContainer = page.getByRole("dialog", {
      name: "Link for Versatile app",
    });
    this.linkForApp = page
      .locator("a.mantine-Text-root.mantine-Anchor-root")
      .nth(1);
    this.closeBtn = page.getByRole("button", { name: "Close" });
    this.toastMsg = page
      .locator("div.mantine-Notifications-notification")
      .first();
    this.validBtn = page.locator("label").filter({ hasText: "Valid" }).first();
    this.illegibleBtn = page
      .locator("label")
      .filter({ hasText: "Illegible" })
      .first();
    //Image features
    this.guideToggle = page.locator("span.mantine-Switch-track");
    this.guideLine = page.getByRole("slider");
    this.magnifyBtn = page.getByRole("button").filter({ hasText: /^$/ }).nth(4);
    this.rotateBtn = page.getByRole("button").filter({ hasText: /^$/ }).nth(5);
    this.zoomInBtn = page.locator("div:nth-child(4) > button").first();
    this.zoomOutBtn = page.locator("div:nth-child(4) > button:nth-child(3)");
    this.imageContainer = page.locator("div.mantine-ScrollArea-root").first();
  }
  // make sure to provide exact string to this method
  async selectSite(siteName: any) {
    await this.siteName.fill(siteName),
      await this.page.getByRole("option", { name: `${siteName}` }).click();
    await expect(
      this.page.locator("input[value='QA Test Site']").first()
    ).toBeVisible();
  }
}
