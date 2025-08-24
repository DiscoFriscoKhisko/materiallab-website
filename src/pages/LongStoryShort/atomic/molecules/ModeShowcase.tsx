import React from 'react';
import { MLText, MLHeading } from '../../../../components/ML';

interface ModeShowcaseProps {
  currentMode: 'light' | 'dark' | 'minimal' | 'maximal' | 'night-interior' | 'day-exterior' | 'golden-hour' | 'intimate' | 'dramatic' | 'memory';
  onModeChange: (mode: 'light' | 'dark' | 'minimal' | 'maximal' | 'night-interior' | 'day-exterior' | 'golden-hour' | 'intimate' | 'dramatic' | 'memory') => void;
}

interface ThemeMode {
  key: 'light' | 'dark' | 'minimal' | 'maximal' | 'night-interior' | 'day-exterior' | 'golden-hour' | 'intimate' | 'dramatic' | 'memory';
  name: string;
  description: string;
  philosophy: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  characteristics: string[];
  useCases: string[];
  version?: string;
}

export const ModeShowcase: React.FC<ModeShowcaseProps> = ({ currentMode, onModeChange }) => {
  const themeModes: ThemeMode[] = [
    {
      key: 'light',
      name: 'V1 Light Mode',
      description: 'Clean, minimal aesthetic with high contrast and maximum readability',
      philosophy: 'Clarity through simplicity - every element serves a clear purpose',
      primaryColor: '#FF6B4A',
      backgroundColor: '#FAF9F6',
      textColor: '#0A0A0A',
      accentColor: '#FF6B4A',
      version: 'V1',
      characteristics: [
        'High contrast ratios (19:1)',
        'Extensive white space',
        'Subtle shadow elevation',
        'Warm, approachable tones'
      ],
      useCases: [
        'Documentation sites',
        'Professional portfolios', 
        'Content-heavy applications',
        'Accessibility-first designs'
      ]
    },
    {
      key: 'dark',
      name: 'V1 Dark Mode',
      description: 'Rich, atmospheric design with soft contrasts and cinematic depth',
      philosophy: 'Emotional depth through atmospheric lighting and subtle gradients',
      primaryColor: '#B8A4E3',
      backgroundColor: '#0A0A0A',
      textColor: '#FAF9F6',
      accentColor: '#B8A4E3',
      version: 'V1',
      characteristics: [
        'Soft lavender accents',
        'Reduced eye strain',
        'Enhanced focus states',
        'Cinematic atmosphere'
      ],
      useCases: [
        'Creative applications',
        'Entertainment platforms',
        'Late-night usage scenarios',
        'Immersive experiences'
      ]
    },
    {
      key: 'minimal',
      name: 'V1 Minimal Mode',
      description: 'Maximum whitespace with single accent color for ultimate focus',
      philosophy: 'Less is more - inspired by minimalist art movement principles',
      primaryColor: '#FF6B4A',
      backgroundColor: '#FFFFFF',
      textColor: '#0A0A0A',
      accentColor: '#FF6B4A',
      version: 'V1',
      characteristics: [
        'Maximum whitespace (80%+)',
        'Single accent color only',
        'Pure geometric forms',
        'Absolute clarity of intent'
      ],
      useCases: [
        'Landing pages',
        'Art galleries',
        'Product showcases',
        'Meditation apps'
      ]
    },
    {
      key: 'maximal',
      name: 'V1 Maximal Mode',
      description: 'Rich gradients and layered depth inspired by contemporary maximalism',
      philosophy: 'Intentional abundance - every gradient and color choice deliberate',
      primaryColor: '#FFB84D',
      backgroundColor: '#0A0A0A',
      textColor: '#FAF9F6',
      accentColor: '#FFB84D',
      version: 'V1',
      characteristics: [
        'Multi-color gradients',
        'Layered visual depth',
        'Rich atmospheric effects',
        'Golden hour aesthetics'
      ],
      useCases: [
        'Brand experiences',
        'Creative showcases',
        'Festival websites',
        'Art installations'
      ]
    },
    
    // Film-Inspired Modes
    {
      key: 'night-interior',
      name: 'Night Interior',
      description: 'Deep black base with warm amber interior lighting',
      philosophy: 'Cinematic intimacy through warm practical lighting against darkness',
      primaryColor: '#FFA500',
      backgroundColor: '#0A0A0A',
      textColor: '#FAF9F6',
      accentColor: '#FFA500',
      version: 'Film',
      characteristics: [
        'Pure black base (#0A0A0A)',
        'Warm amber accents (#FFA500)',
        'Soft warm grey text (#C0B5A7)',
        'Interior lighting atmosphere'
      ],
      useCases: [
        'Movie streaming platforms',
        'Night mode applications',
        'Creative portfolios',
        'Entertainment apps'
      ]
    },
    {
      key: 'day-exterior',
      name: 'Day Exterior',
      description: 'Pure white base with natural sky blue accents',
      philosophy: 'Natural daylight clarity with outdoor freshness',
      primaryColor: '#87CEEB',
      backgroundColor: '#FFFFFF',
      textColor: '#0A0A0A',
      accentColor: '#87CEEB',
      version: 'Film',
      characteristics: [
        'Pure white base (#FFFFFF)',
        'Sky blue accents (#87CEEB)',
        'Natural light feeling',
        'Clean outdoor aesthetic'
      ],
      useCases: [
        'Travel applications',
        'Weather apps',
        'Outdoor activity platforms',
        'Nature-focused sites'
      ]
    },
    {
      key: 'golden-hour',
      name: 'Golden Hour',
      description: 'Warm white base with golden orange sunset tones',
      philosophy: 'Capturing the magic hour warmth and nostalgia',
      primaryColor: '#FF8E53',
      backgroundColor: '#FFFAF5',
      textColor: '#2C1810',
      accentColor: '#FF8E53',
      version: 'Film',
      characteristics: [
        'Warm white base (#FFFAF5)',
        'Golden orange accent (#FF8E53)',
        'Sunset atmosphere',
        'Nostalgic warmth'
      ],
      useCases: [
        'Photography portfolios',
        'Lifestyle brands',
        'Romantic applications',
        'Memory-focused platforms'
      ]
    },
    {
      key: 'intimate',
      name: 'Intimate',
      description: 'Soft white base with warm gold interior lighting',
      philosophy: 'Cozy interior warmth creating personal connection',
      primaryColor: '#D4A574',
      backgroundColor: '#FAF9F6',
      textColor: '#1A1612',
      accentColor: '#D4A574',
      version: 'Film',
      characteristics: [
        'Soft white base (#FAF9F6)',
        'Warm gold accent (#D4A574)',
        'Cozy atmosphere',
        'Personal feeling'
      ],
      useCases: [
        'Personal blogs',
        'Boutique brands',
        'Wellness apps',
        'Interior design platforms'
      ]
    },
    {
      key: 'dramatic',
      name: 'Dramatic',
      description: 'Pure black base with high-contrast dramatic red',
      philosophy: 'Maximum contrast for emotional impact and focus',
      primaryColor: '#FF4444',
      backgroundColor: '#000000',
      textColor: '#FFFFFF',
      accentColor: '#FF4444',
      version: 'Film',
      characteristics: [
        'Pure black base (#000000)',
        'Dramatic red accent (#FF4444)',
        'Maximum contrast',
        'Bold emotional impact'
      ],
      useCases: [
        'Gaming platforms',
        'Action sports sites',
        'Music streaming',
        'Bold brand statements'
      ]
    },
    {
      key: 'memory',
      name: 'Memory',
      description: 'Near-white base with nostalgic faded gold',
      philosophy: 'Soft nostalgia through muted warm tones',
      primaryColor: '#C9A882',
      backgroundColor: '#FAFAFA',
      textColor: '#3A3532',
      accentColor: '#C9A882',
      version: 'Film',
      characteristics: [
        'Near-white base (#FAFAFA)',
        'Faded gold accent (#C9A882)',
        'Nostalgic feeling',
        'Soft, dreamy atmosphere'
      ],
      useCases: [
        'Memory apps',
        'Photo galleries',
        'Heritage sites',
        'Vintage-themed platforms'
      ]
    }
  ];

  const ModeCard: React.FC<{ mode: ThemeMode; isActive: boolean }> = ({ mode, isActive }) => (
    <div 
      className={`mode-card ${isActive ? 'active' : ''}`}
      onClick={() => onModeChange(mode.key)}
      style={{
        background: isActive ? mode.backgroundColor : 'var(--lss-surface)',
        color: isActive ? mode.textColor : 'var(--lss-text-primary)',
        borderColor: isActive ? mode.accentColor : 'rgba(255, 107, 74, 0.1)'
      }}
    >
      <div className="mode-preview" style={{ background: mode.backgroundColor }}>
        <div className="preview-elements">
          <div className="preview-header" style={{ background: mode.accentColor }}>
            <div className="preview-nav">
              <div className="nav-item"></div>
              <div className="nav-item"></div>
              <div className="nav-item"></div>
            </div>
          </div>
          <div className="preview-content" style={{ color: mode.textColor }}>
            <div className="content-block large"></div>
            <div className="content-block small"></div>
            <div className="content-block medium"></div>
          </div>
          {mode.key === 'maximal' && (
            <div 
              className="preview-gradient"
              style={{ background: 'linear-gradient(135deg, #FF6B4A, #FFB84D, #B8A4E3)' }}
            />
          )}
        </div>
      </div>
      
      <div className="mode-info">
        <h3 className="mode-name">{mode.name}</h3>
        <p className="mode-description">{mode.description}</p>
        <div className="mode-philosophy">
          <strong>Philosophy:</strong> {mode.philosophy}
        </div>
        
        <div className="mode-characteristics">
          <h4>Key Characteristics:</h4>
          <ul>
            {mode.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>
        
        <div className="mode-use-cases">
          <h4>Best For:</h4>
          <ul>
            {mode.useCases.map((useCase, index) => (
              <li key={index}>{useCase}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const currentModeData = themeModes.find(mode => mode.key === currentMode);

  return (
    <div className="mode-showcase">
      <style>{`
        .mode-showcase {
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

        .current-mode-display {
          background: var(--lss-surface);
          border-radius: 20px;
          padding: 3rem;
          margin-bottom: 4rem;
          text-align: center;
          border: 2px solid var(--lss-accent);
          backdrop-filter: blur(20px);
        }

        .current-mode-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--lss-accent);
          margin-bottom: 1rem;
          font-family: var(--lss-font-display);
        }

        .current-mode-description {
          font-size: 1.125rem;
          color: var(--lss-text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .mode-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .mode-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--lss-text-secondary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .modes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .mode-card {
          border: 2px solid;
          border-radius: 20px;
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          transition: all var(--lss-duration-normal) var(--lss-easing);
          background: var(--lss-surface);
        }

        .mode-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(255, 107, 74, 0.2);
        }

        .mode-card.active {
          box-shadow: 0 16px 50px rgba(255, 107, 74, 0.3);
          transform: translateY(-8px);
        }

        .mode-preview {
          height: 160px;
          position: relative;
          overflow: hidden;
        }

        .preview-elements {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          bottom: 12px;
          border-radius: 12px;
          overflow: hidden;
          background: inherit;
        }

        .preview-header {
          height: 24px;
          display: flex;
          align-items: center;
          padding: 0 12px;
        }

        .preview-nav {
          display: flex;
          gap: 4px;
        }

        .nav-item {
          width: 20px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 1px;
        }

        .preview-content {
          padding: 16px 12px;
          height: calc(100% - 24px);
        }

        .content-block {
          height: 8px;
          border-radius: 4px;
          background: currentColor;
          opacity: 0.1;
          margin-bottom: 8px;
        }

        .content-block.large {
          width: 80%;
        }

        .content-block.medium {
          width: 60%;
        }

        .content-block.small {
          width: 40%;
        }

        .preview-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          opacity: 0.3;
        }

        .mode-info {
          padding: 2rem;
        }

        .mode-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          font-family: var(--lss-font-display);
        }

        .mode-description {
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }

        .mode-philosophy {
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(255, 107, 74, 0.05);
          border-radius: 8px;
          border-left: 3px solid var(--lss-accent);
        }

        .mode-philosophy strong {
          font-weight: 600;
        }

        .mode-characteristics,
        .mode-use-cases {
          margin-bottom: 1.5rem;
        }

        .mode-characteristics h4,
        .mode-use-cases h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          opacity: 0.9;
        }

        .mode-characteristics ul,
        .mode-use-cases ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .mode-characteristics li,
        .mode-use-cases li {
          font-size: 0.75rem;
          padding: 0.25rem 0;
          opacity: 0.7;
          border-left: 2px solid var(--lss-accent);
          padding-left: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .comparison-section {
          margin-top: 4rem;
          background: var(--lss-surface);
          border-radius: 20px;
          padding: 3rem;
          border: 1px solid rgba(255, 107, 74, 0.1);
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }

        .comparison-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 12px;
          background: rgba(255, 107, 74, 0.05);
          transition: all 0.2s ease;
        }

        .comparison-item:hover {
          background: rgba(255, 107, 74, 0.1);
        }

        .comparison-mode {
          font-weight: 600;
          color: var(--lss-text-primary);
          min-width: 80px;
        }

        .comparison-vs {
          color: var(--lss-text-secondary);
          font-size: 0.875rem;
        }

        .comparison-description {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          flex: 1;
        }

        @media (max-width: 768px) {
          .modes-grid {
            grid-template-columns: 1fr;
          }
          
          .comparison-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 2rem;
          }

          .current-mode-display {
            padding: 2rem;
          }

          .mode-stats {
            gap: 1rem;
          }
        }
      `}</style>

      {/* Header */}
      <section className="section-header">
        <h1 className="section-title">Design Modes</h1>
        <p className="section-subtitle">
          Four distinct aesthetic approaches, each optimized for different contexts and emotional experiences.
        </p>
      </section>

      {/* Current Mode Display */}
      {currentModeData && (
        <div className="current-mode-display">
          <h2 className="current-mode-title">Currently Viewing: {currentModeData.name}</h2>
          <p className="current-mode-description">{currentModeData.philosophy}</p>
          
          <div className="mode-stats">
            <div className="mode-stat">
              <span className="stat-label">Primary</span>
              <div className="stat-value" style={{ background: currentModeData.primaryColor }}>
                {currentModeData.primaryColor}
              </div>
            </div>
            <div className="mode-stat">
              <span className="stat-label">Background</span>
              <div className="stat-value" style={{ background: currentModeData.backgroundColor, color: currentModeData.textColor }}>
                Aa
              </div>
            </div>
            <div className="mode-stat">
              <span className="stat-label">Text</span>
              <div className="stat-value" style={{ background: currentModeData.textColor, color: currentModeData.backgroundColor }}>
                Aa
              </div>
            </div>
            <div className="mode-stat">
              <span className="stat-label">Accent</span>
              <div className="stat-value" style={{ background: currentModeData.accentColor }}>
                ✓
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode Grid */}
      <div className="modes-grid">
        {themeModes.map((mode) => (
          <ModeCard 
            key={mode.key} 
            mode={mode} 
            isActive={currentMode === mode.key}
          />
        ))}
      </div>

      {/* Mode Comparisons */}
      <div className="comparison-section">
        <h2 style={{ color: 'var(--lss-text-primary)', marginBottom: '1rem', textAlign: 'center' }}>
          When to Use Each Mode
        </h2>
        <p style={{ color: 'var(--lss-text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>
          Strategic guidelines for choosing the right aesthetic approach
        </p>
        
        <div className="comparison-grid">
          <div className="comparison-item">
            <span className="comparison-mode">Light</span>
            <span className="comparison-vs">vs</span>
            <span className="comparison-description">
              Professional contexts requiring maximum readability
            </span>
          </div>
          
          <div className="comparison-item">
            <span className="comparison-mode">Dark</span>
            <span className="comparison-vs">vs</span>
            <span className="comparison-description">
              Creative applications with atmospheric depth
            </span>
          </div>
          
          <div className="comparison-item">
            <span className="comparison-mode">Minimal</span>
            <span className="comparison-vs">vs</span>
            <span className="comparison-description">
              Focus-driven experiences with single objectives
            </span>
          </div>
          
          <div className="comparison-item">
            <span className="comparison-mode">Maximal</span>
            <span className="comparison-vs">vs</span>
            <span className="comparison-description">
              Brand experiences requiring emotional impact
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};