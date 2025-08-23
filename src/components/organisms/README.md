# Organisms - Complete Functional Sections

Organisms are complex UI components that combine atoms and molecules to form complete, functional sections of an interface. They represent full user workflows and can manage application-level state and business logic.

## Organism Design Principles

### **What Makes an Organism**
- **Complete Functionality**: Accomplishes full user tasks or workflows
- **Business Logic Integration**: Handles API calls, data fetching, and state management
- **Responsive Design**: Adapts to different screen sizes and contexts
- **Composition Root**: Combines multiple molecules and atoms
- **Application Aware**: Understands business context and user flows

### **What Organisms Can Do**
- Import and compose atoms and molecules
- Manage complex application state
- Handle API calls and data fetching
- Implement complete user workflows
- Coordinate between multiple molecules
- Handle error boundaries and loading states

## Current Organisms

### **Navigation** ⚠️ (Needs Refactoring)
- **Location**: `src/components/Navigation/Navigation.tsx`
- **Purpose**: Site-wide navigation with menu management
- **Dependencies**: Should use NavItem molecules, Button atoms
- **Issues**: Mixed Veo/ML styles, lacks molecular breakdown
- **Current Status**: Partially compliant, needs atomic restructuring

```tsx
// Current Usage (will be updated)
<Navigation 
  currentPath={pathname}
  onMenuToggle={handleMenuToggle}
  menuOpen={isMenuOpen}
/>
```

### **VeoHero** ⚠️ (Needs Integration)
- **Location**: `src/components/VeoHero.tsx`
- **Purpose**: Hero section with video background and CTAs
- **Dependencies**: Button atoms, Typography atoms
- **Issues**: Standalone component, needs design system integration
- **Current Status**: Partially compliant, needs theme support

```tsx
// Current Usage
<VeoHero 
  title="AI-Powered Product Studio"
  subtitle="Transform ideas into intelligent experiences"
  primaryCTA="Get Started"
  secondaryCTA="Watch Demo"
/>
```

### **ContactForm** ❌ (Requires Full Migration)
- **Location**: `src/components/ContactForm/ContactForm.tsx`
- **Purpose**: Complete contact form with validation and submission
- **Dependencies**: Should use FormField molecules, Button atoms
- **Issues**: Legacy implementation, no design tokens, poor accessibility
- **Current Status**: Non-compliant, high priority for migration

```tsx
// Target API (after migration)
<ContactForm
  onSubmit={handleFormSubmission}
  initialValues={formDefaults}
  validationRules={contactValidationRules}
  submitButtonText="Send Message"
  loading={isSubmitting}
/>
```

## Missing Organisms (To Be Created)

### **Header** 🔴 (High Priority)
- **Purpose**: Site header with navigation and user actions
- **Dependencies**: Navigation, Button atoms, Logo, ThemeToggle
- **Features**: Responsive menu, search, user account dropdown
- **Responsive**: Mobile hamburger menu, desktop horizontal layout

```tsx
// Proposed API
<Header
  logo={<Logo />}
  navigation={navigationItems}
  currentPath={pathname}
  user={currentUser}
  onSearch={handleSearch}
  onMenuToggle={handleMenuToggle}
  showThemeToggle
/>
```

### **Footer** 🟡 (Medium Priority)
- **Purpose**: Site footer with links, contact info, and legal
- **Dependencies**: NavItem molecules, Typography atoms, Button atoms
- **Features**: Multi-column layout, social links, newsletter signup
- **Responsive**: Stacked layout on mobile, grid on desktop

```tsx
// Proposed API
<Footer
  companyInfo={companyDetails}
  navigation={footerNavigation}
  socialLinks={socialMediaLinks}
  legalLinks={legalNavigation}
  newsletterSignup={handleNewsletterSignup}
/>
```

### **ServiceGrid** 🔴 (High Priority)
- **Purpose**: Grid display of service offerings with filtering
- **Dependencies**: ServiceCard molecules, SearchBox molecules, Button atoms
- **Features**: Category filtering, search, lazy loading
- **State**: Active filters, search query, loading states

