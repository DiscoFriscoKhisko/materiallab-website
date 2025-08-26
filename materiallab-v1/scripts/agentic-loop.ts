/**
 * Iterative Agentic Loop - The "Self-Correction" System
 * 
 * Autonomous correction mechanism that iteratively improves implementations
 * until they meet MaterialLab's Material Design excellence standards.
 */

import ContextLoader, { ValidationResult } from './context-loader.js';
import VisualValidator from './visual-validation.js';
import ValidationPipeline, { ValidationReport } from './validation-pipeline.js';
import { promises as fs } from 'fs';
import path from 'path';

export interface LoopConfiguration {
  maxIterations: number;
  successThresholds: {
    materialDesignCompliance: number;
    brandAlignment: number;
    accessibility: number;
    performance: number;
    codeQuality: number;
    overall: number;
  };
  correctionStrategies: {
    autoFix: boolean;
    generateSuggestions: boolean;
    escalateComplex: boolean;
  };
  timeoutMs: number;
}

export interface IterationResult {
  iteration: number;
  success: boolean;
  score: number;
  improvements: string[];
  corrections: CorrectionAction[];
  validationReport: ValidationReport;
  duration: number;
  timestamp: string;
}

export interface CorrectionAction {
  type: 'file-edit' | 'token-replacement' | 'structure-fix' | 'accessibility-add';
  filePath: string;
  description: string;
  before?: string;
  after?: string;
  confidence: number;
  automated: boolean;
}

export interface LoopResult {
  success: boolean;
  finalScore: number;
  totalIterations: number;
  totalDuration: number;
  iterations: IterationResult[];
  finalRecommendations: string[];
  escalationReason?: string;
}

export class IterativeAgenticLoop {
  private config: LoopConfiguration;
  private validator: ValidationPipeline;
  private visualValidator: VisualValidator;
  private loopId: string;

  constructor(config: Partial<LoopConfiguration> = {}) {
    this.config = {
      maxIterations: 3,
      successThresholds: {
        materialDesignCompliance: 85,
        brandAlignment: 90,
        accessibility: 85,
        performance: 80,
        codeQuality: 85,
        overall: 85
      },
      correctionStrategies: {
        autoFix: true,
        generateSuggestions: true,
        escalateComplex: true
      },
      timeoutMs: 10 * 60 * 1000, // 10 minutes
      ...config
    };

    this.validator = new ValidationPipeline();
    this.visualValidator = new VisualValidator();
    this.loopId = `loop-${Date.now()}`;
  }

  /**
   * Execute the complete iterative loop for a user request
   */
  async executeLoop(
    userRequest: string,
    changedFiles: string[] = [],
    initialImplementation?: string
  ): Promise<LoopResult> {
    console.log('🔄 Starting Iterative Agentic Loop...');
    console.log(`📋 Loop ID: ${this.loopId}`);
    console.log(`📝 Request: ${userRequest}`);

    const startTime = Date.now();
    const result: LoopResult = {
      success: false,
      finalScore: 0,
      totalIterations: 0,
      totalDuration: 0,
      iterations: [],
      finalRecommendations: []
    };

    try {
      // Set overall timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Loop timeout exceeded')), this.config.timeoutMs);
      });

      const loopPromise = this.runIterations(userRequest, changedFiles, result);

      await Promise.race([loopPromise, timeoutPromise]);

      result.totalDuration = Date.now() - startTime;
      result.success = result.finalScore >= this.config.successThresholds.overall;

      console.log(`✅ Loop completed: ${result.success ? 'SUCCESS' : 'NEEDS REVIEW'}`);
      console.log(`📊 Final Score: ${result.finalScore}/100 (${result.totalIterations} iterations)`);

