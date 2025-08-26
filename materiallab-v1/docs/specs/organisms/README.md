# Organisms - Complex Components

Organisms are complex UI components composed of groups of molecules, atoms, and other organisms. They represent distinct sections of an interface and often correspond to specific user tasks or content areas.

## Design Philosophy

Organisms follow these principles:
- **Functional Completeness** - Can accomplish complete user tasks
- **Contextual Integration** - Work within page templates and layouts
- **Content Flexibility** - Accommodate varying content types and amounts
- **Responsive Design** - Adapt gracefully across all device sizes

## Component Catalog

### Header Components

Top-level navigation and branding elements that orient users and provide site-wide functionality.

#### Header Variants
- **Site Header** - Main site navigation with logo and primary actions
- **Page Header** - Section-specific navigation with breadcrumbs
- **Dashboard Header** - App-specific with user controls and notifications
- **Marketing Header** - Hero-focused with prominent CTAs

#### Header Components
- **Brand Logo** - Company identity and home link
- **Primary Navigation** - Main site sections
- **Secondary Navigation** - User account, settings, search
- **Call-to-Action** - Primary conversion action
- **Mobile Menu** - Collapsed navigation for small screens

#### Implementation
```tsx
interface HeaderProps {
  variant?: 'site' | 'page' | 'dashboard' | 'marketing'
  logo: {
    src: string
    alt: string
    href?: string
  }
  navigation: NavigationItem[]
  actions?: {
    primary?: { label: string; href: string }
    secondary?: { label: string; href: string }
  }
  user?: {
    name: string
    avatar?: string
    notifications?: number
  }
  searchEnabled?: boolean
}
```

#### Example Usage
```tsx
<Header variant="site">
  <Header.Logo src="/logo.svg" alt="MaterialLab" href="/" />
  <Header.Navigation items={mainNavigation} />
  <Header.Actions>
    <Header.Search placeholder="Search documentation..." />
    <Button variant="primary" href="/contact">
      Start Building
    </Button>
  </Header.Actions>
</Header>
```

### Hero Sections

Prominent introductory sections that communicate primary value propositions and guide user actions.

#### Hero Types
- **Landing Hero** - Homepage introduction with multiple CTAs
- **Product Hero** - Feature-focused with product imagery
- **Page Hero** - Section introduction with context
- **Video Hero** - Media-rich storytelling format

#### Hero Components
- **Headline** - Primary message (H1)
- **Subheading** - Supporting description
- **Call-to-Action** - Primary and secondary actions
- **Media** - Hero image, video, or illustration
- **Social Proof** - Testimonials, logos, or metrics

#### Implementation
```tsx
interface HeroProps {
  type?: 'landing' | 'product' | 'page' | 'video'
  headline: string
  subheading?: string
  actions: {
    primary: { label: string; href: string }
    secondary?: { label: string; href: string }
  }
  media?: {
    type: 'image' | 'video' | 'interactive'
    src: string
    alt?: string
  }
  socialProof?: {
    metrics?: Array<{ value: string; label: string }>
    testimonial?: { quote: string; author: string; company: string }
    logos?: Array<{ src: string; alt: string }>
  }
}
```

### Form Sections

Complex forms that handle multi-step processes, validation, and data collection.

#### Form Types
- **Contact Form** - Lead generation with qualification
- **Onboarding Form** - Multi-step user setup process
- **Settings Form** - Configuration with live preview
- **Checkout Form** - Payment processing workflow

#### Form Features
- **Step Progress** - Multi-step process visualization
- **Field Validation** - Real-time and submission validation
- **Auto-save** - Prevent data loss during form completion
- **Conditional Logic** - Dynamic field showing/hiding
- **AI Assistance** - Form completion suggestions

#### Implementation
```tsx
interface FormSectionProps {
  type?: 'contact' | 'onboarding' | 'settings' | 'checkout'
  steps?: Array<{
    id: string
    title: string
    fields: FormField[]
    validation?: ValidationSchema
  }>
  autoSave?: boolean
  aiAssistance?: {
    enabled: boolean
    suggestions: string[]
  }
  onSubmit: (data: FormData) => Promise<void>
  onStepChange?: (step: number) => void
}
```

### Content Sections

Organized content areas that present information in scannable, engaging formats.

#### Content Types
- **Feature Grid** - Product capabilities overview
- **Service Showcase** - Detailed service descriptions
- **Team Section** - People and expertise highlighting
- **FAQ Section** - Frequently asked questions with search
- **Blog Grid** - Article listings with filtering

#### Content Components
- **Section Header** - Title, description, and navigation
- **Content Grid** - Flexible layout for content cards
- **Filter Controls** - Category and search filtering
- **Load More** - Progressive content loading
- **Content Cards** - Individual content presentations

#### Implementation
```tsx
interface ContentSectionProps {
  type: 'features' | 'services' | 'team' | 'faq' | 'blog'
  header: {
    title: string
    description?: string
    actions?: Array<{ label: string; href: string }>
  }
  content: ContentItem[]
  layout?: 'grid' | 'list' | 'masonry'
  filtering?: {
    enabled: boolean
    categories: string[]
    searchable: boolean
  }
  pagination?: 'loadMore' | 'pages' | 'infinite'
}
```

### Dashboard Layouts

Application interfaces that display data, controls, and user-specific content.

#### Dashboard Types
- **Analytics Dashboard** - Data visualization and metrics
- **User Dashboard** - Personal account and activity
- **Admin Dashboard** - System management controls
- **Project Dashboard** - Work-specific tools and status

