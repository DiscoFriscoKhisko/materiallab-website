import { type ReactNode, useEffect } from 'react';
import { Navigation } from '../Navigation/Navigation';
import { useAccessibilityPreferences, useAnnouncer } from '../../hooks/useAccessibility';
import { useTheme } from '../../contexts/ThemeContext';

interface LayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

export const Layout = ({ 
  children, 
  showNavigation = true
}: LayoutProps) => {
  const { prefersReducedMotion, prefersHighContrast } = useAccessibilityPreferences();
  const { announce } = useAnnouncer();
  const { theme } = useTheme();

  // Apply accessibility classes to root element
  useEffect(() => {
    const root = document.documentElement;
    
    if (prefersReducedMotion) {
      root.classList.add('prefers-reduced-motion');
    } else {
      root.classList.remove('prefers-reduced-motion');
    }
    
    if (prefersHighContrast) {
      root.classList.add('prefers-high-contrast');
    } else {
      root.classList.remove('prefers-high-contrast');
    }
  }, [prefersReducedMotion, prefersHighContrast]);
  return (
    <div className={`lss-layout min-h-screen transition-all duration-500 ${theme}`}>
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="lss-skip-link"
        tabIndex={1}
        onClick={() => announce('Navigating to main content')}
      >
        Skip to main content
      </a>

      {showNavigation && <Navigation />}
      
      <main 
        id="main-content" 
        className="lss-main-content relative z-10" 
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>
    </div>
  );
};