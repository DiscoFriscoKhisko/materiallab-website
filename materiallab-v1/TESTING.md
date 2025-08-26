# MaterialLab Design System Testing Guide

## 🎯 Testing Overview

This document provides comprehensive testing guidelines for the MaterialLab website's Veo-inspired design system implementation.

## 🔗 Test URLs

- **Production**: http://localhost:3000
- **Test Showcase**: http://localhost:3000/test-showcase
- **Main Pages**:
  - Landing: http://localhost:3000/
  - What We Do: http://localhost:3000/what-we-do
  - Approach: http://localhost:3000/approach
  - Lab Notes: http://localhost:3000/lab-notes
  - Contact: http://localhost:3000/contact

## ✅ Acceptance Criteria Checklist

### 1. **Visual Design System**
- [ ] Primary buttons display warm coral background (#FF7A59)
- [ ] Secondary buttons show veo-blue outlines (#4A90E2)
- [ ] Gradient links show iris-indigo to veo-blue underlines
- [ ] Hover effects trigger gradient shimmer animations
- [ ] Progress bars display tri-gradient fills
- [ ] Focus rings use iris-indigo (#6B6CF3) color

### 2. **Interactive States**
- [ ] Buttons lift on hover (translateY(-2px))
- [ ] Links show shimmer effect on hover
- [ ] Focus states visible with 3px outline
- [ ] Active states provide tactile feedback
- [ ] Disabled states show reduced opacity

### 3. **Accessibility (WCAG 2.1 AA)**
- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] Color contrast ratio ≥ 3:1 for large text  
- [ ] Focus indicators have 3:1 contrast ratio
- [ ] All interactive elements keyboard accessible
- [ ] Screen reader announces properly
- [ ] No color-only information
- [ ] Text scales to 200% without horizontal scroll

### 4. **Motion & Animation**
- [ ] Animations use ML timing tokens (180ms, 220ms, etc.)
- [ ] Reduced motion preference respected
- [ ] Sparkle effects disabled in reduced motion
- [ ] Page transitions smooth and purposeful

### 5. **Responsive Design**
- [ ] Mobile (320px - 768px): Stacked layouts, touch targets ≥44px
- [ ] Tablet (768px - 1024px): Flexible grids, readable text
- [ ] Desktop (1024px+): Optimal content width, clear hierarchy

### 6. **Cross-Browser Compatibility**
- [ ] Chrome: Full feature support
- [ ] Firefox: CSS gradients work correctly
- [ ] Safari: Backdrop-filter effects render
- [ ] Edge: Variable fonts load properly

## 🛠 Manual Testing Procedures

### **Button Testing**
1. Visit `/test-showcase`
2. Locate "ML Design System Buttons" section
3. Verify primary buttons show warm coral (#FF7A59)
4. Test hover states for lift animation
5. Use keyboard navigation to test focus rings
6. Check disabled state styling

### **Link Testing**
1. Find "Gradient Underline Links" section
2. Verify gradient underlines visible
3. Hover over links to see shimmer animation
4. Check keyboard focus behavior

### **Color Contrast Testing**
1. Use browser dev tools or contrast checker
2. Test all text/background combinations
3. Verify AA compliance for body text (4.5:1)
4. Verify AA compliance for large text (3:1)

### **Responsive Testing**
```bash
# Mobile viewport
Resize to 375px width, test touch interactions

# Tablet viewport  
Resize to 768px width, check layout flexibility

# Desktop viewport
Resize to 1200px+ width, verify optimal spacing
```

## 🔍 Automated Testing

### **Build Verification**
```bash
npm run build
# Should complete without errors
# Check dist/ folder for generated assets
```

### **Accessibility Testing**
Use browser extensions or tools:
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/extension/)
- Chrome Lighthouse Accessibility audit

### **Performance Testing**
```bash
# Lighthouse CLI
npx lighthouse http://localhost:3000 --only=performance,accessibility
```

## 🐛 Common Issues & Fixes

### **CSS Variables Not Applying**
**Problem**: ML classes defined but not visible
**Solution**: Check component CSS cascade priority
**Fix**: Added `!important` to ML classes in index.css

### **Focus States Missing**
**Problem**: Keyboard navigation doesn't show focus
**Solution**: Verify focus-visible polyfill loaded
**Fix**: Use `.ml-focusable` utility class

### **Animations Not Respecting Reduced Motion**
**Problem**: Animations play despite user preference
**Solution**: Check media query implementation
**Fix**: Ensure all animations wrapped in `@media (prefers-reduced-motion: reduce)`

## 📊 Performance Benchmarks

### **Target Metrics**
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- First Input Delay: <100ms

### **Bundle Size Limits**
- Main JS bundle: <500kb gzipped
- CSS bundle: <100kb gzipped  
- Total fonts: <200kb

## ✨ Quality Gates

### **Pre-deployment Checklist**
- [ ] All automated tests pass
- [ ] Manual accessibility review complete
- [ ] Cross-browser testing verified
- [ ] Performance benchmarks met
- [ ] Design system consistency validated
- [ ] No console errors or warnings

### **Sign-off Requirements**
- [ ] Design review approved
- [ ] Accessibility review passed  
- [ ] Performance review completed
- [ ] QA testing finished

## 📱 Device Testing Matrix

| Device | Viewport | Browser | Status |
|---------|----------|---------|---------|
| iPhone SE | 375x667 | Safari | ✅ |
| iPhone 12 | 390x844 | Safari | ✅ |  
| iPad | 768x1024 | Safari | ✅ |
| Android | 360x640 | Chrome | ✅ |
| Desktop | 1920x1080 | Chrome | ✅ |
| Desktop | 1920x1080 | Firefox | ⏳ |
| Desktop | 1920x1080 | Safari | ⏳ |
| Desktop | 1920x1080 | Edge | ⏳ |

## 🚀 Testing Best Practices

1. **Test Early**: Validate components during development
2. **Test Often**: Run checks on every significant change
3. **Test Real**: Use actual devices when possible
4. **Document Issues**: Record problems with reproduction steps
5. **Verify Fixes**: Re-test after implementing solutions

## 🔧 Testing Tools Setup

```bash
# Install accessibility testing tools
npm install --save-dev @axe-core/puppeteer
npm install --save-dev lighthouse

# Run automated accessibility tests
npm run test:a11y

# Run performance tests  
npm run test:perf
```

---

**Next Steps**: Complete manual testing checklist and document any issues found.