# Atoms - Foundational UI Elements

Atoms are the basic building blocks of the MaterialLab design system. They are irreducible components that cannot be broken down further without losing their meaning and functionality.

## Atomic Design Principles

### **What Makes an Atom**
- **Single Responsibility**: Each atom serves one clear purpose
- **No Dependencies**: Atoms never import other custom components
- **Configurable**: Behavior is controlled entirely through props
- **Reusable**: Can be used across molecules and organisms
- **Theme-Aware**: Supports all theme variants automatically

### **What Atoms Cannot Do**
- Import molecules or organisms
- Manage application state
- Handle complex business logic
- Contain other custom components

## Current Atoms

### **Button** ✅
- **Location**: `src/components/UI/Button.tsx`
- **Purpose**: Interactive element for user actions
- **Variants**: primary, secondary, tertiary, destructive
- **States**: default, hover, focus, active, disabled, loading
- **Theme Support**: Full (all theme/mode combinations)

```tsx
// Usage Example
<Button variant="primary" size="large" loading={isSubmitting}>
  Submit Form
</Button>
```

### **Input** ✅  
- **Location**: `src/components/UI/Input.tsx`
- **Purpose**: Form input fields for data collection
- **Types**: text, email, password, textarea, select
- **States**: default, focus, error, disabled, readonly
- **Theme Support**: Full (all theme/mode combinations)

```tsx
// Usage Examples
<Input 
  type="email"
  placeholder="your@email.com"
  error="Please enter a valid email"
/>

<Textarea 
  placeholder="Enter your message..."
  rows={4}
/>

<Select options={countryOptions} placeholder="Select country" />
```

### **Typography Components** ✅
- **Location**: `src/components/ML/Typography.tsx`
- **Purpose**: Consistent text rendering and hierarchy
- **Components**: MLText, MLHeading, MLBody, MLCaption
- **Theme Support**: Partial (needs minor token updates)

```tsx
// Usage Examples
<MLHeading level={1} variant="display">
  Main Page Title
</MLHeading>

<MLBody size="large">
  This is body text with proper spacing and typography.
</MLBody>

<MLCaption>
  Small caption text for additional context
</MLCaption>
```

## Missing Atoms (To Be Created)

### **Icon** 🔄 (High Priority)
- **Purpose**: SVG icon rendering with consistent sizing
- **Variants**: Various icon types (arrow, check, mail, etc.)
- **States**: default, hover, active, disabled
- **Properties**: size, color, rotation, animation

```tsx
// Proposed API
<Icon name="arrow-right" size="md" color="primary" />
<Icon name="check" size="sm" animate="bounce" />
```

### **Avatar** 🔄 (Medium Priority)
- **Purpose**: User profile image display
- **Variants**: round, square, with badge
- **States**: loaded, loading, error fallback
- **Properties**: size, shape, alt text, fallback initials

```tsx
// Proposed API
<Avatar 
  src="/user-photo.jpg"
  alt="John Smith"
  size="lg"
  fallback="JS"
/>
```

### **Badge** 🔄 (Medium Priority)
- **Purpose**: Status indicators and labels
- **Variants**: filled, outlined, dot
- **States**: default, with icon, dismissible
- **Properties**: color, size, position (for overlays)

```tsx
// Proposed API
<Badge variant="filled" color="success">Active</Badge>
<Badge variant="dot" color="error" />
<Badge variant="outlined" dismissible onDismiss={handleDismiss}>
  New Feature
</Badge>
```

### **Spinner** 🔄 (Low Priority)
- **Purpose**: Loading state indication
- **Variants**: circular, dots, bars
- **Properties**: size, color, speed
- **Accessibility**: Proper ARIA labels

```tsx
// Proposed API
<Spinner size="md" color="primary" />
<Spinner variant="dots" />
```

### **Form Controls** 🔄 (Medium Priority)

#### **Checkbox**
```tsx
<Checkbox checked={isChecked} onChange={setIsChecked}>
  Accept terms and conditions
</Checkbox>
```

#### **Radio**
```tsx
<Radio 
  name="payment" 
  value="card" 
  checked={paymentMethod === 'card'}
  onChange={setPaymentMethod}
>
  Credit Card
</Radio>
```

#### **Switch**
```tsx
<Switch 
  checked={isDarkMode} 
  onChange={setIsDarkMode}
  label="Dark mode"
/>
```

#### **Slider**
```tsx
<Slider 
  min={0} 
  max={100} 
  value={volume} 
  onChange={setVolume}
  label="Volume"
/>
```

## Atom Creation Guidelines

### **File Structure**
```
src/components/atoms/
├── Button/
│   ├── Button.tsx
│   ├── Button.stories.tsx
│   ├── Button.test.tsx
│   └── index.ts
├── Input/
│   ├── Input.tsx
│   ├── Input.stories.tsx
│   ├── Input.test.tsx
│   └── index.ts
└── index.ts (exports all atoms)
```

