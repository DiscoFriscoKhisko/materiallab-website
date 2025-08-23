# Theme System Architecture

This document defines the comprehensive theme switching system for MaterialLab, enabling seamless transitions between color palettes and design approaches while maintaining atomic design consistency.

## Theme System Overview

The MaterialLab theme system supports two primary design philosophies with automatic light/dark mode variants:

### **Primary Themes**

#### 🧠 **Humanistic Intelligence** (Default)
- **Philosophy**: AI that understands human context and emotion
- **Primary Colors**: Navy (#141A46), Orange (#EC8B5E), Teal (#8BD8BD)
- **Character**: Warm, approachable, human-centered
- **Use Cases**: Client-facing pages, marketing content, brand storytelling

#### ⚡ **Structured Dynamism** (Alternative)  
- **Philosophy**: Systematic AI efficiency and precision
- **Primary Colors**: Charcoal (#2C2C2C), Electric Blue (#007BFF), Mint (#00D4AA)
- **Character**: Technical, precise, performance-focused
- **Use Cases**: Product demos, technical documentation, admin interfaces

### **Mode Variants**
Each theme automatically supports:
- **Light Mode**: High contrast, accessibility-optimized
- **Dark Mode**: Reduced eye strain, modern aesthetic
- **Auto Mode**: System preference detection with manual override

## Token Architecture

### **Theme Token Structure**
```css
/* Global Brand Tokens (theme-agnostic) */
:root {
  --brand-font-display: 'Space Grotesk';
  --brand-font-body: 'Inter';
  --brand-font-mono: 'JetBrains Mono';
  --brand-spacing-base: 1rem;
  --brand-radius-base: 0.5rem;
}

/* Theme-Specific Semantic Tokens */
[data-theme="humanistic-light"] {
  --color-background-primary: #FEFDF8;
  --color-background-secondary: #F5F4EF;
  --color-text-primary: #141A46;
  --color-text-secondary: #6B7280;
  --color-interactive-primary: #EC8B5E;
  --color-interactive-secondary: #8BD8BD;
  --color-surface-elevated: rgba(255, 255, 255, 0.9);
}

[data-theme="humanistic-dark"] {
  --color-background-primary: #0B0F1A;
  --color-background-secondary: #141A46;
  --color-text-primary: #FEFDF8;
  --color-text-secondary: #9CA3AF;
  --color-interactive-primary: #FF6F61;
  --color-interactive-secondary: #55C2FF;
  --color-surface-elevated: rgba(20, 26, 70, 0.9);
}

[data-theme="structured-light"] {
  --color-background-primary: #FFFFFF;
  --color-background-secondary: #F8FAFC;
  --color-text-primary: #2C2C2C;
  --color-text-secondary: #64748B;
  --color-interactive-primary: #007BFF;
  --color-interactive-secondary: #00D4AA;
  --color-surface-elevated: rgba(255, 255, 255, 0.95);
}

[data-theme="structured-dark"] {
  --color-background-primary: #0F172A;
  --color-background-secondary: #1E293B;
  --color-text-primary: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-interactive-primary: #3B82F6;
  --color-interactive-secondary: #06B6D4;
  --color-surface-elevated: rgba(30, 41, 59, 0.9);
}
```

### **Component Token Mapping**

#### Atoms
```css
/* Button Atom - Theme Adaptive */
.button-primary {
  background-color: var(--color-interactive-primary);
  color: var(--color-text-on-interactive);
  border: 2px solid var(--color-interactive-primary);
}

.button-secondary {
  background-color: transparent;
  color: var(--color-interactive-primary);
  border: 2px solid var(--color-interactive-primary);
}

/* Input Atom - Theme Adaptive */
.input-field {
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border-subtle);
  color: var(--color-text-primary);
}
```

#### Molecules
```css
/* FormField Molecule */
.form-field {
  --field-background: var(--color-surface-elevated);
  --field-border: var(--color-border-subtle);
  --field-label: var(--color-text-secondary);
  --field-error: var(--color-status-error);
}
```

#### Organisms
```css
/* Navigation Organism */
.navigation {
  --nav-background: var(--color-surface-elevated);
  --nav-backdrop: var(--color-background-primary);
  --nav-border: var(--color-border-subtle);
}
```

## Implementation Guide

### **1. Theme Detection & Storage**

#### Context Provider
```typescript
// src/contexts/ThemeContext.tsx
interface ThemeContextType {
  theme: 'humanistic' | 'structured';
  mode: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'humanistic' | 'structured') => void;
  setMode: (mode: 'light' | 'dark' | 'auto') => void;
  resolvedMode: 'light' | 'dark';
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

#### Local Storage Persistence
```typescript
const THEME_STORAGE_KEY = 'ml-theme';
const MODE_STORAGE_KEY = 'ml-mode';

const getStoredTheme = (): 'humanistic' | 'structured' => {
  return localStorage.getItem(THEME_STORAGE_KEY) as any || 'humanistic';
};

const getStoredMode = (): 'light' | 'dark' | 'auto' => {
  return localStorage.getItem(MODE_STORAGE_KEY) as any || 'auto';
};
```

### **2. Theme Application**

#### Document Root Update
```typescript
useEffect(() => {
  const root = document.documentElement;
  const themeClass = `${theme}-${resolvedMode}`;
  
  // Remove existing theme classes
  root.classList.remove(
    'humanistic-light', 'humanistic-dark',
    'structured-light', 'structured-dark'
  );
  
  // Apply new theme
  root.classList.add(themeClass);
  root.setAttribute('data-theme', themeClass);
}, [theme, resolvedMode]);
```

#### System Preference Detection
```typescript
const useSystemMode = () => {
  const [systemMode, setSystemMode] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemMode(mediaQuery.matches ? 'dark' : 'light');
    
    const handler = (e: MediaQueryListEvent) => {
      setSystemMode(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return systemMode;
};
```

### **3. Component Theme Adaptation**

#### Theme-Aware Components
```typescript
// src/components/UI/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  themeVariant?: 'auto' | 'humanistic' | 'structured';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  themeVariant = 'auto',
  ...props
}) => {
  const { theme } = useTheme();
  const activeTheme = themeVariant === 'auto' ? theme : themeVariant;
  
  return (
    <StyledButton
      $variant={variant}
      $theme={activeTheme}
      {...props}
    />
  );
};
```

#### Styled Components Integration
```typescript
const StyledButton = styled.button<{
  $variant: string;
  $theme: string;
}>`
  /* Base styles using CSS custom properties */
  background-color: var(--color-interactive-${props => props.$variant});
  color: var(--color-text-on-interactive);
  
  /* Theme-specific overrides */
  ${props => props.$theme === 'structured' && css`
    border-radius: var(--radius-sharp);
    font-weight: 600;
  `}
  
  ${props => props.$theme === 'humanistic' && css`
    border-radius: var(--radius-organic);
    font-weight: 500;
  `}
`;
```

## Motion & Animation Theming

### **Theme-Specific Motion Tokens**
```css
/* Humanistic - Organic, flowing animations */
[data-theme*="humanistic"] {
  --motion-easing-primary: cubic-bezier(0.34, 1.56, 0.64, 1);
  --motion-duration-fast: 200ms;
  --motion-duration-base: 350ms;
  --motion-duration-slow: 500ms;
}

/* Structured - Precise, efficient animations */
[data-theme*="structured"] {
  --motion-easing-primary: cubic-bezier(0.4, 0, 0.2, 1);
  --motion-duration-fast: 150ms;
  --motion-duration-base: 250ms;
  --motion-duration-slow: 400ms;
}
```

### **Animation Variants**
```typescript
// src/styles/motion.ts
export const getThemeMotion = (theme: 'humanistic' | 'structured') => ({
  humanistic: {
    elevateCard: {
      hover: {
        scale: 1.02,
        y: -12,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20
        }
      }
    }
  },
  structured: {
    elevateCard: {
      hover: {
        scale: 1.01,
        y: -4,
        transition: {
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1]
        }
      }
    }
  }
})[theme];
```

## Theme Switching Components

### **Theme Toggle Component**
```typescript
// src/components/ThemeToggle.tsx
export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, mode, setMode } = useTheme();
  
  return (
    <div className="theme-toggle-container">
      {/* Theme Philosophy Toggle */}
      <ToggleGroup value={theme} onValueChange={setTheme}>
        <ToggleItem value="humanistic">
          <Brain className="w-4 h-4" />
          Humanistic
        </ToggleItem>
        <ToggleItem value="structured">
          <Zap className="w-4 h-4" />
          Structured
        </ToggleItem>
      </ToggleGroup>
      
      {/* Mode Toggle */}
      <ToggleGroup value={mode} onValueChange={setMode}>
        <ToggleItem value="light">
          <Sun className="w-4 h-4" />
        </ToggleItem>
        <ToggleItem value="auto">
          <Monitor className="w-4 h-4" />
        </ToggleItem>
        <ToggleItem value="dark">
          <Moon className="w-4 h-4" />
        </ToggleItem>
      </ToggleGroup>
    </div>
  );
};
```

### **Page-Level Theme Override**
```typescript
// src/pages/VeoDemo.tsx - Force structured theme
export const VeoDemo: React.FC = () => {
  return (
    <ThemeProvider forcedTheme="structured" forcedMode="light">
      <VeoContent />
    </ThemeProvider>
  );
};
```

## Validation & Testing

### **Theme Compliance Checklist**

#### **For All Components**
- [ ] Uses only CSS custom properties (no hardcoded colors)
- [ ] Supports both theme philosophies
- [ ] Supports both light/dark modes  
- [ ] Motion respects theme characteristics
- [ ] Maintains accessibility in all variants

#### **Testing Matrix**
```typescript
// tests/theme-validation.spec.ts
describe('Theme System', () => {
  const themes = ['humanistic', 'structured'];
  const modes = ['light', 'dark'];
  
  themes.forEach(theme => {
    modes.forEach(mode => {
      test(`${theme}-${mode} theme applies correctly`, () => {
        // Test implementation
      });
      
      test(`${theme}-${mode} maintains contrast ratios`, () => {
        // Accessibility testing
      });
    });
  });
});
```

### **Theme Debugging Tools**
```typescript
// src/utils/theme-debug.ts
export const logThemeTokens = () => {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  
  const tokens = [
    '--color-background-primary',
    '--color-text-primary',
    '--color-interactive-primary'
  ];
  
  tokens.forEach(token => {
    console.log(`${token}: ${computedStyle.getPropertyValue(token)}`);
  });
};
```

## Migration Strategy

### **Phase 1: Token Migration** ✅
- [x] Establish CSS custom properties
- [x] Create theme-specific token sets
- [x] Update existing compliant components

### **Phase 2: Component Updates** 🔄
- [ ] Migrate non-compliant components to token system
- [ ] Add theme-aware styling to molecules/organisms
- [ ] Implement theme-specific motion variants

### **Phase 3: Advanced Features** ⏳
- [ ] Automatic theme switching based on content
- [ ] Custom theme builder interface
- [ ] A/B testing for theme effectiveness

## Troubleshooting

### **Common Issues**

#### **Theme Not Applying**
1. Check if ThemeProvider wraps app root
2. Verify CSS custom properties are imported
3. Ensure data-theme attribute is set on document root

#### **Component Not Responsive to Theme**
1. Replace hardcoded values with CSS custom properties
2. Add theme-specific overrides if needed
3. Test in all theme/mode combinations

#### **Performance Issues**
1. Use CSS custom properties instead of JavaScript theme switching
2. Avoid re-rendering entire component tree on theme change
3. Implement theme-aware lazy loading

---

**Theme System Version:** 1.0.0  
**Last Updated:** January 2025  
**Next Review:** End of January 2025