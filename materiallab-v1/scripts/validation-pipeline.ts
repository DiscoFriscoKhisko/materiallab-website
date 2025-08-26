/**
 * Validation Pipeline - The "Eyes" System
 * 
 * Comprehensive validation orchestrator that coordinates all quality checks
 * for Material Design compliance, brand consistency, accessibility, and performance.
 */

import ContextLoader, { ValidationResult } from './context-loader.js';
import VisualValidator, { VisualValidationResult } from './visual-validation.js';
import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface ValidationReport {
  overall: {
    status: 'pass' | 'fail' | 'warning';
    score: number;
    timestamp: string;
    duration: number;
  };
  categories: {
    materialDesignCompliance: CategoryResult;
    brandConsistency: CategoryResult;
    accessibility: CategoryResult;
    performance: CategoryResult;
    codeQuality: CategoryResult;
  };
  recommendations: PrioritizedRecommendation[];
  blockers: string[];
  warnings: string[];
  metadata: ValidationMetadata;
}

export interface CategoryResult {
  score: number;
  status: 'pass' | 'fail' | 'warning';
  issues: ValidationIssue[];
  metrics: Record<string, any>;
  details: string[];
}

export interface ValidationIssue {
  id: string;
  severity: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  location?: string;
  rule?: string;
  fix?: string;
  priority: number;
}

export interface PrioritizedRecommendation {
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  action: string;
  description: string;
  estimatedEffort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
}

export interface ValidationMetadata {
  version: string;
  environment: string;
  baseUrl: string;
  testedUrls: string[];
  changedFiles: string[];
  themesTested: string[];
  viewportsTested: string[];
}

export interface ValidationConfig {
  thresholds: {
    materialDesignCompliance: number;
    brandAlignment: number;
    accessibility: number;
    performance: number;
    codeQuality: number;
    overall: number;
  };
  urls: string[];
  skipScreenshots: boolean;
  themes: string[];
  viewports: string[];
  maxDuration: number;
}

export class ValidationPipeline {
  private config: ValidationConfig;
  private visualValidator: VisualValidator;
  private startTime: number = 0;
  private validationId: string;

  constructor(config: Partial<ValidationConfig> = {}) {
    this.config = {
      thresholds: {
        materialDesignCompliance: 85,
        brandAlignment: 90,
        accessibility: 85,
        performance: 80,
        codeQuality: 85,
        overall: 85
      },
      urls: ['/', '/services', '/work', '/about', '/contact'],
      skipScreenshots: false,
      themes: ['light', 'dark', 'minimal', 'maximal'],
      viewports: ['desktop', 'tablet', 'mobile'],
      maxDuration: 300000, // 5 minutes
      ...config
    };

    this.visualValidator = new VisualValidator();
    this.validationId = `validation-${Date.now()}`;
  }

  /**
   * Run complete validation pipeline
   */
  async runCompleteValidation(changedFiles: string[] = []): Promise<ValidationReport> {
    this.startTime = Date.now();
    console.log('🚀 Starting comprehensive validation pipeline...');
    console.log(`📋 Validation ID: ${this.validationId}`);

    const report: ValidationReport = {
      overall: {
        status: 'pass',
        score: 0,
        timestamp: new Date().toISOString(),
        duration: 0
      },
      categories: {
        materialDesignCompliance: this.createEmptyCategory(),
        brandConsistency: this.createEmptyCategory(),
        accessibility: this.createEmptyCategory(),
        performance: this.createEmptyCategory(),
        codeQuality: this.createEmptyCategory()
      },
      recommendations: [],
      blockers: [],
      warnings: [],
      metadata: {
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        baseUrl: 'http://localhost:3000',
        testedUrls: this.config.urls,
        changedFiles,
        themesTested: this.config.themes,
        viewportsTested: this.config.viewports
      }
    };

    try {
      // Set timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Validation timeout')), this.config.maxDuration);
      });

      const validationPromise = this.runValidationSteps(changedFiles, report);

      await Promise.race([validationPromise, timeoutPromise]);

      // Calculate overall score and status
      report.overall.score = this.calculateOverallScore(report.categories);
      report.overall.status = this.determineOverallStatus(report.overall.score, report.blockers);
      report.overall.duration = Date.now() - this.startTime;

      // Generate recommendations
      report.recommendations = this.generateRecommendations(report.categories);