### **Component Template**
```tsx
// src/components/atoms/NewAtom/NewAtom.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export interface NewAtomProps {
  /** Visual variant of the atom */
  variant?: 'primary' | 'secondary';
  
  /** Size of the atom */
  size?: 'sm' | 'md' | 'lg';
  
  /** Whether the atom is disabled */
  disabled?: boolean;
  
  /** Optional CSS class name */
  className?: string;
  
  /** Content or children */
  children?: React.ReactNode;
  
  /** Theme override (usually 'auto') */
  theme?: 'humanistic' | 'structured' | 'auto';
}

export const NewAtom: React.FC<NewAtomProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  theme = 'auto',
  ...props
}) => {
  const { theme: contextTheme } = useTheme();
  const resolvedTheme = theme === 'auto' ? contextTheme : theme;
  
  return (
    <StyledNewAtom
      $variant={variant}
      $size={size}
      $disabled={disabled}
      $theme={resolvedTheme}
      className={className}
      {...props}
    >
      {children}
    </StyledNewAtom>
  );
};

const StyledNewAtom = styled.div<{
  $variant: string;
  $size: string;
  $disabled: boolean;
  $theme: string;
}>`
  /* Base styles using design tokens */
  background-color: var(--color-surface-elevated);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  
  /* Size variants */
  ${props => props.$size === 'sm' && css`
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--text-sm);
  `}
  
  ${props => props.$size === 'md' && css`
    padding: var(--spacing-3) var(--spacing-4);
    font-size: var(--text-base);
  `}
  
  ${props => props.$size === 'lg' && css`
    padding: var(--spacing-4) var(--spacing-6);
    font-size: var(--text-lg);
  `}
  
  /* Variant styles */
  ${props => props.$variant === 'primary' && css`
    background-color: var(--color-interactive-primary);
    color: var(--color-text-on-interactive);
  `}
  
  /* Disabled state */
  ${props => props.$disabled && css`
    opacity: 0.6;
    pointer-events: none;
  `}
  
  /* Theme-specific overrides */
  ${props => props.$theme === 'humanistic' && css`
    border-radius: var(--radius-organic);
  `}
  
  ${props => props.$theme === 'structured' && css`
    border-radius: var(--radius-sharp);
  `}
  
  /* Motion */
  transition: all var(--motion-duration-fast) var(--motion-easing-standard);
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:hover:not(:disabled) {
      transform: none;
    }
  }
`;

// PropTypes for runtime validation in development
if (process.env.NODE_ENV === 'development') {
  NewAtom.propTypes = createAtomValidator('NewAtom');
}
```

### **Storybook Documentation**
```tsx
// src/components/atoms/NewAtom/NewAtom.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NewAtom } from './NewAtom';

const meta: Meta<typeof NewAtom> = {
  title: 'Atoms/NewAtom',
  component: NewAtom,
  parameters: {
    docs: {
      description: {
        component: 'Brief description of what this atom does and when to use it.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary']
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg']
    },
    theme: {
      control: 'select',
      options: ['auto', 'humanistic', 'structured']
    }
  }
};

export default meta;
type Story = StoryObj<typeof NewAtom>;

export const Default: Story = {
  args: {
    children: 'Default NewAtom'
  }
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      <NewAtom variant="primary">Primary Variant</NewAtom>
      <NewAtom variant="secondary">Secondary Variant</NewAtom>
    </div>
  )
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <NewAtom size="sm">Small</NewAtom>
      <NewAtom size="md">Medium</NewAtom>
      <NewAtom size="lg">Large</NewAtom>
    </div>
  )
};
```

### **Testing Template**
```tsx
// src/components/atoms/NewAtom/NewAtom.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewAtom } from './NewAtom';

describe('NewAtom', () => {
  test('renders with default props', () => {
    render(<NewAtom>Test content</NewAtom>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  test('applies variant styles correctly', () => {
    render(<NewAtom variant="primary">Primary</NewAtom>);
    const atom = screen.getByText('Primary');
    expect(atom).toHaveClass('variant-primary');
  });
  
  test('handles disabled state', () => {
    render(<NewAtom disabled>Disabled</NewAtom>);
    const atom = screen.getByText('Disabled');
    expect(atom).toBeDisabled();
  });
  
  test('supports theme variants', () => {
    render(<NewAtom theme="humanistic">Themed</NewAtom>);
    const atom = screen.getByText('Themed');
    expect(atom).toHaveAttribute('data-theme', 'humanistic');
  });
  
  test('meets accessibility requirements', () => {
    render(<NewAtom>Accessible</NewAtom>);
    const atom = screen.getByText('Accessible');
    
    // Add specific a11y tests based on component type
    expect(atom).toBeVisible();
    expect(atom).toHaveAttribute('role');
  });
});
```

## Quality Checklist

### **Before Creating an Atom**
- [ ] Is this truly irreducible? (Cannot be broken down further)
- [ ] Does it serve a single, clear purpose?
- [ ] Will it be reused across multiple molecules/organisms?
- [ ] Can it be configured entirely through props?

### **During Development**
- [ ] Uses only design tokens (no hardcoded values)
- [ ] Supports all theme variants
- [ ] Includes proper TypeScript interfaces
- [ ] Has comprehensive accessibility attributes
- [ ] Follows naming conventions (PascalCase, descriptive)
- [ ] Includes motion with reduced-motion support

### **Before Committing**
- [ ] Has Storybook documentation
- [ ] Includes unit tests with good coverage
- [ ] Passes accessibility audit
- [ ] Validates with all theme variants
- [ ] Performance tested (render time < 5ms)
- [ ] Exported in component index files

## Migration from Legacy Components

When converting existing components to atoms:

1. **Audit Current Usage**: Find all places the component is used
2. **Extract Common Patterns**: Identify reusable variants and states  
3. **Remove Dependencies**: Eliminate any imports of other custom components
4. **Apply Token System**: Replace hardcoded values with design tokens
5. **Add Theme Support**: Ensure works with all theme variants
6. **Update Tests**: Add comprehensive test coverage
7. **Create Documentation**: Add Storybook stories and usage examples
8. **Update Imports**: Change all usage locations to use new API

---

**Atoms Documentation Version:** 1.0.0  
**Last Updated:** January 2025  
**Total Atoms**: 3 implemented, 8 planned