// @ts-check
const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

/**
 * Extends Playwright's base test with one fixture per page object.
 * Tests destructure exactly what they need:
 *   test('...', async ({ loginPage, inventoryPage }) => { ... })
 * instead of manually instantiating each class in every test file.
 */
exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Pre-authenticated page: use this fixture in tests that don't need
  // to test the login flow itself, to skip repeating login steps.
  authenticatedPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user', 'secret_sauce');
    await page.waitForURL('**/inventory.html');
    await use(page);
  },
});

exports.expect = base.expect;
