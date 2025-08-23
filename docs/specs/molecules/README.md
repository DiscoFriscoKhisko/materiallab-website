# Molecules - Component Groups

Molecules are composed of multiple atoms working together as a functional unit. They represent the first level of component complexity where atoms combine to form meaningful interface elements.

## Design Philosophy

Molecules follow these principles:
- **Purposeful Combination** - Atoms combined with specific intent and functionality
- **Cohesive Behavior** - All parts work together toward a single goal
- **Contextual Relationships** - Internal relationships between atoms are clear
- **Reusable Patterns** - Can be used across different contexts and pages

## Component Catalog

### Cards

Containers that group related content and actions into a digestible format.

#### Card Variants
- **Default** - Basic content container with subtle shadow
- **Interactive** - Hover states, clickable behavior
- **Featured** - Enhanced styling for emphasis
- **Compact** - Reduced padding for dense layouts

#### Card Components
- **Card Header** - Title area with optional actions
- **Card Body** - Main content area
- **Card Footer** - Actions or metadata
- **Card Image** - Media content with proper aspect ratios

#### Implementation
```tsx
interface CardProps {
  variant?: 'default' | 'interactive' | 'featured' | 'compact'
  header?: {
    title: string
    subtitle?: string
    actions?: ReactNode
  }
  image?: {
    src: string
    alt: string
    aspectRatio?: '16:9' | '4:3' | '1:1'
  }
  children: ReactNode
  footer?: ReactNode
  onClick?: () => void
}
```

#### Example Usage
```tsx
<Card variant="interactive" onClick={handleCardClick}>
  <Card.Header 
    title="AI Strategy Consulting"
    subtitle="2-week roadmap"
    actions={<Button variant="tertiary">Learn More</Button>}
  />
  <Card.Body>
    Define your AI roadmap and identify the highest-impact 
    opportunities for your business.
  </Card.Body>
  <Card.Footer>
    <AILabel type="chip" variant="assisted" />
  </Card.Footer>
</Card>
```

### Form Fields

Complete input controls with labels, validation, and help text.

#### Field Types
- **Text Field** - Single-line text input with full labeling
- **Textarea Field** - Multi-line text input
- **Select Field** - Dropdown selection with options
- **Checkbox Field** - Boolean selection with label
- **Radio Group** - Single selection from multiple options

#### Field Components
- **Label** - Required, clearly describes the input
- **Input** - The interactive element (atom)
- **Help Text** - Optional guidance for users
- **Error Message** - Validation feedback
- **Success Indicator** - Positive validation feedback

#### Implementation
```tsx
interface FormFieldProps {
  label: string
  required?: boolean
  helpText?: string
  error?: string
  success?: boolean
  disabled?: boolean
  children: ReactNode // Input component
}
```

#### Example Usage
```tsx
<FormField
  label="Email Address"
  required
  helpText="We'll use this for project updates"
  error={emailError}
>
  <Input
    type="email"
    value={email}
    onChange={setEmail}
    placeholder="your@email.com"
  />
</FormField>
```

### Navigation Items

Individual navigation elements that combine links with visual indicators.

#### Navigation Types
- **Primary Nav Item** - Main site navigation
- **Secondary Nav Item** - Sub-navigation or sidebar links
- **Breadcrumb Item** - Path indication with separators
- **Tab Item** - Content switching navigation

#### Navigation States
- **Default** - Standard navigation item
- **Active** - Currently selected page/section
- **Hover** - Interactive feedback
- **Disabled** - Temporarily unavailable

#### Implementation
```tsx
interface NavItemProps {
  href?: string
  active?: boolean
  disabled?: boolean
  icon?: string // Phosphor icon name
  badge?: number // Notification count
  children: ReactNode
  onClick?: () => void
}
```

### Search Components

Search functionality combining input, suggestions, and results.

#### Search Variants
- **Simple Search** - Input field with search icon
- **Autocomplete Search** - With suggestion dropdown
- **Faceted Search** - With filters and categories
- **Global Search** - Site-wide search with shortcuts

#### Search Components
- **Search Input** - Specialized input with search styling
- **Search Suggestions** - Dropdown list of suggested queries
- **Search Results** - Formatted result items
- **Search Filters** - Refinement controls

#### Implementation
```tsx
interface SearchProps {
  placeholder?: string
  suggestions?: SearchSuggestion[]
  onSearch: (query: string) => void
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void
  loading?: boolean
  autoFocus?: boolean
}
```

### Progress Indicators

Visual feedback for task completion and loading states.

#### Progress Types
- **Progress Bar** - Linear progress indication
- **Step Indicator** - Multi-step process visualization  
- **Loading Spinner** - Indeterminate progress
- **Skeleton Loader** - Content placeholder during loading

