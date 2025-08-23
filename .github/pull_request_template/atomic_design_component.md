# Atomic Design Component PR

## Component Details

**Component Name:** 
**Atomic Level:** [ ] Atom  [ ] Molecule  [ ] Organism
**Component Type:** [ ] New Component  [ ] Migration/Refactor  [ ] Bug Fix  [ ] Enhancement

## Atomic Design Compliance Checklist

### **Design Token Usage**
- [ ] Component uses only design tokens (no hardcoded colors, spacing, typography)
- [ ] All CSS custom properties follow semantic naming convention
- [ ] Component supports both light and dark themes
- [ ] Theme switching works correctly in all variants

### **Atomic Level Compliance**

#### If Atom:
- [ ] Single responsibility - component cannot be broken down further
- [ ] No dependencies on other custom components (only utility functions)
- [ ] Configurable entirely through props
- [ ] All visual states defined (hover, focus, disabled, loading, etc.)

#### If Molecule:
- [ ] Combines 2+ atoms for specific functionality
- [ ] Clear relationship between constituent atoms
- [ ] Manages appropriate internal state only
- [ ] Provides clear external API via props
- [ ] Handles error and loading states

#### If Organism:
- [ ] Accomplishes complete user task or workflow
- [ ] Responsive design implemented and tested
- [ ] Proper error boundaries implemented
- [ ] Performance optimized (lazy loading, memoization where appropriate)

### **Code Quality**
- [ ] TypeScript interfaces with comprehensive JSDoc documentation
- [ ] Component follows naming conventions (PascalCase, descriptive)
- [ ] Proper prop validation (PropTypes in development mode)
- [ ] Styled components use consistent patterns

### **Accessibility**
- [ ] All interactive elements are keyboard accessible
- [ ] Proper ARIA attributes and roles applied
- [ ] Color contrast ratios meet WCAG 2.1 AA standards
- [ ] Screen reader tested (or manual accessibility review completed)
- [ ] Focus management implemented correctly

### **Testing**
- [ ] Unit tests with good coverage (>80%)
- [ ] Integration tests for user interactions
- [ ] Visual regression tests (if applicable)
- [ ] Accessibility tests included
- [ ] Tests pass in all theme variants

### **Documentation**
- [ ] Storybook stories created with comprehensive examples
- [ ] README updated with usage examples
- [ ] Component added to appropriate atomic index file
- [ ] Migration guide updated (if applicable)

### **Performance**
- [ ] Component renders within performance threshold (Atom: <5ms, Molecule: <15ms, Organism: <50ms)
- [ ] Bundle size impact analyzed and approved
- [ ] No memory leaks in component lifecycle
- [ ] Unnecessary re-renders avoided

## Description

### What does this PR do?
<!-- Describe the changes in detail -->

### Why is this change needed?
<!-- Explain the business or technical reason for this change -->

### How does this fit into the atomic design system?
<!-- Explain how this component fits into the overall design system -->

## Dependencies

### Component Dependencies
- **Atoms used:** (list any atoms this component depends on)
- **Molecules used:** (for organisms only)
- **External libraries:** (any new dependencies added)

### Breaking Changes
- [ ] This PR contains breaking changes
- [ ] Migration guide has been updated
- [ ] All usage locations have been updated

## Testing Instructions

### Manual Testing
1. **Theme Testing:**
   - [ ] Test in Humanistic Light theme
   - [ ] Test in Humanistic Dark theme  
   - [ ] Test in Structured Light theme
   - [ ] Test in Structured Dark theme

2. **Responsive Testing:**
   - [ ] Mobile (320px-768px)
   - [ ] Tablet (768px-1024px)
   - [ ] Desktop (1024px+)

3. **Accessibility Testing:**
   - [ ] Keyboard navigation
   - [ ] Screen reader compatibility
   - [ ] High contrast mode
   - [ ] Reduced motion preference

### Automated Testing
```bash
# Run these commands to validate the component
npm run lint
npm run validate:tokens
npm run validate:atomic  
npm run validate:themes
npm run test:design-system
```

## Screenshots/Videos

### Theme Variants
<!-- Include screenshots showing the component in all theme variants -->

### Responsive Behavior  
<!-- Include screenshots or video showing responsive behavior -->

### Accessibility Features
<!-- Include screenshots showing focus states, screen reader output, etc. -->

## Component Registry Update

- [ ] Component added to COMPONENT_REGISTRY.md
- [ ] Atomic level classification confirmed
- [ ] Dependencies mapped correctly
- [ ] Migration status updated

## Review Notes

### For Reviewers
- Focus areas for this PR:
- Specific concerns or questions:
- Performance considerations:

### Design Review
- [ ] Design team approval obtained (if applicable)
- [ ] Figma designs match implementation
- [ ] Design tokens match design specifications

---

**PR Checklist Summary:**
- [ ] All automated checks pass
- [ ] Manual testing completed in all themes
- [ ] Accessibility verified
- [ ] Documentation updated
- [ ] Component registry updated

/cc @design-team @frontend-team