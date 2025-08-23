# Molecules - Functional Component Groups

Molecules are purposeful combinations of atoms that work together to provide specific functionality. They represent the smallest meaningful interface elements that accomplish a complete user task.

## Molecular Design Principles

### **What Makes a Molecule**
- **Functional Unity**: Atoms work together for a specific purpose
- **Manageable Complexity**: More complex than atoms, simpler than organisms
- **Controlled Dependencies**: Only imports atoms and utility functions
- **State Management**: Can manage internal state related to its function
- **Reusable Logic**: Encapsulates common interaction patterns

### **What Molecules Cannot Do**
- Import organisms or other molecules (except in special cases)
- Handle application-level state management
- Make API calls or handle business logic
- Contain complete user workflows

## Current Molecules

### **MLCard** ⚠️ (Needs Refactoring)
- **Location**: `src/components/ML/Card.tsx`
- **Purpose**: Content container with consistent styling
- **Dependencies**: Button (atom), Typography (atom)
- **Issues**: Currently mixing with organism-level complexity
- **Migration**: Needs separation into Card molecule and CardGrid organism

```tsx
// Current Usage (needs updating)
<MLCard>
  <MLHeading>Card Title</MLHeading>
  <MLBody>Card content goes here</MLBody>
</MLCard>
```

## Missing Molecules (To Be Created)

### **FormField** 🔴 (High Priority)
- **Purpose**: Input with label, help text, and error handling
- **Dependencies**: Input (atom), Typography (atom), Icon (atom)
- **State**: value, error, validation status
- **Accessibility**: Proper labeling and ARIA attributes

```tsx
// Proposed API
<FormField
  label="Email Address"
  required
  error={errors.email}
  help="We'll never share your email"
>
  <Input 
    type="email"
    value={formData.email}
    onChange={handleEmailChange}
    placeholder="your@email.com"
  />
</FormField>
```

### **SearchBox** 🔴 (High Priority)
- **Purpose**: Search input with icon and clear functionality
- **Dependencies**: Input (atom), Icon (atom), Button (atom)
- **State**: query, suggestions, focus state
- **Features**: Auto-complete, keyboard navigation

```tsx
// Proposed API
<SearchBox
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search products..."
  suggestions={searchSuggestions}
  onSuggestionSelect={handleSuggestionSelect}
  onClear={clearSearch}
/>
```

### **NavItem** 🔴 (High Priority)
- **Purpose**: Individual navigation element with active states
- **Dependencies**: Button (atom), Icon (atom), Badge (atom)
- **State**: active, hover, focus, disabled
- **Features**: Active indicator, submenu support

```tsx
// Proposed API
<NavItem 
  href="/services"
  isActive={pathname === '/services'}
  hasSubmenu
  badge={unreadCount}
>
  Services
</NavItem>
```

### **MediaCard** 🟡 (Medium Priority)
- **Purpose**: Image/video with title and description overlay
- **Dependencies**: Typography (atom), Button (atom), Avatar (atom)
- **State**: loading, error, hover overlay
- **Features**: Lazy loading, aspect ratio control

```tsx
// Proposed API
<MediaCard
  src="/project-thumbnail.jpg"
  alt="Project preview"
  title="AI-Powered Analytics Dashboard"
  description="Real-time data visualization and insights"
  author="MaterialLab Team"
  href="/work/analytics-dashboard"
/>
```

### **StatusMessage** 🟡 (Medium Priority)
- **Purpose**: Icon with text for success/error/warning states
- **Dependencies**: Icon (atom), Typography (atom), Button (atom)
- **Variants**: success, error, warning, info
- **Features**: Auto-dismiss, action buttons

```tsx
// Proposed API
<StatusMessage
  variant="success"
  title="Message sent successfully!"
  description="We'll get back to you within 24 hours."
  action={<Button variant="tertiary">Dismiss</Button>}
  onDismiss={handleDismiss}
/>
```

### **ProgressBar** 🟡 (Medium Priority)
- **Purpose**: Progress indication with labels and steps
- **Dependencies**: Typography (atom)
- **State**: current progress, step labels
- **Features**: Animated transitions, step indicators

```tsx
// Proposed API
<ProgressBar
  value={75}
  max={100}
  label="Upload Progress"
  showPercentage
  steps={['Preparing', 'Uploading', 'Processing', 'Complete']}
  currentStep={2}
/>
```

### **TagList** 🟢 (Low Priority)
- **Purpose**: Collection of removable tags/chips
- **Dependencies**: Badge (atom), Button (atom), Icon (atom)
- **State**: tag list, editable mode
- **Features**: Add/remove tags, keyboard navigation