```tsx
// Proposed API
<ServiceGrid
  services={serviceData}
  categories={serviceCategories}
  onServiceSelect={handleServiceSelect}
  onCategoryFilter={handleCategoryFilter}
  searchable
  infiniteScroll
/>
```

### **ContactSection** 🔴 (High Priority)
- **Purpose**: Complete contact experience with form and information
- **Dependencies**: ContactForm, MediaCard molecules, Button atoms
- **Features**: Form validation, file upload, contact methods
- **State**: Form data, validation, submission status

```tsx
// Proposed API
<ContactSection
  contactMethods={contactInfo}
  formConfiguration={contactFormConfig}
  onFormSubmit={handleContactSubmission}
  allowFileUpload
  showContactMethods
/>
```

### **TestimonialSection** 🟡 (Medium Priority)
- **Purpose**: Customer testimonials with carousel/grid display
- **Dependencies**: MediaCard molecules, Button atoms, ProgressBar molecules
- **Features**: Auto-play carousel, manual navigation, filtering
- **State**: Active testimonial, auto-play status

```tsx
// Proposed API
<TestimonialSection
  testimonials={testimonialData}
  displayMode="carousel" // or "grid"
  autoPlay
  showPagination
  filterByService
/>
```

### **WorkShowcase** 🟡 (Medium Priority)
- **Purpose**: Portfolio project display with case studies
- **Dependencies**: MediaCard molecules, TagList molecules, Button atoms
- **Features**: Project filtering, modal view, related projects
- **State**: Filter selection, modal content, loading states

```tsx
// Proposed API
<WorkShowcase
  projects={portfolioProjects}
  categories={projectCategories}
  onProjectSelect={handleProjectView}
  showFilters
  relatedProjectsCount={3}
/>
```

## Organism Creation Guidelines

### **File Structure**
```
src/components/organisms/
├── ContactForm/
│   ├── ContactForm.tsx
│   ├── ContactForm.stories.tsx
│   ├── ContactForm.test.tsx
│   ├── hooks/
│   │   ├── useContactForm.ts
│   │   └── useFormValidation.ts
│   ├── components/
│   │   ├── ContactMethods.tsx
│   │   └── SubmissionStatus.tsx
│   └── index.ts
├── ServiceGrid/
│   ├── ServiceGrid.tsx
│   ├── ServiceGrid.stories.tsx
│   ├── ServiceGrid.test.tsx
│   ├── hooks/
│   │   └── useServiceFiltering.ts
│   └── index.ts
└── index.ts (exports all organisms)
```

