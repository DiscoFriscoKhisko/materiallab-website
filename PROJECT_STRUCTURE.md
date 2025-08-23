# MaterialLab Website - Project Structure

## 📁 Root Directory
```
materiallab-website/
├── public/                     # Static assets
│   ├── images/
│   │   └── placeholders/       # Placeholder images
│   ├── favicon.ico
│   └── index.html
├── src/                        # Source code
├── dist/                       # Build output (generated)
├── node_modules/               # Dependencies
├── .git/                       # Git repository
├── package.json                # Dependencies & scripts
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
├── CLAUDE.md                  # Project instructions
├── VEO_DESIGN_SYSTEM.md       # Veo integration docs
└── PROJECT_STRUCTURE.md       # This file
```

## 🎨 Source Code Structure (`src/`)

### **🧩 Components** (`src/components/`)
```
components/
├── 🆕 VeoHero.tsx                    # Video background hero section
├── 🆕 VeoVideoCard.tsx               # Interactive video showcase cards
├── 🆕 VeoServiceCard.tsx             # Service offering cards
├── 🆕 VeoFeatureGrid.tsx             # Grid layout for features
├── 🔄 VeoIcon.tsx                    # Veo icon system (moved from dir)
├── 🔄 AnimatedText.tsx               # Text animations (moved from dir)
├── 🔄 ErrorBoundary.tsx              # Error handling (moved from dir)
├── 🔄 PathSelector.tsx               # User journey selector (moved from dir)
├── 🔄 ThemeToggle.tsx                # Dark/light theme switch (moved from dir)
│
├── UI/                              # 🎯 Unified UI Components
│   ├── Button.tsx                   # Merged ML/Button + VeoButton
│   ├── Input.tsx                    # Merged ML/Input + VeoForm  
│   └── index.ts                     # Exports
│
├── ML/                              # MaterialLab Design System
│   ├── Card.tsx                     # ML card components
│   ├── Typography.tsx               # Text components (simplified)
│   ├── SectionTitle.tsx             # Section headers
│   ├── Video.tsx                    # Video components
│   ├── Accordion.tsx                # Expandable content
│   ├── CarouselDots.tsx             # Carousel indicators
│   ├── JumpLinks.tsx                # Navigation anchors
│   ├── PageCover.tsx                # Page hero sections
│   └── index.ts                     # Exports
│
├── Layout/
│   └── Layout.tsx                   # Main app wrapper
│
├── Navigation/
│   └── Navigation.tsx               # 🔄 Updated with Veo styling
│
├── ContactCTA/                      # Contact call-to-actions
│   ├── ContactSplit.tsx
│   ├── QuickForm.tsx                # Simplified form (487→130 lines)
│   ├── WhatsAppCTA.tsx
│   └── index.ts
│
├── ContactForm/
│   └── ContactForm.tsx              # Main contact form
│
├── ServiceCards/
│   └── ServiceCards.tsx             # Legacy service cards
│
├── MediaPlaceholder/
│   └── MediaPlaceholder.tsx         # Media placeholder components
│
├── OffersPanel/
│   └── OffersPanel.tsx              # Service offers panel
│
├── ProofStrip/
│   └── ProofStrip.tsx               # Social proof strip
│
├── FeatureDiscovery/
│   └── LanguageAdaptation.tsx       # Language feature discovery
│
└── AudienceSelector/
    └── AudienceSelector.tsx         # Audience targeting selector
```

### **📄 Pages** (`src/pages/`)
```
pages/
├── 🆕 VeoLanding.tsx                 # New Veo-inspired landing page
├── Landing/
│   └── Landing.tsx                  # Original MaterialLab landing
├── Services/
│   └── Services.tsx                 # Service offerings page
├── Work/
│   └── Work.tsx                     # Portfolio showcase
├── About/
│   └── About.tsx                    # Company information
├── Approach/
│   └── Approach.tsx                 # Methodology page
├── Contact/
│   └── Contact.tsx                  # Contact forms page
├── Insights/
│   └── Insights.tsx                 # Blog/insights page
├── NotFound/
│   └── NotFound.tsx                 # 404 error page
└── TestShowcase/
    └── TestShowcase.tsx             # Component testing page
```

### **🎣 Hooks** (`src/hooks/`)
```
hooks/
├── 🆕 useAnimation.ts               # Unified animation hook (merged)
├── useInView.ts                     # Intersection observer
├── useIntersectionObserver.ts      # Alternative intersection observer
├── useTheme.ts                      # Theme switching
├── useScrollSpy.ts                  # Scroll position tracking
└── useAccessibility.ts             # Accessibility utilities
```

