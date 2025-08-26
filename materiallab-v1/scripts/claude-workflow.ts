/**
 * Claude Workflow - Main Orchestrator
 * 
 * Central coordinator for the Claude Code Execution Strategy.
 * Handles user requests and orchestrates the complete validation pipeline.
 */

import IterativeAgenticLoop from './agentic-loop.js';
import { QuickChecker } from './quick-check.js';
import ValidationPipeline from './validation-pipeline.js';
import ContextLoader from './context-loader.js';

export interface WorkflowOptions {
  mode: 'quick' | 'full' | 'loop';
  url?: string;
  component?: string;
  files?: string[];
  debug?: boolean;
}

export class ClaudeWorkflow {
  private quickChecker: QuickChecker;
  private validator: ValidationPipeline;
  private agenticLoop: IterativeAgenticLoop;

  constructor() {
    this.quickChecker = new QuickChecker();
    this.validator = new ValidationPipeline();
    this.agenticLoop = new IterativeAgenticLoop();
  }

  /**
   * Handle user request with full orchestration
   */
  async handleUserRequest(
    request: string,
    options: WorkflowOptions = { mode: 'quick' }
  ): Promise<any> {
    console.log(`🚀 Processing: ${request}`);
    console.log(`📚 Loading context...`);

    try {
      // Load context for guidance
      const context = await ContextLoader.loadAllContext();
      
      switch (options.mode) {
        case 'quick':
          return await this.runQuickCheck(options);
        
        case 'full':
          return await this.runFullValidation(options.files || []);
        
        case 'loop':
          return await this.runAgenticLoop(request, options.files || []);
        
        default:
          throw new Error(`Unknown mode: ${options.mode}`);
      }
    } catch (error) {
      console.error('❌ Workflow failed:', error);
      throw error;
    }
  }

  /**
   * Run quick validation check
   */
  private async runQuickCheck(options: WorkflowOptions) {
    console.log('⚡ Running quick validation...');
    
    const result = await this.quickChecker.runQuickCheck({
      url: options.url,
      component: options.component,
      debug: options.debug
    });

    this.printQuickResults(result);
    return result;
  }

  /**
   * Run full validation pipeline
   */
  private async runFullValidation(files: string[]) {
    console.log('🔍 Running comprehensive validation...');
    
    const result = await this.validator.runCompleteValidation(files);
    
    this.printValidationResults(result);
    return result;
  }

  /**
   * Run iterative agentic loop for complex corrections
   */
  private async runAgenticLoop(request: string, files: string[]) {
    console.log('🔄 Running iterative agentic loop...');
    
    const result = await this.agenticLoop.executeLoop(request, files);
    
    this.printLoopResults(result);
    return result;
  }

  private printQuickResults(result: any) {
    const status = result.passed ? '✅ PASSED' : '❌ FAILED';
    console.log(`${status} - Score: ${result.score}/100`);
    
    if (result.issues.length > 0) {
      console.log('\n🔍 Issues:');
      result.issues.forEach((issue: any) => {
        console.log(`  - ${issue.message}`);
      });
    }
  }

  private printValidationResults(result: any) {
    console.log(`\n📊 Validation Results:`);
    console.log(`Overall: ${result.overall.status.toUpperCase()} (${result.overall.score}/100)`);
    
    Object.entries(result.categories).forEach(([name, category]: [string, any]) => {
      console.log(`${name}: ${category.score}/100 (${category.status})`);
    });
  }

  private printLoopResults(result: any) {
    console.log(`\n🔄 Agentic Loop Results:`);
    console.log(`Status: ${result.success ? 'SUCCESS' : 'NEEDS REVIEW'}`);
    console.log(`Iterations: ${result.totalIterations}`);
    console.log(`Final Score: ${result.finalScore}/100`);
    
    if (result.finalRecommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      result.finalRecommendations.forEach((rec: string) => {
        console.log(`  - ${rec}`);
      });
    }
  }
}

export default ClaudeWorkflow;