### **Component Template**
```tsx
// src/components/organisms/NewOrganism/NewOrganism.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ErrorBoundary } from '../../ErrorBoundary';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { useNewOrganismLogic } from './hooks/useNewOrganismLogic';

export interface NewOrganismProps {
  /** Primary data for the organism */
  data?: any[];
  
  /** Configuration options */
  config?: {
    showSearch?: boolean;
    allowFiltering?: boolean;
    enableInfiniteScroll?: boolean;
  };
  
  /** Event handlers for business logic */
  onDataChange?: (data: any[]) => void;
  onItemSelect?: (item: any) => void;
  onError?: (error: Error) => void;
  
  /** State management */
  loading?: boolean;
  error?: string;
  
  /** Responsive behavior */
  responsive?: boolean;
  mobileColumns?: number;
  desktopColumns?: number;
  
  /** Accessibility */
  'aria-label'?: string;
  role?: string;
}

export const NewOrganism: React.FC<NewOrganismProps> = ({
  data = [],
  config = {},
  onDataChange,
  onItemSelect,
  onError,
  loading = false,
  error,
  responsive = true,
  mobileColumns = 1,
  desktopColumns = 3,
  'aria-label': ariaLabel,
  role = 'region',
  ...props
}) => {
  // Custom hook for business logic
  const {
    filteredData,
    searchQuery,
    setSearchQuery,
    selectedFilters,
    toggleFilter,
    isLoading: logicLoading,
    error: logicError
  } = useNewOrganismLogic(data, config);
  
  // Local state for UI interactions
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Derived state
  const isLoadingState = loading || logicLoading;
  const errorState = error || logicError;
  
  // Event handlers
  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
    onItemSelect?.(item);
  };
  
  const handleError = (err: Error) => {
    console.error('Organism error:', err);
    onError?.(err);
  };
  
  // Effects
  useEffect(() => {
    onDataChange?.(filteredData);
  }, [filteredData, onDataChange]);
  
  if (errorState) {
    return (
      <ErrorContainer>
        <ErrorMessage>{errorState}</ErrorMessage>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </ErrorContainer>
    );
  }
  
  return (
    <ErrorBoundary onError={handleError}>
      <OrganismContainer
        $responsive={responsive}
        $mobileColumns={mobileColumns}
        $desktopColumns={desktopColumns}
        role={role}
        aria-label={ariaLabel}
        {...props}
      >
        {/* Search and Filtering */}
        {config.showSearch && (
          <SearchSection>
            <SearchBox
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search items..."
            />
            
            {config.allowFiltering && (
              <FilterControls>
                {/* Filter UI components */}
              </FilterControls>
            )}
          </SearchSection>
        )}
        
        {/* View Controls */}
        <ViewControls>
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'tertiary'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'tertiary'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
        </ViewControls>
        
        {/* Loading State */}
        {isLoadingState && (
          <LoadingContainer>
            <Spinner size="lg" />
            <Typography>Loading content...</Typography>
          </LoadingContainer>
        )}
        
        {/* Content Grid */}
        {!isLoadingState && (
          <ContentGrid $viewMode={viewMode}>
            {filteredData.map((item, index) => (
              <ContentItem
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleItemSelect(item)}
              >
                {/* Compose molecules and atoms */}
                <ItemCard
                  data={item}
                  selected={selectedItem?.id === item.id}
                  onSelect={() => handleItemSelect(item)}
                />
              </ContentItem>
            ))}
          </ContentGrid>
        )}
        
        {/* Empty State */}
        {!isLoadingState && filteredData.length === 0 && (
          <EmptyState>
            <Typography variant="h3">No items found</Typography>
            <Typography>Try adjusting your search or filters</Typography>
            <Button variant="secondary" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </EmptyState>
        )}
      </OrganismContainer>
    </ErrorBoundary>
  );
};

const OrganismContainer = styled.div<{
  $responsive: boolean;
  $mobileColumns: number;
  $desktopColumns: number;
}>`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  padding: var(--spacing-4);
  
  ${props => props.$responsive && css`
    @media (max-width: 768px) {
      --grid-columns: ${props.$mobileColumns};
    }
    
    @media (min-width: 769px) {
      --grid-columns: ${props.$desktopColumns};
    }
  `}
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const ContentGrid = styled.div<{ $viewMode: string }>`
  display: grid;
  gap: var(--spacing-4);
  
  ${props => props.$viewMode === 'grid' && css`
    grid-template-columns: repeat(var(--grid-columns), 1fr);
  `}
  
  ${props => props.$viewMode === 'list' && css`
    grid-template-columns: 1fr;
  `}
`;

const ContentItem = styled(motion.div)`
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

// Performance optimization
export default React.memo(NewOrganism);
```

### **Custom Hook Pattern**
```tsx
// src/components/organisms/NewOrganism/hooks/useNewOrganismLogic.ts
import { useState, useEffect, useMemo, useCallback } from 'react';

export const useNewOrganismLogic = (data: any[], config: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Memoized filtering logic
  const filteredData = useMemo(() => {
    let filtered = data;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filters
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(item => 
        selectedFilters.some(filter => item.categories?.includes(filter))
      );
    }
    
    return filtered;
  }, [data, searchQuery, selectedFilters]);
  
  // Optimized filter toggle
  const toggleFilter = useCallback((filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  }, []);
  
  // Async operations
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // API call logic here
      // const result = await fetchDataFromAPI();
      // setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return {
    filteredData,
    searchQuery,
    setSearchQuery,
    selectedFilters,
    toggleFilter,
    isLoading,
    error,
    fetchData
  };
};
```

