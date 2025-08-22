import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { MLText, MLHeading } from '../ML';
import { useState, useEffect } from 'react';

export const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(18, 23, 42, 0.8)', 'rgba(18, 23, 42, 0.95)']
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(6px)', 'blur(16px)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/what-we-do', label: 'What We Do' },
    { path: '/approach', label: 'Approach' },
    { path: '/lab-notes', label: 'Lab Notes' },
    { path: '/contact', label: 'Get in Touch' }
  ];

  // Handle mobile menu keyboard interaction
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav 
        className={`sticky top-0 z-50 transition-all duration-base ${
          isScrolled ? 'glass backdrop-blur-nav shadow-elevation-2' : 'bg-surface/80'
        } border-b border-glass-light`}
        style={{ backgroundColor, backdropFilter: backdropBlur }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        role="navigation"
        aria-label="Main navigation"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="relative w-10 h-10 bg-gradient-to-br from-primary to-ion rounded-lg flex items-center justify-center shadow-elevation-1"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <MLText variant="caption" className="text-text-inverse font-bold font-display">ML</MLText>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-weak to-ion-weak rounded-lg opacity-0 group-hover:opacity-100"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
            >
              <MLHeading level={4} className="bg-gradient-to-r from-text to-text-weak bg-clip-text text-transparent">
                MaterialLab
              </MLHeading>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link 
                  to={item.path}
                  className={`relative font-medium font-body transition-all duration-base hover:text-ion ${
                    location.pathname === item.path 
                      ? 'text-ion' 
                      : 'text-text-weak'
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ion rounded-full"
                      layoutId="activeNav"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <ThemeToggle />
            </motion.div>
            
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden p-2 rounded-lg hover:bg-glass-light transition-colors duration-base focus:outline-none focus:ring-2 focus:ring-ion focus:ring-offset-2 focus:ring-offset-bg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6 text-text-weak" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
          className="fixed inset-0 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="fixed inset-0 bg-bg/80 backdrop-blur-modal" />
          
          <motion.div
            id="mobile-menu"
            className="fixed right-0 top-0 h-full w-80 max-w-full bg-surface border-l border-glass-light shadow-elevation-3 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="mobile-menu-title"
            aria-modal="true"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 id="mobile-menu-title" className="text-h3 font-bold font-display text-text">
                  Navigation
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-glass-light transition-colors duration-base focus:outline-none focus:ring-2 focus:ring-ion focus:ring-offset-2 focus:ring-offset-surface"
                  aria-label="Close navigation menu"
                >
                  <svg className="w-6 h-6 text-text-weak" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav role="menu">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block py-3 px-4 text-body-l font-medium text-text hover:text-ion hover:bg-glass-light rounded-lg transition-all duration-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                    role="menuitem"
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="mt-8 pt-6 border-t border-glass-light">
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.location.href = '/contact';
                    }}
                  >
                    Book a Discovery Call
                  </MagneticButton>
                </div>
              </nav>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};