# Design Builder Agent Instructions

This document provides comprehensive instructions for AI agents building components and interfaces using the MaterialLab design system. Follow these guidelines to ensure consistency, accessibility, and brand alignment in all created components.

## Core Principles

### 1. Token-First Approach
- **Always use design tokens** - Never hard-code values
- **Reference semantic tokens** - Use `color.semantic.light.text.primary` over global tokens
- **Follow naming conventions** - `category-property-variant` structure

```tsx
// ✅ Good: Using design tokens
const StyledButton = styled.button`
  background-color: var(--color-background-interactive-primary);
  color: var(--color-text-on-interactive);
  padding: ${tokens.spacing['3']} ${tokens.spacing['6']};
  font-family: ${tokens.typography.fontFamily.primary};
  transition: all ${tokens.motion.duration.fast} ${tokens.motion.easing.easeOut};
`

// ❌ Bad: Hard-coded values
const StyledButton = styled.button`
  background-color: #EC8B5E;
  color: #141A46;
  padding: 12px 24px;
  font-family: "Inter";
  transition: all 150ms ease-out;
`
```

### 2. Brand Voice Integration
- **Human-centric language** - Focus on empowering users, not replacing them
- **Radical transparency** - Clearly explain AI involvement and limitations
- **Avoid anthropomorphism** - Don't describe AI as having human qualities
- **Benefit-oriented copy** - Emphasize outcomes and value

### 3. Accessibility by Default
- **WCAG 2.1 AA compliance** - Minimum 4.5:1 contrast ratio for text
- **Semantic HTML** - Use proper elements (button, input, nav, main)
- **Focus management** - Visible focus indicators on all interactive elements
- **Screen reader support** - ARIA labels, live regions, proper heading hierarchy

## Component Building Guidelines

### Atomic Design Implementation

#### Building Atoms
Focus on single-responsibility components:

```tsx
// Button atom example
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: ReactNode
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </StyledButton>
  )
}
```

#### Building Molecules
Combine atoms with clear relationships:

```tsx
// Form field molecule example
interface FormFieldProps {
  label: string
  required?: boolean
  helpText?: string
  error?: string
  children: ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  helpText,
  error,
  children
}) => {
  const fieldId = useId()
  
  return (
    <FieldContainer>
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      {React.cloneElement(children as React.ReactElement, { id: fieldId })}
      {helpText && <HelpText>{helpText}</HelpText>}
      {error && <ErrorText role="alert">{error}</ErrorText>}
    </FieldContainer>
  )
}
```

#### Building Organisms
Create complete functional sections:

```tsx
// Contact form organism example
export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  return (
    <Card variant="default">
      <Card.Header title="Start the Conversation" />
      <Card.Body>
        <form onSubmit={handleSubmit}>
          <FormField label="Name" required error={errors.name}>
            <Input type="text" value={formData.name} onChange={handleNameChange} />
          </FormField>
          
          <FormField label="Email" required error={errors.email}>
            <Input type="email" value={formData.email} onChange={handleEmailChange} />
          </FormField>
          
          <AILabel type="chip" variant="assisted" explanation="AI helps format and validate your message" />
        </form>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" type="submit" disabled={!isValid}>
          Send Message
        </Button>
      </Card.Footer>
    </Card>
  )
}
```

## AI-Specific Component Guidelines

### AI Labeling Requirements
**Always label AI-generated or AI-assisted content:**

```tsx
// AI content labeling examples
<AILabel type="chip" variant="generated" />
<AILabel type="inline" variant="suggestion" confidence={85} />
<AILabel 
  type="tooltip" 
  variant="assisted" 
  explanation="AI helped structure this content based on your input"
/>
```

### Explainable AI Patterns
Implement progressive disclosure for AI decisions:

