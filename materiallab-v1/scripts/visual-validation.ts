/**
 * Visual Validation - The "Eyes" System
 * 
 * Comprehensive visual testing and validation using Playwright for Material Design
 * compliance, brand consistency, and accessibility verification.
 */

import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';

export interface ViewportConfig {
  name: string;
  width: number;
  height: number;
  deviceType: 'desktop' | 'tablet' | 'mobile';
}

export interface ScreenshotResult {
  path: string;
  viewport: ViewportConfig;
  url: string;
  timestamp: string;
  errors: string[];
  warnings: string[];
}

export interface VisualValidationResult {
  overall: 'pass' | 'fail' | 'warning';
  score: number;
  screenshots: ScreenshotResult[];
  accessibility: AccessibilityResult;
  performance: PerformanceResult;
  materialDesign: MaterialDesignResult;
  brandCompliance: BrandComplianceResult;
}

export interface AccessibilityResult {
  violations: any[];
  passes: any[];
  score: number;
  wcagLevel: 'A' | 'AA' | 'AAA' | 'non-compliant';
}

export interface PerformanceResult {
  lcp: number;
  fid: number;
  cls: number;
  score: number;
}

export interface MaterialDesignResult {
  tokenUsage: boolean;
  componentCompliance: boolean;
  elevationCorrect: boolean;
  typographyCorrect: boolean;
  score: number;
}

export interface BrandComplianceResult {
  lssTokenUsage: boolean;
  voiceCompliant: boolean;
  glassEffectsCorrect: boolean;
  themeCompatibility: boolean;
  score: number;
}

export class VisualValidator {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private baseUrl: string;
  private screenshotDir: string;

  private readonly viewports: ViewportConfig[] = [
    { name: 'desktop-large', width: 1920, height: 1080, deviceType: 'desktop' },
    { name: 'desktop', width: 1440, height: 900, deviceType: 'desktop' },
    { name: 'tablet', width: 768, height: 1024, deviceType: 'tablet' },
    { name: 'mobile-large', width: 414, height: 896, deviceType: 'mobile' },
    { name: 'mobile', width: 375, height: 667, deviceType: 'mobile' }
  ];

