import { expect, Page } from "@playwright/test";

export class CartPage {
  private cartItem;
  private checkoutButton;
  private cartItemPrice;

  constructor(private page: Page) {
    this.cartItem = this.page.locator('[data-test="inventory-item"]');
    this.checkoutButton = this.page.locator('[data-test="checkout"]');
    this.cartItemPrice = this.page.locator(
      '[data-test="inventory-item-price"]',
    );
  }

  async expectProductIsInCart(productName: string) {
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.cartItem).toContainText(productName);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();

    await expect(this.page).toHaveURL(/checkout-step-one/);
  }

  async expectProductPrice(price: string) {
    await expect(this.cartItemPrice).toHaveText(price);
  }
}
