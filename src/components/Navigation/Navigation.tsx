import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MLText, MLHeading } from '../ML';
import { ThemeToggle } from '../ThemeToggle';
import { useState, useEffect } from 'react';

export const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for navigation state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/what-we-do', label: 'Services' },
    { path: '/approach', label: 'Approach' },
    { path: '/work', label: 'Work' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];


  return (
    <>
      <nav 
        className={`sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant transition-all duration-300 ease-out ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row items-center gap-4 w-full transition-all duration-300 ease-out ${
          isScrolled 
            ? 'justify-center md:justify-center min-h-14' 
            : 'justify-center md:justify-between min-h-20'
        }`}>
          {/* Logo - Hidden when scrolled */}
          <Link 
            to="/" 
            className={`flex items-center space-x-3 group transition-all duration-300 ease-out ${
              isScrolled 
                ? 'opacity-0 scale-75 pointer-events-none w-0 overflow-hidden md:absolute md:-left-full' 
                : 'opacity-100 scale-100'
            }`}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <MLText variant="caption" className="text-on-primary font-bold font-primary">ML</MLText>
            </div>
            <MLHeading level={4} className="text-text font-display font-semibold">
              MaterialLab
            </MLHeading>
          </Link>

          {/* Navigation Links - Centered when scrolled */}
          <div className={`flex items-center flex-wrap gap-6 transition-all duration-300 ease-out ${
            isScrolled 
              ? 'justify-center order-none' 
              : 'justify-center md:justify-end order-2 md:order-none'
          }`}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link 
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out ${
                    location.pathname === item.path 
                      ? 'text-primary bg-primary-container' 
                      : 'text-text-weak hover:text-text hover:bg-surface-1'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            
            {/* Theme Toggle */}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      </nav>
    </>
  );
};