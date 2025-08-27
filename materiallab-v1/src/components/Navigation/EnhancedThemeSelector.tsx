import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface EnhancedThemeSelectorProps {
  className?: string;
}

export const EnhancedThemeSelector: React.FC<EnhancedThemeSelectorProps> = ({
  className = ''
}) => {
  const { theme, themeData, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle delayed close for better UX
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHoveredTheme(null);
    }, 300);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId as any);
    setIsOpen(false);
    setHoveredTheme(null);
  };

  return (
    <div 
      ref={containerRef}
      className={`fantasy-nav__theme-selector ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Theme Toggle Button */}
      <button
        className="fantasy-nav__theme-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select theme"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {/* Current theme swatch */}
        <motion.div
          className="theme-swatch-current"
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '4px',
            background: themeData.gradient,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fantasy-nav__theme-dropdown"
            role="menu"
            aria-label="Theme selection"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            <div className="theme-dropdown-header">
              <h3 className="theme-dropdown-title">
                Choose Theme
              </h3>
              <p className="theme-dropdown-subtitle">
                {themes.length} beautiful themes available
              </p>
            </div>

            {/* Theme Grid */}
            <div className="theme-category">
              <div className="theme-grid">
                {themes.map((themeOption) => (
                  <motion.button
                    key={themeOption.id}
                    role="menuitem"
                    className={`theme-option ${theme === themeOption.id ? 'theme-option--active' : ''}`}
                    onClick={() => handleThemeSelect(themeOption.id)}
                    onMouseEnter={() => setHoveredTheme(themeOption.id)}
                    onMouseLeave={() => setHoveredTheme(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* Theme Swatch */}
                    <div
                      className="theme-swatch"
                      style={{
                        background: themeOption.gradient,
                        border: theme === themeOption.id 
                          ? `2px solid ${themeOption.color}` 
                          : '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {/* Active indicator */}
                      {theme === themeOption.id && (
                        <motion.div
                          className="theme-swatch-indicator"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        </motion.div>
                      )}
                    </div>

                    {/* Theme Info */}
                    <div className="theme-info">
                      <span className="theme-name">{themeOption.name}</span>
                      <span className="theme-description">{themeOption.description}</span>
                    </div>

                    {/* Hover glow effect */}
                    {hoveredTheme === themeOption.id && (
                      <motion.div
                        className="theme-option-glow"
                        style={{
                          background: `${themeOption.color}15`
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="theme-dropdown-footer">
              <p className="theme-current-info">
                Current: <strong>{themeData.name}</strong>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .theme-dropdown-header {
          padding: 16px 16px 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 8px;
        }

        .theme-dropdown-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--nav-text-initial);
          margin: 0 0 4px;
          letter-spacing: -0.01em;
        }

        .theme-dropdown-subtitle {
          font-size: 0.75rem;
          color: var(--nav-text-initial);
          opacity: 0.7;
          margin: 0;
        }

        .theme-category {
          margin-bottom: 16px;
        }

        .theme-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2px;
          padding: 0 8px;
        }

        .theme-option {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 8px;
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          text-align: left;
          transition: background-color 0.15s ease;
        }

        .theme-option:hover {
          background: rgba(255, 255, 255, 0.04);
        }

        .theme-option--active {
          background: rgba(255, 255, 255, 0.06);
        }

        .theme-option-glow {
          position: absolute;
          inset: -2px;
          border-radius: 8px;
          pointer-events: none;
        }

        .theme-swatch {
          position: relative;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .theme-swatch-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .theme-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .theme-name {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--nav-text-initial);
          line-height: 1.2;
        }

        .theme-description {
          font-size: 0.6875rem;
          color: var(--nav-text-initial);
          opacity: 0.7;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .theme-dropdown-footer {
          padding: 8px 16px 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 8px;
        }

        .theme-current-info {
          font-size: 0.75rem;
          color: var(--nav-text-initial);
          opacity: 0.8;
          margin: 0;
        }

        .theme-current-info strong {
          color: var(--nav-text-active);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};