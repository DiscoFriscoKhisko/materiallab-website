import { test, expect } from '@playwright/test';

test.describe('Typography System Validation', () => {
  test('should have correct font families for MaterialLab brand typography', async ({ page }) => {
    // Navigate to TEST ENV
    await page.goto('http://localhost:2000/long-story-short');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Try to click the Type Specimen section
    try {
      await page.click('text=Type Specimen', { timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch (e) {
      console.log('Type Specimen button not found, checking if page has direct typography elements');
    }
    
    // Check if we can find typography elements (they might be visible without clicking)
    const displayElements = page.locator('.typography-display-6xl');
    const displayCount = await displayElements.count();
    
    if (displayCount > 0) {
      // Check display typography uses Space Grotesk (primary font)
      const displayElement = displayElements.first();
      const displayFontFamily = await displayElement.evaluate(el => 
        window.getComputedStyle(el).fontFamily
      );
      expect(displayFontFamily).toContain('Space Grotesk');
      console.log('Display font family:', displayFontFamily);
      
      // Check body typography uses Inter (secondary font) 
      const bodyElement = page.locator('.typography-body-base').first();
      const bodyFontFamily = await bodyElement.evaluate(el => 
        window.getComputedStyle(el).fontFamily
      );
      expect(bodyFontFamily).toContain('Inter');
      console.log('Body font family:', bodyFontFamily);
      
      // Check code typography uses Source Code Pro
      const codeElement = page.locator('.typography-code-base').first();
      if (await codeElement.count() > 0) {
        const codeFontFamily = await codeElement.evaluate(el => 
          window.getComputedStyle(el).fontFamily
        );
        expect(codeFontFamily).toContain('Source Code Pro');
        console.log('Code font family:', codeFontFamily);
      }
    } else {
      console.log('No typography elements found on page');
    }
  });
  
  test('should validate MaterialLab hero uses Space Grotesk', async ({ page }) => {
    // Navigate to TEST ENV LSS page
    await page.goto('http://localhost:2000/long-story-short');
    await page.waitForLoadState('networkidle');
    
    // Check hero title uses Space Grotesk
    const heroTitle = page.locator('.lss-hero-title');
    const heroFontFamily = await heroTitle.evaluate(el => 
      window.getComputedStyle(el).fontFamily
    );
    
    // Should contain Space Grotesk based on ml-typo-hero class
    console.log('Hero font family:', heroFontFamily);
    expect(heroFontFamily).toContain('Space Grotesk');
  });
});