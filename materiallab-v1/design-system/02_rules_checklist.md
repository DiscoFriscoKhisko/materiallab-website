# Design System Rules Checklist

This checklist provides actionable items for implementing and maintaining the MaterialLab design system. Use this as a reference during development, code reviews, and quality assurance.

## Pre-Development Checklist

### Setup Requirements
- [ ] Design tokens JSON file accessible in project
- [ ] Tailwind CSS configured with design system tokens
- [ ] CSS custom properties loaded globally
- [ ] TypeScript interfaces for component props defined
- [ ] Accessibility testing tools configured

### Design Review
- [ ] Component specifications reviewed and understood
- [ ] Brand voice and tone guidelines consulted
- [ ] Anti-pattern documentation checked
- [ ] Atomic design level identified (atom, molecule, organism)

## Token Implementation Checklist

### Color Usage
- [ ] **Only use semantic color tokens** - No hard-coded hex values
- [ ] **Consistent palette** - Using either "Humanistic Intelligence" or "Structured Dynamism"
- [ ] **Theme compatibility** - Colors work in both light and dark modes
- [ ] **Contrast verified** - All text meets WCAG 2.1 AA requirements (4.5:1 minimum)
- [ ] **Status colors** - Error, success, warning, info use designated tokens

```css
/* ✅ Correct token usage */
.component {
  background-color: var(--color-background-surface);
  color: var(--color-text-primary);
  border-color: var(--color-border-default);
}

/* ❌ Avoid hard-coded values */
.component {
  background-color: #FBEAEB;
  color: #333333;
  border-color: rgba(51, 51, 51, 0.2);
}
```

### Typography Implementation
- [ ] **Font families** - Inter (primary), Source Serif 4 (secondary), JetBrains Mono (code)
- [ ] **Font scale** - Using typography.fontSize tokens (xs, sm, base, lg, xl, 2xl, etc.)
- [ ] **Font weights** - Using typography.fontWeight tokens (regular, medium, semibold, bold)
- [ ] **Line heights** - Using typography.lineHeight tokens (tight, normal, relaxed)
- [ ] **Semantic hierarchy** - H1-H6 tags with appropriate token combinations

### Spacing & Layout
- [ ] **4px grid system** - All spacing uses spacing tokens (1-32 scale)
- [ ] **Container max-widths** - Using size.containerMaxWidth and variants
- [ ] **Responsive breakpoints** - Using breakpoints tokens (xs, sm, md, lg, xl, 2xl)
- [ ] **Grid gaps** - Using spacing.6 (24px) for grid gutters
- [ ] **Grid margins** - Using spacing.8 (32px) for container margins

## Component Development Checklist

### Atomic Design Structure
- [ ] **Atom level** - Single responsibility, irreducible components
- [ ] **Molecule level** - Meaningful combination of atoms with clear relationships  
- [ ] **Organism level** - Complete functional sections that accomplish user tasks
- [ ] **Proper composition** - Clear data flow and component relationships
- [ ] **Reusability** - Component can be used across different contexts

### React Component Standards
```tsx
// Component interface checklist
interface ComponentProps {
  // ✅ Required props clearly identified
  // ✅ Optional props have sensible defaults
  // ✅ Variant/size props use union types
  // ✅ Event handlers properly typed
  // ✅ Children or content props included
  // ✅ Accessibility props supported (aria-*, role, etc.)
}
```

- [ ] **TypeScript interfaces** - All props properly typed with JSDoc comments
- [ ] **Default props** - Sensible defaults for optional properties
- [ ] **Prop validation** - Runtime validation for required props in development
- [ ] **Forward refs** - Ref forwarding implemented where appropriate
- [ ] **Error boundaries** - Complex components wrapped in error boundaries

