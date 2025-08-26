import { test, expect } from '@playwright/test';

/**
 * Design System Component Tests for Veo Components
 * Validates that Veo components render correctly and maintain design consistency
 */

test.describe('Veo Design System Components', () => {

  test('VeoServiceCard component validation', async ({ page }) => {
    await page.goto('/veo');
    await page.waitForLoadState('networkidle');

    // Scroll to services section
    await page.evaluate(() => {
      const servicesSection = document.querySelector('text=Our Services')?.closest('section');
      servicesSection?.scrollIntoView({ behavior: 'smooth' });
    });

    await page.waitForTimeout(1000);

    // Look for service cards
    const serviceCards = page.locator('[class*="bg-white"][class*="rounded"]');
    const cardCount = await serviceCards.count();
    
    console.log(`Found ${cardCount} service cards`);
    
    if (cardCount > 0) {
      // Test first service card
      const firstCard = serviceCards.first();
      
      // Check card styling
      const cardStyles = await firstCard.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          borderRadius: styles.borderRadius,
          boxShadow: styles.boxShadow,
          padding: styles.padding,
        };
      });
      
      console.log('Service card styles:', cardStyles);
      
      // Card should have white background
      expect(cardStyles.backgroundColor).toContain('rgb(255, 255, 255)');
      
      // Take screenshot of service card
      await expect(firstCard).toHaveScreenshot('veo-service-card.png');
      
      // Test hover effect
      await firstCard.hover();
      await page.waitForTimeout(300);
      await expect(firstCard).toHaveScreenshot('veo-service-card-hover.png');
    }
  });

  test('VeoVideoCard component validation', async ({ page }) => {
    await page.goto('/veo');
    await page.waitForLoadState('networkidle');

    // Scroll to find video cards
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
    await page.waitForTimeout(1000);

    // Look for video cards
    const videoCards = page.locator('video').locator('..');
    const videoCardCount = await videoCards.count();
    
    console.log(`Found ${videoCardCount} video cards`);
    
    if (videoCardCount > 0) {
      const firstVideoCard = videoCards.first();
      
      // Check video card structure
      const hasVideo = await firstVideoCard.locator('video').count() > 0;
      expect(hasVideo).toBe(true);
      
      // Take screenshot of video card
      await expect(firstVideoCard).toHaveScreenshot('veo-video-card.png');
    }
  });

  test('Typography consistency validation', async ({ page }) => {
    await page.goto('/veo');
    await page.waitForLoadState('networkidle');

    // Test hero title typography
    const heroTitle = page.locator('h1').first();
    if (await heroTitle.count() > 0) {
      const titleStyles = await heroTitle.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight,
        };
      });
      
      console.log('Hero title typography:', titleStyles);
      
      // Should use Google Sans or fallback
      expect(titleStyles.fontFamily.toLowerCase()).toMatch(/(google sans|inter|system-ui)/);
      
      // Font size should be large (hero size)
      const fontSize = parseInt(titleStyles.fontSize);
      expect(fontSize).toBeGreaterThan(40); // Should be hero size
    }

    // Test body text typography
    const bodyText = page.locator('p').first();
    if (await bodyText.count() > 0) {
      const bodyStyles = await bodyText.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight,
        };
      });
      
      console.log('Body text typography:', bodyStyles);
    }
  });

  test('Color palette validation', async ({ page }) => {
    await page.goto('/veo');
    await page.waitForLoadState('networkidle');

    // Check primary colors usage
    const primaryElements = page.locator('[class*="bg-blue"], [class*="text-blue"]');
    const primaryCount = await primaryElements.count();
    
    console.log(`Found ${primaryCount} elements using primary blue color`);

    // Check for proper Google Blue usage (#1A73E8)
    if (primaryCount > 0) {
      const firstPrimary = primaryElements.first();
      const primaryColor = await firstPrimary.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
        };
      });
      
      console.log('Primary color usage:', primaryColor);
    }

    // Take screenshot of color usage
    await expect(page.locator('body')).toHaveScreenshot('veo-color-palette.png');
  });

  test('Button component validation', async ({ page }) => {
    await page.goto('/veo');
    await page.waitForLoadState('networkidle');

    // Find primary buttons
    const primaryButtons = page.locator('button, [role="button"]').filter({ hasText: 'View Our Work' });
    
    if (await primaryButtons.count() > 0) {
      const primaryButton = primaryButtons.first();
      
      // Test button styling
      const buttonStyles = await primaryButton.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          borderRadius: styles.borderRadius,
          padding: styles.padding,
          fontWeight: styles.fontWeight,
        };
      });
      
      console.log('Primary button styles:', buttonStyles);
      
      // Take screenshot of button
      await expect(primaryButton).toHaveScreenshot('veo-primary-button.png');
      
      // Test hover state
      await primaryButton.hover();
      await page.waitForTimeout(200);
      await expect(primaryButton).toHaveScreenshot('veo-primary-button-hover.png');
    }

    // Find secondary buttons
    const secondaryButtons = page.locator('button, [role="button"]').filter({ hasText: 'Start a Project' });
    
    if (await secondaryButtons.count() > 0) {
      const secondaryButton = secondaryButtons.first();
      await expect(secondaryButton).toHaveScreenshot('veo-secondary-button.png');
    }
  });

  test('Layout and spacing validation', async ({ page }) => {
    await page.goto('/veo');
    await page.waitForLoadState('networkidle');

    // Check overall page layout
    const pageWidth = await page.evaluate(() => document.body.scrollWidth);
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    
    console.log(`Page dimensions: ${pageWidth}x${pageHeight}`);
    
    // Check for proper container max-widths
    const containers = page.locator('[class*="max-w"]');
    const containerCount = await containers.count();
    
    console.log(`Found ${containerCount} container elements with max-width`);
    
    // Check spacing between sections
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    
    console.log(`Found ${sectionCount} page sections`);
    
    if (sectionCount > 1) {
      // Measure spacing between first two sections
      const firstSection = sections.first();
      const secondSection = sections.nth(1);
      
      const spacing = await page.evaluate((elements) => {
        const first = elements[0];
        const second = elements[1];
        if (first && second) {
          const firstRect = first.getBoundingClientRect();
          const secondRect = second.getBoundingClientRect();
          return secondRect.top - firstRect.bottom;
        }
        return 0;
      }, [await firstSection.elementHandle(), await secondSection.elementHandle()]);
      
      console.log(`Section spacing: ${spacing}px`);
    }
  });

});