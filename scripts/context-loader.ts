/**
 * Context Loader - The "Brain" Access System
 * 
 * Provides structured access to all context files for Material Design validation
 * and brand compliance checking. This is the primary interface for Claude Code
 * to access design principles, style guides, and component specifications.
 */

import { promises as fs } from 'fs';
import path from 'path';

export interface BrandAPI {
  colors: Record<string, string>;
  typography: Record<string, any>;
  spacing: Record<string, string>;
  components: Record<string, any>;
}

export interface ValidationContext {
  materialDesignPrinciples: string;
  materialLabStyleGuide: string;
  componentLibrary: string;
  accessibilityRequirements: string;
  brandAPI: BrandAPI;
  antiSlopGuidelines: string;
}

export interface ValidationResult {
  score: number;
  issues: string[];
  recommendations: string[];
  compliance: {
    materialDesign: number;
    brandAlignment: number;
    accessibility: string;
    performance: number;
  };
}

export class ContextLoader {
  private static contextPath = path.resolve(process.cwd(), 'context');
  private static brandApiPath = path.resolve(process.cwd(), 'brand-api');
  private static cache = new Map<string, any>();
  private static cacheTimeout = 5 * 60 * 1000; // 5 minutes

  /**
   * Load Material Design 3 principles and specifications
   */
  static async loadMaterialDesignPrinciples(): Promise<string> {
    return this.loadContextFile('material-design-principles.md');
  }

  /**
   * Load MaterialLab-specific style guide and brand integration rules
   */
  static async loadMaterialLabStyleGuide(): Promise<string> {
    return this.loadContextFile('materiallab-style-guide.md');
  }

  /**
   * Load component library specifications and usage guidelines
   */
  static async loadComponentLibrary(): Promise<string> {
    return this.loadContextFile('component-library.md');
  }

  /**
   * Load accessibility requirements and WCAG 2.1 AA+ standards
   */
  static async loadAccessibilityRequirements(): Promise<string> {
    return this.loadContextFile('accessibility-requirements.md');
  }

