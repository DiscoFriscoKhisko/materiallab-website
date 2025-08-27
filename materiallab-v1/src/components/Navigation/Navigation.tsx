import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { MaterialLabLogo } from '../Logo';
import { EnhancedThemeSelector } from './EnhancedThemeSelector';
import '../../styles/navigation-system.css';

export const Navigation = () => {
  const location = useLocation();
  const [isCondensed, setIsCondensed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const focusableElementsRef = useRef<NodeListOf<HTMLElement> | null>(null);

  // Track scroll position for condensed state
  useEffect(() => {
    let ticking = false;
    const condensedThreshold = 40;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsCondensed(scrollY >= condensedThreshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body overflow when menu is open
  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/work', label: 'Work' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/insights', label: 'Insights' }
  ];

  const openMenu = () => {
    if (isMenuOpen) return;
    
    setIsMenuOpen(true);
    
    // Update ARIA attributes
    if (menuToggleRef.current) {
      menuToggleRef.current.setAttribute('aria-expanded', 'true');
      menuToggleRef.current.setAttribute('aria-label', 'Close menu');
    }
    
    // Setup focus trap
    setupFocusTrap();
    
    // Focus the close button
    requestAnimationFrame(() => {
      menuCloseRef.current?.focus();
    });
  };

  const closeMenu = () => {
    if (!isMenuOpen) return;
    
    setIsMenuOpen(false);
    
    // Update ARIA attributes
    if (menuToggleRef.current) {
      menuToggleRef.current.setAttribute('aria-expanded', 'false');
      menuToggleRef.current.setAttribute('aria-label', 'Open menu');
    }
    
    // Return focus to menu toggle
    requestAnimationFrame(() => {
      menuToggleRef.current?.focus();
    });
  };

  const setupFocusTrap = () => {
    if (menuOverlayRef.current) {
      focusableElementsRef.current = menuOverlayRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
    
    // Focus trapping
    if (isMenuOpen && e.key === 'Tab' && focusableElementsRef.current) {
      const focusableElements = focusableElementsRef.current;
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isMenuOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === menuOverlayRef.current) {
      closeMenu();
    }
  };

  


  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Header */}
      <header className={`header ${isCondensed ? 'condensed' : ''}`} id="header">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-full">Material Lab</span>
            <span className="logo-short">ML</span>
          </Link>

          {/* Desktop Navigation Links (Hidden in Fantasy style) */}
          <nav aria-label="Main navigation">
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions Container */}
          <div className="nav-actions">
            {/* Enhanced Theme Selector */}
            <EnhancedThemeSelector />
            
            {/* Menu Button */}
            <button 
              ref={menuToggleRef}
              className="cat-button" 
              onClick={openMenu}
              aria-controls="global-menu" 
              aria-expanded={isMenuOpen} 
              aria-label="Open menu"
            >
              <span className="menu-text">Menu</span>
              <span className="cat-face" aria-hidden="true">&gt;^.^&lt;</span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <div 
        ref={menuOverlayRef}
        className={`menu-overlay ${isMenuOpen ? 'open' : ''}`} 
        id="global-menu" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="menu-title"
        onClick={handleOverlayClick}
      >
        <h2 id="menu-title" className="menu-title">Site Menu</h2>
        
        <button 
          ref={menuCloseRef}
          className="close-button" 
          onClick={closeMenu}
          aria-label="Close menu"
        >
          ×
        </button>
        
        <div className="menu-content">
          {/* Primary Navigation Links */}
          <ul className="menu-links">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};