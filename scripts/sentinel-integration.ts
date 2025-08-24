/**
 * Sentinel Integration Bridge
 * 
 * Connects the Claude Code Execution Strategy with existing Sentinel agents
 * for comprehensive evaluation and quality assurance.
 */

import { promises as fs } from 'fs';
import path from 'path';
import ValidationPipeline, { ValidationReport } from './validation-pipeline.js';
import ContextLoader from './context-loader.js';

export interface SentinelEvaluation {
  evaluator: string;
  score: number;
  issues: SentinelIssue[];
  recommendations: string[];
  confidence: number;
}

export interface SentinelIssue {
  severity: 'critical' | 'major' | 'minor';
  category: string;
  description: string;
  location?: string;
  fix?: string;
}

export interface SentinelReport {
  overall: {
    score: number;
    status: 'pass' | 'fail' | 'warning';
    timestamp: string;
  };
  evaluations: {
    ux: SentinelEvaluation;
    visual: SentinelEvaluation;
    copy: SentinelEvaluation;
    code: SentinelEvaluation;
  };
  brandAlignment: number;
  antiSlopCompliance: number;
  humanCentricity: number;
  technicalQuality: number;
}

export class SentinelIntegration {
  private agentsPath: string;
  private brandApiPath: string;

  constructor() {
    this.agentsPath = path.resolve(process.cwd(), 'agents');
    this.brandApiPath = path.resolve(process.cwd(), 'brand-api');
  }

  /**
   * Run comprehensive Sentinel evaluation
   */
  async runSentinelEvaluation(content: any): Promise<SentinelReport> {
    console.log('🛡️  Running Sentinel evaluation...');

    const evaluations = {
      ux: await this.runUXEvaluation(content),
      visual: await this.runVisualEvaluation(content),
      copy: await this.runCopyEvaluation(content),
      code: await this.runCodeEvaluation(content)
    };

    // Calculate overall scores
    const overallScore = this.calculateOverallScore(evaluations);
    const brandAlignment = await this.assessBrandAlignment(content);
    const antiSlopCompliance = await this.assessAntiSlopCompliance(content);

    return {
      overall: {
        score: overallScore,
        status: overallScore >= 85 ? 'pass' : overallScore >= 70 ? 'warning' : 'fail',
        timestamp: new Date().toISOString()
      },
      evaluations,
      brandAlignment,
      antiSlopCompliance,
      humanCentricity: await this.assessHumanCentricity(content),
      technicalQuality: await this.assessTechnicalQuality(content)
    };
  }

  /**
   * Integrate Sentinel results with validation pipeline
   */
  async integrateSentinelWithValidation(
    validationReport: ValidationReport,
    changedFiles: string[]
  ): Promise<ValidationReport> {
    console.log('🔗 Integrating Sentinel evaluation with validation...');

    // Run Sentinel evaluation on changed content
    const content = await this.prepareContentForEvaluation(changedFiles);
    const sentinelReport = await this.runSentinelEvaluation(content);

    // Merge Sentinel findings into validation report
    const enhancedReport = { ...validationReport };

    // Update scores based on Sentinel evaluation
    if (sentinelReport.brandAlignment < 90) {
      enhancedReport.categories.brandConsistency.score = Math.min(
        enhancedReport.categories.brandConsistency.score,
        sentinelReport.brandAlignment
      );
    }

    if (sentinelReport.antiSlopCompliance < 90) {
      // Add anti-slop issues to relevant categories
      enhancedReport.categories.materialDesignCompliance.issues.push({
        id: `sentinel-slop-${Date.now()}`,
        severity: 'warning',
        category: 'anti-slop',
        message: 'Anti-slop compliance below threshold',
        priority: 2
      });
    }

    // Add Sentinel-specific recommendations
    enhancedReport.recommendations.push(
      ...this.generateSentinelRecommendations(sentinelReport)
    );

    return enhancedReport;
  }

  /**
   * Load Sentinel evaluator configuration
   */
  async loadEvaluatorConfig(evaluatorName: string): Promise<any> {
    try {
      const configPath = path.join(this.agentsPath, 'evaluators', `${evaluatorName}-evaluator.md`);
      const content = await fs.readFile(configPath, 'utf-8');
      
      // Parse evaluator configuration from markdown
      return this.parseEvaluatorConfig(content);
    } catch (error) {
      console.warn(`Failed to load evaluator config for ${evaluatorName}:`, error);
      return this.getDefaultEvaluatorConfig(evaluatorName);
    }
  }

  // Private evaluation methods

