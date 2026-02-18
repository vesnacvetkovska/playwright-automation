// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 60 *1000,
  expect: {
      timeout: 6000
  },
  reporter:'html',
  
  use: {
   browserName: 'chromium',
   headless: true,
   screenshot: 'on',
   trace: 'on', //off/on / retain-on-failure
  },

});
module.exports = config 
