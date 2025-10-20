import { Page, Locator } from "@playwright/test";

export class LogIn {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.signInButton = page.getByRole("button", { name: "Sign in" });
  }

  async login(username: any, password: any) {
    await this.userNameInput.fill(username),
      await this.passwordInput.fill(password),
      await this.signInButton.click();
  }
}
