// @ts-check
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open() {
    await this.goto('/');
  }

  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.clickWhenReady(this.loginButton);
  }

  async expectLoginError(message) {
    await this.expectVisible(this.errorMessage);
    await this.expectText(this.errorMessage, message);
  }
}

module.exports = { LoginPage };
