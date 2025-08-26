# CLAUDE.md - Material Design Excellence System

*Implementation of the Orchestration Layer approach for pixel-perfect Material Design execution with Claude Code*

## Overview

This file implements the complete **Orchestration Layer** system described in the video tutorial, providing Claude Code with the **Context** (brain), **Tools** (hands), and **Validators** (eyes) needed for exceptional Material Design execution through an **Iterative Agentic Loop**.

## Project Structure & Naming Conventions

### File Structure
```
/src/components     # Reusable React components (PascalCase)
/src/pages          # Page-level components (PascalCase)
/src/styles         # Global styles and theme definitions
/src/hooks          # Custom React hooks (camelCase)
/src/utils          # Utility functions and helpers
/src/types          # TypeScript type definitions
/context            # Design system and validation documents
/agents             # Sentinel evaluation system
/brand-api          # Machine-readable brand guidelines
```

### Naming Conventions
- **Components**: PascalCase (e.g., `PrimaryButton.tsx`, `UserProfile.tsx`)
- **Files**: kebab-case (e.g., `user-profile.tsx`, `api-client.ts`)
- **CSS Variables**: kebab-case (e.g., `--md-sys-color-primary`, `--md-sys-typescale-body-large`)
- **Functions**: camelCase (e.g., `handleUserInput`, `validateFormData`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `MAX_RETRY_ATTEMPTS`)

## Design System: Material Design 3 (The "Validators")

### Core Principles
- **Comprehensive design principles**: Located in `/context/material-design-principles.md`
- **Brand style guide**: Located in `/context/materiallab-style-guide.md`
- **Component specifications**: Located in `/context/component-library.md`
- **Anti-slop guidelines**: Located in `/ANTI_SLOP_GUIDELINES.md`

**CRITICAL RULE**: When making ANY visual changes (front-end, UI/UX), you MUST:
1. Read the relevant context files first
2. Validate against Material Design 3 specifications
3. Check brand compliance using the Brand API
4. Run the Iterative Agentic Loop validation process

### Component Library Standards
- **Primary Framework**: Material-UI (MUI) v5+ for React implementing Material Design 3
- **Design System**: All components MUST use MaterialLab design tokens from `/src/styles/tokens.css`
- **Accessibility**: Components built on Radix UI primitives where MUI doesn't provide sufficient accessibility
- **AI Integration**: All AI-related components must include transparency and user control elements

### Design Tokens (Strict Compliance Required)
```typescript
// MANDATORY: Use only these design tokens, never hard-coded values
interface MaterialDesignTokens {
  colors: {
    // Use CSS custom properties only
    primary: 'var(--md-sys-color-primary)'
    surface: 'var(--md-sys-color-surface)'
    onSurface: 'var(--md-sys-color-on-surface)'
    // Never use: '#FF5722', 'blue', 'rgba(255,87,34,1)'
  }
  
  typography: {
    // Use type scale tokens only
    displayLarge: 'var(--md-sys-typescale-display-large)'
    bodyLarge: 'var(--md-sys-typescale-body-large)'
    // Never use: '24px', '1.5rem', 'font-size: large'
  }
  
  spacing: {
    // Use 4px grid system
    unit: '4px' // Base unit
    small: '8px' // 2 units
    medium: '16px' // 4 units  
    large: '24px' // 6 units
    // Never use: '10px', '15px', '23px'
  }
}
```

## Iterative Agentic Loop Workflows (The "Process")

### 🔄 MANDATORY: Quick Visual Check
**Execute IMMEDIATELY after ANY front-end implementation or change:**

```typescript
interface QuickVisualCheckProtocol {
  step1_identify_changes: {
    action: "Review what components/pages were modified"
    output: "List of changed views and components"
  }
  
  step2_navigate_and_capture: {
    action: "Use Playwright to navigate to each affected page"
    commands: [
      "Navigate to changed pages using browser navigation tools",
      "Set viewport to 1440px width (desktop) for primary screenshots", 
      "Take full-page screenshots of each modified view",
      "Test responsive breakpoints: 768px (tablet), 375px (mobile)"
    ]
  }
  
  step3_validate_design_compliance: {
    action: "Compare screenshots against validation criteria"
    validators: [
      "/context/material-design-principles.md",
      "/context/materiallab-style-guide.md", 
      "/ANTI_SLOP_GUIDELINES.md",
      "Brand API color compliance",
      "Typography token usage"
    ]
  }
  
  step4_verify_implementation: {
    action: "Confirm the change fulfills user requirements"
    checks: [
      "Feature works as requested",
      "User story requirements met",
      "Acceptance criteria satisfied",
      "Error states handled appropriately"
    ]
  }
  
  step5_check_console_errors: {
    action: "Verify no JavaScript or accessibility errors"
    commands: [
      "Check browser console for errors",
      "Validate WCAG compliance using accessibility tools",
      "Test keyboard navigation",
      "Verify screen reader compatibility"
    ]
  }
  
  step6_document_evidence: {
    action: "Capture evidence of successful implementation"
    deliverables: [
      "Full-page screenshot at 1440px showing the change",
      "Mobile responsive screenshot at 375px",
      "Console log confirmation (no errors)",
      "Accessibility validation results"
    ]
  }
}
```

