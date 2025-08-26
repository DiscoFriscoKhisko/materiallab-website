import { test, expect } from '@playwright/test';

test.describe('MaterialLab Design System Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to fully load including all CSS
    await page.waitForLoadState('networkidle');
  });

  test('Landing page uses ML design tokens', async ({ page }) => {
    // Check for ML spacing tokens in computed styles
    const hero = page.locator('[data-testid="hero-section"]').first();
    if (await hero.count() > 0) {
      const paddingTop = await hero.evaluate((el) => 
        getComputedStyle(el).paddingTop
      );
      console.log('Hero padding-top:', paddingTop);
    }

    // Check for ML color tokens
    const buttons = page.locator('button').first();
    if (await buttons.count() > 0) {
      const backgroundColor = await buttons.evaluate((el) => 
        getComputedStyle(el).backgroundColor
      );
      console.log('Button background:', backgroundColor);
    }

    // Check typography uses ML tokens
    const headings = page.locator('h1').first();
    if (await headings.count() > 0) {
      const fontSize = await headings.evaluate((el) => 
        getComputedStyle(el).fontSize
      );
      const fontFamily = await headings.evaluate((el) => 
        getComputedStyle(el).fontFamily
      );
      console.log('H1 font-size:', fontSize);
      console.log('H1 font-family:', fontFamily);
    }
  });

  test('Check ML design tokens are loaded', async ({ page }) => {
    // Check if ML CSS custom properties are defined
    const mlTokens = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        space1: style.getPropertyValue('--ml-space-1'),
        space2: style.getPropertyValue('--ml-space-2'),
        brandCoral: style.getPropertyValue('--ml-brand-sunset-coral'),
        brandBlue: style.getPropertyValue('--ml-brand-ion-blue'),
        textBase: style.getPropertyValue('--ml-text-base'),
      };
    });

    console.log('ML Design Tokens:', mlTokens);
    
    // Verify tokens exist
    expect(mlTokens.space1).toBeTruthy();
    expect(mlTokens.space2).toBeTruthy();
    expect(mlTokens.brandCoral).toBeTruthy();
    expect(mlTokens.brandBlue).toBeTruthy();
  });

  test('Visual snapshot of landing page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for animations to settle
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('landing-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('Visual snapshot of about page', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('about-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('Visual snapshot of services page', async ({ page }) => {
    await page.goto('/services');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('services-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('Visual snapshot of sandbox documentation', async ({ page }) => {
    await page.goto('/sandbox');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('sandbox-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('Check responsive design tokens on mobile', async ({ page, browserName }) => {
    if (browserName !== 'mobile-chrome') return;

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check mobile-specific ML tokens
    const mobileTokens = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        containerWidth: style.getPropertyValue('--ml-container-sm'),
        textBase: style.getPropertyValue('--ml-text-base'),
        space3: style.getPropertyValue('--ml-space-3'),
      };
    });

    console.log('Mobile ML Tokens:', mobileTokens);
    expect(mobileTokens.containerWidth).toBeTruthy();
    expect(mobileTokens.textBase).toBeTruthy();
  });
});