#!/usr/bin/env node

/**
 * Quick Check - Rapid Material Design Validation
 * 
 * Fast validation script for immediate feedback after code changes.
 * Part of the Iterative Agentic Loop for Claude Code.
 */

import { program } from 'commander';
import VisualValidator from './visual-validation.js';
import ContextLoader from './context-loader.js';
import { promises as fs } from 'fs';
import path from 'path';

interface QuickCheckOptions {
  url?: string;
  component?: string;
  debug?: boolean;
  skipScreenshots?: boolean;
  theme?: string;
  output?: string;
}

interface QuickCheckResult {
  passed: boolean;
  score: number;
  issues: Issue[];
  recommendations: string[];
  duration: number;
  timestamp: string;
}

interface Issue {
  type: 'error' | 'warning' | 'info';
  category: 'material-design' | 'accessibility' | 'performance' | 'brand' | 'code-quality';
  message: string;
  location?: string;
  fix?: string;
}

class QuickChecker {
  private validator: VisualValidator;
  private startTime: number = 0;

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.validator = new VisualValidator(baseUrl);
  }

  /**
   * Run quick validation check
   */
  async runQuickCheck(options: QuickCheckOptions): Promise<QuickCheckResult> {
    this.startTime = Date.now();
    console.log('⚡ Running quick Material Design validation...');

    const issues: Issue[] = [];
    const recommendations: string[] = [];
    let score = 100;

    try {
      // 1. Visual validation
      if (!options.skipScreenshots) {
        console.log('📸 Capturing screenshots...');
        const visualResult = await this.validator.quickVisualCheck(
          options.url || '/',
          options.component
        );
        
        if (!visualResult.passed) {
          visualResult.issues.forEach(issue => {
            issues.push({
              type: 'error',
              category: 'material-design',
              message: issue,
              fix: 'Check Material Design token usage and component structure'
            });
          });
          score = Math.min(score, visualResult.score);
        }

        if (options.debug) {
          console.log(`Screenshots saved: ${visualResult.screenshots.join(', ')}`);
        }
      }

      // 2. Context validation
      console.log('🧠 Validating against context...');
      const contextValidation = await this.validateContext(options);
      issues.push(...contextValidation.issues);
      recommendations.push(...contextValidation.recommendations);
      score = Math.min(score, contextValidation.score);

      // 3. Code quality check
      console.log('🔍 Checking code quality...');
      const codeQuality = await this.checkCodeQuality(options);
      issues.push(...codeQuality.issues);
      score = Math.min(score, codeQuality.score);

      // 4. Performance check
      console.log('⚡ Checking performance impact...');
      const performanceCheck = await this.checkPerformance(options);
      issues.push(...performanceCheck.issues);
      score = Math.min(score, performanceCheck.score);

      const duration = Date.now() - this.startTime;
      const passed = score >= 85;

      const result: QuickCheckResult = {
        passed,
        score,
        issues,
        recommendations: this.generateRecommendations(issues),
        duration,
        timestamp: new Date().toISOString()
      };

      await this.outputResults(result, options);
      return result;

    } catch (error) {
      console.error('❌ Quick check failed:', error);
      throw error;
    }
  }

  /**
   * Validate against loaded context files
   */
  private async validateContext(options: QuickCheckOptions): Promise<{
    issues: Issue[];
    recommendations: string[];
    score: number;
  }> {
    const issues: Issue[] = [];
    const recommendations: string[] = [];
    let score = 100;

    try {
      // Load relevant files to check
      const filesToCheck = await this.getFilesToCheck(options);
      
      for (const filePath of filesToCheck) {
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Check design token usage
        const tokenValidation = await ContextLoader.validateDesignTokenUsage(content);
        if (!tokenValidation.valid) {
          issues.push({
            type: 'error',
            category: 'material-design',
            message: `Hard-coded values found in ${path.basename(filePath)}`,
            location: filePath,
            fix: 'Replace with Material Design or LSS design tokens'
          });
          score -= 10;
        }

        // Check against full context
        const contextValidation = await ContextLoader.validateAgainstContext(
          content,
          this.getComponentType(filePath)
        );

        if (contextValidation.score < 85) {
          contextValidation.issues.forEach(issue => {
            issues.push({
              type: 'warning',
              category: 'material-design',
              message: issue,
              location: filePath
            });
          });
          score = Math.min(score, contextValidation.score);
        }
      }

    } catch (error) {
      issues.push({
        type: 'error',
        category: 'code-quality',
        message: `Context validation failed: ${error.message}`
      });
      score -= 20;
    }

    return { issues, recommendations, score };
  }

  /**
   * Check code quality and TypeScript compliance
   */
  private async checkCodeQuality(options: QuickCheckOptions): Promise<{
    issues: Issue[];
    score: number;
  }> {
    const issues: Issue[] = [];
    let score = 100;

    try {
      const filesToCheck = await this.getFilesToCheck(options);

      for (const filePath of filesToCheck) {
        const content = await fs.readFile(filePath, 'utf-8');

        // Check for TypeScript issues
        if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
          // Basic TypeScript checks
          if (content.includes('any') && !content.includes('// @ts-ignore')) {
            issues.push({
              type: 'warning',
              category: 'code-quality',
              message: 'Usage of "any" type found',
              location: filePath,
              fix: 'Replace with specific types'
            });
            score -= 5;
          }

          // Check for proper prop types
          if (content.includes('interface') && !content.includes('React.FC')) {
            if (!content.match(/interface \w+Props/)) {
              issues.push({
                type: 'info',
                category: 'code-quality', 
                message: 'Consider defining prop interface',
                location: filePath
              });
              score -= 2;
            }
          }
        }

        // Check for accessibility attributes
        if (filePath.endsWith('.tsx')) {
          if (content.includes('<button') && !content.includes('aria-')) {
            issues.push({
              type: 'warning',
              category: 'accessibility',
              message: 'Button missing accessibility attributes',
              location: filePath,
              fix: 'Add aria-label or aria-describedby'
            });
            score -= 10;
          }
        }
      }

    } catch (error) {
      issues.push({
        type: 'error',
        category: 'code-quality',
        message: `Code quality check failed: ${error.message}`
      });
      score -= 15;
    }

    return { issues, score };
  }

  /**
   * Check performance impact
   */
  private async checkPerformance(options: QuickCheckOptions): Promise<{
    issues: Issue[];
    score: number;
  }> {
    const issues: Issue[] = [];
    let score = 100;

    try {
      const filesToCheck = await this.getFilesToCheck(options);

      for (const filePath of filesToCheck) {
        const content = await fs.readFile(filePath, 'utf-8');

        // Check for performance anti-patterns
        if (content.includes('import *')) {
          issues.push({
            type: 'warning',
            category: 'performance',
            message: 'Barrel import detected',
            location: filePath,
            fix: 'Import only specific exports needed'
          });
          score -= 5;
        }

        if (content.includes('useState') && content.includes('setInterval')) {
          issues.push({
            type: 'error',
            category: 'performance',
            message: 'Potential memory leak with setInterval',
            location: filePath,
            fix: 'Clean up interval in useEffect cleanup'
          });
          score -= 15;
        }

        // Check for large inline objects
        const largeObjectRegex = /\{[^}]{200,}\}/g;
        if (largeObjectRegex.test(content)) {
          issues.push({
            type: 'info',
            category: 'performance',
            message: 'Large inline object detected',
            location: filePath,
            fix: 'Consider extracting to constant outside component'
          });
          score -= 3;
        }
      }

    } catch (error) {
      issues.push({
        type: 'error',
        category: 'performance',
        message: `Performance check failed: ${error.message}`
      });
      score -= 10;
    }

    return { issues, score };
  }

  /**
   * Generate actionable recommendations based on issues
   */
  private generateRecommendations(issues: Issue[]): string[] {
    const recommendations: string[] = [];
    const categoryCount: Record<string, number> = {};

    // Count issues by category
    issues.forEach(issue => {
      categoryCount[issue.category] = (categoryCount[issue.category] || 0) + 1;
    });

    // Generate category-specific recommendations
    if (categoryCount['material-design'] > 0) {
      recommendations.push('Review Material Design 3 specifications and ensure token usage');
    }

    if (categoryCount['accessibility'] > 0) {
      recommendations.push('Add comprehensive accessibility attributes (WCAG 2.1 AA)');
    }

    if (categoryCount['performance'] > 0) {
      recommendations.push('Optimize imports and prevent memory leaks');
    }

    if (categoryCount['brand'] > 0) {
      recommendations.push('Ensure MaterialLab LSS design token usage');
    }

    if (categoryCount['code-quality'] > 0) {
      recommendations.push('Improve TypeScript types and code structure');
    }

    // Add general recommendations
    recommendations.push('Run full validation before deployment');
    recommendations.push('Test across all LSS theme modes');

    return recommendations;
  }

  /**
   * Get files to check based on options
   */
  private async getFilesToCheck(options: QuickCheckOptions): Promise<string[]> {
    const files: string[] = [];
    const srcDir = path.resolve(process.cwd(), 'src');

    if (options.component) {
      // Look for specific component
      const componentPath = path.join(srcDir, 'components', options.component);
      try {
        const stats = await fs.stat(componentPath);
        if (stats.isDirectory()) {
          const dirFiles = await fs.readdir(componentPath);
          files.push(...dirFiles
            .filter(f => f.endsWith('.tsx') || f.endsWith('.ts'))
            .map(f => path.join(componentPath, f))
          );
        } else {
          files.push(componentPath);
        }
      } catch (error) {
        console.warn(`Component ${options.component} not found`);
      }
    } else {
      // Check recently modified files
      try {
        const recentFiles = await this.getRecentlyModifiedFiles(srcDir);
        files.push(...recentFiles.slice(0, 5)); // Limit to 5 most recent
      } catch (error) {
        console.warn('Could not get recent files, checking common locations');
        // Fallback to common files
        const commonPaths = [
          path.join(srcDir, 'App.tsx'),
          path.join(srcDir, 'components/UI/Button.tsx'),
          path.join(srcDir, 'components/UI/Input.tsx')
        ];
        
        for (const filePath of commonPaths) {
          try {
            await fs.access(filePath);
            files.push(filePath);
          } catch {
            // File doesn't exist, skip
          }
        }
      }
    }

    return files;
  }

  /**
   * Get recently modified files
   */
  private async getRecentlyModifiedFiles(dir: string): Promise<string[]> {
    const files: { path: string; mtime: Date }[] = [];

    const scanDirectory = async (currentDir: string): Promise<void> => {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.')) {
          await scanDirectory(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
          const stats = await fs.stat(fullPath);
          files.push({ path: fullPath, mtime: stats.mtime });
        }
      }
    };

    await scanDirectory(dir);
    
    return files
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
      .map(f => f.path);
  }

  /**
   * Determine component type from file path
   */
  private getComponentType(filePath: string): string {
    const basename = path.basename(filePath, path.extname(filePath));
    
    if (basename.includes('Button')) return 'button';
    if (basename.includes('Input') || basename.includes('Field')) return 'input';
    if (basename.includes('Card')) return 'card';
    if (basename.includes('Nav')) return 'navigation';
    if (basename.includes('Hero')) return 'hero';
    
    return 'component';
  }

  /**
   * Output results in various formats
   */
  private async outputResults(result: QuickCheckResult, options: QuickCheckOptions): Promise<void> {
    // Console output
    this.printConsoleResults(result);

    // File output if requested
    if (options.output) {
      await this.saveResults(result, options.output);
    }
  }

  /**
   * Print results to console
   */
  private printConsoleResults(result: QuickCheckResult): void {
    const { passed, score, issues, recommendations, duration } = result;

    console.log('\n' + '='.repeat(60));
    console.log(`🎯 QUICK CHECK RESULTS (${duration}ms)`);
    console.log('='.repeat(60));

    // Overall status
    const status = passed ? '✅ PASSED' : score >= 70 ? '⚠️  WARNING' : '❌ FAILED';
    const color = passed ? '\x1b[32m' : score >= 70 ? '\x1b[33m' : '\x1b[31m';
    console.log(`${color}${status} - Score: ${score}/100\x1b[0m\n`);

    // Issues breakdown
    if (issues.length > 0) {
      console.log('🔍 Issues Found:');
      const grouped = this.groupIssuesByCategory(issues);
      
      Object.entries(grouped).forEach(([category, categoryIssues]) => {
        console.log(`\n  ${category.toUpperCase()}:`);
        categoryIssues.forEach(issue => {
          const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️';
          console.log(`    ${icon} ${issue.message}`);
          if (issue.location) {
            console.log(`       📁 ${path.relative(process.cwd(), issue.location)}`);
          }
          if (issue.fix) {
            console.log(`       🔧 ${issue.fix}`);
          }
        });
      });
    }

    // Recommendations
    if (recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      recommendations.forEach((rec, i) => {
        console.log(`   ${i + 1}. ${rec}`);
      });
    }

    console.log('\n' + '='.repeat(60));
  }

  /**
   * Group issues by category
   */
  private groupIssuesByCategory(issues: Issue[]): Record<string, Issue[]> {
    return issues.reduce((acc, issue) => {
      acc[issue.category] = acc[issue.category] || [];
      acc[issue.category].push(issue);
      return acc;
    }, {} as Record<string, Issue[]>);
  }

  /**
   * Save results to file
   */
  private async saveResults(result: QuickCheckResult, outputPath: string): Promise<void> {
    try {
      await fs.writeFile(
        outputPath,
        JSON.stringify(result, null, 2),
        'utf-8'
      );
      console.log(`📄 Results saved to ${outputPath}`);
    } catch (error) {
      console.warn(`Failed to save results: ${error.message}`);
    }
  }
}

// CLI setup
program
  .name('quick-check')
  .description('Quick Material Design validation for MaterialLab')
  .version('1.0.0')
  .option('-u, --url <url>', 'URL to validate (default: /)', '/')
  .option('-c, --component <name>', 'Specific component to check')
  .option('-d, --debug', 'Enable debug output')
  .option('--skip-screenshots', 'Skip screenshot generation')
  .option('-t, --theme <theme>', 'Specific theme to test')
  .option('-o, --output <file>', 'Output results to file')
  .action(async (options) => {
    try {
      const checker = new QuickChecker();
      const result = await checker.runQuickCheck(options);
      
      process.exit(result.passed ? 0 : 1);
    } catch (error) {
      console.error('💥 Quick check failed:', error);
      process.exit(1);
    }
  });

// Export for programmatic use
export { QuickChecker, QuickCheckResult, Issue };

// Run CLI if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  program.parse();
}