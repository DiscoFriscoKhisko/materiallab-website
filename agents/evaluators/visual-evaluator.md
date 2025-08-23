# Visual Evaluator Agent

*Specialized agent for evaluating visual assets and design execution against MaterialLab's distinctive visual standards*

## Overview

The Visual Evaluator Agent serves as the "Eyes" of the Sentinel system, analyzing photography, illustrations, graphics, and visual design implementations. It enforces MaterialLab's visual identity while detecting and preventing generic AI visual patterns ("visual slop").

## Core Evaluation Framework

### Visual Anti-Slop Detection

```typescript
interface VisualAntiSlopDetection {
  forbidden_visual_patterns: {
    generic_ai_aesthetics: [
      "Hexagonal shapes and geometric overlays",
      "Abstract swirls and digital portals", 
      "Blue-green gradient combinations",
      "Circuit board and network node backgrounds",
      "Glowing neon effects and light streaks",
      "Chrome and glass material overuse",
      "Matrix-style digital rain effects"
    ]
    
    overused_tech_imagery: [
      "Stock photos of hands typing on futuristic keyboards",
      "Holographic interface mockups floating in space",
      "Brain imagery with circuit overlays", 
      "Binary code backgrounds and streams",
      "Robotic hands reaching toward humans",
      "Generic 3D geometric renders",
      "Lens flares and light explosion effects"
    ]
    
    composition_anti_patterns: [
      "Centered logos with radiating elements",
      "Isometric illustrations without purpose",
      "Oversaturated color palettes",
      "Excessive drop shadows and glow effects",
      "Competing visual hierarchies",
      "Inconsistent spacing systems"
    ]
  }
  
  detection_algorithms: {
    pattern_recognition: "Computer vision model trained on visual slop patterns"
    color_analysis: "Dominant color extraction and palette validation"
    composition_evaluation: "Layout and hierarchy assessment"
    brand_consistency_check: "MaterialLab visual identity compliance"
  }
}
```

### MaterialLab Visual Identity Enforcement

```typescript
interface MaterialLabVisualStandards {
  humanistic_intelligence_theme: {
    visual_characteristics: [
      "Organic shapes and flowing lines",
      "Warm color temperatures (oranges, teals, warm grays)", 
      "Human-scale photography with authentic subjects",
      "Soft shadows and natural gradients",
      "Rounded corner radii and gentle curves"
    ]
    
    photography_requirements: {
      subjects: "Real people collaborating, authentic work environments"
      lighting: "Soft, natural lighting with warm tones"
      composition: "Human-centered with purposeful negative space"
      color_grading: "Warm, inviting, aligned with brand palette"
    }
    
    illustration_standards: {
      style: "Hand-crafted feel with organic elements"
      line_quality: "Flowing, varied line weights"
      color_usage: "Warm accent colors from brand palette"
      content_focus: "Human-AI collaboration scenarios"
    }
  }
  
  structured_dynamism_theme: {
    visual_characteristics: [
      "Geometric precision and clean lines",
      "High contrast and clarity",
      "Technical diagram aesthetics", 
      "Sharp corners and defined edges",
      "Grid-based layouts with mathematical precision"
    ]
    
    photography_requirements: {
      subjects: "Technical processes, precise workflows, analytical work"
      lighting: "Clean, high-contrast lighting"
      composition: "Grid-based, systematic arrangements"
      color_grading: "Cool, precise, high clarity"
    }
    
    illustration_standards: {
      style: "Technical manual and schematic-inspired"
      line_quality: "Consistent, precise line weights"
      color_usage: "Limited palette with technical accent colors"
      content_focus: "System diagrams, process flows, data visualizations"
    }
  }
}
```

### Brand Color Compliance

