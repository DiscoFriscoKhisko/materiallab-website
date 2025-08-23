# Code Anti-Slop Playbook

*Comprehensive guide for generating high-quality, maintainable code that embodies MaterialLab's meticulous standards while avoiding common AI code generation pitfalls*

## Overview

Code slop manifests as functional but non-optimal code with poor documentation, security gaps, and maintenance challenges. This playbook provides specific techniques for generating code that is secure, well-documented, performant, and aligned with MaterialLab's quality standards.

## Code Slop Identification

### Common AI Code Generation Issues

#### **Functional but Non-Optimal Patterns**
❌ **Code Slop Indicators**:
- Works in isolation but fails in system context
- Missing error handling and edge case coverage
- No consideration for security vulnerabilities
- Poor or non-existent documentation
- Hardcoded values instead of configuration
- No unit tests or validation
- Performance issues under load
- Inconsistent code style and patterns

✅ **MaterialLab Code Standards**:
- Integrates seamlessly with existing codebase
- Comprehensive error handling and logging
- Security-first development approach
- Clear documentation and usage examples
- Configurable and environment-aware
- Test-driven development practices
- Performance-optimized implementation
- Consistent with team coding standards

#### **Documentation Anti-Patterns**
❌ **Poor Documentation Examples**:
```typescript
// Bad: Vague or missing documentation
function processData(data: any): any {
  // Process the data
  return result;
}

// Bad: States obvious without explaining why
/**
 * This function adds two numbers
 */
function add(a: number, b: number): number {
  return a + b;
}
```

✅ **MaterialLab Documentation Standards**:
```typescript
/**
 * Analyzes project timeline data to identify potential risks and optimization opportunities.
 * 
 * This function combines historical team velocity data with project requirements to:
 * 1. Identify potential timeline conflicts
 * 2. Suggest realistic delivery dates based on capacity
 * 3. Flag dependencies that could impact delivery
 * 
 * @param projectData - Project requirements and constraints
 * @param teamMetrics - Historical velocity and capacity data from last 6 sprints
 * @param confidenceThreshold - Minimum confidence level for recommendations (0-1, default: 0.8)
 * @returns Analysis results with recommendations and confidence scores
 * 
 * @example
 * ```typescript
 * const analysis = await analyzeProjectTimeline(
 *   { scope: 47, complexity: 'medium', deadline: '2025-03-01' },
 *   { avgVelocity: 23, teamSize: 5, availability: 0.85 },
 *   0.8
 * );
 * 
 * if (analysis.confidence > 0.8) {
 *   console.log(`Recommended timeline: ${analysis.suggestedTimeline}`);
 * }
 * ```
 * 
 * @throws {ValidationError} When projectData is missing required fields
 * @throws {DataError} When teamMetrics contains invalid historical data
 */
async function analyzeProjectTimeline(
  projectData: ProjectRequirements,
  teamMetrics: TeamVelocityData, 
  confidenceThreshold: number = 0.8
): Promise<TimelineAnalysis> {
  // Implementation with proper error handling
}
```

## MaterialLab Code Architecture

### Code Generation Prompt Framework

#### **Comprehensive Code Prompt Template**
```typescript
interface CodeGenerationPrompt {
  persona: "Senior MaterialLab developer with expertise in [specific domain], focused on quality, security, and maintainability"
  
  context: {
    codebase_integration: {
      existing_patterns: string // Current architecture and conventions
      dependencies: string[] // Available libraries and frameworks  
      constraints: string[] // Technical and business limitations
    }
    
    atomic_design_level: "atom" | "molecule" | "organism"
    design_system_compliance: {
      token_usage: "mandatory" // Must use design tokens only
      component_hierarchy: string // Proper atomic relationships
      accessibility_requirements: "WCAG 2.1 AA minimum"
    }
  }
  
  functional_requirements: {
    primary_objective: string // What the code should accomplish
    user_interactions: string[] // How users will interact with it
    data_flow: string // Input/output and state management
    performance_requirements: string // Speed and efficiency needs
  }
  
  non_functional_requirements: {
    security: {
      input_validation: "Sanitize all user inputs"
      vulnerability_prevention: string[] // Specific security measures
      authentication_integration: string // How it integrates with auth
    }
    
    performance: {
      optimization_targets: string // Specific performance goals
      caching_strategy: string // How to handle data caching
      bundle_impact: "minimal" // Keep bundle size small
    }
    
    maintainability: {
      documentation_level: "comprehensive" // JSDoc + usage examples
      testing_requirements: "unit + integration tests"
      error_handling: "graceful degradation with logging"
    }
    
    accessibility: {
      keyboard_navigation: "full support required"
      screen_reader_compatibility: "semantic HTML + ARIA"
      focus_management: "proper focus states and flow"
    }
  }
  
  output_specifications: {
    code_structure: "TypeScript React component with styled-components"
    documentation: "JSDoc comments + README section + usage examples"
    testing: "Jest unit tests + React Testing Library integration tests"
    security_review: "Explain potential vulnerabilities and mitigations"
  }
  
  quality_gates: {
    design_system_compliance: "Only use MaterialLab design tokens"
    atomic_design_adherence: "Follow component hierarchy rules"  
    security_validation: "No SQL injection, XSS, or other common vulnerabilities"
    performance_verification: "Optimize for Core Web Vitals"
    accessibility_confirmation: "Screen reader and keyboard accessible"
  }
}
```

