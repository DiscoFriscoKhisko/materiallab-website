import { test, expect, Page } from '@playwright/test';

/**
 * Visual regression tests for Veo Landing Page
 * This test suite identifies design issues and validates the Veo design system
 */

test.describe('Veo Landing Page Visual Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to Veo landing page
    await page.goto('/veo');
    
    // Wait for page to fully load including any lazy-loaded content
    await page.waitForLoadState('networkidle');
    
    // Disable animations for consistent screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        video {
          display: none !important;
        }
      `
    });
  });

  test('should display navigation bar correctly', async ({ page }) => {
    // Check if navigation exists and is visible
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
    
    // Take screenshot of navigation area
    await expect(navigation).toHaveScreenshot('veo-navigation.png');
    
    // Validate navigation items
    const navItems = ['Services', 'Approach', 'Work', 'About'];
    for (const item of navItems) {
      await expect(page.locator(`text=${item}`)).toBeVisible();
    }
    
    // Check for MaterialLab logo
    await expect(page.locator('text=MaterialLab')).toBeVisible();
    
    // Check for Get Started button
    await expect(page.locator('text=Get Started')).toBeVisible();
  });

  test('should display hero section with proper styling', async ({ page }) => {
    // Wait for hero content to load
    await page.waitForSelector('text=AI Product Studio', { timeout: 10000 });
    
    // Check hero title
    const heroTitle = page.locator('text=AI Product Studio');
    await expect(heroTitle).toBeVisible();
    
    // Check hero subtitle
    const heroSubtitle = page.locator('text=Building next-generation');
    await expect(heroSubtitle).toBeVisible();
    
    // Check CTA buttons
    await expect(page.locator('text=View Our Work')).toBeVisible();
    await expect(page.locator('text=Start a Project')).toBeVisible();
    
    // Take screenshot of hero section
    const heroSection = page.locator('section').first();
    await expect(heroSection).toHaveScreenshot('veo-hero-section.png');
  });

  test('should identify video background issues', async ({ page }) => {
    // Check for video element
    const video = page.locator('video');
    const videoExists = await video.count() > 0;
    
    if (videoExists) {
      // If video exists, check its properties
      const videoSrc = await video.getAttribute('src');
      const videoPoster = await video.getAttribute('poster');
      
      console.log('Video source:', videoSrc);
      console.log('Video poster:', videoPoster);
      
      // Check if video is playing
      const isPlaying = await video.evaluate((v: HTMLVideoElement) => !v.paused);
      console.log('Video playing:', isPlaying);
      
    } else {
      console.log('❌ No video element found in hero section');
    }
    
    // Check background styling
    const heroSection = page.locator('section').first();
    const backgroundStyle = await heroSection.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        backgroundImage: styles.backgroundImage,
        backgroundSize: styles.backgroundSize,
      };
    });
    
    console.log('Hero background styles:', backgroundStyle);
  });

  test('should validate typography and fonts', async ({ page }) => {
    // Check if Google Sans is loading
    const heroTitle = page.locator('text=AI Product Studio');
    
    const fontInfo = await heroTitle.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color,
      };
    });
    
    console.log('Hero title font info:', fontInfo);
    
    // Font family should include 'Google Sans' or fallback to expected fonts
    expect(fontInfo.fontFamily).toMatch(/(Google Sans|Inter|system-ui)/);
    
    // Take screenshot for font rendering comparison
    await expect(heroTitle).toHaveScreenshot('veo-typography.png');
  });

  test('should check for services section', async ({ page }) => {
    // Scroll to services section
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    
    // Wait for services content to load
    await page.waitForTimeout(1000);
    
    // Check for services section
    const servicesSection = page.locator('text=Our Services');
    const servicesSectionExists = await servicesSection.count() > 0;
    
    if (servicesSectionExists) {
      await expect(servicesSection).toBeVisible();
      
      // Take screenshot of services section
      const servicesContainer = page.locator('section').nth(1);
      await expect(servicesContainer).toHaveScreenshot('veo-services-section.png');
      
    } else {
      console.log('❌ Services section not found - content may not be loading');
    }
  });

  test('should validate page layout and responsive design', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('veo-desktop-full-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('veo-mobile-full-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('veo-tablet-full-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should detect color theme issues', async ({ page }) => {
    // Check if the page is using the correct light theme
    const bodyStyles = await page.evaluate(() => {
      const styles = window.getComputedStyle(document.body);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
      };
    });
    
    console.log('Body theme colors:', bodyStyles);
    
    // For Veo theme, background should be white or very light
    const bgColor = bodyStyles.backgroundColor;
    const isLightBackground = bgColor.includes('rgb(255, 255, 255)') || 
                             bgColor.includes('rgba(255, 255, 255') ||
                             bgColor === 'rgba(0, 0, 0, 0)';
    
    if (!isLightBackground) {
      console.log('❌ Dark background detected - should be light for Veo theme');
    }
    
    expect(isLightBackground).toBe(true);
  });

});