import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/utils';

test.describe('Search and Result Validation', () => {
    test('Search for "jacket" and validate results', async ({ page }) => {

        await page.goto(BASE_URL);

        const searchTerm = 'jacket';
        await page.fill('input#search', searchTerm);
        await page.press('input#search', 'Enter');

        const productGrid = page.locator('.products-grid');
        await expect(productGrid).toBeVisible();

        const results = productGrid.locator('.product-item');
        const resultCount = await results.count();
        expect(resultCount).toBeGreaterThan(0);

        for (let i = 0; i < resultCount; i++) {
            const title = await results.nth(i).locator('.product-item-name').innerText();
            expect(title.toLowerCase()).toContain(searchTerm);
        }

        console.log(`Found ${resultCount} results for "${searchTerm}"`);
    });
});