### Styling Implementation
- [ ] **Styled-components or CSS modules** - Consistent styling approach
- [ ] **Token references** - All styles reference design tokens
- [ ] **Responsive design** - Mobile-first breakpoint implementation
- [ ] **Theme support** - Styles adapt automatically to theme changes
- [ ] **Motion tokens** - Animations use duration and easing tokens

```tsx
// Styling checklist example
const StyledComponent = styled.div`
  /* ✅ Using design tokens */
  padding: ${tokens.spacing['4']};
  background: var(--color-background-surface);
  border-radius: ${tokens.borderRadius.base};
  
  /* ✅ Responsive implementation */
  @media (min-width: ${tokens.breakpoints.md}) {
    padding: ${tokens.spacing['6']};
  }
  
  /* ✅ Motion token usage */
  transition: all ${tokens.motion.duration.fast} ${tokens.motion.easing.easeOut};
  
  /* ✅ Motion preference respect */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
```

## Accessibility Implementation Checklist

### WCAG 2.1 AA Compliance
- [ ] **Color contrast** - 4.5:1 minimum for normal text, 3:1 for large text
- [ ] **Focus indicators** - Visible focus rings on all interactive elements
- [ ] **Semantic HTML** - Proper element usage (button, input, nav, main, etc.)
- [ ] **ARIA attributes** - Appropriate labels, roles, and properties
- [ ] **Keyboard navigation** - All functionality accessible via keyboard

### Screen Reader Support
- [ ] **Alt text** - Meaningful descriptions for images and icons
- [ ] **Form labels** - All inputs associated with labels
- [ ] **Heading hierarchy** - Logical h1 → h2 → h3 structure
- [ ] **Live regions** - Dynamic content changes announced
- [ ] **Skip links** - Navigation skip links for keyboard users

### Interaction Accessibility
- [ ] **Touch targets** - Minimum 44x44px for mobile interactive elements
- [ ] **Timeout warnings** - User warned before session timeouts
- [ ] **Error identification** - Clear error messages with suggestions
- [ ] **Success confirmation** - Positive feedback for completed actions

```tsx
// Accessibility implementation example
<FormField>
  <Label htmlFor="email" required>
    Email Address
  </Label>
  <Input
    id="email"
    type="email"
    aria-describedby="email-help email-error"
    aria-invalid={hasError}
    value={email}
    onChange={setEmail}
  />
  <HelpText id="email-help">
    We'll use this for project updates
  </HelpText>
  {hasError && (
    <ErrorText id="email-error" role="alert">
      Please enter a valid email address
    </ErrorText>
  )}
