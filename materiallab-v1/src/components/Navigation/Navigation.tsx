import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MLText, MLHeading } from '../ML';
import { Button } from '../UI';
import { MaterialLabLogo } from '../Logo';
import { EnhancedThemeSelector, LSS_THEME_ID } from './EnhancedThemeSelector';
import { useState, useEffect } from 'react';
import '../../styles/navigation-system.css';

export const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<LSS_THEME_ID>('v1-original');

  // Track scroll position for glass morphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/work', label: 'Work' },
    { path: '/insights', label: 'Insights' },
    { path: '/contact', label: 'Contact' }
  ];

  const handleThemeChange = (themeId: LSS_THEME_ID) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-lss-theme', themeId);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  return (
    <>
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link"
        onFocus={() => console.log('Skip link focused')}
      >
        Skip to main content
      </a>

      <motion.nav 
        className={`fantasy-nav ${
          isScrolled ? 'fantasy-nav--scrolled' : ''
        }`}
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.4, 0, 0.2, 1],
          opacity: { duration: 0.6 }
        }}
      >
        <div className="fantasy-nav__container">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link 
              to="/" 
              className="fantasy-nav__logo"
              onClick={closeMobileMenu}
            >
              <MaterialLabLogo 
                size="md" 
                showText={true}
                animated={true}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="fantasy-nav__links">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 + 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <Link 
                  to={item.path}
                  className={`fantasy-nav__link ${
                    location.pathname === item.path 
                      ? 'fantasy-nav__link--active' 
                      : ''
                  }`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side Actions */}
          <motion.div 
            className="fantasy-nav__actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* CTA Buttons */}
            <div className="fantasy-nav__cta">
              <Link 
                to="/veo" 
                className="fantasy-nav__button fantasy-nav__button--outlined"
                onClick={closeMobileMenu}
              >
                Try Demo
              </Link>
              
              <Link 
                to="/contact" 
                className="fantasy-nav__button fantasy-nav__button--filled"
                onClick={closeMobileMenu}
              >
                Start Building
              </Link>
            </div>
            
            {/* Enhanced Theme Selector */}
            <EnhancedThemeSelector
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
            />
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button 
            className="fantasy-nav__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.div>
          </button>

        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fantasy-nav__mobile-menu fantasy-nav__mobile-menu--open"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Mobile Navigation Links */}
              <div className="fantasy-nav__mobile-links">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link 
                      to={item.path}
                      className={`fantasy-nav__mobile-link ${
                        location.pathname === item.path 
                          ? 'fantasy-nav__mobile-link--active' 
                          : ''
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <motion.div
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link 
                  to="/veo" 
                  className="fantasy-nav__button fantasy-nav__button--outlined w-full justify-center"
                  onClick={closeMobileMenu}
                >
                  Try Demo
                </Link>
                
                <Link 
                  to="/contact" 
                  className="fantasy-nav__button fantasy-nav__button--filled w-full justify-center"
                  onClick={closeMobileMenu}
                >
                  Start Building
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};