### Security-First Development

#### **Security Validation Framework**
```typescript
interface SecurityRequirements {
  input_validation: {
    sanitization: "All user inputs must be sanitized before processing"
    type_checking: "Strong TypeScript typing with runtime validation"
    length_limits: "Enforce reasonable input length constraints"
    format_validation: "Validate against expected patterns (email, URL, etc.)"
  }
  
  vulnerability_prevention: {
    sql_injection: "Use parameterized queries or ORM methods only"
    xss_prevention: "Escape all user content, use Content Security Policy"
    csrf_protection: "Include CSRF tokens for state-changing operations"
    authentication_bypass: "Verify user permissions for all protected actions"
  }
  
  data_protection: {
    sensitive_data_handling: "Never log or expose sensitive information"
    encryption_requirements: "Encrypt data at rest and in transit"
    access_control: "Implement principle of least privilege"
    audit_logging: "Log security-relevant events for monitoring"
  }
}
```

#### **Security Code Example**

**❌ Security-Vulnerable Code**:
```typescript
// Dangerous: SQL injection vulnerability
async function getUser(userId: string) {
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  return await db.query(query);
}

// Dangerous: XSS vulnerability
function displayMessage(message: string) {
  document.getElementById('output').innerHTML = message;
}

// Dangerous: No input validation
function updateProfile(data: any) {
  return api.post('/profile', data);
}
```

✅ **MaterialLab Secure Code**:
```typescript
/**
 * Retrieves user data with proper security controls and validation.
 * 
 * @param userId - User identifier (must be valid UUID format)
 * @param requestingUser - User making the request (for authorization)
 * @returns Promise resolving to user data or null if not authorized
 * 
 * Security measures implemented:
 * - SQL injection prevention via parameterized queries
 * - Authorization check ensures users can only access allowed data
 * - Input validation prevents malformed UUID attacks
 * - Audit logging for security monitoring
 * 
 * @throws {ValidationError} When userId format is invalid
 * @throws {AuthorizationError} When user lacks permission to access data
 */
async function getUser(
  userId: string, 
  requestingUser: AuthenticatedUser
): Promise<UserProfile | null> {
  // Input validation with specific error messages
  if (!isValidUUID(userId)) {
    logger.warn('Invalid UUID format attempted', { 
      userId: sanitizeForLogs(userId),
      requestingUserId: requestingUser.id 
    });
    throw new ValidationError('User ID must be a valid UUID format');
  }
  
  // Authorization check before database query
  if (!canAccessUser(requestingUser, userId)) {
    logger.warn('Unauthorized user access attempt', {
      requestingUserId: requestingUser.id,
      targetUserId: userId
    });
    throw new AuthorizationError('Insufficient permissions to access user data');
  }
  
  try {
    // Parameterized query prevents SQL injection
    const result = await db.query(
      'SELECT id, name, email, role FROM users WHERE id = $1 AND active = true',
      [userId]
    );
    
    // Audit successful access
    logger.info('User data accessed', {
      requestingUserId: requestingUser.id,
      accessedUserId: userId
    });
    
    return result.rows[0] || null;
    
  } catch (error) {
    logger.error('Database error during user retrieval', {
      error: error.message,
      requestingUserId: requestingUser.id,
      targetUserId: userId
    });
    throw new DatabaseError('Unable to retrieve user data');
  }
}

/**
 * Safely displays user-generated content with XSS prevention.
 * 
 * @param message - User message to display (will be sanitized)
 * @param container - DOM element to update (must exist)
 */
function displayMessage(message: string, container: HTMLElement): void {
  // XSS prevention through text content (not innerHTML)
  container.textContent = sanitizeUserInput(message);
  
  // Additional security: CSP-compliant styling
  container.className = 'user-message'; // Use CSS classes, not inline styles
}

/**
 * Updates user profile with comprehensive validation and security checks.
 */
async function updateProfile(
  profileData: Partial<UserProfile>,
  currentUser: AuthenticatedUser
): Promise<UpdateResult> {
  // Input validation schema
  const validationResult = validateProfileUpdate(profileData);
  if (!validationResult.isValid) {
    throw new ValidationError(
      'Profile data validation failed',
      validationResult.errors
    );
  }
  
  // Authorization check
  if (profileData.id !== currentUser.id && !currentUser.isAdmin) {
    throw new AuthorizationError('Can only update own profile');
  }
  
  // Sanitize and prepare data
  const sanitizedData = {
    ...profileData,
    email: sanitizeEmail(profileData.email),
    name: sanitizeTextInput(profileData.name),
    updatedAt: new Date().toISOString(),
    updatedBy: currentUser.id
  };
  
  return await api.post('/profile', sanitizedData, {
    headers: {
      'Authorization': `Bearer ${currentUser.token}`,
      'X-CSRF-Token': await getCSRFToken()
    }
  });
}
```

