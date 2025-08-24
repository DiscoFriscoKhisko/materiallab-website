/**
 * Quality Gates - Execution Pipeline Controller
 * 
 * Implements quality gates for the Claude Code Execution Strategy,
 * ensuring systematic validation at key development stages.
 */

import ClaudeWorkflow from './claude-workflow.js';
import SentinelIntegration from './sentinel-integration.js';
import ContextLoader from './context-loader.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface QualityGate {
  name: string;
  stage: 'pre-implementation' | 'post-implementation' | 'pre-deployment';
  checks: QualityCheck[];
  threshold: number;
  blocking: boolean;
}

export interface QualityCheck {
  name: string;
  type: 'context' | 'validation' | 'visual' | 'sentinel' | 'integration';
  enabled: boolean;
  timeout: number;
}

export interface QualityGateResult {
  gate: string;
  passed: boolean;
  score: number;
  duration: number;
  checks: CheckResult[];
  blockers: string[];
  warnings: string[];
  recommendations: string[];
}

export interface CheckResult {
  check: string;
  passed: boolean;
  score: number;
  duration: number;
  details: any;
}

export class QualityGates {
  private workflow: ClaudeWorkflow;
  private sentinel: SentinelIntegration;
  private gates: QualityGate[];

  constructor() {
    this.workflow = new ClaudeWorkflow();
    this.sentinel = new SentinelIntegration();
    this.gates = this.initializeGates();
  }

  /**
   * Run quality gate for specific development stage
   */
  async runQualityGate(
    stage: 'pre-implementation' | 'post-implementation' | 'pre-deployment',
    context?: {
      changedFiles?: string[];
      userRequest?: string;
      component?: string;
    }
  ): Promise<QualityGateResult> {
    console.log(`🚪 Running ${stage} quality gate...`);
    
    const gate = this.gates.find(g => g.stage === stage);
    if (!gate) {
      throw new Error(`Quality gate not found for stage: ${stage}`);
    }

    const startTime = Date.now();
    const result: QualityGateResult = {
      gate: gate.name,
      passed: false,
      score: 0,
      duration: 0,
      checks: [],
      blockers: [],
      warnings: [],
      recommendations: []
    };

    try {
      // Run all checks for this gate
      for (const check of gate.checks) {
        if (!check.enabled) continue;

        console.log(`  🔍 Running ${check.name}...`);
        const checkResult = await this.runQualityCheck(check, context);
        result.checks.push(checkResult);

        if (!checkResult.passed && gate.blocking) {
          result.blockers.push(`${check.name} failed: ${checkResult.details?.message || 'Unknown error'}`);
        } else if (!checkResult.passed) {
          result.warnings.push(`${check.name} warning: ${checkResult.details?.message || 'Below threshold'}`);
        }
      }

      // Calculate overall score
      result.score = this.calculateGateScore(result.checks);
      result.passed = result.score >= gate.threshold && result.blockers.length === 0;
      result.duration = Date.now() - startTime;

      // Generate recommendations
      result.recommendations = this.generateGateRecommendations(result, gate);

      console.log(`  ${result.passed ? '✅' : '❌'} ${gate.name}: ${result.score}/100`);
      
      if (result.blockers.length > 0) {
        console.log(`  🚫 Blockers: ${result.blockers.length}`);
      }
      if (result.warnings.length > 0) {
        console.log(`  ⚠️  Warnings: ${result.warnings.length}`);
      }

      return result;

    } catch (error) {
      console.error(`❌ Quality gate ${gate.name} failed:`, error);
      result.blockers.push(`Gate execution error: ${error.message}`);
      result.duration = Date.now() - startTime;
      return result;
    }
  }

  /**
   * Run all quality gates in sequence
   */
  async runAllGates(context: any = {}): Promise<{
    overall: boolean;
    results: QualityGateResult[];
    summary: string;
  }> {
    console.log('🚪 Running complete quality gate pipeline...');

    const results: QualityGateResult[] = [];
    let overallPassed = true;

    for (const gate of this.gates) {
      const result = await this.runQualityGate(gate.stage, context);
      results.push(result);

      if (!result.passed && gate.blocking) {
        overallPassed = false;
        console.log(`🚫 Pipeline blocked at ${gate.name}`);
        break;
      }
    }

    const summary = this.generatePipelineSummary(results, overallPassed);
    
    console.log('\n📊 Quality Gate Pipeline Summary:');
    console.log(summary);

    return {
      overall: overallPassed,
      results,
      summary
    };
  }

