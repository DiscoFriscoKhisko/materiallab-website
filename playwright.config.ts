import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for MaterialLab Website
 * Optimized for visual testing, design validation, and iterative improvement
 */
export default defineConfig({
  testDir: './tests',
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration for visual testing
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results.json' }],
    process.env.CI ? ['dot'] : ['list']
  ],
  
  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:3001',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Capture screenshot on failure
    screenshot: 'only-on-failure',
    
    // Capture video on failure
    video: 'retain-on-failure',
    
    // Global test timeout
    actionTimeout: 10000,
    navigationTimeout: 10000,
  },

  // Test configuration for different scenarios
  projects: [
    // Setup project to start the dev server
    {
      name: 'setup',
      testMatch: /.*setup\.ts/,
    },

    // Desktop Chrome - Primary testing browser
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Enable visual comparison features
        launchOptions: {
          args: ['--font-render-hinting=none'] // Consistent font rendering
        }
      },
      dependencies: ['setup'],
    },

    // Mobile Chrome for responsive testing
    {
      name: 'mobile-chrome',
      use: { 
        ...devices['Pixel 5'],
        // Mobile-specific settings
        hasTouch: true,
      },
      dependencies: ['setup'],
    },

    // Tablet testing
    {
      name: 'tablet',
      use: {
        ...devices['iPad Pro'],
      },
      dependencies: ['setup'],
    },

    // Desktop Firefox
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
    },

    // Desktop Safari
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
    },

    // High DPI testing for design precision
    {
      name: 'high-dpi',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: 2,
      },
      dependencies: ['setup'],
    },

    // Dark theme testing (when implemented)
    {
      name: 'dark-theme',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'dark',
      },
      dependencies: ['setup'],
    },
  ],

  // Web Server configuration - start dev server for testing
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes
  },

  // Global setup and teardown
  globalSetup: './tests/global-setup.ts',
  
  // Test timeout
  timeout: 30 * 1000, // 30 seconds per test
  
  // Expect configuration for visual comparisons
  expect: {
    // Threshold for visual comparisons
    threshold: 0.2, // Allow slight differences
    
    // Screenshot comparison
    toMatchSnapshot: {
      // Pixel difference threshold
      threshold: 0.2,
      // Animation handling
      animations: 'disabled',
    },
  },
});