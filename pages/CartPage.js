// @ts-check
const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async expectItemCount(count) {
    const items = this.cartItems;
    if (count > 0) {
      await this.expectVisible(items.first());
    }
    const actual = await items.count();
    if (actual !== count) {
      throw new Error(`Expected ${count} cart items, found ${actual}`);
    }
  }

  /** @param {string} itemName */
  async removeItem(itemName) {
    const item = this.cartItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: /remove/i }).click();
  }

  async proceedToCheckout() {
    await this.clickWhenReady(this.checkoutButton);
  }

  async continueShopping() {
    await this.clickWhenReady(this.continueShoppingButton);
  }
}

module.exports = { CartPage };
