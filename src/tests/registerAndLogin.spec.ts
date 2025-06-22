import { test, expect } from '@playwright/test';
import { BASE_URL, selectors } from '../helpers/utils';

test('Register and login a user successfully', async ({ page }) => {
  const timestamp = Date.now();
  const user = {
    firstName: 'Nadia',
    lastName: 'Ali',
    email: `nadia.${timestamp}@example.com`,
    password: 'Test1234!'
  };

  await page.goto(BASE_URL);
  await page.click(selectors.registerLink);

  await page.fill(selectors.firstName, user.firstName);
  await page.fill(selectors.lastName, user.lastName);
  await page.fill(selectors.email, user.email);
  await page.fill(selectors.password, user.password);
  await page.fill(selectors.confirmPassword, user.password);
  await page.click(selectors.registerButton);

  await expect(page.locator('text=Thank you for registering')).toBeVisible({ timeout: 10000 });

  await page.goto(`${BASE_URL}/customer/account/logout/`);
  await page.waitForLoadState('networkidle');

  await page.click(selectors.loginLink);
  await page.fill(selectors.loginEmail, user.email);
  await page.fill(selectors.loginPassword, user.password);
  await page.click(selectors.loginButton);

  await expect(page.locator(selectors.loginAccountTitle)).toHaveText('My Account');

});
