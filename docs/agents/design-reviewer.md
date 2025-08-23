# Design Reviewer Agent Instructions

This document provides comprehensive instructions for AI agents reviewing designs and implementations against the MaterialLab design system. Use these guidelines to evaluate components, interfaces, and experiences for consistency, accessibility, and brand alignment.

## Review Framework

### Review Priorities
1. **Brand Consistency** - Alignment with core values and visual identity
2. **Accessibility Compliance** - WCAG 2.1 AA standards and inclusive design
3. **Design System Adherence** - Proper token usage and component patterns  
4. **User Experience Quality** - Clarity, usability, and task completion
5. **Technical Implementation** - Code quality and performance considerations

## Brand Consistency Review

### Core Values Assessment

#### Human-Centricity Checklist
- [ ] **Empowerment Language**: Content focuses on augmenting human capabilities
- [ ] **User Control**: Users can modify, reject, or override AI suggestions
- [ ] **Accessibility**: Design accommodates diverse abilities and needs
- [ ] **Clarity**: Complex concepts explained in simple, accessible language

❌ **Red Flags:**
- Language suggesting AI replaces human judgment
- Forced AI interactions without alternatives
- Inaccessible design patterns
- Overly technical jargon without explanation

✅ **Good Examples:**
```tsx
// Human-centric AI interaction
<AIAssistant>
  <AILabel type="chip" variant="suggestion" />
  <p>Based on your project goals, here are three approaches to consider:</p>
  <OptionsList options={suggestions} />
  <UserControls>
    <Button variant="tertiary">Modify Suggestions</Button>
    <Button variant="tertiary">Start From Scratch</Button>
  </UserControls>
</AIAssistant>
```

#### Radical Transparency Review
- [ ] **AI Disclosure**: Clear labeling of AI-generated content
- [ ] **Capability Communication**: Honest about what AI can and cannot do
- [ ] **Process Explanation**: Users understand how AI reached conclusions
- [ ] **Limitation Acknowledgment**: Clear about AI constraints and potential errors

❌ **Red Flags:**
- Hidden AI involvement in user interactions
- Overpromising AI capabilities
- Black box outputs without explanation
- Claiming AI perfection or infallibility

✅ **Good Examples:**
```tsx
// Transparent AI communication
<AIExplainer
  confidence={78}
  reasoning={{
    summary: "Recommendation based on 3 key factors",
    details: ["Budget alignment", "Timeline feasibility", "Team expertise match"],
    limitations: "Does not account for market timing or competitive landscape"
  }}
  sources={["project brief", "team skills assessment", "budget parameters"]}
/>
```

### Visual Identity Review

#### Logo and Brand Usage
- [ ] **Official Assets**: Using approved logo files only
- [ ] **Clear Space**: Proper spacing maintained around logos
- [ ] **Appropriate Context**: Logo placement makes sense contextually
- [ ] **No Modifications**: Logo not stretched, recolored, or altered

#### Color Palette Application
- [ ] **Token Usage**: Colors reference design tokens, not hard-coded values
- [ ] **Semantic Meaning**: Color choices align with intended meaning
- [ ] **Palette Consistency**: Using either "Humanistic Intelligence" or "Structured Dynamism"
- [ ] **Theme Support**: Colors work in both light and dark modes

❌ **Common Issues:**
```css
/* Hard-coded colors */
.component {
  background-color: #EC8B5E; /* Should use token */
  color: #141A46; /* Should use token */
}

/* Mixed palettes */
.mixed-component {
  background: var(--color-global-orange-100); /* Humanistic */
  accent: var(--color-global-lime-100); /* Structured - inconsistent */
}
```

✅ **Correct Implementation:**
```css
/* Proper token usage */
.component {
  background-color: var(--color-background-interactive-primary);
  color: var(--color-text-on-interactive);
}
```

#### Typography Implementation
- [ ] **Font Usage**: Inter (headlines), Source Serif 4 (body), JetBrains Mono (code)
- [ ] **Hierarchy**: Clear visual hierarchy with proper heading structure
- [ ] **Scale Compliance**: Font sizes match design token scale
- [ ] **Line Height**: Appropriate line spacing for readability

## Design System Adherence

### Token Usage Review

#### Color Token Assessment
```tsx
// Review checklist for color implementation
const colorReview = {
  // ✅ Good: Semantic token usage
  backgroundColor: 'var(--color-background-surface)',
  
  // ❌ Bad: Hard-coded values
  backgroundColor: '#FFFFFF',
  
  // ❌ Bad: Global token in component
  backgroundColor: 'var(--color-global-white-100)',
  
  // ✅ Good: Theme-aware implementation
  color: 'var(--color-text-primary)',
}
```

