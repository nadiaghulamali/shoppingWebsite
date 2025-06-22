import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'src/tests',
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  workers: 1,
  use: {
    headless: false, 
    browserName: 'chromium',
  },
  
});
