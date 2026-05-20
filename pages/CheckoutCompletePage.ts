import { expect, Page } from "@playwright/test";

export class CheckoutCompletePage {
  private confirmationMessage;

  constructor(private page: Page) {
    this.confirmationMessage = this.page.locator(
      '[data-test="complete-header"]',
    );
  }

  async expectOrderConfirmation() {
    await expect(this.confirmationMessage).toHaveText(
      "Thank you for your order!",
    );
  }
}
