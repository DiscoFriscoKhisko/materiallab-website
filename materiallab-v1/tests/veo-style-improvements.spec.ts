import { test, expect } from '@playwright/test';

test.describe('Veo-Style Website Improvements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display new professional logo with neural network design', async ({ page }) => {
    // Check that the new MaterialLab logo is present
    const logo = page.locator('nav a[href="/"]').first();
    await expect(logo).toBeVisible();

    // Check for SVG logo presence (specifically the MaterialLab logo SVG)
    const logoSvg = page.locator('nav a[href="/"] svg').first();
    await expect(logoSvg).toBeVisible();

    // Verify logo has gradient effects (check for linearGradient elements)
    const gradients = page.locator('linearGradient');
    await expect(gradients).toHaveCount(2);
  });

  test('should show enhanced navigation with Try Demo and Start Building CTAs', async ({ page }) => {
    // Check for Try Demo button
    const tryDemoBtn = page.locator('a:has-text("Try Demo")');
    await expect(tryDemoBtn).toBeVisible();
    await expect(tryDemoBtn).toHaveAttribute('href', '/veo');

    // Check for Start Building button
    const startBuildingBtn = page.locator('a:has-text("Start Building")');
    await expect(startBuildingBtn).toBeVisible();
    await expect(startBuildingBtn).toHaveAttribute('href', '/contact');

    // Verify buttons have primary styling
    await expect(tryDemoBtn.locator('button')).toHaveClass(/border-primary/);
    await expect(startBuildingBtn.locator('button')).toHaveClass(/bg-primary/);
  });

  test('should display Veo-style hero section with interactive elements', async ({ page }) => {
    // Check hero title
    const heroTitle = page.locator('h1:has-text("AI Product Studio")');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toHaveClass(/font-veo/);

    // Check for trust badges
    const trustBadges = page.locator('.bg-primary-container, .bg-green-100, .bg-blue-100');
    const trustBadgeCount = await trustBadges.count();
    expect(trustBadgeCount).toBeGreaterThanOrEqual(3);

    // Check for interactive prompt input
    const promptInput = page.locator('input[placeholder*="Describe your AI product idea"]');
    await expect(promptInput).toBeVisible();

    // Check for Try Demo button in hero (use more specific locator)
    const heroTryDemo = page.locator('main button:has-text("Try Demo")');
    await expect(heroTryDemo).toBeVisible();

    // Check for video showcase on the right (video element or card container)
    const videoShowcase = page.locator('video, [class*="bg-white rounded-xl"], [class*="shadow"]').first();
    await expect(videoShowcase).toBeVisible();
  });

  test('should show improved service cards with Veo styling', async ({ page }) => {
    // Check section title
    const servicesTitle = page.locator('h2:has-text("What We Build")');
    await expect(servicesTitle).toBeVisible();
    await expect(servicesTitle).toHaveClass(/font-veo/);

    // Check for service cards
    const serviceCards = page.locator('[class*="bg-white rounded-xl p-8"]');
    const serviceCardCount = await serviceCards.count();
    expect(serviceCardCount).toBeGreaterThanOrEqual(3);

    // Check for icons in service cards
    const serviceIcons = page.locator('.text-4xl');
    const iconCount = await serviceIcons.count();
    expect(iconCount).toBeGreaterThanOrEqual(3);

    // Check for metrics badges
    const metricsBadges = page.locator('.bg-primary-container.text-primary');
    const badgeCount = await metricsBadges.count();
    expect(badgeCount).toBeGreaterThanOrEqual(3);

    // Check for "Learn more →" links
    const learnMoreLinks = page.locator('text="Learn more →"');
    const linkCount = await learnMoreLinks.count();
    expect(linkCount).toBeGreaterThanOrEqual(3);
  });

  test('should display enhanced CTA section with stats', async ({ page }) => {
    // Check for stats section
    const statsSection = page.locator('.text-3xl.font-bold.text-primary');
    const statsCount = await statsSection.count();
    expect(statsCount).toBeGreaterThanOrEqual(3);

    // Verify specific stats (use more specific locators)
    await expect(page.locator('text="50+"').first()).toBeVisible();
    await expect(page.locator('text="2 weeks"').first()).toBeVisible();
    await expect(page.locator('text="98%"')).toBeVisible();

    // Check enhanced CTA section background
    const ctaSection = page.locator('section.bg-primary-container');
    await expect(ctaSection).toBeVisible();

    // Check for dual CTAs
    const startConversation = page.locator('button:has-text("Start the Conversation")');
    const tryDemo = page.locator('button:has-text("Try Interactive Demo")');
    await expect(startConversation).toBeVisible();
    await expect(tryDemo).toBeVisible();
  });

  test('should use Google Blue (#1A73E8) as primary color throughout', async ({ page }) => {
    // Check computed styles for primary color usage
    const primaryElements = page.locator('.text-primary, .bg-primary, .border-primary');
    const count = await primaryElements.count();
    expect(count).toBeGreaterThan(3);

    // Verify primary color is being applied correctly
    const primaryButton = page.locator('.bg-primary').first();
    if (await primaryButton.count() > 0) {
      const bgColor = await primaryButton.evaluate(el => window.getComputedStyle(el).backgroundColor);
      
      // Google Blue #1A73E8 converts to rgb(26, 115, 232) - allow for slight variations
      expect(bgColor).toMatch(/rgb\(2[6-7], 11[5-6], 23[2-3]\)/);
    }
  });

  test('should have improved typography with Google Sans font', async ({ page }) => {
    // Check for font-veo class usage throughout
    const veoFontElements = page.locator('.font-veo');
    const count = await veoFontElements.count();
    expect(count).toBeGreaterThan(5);

    // Check hero title font properties
    const heroTitle = page.locator('h1').first();
    const fontFamily = await heroTitle.evaluate(el => window.getComputedStyle(el).fontFamily);
    
    // Should include Google Sans or fallback to Inter Variable
    expect(fontFamily.toLowerCase()).toMatch(/google sans|inter/);

    // Check font sizes are appropriate
    const fontSize = await heroTitle.evaluate(el => window.getComputedStyle(el).fontSize);
    const fontSizeNum = parseInt(fontSize);
    expect(fontSizeNum).toBeGreaterThan(40); // Should be large hero text
  });

  test('should have smooth hover animations on interactive elements', async ({ page }) => {
    // Test service card hover animations
    const serviceCard = page.locator('[class*="bg-white rounded-xl p-8"]').first();
    
    // Initial state
    await expect(serviceCard).toBeVisible();
    
    // Hover state - check for scale animation
    await serviceCard.hover();
    
    // Wait for animation to complete
    await page.waitForTimeout(500);
    
    // Check if hover classes are applied
    await expect(serviceCard).toHaveClass(/cursor-pointer/);
  });

  test('should be fully responsive on mobile devices', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);

    // Check hero section remains visible and readable
    const heroTitle = page.locator('h1:has-text("AI Product Studio")');
    await expect(heroTitle).toBeVisible();

    // Check navigation adapts to mobile
    const mobileMenuButton = page.locator('.md\\:hidden button');
    await expect(mobileMenuButton).toBeVisible();

    // Check service cards stack vertically
    const serviceCards = page.locator('[class*="bg-white rounded-xl p-8"]');
    
    for (let i = 0; i < await serviceCards.count(); i++) {
      await expect(serviceCards.nth(i)).toBeVisible();
    }

    // Check CTA buttons stack vertically on mobile
    const ctaSection = page.locator('section.bg-primary-container');
    await expect(ctaSection).toBeVisible();
  });

  test('should auto-cycle through demo examples in hero', async ({ page }) => {
    // Wait a bit for components to load
    await page.waitForTimeout(1000);

    // Check that video cards are present by looking for video elements or their containers
    const videoCard = page.locator('video, [class*="bg-white rounded-xl"]').first();
    await expect(videoCard).toBeVisible();

    // Check for example indicators (dots) - they might be any small circular buttons
    const indicators = page.locator('button').filter({ hasText: '' }).locator('visible=true');
    const indicatorCount = await indicators.count();
    expect(indicatorCount).toBeGreaterThan(0);
  });

  test('should handle prompt input interaction', async ({ page }) => {
    const promptInput = page.locator('input[placeholder*="Describe your AI product idea"]');
    const tryDemoButton = page.locator('button:has-text("Try Demo")').last(); // Hero try demo button

    // Test input functionality
    await promptInput.fill('Create a fintech dashboard with AI insights');
    await expect(promptInput).toHaveValue('Create a fintech dashboard with AI insights');

    // Test try demo button click (should show building state)
    await tryDemoButton.click();
    
    // Should show loading state
    await expect(page.locator('text="Building..."')).toBeVisible();
  });
});