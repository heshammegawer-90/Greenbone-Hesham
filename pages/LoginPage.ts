import { expect, Page } from "@playwright/test";

export class LoginPage {
  private usernameInput;
  private passwordInput;
  private loginButton;
  private errorMessage;

  constructor(private page: Page) {
    this.usernameInput = this.page.locator('[data-test="username"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.locator('[data-test="login-button"]');
    this.errorMessage = this.page.locator('[data-test="error"]');
  }

  async open() {
    await this.page.goto("/");
    await expect(this.page).toHaveURL("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
}
