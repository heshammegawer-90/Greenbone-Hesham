import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

const invalidLoginTestData = [
  {
    username: "standard_user",
    password: "wrong_password",
    scenario: "valid username and wrong password",
  },
  {
    username: "wrong_user",
    password: "secret_sauce",
    scenario: "wrong username and valid password",
  },
  {
    username: "wrong_user",
    password: "wrong_password",
    scenario: "wrong username and wrong password",
  },
];

test.describe("Authentication tests", () => {
  invalidLoginTestData.forEach(({ username, password, scenario }) => {
    test(`Should not be able to login with ${scenario}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.open();

      await loginPage.login(username, password);

      await loginPage.expectLoginError(
        "Username and password do not match any user in this service",
      );
    });
  });
});
