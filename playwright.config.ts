import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'src/tests',
  workers: 1,
  use: {
    headless: false, 
    browserName: 'chromium',
  },
  
});
