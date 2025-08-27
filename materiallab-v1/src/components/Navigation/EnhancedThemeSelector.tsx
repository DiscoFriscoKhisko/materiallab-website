import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// LSS Theme definitions with visual characteristics
export const LSS_THEMES = {
  'v1-original': {
    id: 'v1-original',
    name: 'V1 Original',
    description: 'Classic Material Lab aesthetic',
    colors: {
      primary: '#FF6F61',
      secondary: '#55C2FF',
      background: '#FAFAFA',
      surface: '#FFFFFF'
    },
    category: 'Original'
  },
  'cyberpunk': {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon-soaked future noir',
    colors: {
      primary: '#FF0080',
      secondary: '#00FFFF',
      background: '#0A0A0A',
      surface: '#1A1A2E'
    },
    category: 'Film-Inspired'
  },
  'blade-runner': {
    id: 'blade-runner',
    name: 'Blade Runner',
    description: 'Dystopian neo-noir atmosphere',
    colors: {
      primary: '#FFB84D',
      secondary: '#FF6B4A',
      background: '#0B0F1A',
      surface: '#1E2A4A'
    },
    category: 'Film-Inspired'
  },
  'matrix': {
    id: 'matrix',
    name: 'Matrix',
    description: 'Digital rain and green terminals',
    colors: {
      primary: '#00FF41',
      secondary: '#008F11',
      background: '#000000',
      surface: '#001100'
    },
    category: 'Film-Inspired'
  },
  'tron': {
    id: 'tron',
    name: 'Tron',
    description: 'Electric blue digital grid',
    colors: {
      primary: '#00D4FF',
      secondary: '#FFB84D',
      background: '#000814',
      surface: '#001D3D'
    },
    category: 'Film-Inspired'
  },
  'her': {
    id: 'her',
    name: 'Her',
    description: 'Warm, intimate AI romance',
    colors: {
      primary: '#FF6B6B',
      secondary: '#FFB84D',
      background: '#FFF8F0',
      surface: '#FFFFFF'
    },
    category: 'Film-Inspired'
  },
  'ex-machina': {
    id: 'ex-machina',
    name: 'Ex Machina',
    description: 'Minimalist AI laboratory',
    colors: {
      primary: '#E0E0E0',
      secondary: '#B0BEC5',
      background: '#F5F5F5',
      surface: '#FFFFFF'
    },
    category: 'Film-Inspired'
  },
  'interstellar': {
    id: 'interstellar',
    name: 'Interstellar',
    description: 'Cosmic dust and endless space',
    colors: {
      primary: '#D4A574',
      secondary: '#8B7355',
      background: '#1A1611',
      surface: '#2A2116'
    },
    category: 'Film-Inspired'
  },
  'arrival': {
    id: 'arrival',
    name: 'Arrival',
    description: 'Misty communication with the unknown',
    colors: {
      primary: '#7A8471',
      secondary: '#A8B4A5',
      background: '#2F3228',
      surface: '#3A4031'
    },
    category: 'Film-Inspired'
  },
  'minority-report': {
    id: 'minority-report',
    name: 'Minority Report',
    description: 'Pre-crime interface blue',
    colors: {
      primary: '#4DA6FF',
      secondary: '#80BFFF',
      background: '#F0F4F7',
      surface: '#FFFFFF'
    },
    category: 'Film-Inspired'
  }
} as const;

export type LSS_THEME_ID = keyof typeof LSS_THEMES;

interface EnhancedThemeSelectorProps {
  currentTheme: LSS_THEME_ID;
  onThemeChange: (themeId: LSS_THEME_ID) => void;
  className?: string;
}

export const EnhancedThemeSelector: React.FC<EnhancedThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<LSS_THEME_ID | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const currentThemeData = LSS_THEMES[currentTheme];

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

  const handleThemeSelect = (themeId: LSS_THEME_ID) => {
    onThemeChange(themeId);
    setIsOpen(false);
    setHoveredTheme(null);
  };

  // Group themes by category
  const themesByCategory = Object.entries(LSS_THEMES).reduce((acc, [id, theme]) => {
    if (!acc[theme.category]) {
      acc[theme.category] = [];
    }
    acc[theme.category].push({ id: id as LSS_THEME_ID, ...theme });
    return acc;
  }, {} as Record<string, Array<{ id: LSS_THEME_ID } & typeof LSS_THEMES[LSS_THEME_ID]>>);

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
            background: `linear-gradient(135deg, ${currentThemeData.colors.primary} 0%, ${currentThemeData.colors.secondary} 100%)`,
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
                {Object.keys(LSS_THEMES).length} cinematic themes available
              </p>
            </div>

            {/* Theme Categories */}
            {Object.entries(themesByCategory).map(([category, themes]) => (
              <div key={category} className="theme-category">
                <h4 className="theme-category-title">{category}</h4>
                
                <div className="theme-grid">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      role="menuitem"
                      className={`theme-option ${currentTheme === theme.id ? 'theme-option--active' : ''}`}
                      onClick={() => handleThemeSelect(theme.id)}
                      onMouseEnter={() => setHoveredTheme(theme.id)}
                      onMouseLeave={() => setHoveredTheme(null)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                    >
                      {/* Theme Swatch */}
                      <div
                        className="theme-swatch"
                        style={{
                          background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
                          border: currentTheme === theme.id 
                            ? `2px solid ${theme.colors.primary}` 
                            : '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {/* Active indicator */}
                        {currentTheme === theme.id && (
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
                        <span className="theme-name">{theme.name}</span>
                        <span className="theme-description">{theme.description}</span>
                      </div>

                      {/* Hover glow effect */}
                      {hoveredTheme === theme.id && (
                        <motion.div
                          className="theme-option-glow"
                          style={{
                            background: `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.secondary}15)`
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
            ))}

            {/* Footer */}
            <div className="theme-dropdown-footer">
              <p className="theme-current-info">
                Current: <strong>{currentThemeData.name}</strong>
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

        .theme-category:last-of-type {
          margin-bottom: 8px;
        }

        .theme-category-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--nav-text-initial);
          opacity: 0.8;
          margin: 0 0 8px;
          padding: 0 16px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
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