## Quality Checklist

### **Before Creating an Organism**
- [ ] Represents a complete user workflow or major UI section
- [ ] Combines multiple molecules and/or atoms meaningfully
- [ ] Has clear business purpose and user value
- [ ] Cannot be reasonably split into smaller organisms

### **During Development**
- [ ] Uses molecules and atoms as building blocks
- [ ] Implements proper error boundaries
- [ ] Handles loading and error states gracefully
- [ ] Includes responsive design considerations
- [ ] Manages state appropriately (local vs. global)
- [ ] Implements accessibility best practices

### **Before Committing**
- [ ] Has comprehensive Storybook documentation with multiple scenarios
- [ ] Includes integration tests with user workflow testing
- [ ] Passes accessibility audit with full keyboard navigation
- [ ] Performance tested (render time < 50ms)
- [ ] Works correctly in all theme variants
- [ ] Error boundary testing completed
- [ ] Mobile responsiveness verified

## Testing Strategy

### **Integration Testing Focus**
```tsx
describe('ContactForm Organism', () => {
  test('completes full contact submission workflow', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    
    render(
      <ContactForm
        onSubmit={mockOnSubmit}
        contactMethods={mockContactMethods}
      />
    );
    
    // Fill out form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /send/i }));
    
    // Verify submission
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    });
  });
  
  test('handles validation errors correctly', async () => {
    const user = userEvent.setup();
    
    render(<ContactForm />);
    
    // Submit without filling fields
    await user.click(screen.getByRole('button', { name: /send/i }));
    
    // Check for validation errors
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    
    // Verify form not submitted
    expect(screen.queryByText(/message sent/i)).not.toBeInTheDocument();
  });
  
  test('displays loading and success states', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 1000))
    );
    
    render(<ContactForm onSubmit={mockOnSubmit} />);
    
    // Fill and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.click(screen.getByRole('button', { name: /send/i }));
    
    // Check loading state
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
    
    // Wait for completion
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });
  });
});
```

### **Error Boundary Testing**
```tsx
test('handles component errors gracefully', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };
  
  render(
    <ContactForm>
      <ThrowError />
    </ContactForm>
  );
  
  // Should display error boundary fallback
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
});
```

### **Responsive Testing**
```tsx
describe('Responsive behavior', () => {
  test('adapts to mobile viewport', () => {
    render(<ServiceGrid responsive mobileColumns={1} desktopColumns={3} />);
    
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    // Trigger resize event
    fireEvent(window, new Event('resize'));
    
    // Check mobile layout
    const grid = screen.getByRole('region');
    expect(grid).toHaveStyle('grid-template-columns: repeat(1, 1fr)');
  });
});
```

## Performance Optimization

### **Lazy Loading Pattern**
```tsx
// Lazy load organism for better initial page performance
const ContactForm = React.lazy(() => import('./ContactForm'));

// Usage with Suspense
<Suspense fallback={<ContactFormSkeleton />}>
  <ContactForm />
</Suspense>
```

### **Memoization Strategy**
```tsx
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return data.reduce((acc, item) => acc + item.value, 0);
}, [data]);

// Memoize event handlers
const handleItemSelect = useCallback((item) => {
  setSelectedItem(item);
  onItemSelect?.(item);
}, [onItemSelect]);

// Memoize component to prevent unnecessary re-renders
export default React.memo(ServiceGrid, (prevProps, nextProps) => {
  return (
    prevProps.data === nextProps.data &&
    prevProps.loading === nextProps.loading
  );
});
```

### **Virtual Scrolling for Large Lists**
```tsx
import { FixedSizeList as List } from 'react-window';

const VirtualizedServiceGrid = ({ items, height = 400 }) => (
  <List
    height={height}
    itemCount={items.length}
    itemSize={200}
    itemData={items}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <ServiceCard data={data[index]} />
      </div>
    )}
  </List>
);
```

---

**Organisms Documentation Version:** 1.0.0  
**Last Updated:** January 2025  
**Total Organisms**: 3 current (need refactoring), 6 planned