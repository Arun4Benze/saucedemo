// @ts-check
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator('.inventory_item_price');
    this.itemNames = page.locator('.inventory_item_name');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');

    
  }

  async expectLoaded() {
    await this.expectVisible(this.pageTitle);
    await this.expectText(this.pageTitle, 'Products');
  }

  /** @param {string} itemName e.g. "Sauce Labs Backpack" */
  addItemToCart(itemName) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    return item.getByRole('button', { name: /add to cart/i }).click();
  }

  /** @param {string} itemName */
  removeItemFromCart(itemName) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    return item.getByRole('button', { name: /remove/i }).click();
  }

  async openCart() {
    await this.clickWhenReady(this.cartLink);
  }

  async expectCartCount(count) {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await this.expectText(this.cartBadge, String(count));
    }
  }

  /** @param {'az'|'za'|'lohi'|'hilo'} order */
  async sortBy(order) {
    const valueMap = {
      az: 'az',
      za: 'za',
      lohi: 'lohi',
      hilo: 'hilo',
    };
    await this.sortDropdown.selectOption(valueMap[order]);
  }

  async getAllPrices() {
    const raw = await this.itemPrices.allTextContents();
    return raw.map((p) => parseFloat(p.replace('$', '')));
  }

  async getAllNames() {
    return this.itemNames.allTextContents();
  }

  async logout() {
    await this.clickWhenReady(this.menuButton);

    console.log("Menu clicked");
    await this.clickWhenReady(this.logoutLink);
  }
}

module.exports = { InventoryPage };
