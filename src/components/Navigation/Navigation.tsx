import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MLText, MLHeading } from '../ML';
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
    { path: '/offers', label: 'Offers' },
    { path: '/methodology', label: 'Methodology' },
    { path: '/ai-lab', label: 'AI Lab' }
  ];


  return (
    <>
      <nav 
        className={`sticky top-0 z-50 bg-background transition-all duration-300 ease-out ${
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
            <motion.div 
              className="relative w-10 h-10 bg-gradient-to-br from-primary to-ion rounded-lg flex items-center justify-center shadow-elevation-1"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <MLText variant="caption" className="text-text-inverse font-bold font-primary">ML</MLText>
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
                  className={`px-3 py-2 rounded-full text-sm font-normal font-primary transition-all duration-200 ease-out ${
                    location.pathname === item.path 
                      ? 'text-white bg-white/10' 
                      : 'text-white/70 hover:text-white hover:bg-white/8'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </nav>
    </>
  );
};