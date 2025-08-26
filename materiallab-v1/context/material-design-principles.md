# Material Design 3 Principles for MaterialLab

*Reference document for Claude Code Material Design implementation validation*

## Core Principles

### 1. Adaptive Design
- **Responsive layouts** that work across all screen sizes (320px to 1920px+)
- **Touch targets** minimum 48dp (48px) for accessibility
- **Content hierarchy** with clear information architecture
- **Progressive disclosure** to reduce cognitive load

### 2. Material Design 3 Component Standards

#### Buttons
```typescript
interface ButtonStandards {
  height: {
    small: '32px',
    medium: '40px', 
    large: '48px'
  },
  borderRadius: 'var(--md-sys-shape-corner-medium)', // 8px
  typography: 'var(--md-sys-typescale-label-large)',
  elevation: {
    rest: '0dp',
    hover: '1dp',
    pressed: '0dp'
  },
  spacing: {
    horizontal: '24px', // Icon + text
    iconOnly: '8px'
  }
}
```

#### Cards
```typescript
interface CardStandards {
  borderRadius: 'var(--md-sys-shape-corner-medium)', // 12px
  elevation: {
    rest: '1dp',
    hover: '2dp',
    dragged: '4dp'
  },
  padding: {
    content: '16px',
    actions: '8px'
  },
  surface: 'var(--md-sys-color-surface-variant)'
}
```

#### Typography Scale
```typescript
interface TypographyScale {
  displayLarge: {
    fontSize: '57px',
    lineHeight: '64px',
    letterSpacing: '-0.25px',
    fontWeight: 400
  },
  displayMedium: {
    fontSize: '45px', 
    lineHeight: '52px',
    letterSpacing: '0px',
    fontWeight: 400
  },
  headlineLarge: {
    fontSize: '32px',
    lineHeight: '40px', 
    letterSpacing: '0px',
    fontWeight: 400
  },
  bodyLarge: {
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    fontWeight: 400
  },
  bodyMedium: {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px', 
    fontWeight: 400
  }
}
```

### 3. Color System

#### Dynamic Color Tokens
```css
/* Primary Colors */
--md-sys-color-primary: #1976D2;
--md-sys-color-on-primary: #FFFFFF;
--md-sys-color-primary-container: #D3E3FD;
--md-sys-color-on-primary-container: #041F33;

/* Surface Colors */  
--md-sys-color-surface: #FFFBFE;
--md-sys-color-on-surface: #1C1B1F;
--md-sys-color-surface-variant: #E7E0EC;
--md-sys-color-on-surface-variant: #49454F;

/* Background */
--md-sys-color-background: #FFFBFE;
--md-sys-color-on-background: #1C1B1F;
```

#### MaterialLab Brand Integration
```css
/* Brand-specific Material Design tokens */
--md-sys-color-primary: var(--lss-sunset-coral); /* #FF6F61 */
--md-sys-color-secondary: var(--lss-ion-blue); /* #55C2FF */
--md-sys-color-tertiary: var(--lss-forest-green); /* #4CAF50 */
--md-sys-color-surface: var(--lss-soft-white); /* #FAF9F6 */
--md-sys-color-background: var(--lss-rich-black); /* #0B0F1A */
```

### 4. Motion & Animation

#### Duration Tokens
```css
--md-sys-motion-duration-short1: 50ms;   /* Micro-interactions */
--md-sys-motion-duration-short2: 100ms;  /* Small animations */
--md-sys-motion-duration-medium1: 250ms; /* Medium animations */
--md-sys-motion-duration-medium2: 300ms; /* Container changes */
--md-sys-motion-duration-long1: 400ms;   /* Large animations */
--md-sys-motion-duration-long2: 500ms;   /* Screen transitions */
```

#### Easing Functions
```css
--md-sys-motion-easing-emphasized: cubic-bezier(0.2, 0.0, 0, 1.0);
--md-sys-motion-easing-standard: cubic-bezier(0.2, 0.0, 0, 1.0);
--md-sys-motion-easing-legacy: cubic-bezier(0.4, 0.0, 0.2, 1);
```

### 5. Accessibility Requirements (WCAG 2.1 AA)

#### Color Contrast
- **Normal text**: 4.5:1 minimum contrast ratio
- **Large text** (18pt+): 3:1 minimum contrast ratio
- **UI components**: 3:1 minimum contrast ratio

#### Touch & Interaction
- **Touch targets**: 44px minimum (Material Design recommends 48px)
- **Focus indicators**: Clear visual focus with 2px outline
- **Keyboard navigation**: Full keyboard accessibility

#### Screen Reader Support
```typescript
interface AccessibilityRequirements {
  ariaLabels: 'Required for all interactive elements',
  semanticHTML: 'Use proper heading hierarchy (h1-h6)',
  altText: 'Required for all images and icons',
  focusManagement: 'Logical tab order and focus trapping',
  announcements: 'Live regions for dynamic content'
}
```

### 6. Component Validation Checklist

#### Every Component Must Have:
- [ ] **Design Token Usage**: Only CSS custom properties, no hard-coded values
- [ ] **Responsive Design**: Works on mobile (375px), tablet (768px), desktop (1440px+)
- [ ] **Accessibility**: WCAG 2.1 AA compliant with ARIA labels
- [ ] **Material Design Compliance**: Follows MD3 specifications exactly
- [ ] **Brand Integration**: Uses MaterialLab design tokens appropriately
- [ ] **Performance**: Optimized for Core Web Vitals
- [ ] **Error States**: Proper error handling and user feedback

### 7. Validation Thresholds

#### Scoring System
```typescript
interface ValidationThresholds {
  materialDesignCompliance: 85, // Minimum score out of 100
  brandAlignment: 90,           // Minimum score out of 100  
  accessibility: 'WCAG 2.1 AA', // Must pass all tests
  performance: {
    LCP: '2.5s',   // Largest Contentful Paint
    FID: '100ms',  // First Input Delay
    CLS: '0.1'     // Cumulative Layout Shift
  },
  codeQuality: 80 // ESLint + TypeScript compliance
}
```

### 8. Anti-Patterns to Avoid

#### Design Anti-Patterns
- ❌ Hard-coded colors, sizes, or spacing values
- ❌ Non-semantic HTML structure
- ❌ Missing accessibility attributes
- ❌ Inconsistent component variants
- ❌ Poor touch target sizing
- ❌ Insufficient color contrast
- ❌ Broken responsive behavior

#### Code Anti-Patterns  
- ❌ Inline styles instead of design tokens
- ❌ Magic numbers in CSS/JS
- ❌ Missing TypeScript types
- ❌ Unused CSS rules or JavaScript
- ❌ Poor component composition
- ❌ Missing error boundaries

### 9. MaterialLab-Specific Requirements

#### AI Transparency
- All AI-generated content must have clear indicators
- User control over AI features required
- Explainable AI decision-making processes

#### Human-Centric Design  
- Technology augments, never replaces human capability
- Clear user agency and control
- Educational approach over mysterious processes

#### Brand Voice Integration
```typescript
interface BrandVoice {
  tone: 'knowledgeable' | 'visionary' | 'meticulous' | 'empowering' | 'transparent',
  avoid: ['AI as magic', 'Black box processes', 'Generic tech jargon'],
  emphasize: ['Human partnership', 'Clear explanations', 'User empowerment']
}
```

---

**Implementation Note**: This document serves as the authoritative reference for all Material Design decisions in the MaterialLab codebase. Every component, page, and interaction must be validated against these principles through the Iterative Agentic Loop process.

**Last Updated**: January 2025
**Version**: 1.0.0
**Next Review**: February 2025