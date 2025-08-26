# Atoms - Basic Building Blocks

Atoms are the foundational elements of our design system - the smallest functional units that serve as building blocks for larger components. They cannot be broken down further without losing their meaning or functionality.

## Design Philosophy

Atoms follow these principles:
- **Single Responsibility** - Each atom serves one clear purpose
- **Composability** - Can be combined to create more complex components
- **Consistency** - Standardized behavior and appearance across all instances
- **Accessibility** - Meet WCAG 2.1 AA standards by default

## Component Catalog

### Buttons

Primary interactive elements that trigger actions.

#### Button Variants
- **Primary** - Main actions, high emphasis (`bg-interactive-primary`)
- **Secondary** - Supporting actions, medium emphasis (`border-interactive-primary`)
- **Tertiary** - Low-priority actions, minimal emphasis (text-only)
- **Destructive** - Dangerous actions (`bg-status-error`)

#### Button Sizes
- **Small** - 32px height, `padding: 8px 16px`
- **Medium** - 40px height, `padding: 12px 24px` (default)
- **Large** - 48px height, `padding: 16px 32px`

#### Button States
- **Default** - Normal interactive state
- **Hover** - `transform: scale(1.02)`, enhanced shadow
- **Active** - `transform: scale(0.98)`
- **Disabled** - `opacity: 0.4`, no pointer events
- **Loading** - Spinner animation, disabled interaction