### 🔄 Advanced: Comprehensive Design Review
**Trigger the Sentinel Agent system for thorough validation:**

```bash
# Invoke comprehensive evaluation using Sentinel system
@sentinel-evaluation --type comprehensive --changed-files [file_list] --context "Material Design compliance review"

# This triggers:
# 1. UX Evaluator for user experience assessment
# 2. Visual Evaluator for brand and aesthetic compliance  
# 3. Copy Evaluator for voice and messaging consistency
# 4. Code Evaluator for implementation quality and security
```

### 🔄 Self-Correction Loop Implementation
```typescript
interface SelfCorrectionLoop {
  iteration_process: {
    max_iterations: 3
    success_criteria: {
      design_compliance_score: 85 // Minimum passing score
      accessibility_compliance: "WCAG 2.1 AA"
      brand_alignment: 90 // High standard for brand consistency
      user_experience: 80 // Minimum UX quality
    }
  }
  
  correction_workflow: {
    if_score_below_threshold: [
      "Identify specific issues from evaluation report",
      "Apply corrections based on MaterialLab standards",
      "Re-run Quick Visual Check process",
      "Continue loop until success criteria met"
    ]
    
    if_max_iterations_reached: [
      "Flag for human review",
      "Document blocking issues", 
      "Provide detailed improvement roadmap",
      "Escalate to appropriate team member"
    ]
  }
}
```

## Context Integration (The "Brain")

### Material Design 3 Context Files
```typescript
interface ContextFileStructure {
  design_principles: {
    file: "/context/material-design-principles.md"
    contains: [
      "Material Design 3 core principles and philosophy",
      "Component behavior specifications", 
      "Interaction patterns and motion principles",
      "Accessibility requirements and WCAG guidelines"
    ]
  }
  
  materiallab_style_guide: {
    file: "/context/materiallab-style-guide.md"
    contains: [
      "MaterialLab brand application of Material Design",
      "Custom color palette and token definitions",
      "Typography hierarchy and usage rules",
      "Component customization guidelines"
    ]
  }
  
  component_library: {
    file: "/context/component-library.md"
    contains: [
      "MaterialLab component specifications",
      "Usage examples and implementation patterns",
      "Accessibility requirements per component",
      "AI integration standards for interactive elements"
    ]
  }
  
  anti_slop_validation: {
    file: "/ANTI_SLOP_GUIDELINES.md"
    contains: [
      "Generic pattern detection criteria",
      "MaterialLab distinctiveness requirements",
      "Human-centric implementation standards",
      "Brand voice and visual identity enforcement"
    ]
  }
}
```

### Brand API Integration
```typescript
interface BrandAPIUsage {
  real_time_validation: {
    color_compliance: "Validate all colors against approved palette in brand-api/visual-tokens.json"
    voice_consistency: "Check copy against voice-tone-matrix.json for context-appropriate messaging"
    lexicon_compliance: "Ensure terminology aligns with brand-lexicon.json standards"
    primitive_alignment: "Validate overall approach against brand-primitives.json values"
  }
  
  automated_checking: {
    before_implementation: "Reference Brand API for guidance"
    after_implementation: "Validate output against Brand API standards"
    continuous_monitoring: "Track compliance over time"
  }
}
```

## Tool Integration (The "Hands")

### Playwright Browser Control
```typescript
interface PlaywrightIntegration {
  automated_testing: {
    visual_regression: "Compare screenshots against approved baselines"
    accessibility_scanning: "Automated WCAG compliance checking"
    responsive_testing: "Multi-breakpoint layout validation"
    interaction_testing: "User flow and component behavior verification"
  }
  
  development_workflow: {
    post_change_validation: "Automatic screenshots after code changes"
    multi_browser_testing: "Chrome, Firefox, Safari compatibility"
    mobile_simulation: "iOS and Android viewport testing"
    performance_monitoring: "Core Web Vitals measurement"
  }
}
```

