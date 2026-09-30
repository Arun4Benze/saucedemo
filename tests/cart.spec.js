// @ts-check
const { test, expect } = require('../fixtures/pom-fixtures');

test.describe('Cart', () => {
  test('cart reflects items added from inventory', async ({
    authenticatedPage: page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Fleece Jacket');

    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart\.html/);
    await cartPage.expectItemCount(2);
  });

  test('removing an item from the cart page updates the count', async ({
    authenticatedPage: page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
    await inventoryPage.openCart();

    await cartPage.removeItem('Sauce Labs Backpack');
    await cartPage.expectItemCount(1);
  });

  test('continue shopping returns to the inventory page', async ({
    authenticatedPage: page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();

    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('proceeding to checkout navigates to step one', async ({
    authenticatedPage: page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();

    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });
});
