// @ts-check
const { test, expect } = require('../fixtures/pom-fixtures');
const { USERS } = require('../fixtures/test-data');

test.describe('Login', () => {
  test('standard user can log in successfully', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await page.waitForURL('**/inventory.html');
    await inventoryPage.expectLoaded();
  });

  test('locked out user sees an error message', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);

    await loginPage.expectLoginError('Epic sadface: Sorry, this user has been locked out.');
  });

  test('empty credentials show a required-field error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('', '');

    await loginPage.expectLoginError('Epic sadface: Username is required');
  });

  test('wrong password shows a generic auth error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(USERS.standard.username, 'wrong_password');

    await loginPage.expectLoginError(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });
});
