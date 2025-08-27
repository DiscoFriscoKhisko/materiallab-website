import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from './Navigation';
import { LSS_THEMES, LSS_THEME_ID } from './EnhancedThemeSelector';

/**
 * Demo component to test navigation across all LSS themes
 * This helps ensure consistent appearance and behavior
 */
export const NavigationDemo: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<LSS_THEME_ID>('v1-original');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleThemeChange = (themeId: LSS_THEME_ID) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-lss-theme', themeId);
    // Apply theme colors to CSS custom properties
    const theme = LSS_THEMES[themeId];
    document.documentElement.style.setProperty('--demo-primary', theme.colors.primary);
    document.documentElement.style.setProperty('--demo-secondary', theme.colors.secondary);
    document.documentElement.style.setProperty('--demo-background', theme.colors.background);
    document.documentElement.style.setProperty('--demo-surface', theme.colors.surface);
  };

  return (
    <div className="navigation-demo">
      {/* Demo Controls */}
      <div className="demo-controls">
        <div className="control-section">
          <h3>Theme Selection</h3>
          <div className="theme-grid">
            {Object.entries(LSS_THEMES).map(([id, theme]) => (
              <button
                key={id}
                className={`theme-button ${currentTheme === id ? 'active' : ''}`}
                onClick={() => handleThemeChange(id as LSS_THEME_ID)}
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
                }}
              >
                <span className="theme-name">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="control-section">
          <h3>Scroll State</h3>
          <div className="scroll-controls">
            <button
              className={`scroll-button ${!isScrolled ? 'active' : ''}`}
              onClick={() => setIsScrolled(false)}
            >
              Initial State
            </button>
            <button
              className={`scroll-button ${isScrolled ? 'active' : ''}`}
              onClick={() => setIsScrolled(true)}
            >
              Scrolled State
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Preview */}
      <div className="navigation-preview">
        <div 
          className="preview-container"
          style={{
            background: LSS_THEMES[currentTheme].colors.background,
            minHeight: '400px'
          }}
        >
          {/* Simulate scrolled state */}
          <div style={{ transform: `translateY(${isScrolled ? '-10px' : '0px'})` }}>
            <Navigation />
          </div>
          
          {/* Demo content */}
          <div className="demo-content">
            <motion.div
              className="demo-hero"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h1 style={{ color: LSS_THEMES[currentTheme].colors.primary }}>
                {LSS_THEMES[currentTheme].name} Theme
              </h1>
              <p style={{ color: LSS_THEMES[currentTheme].colors.secondary }}>
                {LSS_THEMES[currentTheme].description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Theme Information */}
      <div className="theme-info">
        <h3>Current Theme: {LSS_THEMES[currentTheme].name}</h3>
        <div className="color-palette">
          <div 
            className="color-swatch"
            style={{ background: LSS_THEMES[currentTheme].colors.primary }}
          >
            Primary
          </div>
          <div 
            className="color-swatch"
            style={{ background: LSS_THEMES[currentTheme].colors.secondary }}
          >
            Secondary
          </div>
          <div 
            className="color-swatch"
            style={{ background: LSS_THEMES[currentTheme].colors.background }}
          >
            Background
          </div>
          <div 
            className="color-swatch"
            style={{ background: LSS_THEMES[currentTheme].colors.surface }}
          >
            Surface
          </div>
        </div>
      </div>

      <style jsx>{`
        .navigation-demo {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .demo-controls {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .control-section {
          margin-bottom: 24px;
        }

        .control-section:last-child {
          margin-bottom: 0;
        }

        .control-section h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #1f2937;
        }

        .theme-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 12px;
        }

        .theme-button {
          position: relative;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          color: white;
          font-weight: 500;
          font-size: 0.875rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
        }

        .theme-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .theme-button.active {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
        }

        .theme-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.1);
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .theme-button:hover::before {
          opacity: 1;
        }

        .theme-name {
          position: relative;
          z-index: 1;
        }

        .scroll-controls {
          display: flex;
          gap: 8px;
        }

        .scroll-button {
          padding: 8px 16px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }

        .scroll-button:hover {
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .scroll-button.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .navigation-preview {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

        .preview-container {
          position: relative;
          transition: background 0.3s ease;
        }

        .demo-content {
          padding: 120px 32px 64px;
          text-align: center;
        }

        .demo-hero h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .demo-hero p {
          font-size: 1.125rem;
          opacity: 0.8;
        }

        .theme-info {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .theme-info h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: #1f2937;
        }

        .color-palette {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 12px;
        }

        .color-swatch {
          padding: 16px 12px;
          border-radius: 8px;
          text-align: center;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .navigation-demo {
            padding: 16px;
          }

          .theme-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          }

          .demo-content {
            padding: 100px 20px 40px;
          }

          .demo-hero h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};