## Component Development Anti-Slop

### Atomic Design Compliance

#### **Component Generation Framework**
```typescript
interface ComponentGenerationGuidelines {
  atomic_level_rules: {
    atoms: {
      dependencies: "Only utility functions and other atoms"
      state_management: "Props-based configuration only"
      styling: "Design tokens exclusively, no hardcoded values"
      examples: "Button, Input, Typography, Icon"
    }
    
    molecules: {
      dependencies: "Atoms and utility functions only"
      state_management: "Internal state for UI logic, props for external data"
      styling: "Design tokens + contextual styling patterns"
      examples: "FormField, SearchBox, NavItem, MediaCard"
    }
    
    organisms: {
      dependencies: "Atoms, molecules, and business logic hooks"
      state_management: "Complex state management, API integration"
      styling: "Responsive layouts with theme support"
      examples: "ContactForm, Navigation, Dashboard, DataTable"
    }
  }
  
  quality_requirements: {
    type_safety: "Comprehensive TypeScript interfaces with JSDoc"
    error_boundaries: "Graceful error handling with fallback UI"
    loading_states: "Proper loading and skeleton states"
    accessibility: "Full keyboard navigation and screen reader support"
    testing: "Unit tests + integration tests + visual regression tests"
    performance: "React.memo optimization where appropriate"
  }
}
```

#### **Atom Component Template**
```typescript
/**
 * MaterialLab Button - Primary interactive element for user actions
 * 
 * Atomic Design Level: Atom
 * Dependencies: None (design tokens only)
 * 
 * This button component provides consistent interactive styling across all MaterialLab
 * interfaces while maintaining accessibility and theme support.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Button variant="primary" onClick={handleClick}>
 *   Submit Form
 * </Button>
 * 
 * // With loading state
 * <Button variant="secondary" loading={isSubmitting}>
 *   Processing...
 * </Button>
 * 
 * // Accessibility example
 * <Button
 *   variant="primary"
 *   aria-describedby="help-text"
 *   disabled={!isValid}
 * >
 *   Continue
 * </Button>
 * ```
 */
import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { magneticButton } from '@/styles/motion';

export interface ButtonProps {
  /** Visual variant affecting color and prominence */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  
  /** Size affecting padding, font size, and touch targets */
  size?: 'sm' | 'md' | 'lg';
  
  /** Whether button is currently disabled */
  disabled?: boolean;
  
  /** Whether to show loading spinner and disable interaction */
  loading?: boolean;
  
  /** Button content */
  children: React.ReactNode;
  
  /** Click handler function */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Button type for form submission */
  type?: 'button' | 'submit' | 'reset';
  
  /** Optional CSS class name */
  className?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
  