```tsx
// AI explainer component example
<AIExplainer
  confidence={92}
  reasoning={{
    summary: "Recommended based on your project requirements",
    details: [
      "Matches your budget constraint of $50k",
      "Timeline aligns with your Q2 launch goal",
      "Team size fits your collaboration preference"
    ],
    sources: ["project brief", "previous discussions", "industry benchmarks"]
  }}
  alternatives={[
    { option: "Extended timeline approach", confidence: 78 },
    { option: "Reduced scope MVP", confidence: 81 }
  ]}
  onFeedback={handleFeedback}
/>
```

### User Control & Feedback
Always provide user control over AI features:

```tsx
// AI interaction with user controls
<AITextGenerator>
  <AITextGenerator.Input
    placeholder="Describe your project goals..."
    value={input}
    onChange={setInput}
  />
  <AITextGenerator.Controls>
    <Button variant="primary" onClick={generateText}>
      Generate
    </Button>
    <Button variant="tertiary" onClick={clearInput}>
      Clear
    </Button>
  </AITextGenerator.Controls>
  <AITextGenerator.Results>
    {results && (
      <>
        <AILabel type="chip" variant="generated" />
        <EditableContent 
          content={results}
          onEdit={handleEdit}
          onAccept={handleAccept}
          onReject={handleReject}
        />
        <ConfidenceIndicator value={confidence} />
      </>
    )}
  </AITextGenerator.Results>
</AITextGenerator>
```

## Styling and Layout

### Responsive Design
Use mobile-first breakpoints:

```tsx
// Responsive styling example
const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing['6']};
  
  @media (min-width: ${tokens.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: ${tokens.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`
```

### Theme Support
Ensure components work in both light and dark themes:

```tsx
// Theme-aware component styling
const ThemedCard = styled.div`
  background-color: var(--color-background-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
  
  /* Automatically adapts when theme changes */
`
```

### Motion and Animation
Use consistent timing and easing:

```tsx
// Animation implementation
const AnimatedElement = styled.div<{ isVisible: boolean }>`
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: 
    opacity ${tokens.motion.duration.normal} ${tokens.motion.easing.easeOut},
    transform ${tokens.motion.duration.normal} ${tokens.motion.easing.easeOut};
    
  /* Respect user motion preferences */
  @media (prefers-reduced-motion: reduce) {
    transition: opacity ${tokens.motion.duration.instant};
    transform: none;
  }
`
```

## Content and Copy Guidelines

### Voice and Tone by Context

#### UI Microcopy
- **Helpful and concise**
- **Action-oriented**
- **Human language**

```tsx
// Good UI copy examples
<Button>Start Building</Button>
<ErrorMessage>Please enter a valid email address</ErrorMessage>
<SuccessMessage>Project created successfully! Ready to add your first feature?</SuccessMessage>
<AILabel explanation="AI analyzed your requirements and suggested this solution" />
```

#### Error Messages
- **Clear and actionable**
- **Avoid blame**
- **Provide solutions**

```tsx
// Error message examples
const ERROR_MESSAGES = {
  // ❌ Bad
  invalidInput: "Invalid input detected",
  
  // ✅ Good  
  invalidEmail: "Please enter a valid email address (example: name@company.com)",
  apiTimeout: "Connection timed out. Please check your internet and try again.",
  aiProcessingError: "AI processing encountered an issue. Your input has been saved - would you like to try again?"
}
```

#### AI Communication
- **Transparent about AI involvement**
- **Explain capabilities and limitations**
- **Avoid anthropomorphism**

```tsx
// AI communication examples
<AIStatus>
  {/* ❌ Bad */}
  "Our AI is thinking about your request..."
  
  {/* ✅ Good */}
  "Processing your request using AI analysis (estimated 30 seconds)..."
</AIStatus>

<AIExplanation>
  {/* ❌ Bad */}
  "The AI believes this is the best solution"
  
  {/* ✅ Good */}
  "Based on your project requirements, this approach scored highest for budget fit and timeline feasibility"
