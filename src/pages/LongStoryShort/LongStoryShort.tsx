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
import './LongStoryShort.css';

type SectionType = 'colors' | 'gradients' | 'modes' | 'tokens' | 'mood' | 'preview';
type ThemeMode = 'light' | 'dark' | 'minimal' | 'maximal';

const LongStoryShort: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('colors');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const sections = [
    { key: 'colors' as const, label: 'Color System', icon: '🎨' },
    { key: 'gradients' as const, label: 'Gradients', icon: '🌈' },
    { key: 'modes' as const, label: 'Design Modes', icon: '🎭' },
    { key: 'tokens' as const, label: 'Design Tokens', icon: '⚙️' },
    { key: 'mood' as const, label: 'Mood Board', icon: '📋' },
    { key: 'preview' as const, label: 'Live Preview', icon: '👁️' }
  ];

  const themeModes = [
    { key: 'light' as const, label: 'Light', description: 'Clean, minimal' },
    { key: 'dark' as const, label: 'Dark', description: 'Rich, atmospheric' },
    { key: 'minimal' as const, label: 'Minimal', description: 'Maximum whitespace' },
    { key: 'maximal' as const, label: 'Maximal', description: 'Rich gradients' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'colors':
        return <ColorSystemShowcase themeMode={themeMode} />;
      case 'gradients':
        return <GradientShowcase themeMode={themeMode} />;
      case 'modes':
        return <ModeShowcase currentMode={themeMode} onModeChange={setThemeMode} />;
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
            <MLHeading level="1" className="lss-hero-title">
              Long Story Short
            </MLHeading>
            <MLText className="lss-hero-subtitle">
              Cinematic color palette adapted for modern web experiences
            </MLText>
            <p className="lss-hero-description">
              A comprehensive design system inspired by nostalgic animation aesthetics,
              featuring warm sunset tones, atmospheric gradients, and emotional depth
              perfect for contemporary digital products.
            </p>
            
            {/* Theme Mode Switcher */}
            <div className="lss-theme-switcher">
              <span className="lss-switcher-label">Theme Mode:</span>
              <div className="lss-theme-buttons">
                {themeModes.map((mode) => (
                  <button
                    key={mode.key}
                    className={`lss-theme-btn ${themeMode === mode.key ? 'active' : ''}`}
                    onClick={() => setThemeMode(mode.key)}
                    title={mode.description}
                  >
                    {mode.label}
                  </button>
                ))}
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
              <span className="lss-stat-number">3</span>
              <span className="lss-stat-label">Gradient Types</span>
            </div>
            <div className="lss-stat">
              <span className="lss-stat-number">4</span>
              <span className="lss-stat-label">Theme Modes</span>
            </div>
            <div className="lss-stat">
              <span className="lss-stat-number">80/20</span>
              <span className="lss-stat-label">Color Ratio</span>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default LongStoryShort;