  private async runUXEvaluation(content: any): Promise<SentinelEvaluation> {
    const config = await this.loadEvaluatorConfig('ux');
    let score = 100;
    const issues: SentinelIssue[] = [];

    // UX heuristic checks
    if (content.components) {
      // Check for proper touch targets
      const hasSmallTargets = content.components.some((comp: any) => 
        comp.touchTarget && comp.touchTarget < 44
      );
      
      if (hasSmallTargets) {
        issues.push({
          severity: 'major',
          category: 'usability',
          description: 'Touch targets below 44px minimum',
          fix: 'Increase touch target size to 44px or larger'
        });
        score -= 15;
      }

      // Check for proper information hierarchy
      const hasGoodHierarchy = content.components.some((comp: any) => 
        comp.type === 'heading' && comp.level
      );
      
      if (!hasGoodHierarchy) {
        issues.push({
          severity: 'minor',
          category: 'information-architecture',
          description: 'Unclear information hierarchy',
          fix: 'Use proper heading levels (h1-h6)'
        });
        score -= 8;
      }
    }

    return {
      evaluator: 'ux',
      score: Math.max(0, score),
      issues,
      recommendations: this.generateUXRecommendations(issues),
      confidence: 0.8
    };
  }

  private async runVisualEvaluation(content: any): Promise<SentinelEvaluation> {
    let score = 100;
    const issues: SentinelIssue[] = [];

    // Visual design checks
    if (content.styles) {
      // Check for design token usage
      const hasHardCodedColors = content.styles.includes('#') && 
                                !content.styles.includes('var(--');
      
      if (hasHardCodedColors) {
        issues.push({
          severity: 'major',
          category: 'design-tokens',
          description: 'Hard-coded colors found instead of design tokens',
          fix: 'Replace with MaterialLab design tokens'
        });
        score -= 20;
      }

      // Check for consistent spacing
      const hasInconsistentSpacing = !this.checkSpacingConsistency(content.styles);
      
      if (hasInconsistentSpacing) {
        issues.push({
          severity: 'minor',
          category: 'spacing',
          description: 'Inconsistent spacing values',
          fix: 'Use 4px grid system spacing tokens'
        });
        score -= 10;
      }
    }

    return {
      evaluator: 'visual',
      score: Math.max(0, score),
      issues,
      recommendations: this.generateVisualRecommendations(issues),
      confidence: 0.9
    };
  }

  private async runCopyEvaluation(content: any): Promise<SentinelEvaluation> {
    let score = 100;
    const issues: SentinelIssue[] = [];

    // Load brand voice guidelines
    const brandAPI = await ContextLoader.loadBrandAPI();

    if (content.text) {
      // Check for brand voice violations
      const violations = ['revolutionary', 'game-changing', 'magical', 'disruptive'];
      violations.forEach(term => {
        if (content.text.toLowerCase().includes(term)) {
          issues.push({
            severity: 'major',
            category: 'brand-voice',
            description: `Brand voice violation: "${term}"`,
            fix: 'Use MaterialLab-approved terminology'
          });
          score -= 15;
        }
      });

      // Check for clarity and transparency
      if (content.text.includes('AI') && !content.text.includes('assistance')) {
        issues.push({
          severity: 'minor',
          category: 'transparency',
          description: 'AI usage not clearly communicated',
          fix: 'Add transparent AI assistance disclosure'
        });
        score -= 8;
      }
    }

    return {
      evaluator: 'copy',
      score: Math.max(0, score),
      issues,
      recommendations: this.generateCopyRecommendations(issues),
      confidence: 0.7
    };
  }

  private async runCodeEvaluation(content: any): Promise<SentinelEvaluation> {
    let score = 100;
    const issues: SentinelIssue[] = [];

    if (content.code) {
      // Check for TypeScript usage
      if (!content.code.includes('interface') && !content.code.includes('type ')) {
        issues.push({
          severity: 'minor',
          category: 'type-safety',
          description: 'Limited TypeScript type definitions',
          fix: 'Add proper TypeScript interfaces'
        });
        score -= 5;
      }

      // Check for accessibility attributes
      if (content.code.includes('<button') && !content.code.includes('aria-')) {
        issues.push({
          severity: 'major',
          category: 'accessibility',
          description: 'Interactive elements missing ARIA attributes',
          fix: 'Add proper ARIA labels and descriptions'
        });
        score -= 12;
      }

      // Check for performance patterns
      if (content.code.includes('import *')) {
        issues.push({
          severity: 'minor',
          category: 'performance',
          description: 'Barrel imports may impact bundle size',
          fix: 'Import specific exports only'
        });
        score -= 7;
      }
    }

    return {
      evaluator: 'code',
      score: Math.max(0, score),
      issues,
      recommendations: this.generateCodeRecommendations(issues),
      confidence: 0.85
    };
  }

  // Helper methods

  private calculateOverallScore(evaluations: any): number {
    const scores = Object.values(evaluations).map((eval: any) => eval.score);
    return Math.round(scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length);
  }