#### Progress States
- **Determinate** - Known progress percentage
- **Indeterminate** - Unknown completion time
- **Error State** - Progress interrupted by error
- **Success State** - Task completed successfully

#### Implementation
```tsx
interface ProgressProps {
  type?: 'bar' | 'steps' | 'spinner' | 'skeleton'
  value?: number // 0-100 for determinate progress
  steps?: { label: string; completed: boolean }[]
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  success?: boolean
}
```

### AI Explainability Components

Interactive elements that reveal AI decision-making processes.

#### Explainability Types
- **Confidence Indicator** - Shows AI certainty level
- **Decision Tree** - Visual breakdown of AI reasoning
- **Source Attribution** - References used by AI
- **Alternative Suggestions** - Other options AI considered

#### Interaction Patterns
- **Progressive Disclosure** - Layer 1 (summary) → Layer 2 (detail)
- **Hover Details** - Quick explanation on mouse over
- **Expandable Sections** - Click to reveal more information
- **Modal Deep-dive** - Comprehensive explanation popup

#### Implementation
```tsx
interface AIExplainerProps {
  confidence?: number // 0-100
  reasoning?: {
    summary: string
    details: string[]
    sources?: string[]
  }
  alternatives?: Array<{
    option: string
    reasoning: string
    confidence: number
  }>
  onFeedback?: (helpful: boolean) => void
}
```

### Status Indicators

Visual communication of system states and user feedback.

#### Status Types
- **Alert Messages** - Important information or warnings
- **Notification Badges** - Counts or indicators on elements
- **Status Pills** - Compact status labels
- **Toast Messages** - Temporary success/error messages

#### Status Variants
- **Info** - Neutral information (teal color)
- **Success** - Positive confirmation (green color)
- **Warning** - Caution required (orange color)
- **Error** - Problem or failure (red color)

#### Implementation
```tsx
interface StatusIndicatorProps {
  variant: 'info' | 'success' | 'warning' | 'error'
  title?: string
  message: string
  dismissible?: boolean
  action?: {
    label: string
    onClick: () => void
  }
  onDismiss?: () => void
}
```

## Accessibility Guidelines

### Semantic Structure
- Use proper HTML semantics (form, nav, article, etc.)
- Associate labels with form controls
- Provide clear heading hierarchy within molecules

### Interactive Elements
- All interactive parts accessible via keyboard
- Clear focus order through the component
- Appropriate ARIA attributes for complex widgets

### Dynamic Content
- Announce state changes to screen readers
- Use ARIA live regions for dynamic updates
- Provide loading state announcements

## Implementation Guidelines

### Composition Patterns
```tsx
// Good: Clear composition with proper separation
<Card>
  <Card.Header title="Component Title" />
  <Card.Body>
    <FormField label="Input Label">
      <Input type="text" />
    </FormField>
  </Card.Body>
  <Card.Footer>
    <Button variant="primary">Submit</Button>
  </Card.Footer>
</Card>

// Avoid: Deeply nested or unclear relationships
<Card>
  <div>
    <span>Title</span>
    <div>
      <input />
      <button>Submit</button>
    </div>
  </div>
</Card>
```

### State Management
- Each molecule manages its own internal state
- Accept controlled props for external state management
- Provide clear callbacks for parent components

### Error Boundaries
- Wrap complex molecules in error boundaries
- Provide fallback UI for error states
- Log errors for debugging without breaking UX

## Testing Requirements

### Component Testing
- Test all variant combinations
- Verify proper atom integration
- Check responsive behavior across breakpoints

### Interaction Testing
- Keyboard navigation through all interactive elements
- Screen reader announcements for state changes
- Touch interaction on mobile devices

### Integration Testing
- Test molecules within organism contexts
- Verify proper communication with parent components
- Check performance with large datasets

## Performance Considerations

### Lazy Loading
- Load heavy molecule content on demand
- Use intersection observers for viewport-based loading
- Implement skeleton states during loading

### Memoization
- Memoize expensive calculations within molecules
- Prevent unnecessary re-renders of child atoms
- Use React.memo for pure molecules

### Bundle Optimization
- Split molecules into separate chunks when appropriate
- Tree-shake unused molecule variants
- Optimize asset loading for molecule-specific resources

## Contributing New Molecules

1. **Atom Analysis** - Identify which atoms are needed
2. **Relationship Design** - Define how atoms work together
3. **State Architecture** - Plan internal and external state needs
4. **Accessibility Review** - Ensure compound accessibility
5. **Performance Testing** - Verify rendering performance
6. **Documentation** - Update this README with specifications

Remember: Molecules should have a clear, single purpose while being composed of multiple atoms. They bridge the gap between basic atoms and complex organisms.