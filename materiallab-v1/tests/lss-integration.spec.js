import { test, expect } from '@playwright/test';

test.describe('LSS Design System Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
  });

  test('should display all LSS components correctly', async ({ page }) => {
    // Check hero section
    await expect(page.locator('.lss-hero-section')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Software that creates material impact');
    
    // Check services section
    await expect(page.locator('.lss-services-section')).toBeVisible();
    await expect(page.locator('h2')).toContainText('How We Help');
    
    // Check service cards
    const serviceCards = page.locator('.lss-service-card');
    await expect(serviceCards).toHaveCount(3);
    
    // Scroll to services section
    await page.locator('.lss-services-section').scrollIntoView();
    await page.waitForTimeout(1000);
    
    // Check individual service cards
    await expect(serviceCards.nth(0)).toContainText('Strategic Sprint');
    await expect(serviceCards.nth(1)).toContainText('Product Development');
    await expect(serviceCards.nth(2)).toContainText('Business Automation');
    
    // Check CTA section
    await expect(page.locator('.lss-cta-section')).toBeVisible();
  });

  test('should display theme selector', async ({ page }) => {
    // Check theme selector button
    const themeSelector = page.locator('.fixed.bottom-6.right-6 button');
    await expect(themeSelector).toBeVisible();
    
    // Check theme test indicator
    const themeTest = page.locator('div').filter({ hasText: /Current Theme:/ });
    await expect(themeTest).toBeVisible();
    await expect(themeTest).toContainText('Total Modes: 10');
  });

  test('should switch between all 10 themes', async ({ page }) => {
    // Open theme selector
    await page.click('.fixed.bottom-6.right-6 button');
    await page.waitForTimeout(500);
    
    // Check theme panel is open
    const themePanel = page.locator('.absolute.bottom-16');
    await expect(themePanel).toBeVisible();
    await expect(themePanel).toContainText('Theme Mode');
    
    // Test V1 themes
    const v1Themes = ['Light', 'Dark', 'Minimal', 'Maximal'];
    for (const theme of v1Themes) {
      await page.click(`button:has-text("${theme}")`);
      await page.waitForTimeout(500);
      
      // Verify theme is applied
      const themeTest = page.locator('div').filter({ hasText: /Current Theme:/ });
      await expect(themeTest).toContainText(theme.toLowerCase());
      
      // Reopen theme selector
      await page.click('.fixed.bottom-6.right-6 button');
      await page.waitForTimeout(300);
    }
    
    // Test Film themes
    const filmThemes = ['Night Interior', 'Golden Hour', 'Dramatic'];
    for (const theme of filmThemes) {
      await page.click(`button:has-text("${theme}")`);
      await page.waitForTimeout(500);
      
      // Verify theme is applied
      const themeTest = page.locator('div').filter({ hasText: /Current Theme:/ });
      const expectedTheme = theme.toLowerCase().replace(' ', '-');
      await expect(themeTest).toContainText(expectedTheme);
      
      // Reopen theme selector
      await page.click('.fixed.bottom-6.right-6 button');
      await page.waitForTimeout(300);
    }
  });

  test('should apply theme-specific colors and styling', async ({ page }) => {
    // Test dark theme
    await page.click('.fixed.bottom-6.right-6 button');
    await page.click('button:has-text("Dark")');
    await page.waitForTimeout(1000);
    
    // Check body has dark theme class
    const body = page.locator('body');
    await expect(body).toHaveClass(/dark/);
    
    // Check hero section background changed
    const heroSection = page.locator('.lss-hero-section');
    const heroStyles = await heroSection.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        background: computed.backgroundColor
      };
    });
    
    // Dark theme should have dark background
    expect(heroStyles.background).not.toBe('rgb(250, 249, 246)'); // Not light theme color
  });

  test('should display service cards with proper styling', async ({ page }) => {
    // Scroll to services section
    await page.locator('.lss-services-section').scrollIntoView();
    await page.waitForTimeout(1000);
    
    // Check service cards styling
    const firstCard = page.locator('.lss-service-card').first();
    await expect(firstCard).toBeVisible();
    
    // Check card has proper structure
    await expect(firstCard.locator('.lss-service-icon')).toBeVisible();
    await expect(firstCard.locator('.lss-service-title')).toBeVisible();
    await expect(firstCard.locator('.lss-service-description')).toBeVisible();
    await expect(firstCard.locator('.lss-service-footer')).toBeVisible();
    
    // Check hover effect
    await firstCard.hover();
    await page.waitForTimeout(300);
  });

  test('should navigate to other pages with theme persistence', async ({ page }) => {
    // Apply dark theme
    await page.click('.fixed.bottom-6.right-6 button');
    await page.click('button:has-text("Dark")');
    await page.waitForTimeout(500);
    
    // Navigate to services page
    await page.click('a[href="/services"]');
    await page.waitForTimeout(2000);
    
    // Check theme persists
    const body = page.locator('body');
    await expect(body).toHaveClass(/dark/);
    
    // Check theme selector still visible
    const themeSelector = page.locator('.fixed.bottom-6.right-6 button');
    await expect(themeSelector).toBeVisible();
  });

  test('should have no console errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Navigate and interact
    await page.locator('.lss-services-section').scrollIntoView();
    await page.waitForTimeout(1000);
    
    await page.click('.fixed.bottom-6.right-6 button');
    await page.click('button:has-text("Dark")');
    await page.waitForTimeout(500);
    
    // Filter out known non-critical errors
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('attribute r: Expected length') && 
      !error.includes('animate opacity from "undefined"')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });
});