```tsx
// Proposed API
<TagList
  tags={['React', 'TypeScript', 'Design Systems']}
  editable
  onTagAdd={handleTagAdd}
  onTagRemove={handleTagRemove}
  maxTags={10}
/>
```

## Molecule Creation Guidelines

### **File Structure**
```
src/components/molecules/
├── FormField/
│   ├── FormField.tsx
│   ├── FormField.stories.tsx
│   ├── FormField.test.tsx
│   └── index.ts
├── SearchBox/
│   ├── SearchBox.tsx
│   ├── SearchBox.stories.tsx
│   ├── SearchBox.test.tsx
│   └── index.ts
└── index.ts (exports all molecules)
```

### **Component Template**
```tsx
// src/components/molecules/NewMolecule/NewMolecule.tsx
import React, { useState, useId } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Icon } from '../../atoms/Icon';

export interface NewMoleculeProps {
  /** Primary configuration prop */
  config?: string;
  
  /** State management props */
  value?: string;
  onChange?: (value: string) => void;
  
  /** Validation props */
  error?: string;
  required?: boolean;
  
  /** UI customization */
  disabled?: boolean;
  loading?: boolean;
  
  /** Accessibility */
  label?: string;
  'aria-describedby'?: string;
  
  /** Event handlers */
  onSubmit?: () => void;
  onCancel?: () => void;
}

export const NewMolecule: React.FC<NewMoleculeProps> = ({
  config,
  value = '',
  onChange,
  error,
  required = false,
  disabled = false,
  loading = false,
  label,
  onSubmit,
  onCancel,
  ...props
}) => {
  // Internal state management
  const [internalState, setInternalState] = useState('');
  const [isValid, setIsValid] = useState(true);
  
  // Accessibility IDs
  const fieldId = useId();
  const errorId = useId();
  const helpId = useId();
  
  // Event handlers
  const handleChange = (newValue: string) => {
    setInternalState(newValue);
    onChange?.(newValue);
    
    // Internal validation logic
    validateInput(newValue);
  };
  
  const validateInput = (input: string) => {
    // Molecule-specific validation logic
    const valid = input.length > 0;
    setIsValid(valid);
  };
  
  const handleSubmit = () => {
    if (isValid && !disabled && !loading) {
      onSubmit?.();
    }
  };
  
  return (
    <MoleculeContainer>
      {label && (
        <Label htmlFor={fieldId} $required={required}>
          {label}
        </Label>
      )}
      
      <InputContainer>
        <Input
          id={fieldId}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helpId}
          {...props}
        />
        
        <ActionButtons>
          {onCancel && (
            <Button 
              variant="tertiary" 
              size="sm"
              onClick={onCancel}
              disabled={loading}
            >
              <Icon name="x" size="sm" />
            </Button>
          )}
          
          {onSubmit && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              disabled={disabled || !isValid}
              loading={loading}
            >
              <Icon name="check" size="sm" />
            </Button>
          )}
        </ActionButtons>
      </InputContainer>
      
      {error && (
        <ErrorMessage id={errorId} role="alert">
          <Icon name="alert-circle" size="sm" color="error" />
          {error}
        </ErrorMessage>
      )}
    </MoleculeContainer>
  );
};

const MoleculeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
`;

const Label = styled.label<{ $required: boolean }>`
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  
  ${props => props.$required && css`
    &::after {
      content: ' *';
      color: var(--color-status-error);
    }
  `}
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  position: relative;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-1);
  flex-shrink: 0;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--color-status-error);
  font-size: var(--text-sm);
`;

// Development-time validation
if (process.env.NODE_ENV === 'development') {
  NewMolecule.propTypes = createMoleculeValidator('NewMolecule');
}
```

### **State Management Pattern**
```tsx
// Internal state for molecule-specific logic
const [internalValue, setInternalValue] = useState('');
const [isValid, setIsValid] = useState(true);
const [isFocused, setIsFocused] = useState(false);

// Props for external state communication  
interface MoleculeProps {
  value?: string;                    // External value
  onChange?: (value: string) => void; // External change handler
  onValidationChange?: (isValid: boolean) => void; // Validation state
}

// State synchronization
useEffect(() => {
  // Sync internal state with external props
  if (value !== undefined && value !== internalValue) {
    setInternalValue(value);
  }
}, [value, internalValue]);

useEffect(() => {
  // Report validation state changes
  onValidationChange?.(isValid);
}, [isValid, onValidationChange]);
```

### **Accessibility Pattern**
```tsx
// Generate unique IDs for accessibility
const fieldId = useId();
const errorId = useId();
const helpId = useId();
const descriptionId = useId();

