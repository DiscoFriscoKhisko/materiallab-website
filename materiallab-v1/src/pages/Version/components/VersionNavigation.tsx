import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const VersionNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'services', 'studio', 'playground', 'journal', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'What We Imagine' },
    { id: 'studio', label: 'The Studio' },
    { id: 'playground', label: 'Playground' },
    { id: 'journal', label: 'Our Journal' },
    { id: 'contact', label: "Let's Talk" },
  ];

  return (
    <motion.nav
      className={`version-nav ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="version-nav-container">
        {/* Logo */}
        <Link to="/" className="version-logo">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Material Lab
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="version-nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`version-nav-link ${
                activeSection === item.id ? 'active' : ''
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="nav-indicator"
                  layoutId="nav-indicator"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={() => scrollToSection('playground')}
          className="version-btn version-btn-primary nav-cta"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter the Playground
        </motion.button>
      </div>

      <style jsx>{`
        .version-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1rem 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(0px);
          background: rgba(255, 255, 255, 0);
        }

        .version-nav.scrolled {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem 0;
        }

        .version-nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 40px);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .version-logo {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          letter-spacing: -0.01em;
        }

        .version-nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .version-nav-link {
          position: relative;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 0.5rem 0;
        }

        .version-nav-link:hover,
        .version-nav-link.active {
          color: var(--text-primary);
        }

        .nav-indicator {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #4DA6FF, #52E5B7);
          border-radius: 1px;
        }

        .nav-cta {
          font-size: 0.9rem;
          padding: 0.75rem 1.5rem;
        }

        @media (max-width: 1024px) {
          .version-nav-links {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .version-nav-container {
            padding: 0 1rem;
          }
          
          .version-logo {
            font-size: 1.25rem;
          }
          
          .nav-cta {
            font-size: 0.85rem;
            padding: 0.625rem 1.25rem;
          }
        }
      `}</style>
    </motion.nav>
  );
};