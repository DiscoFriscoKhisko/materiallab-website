# Design Tokens Documentation

Design tokens are the foundation of our design system - the single source of truth for all visual styling decisions. This document explains the rationale, usage, and implementation of our comprehensive token system.

## Philosophy

Our token system is built on three core principles:

1. **Semantic Organization** - Tokens describe purpose, not appearance
2. **Theme Flexibility** - Support for light and dark modes with automatic switching
3. **Scalable Architecture** - Tiered abstraction from global to component-specific tokens

## Token Architecture

### Tier 1: Global Tokens
Raw, context-agnostic values that form the base palette. These represent the complete set of available options.

### Tier 2: Semantic (Alias) Tokens
Context-specific names that describe intended purpose. These enable systematic theming and make it possible to switch between light and dark modes by changing what global tokens the semantic tokens reference.

### Tier 3: Component Tokens
Component-specific tokens that reference semantic tokens. This provides fine-grained control over individual components without breaking the overall system.

## Color System

### Brand Palettes

We support two distinct brand expressions:

#### Palette 1: "Humanistic Intelligence"
- **Philosophy**: Trustworthy, creative, and approachable
- **Primary**: Deep Navy (#141A46) - sophisticated evolution of tech blue
- **Secondary**: Warm Beige (#FBEAEB) - welcoming alternative to clinical white
- **Accent 1**: Energetic Orange (#EC8B5E) - creativity and action
- **Accent 2**: Vibrant Teal (#8BD8BD) - freshness and innovation

#### Palette 2: "Structured Dynamism"
- **Philosophy**: Futuristic, bold, dark-mode optimized
- **Primary**: Electric Purple (#3D155F) - power and creativity
- **Secondary**: Charcoal (#1A1A1A) - high-contrast dark foundation
- **Accent 1**: Lime Green (#C1F73A) - energy and "active" states
- **Accent 2**: Bright Cyan (#00FFFF) - data visualization and tech feel

### Semantic Color Usage

Colors are organized by purpose, not appearance:

- **Background colors** - Surface definitions and interaction states
- **Text colors** - Hierarchy and contrast management
- **Border colors** - Separation and focus indication
- **Status colors** - Error, success, warning, and info states

## Typography System

### Font Families

#### Primary: Inter
- **Purpose**: Headlines, UI elements, interface text
- **Rationale**: Designed for screens with high x-height and open counters
- **Character**: Clean, friendly, and highly legible at all sizes

#### Secondary: Source Serif 4
- **Purpose**: Body copy, long-form content, editorial text
- **Rationale**: Screen-optimized serif for comfortable reading
- **Character**: Authoritative, credible, reinforces "Sage" archetype

#### Monospace: JetBrains Mono
- **Purpose**: Code snippets, technical data
- **Rationale**: Developer-focused with distinct character shapes
- **Character**: Technical expertise, clear distinction between similar characters

### Typography Scale

Our scale uses harmonious proportions:
- **H1**: 48px - Major page titles, hero headlines
- **H2**: 36px - Section headers, major breaks
- **H3**: 24px - Subsection headers
- **H4**: 20px - Component titles, card headers
- **Body**: 16px - Primary reading text
- **Caption**: 14px - Helper text, image captions

## Spacing System

Based on a 4px grid for mathematical harmony:
- **Micro spacing**: 4px-8px for fine details
- **Component spacing**: 12px-24px for internal component padding
- **Layout spacing**: 32px-64px+ for major layout separation

## Motion & Animation

### Duration Tokens
- **instant**: 0ms - Immediate feedback
- **fast**: 150ms - Hover states, simple transitions
- **normal**: 300ms - Standard UI transitions
- **slow**: 500ms - Complex animations
- **slower**: 800ms - Hero animations, emphasis

### Easing Functions
- **easeOut**: Entering elements (snappy feel)
- **easeIn**: Exiting elements (natural feel)
- **easeInOut**: Continuous animations
- **spring**: Playful interactions, attention-grabbing

## Implementation

### Design Token JSON

```json
{
  "color": {
    "global": {
      "navy": {
        "100": { "value": "#141A46" }
      },
      "orange": {
        "100": { "value": "#EC8B5E" }
      },
      "teal": {
        "100": { "value": "#8BD8BD" }
      },
      "beige": {
        "100": { "value": "#FBEAEB" }
      },
      "purple": {
        "100": { "value": "#3D155F" }
      },
      "charcoal": {
        "100": { "value": "#1A1A1A" }
      },
      "lime": {
        "100": { "value": "#C1F73A" }
      },
      "cyan": {
        "100": { "value": "#00FFFF" }
      },
      "grey": {
        "100": { "value": "#333333" },
        "200": { "value": "#E0E0E0" }
      },
      "white": {
        "100": { "value": "#FFFFFF" },
        "200": { "value": "#F5F5F5" }
      }
    },
    "semantic": {
      "light": {
        "background": {
          "primary": { "value": "{color.global.beige.100}" },
          "secondary": { "value": "{color.global.white.200}" },
          "surface": { "value": "{color.global.white.100}" },
          "interactive-primary": { "value": "{color.global.orange.100}" },
          "interactive-secondary": { "value": "{color.global.teal.100}" },
          "brand": { "value": "{color.global.navy.100}" }
        },
        "text": {
          "primary": { "value": "{color.global.grey.100}" },
          "secondary": { "value": "{color.global.grey.100}", "attributes": {"alpha": 0.7} },
          "on-interactive": { "value": "{color.global.navy.100}" },
          "on-surface": { "value": "{color.global.grey.100}" },
          "link": { "value": "{color.global.navy.100}" },
          "inverse": { "value": "{color.global.white.100}" }
        },
        "border": {
          "default": { "value": "{color.global.grey.100}", "attributes": {"alpha": 0.2} },
          "focus": { "value": "{color.global.orange.100}" },
          "error": { "value": "#E53E3E" },
          "success": { "value": "#38A169" }
        },
        "status": {
          "error": { "value": "#E53E3E" },
          "warning": { "value": "#D69E2E" },
          "success": { "value": "#38A169" },
          "info": { "value": "{color.global.teal.100}" }
        }
      },
      "dark": {
        "background": {
          "primary": { "value": "{color.global.charcoal.100}" },
          "secondary": { "value": "#2D2D2D" },
          "surface": { "value": "#333333" },
          "interactive-primary": { "value": "{color.global.lime.100}" },
          "interactive-secondary": { "value": "{color.global.cyan.100}" },
          "brand": { "value": "{color.global.purple.100}" }
        },
        "text": {
          "primary": { "value": "{color.global.grey.200}" },
          "secondary": { "value": "{color.global.grey.200}", "attributes": {"alpha": 0.7} },
          "on-interactive": { "value": "{color.global.charcoal.100}" },
          "on-surface": { "value": "{color.global.grey.200}" },
          "link": { "value": "{color.global.lime.100}" },
          "inverse": { "value": "{color.global.charcoal.100}" }
        },
        "border": {
          "default": { "value": "{color.global.grey.200}", "attributes": {"alpha": 0.2} },
          "focus": { "value": "{color.global.lime.100}" },
          "error": { "value": "#FC8181" },
          "success": { "value": "#68D391" }
        },
        "status": {
          "error": { "value": "#FC8181" },
          "warning": { "value": "#F6E05E" },
          "success": { "value": "#68D391" },
          "info": { "value": "{color.global.cyan.100}" }
        }
      }
    }
  },
  "typography": {
    "fontFamily": {
      "primary": { "value": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
      "secondary": { "value": "'Source Serif 4', Georgia, serif" },
      "mono": { "value": "'JetBrains Mono', 'SF Mono', Monaco, monospace" }
    },
    "fontWeight": {
      "regular": { "value": 400 },
      "medium": { "value": 500 },
      "semibold": { "value": 600 },
      "bold": { "value": 700 }
    },
    "fontSize": {
      "xs": { "value": "12px" },
      "sm": { "value": "14px" },
      "base": { "value": "16px" },
      "lg": { "value": "18px" },
      "xl": { "value": "20px" },
      "2xl": { "value": "24px" },
      "3xl": { "value": "30px" },
      "4xl": { "value": "36px" },
      "5xl": { "value": "48px" },
      "6xl": { "value": "60px" }
    },
    "lineHeight": {
      "tight": { "value": "1.25" },
      "normal": { "value": "1.5" },
      "relaxed": { "value": "1.625" }
    },
    "letterSpacing": {
      "tight": { "value": "-0.025em" },
      "normal": { "value": "0" },
      "wide": { "value": "0.025em" }
    },
    "scale": {
      "h1": {
        "fontFamily": { "value": "{typography.fontFamily.primary}" },
        "fontSize": { "value": "{typography.fontSize.5xl}" },
        "fontWeight": { "value": "{typography.fontWeight.bold}" },
        "lineHeight": { "value": "{typography.lineHeight.tight}" },
        "letterSpacing": { "value": "{typography.letterSpacing.tight}" }
      },
      "h2": {
        "fontFamily": { "value": "{typography.fontFamily.primary}" },
        "fontSize": { "value": "{typography.fontSize.4xl}" },
        "fontWeight": { "value": "{typography.fontWeight.bold}" },
        "lineHeight": { "value": "{typography.lineHeight.tight}" },
        "letterSpacing": { "value": "{typography.letterSpacing.normal}" }
      },
      "h3": {
        "fontFamily": { "value": "{typography.fontFamily.primary}" },
        "fontSize": { "value": "{typography.fontSize.2xl}" },
        "fontWeight": { "value": "{typography.fontWeight.semibold}" },
        "lineHeight": { "value": "{typography.lineHeight.tight}" }
      },
      "h4": {
        "fontFamily": { "value": "{typography.fontFamily.primary}" },
        "fontSize": { "value": "{typography.fontSize.xl}" },
        "fontWeight": { "value": "{typography.fontWeight.semibold}" },
        "lineHeight": { "value": "{typography.lineHeight.normal}" }
      },
      "body": {
        "fontFamily": { "value": "{typography.fontFamily.secondary}" },
        "fontSize": { "value": "{typography.fontSize.base}" },
        "fontWeight": { "value": "{typography.fontWeight.regular}" },
        "lineHeight": { "value": "{typography.lineHeight.normal}" }
      },
      "bodyLarge": {
        "fontFamily": { "value": "{typography.fontFamily.secondary}" },
        "fontSize": { "value": "{typography.fontSize.lg}" },
        "fontWeight": { "value": "{typography.fontWeight.regular}" },
        "lineHeight": { "value": "{typography.lineHeight.relaxed}" }
      },
      "caption": {
        "fontFamily": { "value": "{typography.fontFamily.primary}" },
        "fontSize": { "value": "{typography.fontSize.sm}" },
        "fontWeight": { "value": "{typography.fontWeight.regular}" },
        "lineHeight": { "value": "{typography.lineHeight.normal}" }
      },
      "button": {
        "fontFamily": { "value": "{typography.fontFamily.primary}" },
        "fontSize": { "value": "{typography.fontSize.base}" },
        "fontWeight": { "value": "{typography.fontWeight.medium}" },
        "lineHeight": { "value": "1" },
        "letterSpacing": { "value": "{typography.letterSpacing.wide}" }
      },
      "code": {
        "fontFamily": { "value": "{typography.fontFamily.mono}" },
        "fontSize": { "value": "{typography.fontSize.sm}" },
        "fontWeight": { "value": "{typography.fontWeight.regular}" },
        "lineHeight": { "value": "{typography.lineHeight.normal}" }
      }
    }
  },
  "spacing": {
    "0": { "value": "0" },
    "1": { "value": "4px" },
    "2": { "value": "8px" },
    "3": { "value": "12px" },
    "4": { "value": "16px" },
    "5": { "value": "20px" },
    "6": { "value": "24px" },
    "7": { "value": "28px" },
    "8": { "value": "32px" },
    "9": { "value": "36px" },
    "10": { "value": "40px" },
    "12": { "value": "48px" },
    "16": { "value": "64px" },
    "20": { "value": "80px" },
    "24": { "value": "96px" },
    "32": { "value": "128px" }
  },
  "size": {
    "containerMaxWidth": { "value": "1200px" },
    "containerMedium": { "value": "960px" },
    "containerSmall": { "value": "720px" },
    "sidebarWidth": { "value": "280px" },
    "headerHeight": { "value": "72px" }
  },
  "borderRadius": {
    "none": { "value": "0" },
    "sm": { "value": "4px" },
    "base": { "value": "8px" },
    "md": { "value": "12px" },
    "lg": { "value": "16px" },
    "xl": { "value": "24px" },
    "full": { "value": "9999px" }
  },
  "shadow": {
    "none": { "value": "none" },
    "sm": { "value": "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
    "base": { "value": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" },
    "md": { "value": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
    "lg": { "value": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" },
    "xl": { "value": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
    "2xl": { "value": "0 25px 50px -12px rgba(0, 0, 0, 0.25)" },
    "focus": { "value": "0 0 0 3px rgba(236, 139, 94, 0.3)" },
    "focusDark": { "value": "0 0 0 3px rgba(193, 247, 58, 0.3)" }
  },
  "motion": {
    "duration": {
      "instant": { "value": "0ms" },
      "fast": { "value": "150ms" },
      "normal": { "value": "300ms" },
      "slow": { "value": "500ms" },
      "slower": { "value": "800ms" }
    },
    "easing": {
      "linear": { "value": "linear" },
      "ease": { "value": "ease" },
      "easeIn": { "value": "cubic-bezier(0.4, 0, 1, 1)" },
      "easeOut": { "value": "cubic-bezier(0, 0, 0.2, 1)" },
      "easeInOut": { "value": "cubic-bezier(0.4, 0, 0.2, 1)" },
      "spring": { "value": "cubic-bezier(0.68, -0.55, 0.265, 1.55)" }
    }
  },
  "breakpoints": {
    "xs": { "value": "475px" },
    "sm": { "value": "640px" },
    "md": { "value": "768px" },
    "lg": { "value": "1024px" },
    "xl": { "value": "1280px" },
    "2xl": { "value": "1536px" }
  },
  "zIndex": {
    "hide": { "value": "-1" },
    "auto": { "value": "auto" },
    "base": { "value": "0" },
    "docked": { "value": "10" },
    "dropdown": { "value": "1000" },
    "sticky": { "value": "1100" },
    "banner": { "value": "1200" },
    "overlay": { "value": "1300" },
    "modal": { "value": "1400" },
    "popover": { "value": "1500" },
    "skipLink": { "value": "1600" },
    "toast": { "value": "1700" },
    "tooltip": { "value": "1800" }
  }
}
```

## Usage Guidelines

### Referencing Tokens in Code

#### CSS Custom Properties
```css
.component {
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  font-family: var(--typography-fontFamily-primary);
  font-size: var(--typography-fontSize-base);
  padding: var(--spacing-4);
  border-radius: var(--borderRadius-base);
}
```

#### Tailwind CSS Classes
```html
<div class="bg-surface text-on-surface font-primary text-base p-4 rounded-base">
  Content using semantic tokens
</div>
```

#### JavaScript/TypeScript
```typescript
const theme = {
  colors: {
    background: 'var(--color-background-primary)',
    text: 'var(--color-text-primary)'
  },
  spacing: {
    medium: 'var(--spacing-4)'
  }
}
```

### Theme Switching

Themes are switched by updating the CSS custom property values:

```css
[data-theme="light"] {
  --color-background-primary: var(--color-global-beige-100);
  --color-text-primary: var(--color-global-grey-100);
}

[data-theme="dark"] {
  --color-background-primary: var(--color-global-charcoal-100);
  --color-text-primary: var(--color-global-grey-200);
}
```

## Accessibility Considerations

### Color Contrast
All token combinations meet WCAG 2.1 AA standards:
- Normal text: 4.5:1 minimum contrast ratio
- Large text: 3:1 minimum contrast ratio
- Interactive elements: Clear focus indicators

### Motion Preferences
Motion tokens respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: var(--motion-duration-instant) !important;
    transition-duration: var(--motion-duration-instant) !important;
  }
}
```

## Maintenance

### Adding New Tokens
1. Add to the appropriate global token group
2. Create semantic aliases for intended usage
3. Update this documentation with rationale
4. Test across both light and dark themes
5. Verify accessibility compliance

### Modifying Existing Tokens
1. Assess impact across all components
2. Update semantic references if needed
3. Test visual regression
4. Document the change in [04_decisions_log.md](04_decisions_log.md)

The complete token system ensures consistency, accessibility, and scalability across all MaterialLab experiences while maintaining the flexibility to evolve with our brand and user needs.