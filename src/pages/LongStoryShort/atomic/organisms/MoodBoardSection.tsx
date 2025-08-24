import React, { useState } from 'react';
import { MLText, MLHeading } from '../../../../components/ML';

interface MoodBoardSectionProps {
  themeMode: 'light' | 'dark' | 'minimal' | 'maximal';
}

interface MoodItem {
  type: 'color' | 'texture' | 'emotion' | 'reference';
  title: string;
  description: string;
  visual?: string;
  keywords?: string[];
}

interface ColorHarmony {
  name: string;
  description: string;
  colors: string[];
  psychology: string;
}

export const MoodBoardSection: React.FC<MoodBoardSectionProps> = ({ themeMode }) => {
  const [activeSection, setActiveSection] = useState<'inspiration' | 'harmony' | 'psychology' | 'materials'>('inspiration');

  const inspirationReferences: MoodItem[] = [
    {
      type: 'reference',
      title: 'Cinematic Warmth',
      description: 'Nostalgic animation aesthetics with sunset-lit scenes creating emotional depth',
      visual: 'linear-gradient(135deg, #FF6B4A, #FFB84D)',
      keywords: ['nostalgic', 'cinematic', 'warm', 'emotional']
    },
    {
      type: 'reference',
      title: 'Atmospheric Depth',
      description: 'Layered compositions with soft gradients and atmospheric perspective',
      visual: 'radial-gradient(circle at 30% 70%, rgba(184,164,227,0.6), transparent)',
      keywords: ['atmospheric', 'depth', 'layered', 'soft']
    },
    {
      type: 'reference',
      title: 'Character Moments',
      description: 'Intimate storytelling through color temperature and lighting changes',
      visual: 'linear-gradient(180deg, #1A8B9D, #0A0A0A)',
      keywords: ['intimate', 'storytelling', 'character', 'lighting']
    },
    {
      type: 'reference',
      title: 'Natural Transitions',
      description: 'Seamless color flows mimicking natural light progression',
      visual: 'linear-gradient(90deg, #FF6B4A, #FFB84D, #B8A4E3)',
      keywords: ['natural', 'transitions', 'light', 'progression']
    }
  ];

  const colorHarmonies: ColorHarmony[] = [
    {
      name: 'Split-Complementary',
      description: 'Primary coral with teal and lavender creating dynamic tension',
      colors: ['#FF6B4A', '#1A8B9D', '#B8A4E3'],
      psychology: 'Creates visual interest while maintaining harmony through careful color relationships'
    },
    {
      name: 'Warm Analogous',
      description: 'Sunset progression from coral through golden hour',
      colors: ['#FF6B4A', '#FFB84D', '#FFE066'],
      psychology: 'Evokes comfort, warmth, and optimism through related warm hues'
    },
    {
      name: 'Cool Accents',
      description: 'Teal and lavender providing cooling contrast to warm palette',
      colors: ['#1A8B9D', '#B8A4E3', '#7DD3FC'],
      psychology: 'Offers respite and balance, preventing overwhelming warmth'
    },
    {
      name: 'Neutral Foundation',
      description: 'Sophisticated greys and off-whites for grounding',
      colors: ['#0A0A0A', '#7A756F', '#FAF9F6'],
      psychology: 'Provides stability and allows vibrant colors to shine'
    }
  ];

  const emotionalTones = [
    {
      emotion: 'Nostalgic',
      description: 'Warm, slightly muted tones that evoke memory and longing',
      color: '#FF6B4A',
      intensity: 85,
      associations: ['childhood', 'golden hour', 'comfort', 'wistful']
    },
    {
      emotion: 'Dreamy',
      description: 'Soft gradients and atmospheric effects creating ethereal quality',
      color: '#B8A4E3',
      intensity: 70,
      associations: ['imagination', 'fantasy', 'soft focus', 'magical']
    },
    {
      emotion: 'Cinematic',
      description: 'Rich contrasts and dramatic lighting inspired by film',
      color: '#1A8B9D',
      intensity: 90,
      associations: ['storytelling', 'drama', 'depth', 'narrative']
    },
    {
      emotion: 'Optimistic',
      description: 'Bright, energetic tones suggesting hope and possibility',
      color: '#FFB84D',
      intensity: 80,
      associations: ['energy', 'hope', 'brightness', 'positivity']
    }
  ];

  const materialReferences = [
    {
      name: 'Film Grain',
      description: 'Subtle texture adding nostalgic, analog quality',
      visual: 'repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,107,74,0.02) 1deg, transparent 2deg)',
      application: 'Overlay on large surfaces for organic feel'
    },
    {
      name: 'Soft Glass',
      description: 'Frosted glass effect with subtle color tinting',
      visual: 'rgba(255, 255, 255, 0.1)',
      application: 'Cards, modals, and layered interfaces'
    },
    {
      name: 'Atmospheric Blur',
      description: 'Depth-of-field effects creating focus hierarchy',
      visual: 'blur(20px) saturate(180%)',
      application: 'Background elements and transitions'
    },
    {
      name: 'Light Scatter',
      description: 'Soft light diffusion mimicking natural lighting',
      visual: 'drop-shadow(0 0 20px rgba(255,107,74,0.3))',
      application: 'Accent elements and call-to-actions'
    }
  ];

  const ColorHarmonyCard: React.FC<{ harmony: ColorHarmony }> = ({ harmony }) => (
    <div className="harmony-card">
      <div className="harmony-colors">
        {harmony.colors.map((color, index) => (
          <div 
            key={index}
            className="harmony-swatch"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      <div className="harmony-info">
        <h3 className="harmony-name">{harmony.name}</h3>
        <p className="harmony-description">{harmony.description}</p>
        <div className="harmony-psychology">
          <strong>Psychology:</strong> {harmony.psychology}
        </div>
      </div>
    </div>
  );

  const EmotionalToneCard: React.FC<{ tone: typeof emotionalTones[0] }> = ({ tone }) => (
    <div className="emotion-card">
      <div className="emotion-header">
        <div 
          className="emotion-indicator"
          style={{ backgroundColor: tone.color }}
        />
        <h3 className="emotion-name">{tone.emotion}</h3>
      </div>
      <p className="emotion-description">{tone.description}</p>
      <div className="emotion-intensity">
        <span className="intensity-label">Intensity:</span>
        <div className="intensity-bar">
          <div 
            className="intensity-fill"
            style={{ 
              width: `${tone.intensity}%`,
              backgroundColor: tone.color 
            }}
          />
        </div>
        <span className="intensity-value">{tone.intensity}%</span>
      </div>
      <div className="emotion-associations">
        {tone.associations.map((association, index) => (
          <span key={index} className="association-tag">
            {association}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mood-board-section">
      <style>{`
        .mood-board-section {
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

        .mood-nav {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
        }

        .mood-nav-item {
          padding: 12px 24px;
          border: 2px solid rgba(255, 107, 74, 0.2);
          background: transparent;
          border-radius: 12px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--lss-text-secondary);
          transition: all var(--lss-duration-normal) var(--lss-easing);
        }

        .mood-nav-item:hover {
          border-color: var(--lss-accent);
          color: var(--lss-accent);
          transform: translateY(-1px);
        }

        .mood-nav-item.active {
          background: var(--lss-accent);
          color: white;
          border-color: var(--lss-accent);
          box-shadow: 0 4px 16px rgba(255, 107, 74, 0.3);
        }

        .inspiration-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .inspiration-card {
          background: var(--lss-surface);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 107, 74, 0.1);
          transition: all var(--lss-duration-normal) var(--lss-easing);
        }

        .inspiration-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(255, 107, 74, 0.2);
        }

        .inspiration-visual {
          height: 120px;
          position: relative;
        }

        .inspiration-content {
          padding: 2rem;
        }

        .inspiration-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 0.75rem;
        }

        .inspiration-description {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .inspiration-keywords {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .keyword-tag {
          padding: 4px 8px;
          background: rgba(255, 107, 74, 0.1);
          color: var(--lss-accent);
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .harmony-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .harmony-card {
          background: var(--lss-surface);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(255, 107, 74, 0.1);
          transition: all var(--lss-duration-normal) var(--lss-easing);
        }

        .harmony-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 107, 74, 0.15);
        }

        .harmony-colors {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .harmony-swatch {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid rgba(255, 107, 74, 0.2);
          cursor: pointer;
          transition: all var(--lss-duration-fast) var(--lss-easing);
        }

        .harmony-swatch:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .harmony-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 0.75rem;
        }

        .harmony-description {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .harmony-psychology {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          font-style: italic;
          padding: 1rem;
          background: rgba(255, 107, 74, 0.05);
          border-radius: 8px;
          border-left: 3px solid var(--lss-accent);
        }

        .emotions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .emotion-card {
          background: var(--lss-surface);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(255, 107, 74, 0.1);
          transition: all var(--lss-duration-normal) var(--lss-easing);
        }

        .emotion-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 107, 74, 0.15);
        }

        .emotion-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .emotion-indicator {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .emotion-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--lss-text-primary);
        }

        .emotion-description {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .emotion-intensity {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .intensity-label {
          font-size: 0.75rem;
          color: var(--lss-text-secondary);
          font-weight: 500;
          min-width: 60px;
        }

        .intensity-bar {
          flex: 1;
          height: 8px;
          background: rgba(255, 107, 74, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .intensity-fill {
          height: 100%;
          transition: width var(--lss-duration-normal) var(--lss-easing);
        }

        .intensity-value {
          font-size: 0.75rem;
          color: var(--lss-text-primary);
          font-weight: 600;
          min-width: 40px;
        }

        .emotion-associations {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .association-tag {
          padding: 4px 8px;
          background: rgba(184, 164, 227, 0.1);
          color: #B8A4E3;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .materials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .material-card {
          background: var(--lss-surface);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(255, 107, 74, 0.1);
          transition: all var(--lss-duration-normal) var(--lss-easing);
        }

        .material-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 107, 74, 0.15);
        }

        .material-preview {
          height: 80px;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          border: 1px solid rgba(255, 107, 74, 0.2);
        }

        .material-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 0.75rem;
        }

        .material-description {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .material-application {
          font-size: 0.75rem;
          color: var(--lss-accent);
          font-weight: 500;
          padding: 0.5rem;
          background: rgba(255, 107, 74, 0.1);
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .inspiration-grid,
          .harmony-grid,
          .emotions-grid,
          .materials-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 2rem;
          }

          .mood-nav {
            gap: 0.5rem;
          }

          .mood-nav-item {
            padding: 8px 16px;
            font-size: 0.75rem;
          }
        }
      `}</style>

      {/* Header */}
      <section className="section-header">
        <h1 className="section-title">Visual Mood Board</h1>
        <p className="section-subtitle">
          Deep dive into the visual philosophy, emotional resonance, and material qualities 
          that define the Long Story Short aesthetic.
        </p>
      </section>

      {/* Navigation */}
      <nav className="mood-nav">
        {[
          { key: 'inspiration', label: 'Inspiration' },
          { key: 'harmony', label: 'Color Harmony' },
          { key: 'psychology', label: 'Psychology' },
          { key: 'materials', label: 'Materials' }
        ].map((item) => (
          <button
            key={item.key}
            className={`mood-nav-item ${activeSection === item.key ? 'active' : ''}`}
            onClick={() => setActiveSection(item.key as any)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Inspiration Section */}
      {activeSection === 'inspiration' && (
        <section>
          <h2 style={{ color: 'var(--lss-text-primary)', textAlign: 'center', marginBottom: '2rem' }}>
            Visual Inspiration
          </h2>
          <div className="inspiration-grid">
            {inspirationReferences.map((item, index) => (
              <div key={index} className="inspiration-card">
                <div 
                  className="inspiration-visual"
                  style={{ background: item.visual }}
                />
                <div className="inspiration-content">
                  <h3 className="inspiration-title">{item.title}</h3>
                  <p className="inspiration-description">{item.description}</p>
                  <div className="inspiration-keywords">
                    {item.keywords?.map((keyword, keyIndex) => (
                      <span key={keyIndex} className="keyword-tag">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Color Harmony Section */}
      {activeSection === 'harmony' && (
        <section>
          <h2 style={{ color: 'var(--lss-text-primary)', textAlign: 'center', marginBottom: '2rem' }}>
            Color Harmony Analysis
          </h2>
          <div className="harmony-grid">
            {colorHarmonies.map((harmony, index) => (
              <ColorHarmonyCard key={index} harmony={harmony} />
            ))}
          </div>
        </section>
      )}

      {/* Emotional Psychology Section */}
      {activeSection === 'psychology' && (
        <section>
          <h2 style={{ color: 'var(--lss-text-primary)', textAlign: 'center', marginBottom: '2rem' }}>
            Emotional Psychology
          </h2>
          <div className="emotions-grid">
            {emotionalTones.map((tone, index) => (
              <EmotionalToneCard key={index} tone={tone} />
            ))}
          </div>
        </section>
      )}

      {/* Materials Section */}
      {activeSection === 'materials' && (
        <section>
          <h2 style={{ color: 'var(--lss-text-primary)', textAlign: 'center', marginBottom: '2rem' }}>
            Material References
          </h2>
          <div className="materials-grid">
            {materialReferences.map((material, index) => (
              <div key={index} className="material-card">
                <div 
                  className="material-preview"
                  style={{ background: material.visual }}
                >
                  Material Preview
                </div>
                <h3 className="material-name">{material.name}</h3>
                <p className="material-description">{material.description}</p>
                <div className="material-application">
                  {material.application}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};