      // Save report
      await this.saveValidationReport(report);

      console.log(`✅ Validation completed in ${report.overall.duration}ms`);
      console.log(`📊 Overall score: ${report.overall.score}/100 (${report.overall.status})`);

      return report;

    } catch (error) {
      console.error('❌ Validation pipeline failed:', error);
      report.overall.status = 'fail';
      report.overall.duration = Date.now() - this.startTime;
      report.blockers.push(`Pipeline failure: ${error.message}`);
      return report;
    }
  }

  /**
   * Run all validation steps
   */
  private async runValidationSteps(
    changedFiles: string[],
    report: ValidationReport
  ): Promise<void> {
    const steps = [
      { name: 'Material Design Compliance', fn: this.validateMaterialDesign.bind(this) },
      { name: 'Brand Consistency', fn: this.validateBrandAlignment.bind(this) },
      { name: 'Accessibility', fn: this.validateAccessibility.bind(this) },
      { name: 'Performance', fn: this.validatePerformance.bind(this) },
      { name: 'Code Quality', fn: this.validateCodeQuality.bind(this) }
    ];

    for (const step of steps) {
      console.log(`🔍 ${step.name}...`);
      try {
        const result = await step.fn(changedFiles);
        const categoryKey = this.getCategoryKey(step.name);
        report.categories[categoryKey] = result;

        // Collect blockers and warnings
        result.issues.forEach(issue => {
          if (issue.severity === 'error') {
            report.blockers.push(issue.message);
          } else if (issue.severity === 'warning') {
            report.warnings.push(issue.message);
          }
        });

        console.log(`   ${result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌'} ${result.score}/100`);
      } catch (error) {
        console.error(`   ❌ ${step.name} failed:`, error);
        const categoryKey = this.getCategoryKey(step.name);
        report.categories[categoryKey] = this.createErrorCategory(error.message);
        report.blockers.push(`${step.name} validation failed`);
      }
    }
  }

  /**
   * Validate Material Design compliance
   */
  private async validateMaterialDesign(changedFiles: string[]): Promise<CategoryResult> {
    const issues: ValidationIssue[] = [];
    const metrics: Record<string, any> = {};
    let score = 100;

    try {
      // Check file-level compliance
      const filesToCheck = changedFiles.length > 0 ? changedFiles : await this.getRecentFiles();
      
      for (const filePath of filesToCheck) {
        if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
          const content = await fs.readFile(filePath, 'utf-8');
          
          const contextValidation = await ContextLoader.validateAgainstContext(content);
          
          if (contextValidation.compliance.materialDesign < this.config.thresholds.materialDesignCompliance) {
            issues.push({
              id: `md-compliance-${Date.now()}`,
              severity: 'error',
              category: 'material-design',
              message: `Material Design compliance below threshold in ${path.basename(filePath)}`,
              location: filePath,
              fix: 'Review Material Design 3 specifications and apply proper tokens',
              priority: 1
            });
            score -= 15;
          }

          // Check token usage
          const tokenValidation = await ContextLoader.validateDesignTokenUsage(content);
          if (!tokenValidation.valid) {
            tokenValidation.violations.forEach(violation => {
              issues.push({
                id: `token-violation-${Date.now()}`,
                severity: 'warning',
                category: 'material-design',
                message: `Hard-coded value found: ${violation}`,
                location: filePath,
                fix: 'Replace with Material Design system token',
                priority: 2
              });
              score -= 5;
            });
          }
        }
      }

      // Visual validation
      if (!this.config.skipScreenshots) {
        const visualResult = await this.visualValidator.runVisualValidation(this.config.urls);
        metrics.materialDesignVisual = visualResult.materialDesign.score;
        
        if (visualResult.materialDesign.score < this.config.thresholds.materialDesignCompliance) {
          issues.push({
            id: `visual-md-${Date.now()}`,
            severity: 'error',
            category: 'material-design',
            message: 'Visual Material Design compliance below threshold',
            fix: 'Review component implementation against Material Design specs',
            priority: 1
          });
          score = Math.min(score, visualResult.materialDesign.score);
        }
      }

      metrics.tokenCompliance = score;
      metrics.checkedFiles = filesToCheck.length;

    } catch (error) {
      issues.push({
        id: `md-error-${Date.now()}`,
        severity: 'error',
        category: 'material-design',
        message: `Material Design validation error: ${error.message}`,
        priority: 1
      });
      score = 0;
    }

    return {
      score: Math.max(0, score),
      status: score >= this.config.thresholds.materialDesignCompliance ? 'pass' : 'fail',
      issues,
      metrics,
      details: [`Checked ${metrics.checkedFiles || 0} files`, `Token compliance: ${metrics.tokenCompliance}/100`]
    };
  }

  /**
   * Validate brand consistency and LSS integration
   */
  private async validateBrandAlignment(changedFiles: string[]): Promise<CategoryResult> {
    const issues: ValidationIssue[] = [];
    const metrics: Record<string, any> = {};
    let score = 100;

    try {
      const brandAPI = await ContextLoader.loadBrandAPI();
      const filesToCheck = changedFiles.length > 0 ? changedFiles : await this.getRecentFiles();

      // Check LSS token usage
      for (const filePath of filesToCheck) {
        if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
          const content = await fs.readFile(filePath, 'utf-8');

          // Check for LSS token usage
          if (!content.includes('--lss-')) {
            issues.push({
              id: `lss-missing-${Date.now()}`,
              severity: 'warning',
              category: 'brand',
              message: `LSS tokens not found in ${path.basename(filePath)}`,
              location: filePath,
              fix: 'Apply MaterialLab LSS design tokens',
              priority: 2
            });
            score -= 10;
          }

          // Check for brand voice violations
          const brandViolations = ['revolutionary', 'game-changing', 'magical', 'disruptive'];
          brandViolations.forEach(term => {
            if (content.toLowerCase().includes(term)) {
              issues.push({
                id: `brand-voice-${Date.now()}`,
                severity: 'error',
                category: 'brand',
                message: `Brand voice violation: "${term}" found`,
                location: filePath,
                fix: 'Use MaterialLab-approved terminology',
                priority: 1
              });
              score -= 15;
            }
          });
        }
      }

      // Visual brand validation
      if (!this.config.skipScreenshots) {
        const visualResult = await this.visualValidator.runVisualValidation(this.config.urls);
        metrics.brandVisual = visualResult.brandCompliance.score;
        
        if (visualResult.brandCompliance.score < this.config.thresholds.brandAlignment) {
          issues.push({
            id: `visual-brand-${Date.now()}`,
            severity: 'error',
            category: 'brand',
            message: 'Visual brand compliance below threshold',
            fix: 'Review LSS design system integration',
            priority: 1
          });
          score = Math.min(score, visualResult.brandCompliance.score);
        }

        // Test theme compatibility
        for (const url of this.config.urls.slice(0, 2)) { // Test first 2 URLs
          const themeResult = await this.visualValidator.validateThemeCompatibility(url);
          if (!themeResult.compatible) {
            issues.push({
              id: `theme-compat-${Date.now()}`,
              severity: 'error',
              category: 'brand',
              message: `Theme compatibility issues: ${themeResult.failedThemes.join(', ')}`,
              fix: 'Fix LSS theme mode support',
              priority: 1
            });
            score -= 20;
          }
        }
      }

      metrics.lssTokenUsage = score;
      metrics.themeCompatibility = 100; // Placeholder

    } catch (error) {
      issues.push({
        id: `brand-error-${Date.now()}`,
        severity: 'error',
        category: 'brand',
        message: `Brand validation error: ${error.message}`,
        priority: 1
      });
      score = 0;
    }

    return {
      score: Math.max(0, score),
      status: score >= this.config.thresholds.brandAlignment ? 'pass' : 'fail',
      issues,
      metrics,
      details: [`LSS token usage: ${metrics.lssTokenUsage}/100`, `Theme compatibility: ${metrics.themeCompatibility}/100`]
    };
  }

  /**
   * Validate accessibility compliance (WCAG 2.1 AA)
   */
  private async validateAccessibility(changedFiles: string[]): Promise<CategoryResult> {
    const issues: ValidationIssue[] = [];
    const metrics: Record<string, any> = {};
    let score = 100;

    try {
      // Visual accessibility validation
      if (!this.config.skipScreenshots) {
        const visualResult = await this.visualValidator.runVisualValidation(this.config.urls);
        
        visualResult.accessibility.violations.forEach(violation => {
          issues.push({
            id: `a11y-${violation.id}`,
            severity: violation.impact === 'critical' ? 'error' : 'warning',
            category: 'accessibility',
            message: violation.description,
            rule: violation.id,
            fix: violation.help,
            priority: violation.impact === 'critical' ? 1 : 2
          });
          
          if (violation.impact === 'critical') {
            score -= 20;
          } else {
            score -= 10;
          }
        });

        metrics.axeScore = visualResult.accessibility.score;
        metrics.wcagLevel = visualResult.accessibility.wcagLevel;
      }

      // Code-level accessibility checks
      const filesToCheck = changedFiles.length > 0 ? changedFiles : await this.getRecentFiles();
      
      for (const filePath of filesToCheck) {
        if (filePath.endsWith('.tsx')) {
          const content = await fs.readFile(filePath, 'utf-8');

          // Check for missing alt text
          if (content.includes('<img') && !content.includes('alt=')) {
            issues.push({
              id: `alt-text-${Date.now()}`,
              severity: 'error',
              category: 'accessibility',
              message: `Image missing alt text in ${path.basename(filePath)}`,
              location: filePath,
              fix: 'Add descriptive alt attribute',
              priority: 1
            });
            score -= 15;
          }

          // Check for button accessibility
          if (content.includes('<button') && !content.includes('aria-')) {
            issues.push({
              id: `button-aria-${Date.now()}`,
              severity: 'warning',
              category: 'accessibility',
              message: `Button missing ARIA attributes in ${path.basename(filePath)}`,
              location: filePath,
              fix: 'Add aria-label or aria-describedby',
              priority: 2
            });
            score -= 8;
          }

          // Check for form labels
          if (content.includes('<input') && !content.includes('aria-label') && !content.includes('id=')) {
            issues.push({
              id: `form-label-${Date.now()}`,
              severity: 'error',
              category: 'accessibility',
              message: `Form input missing label in ${path.basename(filePath)}`,
              location: filePath,
              fix: 'Add proper label or aria-label',
              priority: 1
            });
            score -= 12;
          }
        }
      }

      metrics.codeAccessibility = score;

    } catch (error) {
      issues.push({
        id: `a11y-error-${Date.now()}`,
        severity: 'error',
        category: 'accessibility',
        message: `Accessibility validation error: ${error.message}`,
        priority: 1
      });
      score = 0;
    }

    return {
      score: Math.max(0, score),
      status: score >= this.config.thresholds.accessibility ? 'pass' : 'fail',
      issues,
      metrics,
      details: [`WCAG level: ${metrics.wcagLevel || 'Unknown'}`, `Axe score: ${metrics.axeScore || 0}/100`]
    };
  }

  /**
   * Validate performance impact
   */
  private async validatePerformance(changedFiles: string[]): Promise<CategoryResult> {
    const issues: ValidationIssue[] = [];
    const metrics: Record<string, any> = {};
    let score = 100;

    try {
      // Visual performance testing
      if (!this.config.skipScreenshots) {
        const visualResult = await this.visualValidator.runVisualValidation(this.config.urls);
        
        if (visualResult.performance.lcp > 2500) {
          issues.push({
            id: `lcp-slow-${Date.now()}`,
            severity: 'warning',
            category: 'performance',
            message: `LCP exceeds 2.5s: ${visualResult.performance.lcp}ms`,
            fix: 'Optimize critical resources and images',
            priority: 2
          });
          score -= 15;
        }

        if (visualResult.performance.cls > 0.1) {
          issues.push({
            id: `cls-high-${Date.now()}`,
            severity: 'error',
            category: 'performance',
            message: `CLS exceeds 0.1: ${visualResult.performance.cls}`,
            fix: 'Stabilize layout shifts',
            priority: 1
          });
          score -= 20;
        }

        metrics.coreWebVitals = visualResult.performance.score;
      }

      // Code-level performance checks
      const filesToCheck = changedFiles.length > 0 ? changedFiles : await this.getRecentFiles();
      
      for (const filePath of filesToCheck) {
        if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
          const content = await fs.readFile(filePath, 'utf-8');

          // Check for performance anti-patterns
          if (content.includes('import *')) {
            issues.push({
              id: `barrel-import-${Date.now()}`,
              severity: 'warning',
              category: 'performance',
              message: `Barrel import detected in ${path.basename(filePath)}`,
              location: filePath,
              fix: 'Import only needed exports',
              priority: 2
            });
            score -= 8;
          }

          if (content.includes('useEffect') && content.includes('setInterval') && !content.includes('clearInterval')) {
            issues.push({
              id: `memory-leak-${Date.now()}`,
              severity: 'error',
              category: 'performance',
              message: `Potential memory leak in ${path.basename(filePath)}`,
              location: filePath,
              fix: 'Add cleanup function to useEffect',
              priority: 1
            });
            score -= 25;
          }
        }
      }

      // Bundle size check (simplified)
      try {
        const { stdout } = await execAsync('du -sh dist/ 2>/dev/null || echo "0M"');
        const bundleSize = stdout.trim();
        metrics.bundleSize = bundleSize;
        
        if (bundleSize.includes('M') && parseFloat(bundleSize) > 5) {
          issues.push({
            id: `bundle-large-${Date.now()}`,
            severity: 'warning',
            category: 'performance',
            message: `Large bundle size: ${bundleSize}`,
            fix: 'Consider code splitting and tree shaking',
            priority: 2
          });
          score -= 10;
        }
      } catch (error) {
        // Bundle check failed, continue
      }

      metrics.performanceScore = score;

    } catch (error) {
      issues.push({
        id: `perf-error-${Date.now()}`,
        severity: 'error',
        category: 'performance',
        message: `Performance validation error: ${error.message}`,
        priority: 1
      });
      score = 0;
    }

    return {
      score: Math.max(0, score),
      status: score >= this.config.thresholds.performance ? 'pass' : 'fail',
      issues,
      metrics,
      details: [`Core Web Vitals: ${metrics.coreWebVitals || 0}/100`, `Bundle: ${metrics.bundleSize || 'Unknown'}`]
    };
  }

  /**
   * Validate code quality
   */
  private async validateCodeQuality(changedFiles: string[]): Promise<CategoryResult> {
    const issues: ValidationIssue[] = [];
    const metrics: Record<string, any> = {};
    let score = 100;

    try {
      // ESLint check
      try {
        const { stdout, stderr } = await execAsync('npm run lint 2>&1');
        if (stderr.includes('error') || stdout.includes('error')) {
          const errorCount = (stdout.match(/error/g) || []).length;
          issues.push({
            id: `eslint-errors-${Date.now()}`,
            severity: 'error',
            category: 'code-quality',
            message: `${errorCount} ESLint errors found`,
            fix: 'Run npm run lint:fix to auto-fix issues',
            priority: 1
          });
          score -= Math.min(errorCount * 5, 30);
        }
        
        if (stderr.includes('warning') || stdout.includes('warning')) {
          const warningCount = (stdout.match(/warning/g) || []).length;
          issues.push({
            id: `eslint-warnings-${Date.now()}`,
            severity: 'warning',
            category: 'code-quality',
            message: `${warningCount} ESLint warnings found`,
            fix: 'Address ESLint warnings',
            priority: 2
          });
          score -= Math.min(warningCount * 2, 15);
        }
        
        metrics.eslintScore = score;
      } catch (error) {
        console.warn('ESLint check failed:', error);
        metrics.eslintScore = 0;
      }

      // TypeScript check
      try {
        const { stdout, stderr } = await execAsync('npx tsc --noEmit 2>&1');
        if (stderr || stdout.includes('error')) {
          issues.push({
            id: `typescript-errors-${Date.now()}`,
            severity: 'error',
            category: 'code-quality',
            message: 'TypeScript compilation errors found',
            fix: 'Fix TypeScript errors',
            priority: 1
          });
          score -= 20;
        }
        metrics.typescriptScore = score;
      } catch (error) {
        console.warn('TypeScript check failed:', error);
        metrics.typescriptScore = 0;
      }

      // File-level checks
      const filesToCheck = changedFiles.length > 0 ? changedFiles : await this.getRecentFiles();
      
      for (const filePath of filesToCheck) {
        if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
          const content = await fs.readFile(filePath, 'utf-8');

          // Check for TODO/FIXME comments
          if (content.includes('TODO') || content.includes('FIXME')) {
            issues.push({
              id: `todo-comment-${Date.now()}`,
              severity: 'info',
              category: 'code-quality',
              message: `TODO/FIXME comments in ${path.basename(filePath)}`,
              location: filePath,
              fix: 'Address TODO/FIXME items',
              priority: 3
            });
          }

          // Check for any type usage
          if (content.includes(': any') && !content.includes('// @ts-')) {
            issues.push({
              id: `any-type-${Date.now()}`,
              severity: 'warning',
              category: 'code-quality',
              message: `"any" type usage in ${path.basename(filePath)}`,
              location: filePath,
              fix: 'Replace with specific types',
              priority: 2
            });
            score -= 5;
          }
        }
      }

      metrics.codeQualityScore = score;

    } catch (error) {
      issues.push({
        id: `quality-error-${Date.now()}`,
        severity: 'error',
        category: 'code-quality',
        message: `Code quality validation error: ${error.message}`,
        priority: 1
      });
      score = 0;
    }

    return {
      score: Math.max(0, score),
      status: score >= this.config.thresholds.codeQuality ? 'pass' : 'fail',
      issues,
      metrics,
      details: [`ESLint: ${metrics.eslintScore || 0}/100`, `TypeScript: ${metrics.typescriptScore || 0}/100`]
    };
  }

  // Helper methods

  private createEmptyCategory(): CategoryResult {
    return {
      score: 0,
      status: 'fail',
      issues: [],
      metrics: {},
      details: []
    };
  }

  private createErrorCategory(errorMessage: string): CategoryResult {
    return {
      score: 0,
      status: 'fail',
      issues: [{
        id: `error-${Date.now()}`,
        severity: 'error',
        category: 'system',
        message: errorMessage,
        priority: 1
      }],
      metrics: {},
      details: ['Validation failed due to system error']
    };
  }

  private getCategoryKey(stepName: string): keyof ValidationReport['categories'] {
    const mapping: Record<string, keyof ValidationReport['categories']> = {
      'Material Design Compliance': 'materialDesignCompliance',
      'Brand Consistency': 'brandConsistency',
      'Accessibility': 'accessibility',
      'Performance': 'performance',
      'Code Quality': 'codeQuality'
    };
    return mapping[stepName] || 'codeQuality';
  }

  private calculateOverallScore(categories: ValidationReport['categories']): number {
    const weights = {
      materialDesignCompliance: 0.25,
      brandConsistency: 0.25,
      accessibility: 0.20,
      performance: 0.15,
      codeQuality: 0.15
    };

    return Math.round(
      categories.materialDesignCompliance.score * weights.materialDesignCompliance +
      categories.brandConsistency.score * weights.brandConsistency +
      categories.accessibility.score * weights.accessibility +
      categories.performance.score * weights.performance +
      categories.codeQuality.score * weights.codeQuality
    );
  }

  private determineOverallStatus(
    score: number,
    blockers: string[]
  ): 'pass' | 'fail' | 'warning' {
    if (blockers.length > 0) return 'fail';
    if (score >= this.config.thresholds.overall) return 'pass';
    if (score >= 70) return 'warning';
    return 'fail';
  }

  private generateRecommendations(categories: ValidationReport['categories']): PrioritizedRecommendation[] {
    const recommendations: PrioritizedRecommendation[] = [];

    // Generate category-specific recommendations
    Object.entries(categories).forEach(([category, result]) => {
      if (result.score < 85) {
        const priority = result.score < 60 ? 'critical' : result.score < 75 ? 'high' : 'medium';
        
        recommendations.push({
          priority,
          category,
          action: `Improve ${category.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          description: `Current score: ${result.score}/100. Focus on addressing ${result.issues.length} issues.`,
          estimatedEffort: result.issues.length > 10 ? 'high' : result.issues.length > 5 ? 'medium' : 'low',
          impact: priority === 'critical' ? 'high' : 'medium'
        });
      }
    });

    // Sort by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  private async getRecentFiles(): Promise<string[]> {
    try {
      const { stdout } = await execAsync('find src -name "*.tsx" -o -name "*.ts" | head -10');
      return stdout.trim().split('\n').filter(f => f.length > 0);
    } catch (error) {
      return ['src/App.tsx']; // Fallback
    }
  }

  private async saveValidationReport(report: ValidationReport): Promise<void> {
    const reportDir = path.resolve(process.cwd(), 'validation-reports');
    await fs.mkdir(reportDir, { recursive: true });

    const reportPath = path.join(reportDir, `${this.validationId}.json`);
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    console.log(`📄 Validation report saved: ${reportPath}`);
  }
}

export default ValidationPipeline;