#### Dashboard Components
- **Sidebar Navigation** - App section navigation
- **Main Content Area** - Primary workspace
- **Widget Grid** - Configurable information panels
- **Action Toolbar** - Context-specific tools
- **Status Indicators** - System health and notifications

#### Implementation
```tsx
interface DashboardProps {
  type?: 'analytics' | 'user' | 'admin' | 'project'
  sidebar: {
    navigation: NavigationItem[]
    collapsed?: boolean
    pinned?: boolean
  }
  widgets: Array<{
    id: string
    type: WidgetType
    position: { row: number; col: number }
    size: { width: number; height: number }
    config: WidgetConfig
  }>
  toolbar?: {
    title: string
    actions: ActionItem[]
  }
  notifications?: NotificationItem[]
}
```

### AI Interactive Sections

Specialized sections that demonstrate AI capabilities and enable AI-human interaction.

#### AI Section Types
- **AI Demo** - Interactive product demonstration
- **AI Explainer** - How-it-works educational content
- **AI Playground** - Hands-on AI experimentation
- **AI Results** - AI-generated content presentation

#### AI Components
- **Input Interface** - User prompts and parameters
- **Processing Indicator** - AI work-in-progress feedback
- **Results Display** - AI outputs with explanation
- **Confidence Metrics** - AI certainty indicators
- **Feedback Controls** - User correction and rating

#### Implementation
```tsx
interface AIInteractiveSectionProps {
  type: 'demo' | 'explainer' | 'playground' | 'results'
  interface: {
    inputType: 'text' | 'upload' | 'parameters'
    placeholder?: string
    examples?: string[]
  }
  processing: {
    showProgress: boolean
    estimatedTime?: number
    statusMessages?: string[]
  }
  results: {
    format: 'text' | 'image' | 'data' | 'code'
    explainable: boolean
    editable: boolean
    exportable: boolean
  }
  feedback: {
    ratings: boolean
    corrections: boolean
    suggestions: boolean
  }
}
```

## Responsive Design Patterns

### Breakpoint Behavior
- **Mobile (< 768px)** - Stack components, collapse navigation
- **Tablet (768px - 1024px)** - Hybrid layouts, selective hiding
- **Desktop (> 1024px)** - Full layouts, all features visible

### Layout Adaptation
```tsx
// Example responsive organism
<Container maxWidth="containerMaxWidth">
  <Grid
    columns={{ mobile: 1, tablet: 2, desktop: 3 }}
    gap="spacing.6"
  >
    {content.map(item => (
      <GridItem key={item.id}>
        <ContentCard {...item} />
      </GridItem>
    ))}
  </Grid>
</Container>
```

### Content Strategy
- **Progressive Enhancement** - Core content works everywhere
- **Selective Features** - Advanced features for capable devices
- **Performance Budget** - Optimize for mobile-first loading

## Accessibility Guidelines

### Landmark Roles
- Use proper ARIA landmarks (banner, main, navigation, contentinfo)
- Provide skip links for keyboard navigation
- Clear heading hierarchy throughout organisms

### Focus Management
- Manage focus for dynamic content changes
- Provide focus indicators for all interactive elements
- Handle focus trapping in modal-like organisms

### Screen Reader Support
- Announce dynamic content changes
- Provide context for complex interactions
- Use descriptive labels for all controls

### Keyboard Navigation
- All functionality accessible via keyboard
- Logical tab order through complex layouts
- Keyboard shortcuts for power users

## Performance Optimization

### Code Splitting
- Split organisms into separate bundles
- Load organisms on demand based on route/usage
- Share common dependencies between organisms

### Image Optimization
- Responsive images with appropriate sizes
- Lazy loading for below-the-fold content
- WebP format with fallbacks

### Data Loading
- Fetch organism data progressively
- Cache frequently accessed content
- Implement skeleton states during loading

### Bundle Analysis
```tsx
// Example lazy-loaded organism
const AIPlayground = lazy(() => 
  import('./AIPlayground').then(module => ({ 
    default: module.AIPlayground 
  }))
)

// Usage with suspense
<Suspense fallback={<AIPlaygroundSkeleton />}>
  <AIPlayground {...props} />
</Suspense>
```

## Testing Requirements

### Integration Testing
- Test organism behavior within page templates
- Verify proper data flow between molecules
- Check responsive behavior across breakpoints

### User Journey Testing
- Complete task flows through organisms
- Cross-browser compatibility testing
- Performance testing with realistic data

### Accessibility Testing
- Full keyboard navigation testing
- Screen reader compatibility across organisms
- Color contrast verification in all states

## State Management

### Local State
- Manage organism-specific state internally
- Use React hooks for simple state needs
- Implement error boundaries for robustness

### Global State
- Connect to app state for user data
- Handle authentication state appropriately
- Sync organism state with URL parameters

### API Integration
- Handle loading, success, and error states
- Implement retry logic for failed requests
- Cache responses to improve performance

## Contributing New Organisms

1. **User Story Analysis** - Define complete user task
2. **Molecule Composition** - Plan molecule and atom usage
3. **Content Strategy** - Design for varied content amounts
4. **Responsive Design** - Plan behavior across breakpoints
5. **Performance Testing** - Ensure acceptable loading times
6. **Accessibility Audit** - Complete accessibility review
7. **Documentation** - Update this README with full specification

Remember: Organisms should feel like complete, functional sections that users can accomplish meaningful tasks within. They represent the highest level of component complexity before becoming full templates or pages.