### File System Operations
```typescript
interface FileSystemTools {
  context_file_access: {
    read_design_principles: "Access Material Design specifications during implementation"
    validate_against_styleguide: "Compare implementations against MaterialLab standards"
    reference_component_specs: "Ensure components meet documented specifications"
  }
  
  code_analysis: {
    component_scanning: "Analyze existing components for consistency"
    dependency_checking: "Validate Material-UI and design token usage"
    documentation_validation: "Ensure comprehensive component documentation"
  }
}
```

## Code Quality & Security Standards

### Implementation Requirements
```typescript
interface CodeStandards {
  security_first: {
    mandatory_practices: [
      "All user inputs validated server-side",
      "XSS prevention through proper sanitization",
      "CSRF protection for state-changing operations",
      "Secrets management through environment variables",
      "Dependency vulnerability scanning"
    ]
  }
  
  material_design_compliance: {
    component_usage: "Use MUI components as primary building blocks"
    customization_approach: "Extend MUI theme for MaterialLab brand requirements"
    accessibility_standards: "WCAG 2.1 AA compliance mandatory"
    responsive_design: "Mobile-first approach with Material breakpoints"
  }
  
  documentation_requirements: {
    component_documentation: [
      "Comprehensive JSDoc with usage examples",
      "Accessibility considerations explained",
      "Material Design compliance notes",
      "Security implications documented"
    ]
  }
}
```

### Git Workflow Integration
```typescript
interface GitWorkflow {
  commit_standards: {
    format: "Conventional Commits (feat:, fix:, docs:, style:, refactor:, test:, chore:)"
    mandatory_checks: [
      "Lint passing (npm run lint)",
      "Type checking (npm run type-check)",
      "Quick Visual Check completed",
      "Screenshots included for UI changes"
    ]
  }
  
  pull_request_requirements: {
    description: "Include screenshots of changes"
    validation: "Sentinel evaluation report attached"
    review_criteria: "Design compliance and code quality verified"
  }
}
```

## Specialized Agent Integration

### Sentinel System Usage
```typescript
interface SentinelAgentUsage {
  trigger_conditions: [
    "New UI component implementation",
    "Visual design changes",
    "Copy or content updates", 
    "Material Design compliance validation needed",
    "Pre-deployment quality assurance"
  ]
  
  evaluation_workflow: {
    automatic_triggers: "Post-implementation validation"
    manual_invocation: "@sentinel-evaluation --type [evaluation_type]"
    reporting: "Detailed feedback with improvement recommendations"
    blocking_criteria: "Critical issues prevent deployment"
  }
  
  agent_specialization: {
    ux_evaluator: "Material Design pattern compliance and user experience"
    visual_evaluator: "Brand consistency and aesthetic quality"
    copy_evaluator: "Voice, tone, and messaging alignment"
    code_evaluator: "Security, documentation, and implementation quality"
  }
}
```

## Development Commands & Workflow

### Essential Commands
```bash
# Development server with hot reload
npm run dev

# Production build with full validation
npm run build

# Type checking (run before commits)
npm run type-check  

# Lint checking and fixing
npm run lint
npm run lint:fix

# Accessibility testing
npm run a11y

# Visual regression testing
npm run test:visual

# Complete validation pipeline
npm run validate:all
```

### Iterative Development Workflow
```typescript
interface DevelopmentWorkflow {
  implementation_cycle: {
    step1: "Receive user request or feature requirement"
    step2: "Read relevant context files for guidance"
    step3: "Implement using Material Design components and tokens"
    step4: "Run Quick Visual Check protocol immediately"
    step5: "Self-correct if validation fails"
    step6: "Document implementation with screenshots"
    step7: "Commit with proper conventional commit message"
  }
  
  quality_gates: {
    pre_implementation: "Context file review and planning"
    post_implementation: "Quick Visual Check mandatory"
    pre_commit: "Lint, type-check, and accessibility validation"
    pre_deployment: "Comprehensive Sentinel evaluation"
  }
}
```

## Example Usage Patterns

