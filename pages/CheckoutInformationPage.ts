import { expect, Page } from "@playwright/test";

export class CheckoutInformationPage {
  private firstNameInput;
  private lastNameInput;
  private postalCodeInput;
  private continueButton;
  private errorMessage;

  constructor(private page: Page) {
    this.firstNameInput = this.page.locator('[data-test="firstName"]');
    this.lastNameInput = this.page.locator('[data-test="lastName"]');
    this.postalCodeInput = this.page.locator('[data-test="postalCode"]');
    this.continueButton = this.page.locator('[data-test="continue"]');
    this.errorMessage = this.page.locator('[data-test="error"]');
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async expectCheckoutError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
}
