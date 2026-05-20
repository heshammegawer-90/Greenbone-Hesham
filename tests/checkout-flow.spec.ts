import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutInformationPage } from "../pages/CheckoutInformationPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

test.describe("SauceDemo checkout flow tests", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutInformationPage: CheckoutInformationPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutInformationPage = new CheckoutInformationPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.expectInventoryPageIsDisplayed();
  });

  test("Should be able to login and complete the checkout process @smoke", async () => {
    const backpackPrice = await inventoryPage.getBackpackPrice();

    await inventoryPage.addBackpackToCart();
    await inventoryPage.expectCartBadgeCount("1");
    await inventoryPage.openCart();

    await cartPage.expectProductIsInCart("Sauce Labs Backpack");
    await cartPage.expectProductPrice(backpackPrice!);
    await cartPage.proceedToCheckout();

    await checkoutInformationPage.fillCheckoutInformation(
      "Hesham",
      "Megawer",
      "12345",
    );

    await checkoutOverviewPage.expectProductName("Sauce Labs Backpack");
    await checkoutOverviewPage.expectProductPrice(backpackPrice!);
    await checkoutOverviewPage.finishOrder();

    await checkoutCompletePage.expectOrderConfirmation();
  });

  test("Should show validation errors when required checkout information is missing", async () => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();

    await cartPage.proceedToCheckout();

    await checkoutInformationPage.fillCheckoutInformation(
      "",
      "Megawer",
      "12345",
    );
    await checkoutInformationPage.expectCheckoutError(
      "Error: First Name is required",
    );

    await checkoutInformationPage.fillCheckoutInformation(
      "Hesham",
      "",
      "12345",
    );
    await checkoutInformationPage.expectCheckoutError(
      "Error: Last Name is required",
    );

    await checkoutInformationPage.fillCheckoutInformation(
      "Hesham",
      "Megawer",
      "",
    );
    await checkoutInformationPage.expectCheckoutError(
      "Error: Postal Code is required",
    );
  });
});
