import { expect, Page } from "@playwright/test";

export class CheckoutOverviewPage {
  private finishButton;
  private productName;
  private checkoutItemPrice;

  constructor(private page: Page) {
    this.finishButton = this.page.locator('[data-test="finish"]');
    this.productName = this.page.locator('[data-test="inventory-item-name"]');
    this.checkoutItemPrice = this.page.locator(
      '[data-test="inventory-item-price"]',
    );
  }

  async expectProductName(product: string) {
    await expect(this.page).toHaveURL(/checkout-step-two/);
    await expect(this.productName).toHaveText(product);
  }

  async expectProductPrice(price: string) {
    await expect(this.checkoutItemPrice).toHaveText(price);
  }

  async finishOrder() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/complete/);
  }
}