  private async assessBrandAlignment(content: any): Promise<number> {
    // Simplified brand alignment assessment
    let score = 100;
    
    if (content.styles && !content.styles.includes('--lss-')) {
      score -= 20;
    }
    
    if (content.text) {
      const brandTerms = ['human-centric', 'transparent', 'empowering'];
      const hasBrandTerms = brandTerms.some(term => 
        content.text.toLowerCase().includes(term)
      );
      if (!hasBrandTerms) {
        score -= 10;
      }
    }
    
    return Math.max(0, score);
  }

  private async assessAntiSlopCompliance(content: any): Promise<number> {
    // Check for generic patterns
    let score = 100;
    
    const slopPatterns = [
      'lorem ipsum',
      'click here',
      'learn more',
      'game-changing',
      'revolutionary'
    ];
    
    if (content.text) {
      slopPatterns.forEach(pattern => {
        if (content.text.toLowerCase().includes(pattern)) {
          score -= 15;
        }
      });
    }
    
    return Math.max(0, score);
  }

  private async assessHumanCentricity(content: any): Promise<number> {
    // Assess human-centric design principles
    let score = 100;
    
    // Check for user agency indicators
    if (content.components) {
      const hasUserControl = content.components.some((comp: any) => 
        comp.type === 'toggle' || comp.type === 'settings'
      );
      if (!hasUserControl) {
        score -= 10;
      }
    }
    
    return Math.max(0, score);
  }

  private async assessTechnicalQuality(content: any): Promise<number> {
    // Technical quality assessment
    let score = 100;
    
    if (content.code) {
      // Check for error handling
      if (!content.code.includes('try') && !content.code.includes('catch')) {
        score -= 5;
      }
      
      // Check for component structure
      if (!content.code.includes('interface') && content.code.includes('React.FC')) {
        score -= 8;
      }
    }
    
    return Math.max(0, score);
  }

  private async prepareContentForEvaluation(changedFiles: string[]): Promise<any> {
    const content: any = {
      components: [],
      styles: '',
      text: '',
      code: ''
    };

    for (const filePath of changedFiles.slice(0, 5)) { // Limit to 5 files
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        content.code += fileContent + '\n';
        
        if (filePath.endsWith('.css')) {
          content.styles += fileContent + '\n';
        }
        
        // Extract text content (simplified)
        const textMatches = fileContent.match(/"([^"]+)"/g);
        if (textMatches) {
          content.text += textMatches.join(' ') + '\n';
        }
      } catch (error) {
        console.warn(`Failed to read ${filePath}:`, error);
      }
    }

    return content;
  }

  private parseEvaluatorConfig(content: string): any {
    // Simplified parser for evaluator configuration
    return {
      thresholds: { pass: 85, warning: 70 },
      weights: { critical: 0.5, major: 0.3, minor: 0.2 },
      enabled: true
    };
  }

  private getDefaultEvaluatorConfig(evaluatorName: string): any {
    return {
      name: evaluatorName,
      thresholds: { pass: 85, warning: 70 },
      weights: { critical: 0.5, major: 0.3, minor: 0.2 },
      enabled: true
    };
  }

  private checkSpacingConsistency(styles: string): boolean {
    // Check if spacing follows 4px grid system
    const spacingValues = styles.match(/(\d+)px/g) || [];
    return spacingValues.every(value => {
      const num = parseInt(value);
      return num % 4 === 0;
    });
  }

  private generateSentinelRecommendations(report: SentinelReport): string[] {
    const recommendations: string[] = [];
    
    Object.values(report.evaluations).forEach(evaluation => {
      if (evaluation.score < 85) {
        recommendations.push(`Improve ${evaluation.evaluator} evaluation (${evaluation.score}/100)`);
      }
    });
    
    if (report.brandAlignment < 90) {
      recommendations.push('Enhance brand alignment with MaterialLab guidelines');
    }
    
    if (report.antiSlopCompliance < 90) {
      recommendations.push('Address anti-slop compliance issues');
    }
    
    return recommendations;
  }

  private generateUXRecommendations(issues: SentinelIssue[]): string[] {
    return issues.map(issue => `UX: ${issue.description} - ${issue.fix || 'Review UX guidelines'}`);
  }

  private generateVisualRecommendations(issues: SentinelIssue[]): string[] {
    return issues.map(issue => `Visual: ${issue.description} - ${issue.fix || 'Review visual design system'}`);
  }

  private generateCopyRecommendations(issues: SentinelIssue[]): string[] {
    return issues.map(issue => `Copy: ${issue.description} - ${issue.fix || 'Review brand voice guidelines'}`);
  }

  private generateCodeRecommendations(issues: SentinelIssue[]): string[] {
    return issues.map(issue => `Code: ${issue.description} - ${issue.fix || 'Review code quality standards'}`);
  }
}

export default SentinelIntegration;