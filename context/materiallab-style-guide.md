# MaterialLab Style Guide - Material Design Integration

*Brand-specific implementation guidelines for Material Design 3 components*

## Brand Integration with Material Design

### Primary Brand Colors to Material Design Mapping

```css
/* MaterialLab Brand → Material Design Token Mapping */

/* Primary Palette */
--md-sys-color-primary: var(--lss-sunset-coral);      /* #FF6F61 */
--md-sys-color-on-primary: var(--lss-soft-white);     /* #FAF9F6 */
--md-sys-color-primary-container: rgba(255, 111, 97, 0.12);
--md-sys-color-on-primary-container: var(--lss-rich-black);

/* Secondary Palette */
--md-sys-color-secondary: var(--lss-ion-blue);        /* #55C2FF */
--md-sys-color-on-secondary: var(--lss-rich-black);   /* #0B0F1A */
--md-sys-color-secondary-container: rgba(85, 194, 255, 0.12);
--md-sys-color-on-secondary-container: var(--lss-rich-black);

/* Surface & Background */
--md-sys-color-surface: var(--lss-soft-white);        /* Light mode */
--md-sys-color-surface-dark: var(--lss-rich-black);   /* Dark mode */
--md-sys-color-on-surface: var(--lss-rich-black);     /* Light mode */
--md-sys-color-on-surface-dark: var(--lss-soft-white); /* Dark mode */

/* LSS Theme Integration */
--md-sys-color-background: var(--lss-bg-primary);
--md-sys-color-on-background: var(--lss-text-primary);
```

### Typography Integration

#### MaterialLab Font Stack + Material Design Scale
```css
/* Primary Typography */
--md-ref-typeface-brand: 'Space Grotesk Variable', sans-serif;
--md-ref-typeface-body: 'Inter Variable', sans-serif; 
--md-ref-typeface-code: 'JetBrains Mono', monospace;

/* Material Design Scale with MaterialLab Fonts */
--md-sys-typescale-display-large-font: var(--md-ref-typeface-brand);
--md-sys-typescale-display-large-size: 57px;
--md-sys-typescale-display-large-line-height: 64px;
--md-sys-typescale-display-large-weight: 400;

--md-sys-typescale-headline-large-font: var(--md-ref-typeface-brand);
--md-sys-typescale-headline-large-size: 32px;
--md-sys-typescale-headline-large-line-height: 40px;
--md-sys-typescale-headline-large-weight: 500;

--md-sys-typescale-body-large-font: var(--md-ref-typeface-body);
--md-sys-typescale-body-large-size: 16px;
--md-sys-typescale-body-large-line-height: 24px;
--md-sys-typescale-body-large-weight: 400;
```

### Component Customization Rules

#### Buttons - MaterialLab Variant
```typescript
interface MaterialLabButtonSpecs {
  primary: {
    background: 'var(--md-sys-color-primary)',
    color: 'var(--md-sys-color-on-primary)',
    borderRadius: '8px', // Rounded corners for approachable feel
    typography: 'var(--md-sys-typescale-label-large)',
    elevation: {
      rest: '0px',
      hover: '4px', // Subtle lift on hover
      active: '2px'
    },
    animation: {
      duration: 'var(--md-sys-motion-duration-short2)', // 100ms
      easing: 'var(--md-sys-motion-easing-standard)'
    }
  },
  secondary: {
    background: 'transparent',
    color: 'var(--md-sys-color-primary)',
    border: '1px solid var(--md-sys-color-primary)',
    backdropFilter: 'blur(8px)', // Glassmorphism effect
    borderRadius: '8px'
  }
}
```

#### Cards - MaterialLab Glass Effect
```typescript
interface MaterialLabCardSpecs {
  surface: {
    background: 'var(--lss-glass-surface)',
    backdropFilter: 'blur(12px)',
    border: '1px solid var(--lss-glass-border)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
  },
  content: {
    padding: '24px',
    gap: '16px'
  },
  hover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.16)',
    transition: 'all 200ms ease-out'
  }
}
```

### AI-Centric Component Guidelines

#### AI Transparency Components
```typescript
interface AIComponentSpecs {
  aiIndicator: {
    position: 'top-right' | 'bottom-left',
    icon: 'sparkle' | 'ai-chip',
    color: 'var(--md-sys-color-tertiary)',
    tooltip: 'This content was generated with AI assistance'
  },
  
  explainabilityPanel: {
    trigger: 'info icon',
    surface: 'var(--md-sys-color-surface-variant)',
    maxWidth: '400px',
    content: 'Clear explanation of AI decision-making process'
  },
  
  userControl: {
    toggles: 'AI assistance on/off',
    feedback: 'thumbs up/down for AI output',
    regenerate: 'option to regenerate AI content'
  }
}
```

### Accessibility Enhancements

#### MaterialLab-Specific A11y Requirements
```typescript
interface AccessibilityEnhancements {
  focusIndicators: {
    color: 'var(--md-sys-color-primary)',
    width: '2px',
    offset: '2px',
    borderRadius: '4px'
  },
  
  colorContrast: {
    minimumRatio: 4.5, // WCAG AA standard
    testing: 'Required for all color combinations',
    tools: ['Contrast checker', 'Screen reader testing']
  },
  
  motionRespect: {
    prefersReducedMotion: 'Honor user preference',
    fallback: 'Provide non-motion alternatives',
    essential: 'Only animate when functionally necessary'
  }
}
```

