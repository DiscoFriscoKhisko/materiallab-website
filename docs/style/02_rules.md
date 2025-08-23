# Design System Rules
*Comprehensive guidelines for implementing the AI-Native Studio design system*

## Grid & Layout System

### Primary Grid
- **12-column grid** for primary layouts
- **Gutters**: 24px (`{spacing.6}`) between columns
- **Margins**: 32px (`{spacing.8}`) outer margins for grid container
- **Max Width**: 1200px (`{size.containerMaxWidth}`) for main content

### Responsive Breakpoints
```css
xs: 475px   /* Mobile small */
sm: 640px   /* Mobile large */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop small */
xl: 1280px  /* Desktop large */
2xl: 1536px /* Desktop extra large */
```

### Layout Patterns
- **Two-column**: Main content (8 cols) + Sidebar (4 cols) on desktop
- **Stack vertically** on screens < 768px with 24px gap
- **Single column**: Full width for mobile and focused content
- **Container variants**: Small (720px), Medium (960px), Large (1200px)

## Component Density

### Spacing Scale (4px Grid)
- **Micro**: 4px-8px - Icon padding, fine details
- **Small**: 12px-16px - Button padding, form fields
- **Medium**: 20px-24px - Card padding, section spacing
- **Large**: 32px-48px - Component separation
- **Extra Large**: 64px+ - Section breaks, hero spacing

### Touch Targets
- **Minimum**: 44x44px for all interactive elements
- **Preferred**: 48x48px for primary actions
- **Desktop**: Can be smaller (32px minimum) for non-touch interfaces

### Density Modes
- **Comfortable**: Default spacing as defined in tokens
- **Compact**: Reduce vertical spacing by 25% for data-heavy interfaces
- **Spacious**: Increase spacing by 50% for marketing/editorial content

## Elevation & Shadow Usage

### Shadow Hierarchy
- **sm**: Subtle hover states, form inputs
- **base**: Default cards, dropdowns
- **md**: Interactive cards, modals
- **lg**: Prominent CTAs, navigation
- **xl**: Overlays, important announcements
- **2xl**: Major modals, dialogs

### Elevation Rules
1. **Base level (0)**: Page background, flat surfaces
2. **Level 1 (sm-base)**: Content cards, form elements
3. **Level 2 (md-lg)**: Navigation, interactive elements
4. **Level 3 (xl-2xl)**: Overlays, modals, tooltips

### Focus States
- Use `{shadow.focus}` for light mode
- Use `{shadow.focusDark}` for dark mode
- Always include 3px outline for accessibility

## Motion & Animation Usage

### Duration Guidelines
- **Instant (0ms)**: Immediate feedback, toggles
- **Fast (150ms)**: Hover states, simple transitions
- **Normal (300ms)**: Standard UI transitions, page changes
- **Slow (500ms)**: Complex animations, loading states
- **Slower (800ms)**: Hero animations, emphasis

### Easing Patterns
- **easeOut**: Entering elements (feel snappy)
- **easeIn**: Exiting elements (feel natural)
- **easeInOut**: Continuous animations, loops
- **spring**: Playful interactions, attention-grabbing

### Motion Principles
1. **Respect `prefers-reduced-motion`** - Always provide static fallbacks
2. **Purposeful movement** - Animation should communicate state or guide attention
3. **Performance first** - Use transform and opacity for smooth animations
4. **Consistent timing** - Use token values, avoid arbitrary durations

## Iconography Style

### Icon System
- **Primary Library**: Phosphor Icons (recommended in brand guidelines)
- **Style**: Minimal line icons with consistent stroke weight
- **Stroke Weight**: 1.5px standard, 2px for emphasis
- **Corner Radius**: Subtle rounded corners matching overall design
- **Grid**: 24x24px base, scalable to 16px, 32px, 48px

### Usage Rules
- **AI Labeling**: Use consistent AI badge/icon for all AI-generated content
- **Color**: Inherit text color by default, use accent colors sparingly
- **Sizing**: Scale proportionally, maintain stroke weight relationship
- **Accessibility**: Include proper alt text and ARIA labels

