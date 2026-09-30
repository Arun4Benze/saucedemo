// @ts-check
const { test, expect } = require('../fixtures/pom-fixtures');

test.describe('Inventory', () => {
  // Reuses the pre-authenticated fixture instead of logging in via UI each time.
  test.beforeEach(async ({ authenticatedPage }) => {
    // authenticatedPage IS the `page` — already on /inventory.html
  });

  test('adding an item updates the cart badge', async ({ authenticatedPage: page, inventoryPage }) => {
    await inventoryPage.expectCartCount(0);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.expectCartCount(1);
  });

  test('removing an item updates the cart badge back down', async ({
    authenticatedPage: page,
    inventoryPage,
  }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.expectCartCount(2);

    await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
    await inventoryPage.expectCartCount(1);
  });

  test('sorting price low to high orders items ascending', async ({
    authenticatedPage: page,
    inventoryPage,
  }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('sorting price high to low orders items descending', async ({
    authenticatedPage: page,
    inventoryPage,
  }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('sorting name A to Z orders items alphabetically', async ({
    authenticatedPage: page,
    inventoryPage,
  }) => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getAllNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test('logout returns user to the login page', async ({ authenticatedPage: page, inventoryPage }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
