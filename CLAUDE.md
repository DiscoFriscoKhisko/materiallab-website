# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 8000 (http://localhost:8000)
- `npm run build` - Build for production (TypeScript compilation + Vite build)
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
The app is designed around two distinct user paths:
- **Certain Users** (`/certain-user`) - Users who know exactly what they want
- **Explorative Users** (`/explorative-user`) - Users exploring possibilities
- **Landing Page** (`/`) - Initial path selection interface

### Component Architecture
Components are organized by feature with co-located TypeScript files:

```
src/
├── components/          # Shared UI components
│   ├── Layout/         # Main app wrapper with navigation
│   ├── PathSelector/   # Core user journey selection
│   ├── AnimatedText/   # Text animations (stagger, glitch variants)
│   ├── Hero3D/         # 3D hero section with Three.js
│   ├── Navigation/     # Site navigation
│   └── ServiceCards/   # Service display components
├── pages/              # Route-level components
│   ├── Landing/        # Home page with path selection
│   ├── CertainUser/    # Direct consultation journey
│   └── ExplorativeUser/# Discovery-focused journey
└── utils/              # Shared utilities and hooks
```

### Design System
The project uses a comprehensive design token system in `src/styles/tokens.css`:

- **Dark Mode First**: AI-native dark theme (#0B0F1A background)
- **Brand Colors**: Sunset Coral (#FF6F61) for brand, Ion Blue (#55C2FF) for interactions
- **Typography**: Space Grotesk (display), Inter (body), JetBrains Mono (code)
- **Glass Effects**: Layered backdrop blur with rim lighting
- **Motion**: Comprehensive easing and duration tokens for animations

Key design classes available:
- `.glass` - Standard glassmorphism effect
- `.elevation-1/2/3` - Layered shadows with rim lighting
- `.heading-1/2/3` - Typography hierarchy
- `.container` - Max-width wrapper with responsive padding

### Animation Patterns
The codebase extensively uses motion libraries:
- **Framer Motion**: Page transitions, scroll reveals, hover states
- **React Spring**: Physics-based animations
- **Three.js**: 3D elements in Hero3D component
- **Custom Hooks**: `useCountUp` in `utils/hooks.ts`

### Key Development Notes
- Server runs on port 8000 (configured in vite.config.ts)
- All tokens use CSS custom properties for consistency
- Mobile-first responsive design with breakpoint-specific token overrides
- Accessibility: Respects `prefers-reduced-motion`
- No test framework configured - check with maintainer before adding tests

### Cloudflare Deployment
- Build command: `npm run build`
- Output directory: `dist`
- Wrangler configuration in `wrangler.toml`
- Domain: materiallab.io (configured for Cloudflare Pages)