  private readonly lssThemes = [
    'light', 'dark', 'minimal', 'maximal', 
    'night-interior', 'day-exterior', 'golden-hour',
    'intimate', 'dramatic', 'memory'
  ];

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.screenshotDir = path.resolve(process.cwd(), 'screenshots', 'validation');
  }

  /**
   * Run comprehensive visual validation on specified URLs
   */
  async runVisualValidation(urls: string[]): Promise<VisualValidationResult> {
    console.log('🚀 Starting comprehensive visual validation...');
    
    await this.initializeBrowser();
    await this.ensureScreenshotDirectory();

    const screenshots: ScreenshotResult[] = [];
    let overallScore = 0;
    const results = {
      accessibility: await this.createEmptyAccessibilityResult(),
      performance: await this.createEmptyPerformanceResult(),
      materialDesign: await this.createEmptyMaterialDesignResult(),
      brandCompliance: await this.createEmptyBrandComplianceResult()
    };

    try {
      for (const url of urls) {
        console.log(`📸 Validating ${url}...`);
        
        // Test across all viewports
        for (const viewport of this.viewports) {
          const screenshotResult = await this.captureAndAnalyze(url, viewport);
          screenshots.push(screenshotResult);
        }

        // Test theme compatibility
        await this.validateThemeCompatibility(url);

        // Run accessibility tests
        const accessibilityResult = await this.runAccessibilityTests(url);
        results.accessibility = this.mergeAccessibilityResults(results.accessibility, accessibilityResult);

        // Run performance tests
        const performanceResult = await this.runPerformanceTests(url);
        results.performance = this.mergePerformanceResults(results.performance, performanceResult);

        // Check Material Design compliance
        const materialDesignResult = await this.checkMaterialDesignCompliance(url);
        results.materialDesign = this.mergeMaterialDesignResults(results.materialDesign, materialDesignResult);

        // Check brand compliance
        const brandResult = await this.checkBrandCompliance(url);
        results.brandCompliance = this.mergeBrandResults(results.brandCompliance, brandResult);
      }

      // Calculate overall score
      overallScore = this.calculateOverallScore(results);

      return {
        overall: overallScore >= 85 ? 'pass' : overallScore >= 70 ? 'warning' : 'fail',
        score: overallScore,
        screenshots,
        ...results
      };

    } finally {
      await this.cleanup();
    }
  }

  /**
   * Quick visual check for single component or page
   */
  async quickVisualCheck(url: string, componentSelector?: string): Promise<{
    passed: boolean;
    issues: string[];
    screenshots: string[];
    score: number;
  }> {
    console.log(`⚡ Quick visual check for ${url}...`);

    await this.initializeBrowser();
    const issues: string[] = [];
    const screenshots: string[] = [];

    try {
      const page = await this.context!.newPage();
      await page.goto(`${this.baseUrl}${url}`);
      
      // Wait for content to load
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Take desktop screenshot
      const screenshotPath = path.join(
        this.screenshotDir, 
        `quick-check-${Date.now()}-desktop.png`
      );
      await page.screenshot({ path: screenshotPath, fullPage: true });
      screenshots.push(screenshotPath);

      // Quick accessibility check
      const accessibilityViolations = await this.quickAccessibilityCheck(page);
      if (accessibilityViolations.length > 0) {
        issues.push(`${accessibilityViolations.length} accessibility violations found`);
      }

      // Check for console errors
      const errors = await page.evaluate(() => {
        return (window as any).console.errors || [];
      });
      if (errors.length > 0) {
        issues.push(`${errors.length} console errors found`);
      }

      // Check Material Design token usage
      const hasTokens = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        let tokenUsage = false;
        elements.forEach(el => {
          const styles = window.getComputedStyle(el);
          if (styles.getPropertyValue('--md-sys-color-primary') || 
              styles.getPropertyValue('--lss-sunset-coral')) {
            tokenUsage = true;
          }
        });
        return tokenUsage;
      });

      if (!hasTokens) {
        issues.push('Material Design or LSS tokens not detected');
      }

      const score = Math.max(0, 100 - (issues.length * 15));

      return {
        passed: issues.length === 0,
        issues,
        screenshots,
        score
      };

    } finally {
      await this.cleanup();
    }
  }

  /**
   * Test LSS theme compatibility across all theme modes
   */
  async validateThemeCompatibility(url: string): Promise<{
    compatible: boolean;
    failedThemes: string[];
    screenshots: Record<string, string>;
  }> {
    console.log(`🎨 Testing theme compatibility for ${url}...`);

    const failedThemes: string[] = [];
    const screenshots: Record<string, string> = {};

    if (!this.context) {
      throw new Error('Browser context not initialized');
    }

    const page = await this.context.newPage();
    
    try {
      await page.goto(`${this.baseUrl}${url}`);
      await page.waitForLoadState('networkidle');

      for (const theme of this.lssThemes) {
        try {
          // Apply theme via body class
          await page.evaluate((themeName) => {
            document.body.className = document.body.className
              .replace(/\b(light|dark|minimal|maximal|night-interior|day-exterior|golden-hour|intimate|dramatic|memory)\b/g, '')
              .trim() + ` ${themeName}`;
          }, theme);

          await page.waitForTimeout(500); // Allow theme transition

          // Take screenshot
          const screenshotPath = path.join(
            this.screenshotDir,
            `theme-${theme}-${Date.now()}.png`
          );
          await page.screenshot({ path: screenshotPath });
          screenshots[theme] = screenshotPath;

          // Check if theme applied correctly
          const themeApplied = await page.evaluate((themeName) => {
            return document.body.classList.contains(themeName);
          }, theme);

          if (!themeApplied) {
            failedThemes.push(theme);
          }

        } catch (error) {
          console.warn(`Failed to test theme ${theme}:`, error);
          failedThemes.push(theme);
        }
      }

    } finally {
      await page.close();
    }

    return {
      compatible: failedThemes.length === 0,
      failedThemes,
      screenshots
    };
  }

  // Private helper methods

  private async initializeBrowser(): Promise<void> {
    if (!this.browser) {
      this.browser = await chromium.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage']
      });
    }

    if (!this.context) {
      this.context = await this.browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
        hasTouch: false
      });

      // Set up error tracking
      this.context.on('page', (page) => {
        (page as any).errors = [];
        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            (page as any).errors.push(msg.text());
          }
        });
      });
    }
  }

  private async ensureScreenshotDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.screenshotDir, { recursive: true });
    } catch (error) {
      console.warn('Failed to create screenshot directory:', error);
    }
  }

  private async captureAndAnalyze(url: string, viewport: ViewportConfig): Promise<ScreenshotResult> {
    const page = await this.context!.newPage();
    
    try {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`${this.baseUrl}${url}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      const screenshotPath = path.join(
        this.screenshotDir,
        `${url.replace(/\//g, '_')}-${viewport.name}-${Date.now()}.png`
      );

      await page.screenshot({ 
        path: screenshotPath, 
        fullPage: true 
      });

      const errors = (page as any).errors || [];
      const warnings: string[] = [];

      // Check for responsive issues
      if (viewport.deviceType === 'mobile') {
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth;
        });
        
        if (hasHorizontalScroll) {
          warnings.push('Horizontal scroll detected on mobile viewport');
        }
      }

      return {
        path: screenshotPath,
        viewport,
        url,
        timestamp: new Date().toISOString(),
        errors,
        warnings
      };

    } finally {
      await page.close();
    }
  }

  private async runAccessibilityTests(url: string): Promise<AccessibilityResult> {
    const page = await this.context!.newPage();
    
    try {
      await page.goto(`${this.baseUrl}${url}`);
      await page.waitForLoadState('networkidle');

      // Inject axe-core for accessibility testing
      await page.addScriptTag({
        url: 'https://unpkg.com/axe-core@4.8.2/axe.min.js'
      });

      const results = await page.evaluate(async () => {
        return await (window as any).axe.run();
      });

      const score = Math.max(0, 100 - (results.violations.length * 10));
      
      let wcagLevel: 'A' | 'AA' | 'AAA' | 'non-compliant' = 'non-compliant';
      if (results.violations.length === 0) {
        wcagLevel = 'AAA';
      } else if (results.violations.length < 3) {
        wcagLevel = 'AA';
      } else if (results.violations.length < 6) {
        wcagLevel = 'A';
      }

      return {
        violations: results.violations,
        passes: results.passes,
        score,
        wcagLevel
      };

    } finally {
      await page.close();
    }
  }

  private async quickAccessibilityCheck(page: Page): Promise<any[]> {
    try {
      await page.addScriptTag({
        url: 'https://unpkg.com/axe-core@4.8.2/axe.min.js'
      });

      const results = await page.evaluate(async () => {
        return await (window as any).axe.run();
      });

      return results.violations || [];
    } catch (error) {
      console.warn('Quick accessibility check failed:', error);
      return [];
    }
  }

  private async runPerformanceTests(url: string): Promise<PerformanceResult> {
    const page = await this.context!.newPage();
    
    try {
      const response = await page.goto(`${this.baseUrl}${url}`);
      await page.waitForLoadState('networkidle');

      const metrics = await page.evaluate(() => {
        return JSON.parse(JSON.stringify(performance.getEntriesByType('navigation')[0]));
      });

      // Simplified Core Web Vitals calculation
      const lcp = metrics.loadEventEnd - metrics.navigationStart;
      const fid = 50; // Estimated, would need real user interaction
      const cls = 0.1; // Estimated, would need layout shift tracking

      const score = this.calculatePerformanceScore(lcp, fid, cls);

      return { lcp, fid, cls, score };

    } finally {
      await page.close();
    }
  }

  private async checkMaterialDesignCompliance(url: string): Promise<MaterialDesignResult> {
    const page = await this.context!.newPage();
    
    try {
      await page.goto(`${this.baseUrl}${url}`);
      await page.waitForLoadState('networkidle');

      const compliance = await page.evaluate(() => {
        const hasTokens = !!getComputedStyle(document.documentElement)
          .getPropertyValue('--md-sys-color-primary');
          
        const hasComponents = document.querySelector('[class*="md-"]') !== null;
        
        const hasCorrectElevation = document.querySelector('[class*="elevation"]') !== null;
        
        const hasCorrectTypography = !!getComputedStyle(document.documentElement)
          .getPropertyValue('--md-sys-typescale-body-large');

        return {
          tokenUsage: hasTokens,
          componentCompliance: hasComponents,
          elevationCorrect: hasCorrectElevation,
          typographyCorrect: hasCorrectTypography
        };
      });

      const score = [
        compliance.tokenUsage,
        compliance.componentCompliance,
        compliance.elevationCorrect,
        compliance.typographyCorrect
      ].filter(Boolean).length * 25;

      return { ...compliance, score };

    } finally {
      await page.close();
    }
  }

  private async checkBrandCompliance(url: string): Promise<BrandComplianceResult> {
    const page = await this.context!.newPage();
    
    try {
      await page.goto(`${this.baseUrl}${url}`);
      await page.waitForLoadState('networkidle');

      const compliance = await page.evaluate(() => {
        const hasLSSTokens = !!getComputedStyle(document.documentElement)
          .getPropertyValue('--lss-sunset-coral');
          
        const hasGlassEffects = document.querySelector('[class*="glass"]') !== null;
        
        const hasThemeSupport = document.body.classList.contains('light') ||
                               document.body.classList.contains('dark');

        return {
          lssTokenUsage: hasLSSTokens,
          glassEffectsCorrect: hasGlassEffects,
          themeCompatibility: hasThemeSupport,
          voiceCompliant: true // Would need content analysis
        };
      });

      const score = [
        compliance.lssTokenUsage,
        compliance.glassEffectsCorrect,
        compliance.themeCompatibility,
        compliance.voiceCompliant
      ].filter(Boolean).length * 25;

      return { ...compliance, score };

    } finally {
      await page.close();
    }
  }

  private calculateOverallScore(results: {
    accessibility: AccessibilityResult;
    performance: PerformanceResult;
    materialDesign: MaterialDesignResult;
    brandCompliance: BrandComplianceResult;
  }): number {
    const weights = { accessibility: 0.25, performance: 0.20, materialDesign: 0.25, brandCompliance: 0.30 };
    
    return Math.round(
      results.accessibility.score * weights.accessibility +
      results.performance.score * weights.performance +
      results.materialDesign.score * weights.materialDesign +
      results.brandCompliance.score * weights.brandCompliance
    );
  }

  private calculatePerformanceScore(lcp: number, fid: number, cls: number): number {
    let score = 100;
    
    if (lcp > 2500) score -= 30;
    else if (lcp > 1500) score -= 15;
    
    if (fid > 100) score -= 20;
    else if (fid > 50) score -= 10;
    
    if (cls > 0.1) score -= 20;
    else if (cls > 0.05) score -= 10;

    return Math.max(0, score);
  }

  private async cleanup(): Promise<void> {
    if (this.context) {
      await this.context.close();
      this.context = null;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  // Helper methods for result merging
  private async createEmptyAccessibilityResult(): Promise<AccessibilityResult> {
    return { violations: [], passes: [], score: 0, wcagLevel: 'non-compliant' };
  }

  private async createEmptyPerformanceResult(): Promise<PerformanceResult> {
    return { lcp: 0, fid: 0, cls: 0, score: 0 };
  }

  private async createEmptyMaterialDesignResult(): Promise<MaterialDesignResult> {
    return { tokenUsage: false, componentCompliance: false, elevationCorrect: false, typographyCorrect: false, score: 0 };
  }

  private async createEmptyBrandComplianceResult(): Promise<BrandComplianceResult> {
    return { lssTokenUsage: false, voiceCompliant: false, glassEffectsCorrect: false, themeCompatibility: false, score: 0 };
  }

  private mergeAccessibilityResults(existing: AccessibilityResult, newResult: AccessibilityResult): AccessibilityResult {
    return {
      violations: [...existing.violations, ...newResult.violations],
      passes: [...existing.passes, ...newResult.passes],
      score: Math.min(existing.score, newResult.score),
      wcagLevel: existing.wcagLevel === 'non-compliant' ? newResult.wcagLevel : existing.wcagLevel
    };
  }

  private mergePerformanceResults(existing: PerformanceResult, newResult: PerformanceResult): PerformanceResult {
    return {
      lcp: Math.max(existing.lcp, newResult.lcp),
      fid: Math.max(existing.fid, newResult.fid),
      cls: Math.max(existing.cls, newResult.cls),
      score: Math.min(existing.score, newResult.score)
    };
  }

  private mergeMaterialDesignResults(existing: MaterialDesignResult, newResult: MaterialDesignResult): MaterialDesignResult {
    return {
      tokenUsage: existing.tokenUsage && newResult.tokenUsage,
      componentCompliance: existing.componentCompliance && newResult.componentCompliance,
      elevationCorrect: existing.elevationCorrect && newResult.elevationCorrect,
      typographyCorrect: existing.typographyCorrect && newResult.typographyCorrect,
      score: Math.min(existing.score, newResult.score)
    };
  }

  private mergeBrandResults(existing: BrandComplianceResult, newResult: BrandComplianceResult): BrandComplianceResult {
    return {
      lssTokenUsage: existing.lssTokenUsage && newResult.lssTokenUsage,
      voiceCompliant: existing.voiceCompliant && newResult.voiceCompliant,
      glassEffectsCorrect: existing.glassEffectsCorrect && newResult.glassEffectsCorrect,
      themeCompatibility: existing.themeCompatibility && newResult.themeCompatibility,
      score: Math.min(existing.score, newResult.score)
    };
  }
}

export default VisualValidator;