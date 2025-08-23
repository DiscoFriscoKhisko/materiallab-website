import React, { useState } from 'react';
import { MLText, MLHeading } from '../../../components/ML';

interface LivePreviewProps {
  themeMode: 'light' | 'dark' | 'minimal' | 'maximal';
}

export const LivePreview: React.FC<LivePreviewProps> = ({ themeMode }) => {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeInteraction, setActiveInteraction] = useState<'default' | 'hover' | 'focus' | 'active'>('default');

  const getThemeStyles = () => {
    switch (themeMode) {
      case 'light':
        return {
          background: '#FAF9F6',
          color: '#0A0A0A',
          accent: '#FF6B4A',
          surface: 'rgba(255, 255, 255, 0.9)',
          border: 'rgba(255, 107, 74, 0.1)'
        };
      case 'dark':
        return {
          background: '#0A0A0A',
          color: '#FAF9F6',
          accent: '#B8A4E3',
          surface: 'rgba(26, 26, 26, 0.9)',
          border: 'rgba(184, 164, 227, 0.2)'
        };
      case 'minimal':
        return {
          background: '#FFFFFF',
          color: '#0A0A0A',
          accent: '#FF6B4A',
          surface: 'rgba(255, 255, 255, 1)',
          border: 'rgba(255, 107, 74, 0.1)'
        };
      case 'maximal':
        return {
          background: 'linear-gradient(135deg, #FF6B4A, #FFB84D, #B8A4E3)',
          color: '#FAF9F6',
          accent: '#FFB84D',
          surface: 'rgba(26, 26, 26, 0.8)',
          border: 'rgba(255, 184, 77, 0.3)'
        };
      default:
        return {
          background: '#FAF9F6',
          color: '#0A0A0A',
          accent: '#FF6B4A',
          surface: 'rgba(255, 255, 255, 0.9)',
          border: 'rgba(255, 107, 74, 0.1)'
        };
    }
  };

  const themeStyles = getThemeStyles();

  const interactionStates = {
    default: { transform: 'none', boxShadow: '0 4px 12px rgba(255, 107, 74, 0.1)' },
    hover: { transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(255, 107, 74, 0.2)' },
    focus: { transform: 'none', boxShadow: `0 0 0 3px rgba(255, 107, 74, 0.3)` },
    active: { transform: 'translateY(1px)', boxShadow: '0 2px 8px rgba(255, 107, 74, 0.15)' }
  };

  return (
    <div className="live-preview">
      <style>{`
        .live-preview {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--lss-text-primary);
          margin-bottom: 1rem;
          font-family: var(--lss-font-display);
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: var(--lss-text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .preview-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .device-switcher,
        .interaction-switcher {
          display: flex;
          gap: 0.5rem;
          background: var(--lss-surface);
          padding: 4px;
          border-radius: 12px;
          border: 1px solid var(--lss-border);
          backdrop-filter: blur(10px);
        }

        .control-button {
          padding: 8px 16px;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--lss-text-secondary);
          transition: all var(--lss-duration-fast) var(--lss-easing);
        }

        .control-button:hover {
          background: rgba(255, 107, 74, 0.1);
          color: var(--lss-accent);
        }

        .control-button.active {
          background: var(--lss-accent);
          color: white;
          box-shadow: 0 2px 8px rgba(255, 107, 74, 0.3);
        }

        .preview-container {
          background: #f5f5f5;
          border-radius: 20px;
          padding: 3rem;
          margin-bottom: 3rem;
          border: 1px solid #e0e0e0;
          position: relative;
          overflow: hidden;
        }

        .browser-frame {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          transition: all var(--lss-duration-normal) var(--lss-easing);
        }

        .browser-frame.desktop {
          max-width: 100%;
          margin: 0 auto;
        }

        .browser-frame.tablet {
          max-width: 768px;
          margin: 0 auto;
        }

        .browser-frame.mobile {
          max-width: 375px;
          margin: 0 auto;
        }

        .browser-header {
          height: 40px;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          padding: 0 16px;
          border-bottom: 1px solid #e0e0e0;
        }

        .browser-controls {
          display: flex;
          gap: 8px;
          margin-right: 16px;
        }

        .control-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .control-dot.close { background: #ff5f57; }
        .control-dot.minimize { background: #ffbd2e; }
        .control-dot.maximize { background: #28ca42; }

        .address-bar {
          flex: 1;
          height: 24px;
          background: white;
          border-radius: 4px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          font-size: 0.75rem;
          color: #666;
          border: 1px solid #e0e0e0;
        }

        .browser-content {
          min-height: 600px;
          position: relative;
        }

        .preview-website {
          width: 100%;
          height: 100%;
          color: ${themeStyles.color};
          font-family: var(--lss-font-body);
        }

        .preview-nav {
          height: 80px;
          background: ${themeStyles.surface};
          backdrop-filter: blur(20px);
          border-bottom: 1px solid ${themeStyles.border};
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
        }

        .nav-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${themeStyles.accent};
          font-family: var(--lss-font-display);
        }

        .nav-menu {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          font-size: 0.875rem;
          font-weight: 500;
          color: ${themeStyles.color};
          text-decoration: none;
          transition: all var(--lss-duration-fast) var(--lss-easing);
          cursor: pointer;
        }

        .nav-item:hover {
          color: ${themeStyles.accent};
        }

        .preview-hero {
          background: ${themeStyles.background};
          padding: 4rem 2rem;
          text-align: center;
          position: relative;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          color: ${themeStyles.color};
          margin-bottom: 1rem;
          font-family: var(--lss-font-display);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: ${themeStyles.color};
          opacity: 0.8;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-button {
          padding: 16px 32px;
          background: ${themeStyles.accent};
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--lss-duration-normal) var(--lss-easing);
          ${activeInteraction !== 'default' ? `
            transform: ${interactionStates[activeInteraction].transform};
            box-shadow: ${interactionStates[activeInteraction].boxShadow};
          ` : ''}
        }

        .preview-content {
          background: ${themeStyles.background};
          padding: 4rem 2rem;
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .content-card {
          background: ${themeStyles.surface};
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid ${themeStyles.border};
          backdrop-filter: blur(10px);
          transition: all var(--lss-duration-normal) var(--lss-easing);
        }

        .content-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(255, 107, 74, 0.15);
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: ${themeStyles.color};
          margin-bottom: 1rem;
        }

        .card-description {
          font-size: 0.875rem;
          color: ${themeStyles.color};
          opacity: 0.7;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .card-button {
          padding: 8px 16px;
          background: transparent;
          color: ${themeStyles.accent};
          border: 1px solid ${themeStyles.accent};
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--lss-duration-fast) var(--lss-easing);
        }

        .card-button:hover {
          background: ${themeStyles.accent};
          color: white;
        }

        .preview-footer {
          background: ${themeStyles.surface};
          padding: 2rem;
          text-align: center;
          border-top: 1px solid ${themeStyles.border};
        }

        .footer-text {
          color: ${themeStyles.color};
          opacity: 0.6;
          font-size: 0.875rem;
        }

        .usage-examples {
          margin-top: 4rem;
        }

        .examples-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .example-card {
          background: var(--lss-surface);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(255, 107, 74, 0.1);
          text-align: center;
        }

        .example-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 1rem;
        }

        .example-description {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.4;
        }

        .ratio-indicator {
          margin-top: 3rem;
          text-align: center;
          background: var(--lss-surface);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(255, 107, 74, 0.1);
        }

        .ratio-visual {
          display: flex;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          margin: 1rem 0;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .ratio-primary {
          background: ${themeStyles.accent};
          flex: 8;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .ratio-secondary {
          background: linear-gradient(90deg, #1A8B9D, #B8A4E3);
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .preview-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .device-switcher,
          .interaction-switcher {
            justify-content: center;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .content-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>

      {/* Header */}
      <section className="section-header">
        <h1 className="section-title">Live Preview</h1>
        <p className="section-subtitle">
          Interactive demonstration of the Long Story Short design system in action, 
          showing real-world implementation across devices and interaction states.
        </p>
      </section>

      {/* Controls */}
      <div className="preview-controls">
        <div className="device-switcher">
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--lss-text-secondary)', marginRight: '0.5rem' }}>
            Device:
          </span>
          {(['desktop', 'tablet', 'mobile'] as const).map((device) => (
            <button
              key={device}
              className={`control-button ${activeDevice === device ? 'active' : ''}`}
              onClick={() => setActiveDevice(device)}
            >
              {device.charAt(0).toUpperCase() + device.slice(1)}
            </button>
          ))}
        </div>

        <div className="interaction-switcher">
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--lss-text-secondary)', marginRight: '0.5rem' }}>
            State:
          </span>
          {(['default', 'hover', 'focus', 'active'] as const).map((state) => (
            <button
              key={state}
              className={`control-button ${activeInteraction === state ? 'active' : ''}`}
              onClick={() => setActiveInteraction(state)}
            >
              {state.charAt(0).toUpperCase() + state.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Browser Preview */}
      <div className="preview-container">
        <div className={`browser-frame ${activeDevice}`}>
          <div className="browser-header">
            <div className="browser-controls">
              <div className="control-dot close" />
              <div className="control-dot minimize" />
              <div className="control-dot maximize" />
            </div>
            <div className="address-bar">
              https://materiallab.io/long-story-short
            </div>
          </div>
          
          <div className="browser-content">
            <div className="preview-website">
              {/* Navigation */}
              <nav className="preview-nav">
                <div className="nav-logo">MaterialLab</div>
                <ul className="nav-menu">
                  <li><a className="nav-item">Home</a></li>
                  <li><a className="nav-item">Services</a></li>
                  <li><a className="nav-item">Work</a></li>
                  <li><a className="nav-item">About</a></li>
                </ul>
              </nav>

              {/* Hero Section */}
              <section className="preview-hero">
                <h1 className="hero-title">Long Story Short</h1>
                <p className="hero-subtitle">
                  Cinematic design system bringing nostalgic warmth and emotional depth 
                  to modern digital experiences
                </p>
                <button className="hero-button">
                  Explore the System
                </button>
              </section>

              {/* Content Section */}
              <section className="preview-content">
                <div className="content-grid">
                  <div className="content-card">
                    <h3 className="card-title">Color Harmony</h3>
                    <p className="card-description">
                      Split-complementary palette creating visual interest through 
                      warm coral, cool teal, and soft lavender accents.
                    </p>
                    <button className="card-button">View Colors</button>
                  </div>
                  
                  <div className="content-card">
                    <h3 className="card-title">Atmospheric Gradients</h3>
                    <p className="card-description">
                      Subtle gradients at 8% opacity creating depth without 
                      overwhelming the content hierarchy.
                    </p>
                    <button className="card-button">See Gradients</button>
                  </div>
                  
                  <div className="content-card">
                    <h3 className="card-title">Cinematic Typography</h3>
                    <p className="card-description">
                      Playfair Display for emotional moments paired with 
                      Inter for exceptional readability.
                    </p>
                    <button className="card-button">Typography Guide</button>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="preview-footer">
                <p className="footer-text">
                  Design system implemented with intentional color ratios and accessibility standards
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>

      {/* Color Ratio Indicator */}
      <div className="ratio-indicator">
        <h3 style={{ color: 'var(--lss-text-primary)', marginBottom: '1rem' }}>
          Live Color Usage: 80/20 Rule
        </h3>
        <p style={{ color: 'var(--lss-text-secondary)', marginBottom: '1rem' }}>
          Real-time demonstration of color distribution in the preview above
        </p>
        <div className="ratio-visual">
          <div className="ratio-primary">Core Colors - 80%</div>
          <div className="ratio-secondary">Accents - 20%</div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="usage-examples">
        <h2 style={{ color: 'var(--lss-text-primary)', textAlign: 'center', marginBottom: '2rem' }}>
          Implementation Examples
        </h2>
        
        <div className="examples-grid">
          <div className="example-card">
            <h3 className="example-title">Landing Pages</h3>
            <p className="example-description">
              Hero sections with atmospheric gradients and clear typography hierarchy
            </p>
          </div>
          
          <div className="example-card">
            <h3 className="example-title">Product Showcases</h3>
            <p className="example-description">
              Card-based layouts emphasizing content with subtle accent colors
            </p>
          </div>
          
          <div className="example-card">
            <h3 className="example-title">Creative Portfolios</h3>
            <p className="example-description">
              Rich gradients and maximal mode for artistic expression
            </p>
          </div>
          
          <div className="example-card">
            <h3 className="example-title">Documentation</h3>
            <p className="example-description">
              Minimal mode with maximum readability and focus
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};