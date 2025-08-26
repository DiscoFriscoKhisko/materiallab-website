# Material Lab Typography System

## Overview

The Material Lab Typography System is a comprehensive, accessible typography framework inspired by Fantasy AI's modern aesthetic while aligned with Material Lab's brand foundation of being "delightful, intelligent, nerdy, and detail-oriented."

## Key Features

### ✨ Fantasy AI-Inspired Design
- **Gradient Hero Text**: Animated gradient text effects for primary headings
- **Smooth Transitions**: Variable font weight animations and hover effects
- **Modern Aesthetics**: Clean, technical yet approachable typography

### 🎯 Brand Alignment
- **Sora Display Font**: Technical yet approachable for headings (matches "nerdy" personality)  
- **Inter Body Font**: Excellent readability for body text (supports "intelligent" communication)
- **JetBrains Mono**: Developer-friendly monospace for code (technical audience)
- **"Formal Casual" Tone**: Professional fonts with playful touches

### ♿ WCAG 2.1 AA Compliance
- **Text Resizing**: Supports up to 200% zoom without loss of functionality (WCAG 1.4.4)
- **Text Spacing**: Content remains functional with custom spacing overrides (WCAG 1.4.12)
- **Contrast Ratios**: All text meets minimum contrast requirements
- **Reduced Motion**: Respects user preferences for reduced motion
- **High Contrast**: Supports high contrast mode

### 🎛️ Interactive Features
- **Typography Playground**: Live specimen showcase with accessibility controls
- **Type Tester**: Real-time typography testing with custom text input
- **Export Tools**: Copy CSS or export JSON tokens
- **Theme Integration**: Works across all 10 Long Story Short theme modes

## Font Stack

```css
/* Display Font - Technical yet approachable */
--font-display: 'Sora Variable', 'SF Pro Display', -apple-system, system-ui, sans-serif;

/* Body Font - Highly readable */
--font-body: 'Inter Variable', -apple-system, system-ui, sans-serif;  

/* Monospace Font - Developer-friendly */
--font-mono: 'JetBrains Mono', 'SF Mono', Monaco, monospace;
```

## Typography Scale

Based on a **1.25 modular ratio** (Major Third) for professional hierarchy:

### Display Sizes
- **Hero**: `clamp(3rem, 8vw, 6rem)` - 48px to 96px
- **Display XL**: `clamp(2.5rem, 5vw, 4rem)` - 40px to 64px  
- **Display L**: `clamp(2rem, 4vw, 3rem)` - 32px to 48px
- **Display M**: `clamp(1.75rem, 3vw, 2.5rem)` - 28px to 40px

### Heading Sizes
- **H1**: `clamp(2rem, 3vw, 2.5rem)` - 32px to 40px
- **H2**: `clamp(1.75rem, 2.5vw, 2rem)` - 28px to 32px
- **H3**: `clamp(1.5rem, 2vw, 1.75rem)` - 24px to 28px
- **H4**: `clamp(1.25rem, 1.8vw, 1.5rem)` - 20px to 24px
- **H5**: `clamp(1.125rem, 1.5vw, 1.25rem)` - 18px to 20px
- **H6**: `clamp(1rem, 1.2vw, 1.125rem)` - 16px to 18px

### Body Sizes
- **Body XL**: `1.25rem` - 20px
- **Body L**: `1.125rem` - 18px
- **Body M**: `1rem` - 16px (WCAG base)
- **Body S**: `0.875rem` - 14px
- **Body XS**: `0.75rem` - 12px

## Usage

### CSS Classes

```css
/* Hero text with gradient animation */
.typo-hero

/* Display text styles */
.typo-display-1, .typo-display-2, .typo-display-3

/* Heading styles */
.typo-h1, .typo-h2, .typo-h3, .typo-h4, .typo-h5, .typo-h6

/* Body text styles */  
.typo-body-xl, .typo-body, .typo-body-sm

/* Utility styles */
.typo-caption, .typo-label, .typo-button, .typo-code
```

### Typography Tokens (CSS Custom Properties)

```css
/* Font families */
--font-display, --font-body, --font-mono

/* Font sizes */
--font-size-hero, --font-size-display-xl, --font-size-h1, etc.

/* Font weights */
--font-weight-light (300), --font-weight-regular (400), etc.

/* Line heights */ 
--line-height-tight (1.1), --line-height-normal (1.5), etc.

/* Letter spacing */
--letter-spacing-tighter (-0.03em), --letter-spacing-normal (0), etc.
```

## Interactive Components

### Typography Playground (`/long-story-short` → Typography)
- Complete type specimen display
- Font size controls (50% - 200%)
- Accessibility feature toggles
- Category filtering
- CSS token display with copy functionality

### Type Tester (`/long-story-short` → Type Tester)  
- Custom text input with sample options
- Real-time typography controls
- Predefined style selection
- Custom font controls (size, weight, line-height, letter-spacing)
- Export CSS and JSON functionality

## Accessibility Features

### WCAG 1.4.4 - Text Resizing
- All text resizable up to 200% without horizontal scrolling
- Fluid typography maintains readability across all zoom levels

### WCAG 1.4.12 - Text Spacing
- Content remains functional with custom text spacing:
  - Line height: 1.5x font size minimum
  - Paragraph spacing: 2x font size minimum  
  - Letter spacing: 0.12x font size minimum
  - Word spacing: 0.16x font size minimum

### Additional Accessibility
- **High Contrast Mode**: Automatic gradient text fallback
- **Reduced Motion**: Animation disabling for motion-sensitive users
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader**: Semantic markup and ARIA labels

## Performance Optimizations

- **Variable Fonts**: Single font file for multiple weights
- **WOFF2 Format**: Modern, compressed font format
- **Font Display Swap**: Faster text rendering with font loading
- **Lazy Loading**: Non-critical fonts loaded asynchronously

## Integration

The typography system is automatically imported via `tokens.css`:

```css
@import './typography.css';
```

Components can import typography tokens:

```typescript
import typographyTokens from '../design-system/typography-tokens.json';
```

## Version History

- **v1.0.0** (August 2025): Initial release with Fantasy AI inspiration and WCAG AA compliance

## Browser Support

- **Modern browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Variable fonts**: Full support in all modern browsers
- **Graceful degradation**: System fonts fallback for older browsers

---

*This typography system reflects Material Lab's core values of authenticity, collaboration, elegant problem-solving, and delightful user experiences.*