#### Implementation
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: ReactNode
  onClick?: () => void
}
```

### Input Fields

Text input elements for user data entry.

#### Input Types
- **Text** - Single-line text input
- **Email** - Email validation and input type
- **Password** - Obscured text input with toggle visibility
- **Textarea** - Multi-line text input
- **Search** - Search-specific styling and behavior

#### Input States
- **Default** - Normal input state
- **Focus** - Enhanced border with focus ring
- **Error** - Red border with error message
- **Success** - Green border indicating validation success
- **Disabled** - Reduced opacity, no interaction

#### Input Sizes
- **Small** - 32px height, `padding: 8px 12px`
- **Medium** - 40px height, `padding: 12px 16px` (default)
- **Large** - 48px height, `padding: 16px 20px`

#### Implementation
```tsx
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'search'
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
  disabled?: boolean
  error?: string
  success?: boolean
  value?: string
  onChange?: (value: string) => void
}
```

### Typography

Text elements with predefined styling and semantic meaning.

#### Text Hierarchy
- **H1** - Page titles, hero headlines (48px, Inter Bold)
- **H2** - Section headers (36px, Inter Bold)
- **H3** - Subsection headers (24px, Inter Semibold)
- **H4** - Component titles (20px, Inter Semibold)
- **Body** - Main paragraph text (16px, Source Serif 4)
- **Body Large** - Emphasized body text (18px, Source Serif 4)
- **Caption** - Helper text, labels (14px, Inter Regular)
- **Code** - Code snippets (14px, JetBrains Mono)

#### Text Variants
- **Default** - Standard text color
- **Muted** - Reduced emphasis (`opacity: 0.7`)
- **Inverse** - Light text on dark backgrounds
- **Link** - Interactive text with hover states
- **Error** - Error message styling
- **Success** - Success message styling

#### Implementation
```tsx
interface TypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'code'
  variant?: 'default' | 'muted' | 'inverse' | 'link' | 'error' | 'success'
  children: ReactNode
  className?: string
}
```

### Icons

Visual symbols that communicate meaning quickly and universally.

#### Icon System
- **Library** - Phosphor Icons (consistent stroke weight and style)
- **Stroke Weight** - 1.5px standard, 2px for emphasis
- **Grid System** - 24x24px base, scales to 16px, 32px, 48px
- **Style** - Minimal line icons with subtle rounded corners

#### Icon Sizes
- **Small** - 16px (inline with text)
- **Medium** - 24px (standard UI elements)
- **Large** - 32px (prominent actions)
- **XLarge** - 48px (hero elements, empty states)

#### Icon Usage
- **Inherit Color** - Default behavior matches text color
- **Brand Color** - Use sparingly for brand-specific icons
- **Status Colors** - Error, success, warning, info states
- **Interactive** - Hover states for clickable icons

#### Implementation
```tsx
interface IconProps {
  name: string // Phosphor icon name
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'inherit' | 'brand' | 'error' | 'success' | 'warning' | 'info'
  weight?: 'thin' | 'light' | 'regular' | 'bold'
}
```

### AI Labels

Special indicators for AI-generated or AI-assisted content.

#### Label Types
- **Chip** - Small badge with "AI" text and icon
- **Inline** - Text indicator within content
- **Tooltip** - Hover explanation of AI involvement
- **Banner** - Prominent indicator for AI-generated sections

#### AI Label Variants
- **Default** - Neutral AI indicator
- **Suggestion** - AI recommendation or suggestion
- **Generated** - Fully AI-generated content
- **Assisted** - Human-AI collaborative content

#### Implementation
```tsx
interface AILabelProps {
  type?: 'chip' | 'inline' | 'tooltip' | 'banner'
  variant?: 'default' | 'suggestion' | 'generated' | 'assisted'
  explanation?: string // Tooltip or extended explanation
  confidence?: number // AI confidence level (0-100)
}
```

## Accessibility Guidelines

### Focus Management
- All interactive atoms must have visible focus indicators
- Focus rings use `shadow.focus` token (3px outline)
- Tab order follows logical reading sequence

### Color Contrast
- All text meets WCAG 2.1 AA contrast requirements
- Interactive elements maintain contrast in all states
- Color is never the only means of conveying information

### Screen Readers
- Proper semantic HTML elements (button, input, h1-h6)
- ARIA labels for non-semantic elements
- Live regions for dynamic content updates

### Keyboard Navigation
- All interactive atoms accessible via keyboard
- Enter and Space trigger button actions
- Escape dismisses temporary states

## Testing Requirements

### Visual Testing
- Test all variants and states in both light and dark themes
- Verify appearance at different zoom levels (100%, 125%, 150%)
- Check mobile and desktop responsive behavior

### Accessibility Testing
- Screen reader compatibility (VoiceOver, NVDA, JAWS)
- Keyboard-only navigation
- Color contrast validation tools

### Browser Testing
- Chrome, Firefox, Safari, Edge latest versions
- iOS Safari, Chrome Mobile for mobile testing
- Graceful degradation for older browsers

## Implementation Guidelines

### Token Usage
- Always use design tokens, never hard-coded values
- Reference semantic tokens (e.g., `color.semantic.light.text.primary`)
- Follow naming conventions: `component-variant-property`

### Component Structure
```tsx
// Example atom structure
export const Button = styled.button<ButtonProps>`
  font-family: ${tokens.typography.fontFamily.primary};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.medium};
  padding: ${tokens.spacing['3']} ${tokens.spacing['6']};
  border-radius: ${tokens.borderRadius.base};
  
  /* Use semantic tokens for theming */
  background-color: var(--color-background-interactive-primary);
  color: var(--color-text-on-interactive);
  
  /* Motion tokens for consistent timing */
  transition: all ${tokens.motion.duration.fast} ${tokens.motion.easing.easeOut};
`
```

### Error Handling
- Graceful degradation when props are missing
- Helpful error messages in development
- Fallback styles for edge cases

## Contributing New Atoms

1. **Identify Need** - Ensure it's truly atomic and reusable
2. **Design Review** - Align with design system principles
3. **Token Integration** - Use existing tokens, propose new ones if needed
4. **Documentation** - Update this README with full specification
5. **Testing** - Complete visual, accessibility, and browser testing
6. **Review Process** - Team review before merging

Remember: Atoms should be simple, focused, and highly reusable. If a component needs multiple atoms to make sense, it's likely a molecule or organism.