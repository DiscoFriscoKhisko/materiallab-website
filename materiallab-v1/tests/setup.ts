import { test as setup, expect } from '@playwright/test';

/**
 * Setup test to ensure the development environment is properly configured
 * This runs before all other tests to validate the testing environment
 */
setup('validate test environment', async ({ page }) => {
  console.log('🔍 Validating MaterialLab test environment...');

  // Navigate to homepage
  await page.goto('/');

  // Wait for the page to load completely
  await page.waitForLoadState('networkidle');

  // Check that the basic page structure exists
  await expect(page.locator('body')).toBeVisible();

  // Validate that CSS is loaded (check for styled elements)
  const hasStyles = await page.evaluate(() => {
    const element = document.body;
    const styles = window.getComputedStyle(element);
    return styles.backgroundColor !== 'rgba(0, 0, 0, 0)' || 
           styles.fontFamily !== 'Times' || // Default browser font
           styles.fontSize !== '16px';
  });

  expect(hasStyles).toBe(true);

  console.log('✅ Environment validation complete');
});

setup('validate Veo page loads', async ({ page }) => {
  console.log('🎨 Validating Veo design system page...');

  // Navigate to Veo landing page
  await page.goto('/veo');

  // Wait for page load
  await page.waitForLoadState('networkidle');

  // Check that the page loads without errors
  await expect(page.locator('body')).toBeVisible();

  // Look for key Veo elements (even if not styled correctly yet)
  const pageContent = await page.textContent('body');
  expect(pageContent).toContain('AI Product Studio');

  console.log('✅ Veo page validation complete');
});

setup('validate navigation consistency', async ({ page }) => {
  console.log('🧭 Validating navigation across pages...');

  const pages = ['/', '/veo', '/services', '/work', '/about', '/contact'];
  
  for (const pagePath of pages) {
    await page.goto(pagePath);
    await page.waitForLoadState('networkidle');
    
    // Check that page loads without 404
    const is404 = await page.locator('text=404').count() > 0;
    expect(is404).toBe(false);
    
    console.log(`   ✓ ${pagePath} loads successfully`);
  }

  console.log('✅ Navigation validation complete');
});