### Component Implementation Example
```typescript
// 1. Read context files first
// Reference: /context/material-design-principles.md
// Reference: /context/component-library.md

// 2. Implement using Material Design standards
import { Button as MuiButton, ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

/**
 * MaterialLab Primary Button - Implements Material Design 3 button with brand customization
 * 
 * This component extends MUI Button with MaterialLab brand tokens and ensures
 * accessibility compliance. Used for primary user actions across the application.
 * 
 * @param variant - Material Design button variant with MaterialLab styling
 * @param size - Touch-friendly sizes following Material Design specifications
 * @param children - Button label text (should be clear and action-oriented)
 * 
 * @example
 * ```tsx
 * <PrimaryButton variant="contained" size="large" onClick={handleSubmit}>
 *   Submit Project
 * </PrimaryButton>
 * ```
 * 
 * Accessibility: Includes focus indicators, keyboard navigation, and ARIA support
 * Material Design: Follows M3 button specifications with MaterialLab brand tokens
 */
const PrimaryButton = styled(MuiButton)(({ theme }) => ({
  // Use design tokens exclusively
  backgroundColor: 'var(--md-sys-color-primary)',
  color: 'var(--md-sys-color-on-primary)',
  borderRadius: 'var(--md-sys-shape-corner-full)',
  padding: 'var(--md-sys-spacing-medium) var(--md-sys-spacing-large)',
  
  // Material Design 3 typography tokens
  ...theme.typography.labelLarge,
  
  '&:hover': {
    backgroundColor: 'var(--md-sys-color-primary-hover)',
  },
  
  '&:focus': {
    outline: '2px solid var(--md-sys-color-outline)',
    outlineOffset: '2px',
  },
}));

// 3. After implementation, run Quick Visual Check
// 4. Take screenshots at 1440px and 375px viewports
// 5. Validate against Material Design principles
// 6. Commit with proper message: "feat(ui): implement MaterialLab primary button with M3 compliance"
```

### Page Implementation Example
```typescript
// 1. Plan based on Material Design layout principles
// Reference: /context/material-design-principles.md (Layout section)

const UserProfilePage: React.FC = () => {
  // 2. Use Material Design layout components
  return (
    <Container maxWidth="md">
      <Typography 
        variant="displayMedium" 
        sx={{ 
          color: 'var(--md-sys-color-on-surface)',
          marginBottom: 'var(--md-sys-spacing-large)'
        }}
      >
        User Profile
      </Typography>
      
      <Grid container spacing={'var(--md-sys-spacing-medium)'}>
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ padding: 'var(--md-sys-spacing-large)' }}>
            {/* Form implementation with Material Design text fields */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ padding: 'var(--md-sys-spacing-large)' }}>
            {/* Avatar and quick actions */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

// 3. Post-implementation: Quick Visual Check
// 4. Screenshot at multiple breakpoints
// 5. Validate responsive behavior
// 6. Check accessibility with keyboard navigation
```

## Success Metrics & Monitoring

### Quality Thresholds
```typescript
interface QualityThresholds {
  material_design_compliance: 90 // Minimum score for M3 adherence
  brand_alignment: 85 // MaterialLab brand consistency
  accessibility: "WCAG 2.1 AA" // Mandatory accessibility standard
  performance: {
    core_web_vitals: "All green scores"
    bundle_size: "Within budget constraints"
    lighthouse_score: 90 // Minimum Lighthouse score
  }
}
```

### Continuous Improvement
```typescript
interface ContinuousImprovement {
  daily_monitoring: [
    "Component consistency across implementations",
    "Design token usage compliance",
    "Accessibility compliance tracking",
    "Performance metrics monitoring"
  ]
  
  weekly_reviews: [
    "Material Design specification updates",
    "Brand guideline refinements", 
    "Component library additions",
    "Developer experience improvements"
  ]
  
  quality_trends: [
    "Track improvement in evaluation scores",
    "Monitor reduction in design inconsistencies",
    "Measure developer productivity gains",
    "Assess user experience improvements"
  ]
}
```

---

## Quick Reference Commands

```bash
# Start development with full validation enabled
npm run dev --validation

# Run complete quality check before committing  
npm run pre-commit-check

# Generate visual regression baseline
npm run visual:baseline

# Run Sentinel evaluation manually
npm run sentinel:evaluate -- --type comprehensive

# Deploy with full validation pipeline
npm run deploy:validated
```

**Remember**: Every UI change must pass through the Iterative Agentic Loop for pixel-perfect Material Design compliance and MaterialLab brand consistency.

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Integration**: Claude Code Orchestration Layer System

This file transforms Claude Code into a Material Design expert that delivers pixel-perfect, brand-compliant implementations through systematic validation and self-correction.