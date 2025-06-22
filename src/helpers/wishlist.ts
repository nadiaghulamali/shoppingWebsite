

export async function addProductToWishlist(page, productIndex = 0) {
    // Go to product listing (e.g., Tees)
    await page.goto('https://magento.softwaretestingboard.com/women/tops-women/tees-women.html');
  
    const product = page.locator('li.product-item').nth(productIndex);
    await product.hover();
  
    const wishlistBtn = product.locator('a[title="Add to Wish List"]');
    await wishlistBtn.click();
  
    // Wait for success message
    await page.waitForSelector('.message-success');
  }
  