### Custom Icons
When creating custom icons:
- Match stroke weight and corner radius of primary library
- Use same grid system (24x24px base)
- Test at multiple sizes for clarity
- Maintain conceptual consistency with brand philosophy

## Imagery Style

### Photography Guidelines
- **Focus**: Real people in genuine collaboration moments
- **Style**: Candid, authentic, human-centric
- **Color Treatment**: Natural colors, avoid heavy filtering
- **Composition**: Dynamic, showing human-AI interaction

### Abstract Imagery
- **Natural textures**: Organic, complex patterns (representing human creativity)
- **Geometric elements**: Structured, precise forms (representing technology)
- **Color Palette**: Use brand colors, avoid generic gradients
- **Balance**: Combine organic and structured elements

### Avoid List
❌ Sterile stock photos
❌ "Men in suits" corporate imagery
❌ White robots or anthropomorphic AI
❌ Descending green code/Matrix effects
❌ Glowing brains or heads
❌ "The Creation of Adam" variations

### AI-Generated Content Policy
**Permitted**:
- Image upscaling without content alteration
- Minor retouching (remove temporary objects)
- Background extension (non-descript areas only)
- De-noising for low-light photos

**Prohibited**:
- Photorealistic fabrications
- Altering physical appearance
- Copyright infringement
- Typography generation

## Content Rules

### Headings
- **H1**: Page titles, hero headlines - bold, impactful
- **H2**: Major section breaks - clear hierarchy
- **H3**: Subsections - balance prominence with readability
- **H4**: Component titles - subtle but distinct
- Use semantic HTML structure, style with design tokens

### Call-to-Action (CTA) Text
- **Primary CTAs**: Action-oriented verbs ("Start Building", "See Our Work")
- **Secondary CTAs**: Exploratory language ("Learn More", "Explore Demo")
- **Length**: 2-4 words maximum for buttons
- **Tone**: Confident but not pushy, benefit-focused

### Error & Status Messages
- **Error**: Clear, actionable, human language
  - ❌ "Invalid input detected"
  - ✅ "Please enter a valid email address"
- **Success**: Positive confirmation with next steps
- **Warning**: Preventive, helpful guidance
- **Info**: Educational, contextual assistance

### Microcopy Guidelines
- **Helpful**: Provide context and guidance
- **Concise**: Essential information only  
- **Human**: Conversational tone, avoid robotic language
- **Transparent**: Clear about AI involvement and capabilities

## Accessibility Standards

### WCAG Compliance
- **Target**: WCAG 2.1 Level AA minimum
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Focus Management**: Visible focus indicators on all interactive elements
- **Keyboard Navigation**: All functionality available via keyboard

### Color & Contrast
- **Text on Light Backgrounds**: Use `{color.semantic.light.text.primary}`
- **Text on Dark Backgrounds**: Use `{color.semantic.dark.text.primary}`
- **Interactive Elements**: Meet contrast requirements in both light/dark modes
- **Status Colors**: Ensure error, success, warning colors pass contrast tests

### Motion & Animation
- **Reduced Motion**: Provide static alternatives for all animations
- **Vestibular Considerations**: Avoid excessive rotation, parallax, zoom
- **Duration Limits**: Keep animations under 5 seconds
- **User Control**: Allow users to disable non-essential animations

### AI-Specific Accessibility
- **AI Labeling**: Clear identification of AI-generated content
- **Explainability**: Provide context for AI decisions and recommendations
- **Error Handling**: Graceful degradation when AI features fail
- **User Control**: Allow users to correct, edit, or dismiss AI outputs

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3)
- Include ARIA labels for complex interactions
- Provide alt text for all meaningful images
- Use semantic elements (nav, main, article, aside)

## Implementation Notes

### Design Token Usage
- Always reference tokens, never hard-code values
- Use semantic tokens (e.g., `color.semantic.light.background.primary`) over global tokens
- Follow naming conventions: `category-property-variant`

### Component Architecture
- **React Components**: PascalCase naming (e.g., `PrimaryButton`)
- **CSS Classes**: BEM methodology (e.g., `.card__title--featured`)
- **Props**: Consistent prop naming across similar components

### Theme Switching
- Support both light and dark modes
- Use semantic color tokens for automatic theme adaptation
- Test all components in both modes
- Respect user's system preference as default