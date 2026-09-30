// @ts-check
const { test, expect } = require('../fixtures/pom-fixtures');
const { CUSTOMER } = require('../fixtures/test-data');

test.describe('Checkout', () => {
  test('missing last name blocks progress with an error', async ({
    authenticatedPage: page,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCustomerInfo({ firstName: 'Mary', lastName: '', postalCode: '629001' });
    await checkoutPage.continueToOverview();

    await checkoutPage.expectMissingInfoError('Error: Last Name is required');
  });

  test('tax + subtotal equals the displayed total on the overview step', async ({
    authenticatedPage: page,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCustomerInfo(CUSTOMER);
    await checkoutPage.continueToOverview();
    await expect(page).toHaveURL(/checkout-step-two\.html/);

    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    // Floating point money math — round to 2 decimals before comparing.
    expect(Math.round((subtotal + tax) * 100) / 100).toBeCloseTo(total, 2);
  });

  test('full end-to-end checkout completes an order', async ({
    authenticatedPage: page,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCustomerInfo(CUSTOMER);
    await checkoutPage.continueToOverview();

    await checkoutPage.finishOrder();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await checkoutPage.expectOrderComplete();

    await checkoutPage.backToProducts();
    await expect(page).toHaveURL(/inventory\.html/);
    await inventoryPage.expectCartCount(0);
  });
});
