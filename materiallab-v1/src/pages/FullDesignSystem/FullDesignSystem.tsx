import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '../../components/Layout/Layout';
import { MLText, MLHeading } from '../../components/ML';
import { ComponentLibrary } from './components/ComponentLibrary/ComponentLibrary';
import { PageTemplates } from './components/PageTemplates/PageTemplates';
import { InteractionPatterns } from './components/InteractionPatterns/InteractionPatterns';
import { MicroAnimations } from './components/MicroAnimations/MicroAnimations';
import './FullDesignSystem.css';

type SectionType = 'components' | 'templates' | 'interactions' | 'animations' | 'playground';
type ThemeMode = 'light' | 'dark' | 'minimal' | 'maximal';

const FullDesignSystem: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('components');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  // Respect user's motion preferences and system settings
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial state based on user preference
    setIsAnimationEnabled(!prefersReducedMotion.matches);
    
    // Listen for changes in motion preference
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsAnimationEnabled(!e.matches);
    };
    
    prefersReducedMotion.addEventListener('change', handleMotionChange);
    
    return () => {
      prefersReducedMotion.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            setActiveSection('components');
            break;
          case '2':
            event.preventDefault();
            setActiveSection('templates');
            break;
          case '3':
            event.preventDefault();
            setActiveSection('interactions');
            break;
          case '4':
            event.preventDefault();
            setActiveSection('animations');
            break;
          case '5':
            event.preventDefault();
            setActiveSection('playground');
            break;
        }
      }
      
      if (event.key === 'Escape') {
        // Clear focus from any focused element
        (document.activeElement as HTMLElement)?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sections = [
    { key: 'components' as const, label: 'Component Library', icon: '🧩', description: 'Interactive UI components' },
    { key: 'templates' as const, label: 'Page Templates', icon: '📄', description: 'Complete page layouts' },
    { key: 'interactions' as const, label: 'Interaction Patterns', icon: '⚡', description: 'User experience patterns' },
    { key: 'animations' as const, label: 'Micro-animations', icon: '✨', description: 'Motion design library' },
    { key: 'playground' as const, label: 'Playground', icon: '🎮', description: 'Interactive testing' }
  ];

  const themeModes = [
    { key: 'light' as const, label: 'Light', description: 'Gallery clarity', color: '#FF6B4A' },
    { key: 'dark' as const, label: 'Dark', description: 'Cinematic depth', color: '#B8A4E3' },
    { key: 'minimal' as const, label: 'Minimal', description: 'Zen focus', color: '#FF6B4A' },
    { key: 'maximal' as const, label: 'Maximal', description: 'Rich abundance', color: '#FFB84D' }
  ];

  const renderContent = () => {
    const contentProps = { themeMode, isAnimationEnabled };
    
    switch (activeSection) {
      case 'components':
        return <ComponentLibrary {...contentProps} />;
      case 'templates':
        return <PageTemplates {...contentProps} />;
      case 'interactions':
        return <InteractionPatterns {...contentProps} />;
      case 'animations':
        return <MicroAnimations {...contentProps} />;
      case 'playground':
        return (
          <div className="fds-playground">
            <MLHeading level="2">Interactive Playground</MLHeading>
            <MLText>Coming soon: Interactive component testing environment</MLText>
          </div>
        );
      default:
        return <ComponentLibrary {...contentProps} />;
    }
  };

  return (
    <Layout>
      {/* Skip Navigation */}
      <a href="#main-content" className="fds-skip-link">
        Skip to main content
      </a>
      <div 
        className={`fds-showcase ${themeMode} ${isAnimationEnabled ? 'animations-enabled' : 'animations-disabled'}`}
        role="application"
        aria-label="Full Design System Showcase"
      >
        {/* Enhanced Hero Section */}
        <motion.header 
          className="fds-hero"
          role="banner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="fds-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <MLHeading level="1" className="fds-hero-title" id="page-title">
                Full Design System
              </MLHeading>
              <MLText className="fds-hero-subtitle">
                Complete component library with micro-animations & interaction patterns
              </MLText>
              <p className="fds-hero-description">
                A comprehensive design system featuring sophisticated micro-animations, 
                advanced interaction patterns, and four distinct visual modes. 
                Every component is crafted with meticulous attention to detail and 
                designed for accessibility and inclusivity.
              </p>
              <div className="fds-accessibility-notice" role="note" aria-label="Accessibility information">
                <p><strong>Accessibility:</strong> All components meet WCAG 2.1 AA standards. Use keyboard shortcuts Ctrl+1-5 to navigate sections quickly. Press Tab to navigate interactively or Escape to clear focus.</p>
              </div>
            </motion.div>

            {/* Enhanced Theme Mode Switcher */}
            <motion.div 
              className="fds-theme-switcher"
              role="group"
              aria-labelledby="theme-switcher-label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span id="theme-switcher-label" className="fds-switcher-label">Design Mode:</span>
              <div className="fds-theme-buttons">
                {themeModes.map((mode, index) => (
                  <motion.button
                    key={mode.key}
                    className={`fds-theme-btn ${themeMode === mode.key ? 'active' : ''}`}
                    onClick={() => setThemeMode(mode.key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setThemeMode(mode.key);
                      }
                    }}
                    title={mode.description}
                    aria-label={`Switch to ${mode.label} mode: ${mode.description}`}
                    aria-pressed={themeMode === mode.key}
                    style={{ '--mode-color': mode.color } as React.CSSProperties}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <span className="fds-theme-btn-label">{mode.label}</span>
                    <span className="fds-theme-btn-desc">{mode.description}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Enhanced Visual Element */}
          <motion.div 
            className="fds-hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="fds-gradient-orb">
              <div className="fds-gradient-layers">
                <div className="fds-gradient-layer layer-1"></div>
                <div className="fds-gradient-layer layer-2"></div>
                <div className="fds-gradient-layer layer-3"></div>
              </div>
            </div>
          </motion.div>
        </motion.header>

        {/* Enhanced Navigation */}
        <motion.nav 
          className="fds-nav"
          role="navigation"
          aria-label="Design system sections"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="fds-nav-container">
            {sections.map((section, index) => (
              <motion.button
                key={section.key}
                className={`fds-nav-item ${activeSection === section.key ? 'active' : ''}`}
                onClick={() => setActiveSection(section.key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveSection(section.key);
                  }
                }}
                aria-current={activeSection === section.key ? 'page' : undefined}
                aria-label={`${section.label}: ${section.description}`}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
              >
                <span className="fds-nav-icon">{section.icon}</span>
                <div className="fds-nav-content">
                  <span className="fds-nav-label">{section.label}</span>
                  <span className="fds-nav-description">{section.description}</span>
                </div>
                {activeSection === section.key && (
                  <motion.div
                    className="fds-nav-indicator"
                    layoutId="nav-indicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.nav>

        {/* Content with Page Transitions */}
        <main className="fds-content" id="main-content" role="main" aria-label="Design system showcase content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -20, y: -10 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.4, 0.0, 0.2, 1],
                staggerChildren: 0.05
              }}
              className="fds-section-content"
              role="region"
              aria-label={`${sections.find(s => s.key === activeSection)?.label} section`}
              aria-live="polite"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Animation Control */}
        <motion.div 
          className="fds-animation-control"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
        >
          <button
            className={`fds-animation-toggle ${isAnimationEnabled ? 'enabled' : 'disabled'}`}
            onClick={() => setIsAnimationEnabled(!isAnimationEnabled)}
            title={`${isAnimationEnabled ? 'Disable' : 'Enable'} animations`}
            aria-label={`${isAnimationEnabled ? 'Disable' : 'Enable'} animations. Currently ${isAnimationEnabled ? 'enabled' : 'disabled'}`}
            aria-pressed={isAnimationEnabled}
          >
            <span className="fds-animation-icon">
              {isAnimationEnabled ? '🎬' : '⏸️'}
            </span>
            <span className="fds-animation-label">
              {isAnimationEnabled ? 'Animations On' : 'Animations Off'}
            </span>
          </button>
        </motion.div>

        {/* Stats Footer */}
        <motion.footer 
          className="fds-footer"
          role="contentinfo"
          aria-label="Design system statistics"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="fds-stats">
            <motion.div 
              className="fds-stat" 
              whileHover={{ scale: 1.05 }}
              role="img"
              aria-label="50 plus components available"
            >
              <span className="fds-stat-number">50+</span>
              <span className="fds-stat-label">Components</span>
            </motion.div>
            <motion.div 
              className="fds-stat" 
              whileHover={{ scale: 1.05 }}
              role="img"
              aria-label="15 plus page templates available"
            >
              <span className="fds-stat-number">15+</span>
              <span className="fds-stat-label">Page Templates</span>
            </motion.div>
            <motion.div 
              className="fds-stat" 
              whileHover={{ scale: 1.05 }}
              role="img"
              aria-label="25 plus interaction patterns available"
            >
              <span className="fds-stat-number">25+</span>
              <span className="fds-stat-label">Interactions</span>
            </motion.div>
            <motion.div 
              className="fds-stat" 
              whileHover={{ scale: 1.05 }}
              role="img"
              aria-label="4 distinct design modes available"
            >
              <span className="fds-stat-number">4</span>
              <span className="fds-stat-label">Design Modes</span>
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </Layout>
  );
};

export default FullDesignSystem;