import React from 'react';

interface TypographyPlaygroundProps {
  themeMode: string;
}

export const TypographyPlayground: React.FC<TypographyPlaygroundProps> = ({ themeMode }) => {
  const sampleText = {
    hero: "Design Systems",
    display: "Thoughtfully Crafted Typography",
    heading: "Brand Foundation Guidelines",
    body: "Material Lab exists to democratize access to enterprise-quality technology for early-stage businesses. We level the playing field by making cutting-edge software development accessible to those who previously couldn't afford top-tier technical expertise.",
    caption: "Typography tokens and examples",
    code: "font-family: 'Space Grotesk Variable';"
  };

  const typographyScales = [
    { 
      name: 'Hero Typography', 
      class: 'ml-typo-hero',
      token: '--font-size-hero',
      description: 'For compelling presenter moments and main CTAs',
      text: sampleText.hero
    },
    { 
      name: 'Display 1', 
      class: 'ml-typo-display-1',
      token: '--font-size-display-1',
      description: 'Large display text for section headers',
      text: sampleText.display
    },
    { 
      name: 'Display 2', 
      class: 'ml-typo-display-2',
      token: '--font-size-display-2',
      description: 'Medium display text for feature highlights',
      text: "Material Lab Typography"
    },
    { 
      name: 'Display 3', 
      class: 'ml-typo-display-3',
      token: '--font-size-display-3',
      description: 'Small display text for card headers',
      text: "Enhanced Design System"
    },
    { 
      name: 'Heading 1', 
      class: 'ml-typo-h1',
      token: '--font-size-h1',
      description: 'Primary page heading in thoughtful expert mode',
      text: sampleText.heading
    },
    { 
      name: 'Heading 2', 
      class: 'ml-typo-h2',
      token: '--font-size-h2',
      description: 'Major section heading',
      text: "Brand Personality & Archetype"
    },
    { 
      name: 'Heading 3', 
      class: 'ml-typo-h3',
      token: '--font-size-h3',
      description: 'Subsection heading',
      text: "Core Values & Mission"
    },
    { 
      name: 'Heading 4', 
      class: 'ml-typo-h4',
      token: '--font-size-h4',
      description: 'Minor section heading',
      text: "Authenticity & Collaboration"
    },
    { 
      name: 'Heading 5', 
      class: 'ml-typo-h5',
      token: '--font-size-h5',
      description: 'Small heading',
      text: "Net Positive Impact"
    },
    { 
      name: 'Heading 6', 
      class: 'ml-typo-h6',
      token: '--font-size-h6',
      description: 'Smallest heading',
      text: "Joy of Building"
    }
  ];

  const bodyScales = [
    { 
      name: 'Body Extra Large', 
      class: 'ml-typo-body-xl',
      token: '--font-size-body-xl',
      description: 'Important content and feature descriptions',
      text: sampleText.body
    },
    { 
      name: 'Body Large', 
      class: 'ml-typo-body-lg',
      token: '--font-size-body-lg',
      description: 'Readable content and article text',
      text: sampleText.body
    },
    { 
      name: 'Body Standard', 
      class: 'ml-typo-body',
      token: '--font-size-body',
      description: 'Default body text - WCAG 2.1 AA compliant (16px base)',
      text: sampleText.body
    },
    { 
      name: 'Body Small', 
      class: 'ml-typo-body-sm',
      token: '--font-size-body-sm',
      description: 'Secondary information and captions',
      text: "We partner with people instead of working for them. This collaborative approach enables agile development and real-time testing through co-building."
    },
    { 
      name: 'Caption', 
      class: 'ml-typo-caption',
      token: '--font-size-caption',
      description: 'Labels, metadata, and fine print',
      text: sampleText.caption.toUpperCase()
    }
  ];

  const specialScales = [
    { 
      name: 'Code Inline', 
      class: 'ml-typo-code',
      token: '--font-code',
      description: 'Inline code and technical content',
      text: sampleText.code
    },
    { 
      name: 'Button Text', 
      class: 'ml-typo-button',
      token: '--font-size-body-sm',
      description: 'Interactive button text',
      text: "START BUILDING".toUpperCase()
    },
    { 
      name: 'Link Text', 
      class: 'ml-typo-link',
      token: 'inherit',
      description: 'Interactive link styling',
      text: "Learn more about our approach"
    }
  ];

  const personalityModes = [
    {
      name: 'Thoughtful Expert',
      class: 'typo-expert',
      description: 'Shy, nerdy, becomes helpful when engaged',
      context: 'Technical discussions, detailed explanations'
    },
    {
      name: 'Compelling Presenter',
      class: 'typo-presenter',
      description: 'Confident, compelling, inspiring action',
      context: 'CTAs, marketing copy, engagement content'
    }
  ];

  return (
    <div className="typography-playground">
      <style>{`
        .typography-playground {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .typo-section {
          margin-bottom: 4rem;
        }

        .typo-section-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--lss-accent, #FF6B4A);
        }

        .typo-section-title {
          font-family: var(--font-primary);
          font-size: 2rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 0.5rem;
        }

        .typo-section-description {
          font-family: var(--font-body);
          font-size: 1.125rem;
          color: var(--lss-text-secondary);
          line-height: 1.6;
        }

        .typo-scale-grid {
          display: grid;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .typo-scale-item {
          background: var(--lss-surface, rgba(255, 255, 255, 0.9));
          border-radius: 12px;
          padding: 2rem;
          border: 1px solid rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
          transition: all 0.3s ease;
        }

        .typo-scale-item:hover {
          box-shadow: 0 8px 25px rgba(var(--lss-accent-rgb, 255, 107, 74), 0.15);
          border-color: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.2);
        }

        .typo-scale-header {
          display: flex;
          justify-content: between;
          align-items: flex-start;
          margin-bottom: 1rem;
          gap: 1rem;
        }

        .typo-scale-meta {
          flex: 1;
        }

        .typo-scale-name {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--lss-accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .typo-scale-token {
          font-family: var(--font-code);
          font-size: 0.75rem;
          color: var(--lss-text-secondary);
          background: rgba(var(--lss-text-rgb, 0, 0, 0), 0.05);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          margin-bottom: 0.5rem;
          display: inline-block;
        }

        .typo-scale-description {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .typo-scale-example {
          color: var(--lss-text-primary);
          margin-bottom: 1rem;
        }

        .typo-specs {
          display: flex;
          gap: 1rem;
          font-family: var(--font-code);
          font-size: 0.75rem;
          color: var(--lss-text-secondary);
          flex-wrap: wrap;
        }

        .typo-spec {
          background: rgba(var(--lss-text-rgb, 0, 0, 0), 0.05);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .personality-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .personality-card {
          background: var(--lss-surface);
          border-radius: 12px;
          padding: 2rem;
          border: 2px solid var(--lss-accent);
          position: relative;
          overflow: hidden;
        }

        .personality-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, 
            var(--lss-accent) 0%, 
            var(--primary, #55C2FF) 50%, 
            var(--secondary, #FF6F61) 100%);
        }

        .personality-name {
          font-family: var(--font-primary);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 0.5rem;
        }

        .personality-description {
          font-family: var(--font-body);
          color: var(--lss-text-secondary);
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .personality-context {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--lss-text-primary);
          background: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
          padding: 1rem;
          border-radius: 8px;
          border-left: 3px solid var(--lss-accent);
        }

        .personality-example {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(var(--lss-accent-rgb, 255, 107, 74), 0.2);
        }

        .wcag-compliance {
          background: linear-gradient(135deg, 
            rgba(var(--primary-rgb, 85, 194, 255), 0.1),
            rgba(var(--secondary-rgb, 255, 111, 97), 0.1)
          );
          border-radius: 12px;
          padding: 2rem;
          margin-top: 3rem;
          border: 1px solid rgba(var(--primary-rgb, 85, 194, 255), 0.2);
        }

        .wcag-title {
          font-family: var(--font-primary);
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 1rem;
        }

        .wcag-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .wcag-feature {
          background: var(--lss-surface);
          padding: 1rem;
          border-radius: 8px;
          border-left: 3px solid var(--primary, #55C2FF);
        }

        .wcag-feature-title {
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 0.5rem;
        }

        .wcag-feature-description {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .typography-playground {
            padding: 1rem;
          }
          
          .typo-scale-header {
            flex-direction: column;
          }
          
          .typo-specs {
            flex-direction: column;
          }
        }
      `}</style>

      {/* Header */}
      <div className="typo-section">
        <div className="typo-section-header">
          <h1 className="typo-section-title">Material Lab Typography System</h1>
          <p className="typo-section-description">
            A comprehensive typography system aligned with Material Lab's dual personality—thoughtfully nerdy expertise 
            with moments of compelling presentation. Built for accessibility, performance, and brand expression.
          </p>
        </div>
      </div>

      {/* Display & Hero Typography */}
      <div className="typo-section">
        <div className="typo-section-header">
          <h2 className="typo-section-title">Display & Hero Typography</h2>
          <p className="typo-section-description">
            Large-scale typography for compelling presenter moments, featuring Space Grotesk for thoughtfully nerdy personality.
          </p>
        </div>
        <div className="typo-scale-grid">
          {typographyScales.slice(0, 4).map((scale, index) => (
            <div key={index} className="typo-scale-item">
              <div className="typo-scale-header">
                <div className="typo-scale-meta">
                  <div className="typo-scale-name">{scale.name}</div>
                  <div className="typo-scale-token">{scale.token}</div>
                  <div className="typo-scale-description">{scale.description}</div>
                </div>
              </div>
              <div className={`typo-scale-example ${scale.class}`}>
                {scale.text}
              </div>
              <div className="typo-specs">
                <span className="typo-spec">class: {scale.class}</span>
                <span className="typo-spec">font: Space Grotesk Variable</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heading Typography */}
      <div className="typo-section">
        <div className="typo-section-header">
          <h2 className="typo-section-title">Heading Typography</h2>
          <p className="typo-section-description">
            Clear hierarchy for thoughtful expert content, transitioning from Space Grotesk to Inter for optimal readability.
          </p>
        </div>
        <div className="typo-scale-grid">
          {typographyScales.slice(4).map((scale, index) => (
            <div key={index} className="typo-scale-item">
              <div className="typo-scale-header">
                <div className="typo-scale-meta">
                  <div className="typo-scale-name">{scale.name}</div>
                  <div className="typo-scale-token">{scale.token}</div>
                  <div className="typo-scale-description">{scale.description}</div>
                </div>
              </div>
              <div className={`typo-scale-example ${scale.class}`}>
                {scale.text}
              </div>
              <div className="typo-specs">
                <span className="typo-spec">class: {scale.class}</span>
                <span className="typo-spec">font: {index < 2 ? 'Space Grotesk' : 'Inter'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Body Typography */}
      <div className="typo-section">
        <div className="typo-section-header">
          <h2 className="typo-section-title">Body Typography</h2>
          <p className="typo-section-description">
            Readable content optimized for thoughtful expert communication, using Inter for maximum legibility.
          </p>
        </div>
        <div className="typo-scale-grid">
          {bodyScales.map((scale, index) => (
            <div key={index} className="typo-scale-item">
              <div className="typo-scale-header">
                <div className="typo-scale-meta">
                  <div className="typo-scale-name">{scale.name}</div>
                  <div className="typo-scale-token">{scale.token}</div>
                  <div className="typo-scale-description">{scale.description}</div>
                </div>
              </div>
              <div className={`typo-scale-example ${scale.class}`}>
                {scale.text}
              </div>
              <div className="typo-specs">
                <span className="typo-spec">class: {scale.class}</span>
                <span className="typo-spec">font: Inter Variable</span>
                {index === 2 && <span className="typo-spec">WCAG: 16px base</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Typography */}
      <div className="typo-section">
        <div className="typo-section-header">
          <h2 className="typo-section-title">Special Typography</h2>
          <p className="typo-section-description">
            Interactive and technical typography for specific use cases and brand contexts.
          </p>
        </div>
        <div className="typo-scale-grid">
          {specialScales.map((scale, index) => (
            <div key={index} className="typo-scale-item">
              <div className="typo-scale-header">
                <div className="typo-scale-meta">
                  <div className="typo-scale-name">{scale.name}</div>
                  <div className="typo-scale-token">{scale.token}</div>
                  <div className="typo-scale-description">{scale.description}</div>
                </div>
              </div>
              <div className={`typo-scale-example ${scale.class}`}>
                {scale.text}
              </div>
              <div className="typo-specs">
                <span className="typo-spec">class: {scale.class}</span>
                <span className="typo-spec">font: {index === 0 ? 'Source Code Pro' : 'Inter'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Personality Modes */}
      <div className="typo-section">
        <div className="typo-section-header">
          <h2 className="typo-section-title">Brand Personality Modes</h2>
          <p className="typo-section-description">
            Typography expressions of Material Lab's dual personality system—thoughtful expert and compelling presenter.
          </p>
        </div>
        <div className="personality-grid">
          {personalityModes.map((mode, index) => (
            <div key={index} className="personality-card">
              <h3 className="personality-name">{mode.name}</h3>
              <p className="personality-description">{mode.description}</p>
              <div className="personality-context">
                <strong>Best for:</strong> {mode.context}
              </div>
              <div className="personality-example">
                <div className={`ml-typo-body ${mode.class}`}>
                  {mode.name === 'Thoughtful Expert' ? 
                    "Material Lab exists to democratize access to enterprise-quality technology for early-stage businesses. We level the playing field by making cutting-edge software development accessible." :
                    "Transform Your Vision Into Reality. Partner with Material Lab for white-glove software development that turns conversations into elegant solutions."
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WCAG Compliance */}
      <div className="wcag-compliance">
        <h2 className="wcag-title">WCAG 2.1 AA Compliance</h2>
        <div className="wcag-features">
          <div className="wcag-feature">
            <div className="wcag-feature-title">Text Resizing (1.4.4)</div>
            <div className="wcag-feature-description">
              Text can be resized up to 200% without loss of content or functionality using responsive clamp() functions.
            </div>
          </div>
          <div className="wcag-feature">
            <div className="wcag-feature-title">Text Spacing (1.4.12)</div>
            <div className="wcag-feature-description">
              Content remains legible when users override text spacing properties through browser settings.
            </div>
          </div>
          <div className="wcag-feature">
            <div className="wcag-feature-title">Contrast Support</div>
            <div className="wcag-feature-description">
              Typography adapts to high contrast mode preferences and maintains readable contrast ratios.
            </div>
          </div>
          <div className="wcag-feature">
            <div className="wcag-feature-title">Reduced Motion</div>
            <div className="wcag-feature-description">
              Respects prefers-reduced-motion settings by disabling animations and transitions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};