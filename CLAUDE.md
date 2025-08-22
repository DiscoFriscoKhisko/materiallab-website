# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 3000 (http://localhost:3000)
- `npm run build` - Build for production (Vite build without TypeScript checking)
- `npm run build-with-types` - Build for production with TypeScript compilation + Vite build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Architecture Overview

This is a modern React SPA for MaterialLab AI Product Studio, built with a dual-user journey approach:

### Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with comprehensive design tokens
- **Animation**: Framer Motion + React Spring + Three.js
- **Routing**: React Router DOM with simple route structure
- **Deployment**: Cloudflare Pages (configured in wrangler.toml)

### User Journey Architecture
The app features multiple user paths and content sections:
- **Landing Page** (`/`) - Initial path selection interface with PathSelector
- **About** (`/about`) - Company overview and philosophy
- **Services** (`/services`) - Service offerings and capabilities
- **Approach** (`/approach`) - Methodology and process
- **Work** (`/work`) - Portfolio and case studies
- **Contact** (`/contact`) - Contact forms and information
- **Insights** (`/insights`) - Blog and thought leadership
- **VeoDemo** (`/veo-demo`) - Interactive demo showcasing Veo capabilities

### Component Architecture
Components are organized by feature with co-located TypeScript files:

```
src/
├── components/          # Shared UI components
│   ├── Layout/         # Main app wrapper with navigation
│   ├── VeoLayout/      # Veo-specific layout components
│   ├── Navigation/     # Site navigation
│   ├── PathSelector/   # User journey selection interface
│   ├── Hero3D/         # 3D hero section with Three.js
│   ├── AnimatedText/   # Text animations (stagger, glitch variants)
│   ├── Veo*/          # Veo design system components (Button, Card, Carousel, etc.)
│   ├── ML/            # MaterialLab design system components
│   ├── ServiceCards/  # Service display components
│   ├── ContactCTA/    # Contact call-to-action components
│   ├── TestimonialCarousel/ # Customer testimonials
│   └── [other components]/ # Feature-specific components
├── pages/              # Route-level components
│   ├── Landing/        # Home page with path selection
│   ├── About/          # Company overview
│   ├── Services/       # Service offerings
│   ├── Approach/       # Methodology and process
│   ├── Work/          # Portfolio showcase
│   ├── Contact/       # Contact forms
│   ├── Insights/      # Blog and content
│   ├── VeoDemo/       # Interactive demo
│   └── NotFound/      # 404 error page
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── styles/            # Global styles and design tokens
└── utils/             # Shared utilities
```

### Design System
The project features two complementary design systems:

#### MaterialLab Design System (`src/components/ML/`)
- **Dark Mode First**: AI-native dark theme (#0B0F1A background)  
- **Brand Colors**: Sunset Coral (#FF6F61) for brand, Ion Blue (#55C2FF) for interactions
- **Typography**: Space Grotesk (display), Inter (body), JetBrains Mono (code)
- **Glass Effects**: Layered backdrop blur with rim lighting
- **Components**: Button, Card, Input, Typography, SectionTitle, etc.

#### Veo Design System (`src/components/Veo*/` & `src/styles/veo-system.css`)
- **Google-inspired**: Clean, modern aesthetic for Veo product demos
- **Typography**: Multiple font families including Inter, Playfair Display, Sora
- **Internationalization**: Supports Devanagari and Kannada scripts
- **Components**: VeoButton, VeoCard, VeoCarousel, VeoForm, VeoImage, etc.

#### Shared Design Tokens (`src/styles/tokens.css`)
- CSS custom properties for consistency across both systems
- Mobile-first responsive design with breakpoint-specific overrides
- Motion tokens for animations and transitions
- Accessibility: Respects `prefers-reduced-motion`

### Animation Patterns
The codebase extensively uses motion libraries:
- **Framer Motion**: Page transitions, scroll reveals, hover states
- **React Spring**: Physics-based animations
- **Three.js**: 3D elements in Hero3D component
- **Lottie**: Vector animations via lottie-react
- **Custom Hooks**: Animation utilities in `src/hooks/` (useVeoAnimation, useScrollAnimation, useInView, etc.)
- **CSS Animations**: Custom animations in `src/styles/` with motion tokens

### Key Development Notes
- **Development Server**: Runs on port 3000 (configured in vite.config.ts)
- **Production Base Path**: Uses `/materiallab-website/` in production builds
- **Dual Design Systems**: MaterialLab (ML/) and Veo (Veo*/) component libraries
- **Context Management**: LanguageContext for internationalization support
- **Custom Hooks**: Extensive collection in `src/hooks/` for animations and interactions
- **Accessibility**: Respects `prefers-reduced-motion` and includes accessibility utilities
- **No Test Framework**: Check with maintainer before adding tests

### Cloudflare Deployment
- **Build Command**: `npm run build` (no TypeScript checking) or `npm run build-with-types`
- **Output Directory**: `dist`
- **Configuration**: `wrangler.toml` with compatibility_date "2024-01-01"
- **Project Name**: materiallab-website
- **Domain**: materiallab.io (configured for Cloudflare Pages)