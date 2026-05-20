import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  private backpackAddButton: Locator;
  private cartBadge: Locator;
  private cartIcon: Locator;
  private productPrices: Locator;

  constructor(private page: Page) {
    this.backpackAddButton = this.page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    this.cartIcon = this.page.locator('[data-test="shopping-cart-link"]');
    this.productPrices = this.page
      .locator('[data-test="inventory-item-price"]')
      .first();
  }

  async expectInventoryPageIsDisplayed() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async addBackpackToCart() {
    await expect(this.cartBadge).toBeHidden();
    await this.backpackAddButton.click();
  }

  async expectCartBadgeCount(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async getBackpackPrice() {
    return await this.productPrices.textContent();
  }
}
