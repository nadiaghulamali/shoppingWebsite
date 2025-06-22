import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/utils';
import { addNAvailableProductsToCart, goToCheckout, sumPrices } from '../helpers/cart';
import { cartLocators } from '../locators/placeOrderLocators';

test('Place order by adding any 2 available products from Tees', async ({ page }) => {
    await page.goto(BASE_URL);
    await addNAvailableProductsToCart(page, 2);

    await page.goto(`${BASE_URL}/checkout/cart/`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector(cartLocators.cartItem, { timeout: 10000 });

    const cartItems = page.locator(cartLocators.cartItem);
    await expect(cartItems).toHaveCount(2);

    const prices = await cartItems.locator('td.col.price .price').allTextContents();
    const totalPrice = sumPrices(prices);

    await page.waitForSelector(cartLocators.subtotalPrice, { timeout: 10000 });

    const subtotalText = await page.locator(cartLocators.subtotalPrice).innerText();
    const subtotal = parseFloat(subtotalText?.replace(/[^0-9.]/g, '') || '0');
    expect(totalPrice).toBeCloseTo(subtotal, 2);

    await goToCheckout(page);
    await page.waitForURL(/\/checkout\/?#shipping/, { timeout: 15000 });
    await page.waitForSelector('.checkout-shipping-address', { timeout: 10000 });
    await expect(page).toHaveURL(/checkout/);
    await expect(page).toHaveURL(/\/checkout\/?#shipping/);
    await expect(page.locator('h1')).toHaveText(/checkout/i);
});
