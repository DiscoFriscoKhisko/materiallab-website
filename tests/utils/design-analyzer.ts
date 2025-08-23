import { Page } from '@playwright/test';

/**
 * Design Analysis Agent for MaterialLab Website
 * Automatically detects design issues and suggests improvements
 */

export interface DesignIssue {
  type: 'critical' | 'warning' | 'info';
  category: 'layout' | 'typography' | 'navigation' | 'components' | 'performance';
  title: string;
  description: string;
  element?: string;
  suggestion: string;
  impact: 'high' | 'medium' | 'low';
}

export class DesignAnalyzer {
  private page: Page;
  private issues: DesignIssue[] = [];

  constructor(page: Page) {
    this.page = page;
  }

  async analyzeVeoLandingPage(): Promise<DesignIssue[]> {
    console.log('🔍 Analyzing Veo Landing Page design...');
    
    await this.checkNavigation();
    await this.checkTypography();
    await this.checkVideoElements();
    await this.checkLayoutStructure();
    await this.checkColorTheme();
    await this.checkResponsiveDesign();
    
    return this.issues;
  }

  private async checkNavigation(): Promise<void> {
    console.log('📍 Checking navigation...');
    
    const navigation = this.page.locator('nav');
    const navExists = await navigation.count() > 0;
    
    if (!navExists) {
      this.addIssue({
        type: 'critical',
        category: 'navigation',
        title: 'Missing Navigation Component',
        description: 'VeoLanding page is missing the navigation bar',
        suggestion: 'Wrap VeoLanding component with Layout component that includes Navigation',
        impact: 'high'
      });
    }

    // Check for MaterialLab logo
    const logo = this.page.locator('text=MaterialLab');
    const logoExists = await logo.count() > 0;
    
    if (!logoExists) {
      this.addIssue({
        type: 'critical',
        category: 'navigation',
        title: 'Missing Logo',
        description: 'MaterialLab logo is not visible in navigation',
        suggestion: 'Ensure Layout component with Navigation is properly imported',
        impact: 'high'
      });
    }
  }

