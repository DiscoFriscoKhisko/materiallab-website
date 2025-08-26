import { test, expect } from '@playwright/test';

/**
 * End-to-End User Journey Tests
 * Tests complete user flows and interactions across the MaterialLab website
 */

test.describe('User Journey Tests', () => {

  test('complete user journey: landing → services → contact', async ({ page }) => {
    console.log('🚀 Testing complete user journey...');

    // Step 1: Start from home page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of homepage
    await expect(page).toHaveScreenshot('journey-01-homepage.png');
    
    // Step 2: Navigate to services
    const servicesLink = page.locator('text=Services').first();
    await expect(servicesLink).toBeVisible();
    await servicesLink.click();
    
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*services/);
    await expect(page).toHaveScreenshot('journey-02-services.png');
    
    // Step 3: Navigate to contact from services
    const contactButton = page.locator('text=Get Started').first();
    if (await contactButton.count() > 0) {
      await contactButton.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/.*contact/);
      await expect(page).toHaveScreenshot('journey-03-contact.png');
    }
  });

  test('veo landing page user journey', async ({ page }) => {
    console.log('🎨 Testing Veo landing page journey...');

    // Navigate to Veo page
    await page.goto('/veo');
    await page.waitForLoadState('networkidle');
    
    // Take initial screenshot
    await expect(page).toHaveScreenshot('veo-journey-01-initial.png');
    
    // Test hero CTA buttons
    const primaryCTA = page.locator('text=View Our Work').first();
    const secondaryCTA = page.locator('text=Start a Project').first();
    
    if (await primaryCTA.count() > 0) {
      // Test primary CTA hover
      await primaryCTA.hover();
      await page.waitForTimeout(300);
      await expect(page.locator('section').first()).toHaveScreenshot('veo-journey-02-cta-hover.png');
    }
    
    // Test scrolling behavior
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('veo-journey-03-scroll.png');
    
    // Continue scrolling to see all sections
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('veo-journey-04-services-section.png');
    
    // Test navigation from Veo page
    const aboutLink = page.locator('text=About').first();
    if (await aboutLink.count() > 0) {
      await aboutLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/.*about/);
    }
  });

  test('mobile user journey', async ({ page }) => {
    console.log('📱 Testing mobile user experience...');

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to home page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take mobile homepage screenshot
    await expect(page).toHaveScreenshot('mobile-journey-01-home.png');
    
    // Test mobile navigation (if hamburger menu exists)
    const mobileMenu = page.locator('[aria-label*="menu"], .hamburger, [class*="hamburger"]');
    if (await mobileMenu.count() > 0) {
      await mobileMenu.click();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot('mobile-journey-02-menu-open.png');
    }
    
    // Navigate to Veo page on mobile
    await page.goto('/veo');
    await page.waitForLoadState('networkidle');
    
    // Test mobile Veo experience
    await expect(page).toHaveScreenshot('mobile-journey-03-veo.png');
    
    // Test mobile scrolling
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('mobile-journey-04-veo-scroll.png');
  });

  test('cross-page navigation consistency', async ({ page }) => {
    console.log('🧭 Testing navigation consistency...');

    const pages = [
      { path: '/', name: 'Home' },
      { path: '/veo', name: 'Veo' },
      { path: '/services', name: 'Services' },
      { path: '/work', name: 'Work' },
      { path: '/about', name: 'About' },
      { path: '/contact', name: 'Contact' }
    ];

    for (const { path, name } of pages) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot of each page
      await expect(page).toHaveScreenshot(`navigation-${name.toLowerCase()}-page.png`);
      
      // Check that navigation is consistent
      const navigation = page.locator('nav').first();
      if (await navigation.count() > 0) {
        await expect(navigation).toHaveScreenshot(`navigation-${name.toLowerCase()}-nav.png`);
      }
      
      // Verify page loads without errors
      const errorElements = page.locator('text=Error, text=404, text="Not Found"');
      const hasError = await errorElements.count() > 0;
      expect(hasError).toBe(false);
      
      console.log(`   ✓ ${name} page loaded successfully`);
    }
  });

  test('interactive elements functionality', async ({ page }) => {
    console.log('🖱️ Testing interactive elements...');

    await page.goto('/veo');
    await page.waitForLoadState('networkidle');

    // Test button interactions
    const buttons = page.locator('button, [role="button"]');
    const buttonCount = await buttons.count();
    
    console.log(`Found ${buttonCount} interactive buttons`);

    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      const buttonText = await button.textContent();
      
      // Test hover state
      await button.hover();
      await page.waitForTimeout(200);
      
      // Test focus state
      await button.focus();
      await page.waitForTimeout(200);
      
      console.log(`   ✓ Tested button: "${buttonText}"`);
    }

    // Test video elements if they exist
    const videos = page.locator('video');
    const videoCount = await videos.count();
    
    if (videoCount > 0) {
      console.log(`Found ${videoCount} video elements`);
      
      const firstVideo = videos.first();
      
      // Check video properties
      const videoInfo = await firstVideo.evaluate((video: HTMLVideoElement) => ({
        src: video.src,
        autoplay: video.autoplay,
        muted: video.muted,
        loop: video.loop,
        paused: video.paused,
        currentTime: video.currentTime,
      }));
      
      console.log('Video properties:', videoInfo);
    }
  });

  test('form interactions and validation', async ({ page }) => {
    console.log('📝 Testing form interactions...');

    // Navigate to contact page
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    
    // Look for contact forms
    const forms = page.locator('form');
    const formCount = await forms.count();
    
    if (formCount > 0) {
      console.log(`Found ${formCount} forms`);
      
      const firstForm = forms.first();
      
      // Test form fields
      const nameInput = firstForm.locator('input[name="name"], input[placeholder*="name" i]').first();
      const emailInput = firstForm.locator('input[name="email"], input[type="email"]').first();
      const messageInput = firstForm.locator('textarea, input[name="message"]').first();
      
      if (await nameInput.count() > 0) {
        await nameInput.fill('Test User');
        await expect(nameInput).toHaveValue('Test User');
      }
      
      if (await emailInput.count() > 0) {
        await emailInput.fill('test@example.com');
        await expect(emailInput).toHaveValue('test@example.com');
      }
      
      if (await messageInput.count() > 0) {
        await messageInput.fill('Test message from automated test');
      }
      
      // Take screenshot of filled form
      await expect(firstForm).toHaveScreenshot('contact-form-filled.png');
      
      console.log('✓ Form interaction test completed');
    } else {
      console.log('ℹ️ No forms found on contact page');
    }
  });

});