import { Page, Locator } from "@playwright/test";

export class LogIn {
  readonly page: Page;
  readonly logInContainer: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly showHideBtn: Locator;
  readonly signInButton: Locator;
  readonly toastMessage: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logInContainer = page.locator("div").nth(2);
    this.userNameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.showHideBtn = page.locator("button").first();
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.toastMessage = page
      .locator("div.mantine-Notifications-notification")
      .first();
    this.pageTitle = page.getByRole("heading", { name: "BOL Documents" });
  }

  async login(username: any, password: any) {
    await this.userNameInput.fill(username),
      await this.passwordInput.fill(password),
      await this.signInButton.click();
  }
}