  /**
   * Load brand API with machine-readable design tokens
   */
  static async loadBrandAPI(): Promise<BrandAPI> {
    const cacheKey = 'brand-api';
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Load brand primitives
      const primitivesPath = path.join(this.brandApiPath, 'brand-primitives.json');
      const primitives = JSON.parse(await fs.readFile(primitivesPath, 'utf-8'));

      // Load visual tokens  
      const visualTokensPath = path.join(this.brandApiPath, 'visual-tokens.json');
      const visualTokens = JSON.parse(await fs.readFile(visualTokensPath, 'utf-8'));

      // Load voice-tone matrix
      const voiceTonePath = path.join(this.brandApiPath, 'voice-tone-matrix.json');
      const voiceTone = JSON.parse(await fs.readFile(voiceTonePath, 'utf-8'));

      const brandAPI: BrandAPI = {
        colors: this.extractColors(primitives, visualTokens),
        typography: this.extractTypography(primitives, visualTokens),
        spacing: this.extractSpacing(visualTokens),
        components: this.extractComponentSpecs(primitives)
      };

      this.setCache(cacheKey, brandAPI);
      return brandAPI;
    } catch (error) {
      console.warn('Failed to load Brand API, using fallback:', error);
      return this.getFallbackBrandAPI();
    }
  }

  /**
   * Load all context files for comprehensive validation
   */
  static async loadAllContext(): Promise<ValidationContext> {
    const [
      materialDesignPrinciples,
      materialLabStyleGuide, 
      componentLibrary,
      accessibilityRequirements,
      brandAPI,
      antiSlopGuidelines
    ] = await Promise.all([
      this.loadMaterialDesignPrinciples(),
      this.loadMaterialLabStyleGuide(),
      this.loadComponentLibrary(), 
      this.loadAccessibilityRequirements(),
      this.loadBrandAPI(),
      this.loadAntiSlopGuidelines()
    ]);

    return {
      materialDesignPrinciples,
      materialLabStyleGuide,
      componentLibrary,
      accessibilityRequirements,
      brandAPI,
      antiSlopGuidelines
    };
  }

  /**
   * Validate implementation against all context requirements
   */
  static async validateAgainstContext(
    implementation: string,
    componentType: string = 'unknown'
  ): Promise<ValidationResult> {
    const context = await this.loadAllContext();
    
    return {
      score: await this.calculateOverallScore(implementation, context),
      issues: await this.identifyIssues(implementation, context),
      recommendations: await this.generateRecommendations(implementation, context),
      compliance: {
        materialDesign: await this.checkMaterialDesignCompliance(implementation, context),
        brandAlignment: await this.checkBrandAlignment(implementation, context),
        accessibility: await this.checkAccessibilityCompliance(implementation, context),
        performance: await this.checkPerformanceImpact(implementation)
      }
    };
  }

  /**
   * Check if implementation uses only approved design tokens
   */
  static async validateDesignTokenUsage(implementation: string): Promise<{
    valid: boolean;
    violations: string[];
    suggestions: string[];
  }> {
    const brandAPI = await this.loadBrandAPI();
    
    // Check for hard-coded values that should be tokens
    const hardCodedPatterns = [
      /#[0-9a-fA-F]{3,8}/g,  // Hex colors
      /rgb\([^)]+\)/g,       // RGB colors
      /rgba\([^)]+\)/g,      // RGBA colors
      /[0-9]+px(?!\s*var)/g, // Pixel values not in var()
      /[0-9]+rem(?!\s*var)/g // Rem values not in var()
    ];

    const violations: string[] = [];
    const suggestions: string[] = [];

    for (const pattern of hardCodedPatterns) {
      const matches = implementation.match(pattern);
      if (matches) {
        violations.push(...matches);
        suggestions.push(`Replace hard-coded value with design token`);
      }
    }

    return {
      valid: violations.length === 0,
      violations: [...new Set(violations)], // Remove duplicates
      suggestions: [...new Set(suggestions)]
    };
  }

  // Private helper methods

  private static async loadContextFile(filename: string): Promise<string> {
    const cacheKey = `context-${filename}`;
    
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const filePath = path.join(this.contextPath, filename);
      const content = await fs.readFile(filePath, 'utf-8');
      this.setCache(cacheKey, content);
      return content;
    } catch (error) {
      console.error(`Failed to load context file ${filename}:`, error);
      throw new Error(`Context file ${filename} not found or unreadable`);
    }
  }

  private static async loadAntiSlopGuidelines(): Promise<string> {
    try {
      const filePath = path.resolve(process.cwd(), 'ANTI_SLOP_GUIDELINES.md');
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      console.warn('Anti-slop guidelines not found, using defaults');
      return 'Default anti-slop guidelines';
    }
  }

  private static extractColors(primitives: any, visualTokens: any): Record<string, string> {
    const colors: Record<string, string> = {};
    
    // Extract from brand primitives
    if (primitives.brand_identity?.colors) {
      Object.assign(colors, primitives.brand_identity.colors);
    }

    // Extract from visual tokens
    if (visualTokens.colors) {
      Object.assign(colors, visualTokens.colors);
    }

    return colors;
  }

  private static extractTypography(primitives: any, visualTokens: any): Record<string, any> {
    const typography: Record<string, any> = {};

    // Extract typography specifications
    if (visualTokens.typography) {
      Object.assign(typography, visualTokens.typography);
    }

    return typography;
  }

  private static extractSpacing(visualTokens: any): Record<string, string> {
    const spacing: Record<string, string> = {};

    if (visualTokens.spacing) {
      Object.assign(spacing, visualTokens.spacing);
    }

    return spacing;
  }

  private static extractComponentSpecs(primitives: any): Record<string, any> {
    const components: Record<string, any> = {};

    // Extract component specifications from primitives
    if (primitives.components) {
      Object.assign(components, primitives.components);
    }

    return components;
  }

  private static getFallbackBrandAPI(): BrandAPI {
    return {
      colors: {
        'primary': '#FF6F61',
        'secondary': '#55C2FF',
        'surface': '#FAF9F6',
        'background': '#0B0F1A'
      },
      typography: {
        'display-large': { fontSize: '57px', lineHeight: '64px' },
        'body-large': { fontSize: '16px', lineHeight: '24px' }
      },
      spacing: {
        'xs': '4px',
        'sm': '8px', 
        'md': '16px',
        'lg': '24px'
      },
      components: {}
    };
  }

  private static isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    
    const now = Date.now();
    return (now - cached.timestamp) < this.cacheTimeout;
  }

  private static setCache(key: string, value: any): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  // Validation methods

  private static async calculateOverallScore(
    implementation: string,
    context: ValidationContext
  ): Promise<number> {
    // Weighted scoring system
    const weights = {
      materialDesign: 0.25,
      brandAlignment: 0.30,
      accessibility: 0.25,
      performance: 0.20
    };

    const scores = {
      materialDesign: await this.checkMaterialDesignCompliance(implementation, context),
      brandAlignment: await this.checkBrandAlignment(implementation, context),
      accessibility: await this.mapAccessibilityScore(
        await this.checkAccessibilityCompliance(implementation, context)
      ),
      performance: await this.checkPerformanceImpact(implementation)
    };

    return Math.round(
      scores.materialDesign * weights.materialDesign +
      scores.brandAlignment * weights.brandAlignment +
      scores.accessibility * weights.accessibility +
      scores.performance * weights.performance
    );
  }

  private static async checkMaterialDesignCompliance(
    implementation: string,
    context: ValidationContext
  ): Promise<number> {
    let score = 100;
    
    // Check for Material Design token usage
    if (!/var\(--md-sys-/.test(implementation)) {
      score -= 20;
    }

    // Check for proper component structure
    if (!/className.*md-/.test(implementation) && !/Material|MUI/.test(implementation)) {
      score -= 15;
    }

    return Math.max(0, score);
  }

  private static async checkBrandAlignment(
    implementation: string,
    context: ValidationContext
  ): Promise<number> {
    let score = 100;

    // Check for LSS token usage
    if (!/var\(--lss-/.test(implementation)) {
      score -= 25;
    }

    // Check for brand-appropriate language
    const brandViolations = ['magic', 'revolutionary', 'game-changing'];
    const hasViolations = brandViolations.some(term => 
      implementation.toLowerCase().includes(term)
    );
    if (hasViolations) {
      score -= 15;
    }

    return Math.max(0, score);
  }

  private static async checkAccessibilityCompliance(
    implementation: string,
    context: ValidationContext
  ): Promise<string> {
    const hasAriaLabels = /aria-label/.test(implementation);
    const hasSemanticHTML = /<(button|nav|main|aside|header|footer)/.test(implementation);
    const hasFocusManagement = /focus|tabIndex/.test(implementation);

    if (hasAriaLabels && hasSemanticHTML && hasFocusManagement) {
      return 'WCAG 2.1 AA';
    } else if (hasSemanticHTML) {
      return 'Partial';
    } else {
      return 'Non-compliant';
    }
  }

  private static async checkPerformanceImpact(implementation: string): Promise<number> {
    let score = 100;

    // Check for performance anti-patterns
    if (/import.*\*.*from/.test(implementation)) {
      score -= 15; // Barrel imports
    }

    if (/useState.*\[\].*setInterval/.test(implementation)) {
      score -= 10; // Memory leaks
    }

    return Math.max(0, score);
  }

  private static async identifyIssues(
    implementation: string,
    context: ValidationContext
  ): Promise<string[]> {
    const issues: string[] = [];

    // Material Design issues
    if (!/var\(--md-sys-/.test(implementation)) {
      issues.push('Missing Material Design system tokens');
    }

    // Brand alignment issues  
    if (!/var\(--lss-/.test(implementation)) {
      issues.push('Missing MaterialLab LSS design tokens');
    }

    // Accessibility issues
    if (!/aria-/.test(implementation)) {
      issues.push('Missing accessibility attributes');
    }

    return issues;
  }

  private static async generateRecommendations(
    implementation: string,
    context: ValidationContext
  ): Promise<string[]> {
    const recommendations: string[] = [];

    recommendations.push('Use Material Design 3 system tokens for all styling');
    recommendations.push('Apply MaterialLab LSS tokens for brand consistency');
    recommendations.push('Add comprehensive accessibility attributes');
    recommendations.push('Implement keyboard navigation support');

    return recommendations;
  }

  private static mapAccessibilityScore(compliance: string): number {
    switch (compliance) {
      case 'WCAG 2.1 AA': return 100;
      case 'Partial': return 60;
      default: return 30;
    }
  }
}

export default ContextLoader;