  /** ARIA description reference */
  'aria-describedby'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md', 
  disabled = false,
  loading = false,
  children,
  onClick,
  type = 'button',
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...restProps
}) => {
  const isInteractionDisabled = disabled || loading;
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isInteractionDisabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Enhanced keyboard support
    if (event.key === ' ' || event.key === 'Enter') {
      if (!isInteractionDisabled) {
        // Prevent form submission on space key
        if (event.key === ' ' && type !== 'submit') {
          event.preventDefault();
        }
        onClick?.(event as any);
      }
    }
  };
  
  return (
    <StyledButton
      as={motion.button}
      variants={magneticButton}
      initial="initial"
      whileHover={!isInteractionDisabled ? "hover" : "initial"}
      whileTap={!isInteractionDisabled ? "tap" : "initial"}
      $variant={variant}
      $size={size}
      $disabled={isInteractionDisabled}
      disabled={isInteractionDisabled}
      type={type}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={className}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={isInteractionDisabled}
      {...restProps}
    >
      {loading && (
        <LoadingSpinner 
          size={size} 
          aria-hidden="true"
          data-testid="button-loading-spinner"
        />
      )}
      
      <ButtonContent $loading={loading}>
        {children}
      </ButtonContent>
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $variant: string;
  $size: string; 
  $disabled: boolean;
}>`
  /* Reset default button styles */
  border: none;
  outline: none;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  
  /* Base styling using design tokens */
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: all var(--motion-duration-fast) var(--motion-easing-standard);
  
  /* Size variants */
  ${props => props.$size === 'sm' && css`
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--text-sm);
    min-height: 36px; /* Touch target minimum */
  `}
  
  ${props => props.$size === 'md' && css`
    padding: var(--spacing-3) var(--spacing-6);
    font-size: var(--text-base);
    min-height: 44px;
  `}
  
  ${props => props.$size === 'lg' && css`
    padding: var(--spacing-4) var(--spacing-8);
    font-size: var(--text-lg);
    min-height: 52px;
  `}
  
  /* Variant styling */
  ${props => props.$variant === 'primary' && css`
    background-color: var(--color-interactive-primary);
    color: var(--color-text-on-interactive);
    border: 2px solid var(--color-interactive-primary);
    
    &:focus-visible {
      box-shadow: var(--shadow-focus-ring);
      outline: 2px solid var(--color-focus-ring);
      outline-offset: 2px;
    }
  `}
  
  ${props => props.$variant === 'secondary' && css`
    background-color: transparent;
    color: var(--color-interactive-primary);
    border: 2px solid var(--color-interactive-primary);
    
    &:hover:not(:disabled) {
      background-color: var(--color-interactive-primary);
      color: var(--color-text-on-interactive);
    }
  `}
  
  /* Disabled state */
  ${props => props.$disabled && css`
    opacity: 0.6;
    
    /* Ensure disabled state is clearly communicated */
    &:hover {
      transform: none;
      box-shadow: none;
    }
  `}
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    border-width: 3px;
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:hover {
      transform: none;
    }
  }
`;

const LoadingSpinner = styled.div<{ size: string }>`
  /* Spinner implementation using design tokens */
  width: ${props => props.size === 'sm' ? '16px' : props.size === 'lg' ? '24px' : '20px'};
  height: ${props => props.size === 'sm' ? '16px' : props.size === 'lg' ? '24px' : '20px'};
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: var(--spacing-2);
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ButtonContent = styled.span<{ $loading: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$loading ? 0.7 : 1};
  transition: opacity var(--motion-duration-fast) var(--motion-easing-standard);
`;

// Development-time prop validation
if (process.env.NODE_ENV === 'development') {
  Button.displayName = 'Button';
  
  // Runtime validation for atomic design compliance
  Button.propTypes = createAtomValidator('Button');
}

export default Button;
```

### Testing Anti-Slop

#### **Comprehensive Testing Framework**
```typescript
interface TestingStandards {
  unit_testing: {
    coverage_requirement: "80% minimum, 90% target"
    test_categories: [
      "Component rendering with all prop combinations",
      "User interaction handling (click, keyboard, focus)",
      "Accessibility compliance (ARIA, keyboard navigation)",
      "Error state handling and recovery",
      "Loading and async state management"
    ]
  }
  
  integration_testing: {
    user_workflow_testing: "Complete user journeys through features"
    api_integration: "Real API calls with proper error handling"
    cross_component_interaction: "How components work together"
    accessibility_integration: "Screen reader and keyboard navigation flows"
  }
  
