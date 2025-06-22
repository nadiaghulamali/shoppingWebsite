import { expect } from '@playwright/test';
import { cartLocators } from '../locators/placeOrderLocators';
import { BASE_URL } from './utils';

export async function navigateToTees(page) {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  
    await page.hover('a:has-text("Women")');
    await page.waitForSelector('a:has-text("Tops")', { timeout: 5000 });
  
    await page.hover('a:has-text("Tops")');
    await page.waitForSelector('a[href*="tees-women.html"]:has-text("Tees")', { timeout: 5000 });
  
    const teesLink = page.locator('a[href*="tees-women.html"]:has-text("Tees")');
    await expect(teesLink).toBeVisible({ timeout: 5000 });
    await teesLink.click();
  
    await page.waitForSelector('li.product-item', { timeout: 10000 });
  }
  
  export async function selectFirstAvailableSizeAndColor(page) {
    // Wait for size and color blocks to appear
    await page.waitForSelector(cartLocators.sizeBlock, { timeout: 10000 });
    await page.waitForSelector(cartLocators.colorBlock, { timeout: 10000 });
  
    const sizeOptions = page.locator(cartLocators.size);
    const colorOptions = page.locator(cartLocators.color);
  
    let sizeSelected = false;
    const sizeCount = await sizeOptions.count();
  
    for (let i = 0; i < sizeCount; i++) {
      const option = sizeOptions.nth(i);
      if (await option.isVisible() && await option.isEnabled()) {
        await option.scrollIntoViewIfNeeded();
        await option.click({ timeout: 3000 });
        sizeSelected = true;
        break;
      }
    }
  
    let colorSelected = false;
    const colorCount = await colorOptions.count();
  
    for (let i = 0; i < colorCount; i++) {
      const option = colorOptions.nth(i);
      if (await option.isVisible() && await option.isEnabled()) {
        await option.scrollIntoViewIfNeeded();
        await option.click({ timeout: 3000 });
        colorSelected = true;
        break;
      }
    }
  
    if (!sizeSelected || !colorSelected) {
      throw new Error('No available size or color');
    }
  }
  

export async function addNAvailableProductsToCart(page, requiredCount = 2) {
  let added = 0;
  let index = 0;

  while (added < requiredCount) {
    await navigateToTees(page); 

    const products = page.locator('li.product-item');
    const productCount = await products.count();

    if (index >= productCount) {
      throw new Error(`Only ${added} products could be added. No more available.`);
    }

    const product = products.nth(index);
    await product.click();

    try {
      await selectFirstAvailableSizeAndColor(page);
      await page.click(cartLocators.addToCartBtn);
      await page.waitForSelector(cartLocators.successMessage, { timeout: 5000 });
      added++;
    } catch (err) {
      console.warn(`Skipping product ${index}: ${err.message}`);
    }

    index++;
  }
}

export function sumPrices(prices: string[]): number {
    return prices
      .map(p => parseFloat(p.replace(/[^0-9.]/g, '')))
      .reduce((a, b) => a + b, 0);
  }

export async function goToCheckout(page) {
  await page.click(cartLocators.checkoutBtn);
}
