import { test, expect } from '@playwright/test';
import { DesignAnalyzer } from './utils/design-analyzer';

test.describe('Multimodal Visual Design Analysis', () => {
  test('capture and analyze homepage screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Capture full page screenshot for visual analysis
    const screenshotPath = 'test-results/homepage-analysis.png';
    await page.screenshot({ 
      path: screenshotPath, 
      fullPage: true 
    });

    console.log(`📸 Screenshot captured: ${screenshotPath}`);
    console.log('🔍 Ready for multimodal analysis with Claude Code vision capabilities');
    
    // DOM-based analysis (current approach)
    const heroTitle = page.locator('h1').first();
    const titleText = await heroTitle.textContent();
    const titleClasses = await heroTitle.getAttribute('class');
    
    console.log('Hero Title Analysis:');
    console.log(`  Text: "${titleText}"`);
    console.log(`  Classes: ${titleClasses}`);
    
    // Color analysis via computed styles
    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    console.log(`  Background Color: ${bgColor}`);
    
    // Layout structure analysis
    const sections = await page.locator('main > section').count();
    console.log(`  Main Sections: ${sections}`);
    
    // Navigation analysis
    const navLinks = await page.locator('nav a').count();
    console.log(`  Navigation Links: ${navLinks}`);
    
    // CTA button analysis
    const ctaButtons = await page.locator('button:has-text("Try Demo"), button:has-text("Start Building")').count();
    console.log(`  CTA Buttons: ${ctaButtons}`);

    // This test passes - ready for screenshot analysis by Claude Code vision
    expect(titleText).toBeTruthy();
  });

  test('mobile screenshot analysis', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const mobileScreenshot = 'test-results/mobile-homepage.png';
    await page.screenshot({ 
      path: mobileScreenshot, 
      fullPage: true 
    });
    
    console.log(`📱 Mobile screenshot captured: ${mobileScreenshot}`);
    console.log('Ready for mobile design analysis');
    
    expect(true).toBe(true); // Pass test for screenshot capture
  });

  test('desktop vs mobile comparison screenshots', async ({ page }) => {
    // Desktop screenshot
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/desktop-homepage.png', fullPage: true });
    
    // Tablet screenshot  
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/tablet-homepage.png', fullPage: true });
    
    // Mobile screenshot
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload(); 
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/mobile-homepage.png', fullPage: true });
    
    console.log('📊 Responsive design screenshots captured:');
    console.log('  - Desktop: test-results/desktop-homepage.png');
    console.log('  - Tablet: test-results/tablet-homepage.png'); 
    console.log('  - Mobile: test-results/mobile-homepage.png');
    console.log('🎨 Ready for multimodal responsive design analysis');
    
    expect(true).toBe(true);
  });
});