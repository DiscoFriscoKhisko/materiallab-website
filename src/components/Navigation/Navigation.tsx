import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MLText, MLHeading } from '../ML';
import { ThemeToggle } from '../ThemeToggle';
import { Button } from '../UI';
import { MaterialLabLogo } from '../Logo';
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
    { path: '/services', label: 'Services' },
    { path: '/work', label: 'Work' },
    { path: '/approach', label: 'Approach' },
    { path: '/about', label: 'About' },
    { path: '/insights', label: 'Insights' }
  ];


  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out ${
        isScrolled 
          ? 'py-3' 
          : 'py-4'
      }`}
      style={{
        background: isScrolled 
          ? 'rgba(var(--surface-rgb, 255, 255, 255), 0.95)' 
          : 'rgba(var(--surface-rgb, 255, 255, 255), 0.85)',
        backdropFilter: isScrolled 
          ? 'blur(20px) saturate(180%)' 
          : 'blur(20px) saturate(150%)',
        borderBottom: isScrolled 
          ? '1px solid var(--outline-variant)' 
          : 'none',
        boxShadow: isScrolled 
          ? 'var(--elevation-1)' 
          : 'none'
      }}
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.05, 0.7, 0.1, 1]
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/" 
              className="group"
            >
              <MaterialLabLogo 
                size="md" 
                showText={true}
                animated={true}
                className="group"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              >
                <Link 
                  to={item.path}
                  className={`
                    font-veo text-sm font-medium 
                    px-3 py-2 rounded-lg
                    transition-all duration-200 ease-out
                    relative overflow-hidden
                    ${location.pathname === item.path 
                      ? 'text-primary' 
                      : 'text-on-surface hover:text-primary'
                    }
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20
                    active:scale-95
                  `}
                  style={{
                    backgroundColor: location.pathname === item.path 
                      ? 'var(--veo-hover-overlay, rgba(26, 115, 232, 0.04))' 
                      : 'transparent',
                    backdropFilter: location.pathname === item.path ? 'blur(8px)' : undefined
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.backgroundColor = 'var(--veo-hover-overlay, rgba(26, 115, 232, 0.04))';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.path) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                  {/* Google-style ripple effect container */}
                  <span className="absolute inset-0 rounded-lg overflow-hidden">
                    <span 
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-150"
                      style={{ backgroundColor: 'rgba(26, 115, 232, 0.12)' }}
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side Actions */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Try Demo CTA */}
            <Link to="/veo">
              <Button
                variant="outlined"
                size="sm"
                className="
                  border-blue-600 text-blue-600 
                  hover:bg-blue-50 hover:shadow-lg
                  font-veo font-medium px-4 py-2.5 
                  transition-all duration-200 ease-out
                  focus-visible:ring-2 focus-visible:ring-blue-500/20
                  active:scale-95 active:bg-blue-100
                  rounded-lg
                "
                style={{
                  border: '1.5px solid #1a73e8'
                }}
              >
                Try Demo
              </Button>
            </Link>
            
            {/* Start Building CTA */}
            <Link to="/contact">
              <Button
                variant="filled"
                size="sm"
                className="
                  bg-blue-600 text-white 
                  hover:shadow-lg
                  font-veo font-medium px-5 py-2.5 
                  transition-all duration-200 ease-out
                  focus-visible:ring-2 focus-visible:ring-blue-500/20
                  active:scale-95
                  rounded-lg
                  relative overflow-hidden
                "
                style={{
                  background: '#1a73e8',
                  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)'
                }}
              >
                Start Building
                {/* Button state layer */}
                <span className="absolute inset-0 bg-white/0 hover:bg-white/8 active:bg-white/12 transition-colors duration-150" />
              </Button>
            </Link>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </motion.div>

          {/* Mobile menu button - TODO: Implement mobile menu */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </motion.nav>
  );
};