### Voice & Tone in UI Text

#### MaterialLab Brand Voice Guidelines
```typescript
interface UITextGuidelines {
  buttonText: {
    style: 'Action-oriented, clear',
    examples: {
      good: ['Explore Services', 'Schedule Consultation', 'View Portfolio'],
      avoid: ['Click Here', 'Learn More', 'Submit']
    }
  },
  
  errorMessages: {
    tone: 'Helpful, not blame-focused',
    structure: 'Problem + Solution',
    examples: {
      good: 'Email format needed. Please include @ and domain (like name@company.com)',
      avoid: 'Invalid email address'
    }
  },
  
  aiInteractions: {
    transparency: 'Always disclose AI involvement',
    empowerment: 'Focus on user control and agency', 
    education: 'Explain how AI helps, don\'t mystify',
    examples: {
      good: 'AI helped draft this content based on your input. Review and edit as needed.',
      avoid: 'Magically generated content!'
    }
  }
}
```

### Layout & Spacing Guidelines

#### MaterialLab Grid System
```css
/* 4px base unit system */
--md-sys-spacing-none: 0px;
--md-sys-spacing-xs: 4px;    /* 1 unit */
--md-sys-spacing-sm: 8px;    /* 2 units */
--md-sys-spacing-md: 16px;   /* 4 units */
--md-sys-spacing-lg: 24px;   /* 6 units */
--md-sys-spacing-xl: 32px;   /* 8 units */
--md-sys-spacing-2xl: 48px;  /* 12 units */
--md-sys-spacing-3xl: 64px;  /* 16 units */

/* Container Sizes */
--md-sys-size-container-sm: 640px;
--md-sys-size-container-md: 768px;
--md-sys-size-container-lg: 1024px;
--md-sys-size-container-xl: 1280px;
--md-sys-size-container-2xl: 1536px;
```

#### Responsive Breakpoint Strategy
```typescript
interface ResponsiveBreakpoints {
  mobile: '320px - 767px',   // Priority: Touch-first design
  tablet: '768px - 1023px',  // Priority: Balanced layout
  desktop: '1024px+',        // Priority: Information density
  
  touchTargets: {
    minimum: '44px',         // WCAG requirement
    recommended: '48px',     // Material Design recommendation
    comfortable: '56px'      // MaterialLab preference for primary actions
  }
}
```

### Animation & Motion Guidelines

#### MaterialLab Motion Personality
```css
/* Duration tokens aligned with brand feeling */
--ml-motion-instant: 50ms;   /* Micro-feedback */
--ml-motion-quick: 150ms;    /* Button states */
--ml-motion-smooth: 300ms;   /* Card interactions */
--ml-motion-gentle: 500ms;   /* Page transitions */
--ml-motion-considered: 800ms; /* Major state changes */

/* Easing that feels human-centric */
--ml-motion-ease-natural: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ml-motion-ease-confident: cubic-bezier(0.4, 0.0, 0.2, 1);
--ml-motion-ease-expressive: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Component Library Specifications

#### MaterialLab Service Card
```typescript
interface ServiceCardSpec {
  structure: {
    icon: 'Top-aligned, 48x48px',
    title: 'Headline-medium typography',
    description: 'Body-large typography, 2-3 lines max',
    action: 'Primary button or link',
    footer: 'Meta information (optional)'
  },
  
  styling: {
    surface: 'Glass effect card',
    padding: '24px',
    borderRadius: '12px',
    minHeight: '280px',
    aspectRatio: '4:5' // Portrait orientation
  },
  
  states: {
    default: 'Subtle surface elevation',
    hover: 'Lift + glow effect',
    focus: 'Clear focus ring',
    disabled: 'Reduced opacity + no interaction'
  }
}
```

### Quality Assurance Checklist

#### Every MaterialLab Component Must Pass:
- [ ] **Brand Token Usage**: Uses only approved MaterialLab → Material Design mappings
- [ ] **Theme Compatibility**: Works in all LSS theme modes (light, dark, minimal, maximal, film variants)
- [ ] **AI Transparency**: Includes appropriate AI disclosure if AI-generated
- [ ] **Voice Consistency**: UI text follows MaterialLab tone guidelines
- [ ] **Accessibility Plus**: Exceeds WCAG 2.1 AA requirements where possible
- [ ] **Motion Respect**: Honors `prefers-reduced-motion` with graceful fallbacks
- [ ] **Glass Integration**: Uses MaterialLab glass effects appropriately
- [ ] **Performance Optimized**: Contributes positively to Core Web Vitals

### Implementation Validation

#### Automated Checks
```typescript
interface ValidationChecks {
  designTokenUsage: 'No hard-coded values allowed',
  brandAlignment: 'Must use approved color → token mappings',
  accessibilityCompliance: 'WCAG 2.1 AA + MaterialLab enhancements',
  voiceConsistency: 'UI text matches brand voice guidelines',
  performanceImpact: 'No negative effect on Core Web Vitals',
  themeCompatibility: 'Works across all 10 LSS theme modes'
}
```

---

**Usage Note**: This style guide bridges MaterialLab's unique brand identity with Material Design 3's systematic approach. Every implementation decision should reference both this guide and the core Material Design principles to ensure brand-consistent, accessible, and delightful user experiences.

**Last Updated**: January 2025
**Version**: 1.0.0
**Compatible With**: Material Design 3, LSS Design System v1.0