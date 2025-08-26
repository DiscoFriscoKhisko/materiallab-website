import { test, expect } from '@playwright/test';

test.describe('Current Website State Debug', () => {
  test('capture current homepage state', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await page.screenshot({ 
      path: 'test-results/current-homepage.png', 
      fullPage: true 
    });

    // Log current HTML structure for hero section
    const heroSection = page.locator('main > *').first();
    const heroHtml = await heroSection.innerHTML();
    console.log('Hero section HTML:', heroHtml.substring(0, 500) + '...');

    // Log navigation structure
    const nav = page.locator('nav');
    const navHtml = await nav.innerHTML();
    console.log('Navigation HTML:', navHtml.substring(0, 300) + '...');

    // Log if VeoStyleHero component is present
    const veoStyleHero = page.locator('[class*="VeoStyleHero"], [class*="VeoVideoCard"]');
    const hasVeoStyle = await veoStyleHero.count();
    console.log('VeoStyleHero components found:', hasVeoStyle);

    // Check what hero component is actually rendered
    const h1Elements = page.locator('h1');
    const h1Count = await h1Elements.count();
    console.log('H1 elements found:', h1Count);
    
    if (h1Count > 0) {
      const h1Text = await h1Elements.first().textContent();
      const h1Classes = await h1Elements.first().getAttribute('class');
      console.log('First H1 text:', h1Text);
      console.log('First H1 classes:', h1Classes);
    }

    // List all components in the main section
    const mainComponents = page.locator('main > *');
    const componentCount = await mainComponents.count();
    console.log('Main components count:', componentCount);
    
    for (let i = 0; i < Math.min(componentCount, 3); i++) {
      const tagName = await mainComponents.nth(i).evaluate(el => el.tagName);
      const className = await mainComponents.nth(i).getAttribute('class');
      console.log(`Component ${i}: <${tagName}> with classes: ${className}`);
    }
  });
});