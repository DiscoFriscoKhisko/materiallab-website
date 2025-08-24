import React, { useState } from 'react';
import { DocsLayout } from './layouts/DocsLayout';
import { 
  // Atoms
  GradientShowcase,
  DesignTokensDisplay, 
  TypographyPlayground,
  TypographySpecimen,
  DocumentationDisplay,
  // Molecules  
  ModeShowcase,
  // Organisms
  ColorSystemShowcase,
  LivePreview,
  MoodBoardSection 
} from './atomic';
import './LongStoryShort.css';
import '../../styles/typography-enhanced.css';
import '../../styles/typography-system.css';
import './tokens/experimental-tokens.css';

type SectionType = 'colors' | 'gradients' | 'modes' | 'tokens' | 'mood' | 'preview' | 'typography' | 'type-specimen' | 'docs';
type ThemeMode = 'light' | 'dark' | 'minimal' | 'maximal' | 'night-interior' | 'day-exterior' | 'golden-hour' | 'intimate' | 'dramatic' | 'memory';

const LongStoryShort: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('colors');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const sections = [
    { key: 'colors' as const, label: 'Color System', icon: '🎨' },
    { key: 'gradients' as const, label: 'Gradients', icon: '🌈' },
    { key: 'modes' as const, label: 'Design Modes', icon: '🎭' },
    { key: 'typography' as const, label: 'Typography', icon: '✍️' },
    { key: 'type-specimen' as const, label: 'Type Specimen', icon: '📋' },
    { key: 'tokens' as const, label: 'Design Tokens', icon: '⚙️' },
    { key: 'mood' as const, label: 'Mood Board', icon: '🎭' },
    { key: 'preview' as const, label: 'Live Preview', icon: '👁️' },
    { key: 'docs' as const, label: 'Documentation', icon: '📚' }
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
      case 'type-specimen':
        return <TypographySpecimen className={themeMode} />;
      case 'tokens':
        return <DesignTokensDisplay themeMode={themeMode} />;
      case 'mood':
        return <MoodBoardSection themeMode={themeMode} />;
      case 'preview':
        return <LivePreview themeMode={themeMode} />;
      case 'docs':
        return <DocumentationDisplay themeMode={themeMode} />;
      default:
        return <ColorSystemShowcase themeMode={themeMode} />;
    }
  };

  return (
    <DocsLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      themeMode={themeMode}
      onThemeChange={setThemeMode}
    >
      <div className={`lss-showcase ${themeMode}`}>
        {/* Hero Section */}
        <section className="lss-hero">
          <div className="lss-hero-content">
            <h1 className="lss-hero-title ml-typo-hero">
              Long Story Short
            </h1>
            <p className="lss-hero-subtitle ml-typo-display-3">
              Experimental Design System
            </p>
            <p className="lss-hero-description ml-typo-body-lg typo-expert">
              Your playground for testing new designs. When we approve something here,
              it gets copied to the main Material Lab website. Use the sidebar to
              switch between all 10 theme modes and explore components.
            </p>
          </div>
          <div className="lss-hero-visual">
            <div className="lss-gradient-orb"></div>
          </div>
        </section>

        {/* Content */}
        <main className="lss-content">
          {renderContent()}
        </main>

        {/* Footer Stats */}
        <footer className="lss-footer">
          <div className="lss-stats">
            <div className="lss-stat">
              <span className="lss-stat-number">10</span>
              <span className="lss-stat-label">Theme Modes</span>
            </div>
            <div className="lss-stat">
              <span className="lss-stat-number">8</span>
              <span className="lss-stat-label">Components</span>
            </div>
            <div className="lss-stat">
              <span className="lss-stat-number">3</span>
              <span className="lss-stat-label">Categories</span>
            </div>
            <div className="lss-stat">
              <span className="lss-stat-number">WCAG AA</span>
              <span className="lss-stat-label">Accessibility</span>
            </div>
          </div>
        </footer>
      </div>
    </DocsLayout>
  );
};

export default LongStoryShort;