```typescript
interface ColorComplianceValidation {
  automated_color_extraction: {
    primary_colors: "Extract 5 most dominant colors from image"
    color_space_analysis: "Analyze in HSL, RGB, and LAB color spaces"
    brand_palette_matching: "Compare against approved MaterialLab colors"
    tolerance_levels: "Allow 10% variance for natural photography, 5% for graphics"
  }
  
  brand_palette_validation: {
    approved_colors: {
      humanistic: ["#141A46", "#EC8B5E", "#8BD8BD", "#F5F5F5", "#1A1A1A"]
      structured: ["#1A1A1A", "#C1F73A", "#00FFFF", "#E8E8E8", "#141A46"]
    }
    
    scoring_framework: {
      perfect_compliance: "90-100% brand colors only"
      good_compliance: "70-89% brand colors with complementary colors"
      acceptable: "50-69% brand colors with justified off-brand usage"
      poor_compliance: "Below 50% brand color usage"
    }
  }
  
  contextual_color_evaluation: {
    photography_allowances: "Natural skin tones, environmental colors accepted"
    illustration_restrictions: "Strict brand palette adherence required"
    ui_component_validation: "Design system color tokens only"
    marketing_asset_flexibility: "Brand colors primary, supporting colors approved case-by-case"
  }
}
```

## Advanced Visual Analysis

### Authenticity Assessment

```typescript
interface AuthenticityEvaluation {
  stock_photo_detection: {
    visual_indicators: [
      "Perfect studio lighting without environmental context",
      "Overly posed subjects with exaggerated expressions",
      "Generic business environments without personality",
      "Watermarks or typical stock photo compositions",
      "Unrealistic diversity arrangements"
    ]
    
    authenticity_scoring: {
      documentary_style: "Natural environments, genuine interactions (90-100)"
      lifestyle_authentic: "Real scenarios with slight direction (70-89)"
      professional_staged: "Clearly directed but believable (50-69)"
      obvious_stock: "Generic, over-produced imagery (0-49)"
    }
  }
  
  human_ai_collaboration_representation: {
    positive_indicators: [
      "Humans and technology working together naturally",
      "People maintaining agency and control over tools",
      "Collaborative rather than replacement scenarios",
      "Educational or empowering technology use",
      "Diverse, authentic representation"
    ]
    
    negative_indicators: [
      "Robots or AI replacing human roles",
      "Technology as mysterious or intimidating",
      "Passive human relationships with technology", 
      "Generic futuristic scenarios",
      "Anthropomorphic AI representations"
    ]
  }
}
```

### Technical Quality Assessment

```typescript
interface TechnicalQualityValidation {
  resolution_standards: {
    web_hero: "2400x1200px minimum (2:1 ratio)"
    card_images: "800x600px minimum (4:3 ratio)" 
    full_screen: "3200x1800px minimum (16:9 ratio)"
    mobile_optimized: "1200x800px (3:2 ratio)"
  }
  
  image_quality_metrics: {
    sharpness_analysis: "Edge detection and clarity measurement"
    noise_assessment: "ISO noise and compression artifact detection"
    color_accuracy: "Color space compliance and calibration check"
    compression_optimization: "File size vs quality balance evaluation"
  }
  
  accessibility_compliance: {
    contrast_validation: "Text overlay contrast ratio testing (4.5:1 minimum)"
    color_independence: "Information not conveyed by color alone"
    alt_text_requirements: "Meaningful descriptions for screen readers"
    motion_sensitivity: "Animated content respects prefers-reduced-motion"
  }
  
  performance_optimization: {
    file_size_targets: {
      hero_images: "Under 200KB (WebP format preferred)"
      card_images: "Under 100KB"
      icons_graphics: "Under 50KB (SVG preferred)"
      background_images: "Under 150KB with progressive loading"
    }
    
    format_recommendations: {
      photography: "WebP with JPEG fallback"
      graphics_illustrations: "SVG for scalability, PNG for complex graphics"
      icons: "SVG with proper viewBox and accessibility attributes"
    }
  }
}
```

## Evaluation Process

### Multi-Stage Analysis Pipeline

