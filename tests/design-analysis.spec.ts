import { test, expect } from '@playwright/test';
import { DesignAnalyzer } from './utils/design-analyzer';

test.describe('VeoLanding Design Analysis', () => {
  test('should analyze VeoLanding page for design issues', async ({ page }) => {
    // Navigate to VeoLanding page
    await page.goto('/veo');
    await page.waitForLoadState('networkidle');

    // Create design analyzer instance
    const analyzer = new DesignAnalyzer(page);
    
    // Run analysis
    const issues = await analyzer.analyzeVeoLandingPage();
    
    // Generate and log report
    const report = analyzer.generateReport();
    console.log(report);
    
    // Assertions for critical issues (should be resolved now)
    const criticalIssues = issues.filter(issue => issue.type === 'critical');
    const navigationIssues = criticalIssues.filter(issue => issue.category === 'navigation');
    
    // Navigation should now be working
    expect(navigationIssues.length).toBe(0);
    
    // Check that we have fewer overall issues than before
    expect(issues.length).toBeLessThan(10);
    
    // Log results for debugging
    console.log(`Found ${issues.length} total issues (${criticalIssues.length} critical)`);
  });

  test('should verify Typography improvements', async ({ page }) => {
    await page.goto('/veo');
    await page.waitForLoadState('networkidle');

    // Check hero title typography
    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible();

    const fontInfo = await heroTitle.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
      };
    });

    console.log('Hero title font info:', fontInfo);
    
    // Should be using Google Sans now
    expect(fontInfo.fontFamily.toLowerCase()).toContain('google sans');
    
    // Should be larger than 40px (design analyzer threshold)
    const fontSize = parseInt(fontInfo.fontSize);
    expect(fontSize).toBeGreaterThan(40);
  });

  test('should verify Navigation is present', async ({ page }) => {
    await page.goto('/veo');
    await page.waitForLoadState('networkidle');

    // Check that navigation exists
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();

    // Check that MaterialLab logo is visible in navigation (more specific locator)
    const logo = page.locator('nav').locator('text=MaterialLab');
    await expect(logo).toBeVisible();
  });
});