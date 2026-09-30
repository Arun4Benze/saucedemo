// @ts-check
const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);

    // Step One: customer information
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Step Two: order overview
    this.summaryItems = page.locator('.cart_item');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');

    // Step Three: confirmation
    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillCustomerInfo({ firstName, lastName, postalCode }) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
  }

  async continueToOverview() {
    await this.clickWhenReady(this.continueButton);
  }

  async expectMissingInfoError(message) {
    await this.expectVisible(this.errorMessage);
    await this.expectText(this.errorMessage, message);
  }

  async getSubtotal() {
    const text = await this.subtotalLabel.textContent();
    return parseFloat((text || '').replace('Item total: $', ''));
  }

  async getTax() {
    const text = await this.taxLabel.textContent();
    return parseFloat((text || '').replace('Tax: $', ''));
  }

  async getTotal() {
    const text = await this.totalLabel.textContent();
    return parseFloat((text || '').replace('Total: $', ''));
  }

  async finishOrder() {
    await this.clickWhenReady(this.finishButton);
  }

  async expectOrderComplete() {
    await this.expectVisible(this.completeHeader);
    await this.expectText(this.completeHeader, 'Thank you for your order!');
  }

  async backToProducts() {
    await this.clickWhenReady(this.backHomeButton);
  }
}

module.exports = { CheckoutPage };