  visual_regression_testing: {
    theme_variants: "Test all components in light/dark themes"
    responsive_breakpoints: "Mobile, tablet, desktop layouts"
    state_variations: "Default, hover, focus, disabled, loading states"
    browser_compatibility: "Cross-browser visual consistency"
  }
}
```

#### **Testing Example**
```typescript
// Button.test.tsx - Comprehensive testing approach
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';
import { ThemeProvider } from '@/contexts/ThemeContext';

expect.extend(toHaveNoViolations);

describe('Button Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
      expect(button).not.toBeDisabled();
    });
    
    it('renders all size variants correctly', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      
      sizes.forEach(size => {
        const { rerender } = render(<Button size={size}>Test</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`size-${size}`);
        
        // Verify minimum touch targets for accessibility
        const styles = getComputedStyle(button);
        const minHeight = parseInt(styles.minHeight);
        expect(minHeight).toBeGreaterThanOrEqual(36); // WCAG touch target minimum
        
        rerender(<></>); // Clear for next iteration
      });
    });
  });
  
  // Interaction testing
  describe('User Interactions', () => {
    it('handles click events correctly', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'click',
          target: expect.any(Element)
        })
      );
    });
    
    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Keyboard accessible</Button>);
      
      const button = screen.getByRole('button');
      
      // Test tab navigation
      await user.tab();
      expect(button).toHaveFocus();
      
      // Test Enter key activation
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Test Space key activation
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
    
    it('prevents interaction when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      const button = screen.getByRole('button');
      
      // Should not be clickable
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
      
      // Should not be keyboard accessible
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toBeDisabled();
    });
  });
  
  // Loading state testing
  describe('Loading States', () => {
    it('shows loading spinner and disables interaction', () => {
      const handleClick = jest.fn();
      
      render(<Button loading onClick={handleClick}>Loading</Button>);
      
      const button = screen.getByRole('button');
      const spinner = screen.getByTestId('button-loading-spinner');
      
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
    });
  });
  
  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility standards', async () => {
      const { container } = render(
        <div>
          <Button>Standard button</Button>
          <Button variant="secondary">Secondary button</Button>
          <Button disabled>Disabled button</Button>
          <Button loading>Loading button</Button>
        </div>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    
    it('supports ARIA attributes correctly', () => {
      render(
        <Button 
          aria-label="Custom label"
          aria-describedby="help-text"
        >
          Button with ARIA
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
      expect(button).toHaveAttribute('aria-describedby', 'help-text');
    });
    
    it('maintains focus visibility', () => {
      render(<Button>Focus test</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      // Check focus styles are applied
      expect(button).toHaveFocus();
      
      // In real browsers, this would test visible focus ring
      // Here we verify the focus-visible selector would apply
      expect(button).toHaveStyleRule('outline', expect.any(String), {
        modifier: ':focus-visible'
      });
    });
  });
  
  // Theme testing
  describe('Theme Support', () => {
    const themes = [
      'humanistic-light',
      'humanistic-dark',
      'structured-light', 
      'structured-dark'
    ];
    
    themes.forEach(theme => {
      it(`renders correctly with ${theme} theme`, () => {
        render(
          <div data-theme={theme}>
            <Button variant="primary">Themed button</Button>
          </div>
        );
        
        const button = screen.getByRole('button');
        
        // Verify theme-specific styling is applied
        const styles = getComputedStyle(button);
        
        // Check that CSS custom properties are being used
        expect(styles.backgroundColor).not.toBe('');
        expect(styles.color).not.toBe('');
        
        // Verify contrast ratios meet accessibility standards
        // (In real implementation, this would use a contrast checking library)
        expect(parseFloat(styles.opacity)).toBeGreaterThan(0);
      });
    });
  });
  
  // Error boundary testing
  describe('Error Handling', () => {
    it('gracefully handles render errors', () => {
      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      const ThrowError = () => {
        throw new Error('Test error');
      };
      
      // This would test error boundary behavior in parent component
      expect(() => {
        render(<Button><ThrowError /></Button>);
      }).toThrow('Test error');
      
      consoleSpy.mockRestore();
    });
  });
  
  // Performance testing
  describe('Performance', () => {
    it('does not cause unnecessary re-renders', () => {
      const renderSpy = jest.fn();
      
      const TestButton = React.memo(() => {
        renderSpy();
        return <Button>Memo test</Button>;
      });
      
      const { rerender } = render(<TestButton />);
      expect(renderSpy).toHaveBeenCalledTimes(1);
      
      // Re-render with same props should not cause re-render
      rerender(<TestButton />);
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });
  });
});
```

## Performance Optimization Anti-Slop

### Bundle Size Management

#### **Performance Budget Framework**
```typescript
interface PerformanceBudgets {
  bundle_size_limits: {
    atoms: "< 5KB gzipped per component"
    molecules: "< 15KB gzipped per component"  
    organisms: "< 50KB gzipped per component"
    total_component_library: "< 200KB gzipped"
  }
  
