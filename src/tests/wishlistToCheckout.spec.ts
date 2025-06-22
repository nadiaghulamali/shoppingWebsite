import { test, expect } from '@playwright/test';
import { BASE_URL, selectors } from '../helpers/utils';
import { login } from '../helpers/auth';
import { goToCheckout } from '../helpers/cart';
import { addProductToWishlist } from '../helpers/wishlist';

test('Add product to Wishlist and checkout from Wishlist', async ({ page }) => {

    await page.goto(`${BASE_URL}/customer/account/login`);
    await login(page);
    await expect(page.locator(selectors.loginAccountTitle)).toHaveText('My Account');

    await addProductToWishlist(page, 0);

    await page.goto(`${BASE_URL}/wishlist`);
    const wishlistItem = page.locator('.products-grid .product-item');
    await expect(wishlistItem).toHaveCount(1);

    const addToCartBtn = wishlistItem.locator('button[title="Add to Cart"]');
    await addToCartBtn.click();

    const sizeOptions = page.locator('div.swatch-attribute.size div.swatch-option');
    if (await sizeOptions.count() > 0) await sizeOptions.first().click();

    const colorOptions = page.locator('div.swatch-attribute.color div.swatch-option');
    if (await colorOptions.count() > 0) await colorOptions.first().click();

    await page.click('button[title="Add to Cart"]');

    await page.goto(`${BASE_URL}/checkout/cart/`);

    await goToCheckout(page);

    await expect(page).toHaveURL(/checkout/);
    await expect(page.locator('h1')).toHaveText(/checkout/i);
});