</FormField>
```

## AI-Specific Implementation Checklist

### AI Labeling Requirements
- [ ] **Clear identification** - All AI content labeled with AILabel component
- [ ] **Appropriate variant** - Using correct variant (generated, assisted, suggestion)
- [ ] **Confidence levels** - Including AI confidence when available
- [ ] **Explanation accessible** - Tooltip or expandable explanation provided

### Explainable AI (XAI) Patterns
- [ ] **Progressive disclosure** - Layer 1 (summary) and Layer 2 (detailed) explanations
- [ ] **Decision reasoning** - Clear explanation of AI decision factors
- [ ] **Source attribution** - References to data sources AI used
- [ ] **Alternative options** - Other choices AI considered
- [ ] **User feedback** - Thumbs up/down or rating system

### User Control & Agency
- [ ] **Edit capabilities** - Users can modify AI-generated content
- [ ] **Accept/reject controls** - Users can accept or dismiss AI suggestions
- [ ] **Manual alternatives** - Non-AI options always available
- [ ] **Undo functionality** - Users can reverse AI-assisted actions
- [ ] **Privacy controls** - Users can opt-out of AI features

## Testing Checklist

### Visual Testing
- [ ] **Light and dark themes** - Component tested in both theme modes
- [ ] **All breakpoints** - Mobile, tablet, and desktop responsive behavior
- [ ] **Browser compatibility** - Chrome, Firefox, Safari, Edge latest versions
- [ ] **High DPI displays** - Scaling works correctly on retina displays
- [ ] **Zoom levels** - Readable at 125%, 150%, 200% zoom

### Interaction Testing
- [ ] **Keyboard navigation** - Tab order logical, all features accessible
- [ ] **Screen reader** - VoiceOver, NVDA, or JAWS compatibility tested
- [ ] **Touch interactions** - Mobile touch targets appropriately sized
- [ ] **Error scenarios** - Graceful handling of network failures and errors
- [ ] **Loading states** - Appropriate feedback during asynchronous operations

### Performance Testing
- [ ] **Bundle size** - Component adds minimal bundle weight
- [ ] **Render performance** - No unnecessary re-renders
- [ ] **Memory usage** - No memory leaks in dynamic components
- [ ] **Loading speed** - Fast initial render and interaction ready times

## Code Review Checklist

### Design System Compliance
- [ ] **Token usage verified** - No hard-coded values in implementation
- [ ] **Component patterns followed** - Atomic design principles applied
- [ ] **Brand voice consistency** - Content matches voice and tone guidelines
- [ ] **Anti-pattern avoidance** - No prohibited patterns implemented

### Code Quality
- [ ] **TypeScript compliance** - No type errors or `any` usage
- [ ] **ESLint compliance** - All linting rules passed
- [ ] **Test coverage** - Critical functionality covered by tests
- [ ] **Documentation updated** - Component specs and examples updated
- [ ] **Accessibility tested** - Manual and automated accessibility checks passed

### Performance & Optimization
- [ ] **Bundle analysis** - Import/export structure optimized
- [ ] **Lazy loading** - Heavy components loaded on demand
- [ ] **Memoization** - Expensive calculations memoized appropriately
- [ ] **Image optimization** - Images properly sized and formatted

## Deployment Checklist

### Pre-Deployment Validation
- [ ] **Visual regression testing** - Screenshots match approved designs
- [ ] **Accessibility audit** - Full accessibility testing completed
- [ ] **Performance benchmarks** - Loading and interaction metrics within targets
- [ ] **Cross-browser testing** - Verified in all supported browsers
- [ ] **Mobile testing** - Real device testing completed

### Production Monitoring
- [ ] **Error tracking** - Component errors logged and monitored
- [ ] **Performance monitoring** - Real user metrics tracked
- [ ] **Accessibility monitoring** - Ongoing accessibility validation
- [ ] **User feedback collection** - Mechanisms for collecting user input

## Maintenance Checklist

### Regular Reviews (Weekly)
- [ ] **New components** - Review against design system standards
- [ ] **Token usage** - Audit for proper token implementation
- [ ] **Performance metrics** - Check for performance regressions
- [ ] **Error reports** - Address component-related errors

### System Updates (Monthly)
- [ ] **Token updates** - Apply design token changes
- [ ] **Documentation updates** - Keep component specs current
- [ ] **Dependency updates** - Update design system dependencies
- [ ] **Testing suite updates** - Expand test coverage as needed

### Comprehensive Audits (Quarterly)
- [ ] **Full accessibility audit** - Complete WCAG compliance review
- [ ] **Brand consistency review** - Ensure all components align with brand
- [ ] **Performance optimization** - Identify and implement improvements
- [ ] **User feedback analysis** - Incorporate user feedback into improvements

---

## Quick Reference Commands

### Token Validation
```bash
# Validate design tokens
npm run validate-tokens

# Check token usage in components
npm run audit-tokens
```

### Testing Commands
```bash
# Run accessibility tests
npm run test:a11y

# Run visual regression tests
npm run test:visual

# Run full test suite
npm run test:all
```

### Development Tools
```bash
# Start Storybook for component development
npm run storybook

# Run design system linting
npm run lint:design-system

# Build and analyze bundle
npm run build && npm run analyze
```

Use this checklist systematically to ensure all MaterialLab components meet the highest standards of quality, accessibility, and brand consistency.