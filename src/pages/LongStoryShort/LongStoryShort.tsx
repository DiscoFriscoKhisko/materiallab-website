import React, { useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { MLText, MLHeading } from '../../components/ML';
import { Button } from '../../components/UI/Button';
import { ColorSystemShowcase } from './components/ColorSystemShowcase';
import { GradientShowcase } from './components/GradientShowcase';
import { ModeShowcase } from './components/ModeShowcase';
import { DesignTokensDisplay } from './components/DesignTokensDisplay';
import { MoodBoardSection } from './components/MoodBoardSection';
import { LivePreview } from './components/LivePreview';
import { TypographyPlayground } from './components/TypographyPlayground';
import { TypeTester } from './components/TypeTester';
import './LongStoryShort.css';
import '../../styles/typography-enhanced.css';

type SectionType = 'colors' | 'gradients' | 'modes' | 'tokens' | 'mood' | 'preview' | 'typography' | 'type-tester';
type ThemeMode = 'light' | 'dark' | 'minimal' | 'maximal' | 'night-interior' | 'day-exterior' | 'golden-hour' | 'intimate' | 'dramatic' | 'memory';

const LongStoryShort: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('colors');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const sections = [
    { key: 'colors' as const, label: 'Color System', icon: '🎨' },
    { key: 'gradients' as const, label: 'Gradients', icon: '🌈' },
    { key: 'modes' as const, label: 'Design Modes', icon: '🎭' },
    { key: 'typography' as const, label: 'Typography', icon: '✍️' },
    { key: 'type-tester' as const, label: 'Type Tester', icon: '🔍' },
    { key: 'tokens' as const, label: 'Design Tokens', icon: '⚙️' },
    { key: 'mood' as const, label: 'Mood Board', icon: '📋' },
    { key: 'preview' as const, label: 'Live Preview', icon: '👁️' }
  ];

  const themeModes = [
    // V1 Original Modes
    { key: 'light' as const, label: 'V1 Light', description: 'Gallery clarity', version: 'V1' },
    { key: 'dark' as const, label: 'V1 Dark', description: 'Cinematic depth', version: 'V1' },
    { key: 'minimal' as const, label: 'V1 Minimal', description: 'Zen focus', version: 'V1' },
    { key: 'maximal' as const, label: 'V1 Maximal', description: 'Rich abundance', version: 'V1' },
    
    // Film-Inspired Modes
    { key: 'night-interior' as const, label: 'Night Interior', description: 'Amber-lit intimacy', version: 'Film' },
    { key: 'day-exterior' as const, label: 'Day Exterior', description: 'Natural daylight', version: 'Film' },
    { key: 'golden-hour' as const, label: 'Golden Hour', description: 'Sunset warmth', version: 'Film' },
    { key: 'intimate' as const, label: 'Intimate', description: 'Cozy interior', version: 'Film' },
    { key: 'dramatic' as const, label: 'Dramatic', description: 'High contrast', version: 'Film' },
    { key: 'memory' as const, label: 'Memory', description: 'Nostalgic fade', version: 'Film' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'colors':
        return <ColorSystemShowcase themeMode={themeMode} />;
      case 'gradients':
        return <GradientShowcase themeMode={themeMode} />;
      case 'modes':
        return <ModeShowcase currentMode={themeMode} onModeChange={setThemeMode} />;
      case 'typography':
        return <TypographyPlayground themeMode={themeMode} />;
      case 'type-tester':
        return <TypeTester themeMode={themeMode} />;
      case 'tokens':
        return <DesignTokensDisplay themeMode={themeMode} />;
      case 'mood':
        return <MoodBoardSection themeMode={themeMode} />;
      case 'preview':
        return <LivePreview themeMode={themeMode} />;
      default:
        return <ColorSystemShowcase themeMode={themeMode} />;
    }
  };

  return (
    <Layout>
      <div className={`lss-showcase ${themeMode}`}>
        {/* Hero Section */}
        <section className="lss-hero">
          <div className="lss-hero-content">
            <h1 className="lss-hero-title ml-typo-hero">
              Long Story Short
            </h1>
            <p className="lss-hero-subtitle ml-typo-display-3">
              Cinematic color palette adapted for modern web experiences
            </p>
            <p className="lss-hero-description ml-typo-body-lg typo-expert">
              A comprehensive design system inspired by nostalgic animation aesthetics,
              featuring warm sunset tones, atmospheric gradients, and emotional depth
              perfect for contemporary digital products.
            </p>
            
            {/* Theme Mode Switcher */}
            <div className="lss-theme-switcher">
              <span className="lss-switcher-label">Theme Mode:</span>
              
              {/* V1 Original Modes */}
              <div className="lss-mode-section">
                <span className="lss-version-label">Original (V1):</span>
                <div className="lss-theme-buttons">
                  {themeModes.filter(mode => mode.version === 'V1').map((mode) => (
                    <button
                      key={mode.key}
                      className={`lss-theme-btn ${themeMode === mode.key ? 'active' : ''} v1-mode`}
                      onClick={() => setThemeMode(mode.key)}
                      title={mode.description}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Film-Inspired Modes */}
              <div className="lss-mode-section">
                <span className="lss-version-label">Film-Inspired:</span>
                <div className="lss-theme-buttons">
                  {themeModes.filter(mode => mode.version === 'Film').map((mode) => (
                    <button
                      key={mode.key}
                      className={`lss-theme-btn ${themeMode === mode.key ? 'active' : ''} film-mode`}
                      onClick={() => setThemeMode(mode.key)}
                      title={mode.description}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lss-hero-visual">
            <div className="lss-gradient-orb"></div>
          </div>
        </section>

        {/* Navigation */}
        <nav className="lss-nav">
          <div className="lss-nav-container">
            {sections.map((section) => (
              <button
                key={section.key}
                className={`lss-nav-item ${activeSection === section.key ? 'active' : ''}`}
                onClick={() => setActiveSection(section.key)}
              >
                <span className="lss-nav-icon">{section.icon}</span>
                <span className="lss-nav-label">{section.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main className="lss-content">
          {renderContent()}
        </main>

        {/* Footer Stats */}
        <footer className="lss-footer">
          <div className="lss-stats">
            <div className="lss-stat">
              <span className="lss-stat-number">7</span>
              <span className="lss-stat-label">Core Colors</span>
            </div>
            <div className="lss-stat">
              <span className="lss-stat-number">17</span>
              <span className="lss-stat-label">Typography Styles</span>
            </div>
            <div className="lss-stat">
              <span className="lss-stat-number">10</span>
              <span className="lss-stat-label">Theme Modes</span>
            </div>
            <div className="lss-stat">
              <span className="lss-stat-number">WCAG AA</span>
              <span className="lss-stat-label">Accessibility</span>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default LongStoryShort;