// @ts-check
const { expect } = require('@playwright/test');

/**
 * BasePage holds behavior shared by every page object:
 * navigation helpers, common waits, and reusable assertions.
 * Concrete pages extend this instead of duplicating boilerplate.
 */
class BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async title() {
    return this.page.title();
  }

  /** Wait for an element to be visible before interacting — reduces flake. */
  async waitVisible(locator) {
    await locator.waitFor({ state: 'visible' });
  }

  async clickWhenReady(locator) {
    await this.waitVisible(locator);
    await locator.click();
  }

  async fill(locator, value) {
    await this.waitVisible(locator);
    await locator.fill(value);
  }

  async expectVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async expectText(locator, text) {
    await expect(locator).toHaveText(text);
  }

  async expectURL(pattern) {
    await expect(this.page).toHaveURL(pattern);
  }
}

module.exports = { BasePage };