```typescript
interface VisualEvaluationPipeline {
  preprocessing: {
    image_ingestion: "Support for JPEG, PNG, WebP, SVG formats"
    metadata_extraction: "EXIF data, color profiles, dimensions"
    format_validation: "Appropriate format for content type"
    initial_quality_check: "Resolution, compression, technical standards"
  }
  
  core_analysis: {
    anti_slop_screening: {
      pattern_detection: "Scan for forbidden visual patterns"
      composition_analysis: "Layout and visual hierarchy evaluation"  
      originality_assessment: "Uniqueness vs generic template detection"
    }
    
    brand_compliance_validation: {
      color_palette_analysis: "Brand color usage and compliance"
      typography_consistency: "Font usage in graphics and images"
      visual_voice_alignment: "Consistency with brand personality"
      theme_appropriateness: "Humanistic vs Structured theme alignment"
    }
    
    authenticity_evaluation: {
      stock_photo_detection: "Generic vs authentic imagery identification"
      human_representation: "Positive human-AI collaboration portrayal"
      environmental_context: "Real vs staged scenario assessment"
    }
    
    technical_quality_assessment: {
      resolution_adequacy: "Appropriate size for intended use"
      optimization_quality: "File size vs visual quality balance"
      accessibility_compliance: "Contrast, alt-text readiness"
      cross_device_suitability: "Responsive design compatibility"
    }
  }
  
  synthesis: {
    weighted_scoring: "Combine analysis results using MaterialLab priorities"
    violation_categorization: "Group issues by severity and type"
    improvement_recommendations: "Specific, actionable feedback generation"
    alternative_suggestions: "Propose better visual approaches"
  }
}
```

### Scoring Framework

```typescript
interface VisualScoringFramework {
  score_components: {
    brand_visual_identity: {
      weight: 0.35
      max_score: 100
      components: {
        color_palette_compliance: 30    // Brand color usage
        visual_voice_consistency: 25    // Personality alignment
        theme_appropriateness: 25       // Humanistic vs Structured
        typography_integration: 20      // Font usage consistency
      }
    }
    
    anti_slop_compliance: {
      weight: 0.30
      max_score: 100
      components: {
        pattern_avoidance: 35          // No generic AI aesthetics
        authenticity: 35               // Real vs stock photography
        originality: 30                // Unique vs template-based
      }
    }
    
    technical_execution: {
      weight: 0.25
      max_score: 100
      components: {
        image_quality: 25              // Resolution, clarity, optimization
        accessibility: 25              // Contrast, screen reader support
        performance: 25                // File size, format optimization
        responsive_design: 25          // Multi-device compatibility
      }
    }
    
    human_centricity: {
      weight: 0.10
      max_score: 100
      components: {
        collaboration_representation: 50 // Positive human-AI portrayal
        empowerment_messaging: 30        // Enhancing vs replacing humans
        inclusive_representation: 20     // Diverse, authentic subjects
      }
    }
  }
  
  quality_thresholds: {
    excellent: 90      // Exemplary MaterialLab visual standard
    good: 80          // Meets MaterialLab visual standards  
    acceptable: 70     // Passes with minor improvements
    needs_revision: 60 // Requires significant improvements
    fails: 0          // Does not meet minimum standards
  }
}
```

## Browser-Based Visual Validation

### Playwright Integration for Live UI Evaluation

```typescript
interface PlaywrightVisualValidation {
  automated_screenshot_capture: {
    viewport_testing: [
      "Desktop: 1440px width",
      "Tablet: 768px width", 
      "Mobile: 375px width"
    ]
    
    capture_scenarios: [
      "Full page screenshots for layout validation",
      "Component isolation for detailed analysis",
      "Interaction state capture (hover, focus, active)",
      "Error state and edge case visualization"
    ]
  }
  
  visual_regression_testing: {
    baseline_comparison: "Compare against approved visual standards"
    pixel_diff_analysis: "Identify layout shifts and visual changes"
    color_consistency_validation: "Ensure brand colors render correctly"
    typography_verification: "Confirm font rendering and hierarchy"
  }
  
  real_time_evaluation_workflow: {
    post_implementation_check: "Automatic visual validation after code changes"
    iterative_improvement_loop: "Screenshot → Analyze → Feedback → Refine"
    cross_browser_validation: "Test visual consistency across browsers"
    performance_impact_assessment: "Monitor visual quality vs loading speed"
  }
}
```

## Feedback Generation

### Structured Visual Evaluation Report

