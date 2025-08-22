# MaterialLab Website - Gemini Review Guide

## 🎯 Overview
MaterialLab AI Product Studio website built with React 19, TypeScript, Vite, and a comprehensive design system. Recently underwent major UI consistency improvements and color system modernization.

## 🔧 Recent Changes (for Review)

### 1. **Color System Modernization**
- **Replaced:** Coral (#FF7A59) → Electric Indigo (#6366F1)
- **Impact:** All primary colors, buttons, accents, glow effects
- **Files affected:** 15+ components, tokens.css, index.css

### 2. **Typography Consistency Overhaul**
- **Fixed:** All raw Tailwind text classes → ML Typography components
- **Standardized:** Font hierarchy, sizing, weights
- **Components:** Navigation, testimonials, work page, forms, etc.

### 3. **Button Standardization**
- **Converted:** VideoHero buttons to MLButton components
- **Unified:** All interactive elements use consistent sizing
- **Removed:** Custom text sizing from MagneticButton

## 🎨 Design System Specifications

### **Color Palette**
```css
Primary: #6366F1 (Electric Indigo)
Ion Blue: #55C2FF  
Mist Cyan: #7FE3D7
Background: #0B0F1A (Dark)
Surface: #1A1F2E
```

### **Typography Hierarchy**
```css
H1: 2.5rem - 4.5rem (Playfair Display, 600)
H2: 1.8rem - 2.8rem (Playfair Display, 500)
H3: 1.5rem - 2.25rem (Playfair Display, 500)
H4: 1.25rem - 1.75rem (Playfair Display, 500)
Body: 1rem - 1.125rem (Inter, 400)
Caption: 0.75rem - 0.875rem (Inter, 400)
```

### **Component Library**
- **MLHeading:** levels 1-5 for all headings
- **MLText:** variants bodyL, bodyM, bodyS, caption
- **MLButton:** sizes sm, md, lg with consistent styling
- **MLCard:** various glow effects and elevations

## 🧪 Key Areas to Test

### **1. Typography Consistency**
- [ ] All headings use MLHeading components
- [ ] No raw `text-xl`, `text-2xl`, etc. classes
- [ ] Consistent font weights across similar elements
- [ ] Proper responsive scaling on mobile/desktop

### **2. Color Application**
- [ ] Primary buttons show Electric Indigo (#6366F1)
- [ ] No coral color remnants anywhere
- [ ] Consistent accent colors throughout
- [ ] Proper contrast ratios for accessibility

### **3. Component Consistency**
- [ ] All buttons use MLButton or have consistent sizing
- [ ] Form elements follow design system
- [ ] Cards use consistent elevation/glow effects
- [ ] Navigation elements properly styled

### **4. Responsive Design**
- [ ] Typography scales properly on mobile
- [ ] Button sizing appropriate for touch targets
- [ ] Spacing follows 8px grid system
- [ ] Layout maintains proportions across breakpoints

### **5. Performance**
- [ ] Page load times under 3s
- [ ] Smooth animations without jank
- [ ] Font loading without FOUT/FOIT
- [ ] Proper image optimization

## 📱 Pages to Review

### **Core Pages**
1. **Landing (/)** - Main hero, video background, audience selector
2. **Work (/work)** - Project showcase with case studies
3. **Services (/services)** - Service offerings and process
4. **Approach (/approach)** - Methodology and team
5. **Contact (/contact)** - Contact forms and information

### **Special Pages**
6. **404 (/non-existent-page)** - Error page with proper typography
7. **Test Showcase (/test-showcase)** - Component testing page

## 🎪 Interactive Elements to Test

### **Primary Interactions**
- [ ] Video hero play/pause controls
- [ ] Audience selector (SMB/Creator/Enterprise)
- [ ] Navigation menu (mobile + desktop)
- [ ] Contact form validation
- [ ] Testimonial carousel auto-rotation

### **Hover States**
- [ ] Button hover effects (scale + glow)
- [ ] Card elevation changes
- [ ] Link hover animations
- [ ] Icon hover states

### **Animations**
- [ ] Smooth page transitions
- [ ] Scroll-triggered animations
- [ ] Loading states
- [ ] Micro-interactions

## 🔍 Accessibility Checklist

### **Visual**
- [ ] Sufficient color contrast (WCAG AA)
- [ ] Focus indicators visible
- [ ] Text readable at 200% zoom
- [ ] No color-only information

### **Keyboard Navigation**
- [ ] All interactive elements focusable
- [ ] Logical tab order
- [ ] Skip navigation available
- [ ] No keyboard traps

### **Screen Reader**
- [ ] Proper heading hierarchy
- [ ] Alt text for images
- [ ] Form labels associated
- [ ] ARIA attributes where needed

## 🚀 Technical Performance

### **Build Metrics**
- **Bundle size:** 475KB (143KB gzipped)
- **CSS size:** 85KB (21KB gzipped)
- **Build time:** ~1.5s
- **Dependencies:** 479 modules

### **Expected Performance**
- **First Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

## 🔬 Specific Issues to Look For

### **Typography**
- Inconsistent font sizes between similar elements
- Improper line heights causing readability issues
- Font weight mismatches
- Responsive scaling problems

### **Colors**
- Any remaining coral (#FF7A59) references
- Poor contrast combinations
- Inconsistent accent color usage
- Missing hover state colors

### **Layout**
- Broken responsive layouts
- Inconsistent spacing (non-8px multiples)
- Misaligned elements
- Overlapping content

### **Components**
- Buttons with different sizes for same function
- Cards with inconsistent styling
- Form elements without proper states
- Icons with wrong colors/sizes

## 📊 Success Criteria

### **Must Have**
✅ Complete color system migration (no coral)
✅ Typography hierarchy consistency
✅ Component standardization
✅ Responsive design integrity
✅ Accessibility compliance (WCAG AA)

### **Should Have**
- Smooth animations (60fps)
- Fast loading times (< 3s)
- Intuitive user experience
- Cross-browser compatibility
- Touch-friendly interactions

### **Nice to Have**
- Progressive enhancement
- Offline functionality
- Advanced animations
- A+ performance scores
- SEO optimization

## 🛠 Development Info

**Framework:** React 19 + TypeScript + Vite
**Styling:** Tailwind CSS + Custom Design Tokens
**Deployment:** Cloudflare Pages
**Repository:** Private (MaterialLab)

---

**Last Updated:** January 2025
**Review Focus:** UI Consistency & Typography Standardization
**Reviewer:** Gemini AI