</AIExplanation>
```

## Testing Requirements

### Component Testing Checklist

#### Visual Testing
- [ ] Test in both light and dark themes
- [ ] Verify responsive behavior (mobile, tablet, desktop)
- [ ] Check all variant and state combinations
- [ ] Test with realistic content (long text, missing images, etc.)

#### Accessibility Testing
- [ ] Keyboard navigation works completely
- [ ] Screen reader announces all important information
- [ ] Color contrast meets WCAG 2.1 AA standards
- [ ] Focus indicators are visible and consistent

#### Interaction Testing
- [ ] All interactive elements respond appropriately
- [ ] Loading states provide clear feedback
- [ ] Error states are handled gracefully
- [ ] Success states confirm completion

### Testing Code Examples

```tsx
// Accessibility testing example
describe('Button Accessibility', () => {
  it('should be keyboard accessible', () => {
    render(<Button onClick={mockClick}>Test Button</Button>)
    const button = screen.getByRole('button')
    
    button.focus()
    expect(button).toHaveFocus()
    
    fireEvent.keyDown(button, { key: 'Enter' })
    expect(mockClick).toHaveBeenCalled()
  })
  
  it('should have proper ARIA attributes', () => {
    render(<Button loading>Loading Button</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).toHaveAttribute('aria-describedby')
  })
})
```

## Error Handling

### Graceful Degradation
Components should work even when props are missing or invalid:

```tsx
// Error boundary and fallback example
export const SafeComponent: React.FC<ComponentProps> = (props) => {
  try {
    return <ComplexComponent {...props} />
  } catch (error) {
    console.error('Component error:', error)
    return (
      <ErrorFallback>
        <Typography variant="error">
          Something went wrong. Please try refreshing the page.
        </Typography>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </ErrorFallback>
    )
  }
}
```

### Loading States
Always provide feedback during asynchronous operations:

```tsx
// Loading state examples
const LoadingButton = ({ loading, children, ...props }) => (
  <Button disabled={loading} {...props}>
    {loading ? (
      <>
        <Spinner size="sm" />
        Processing...
      </>
    ) : children}
  </Button>
)

const LoadingCard = ({ loading, content }) => (
  <Card>
    {loading ? (
      <SkeletonLoader rows={3} />
    ) : (
      <Card.Body>{content}</Card.Body>
    )}
  </Card>
)
```

## Performance Guidelines

### Bundle Optimization
- Split components appropriately
- Use lazy loading for heavy components
- Minimize re-renders with React.memo

```tsx
// Performance optimization examples
const HeavyComponent = lazy(() => import('./HeavyComponent'))

const OptimizedCard = React.memo<CardProps>(({ title, content }) => {
  return (
    <Card>
      <Card.Header title={title} />
      <Card.Body>{content}</Card.Body>
    </Card>
  )
})

// Usage with Suspense
<Suspense fallback={<CardSkeleton />}>
  <HeavyComponent {...props} />
</Suspense>
```

## Final Checklist

Before considering a component complete:

### Design System Compliance
- [ ] Uses only design tokens (no hard-coded values)
- [ ] Follows atomic design principles
- [ ] Implements proper component hierarchy
- [ ] Supports both light and dark themes

### Brand Alignment
- [ ] Voice and tone appropriate for context
- [ ] AI features properly labeled and explained
- [ ] Content follows human-centric principles
- [ ] Visual design avoids AI clichés

### Accessibility & Usability
- [ ] Meets WCAG 2.1 AA standards
- [ ] Keyboard accessible
- [ ] Screen reader compatible
- [ ] Respects user motion preferences

### Technical Quality
- [ ] TypeScript interfaces complete
- [ ] Error boundaries implemented
- [ ] Loading states provided
- [ ] Performance optimized
- [ ] Tests cover critical functionality

Remember: Every component should enhance human capabilities while maintaining transparency about AI involvement. Build with empathy, consistency, and attention to inclusive design.