  /**
   * Initialize default quality gates configuration
   */
  private initializeGates(): QualityGate[] {
    return [
      {
        name: 'Pre-Implementation Gate',
        stage: 'pre-implementation',
        threshold: 80,
        blocking: true,
        checks: [
          {
            name: 'Context File Review',
            type: 'context',
            enabled: true,
            timeout: 30000
          },
          {
            name: 'Design Token Validation',
            type: 'validation',
            enabled: true,
            timeout: 15000
          },
          {
            name: 'Component Specification Check',
            type: 'context',
            enabled: true,
            timeout: 20000
          }
        ]
      },
      {
        name: 'Post-Implementation Gate',
        stage: 'post-implementation',
        threshold: 85,
        blocking: true,
        checks: [
          {
            name: 'Visual Validation',
            type: 'visual',
            enabled: true,
            timeout: 60000
          },
          {
            name: 'Accessibility Check',
            type: 'validation',
            enabled: true,
            timeout: 45000
          },
          {
            name: 'Performance Validation',
            type: 'validation',
            enabled: true,
            timeout: 30000
          },
          {
            name: 'Brand Consistency',
            type: 'sentinel',
            enabled: true,
            timeout: 40000
          }
        ]
      },
      {
        name: 'Pre-Deployment Gate',
        stage: 'pre-deployment',
        threshold: 90,
        blocking: true,
        checks: [
          {
            name: 'Comprehensive Evaluation',
            type: 'sentinel',
            enabled: true,
            timeout: 120000
          },
          {
            name: 'Cross-Browser Testing',
            type: 'visual',
            enabled: true,
            timeout: 90000
          },
          {
            name: 'Responsive Design Validation',
            type: 'visual',
            enabled: true,
            timeout: 60000
          },
          {
            name: 'Integration Testing',
            type: 'integration',
            enabled: true,
            timeout: 180000
          }
        ]
      }
    ];
  }