// Proper ARIA relationships
<Input
  id={fieldId}
  aria-describedby={[
    error ? errorId : null,
    help ? helpId : null,
    description ? descriptionId : null
  ].filter(Boolean).join(' ')}
  aria-invalid={!!error}
  aria-required={required}
/>

{/* Associated help text */}
{help && (
  <div id={helpId} className="help-text">
    {help}
  </div>
)}

{/* Error message with alert role */}
{error && (
  <div id={errorId} role="alert" className="error-text">
    {error}
  </div>
)}
```

## Quality Checklist

### **Before Creating a Molecule**
- [ ] Combines 2+ atoms for specific functionality
- [ ] Represents a reusable interaction pattern
- [ ] Has clear, single purpose
- [ ] Cannot be further simplified without losing meaning

### **During Development**
- [ ] Uses only atoms and utility functions as dependencies
- [ ] Manages appropriate internal state only
- [ ] Provides clear external API via props
- [ ] Includes proper accessibility attributes
- [ ] Handles loading and error states
- [ ] Supports keyboard navigation

### **Before Committing**
- [ ] Has comprehensive Storybook documentation
- [ ] Includes unit tests with user interaction testing
- [ ] Passes accessibility audit with screen reader testing
- [ ] Performance tested (render time < 15ms)
- [ ] Works with all theme variants
- [ ] Proper TypeScript interfaces with JSDoc

## Molecule Testing Strategy

### **Unit Testing Focus**
```tsx
describe('FormField', () => {
  test('combines label and input correctly', () => {
    render(
      <FormField label="Email">
        <Input type="email" />
      </FormField>
    );
    
    const label = screen.getByLabelText('Email');
    const input = screen.getByRole('textbox');
    
    expect(label).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(label.getAttribute('for')).toBe(input.getAttribute('id'));
  });
  
  test('displays error state correctly', () => {
    render(
      <FormField label="Email" error="Invalid email">
        <Input type="email" />
      </FormField>
    );
    
    const errorMessage = screen.getByRole('alert');
    const input = screen.getByRole('textbox');
    
    expect(errorMessage).toHaveTextContent('Invalid email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining(errorMessage.id));
  });
  
  test('handles user interaction', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(
      <SearchBox value="" onChange={mockOnChange} />
    );
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'search query');
    
    expect(mockOnChange).toHaveBeenCalledWith('search query');
  });
});
```

### **Integration Testing**
```tsx
// Test molecule within organism context
test('FormField integrates correctly in ContactForm', () => {
  render(
    <ContactForm>
      <FormField label="Name">
        <Input />
      </FormField>
      <FormField label="Email" error="Required">
        <Input type="email" />
      </FormField>
    </ContactForm>
  );
  
  // Test form submission behavior
  // Test validation flow
  // Test accessibility in context
});
```

## Migration from Legacy Components

### **Converting Component to Molecule**

1. **Identify Atomic Dependencies**
   - Extract any hardcoded UI elements into atoms
   - Replace complex nested components with atom compositions

2. **Separate Concerns**
   - Keep molecule-specific logic (validation, formatting)
   - Move business logic to organisms
   - Extract reusable logic to custom hooks

3. **Update API**
   - Design props for external state management
   - Add proper TypeScript interfaces
   - Include accessibility props

4. **Add State Management**
   - Internal state for UI interactions
   - Props for external communication
   - Validation and error handling

**Example Migration**:
```tsx
// Before: Mixed component with hardcoded elements
const OldContactField = ({ label, type, value, onChange, error }) => {
  return (
    <div>
      <label style={{ color: '#666' }}>{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange}
        style={{ 
          border: error ? '1px solid red' : '1px solid #ccc',
          padding: '8px',
          borderRadius: '4px'
        }}
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
};

// After: Proper molecule using atoms
const FormField = ({ label, error, required, children }) => {
  const fieldId = useId();
  const errorId = useId();
  
  return (
    <FieldContainer>
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      {React.cloneElement(children, { 
        id: fieldId,
        'aria-invalid': !!error,
        'aria-describedby': error ? errorId : undefined
      })}
      {error && (
        <ErrorText id={errorId} role="alert">
          <Icon name="alert" size="sm" />
          {error}
        </ErrorText>
      )}
    </FieldContainer>
  );
};
```

---

**Molecules Documentation Version:** 1.0.0  
**Last Updated:** January 2025  
**Total Molecules**: 1 current (needs refactoring), 7 planned