#### Spacing Token Assessment
- [ ] **4px Grid**: All spacing uses multiples of 4px
- [ ] **Token Reference**: Spacing references design tokens
- [ ] **Consistent Scale**: Uses established spacing scale values
- [ ] **Logical Hierarchy**: Spacing creates clear visual relationships

#### Typography Token Assessment
- [ ] **Font Family**: References typography.fontFamily tokens
- [ ] **Font Size**: Uses typography.fontSize scale
- [ ] **Font Weight**: Uses typography.fontWeight values
- [ ] **Line Height**: Uses typography.lineHeight tokens

### Component Pattern Review

#### Atomic Design Structure
- [ ] **Atoms**: Single-purpose, irreducible components
- [ ] **Molecules**: Atoms combined with clear relationships
- [ ] **Organisms**: Complete functional sections
- [ ] **Proper Composition**: Clear component hierarchy and data flow

#### Component Interface Review
```tsx
// Good component interface example
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: ReactNode
  onClick?: () => void
  // Clear, typed props with sensible defaults
}

// Issues to flag:
interface ProblematicProps {
  style?: any // Too permissive
  className?: string // Bypasses design system
  color?: string // Should use variants instead
  // Missing required props like children
}
```

## Accessibility Compliance Review

### WCAG 2.1 AA Standards

#### Color Contrast Assessment
- [ ] **Normal Text**: Minimum 4.5:1 contrast ratio
- [ ] **Large Text**: Minimum 3:1 contrast ratio (18pt+ or 14pt+ bold)
- [ ] **Interactive Elements**: Meet contrast requirements in all states
- [ ] **Non-text Elements**: Icons and controls meet 3:1 minimum

**Testing Tools Integration:**
```tsx
// Automated contrast checking
const contrastCheck = (foreground: string, background: string) => {
  const ratio = calculateContrastRatio(foreground, background)
  return {
    passes: ratio >= 4.5,
    ratio: ratio,
    grade: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail'
  }
}
```

#### Semantic HTML Review
- [ ] **Proper Elements**: button, input, nav, main, article, aside
- [ ] **Heading Hierarchy**: h1 → h2 → h3 logical sequence
- [ ] **Form Labels**: All inputs associated with labels
- [ ] **Landmark Roles**: Page sections properly identified

❌ **Common Semantic Issues:**
```tsx
// Problems to flag
<div onClick={handleClick}>Click me</div> {/* Should be button */}
<div>Important heading</div> {/* Should be h1-h6 */}
<input placeholder="Name" /> {/* Missing label */}
```

✅ **Proper Semantic HTML:**
```tsx
// Correct implementations
<button onClick={handleClick}>Click me</button>
<h2>Important heading</h2>
<label htmlFor="name">Name</label>
<input id="name" type="text" />
```

#### Keyboard Navigation Assessment
- [ ] **Tab Order**: Logical sequence through interactive elements
- [ ] **Focus Indicators**: Visible focus states on all interactive elements
- [ ] **Keyboard Controls**: All functionality accessible via keyboard
- [ ] **Focus Management**: Proper focus handling in dynamic content

#### Screen Reader Compatibility
- [ ] **ARIA Labels**: Appropriate labels for complex widgets
- [ ] **Live Regions**: Dynamic content changes announced
- [ ] **Alt Text**: Meaningful descriptions for images
- [ ] **Role Attributes**: Proper ARIA roles for custom components

## User Experience Quality Review

### Interaction Design Assessment

#### AI Interaction Patterns
- [ ] **AI Labeling**: All AI content clearly identified
- [ ] **Progressive Disclosure**: Complex AI explanations layered appropriately
- [ ] **User Feedback**: Mechanisms for users to rate AI outputs
- [ ] **Error Handling**: Graceful degradation when AI features fail

```tsx
// Good AI interaction pattern
<AIGeneratedContent>
  <AILabel type="chip" variant="generated" />
  <ContentDisplay content={aiOutput} />
  <AIControls>
    <Button variant="tertiary" onClick={regenerate}>Try Again</Button>
    <Button variant="tertiary" onClick={edit}>Edit This</Button>
    <FeedbackControls onThumbsUp={positive} onThumbsDown={negative} />
  </AIControls>
  <AIExplainer 
    confidence={confidence}
    reasoning={reasoning}
    expandable={true}
  />
</AIGeneratedContent>
```

#### Loading and Error States
- [ ] **Loading Feedback**: Clear indication of processing states
- [ ] **Error Messages**: Helpful, actionable error communication
- [ ] **Empty States**: Meaningful guidance when content is unavailable
- [ ] **Success Confirmation**: Clear confirmation of completed actions