  private async checkTypography(): Promise<void> {
    console.log('📝 Checking typography...');
    
    const heroTitle = this.page.locator('h1, [class*="text-veo-text-hero"]').first();
    
    if (await heroTitle.count() > 0) {
      const fontInfo = await heroTitle.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
        };
      });

      // Check if Google Sans is being used
      if (!fontInfo.fontFamily.toLowerCase().includes('google sans')) {
        this.addIssue({
          type: 'warning',
          category: 'typography',
          title: 'Wrong Font Family',
          description: `Hero title is using ${fontInfo.fontFamily} instead of Google Sans`,
          element: 'h1',
          suggestion: 'Apply font-veo class or ensure Google Sans is loading properly',
          impact: 'medium'
        });
      }

      // Check font size for hero
      const fontSize = parseInt(fontInfo.fontSize);
      if (fontSize < 40) {
        this.addIssue({
          type: 'warning',
          category: 'typography',
          title: 'Hero Text Too Small',
          description: `Hero title is ${fontSize}px, should be 56px or larger for Veo design`,
          element: 'h1',
          suggestion: 'Apply text-veo-text-hero class or increase font size',
          impact: 'medium'
        });
      }
    }
  }

  private async checkVideoElements(): Promise<void> {
    console.log('🎬 Checking video elements...');
    
    const videos = this.page.locator('video');
    const videoCount = await videos.count();
    
    if (videoCount > 5) {
      this.addIssue({
        type: 'warning',
        category: 'components',
        title: 'Too Many Video Elements',
        description: `Found ${videoCount} video elements, may cause performance issues`,
        suggestion: 'Limit video elements to hero + feature cards, lazy load others',
        impact: 'medium'
      });
    }

    // Check hero video specifically
    const heroVideo = this.page.locator('section').first().locator('video');
    if (await heroVideo.count() > 0) {
      const videoProperties = await heroVideo.evaluate((video: HTMLVideoElement) => ({
        src: video.src,
        autoplay: video.autoplay,
        muted: video.muted,
        loop: video.loop,
        paused: video.paused,
      }));

      if (!videoProperties.autoplay) {
        this.addIssue({
          type: 'info',
          category: 'components',
          title: 'Video Not Autoplaying',
          description: 'Hero video should autoplay for Veo design',
          element: 'hero video',
          suggestion: 'Ensure video has autoplay, muted, and loop attributes',
          impact: 'low'
        });
      }
    }
  }

  private async checkLayoutStructure(): Promise<void> {
    console.log('🏗️ Checking layout structure...');
    
    const sections = this.page.locator('section');
    const sectionCount = await sections.count();
    
    if (sectionCount < 3) {
      this.addIssue({
        type: 'warning',
        category: 'layout',
        title: 'Missing Content Sections',
        description: `Only found ${sectionCount} sections, expected hero + services + features + CTA`,
        suggestion: 'Ensure VeoLanding includes all planned sections',
        impact: 'high'
      });
    }

    // Check for duplicate buttons
    const viewWorkButtons = this.page.locator('text=View Our Work');
    const buttonCount = await viewWorkButtons.count();
    
    if (buttonCount > 1) {
      this.addIssue({
        type: 'critical',
        category: 'components',
        title: 'Duplicate CTA Buttons',
        description: `Found ${buttonCount} "View Our Work" buttons causing strict mode violations`,
        suggestion: 'Ensure each button has unique identifier or use .first() in tests',
        impact: 'high'
      });
    }
  }

  private async checkColorTheme(): Promise<void> {
    console.log('🎨 Checking color theme...');
    
    const bodyStyles = await this.page.evaluate(() => {
      const styles = window.getComputedStyle(document.body);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
      };
    });

    // Check for light theme
    const isLightTheme = bodyStyles.backgroundColor.includes('rgb(255, 255, 255)') || 
                        bodyStyles.backgroundColor === 'rgba(0, 0, 0, 0)';

    if (!isLightTheme) {
      this.addIssue({
        type: 'critical',
        category: 'layout',
        title: 'Wrong Color Theme',
        description: `Background is ${bodyStyles.backgroundColor}, should be white for Veo theme`,
        suggestion: 'Ensure light theme is applied by default and dark theme overrides are not interfering',
        impact: 'high'
      });
    }
  }

  private async checkResponsiveDesign(): Promise<void> {
    console.log('📱 Checking responsive design...');
    
    // Test different viewport sizes
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' }
    ];

    for (const viewport of viewports) {
      await this.page.setViewportSize(viewport);
      await this.page.waitForTimeout(300);
      
      // Check if content is properly visible
      const heroText = this.page.locator('text=AI Product Studio');
      const isVisible = await heroText.isVisible();
      
      if (!isVisible) {
        this.addIssue({
          type: 'warning',
          category: 'layout',
          title: `Content Hidden on ${viewport.name}`,
          description: `Hero content not visible on ${viewport.name} viewport (${viewport.width}x${viewport.height})`,
          suggestion: `Check responsive classes and layout for ${viewport.name} breakpoint`,
          impact: 'medium'
        });
      }
    }

    // Reset to desktop
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  private addIssue(issue: DesignIssue): void {
    this.issues.push(issue);
  }

  generateReport(): string {
    if (this.issues.length === 0) {
      return '✅ No design issues found!';
    }

    let report = `\n🎨 DESIGN ANALYSIS REPORT\n`;
    report += `Found ${this.issues.length} issues:\n\n`;

    const criticalIssues = this.issues.filter(i => i.type === 'critical');
    const warningIssues = this.issues.filter(i => i.type === 'warning');
    const infoIssues = this.issues.filter(i => i.type === 'info');

    if (criticalIssues.length > 0) {
      report += `🚨 CRITICAL ISSUES (${criticalIssues.length}):\n`;
      criticalIssues.forEach((issue, i) => {
        report += `  ${i + 1}. ${issue.title}\n`;
        report += `     ${issue.description}\n`;
        report += `     💡 Fix: ${issue.suggestion}\n\n`;
      });
    }

    if (warningIssues.length > 0) {
      report += `⚠️ WARNINGS (${warningIssues.length}):\n`;
      warningIssues.forEach((issue, i) => {
        report += `  ${i + 1}. ${issue.title}\n`;
        report += `     ${issue.description}\n`;
        report += `     💡 Fix: ${issue.suggestion}\n\n`;
      });
    }

    if (infoIssues.length > 0) {
      report += `ℹ️ RECOMMENDATIONS (${infoIssues.length}):\n`;
      infoIssues.forEach((issue, i) => {
        report += `  ${i + 1}. ${issue.title}\n`;
        report += `     ${issue.description}\n`;
        report += `     💡 Fix: ${issue.suggestion}\n\n`;
      });
    }

    return report;
  }
}

export async function analyzeDesign(page: Page): Promise<DesignIssue[]> {
  const analyzer = new DesignAnalyzer(page);
  return await analyzer.analyzeVeoLandingPage();
}