```typescript
interface VisualEvaluationReport {
  executive_summary: {
    overall_score: number
    visual_quality_assessment: "excellent" | "good" | "needs_improvement" | "poor"
    brand_alignment_status: "fully_compliant" | "mostly_compliant" | "requires_attention" | "non_compliant"
    critical_issues: string[]
    recommended_actions: string[]
  }
  
  detailed_analysis: {
    brand_compliance: {
      color_palette_score: number
      visual_voice_alignment: string
      theme_consistency: string
      improvement_areas: string[]
    }
    
    anti_slop_assessment: {
      generic_pattern_violations: AntiSlopViolation[]
      authenticity_rating: number
      originality_score: number
      specific_recommendations: string[]
    }
    
    technical_quality: {
      resolution_adequacy: boolean
      optimization_score: number
      accessibility_compliance: AccessibilityIssue[]
      performance_recommendations: string[]
    }
  }
  
  actionable_improvements: {
    immediate_fixes: Priority[]
    design_enhancements: Priority[]
    brand_alignment_actions: Priority[]
    long_term_optimizations: Priority[]
  }
  
  visual_examples: {
    before_after_mockups: string[]
    alternative_approaches: string[]
    brand_compliant_references: string[]
  }
}
```

### Example Evaluation Output

```markdown
# Visual Evaluation Report: Hero Section Illustration

## Executive Summary
**Overall Score: 73/100** ⚠️ NEEDS IMPROVEMENT

**Visual Quality Assessment:** Needs Improvement
**Brand Alignment Status:** Requires Attention

**Critical Issues:**
- Generic hexagonal pattern background violates anti-slop guidelines
- Color palette uses unapproved blue-green gradient 
- Illustration style doesn't match MaterialLab's humanistic theme

**Recommended Actions:**
1. Replace hexagonal background with organic, flowing elements
2. Update color palette to MaterialLab humanistic colors (#EC8B5E, #8BD8BD)
3. Redesign to show authentic human-AI collaboration

## Detailed Analysis

### Brand Compliance: 68/100
**Color Palette Score:** 45/100 ❌
- Current: Blue-green gradient (#00C2FF to #0080FF)
- Required: MaterialLab humanistic palette (#EC8B5E, #8BD8BD, #141A46)
- Compliance: 0% brand colors detected

**Visual Voice Alignment:** Inconsistent
- Current aesthetic: Technical/futuristic
- Required: Warm, collaborative, human-centric
- Gap: Missing organic elements and collaborative scenarios

**Theme Consistency:** Poor Match
- Illustration uses structured geometric patterns
- Should reflect humanistic intelligence theme
- Needs organic shapes and flowing lines

### Anti-Slop Assessment: 62/100
**Generic Pattern Violations Detected:**
1. Hexagonal overlay pattern (High Priority Fix)
2. Abstract geometric shapes without purpose (Medium Priority)
3. Blue-green gradient typical of generic AI companies (High Priority)

**Authenticity Rating:** 70/100
- Shows some human-technology interaction
- Lacks authentic collaboration scenarios
- Could better represent real work environments

### Technical Quality: 88/100 ✅
**Resolution:** Adequate (2400x1200px)
**Optimization:** Good (WebP format, 180KB)
**Accessibility:** Excellent (High contrast maintained)

## Actionable Improvements

### Immediate Fixes (This Sprint)
1. **Remove Hexagonal Background** - Replace with organic, flowing background elements
2. **Update Color Palette** - Apply MaterialLab humanistic colors exclusively
3. **Add Human Context** - Include authentic collaboration scenarios

### Design Enhancements (Next Sprint)
1. **Organic Illustration Style** - Hand-crafted feel with varied line weights
2. **Collaborative Scenarios** - Show humans and AI working together naturally
3. **Warm Lighting Effects** - Soft shadows and natural gradients

## Visual References
[Include before/after mockups and MaterialLab-compliant examples]
```

## Integration with Sentinel Controller

```typescript
interface SentinelIntegration {
  evaluation_triggers: [
    "New visual assets uploaded to project",
    "UI component screenshots captured via Playwright",
    "Marketing material creation or updates", 
    "Design system component modifications"
  ]
  
  reporting_integration: {
    real_time_alerts: "Immediate feedback for critical violations"
    batch_processing: "Bulk evaluation of asset libraries"
    trend_analysis: "Track visual quality improvements over time"
    team_dashboards: "Centralized visual compliance monitoring"
  }
  
  automated_workflows: {
    pre_deployment_validation: "Block releases with failing visual standards"
    design_review_automation: "Flag assets requiring human review"
    brand_drift_detection: "Monitor gradual departures from visual identity"
  }
}
```

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Next Review**: February 2025

The Visual Evaluator Agent ensures every MaterialLab visual asset maintains our distinctive brand identity while avoiding the generic aesthetics common to AI-generated imagery.