### Content Quality Review

#### Voice and Tone Assessment
- [ ] **Context Appropriate**: Tone matches the specific use case
- [ ] **Consistent Voice**: Maintains brand personality across components
- [ ] **Human Language**: Avoids robotic or overly technical phrasing
- [ ] **Benefit Focused**: Emphasizes user value and outcomes

#### Content Structure Review
- [ ] **Scannable**: Information hierarchy supports quick scanning
- [ ] **Actionable**: Clear next steps for users
- [ ] **Concise**: Essential information without unnecessary complexity
- [ ] **Inclusive**: Language accessible to diverse audiences

### Performance Assessment

#### Loading Performance
- [ ] **Critical Path**: Essential content loads first
- [ ] **Progressive Enhancement**: Basic functionality works during loading
- [ ] **Skeleton States**: Meaningful placeholders during content loading
- [ ] **Error Boundaries**: Graceful handling of component failures

#### Interaction Performance
- [ ] **Responsive Interactions**: UI responds within 100ms
- [ ] **Smooth Animations**: 60fps for motion graphics
- [ ] **Debounced Inputs**: Appropriate delays for search/filter inputs
- [ ] **Memory Management**: No memory leaks in dynamic components

## Anti-Pattern Detection

### Visual Anti-Patterns
- [ ] **Generic AI Aesthetics**: Hexagonal shapes, blue-green gradients
- [ ] **Overused Patterns**: Swirling portals, circuit board backgrounds
- [ ] **Inconsistent Branding**: Mixed color palettes or typography
- [ ] **Trend Chasing**: Design choices based on trends vs. strategy

### Communication Anti-Patterns
- [ ] **Anthropomorphism**: Describing AI as thinking or feeling
- [ ] **Technical Obfuscation**: Unnecessarily complex explanations
- [ ] **Overpromising**: Claims about AI capabilities beyond reality
- [ ] **Fear-Based Language**: Creating anxiety about AI adoption

### UX Anti-Patterns
- [ ] **Hidden AI**: AI interactions not clearly labeled
- [ ] **Overwhelming Automation**: Too much AI without user control
- [ ] **Poor Error Handling**: Generic or blame-focused error messages
- [ ] **Forced Interactions**: No alternatives to AI-powered features

## Review Reporting Framework

### Issue Severity Levels

#### Critical Issues (Must Fix)
- Accessibility failures blocking users
- Brand inconsistencies damaging trust
- Broken core functionality
- Security or privacy concerns

#### Major Issues (Should Fix)
- Design system violations
- Usability problems affecting task completion
- Performance issues impacting experience
- Content quality issues

#### Minor Issues (Consider Fixing)
- Minor design inconsistencies
- Optimization opportunities
- Enhancement suggestions
- Documentation gaps

### Review Report Template

```markdown
## Design Review Report

### Component: [Component Name]
### Review Date: [Date]
### Reviewer: [Agent/Human Name]

### Summary
Brief overview of component purpose and review findings.

### Critical Issues (🚨)
- [ ] Issue 1: Description and recommended fix
- [ ] Issue 2: Description and recommended fix

### Major Issues (⚠️)
- [ ] Issue 1: Description and recommended fix
- [ ] Issue 2: Description and recommended fix

### Minor Issues (💡)
- [ ] Issue 1: Description and enhancement suggestion
- [ ] Issue 2: Description and enhancement suggestion

### Positive Highlights (✅)
- Well-implemented accessibility features
- Excellent token usage
- Clear user experience flows

### Recommendations
1. Priority actions to take
2. Future improvements to consider
3. Best practices to maintain

### Overall Score
- Brand Consistency: [1-10]
- Accessibility: [1-10] 
- Design System: [1-10]
- User Experience: [1-10]
- Technical Quality: [1-10]

**Total: [Average]/10**
```

## Automated Review Capabilities

### Linting Integration
```javascript
// ESLint rules for design system compliance
module.exports = {
  rules: {
    'design-system/use-design-tokens': 'error',
    'design-system/semantic-colors-only': 'error',
    'design-system/proper-component-hierarchy': 'warn',
    'accessibility/contrast-ratio': 'error',
    'accessibility/semantic-html': 'error',
    'brand/ai-labeling-required': 'error',
    'brand/avoid-anthropomorphism': 'warn'
  }
}
```

### Testing Integration
```tsx
// Automated accessibility testing
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('should not have accessibility violations', async () => {
  const { container } = render(<Component />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

Remember: The goal of design review is to maintain consistency, accessibility, and brand integrity while supporting continuous improvement. Focus on actionable feedback that helps the team build better experiences for all users.