  runtime_performance: {
    component_mount_time: "< 16ms (60fps budget)"
    re_render_time: "< 5ms for atoms, < 10ms for molecules"
    memory_usage: "No memory leaks, proper cleanup"
    network_requests: "Minimize API calls, implement caching"
  }
  
  core_web_vitals: {
    largest_contentful_paint: "< 2.5s"
    cumulative_layout_shift: "< 0.1" 
    first_input_delay: "< 100ms"
    interaction_to_next_paint: "< 200ms"
  }
}
```

#### **Code Splitting and Lazy Loading**
```typescript
// Optimal lazy loading pattern for organisms
const LazyContactForm = React.lazy(() => 
  import('./ContactForm').then(module => ({
    default: module.ContactForm
  }))
);

// Usage with proper loading fallback
const ContactFormWithSuspense: React.FC = (props) => (
  <Suspense 
    fallback={
      <ContactFormSkeleton 
        aria-label="Loading contact form"
        data-testid="contact-form-loading"
      />
    }
  >
    <LazyContactForm {...props} />
  </Suspense>
);

// Preload strategy for predictable navigation
const preloadContactForm = () => {
  import('./ContactForm');
};

// Trigger preload on route hover or focus
<NavLink 
  to="/contact"
  onMouseEnter={preloadContactForm}
  onFocus={preloadContactForm}
>
  Contact Us
</NavLink>
```

### Memory Management

#### **Resource Cleanup Patterns**
```typescript
/**
 * Custom hook for managing subscriptions and cleanup
 * Prevents memory leaks in components with external subscriptions
 */
function useCleanupEffect(
  effect: () => () => void,
  deps?: React.DependencyList
) {
  React.useEffect(() => {
    const cleanup = effect();
    
    return () => {
      try {
        cleanup();
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    };
  }, deps);
}

/**
 * Example organism with proper resource management
 */
const DataDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const abortControllerRef = useRef<AbortController>();
  
  // Cleanup pattern for API requests
  useCleanupEffect(() => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    fetchDashboardData(abortController.signal)
      .then(setData)
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Dashboard data fetch failed:', error);
        }
      })
      .finally(() => setIsLoading(false));
    
    return () => {
      abortController.abort();
    };
  }, []);
  
  // Cleanup WebSocket connections
  useCleanupEffect(() => {
    const websocket = new WebSocket(REALTIME_ENDPOINT);
    
    websocket.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setData(prevData => ({
        ...prevData,
        ...update
      }));
    };
    
    return () => {
      websocket.close();
    };
  }, []);
  
  return (
    <DashboardContainer>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <DashboardContent data={data} />
      )}
    </DashboardContainer>
  );
};
```

## Quality Gates and Validation

### Automated Code Quality Checks

#### **Pre-commit Validation Pipeline**
```typescript
interface CodeQualityGates {
  static_analysis: {
    typescript_compilation: "Zero compilation errors required"
    eslint_validation: "All rules must pass, no warnings in production code"
    prettier_formatting: "Consistent code formatting enforced"
    dependency_audit: "No known security vulnerabilities in dependencies"
  }
  
  security_analysis: {
    vulnerability_scan: "No high or critical security issues"
    secret_detection: "No hardcoded secrets or API keys"
    dependency_check: "All dependencies from trusted sources"
    input_validation_audit: "All user inputs properly sanitized"
  }
  
  performance_analysis: {
    bundle_size_check: "Within defined performance budgets"
    unused_code_detection: "No dead code or unused imports"
    optimization_verification: "Proper React.memo and useCallback usage"
  }
  
  accessibility_analysis: {
    automated_a11y_testing: "All components pass axe accessibility tests"
    color_contrast_validation: "4.5:1 minimum contrast ratio maintained"
    keyboard_navigation_check: "All interactive elements keyboard accessible"
  }
}
```

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Next Review**: February 2025

This playbook ensures all MaterialLab code maintains our meticulous quality standards while avoiding the common pitfalls of AI-generated code, always prioritizing security, maintainability, and user experience.