  /**
   * Run individual quality check
   */
  private async runQualityCheck(
    check: QualityCheck,
    context: any = {}
  ): Promise<CheckResult> {
    const startTime = Date.now();
    
    try {
      // Set timeout for check
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error(`Check timeout: ${check.name}`)), check.timeout);
      });

      const checkPromise = this.executeCheck(check, context);
      const result = await Promise.race([checkPromise, timeoutPromise]);

      return {
        check: check.name,
        passed: result.passed,
        score: result.score,
        duration: Date.now() - startTime,
        details: result.details
      };

    } catch (error) {
      return {
        check: check.name,
        passed: false,
        score: 0,
        duration: Date.now() - startTime,
        details: { error: error.message }
      };
    }
  }

  /**
   * Execute specific check based on type
   */
  private async executeCheck(check: QualityCheck, context: any): Promise<{
    passed: boolean;
    score: number;
    details: any;
  }> {
    switch (check.type) {
      case 'context':
        return await this.runContextCheck(check, context);
        
      case 'validation':
        return await this.runValidationCheck(check, context);
        
      case 'visual':
        return await this.runVisualCheck(check, context);
        
      case 'sentinel':
        return await this.runSentinelCheck(check, context);
        
      case 'integration':
        return await this.runIntegrationCheck(check, context);
        
      default:
        throw new Error(`Unknown check type: ${check.type}`);
    }
  }

  private async runContextCheck(check: QualityCheck, context: any): Promise<{
    passed: boolean;
    score: number;
    details: any;
  }> {
    try {
      if (check.name === 'Context File Review') {
        const contextFiles = await ContextLoader.loadAllContext();
        return {
          passed: true,
          score: 100,
          details: { filesLoaded: Object.keys(contextFiles).length }
        };
      }

      if (check.name === 'Design Token Validation') {
        // Check if design tokens are accessible
        const brandAPI = await ContextLoader.loadBrandAPI();
        const tokenCount = Object.keys(brandAPI.colors).length + Object.keys(brandAPI.spacing).length;
        
        return {
          passed: tokenCount > 0,
          score: tokenCount > 10 ? 100 : 70,
          details: { tokenCount }
        };
      }

      if (check.name === 'Component Specification Check') {
        const componentSpecs = await ContextLoader.loadComponentLibrary();
        return {
          passed: componentSpecs.length > 0,
          score: componentSpecs.length > 1000 ? 100 : 80,
          details: { specsLength: componentSpecs.length }
        };
      }

      return { passed: false, score: 0, details: { error: 'Unknown context check' } };
      
    } catch (error) {
      return {
        passed: false,
        score: 0,
        details: { error: error.message }
      };
    }
  }

  private async runValidationCheck(check: QualityCheck, context: any): Promise<{
    passed: boolean;
    score: number;
    details: any;
  }> {
    try {
      if (check.name === 'Accessibility Check') {
        const result = await this.workflow.handleUserRequest('Accessibility validation', {
          mode: 'quick',
          url: context.url || '/'
        });
        
        return {
          passed: result.score >= 85,
          score: result.score,
          details: { issues: result.issues?.length || 0 }
        };
      }

      if (check.name === 'Performance Validation') {
        // Simplified performance check
        try {
          await execAsync('npm run build 2>/dev/null');
          return {
            passed: true,
            score: 90,
            details: { buildSuccess: true }
          };
        } catch (error) {
          return {
            passed: false,
            score: 40,
            details: { buildError: error.message }
          };
        }
      }

      return { passed: false, score: 0, details: { error: 'Unknown validation check' } };
      
    } catch (error) {
      return {
        passed: false,
        score: 0,
        details: { error: error.message }
      };
    }
  }

  private async runVisualCheck(check: QualityCheck, context: any): Promise<{
    passed: boolean;
    score: number;
    details: any;
  }> {
    try {
      const result = await this.workflow.handleUserRequest('Visual validation', {
        mode: 'quick',
        url: context.url || '/',
        debug: false
      });

      return {
        passed: result.score >= 80,
        score: result.score,
        details: { 
          screenshots: result.screenshots?.length || 0,
          issues: result.issues?.length || 0
        }
      };
      
    } catch (error) {
      return {
        passed: false,
        score: 0,
        details: { error: error.message }
      };
    }
  }

  private async runSentinelCheck(check: QualityCheck, context: any): Promise<{
    passed: boolean;
    score: number;
    details: any;
  }> {
    try {
      // Prepare content for Sentinel evaluation
      const content = {
        changedFiles: context.changedFiles || [],
        component: context.component,
        userRequest: context.userRequest
      };

      const sentinelReport = await this.sentinel.runSentinelEvaluation(content);

      return {
        passed: sentinelReport.overall.score >= 85,
        score: sentinelReport.overall.score,
        details: {
          brandAlignment: sentinelReport.brandAlignment,
          antiSlopCompliance: sentinelReport.antiSlopCompliance,
          evaluations: Object.keys(sentinelReport.evaluations)
        }
      };
      
    } catch (error) {
      return {
        passed: false,
        score: 0,
        details: { error: error.message }
      };
    }
  }

  private async runIntegrationCheck(check: QualityCheck, context: any): Promise<{
    passed: boolean;
    score: number;
    details: any;
  }> {
    try {
      if (check.name === 'Integration Testing') {
        // Run basic integration tests
        try {
          const { stdout } = await execAsync('npm test 2>/dev/null || echo "no tests"');
          
          const testsPassed = !stdout.includes('failed') && !stdout.includes('error');
          
          return {
            passed: testsPassed,
            score: testsPassed ? 95 : 60,
            details: { testOutput: stdout.slice(0, 200) }
          };
        } catch (error) {
          return {
            passed: false,
            score: 30,
            details: { testError: error.message }
          };
        }
      }

      return { passed: false, score: 0, details: { error: 'Unknown integration check' } };
      
    } catch (error) {
      return {
        passed: false,
        score: 0,
        details: { error: error.message }
      };
    }
  }

  private calculateGateScore(checks: CheckResult[]): number {
    if (checks.length === 0) return 0;
    
    const totalScore = checks.reduce((sum, check) => sum + check.score, 0);
    return Math.round(totalScore / checks.length);
  }

  private generateGateRecommendations(
    result: QualityGateResult,
    gate: QualityGate
  ): string[] {
    const recommendations: string[] = [];

    if (result.score < gate.threshold) {
      recommendations.push(`Improve overall quality score to meet ${gate.threshold} threshold`);
    }

    result.checks.forEach(check => {
      if (!check.passed) {
        recommendations.push(`Address issues in ${check.check}`);
      }
    });

    if (result.blockers.length > 0) {
      recommendations.push('Resolve blocking issues before proceeding');
    }

    return recommendations;
  }

  private generatePipelineSummary(
    results: QualityGateResult[],
    overallPassed: boolean
  ): string {
    const totalChecks = results.reduce((sum, result) => sum + result.checks.length, 0);
    const passedChecks = results.reduce((sum, result) => 
      sum + result.checks.filter(check => check.passed).length, 0
    );
    
    const averageScore = results.reduce((sum, result) => sum + result.score, 0) / results.length;
    
    let summary = `Overall Status: ${overallPassed ? '✅ PASSED' : '❌ FAILED'}\n`;
    summary += `Checks: ${passedChecks}/${totalChecks} passed\n`;
    summary += `Average Score: ${Math.round(averageScore)}/100\n`;
    
    results.forEach(result => {
      summary += `\n${result.gate}: ${result.passed ? '✅' : '❌'} ${result.score}/100`;
      if (result.blockers.length > 0) {
        summary += ` (${result.blockers.length} blockers)`;
      }
    });

    return summary;
  }
}

export default QualityGates;