### **🎨 Styles** (`src/styles/`)
```
styles/
├── 🔄 tokens.css                    # Updated with Veo design tokens
└── motion.ts                        # Motion/animation utilities
```

### **🔧 Utils & Config** (`src/`)
```
src/
├── App.tsx                          # 🔄 Updated with /veo route
├── main.tsx                         # App entry point
├── index.css                        # Global styles & imports
├── vite-env.d.ts                   # Vite type definitions
├── contexts/
│   └── LanguageContext.tsx         # i18n context
└── utils/
    └── hooks.ts                     # Utility functions (cleaned)
```

## 🗺️ Route Structure

### **Public Routes**
```
/ ...................... Original MaterialLab landing
/veo ................... 🆕 New Veo-inspired landing page
/services .............. Service offerings  
/work .................. Portfolio showcase
/about ................. Company information
/approach .............. Methodology & process
/contact ............... Contact forms
/insights .............. Blog & thought leadership
```

### **Legacy Routes** (maintained for compatibility)
```
/what-we-do ............ → Redirects to /services
/lab-notes ............. → Redirects to /insights
```

## 🎯 Key File Locations

### **Veo Design System Files**
```
📁 NEW Veo Components:
src/components/VeoHero.tsx .............. Hero with video background
src/components/VeoVideoCard.tsx ........ Interactive video cards
src/components/VeoServiceCard.tsx ...... Service offering cards  
src/components/VeoFeatureGrid.tsx ...... Feature showcase grid
src/pages/VeoLanding.tsx ............... Complete Veo demo page

📁 UPDATED for Veo:
src/styles/tokens.css .................. Veo design tokens added
src/components/Navigation/Navigation.tsx  Veo styling applied
src/App.tsx ............................ /veo route added
```

### **Unified Components** (Cleanup Result)
```
📁 MERGED Components:
src/components/UI/Button.tsx ........... Merged ML/Button + VeoButton
src/components/UI/Input.tsx ............ Merged ML/Input + VeoForm
src/hooks/useAnimation.ts .............. Merged useScrollAnimation + useVeoAnimation

📁 MOVED Components (from directories to files):
src/components/VeoIcon.tsx ............. Moved from VeoIcon/
src/components/AnimatedText.tsx ........ Moved from AnimatedText/
src/components/ErrorBoundary.tsx ....... Moved from ErrorBoundary/
src/components/PathSelector.tsx ........ Moved from PathSelector/
src/components/ThemeToggle.tsx ......... Moved from ThemeToggle/
```

### **Configuration Files**
```
📄 Core Config:
package.json ....................... Dependencies & scripts
vite.config.ts .................... Vite build configuration
tailwind.config.js ................ Tailwind CSS setup
tsconfig.json ..................... TypeScript configuration

📄 Documentation:
CLAUDE.md ......................... Project development guide
VEO_DESIGN_SYSTEM.md .............. Veo integration documentation
PROJECT_STRUCTURE.md .............. This structure overview
```

## 📊 Architecture Highlights

### **Design System Dual Architecture**
- **MaterialLab Theme**: Original dark-first AI branding (`src/components/ML/`)
- **Veo Theme**: Google-inspired light minimal design (`src/components/Veo*`)
- **Unified Components**: Shared UI elements (`src/components/UI/`)

### **Performance Optimizations**
- **Lazy Loading**: All pages loaded on demand
- **Code Splitting**: Separate bundles for each page
- **Asset Optimization**: WebP images, video preloading
- **Bundle Analysis**: VeoLanding = 26.29kB gzipped

### **Development Features**
- **Hot Reload**: Instant updates during development
- **TypeScript**: Full type safety throughout
- **Component Library**: Reusable, documented components
- **Responsive Design**: Mobile-first approach

### **Component Reduction Results**
```
Before Cleanup:
- 40+ scattered component files
- Duplicate Button, Input, and animation logic
- Nested single-component directories
- 380kB+ bundle size

After Cleanup + Veo Integration:
- Streamlined component structure
- Unified UI components
- Flat file organization for single components
- 372kB bundle (with new Veo features added)
```

## 🚀 Quick Start Commands

```bash
# Start development
npm run dev                  # → http://localhost:3001/

# View Veo design system
# Navigate to: http://localhost:3001/veo

# Build for production  
npm run build               # → dist/

# Preview production build
npm run preview             # Test production build locally
```

This structure provides a clean, scalable foundation with both the original MaterialLab design system and the new Veo-inspired components working seamlessly together.