      await this.saveLoopResult(result);
      return result;

    } catch (error) {
      console.error('❌ Agentic loop failed:', error);
      result.totalDuration = Date.now() - startTime;
      result.escalationReason = error.message;
      return result;
    }
  }

  /**
   * Run the iterative correction process
   */
  private async runIterations(
    userRequest: string,
    changedFiles: string[],
    result: LoopResult
  ): Promise<void> {
    let currentIteration = 0;
    let currentScore = 0;
    let currentFiles = [...changedFiles];

    while (currentIteration < this.config.maxIterations) {
      currentIteration++;
      console.log(`\n🔄 Iteration ${currentIteration}/${this.config.maxIterations}`);
      
      const iterationStart = Date.now();
      
      // Step 1: Generate/Update Implementation
      const implementation = await this.generateImplementation(
        userRequest,
        currentIteration,
        result.iterations
      );

      // Step 2: Validate Implementation
      const validationReport = await this.validator.runCompleteValidation(currentFiles);
      currentScore = validationReport.overall.score;

      // Step 3: Create Iteration Result
      const iterationResult: IterationResult = {
        iteration: currentIteration,
        success: currentScore >= this.config.successThresholds.overall,
        score: currentScore,
        improvements: this.calculateImprovements(result.iterations, validationReport),
        corrections: [],
        validationReport,
        duration: Date.now() - iterationStart,
        timestamp: new Date().toISOString()
      };

      // Step 4: Check Success Criteria
      if (this.meetsSuccessThreshold(validationReport)) {
        iterationResult.success = true;
        result.iterations.push(iterationResult);
        result.finalScore = currentScore;
        result.totalIterations = currentIteration;
        console.log(`✅ Success criteria met in iteration ${currentIteration}`);
        break;
      }

      // Step 5: Generate Corrections
      if (currentIteration < this.config.maxIterations) {
        const corrections = await this.generateCorrections(validationReport, currentFiles);
        iterationResult.corrections = corrections;

        // Step 6: Apply Corrections
        if (this.config.correctionStrategies.autoFix) {
          const appliedCorrections = await this.applyCorrections(corrections);
          console.log(`🔧 Applied ${appliedCorrections.length} corrections`);
          
          // Update changed files list
          currentFiles = this.updateChangedFiles(currentFiles, appliedCorrections);
        }
      }

      result.iterations.push(iterationResult);
      result.finalScore = currentScore;
      result.totalIterations = currentIteration;

      console.log(`📊 Iteration ${currentIteration} Score: ${currentScore}/100`);
    }

    // Generate final recommendations
    result.finalRecommendations = this.generateFinalRecommendations(result);

    // Check if escalation is needed
    if (!result.iterations[result.iterations.length - 1]?.success) {
      result.escalationReason = 'Maximum iterations reached without meeting success criteria';
      console.log('⚠️  Escalating for human review');
    }
  }

  /**
   * Generate implementation based on context and previous iterations
   */
  private async generateImplementation(
    userRequest: string,
    iteration: number,
    previousIterations: IterationResult[]
  ): Promise<string> {
    console.log('⚡ Generating implementation...');

    // Load context for guidance
    const context = await ContextLoader.loadAllContext();

    // Analyze previous iteration feedback if available
    let learnings = '';
    if (previousIterations.length > 0) {
      const lastIteration = previousIterations[previousIterations.length - 1];
      learnings = this.extractLearnings(lastIteration);
    }

    // This would typically call Claude Code's generation capabilities
    // For now, we'll simulate the process
    const implementation = `
    // Generated implementation for iteration ${iteration}
    // Request: ${userRequest}
    // Context applied: Material Design 3, LSS tokens, accessibility
    // Learnings from previous iterations: ${learnings}
    `;

    return implementation;
  }

  /**
   * Check if validation meets all success thresholds
   */
  private meetsSuccessThreshold(report: ValidationReport): boolean {
    return (
      report.categories.materialDesignCompliance.score >= this.config.successThresholds.materialDesignCompliance &&
      report.categories.brandConsistency.score >= this.config.successThresholds.brandAlignment &&
      report.categories.accessibility.score >= this.config.successThresholds.accessibility &&
      report.categories.performance.score >= this.config.successThresholds.performance &&
      report.categories.codeQuality.score >= this.config.successThresholds.codeQuality &&
      report.overall.score >= this.config.successThresholds.overall
    );
  }

  /**
   * Generate targeted corrections based on validation issues
   */
  private async generateCorrections(
    report: ValidationReport,
    changedFiles: string[]
  ): Promise<CorrectionAction[]> {
    console.log('🔧 Generating corrections...');
    
    const corrections: CorrectionAction[] = [];

    // Process each category of issues
    for (const [categoryName, category] of Object.entries(report.categories)) {
      for (const issue of category.issues) {
        const correction = await this.createCorrectionAction(issue, categoryName, changedFiles);
        if (correction) {
          corrections.push(correction);
        }
      }
    }

    // Sort corrections by priority and confidence
    return corrections.sort((a, b) => {
      if (a.confidence !== b.confidence) {
        return b.confidence - a.confidence; // Higher confidence first
      }
      return a.automated === b.automated ? 0 : a.automated ? -1 : 1; // Automated first
    });
  }

  /**
   * Create specific correction action for an issue
   */
  private async createCorrectionAction(
    issue: any,
    category: string,
    changedFiles: string[]
  ): Promise<CorrectionAction | null> {
    
    // Material Design token corrections
    if (category === 'materialDesignCompliance' && issue.message.includes('hard-coded')) {
      return {
        type: 'token-replacement',
        filePath: issue.location || changedFiles[0] || 'src/App.tsx',
        description: `Replace hard-coded value with Material Design token`,
        before: issue.violation || '',
        after: this.suggestToken(issue.violation || ''),
        confidence: 0.8,
        automated: true
      };
    }

    // Accessibility corrections
    if (category === 'accessibility' && issue.message.includes('alt text')) {
      return {
        type: 'accessibility-add',
        filePath: issue.location || changedFiles[0] || 'src/App.tsx',
        description: 'Add alt text to image',
        before: '<img',
        after: '<img alt="Descriptive text"',
        confidence: 0.9,
        automated: true
      };
    }

    // Brand consistency corrections
    if (category === 'brandConsistency' && issue.message.includes('LSS')) {
      return {
        type: 'token-replacement',
        filePath: issue.location || changedFiles[0] || 'src/App.tsx',
        description: 'Apply LSS design tokens',
        confidence: 0.7,
        automated: true
      };
    }

    // Performance corrections
    if (category === 'performance' && issue.message.includes('import *')) {
      return {
        type: 'file-edit',
        filePath: issue.location || changedFiles[0] || 'src/App.tsx',
        description: 'Replace barrel import with specific imports',
        before: 'import *',
        after: 'import { specific }',
        confidence: 0.6,
        automated: false // Requires manual review
      };
    }

    // Code quality corrections
    if (category === 'codeQuality' && issue.message.includes('any')) {
      return {
        type: 'structure-fix',
        filePath: issue.location || changedFiles[0] || 'src/App.tsx',
        description: 'Replace any type with specific type',
        confidence: 0.5,
        automated: false
      };
    }

    return null;
  }

  /**
   * Apply automated corrections
   */
  private async applyCorrections(corrections: CorrectionAction[]): Promise<CorrectionAction[]> {
    const appliedCorrections: CorrectionAction[] = [];

    for (const correction of corrections) {
      if (!correction.automated || correction.confidence < 0.7) {
        continue; // Skip low-confidence or manual corrections
      }

      try {
        const success = await this.applySingleCorrection(correction);
        if (success) {
          appliedCorrections.push(correction);
          console.log(`✅ Applied: ${correction.description}`);
        }
      } catch (error) {
        console.warn(`⚠️  Failed to apply correction: ${correction.description}`, error);
      }
    }

    return appliedCorrections;
  }

  /**
   * Apply a single correction to a file
   */
  private async applySingleCorrection(correction: CorrectionAction): Promise<boolean> {
    if (!correction.filePath) return false;

    try {
      // Check if file exists
      await fs.access(correction.filePath);
      
      const content = await fs.readFile(correction.filePath, 'utf-8');

      let updatedContent = content;

      switch (correction.type) {
        case 'token-replacement':
          if (correction.before && correction.after) {
            updatedContent = content.replace(correction.before, correction.after);
          }
          break;

        case 'accessibility-add':
          if (correction.before && correction.after) {
            updatedContent = content.replace(
              new RegExp(correction.before, 'g'),
              correction.after
            );
          }
          break;

        case 'file-edit':
          // More complex file editing would be implemented here
          if (correction.before && correction.after) {
            updatedContent = content.replace(correction.before, correction.after);
          }
          break;

        case 'structure-fix':
          // Structural fixes require more sophisticated analysis
          console.log(`Structure fix needed: ${correction.description}`);
          return false;
      }

      if (updatedContent !== content) {
        await fs.writeFile(correction.filePath, updatedContent, 'utf-8');
        return true;
      }

    } catch (error) {
      console.error(`Error applying correction to ${correction.filePath}:`, error);
      return false;
    }

    return false;
  }

  /**
   * Calculate improvements from previous iteration
   */
  private calculateImprovements(
    previousIterations: IterationResult[],
    currentReport: ValidationReport
  ): string[] {
    const improvements: string[] = [];

    if (previousIterations.length === 0) {
      improvements.push('Initial implementation generated');
      return improvements;
    }

    const previousScore = previousIterations[previousIterations.length - 1].score;
    const currentScore = currentReport.overall.score;

    if (currentScore > previousScore) {
      improvements.push(`Overall score improved: ${previousScore} → ${currentScore}`);
    }

    // Check category improvements
    const categories = ['materialDesignCompliance', 'brandConsistency', 'accessibility', 'performance', 'codeQuality'];
    
    categories.forEach(category => {
      const current = currentReport.categories[category as keyof typeof currentReport.categories];
      const previous = previousIterations[previousIterations.length - 1].validationReport.categories[category as keyof typeof currentReport.categories];
      
      if (current.score > previous.score) {
        improvements.push(`${category}: ${previous.score} → ${current.score}`);
      }
    });

    return improvements;
  }

  /**
   * Extract learnings from previous iteration for next generation
   */
  private extractLearnings(iteration: IterationResult): string {
    const learnings: string[] = [];

    // Extract key issues
    Object.values(iteration.validationReport.categories).forEach(category => {
      category.issues.forEach(issue => {
        if (issue.severity === 'error') {
          learnings.push(`Avoid: ${issue.message}`);
        }
      });
    });

    // Extract successful corrections
    iteration.corrections.forEach(correction => {
      learnings.push(`Apply: ${correction.description}`);
    });

    return learnings.join('; ');
  }

  /**
   * Generate final recommendations based on all iterations
   */
  private generateFinalRecommendations(result: LoopResult): string[] {
    const recommendations: string[] = [];

    if (result.success) {
      recommendations.push('✅ Implementation meets all quality standards');
      recommendations.push('Consider running full test suite before deployment');
    } else {
      recommendations.push('⚠️  Manual review and corrections needed');
      
      // Get most recent issues
      const lastIteration = result.iterations[result.iterations.length - 1];
      if (lastIteration) {
        const criticalIssues = Object.values(lastIteration.validationReport.categories)
          .flatMap(cat => cat.issues)
          .filter(issue => issue.severity === 'error')
          .slice(0, 3);

        criticalIssues.forEach(issue => {
          recommendations.push(`🔧 Address: ${issue.message}`);
        });
      }
    }

    return recommendations;
  }

  /**
   * Update list of changed files based on applied corrections
   */
  private updateChangedFiles(
    currentFiles: string[],
    corrections: CorrectionAction[]
  ): string[] {
    const newFiles = new Set(currentFiles);
    corrections.forEach(correction => {
      if (correction.filePath) {
        newFiles.add(correction.filePath);
      }
    });
    return Array.from(newFiles);
  }

  /**
   * Suggest appropriate design token for hard-coded value
   */
  private suggestToken(hardCodedValue: string): string {
    // Color mappings
    if (hardCodedValue.includes('#')) {
      if (hardCodedValue.includes('#FF6F61')) return 'var(--lss-sunset-coral)';
      if (hardCodedValue.includes('#55C2FF')) return 'var(--lss-ion-blue)';
      if (hardCodedValue.includes('#FAF9F6')) return 'var(--lss-soft-white)';
      if (hardCodedValue.includes('#0B0F1A')) return 'var(--lss-rich-black)';
      return 'var(--md-sys-color-primary)';
    }

    // Size mappings
    if (hardCodedValue.includes('px')) {
      const value = parseInt(hardCodedValue);
      if (value <= 8) return 'var(--md-sys-spacing-small)';
      if (value <= 16) return 'var(--md-sys-spacing-medium)';
      if (value <= 24) return 'var(--md-sys-spacing-large)';
      return 'var(--md-sys-spacing-xl)';
    }

    return hardCodedValue; // Return original if no mapping found
  }

  /**
   * Save loop result for analysis and debugging
   */
  private async saveLoopResult(result: LoopResult): Promise<void> {
    try {
      const loopDir = path.resolve(process.cwd(), 'agentic-loop-results');
      await fs.mkdir(loopDir, { recursive: true });

      const resultPath = path.join(loopDir, `${this.loopId}.json`);
      await fs.writeFile(resultPath, JSON.stringify(result, null, 2));

      console.log(`📄 Loop result saved: ${resultPath}`);
    } catch (error) {
      console.warn('Failed to save loop result:', error);
    }
  }
}

export default IterativeAgenticLoop;