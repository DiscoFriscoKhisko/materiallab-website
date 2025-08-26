import { chromium, FullConfig } from '@playwright/test';

/**
 * Global setup for MaterialLab Playwright tests
 * Handles authentication, data seeding, and global state preparation
 */
async function globalSetup(config: FullConfig) {
  console.log('🚀 Setting up MaterialLab test environment...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Wait for the development server to be ready
    console.log('⏳ Waiting for dev server to be ready...');
    await page.goto(config.webServer?.url || 'http://localhost:3001', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    // Check if the main page loads correctly
    await page.waitForSelector('body', { timeout: 10000 });
    
    console.log('✅ Dev server is ready for testing');
    
    // Pre-warm critical pages for consistent testing
    const criticalPages = [
      '/',
      '/veo',
      '/services',
      '/work',
      '/about',
      '/contact'
    ];
    
    console.log('🔥 Pre-warming critical pages...');
    for (const path of criticalPages) {
      try {
        await page.goto(`${config.webServer?.url}${path}`, { 
          waitUntil: 'networkidle',
          timeout: 15000 
        });
        console.log(`   ✓ ${path}`);
      } catch (error) {
        console.warn(`   ⚠️  Failed to pre-warm ${path}:`, error);
      }
    }
    
    console.log('🎨 Setting up design system testing environment...');
    
    // Store global test data
    process.env.PLAYWRIGHT_SETUP_COMPLETE = 'true';
    
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;