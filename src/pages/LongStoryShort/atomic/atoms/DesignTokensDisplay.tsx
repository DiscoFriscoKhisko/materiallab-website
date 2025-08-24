import React, { useState } from 'react';
import { MLText, MLHeading } from '../../../../components/ML';

interface DesignTokensDisplayProps {
  themeMode: 'light' | 'dark' | 'minimal' | 'maximal';
}

interface TokenSection {
  name: string;
  description: string;
  tokens: Token[];
}

interface Token {
  name: string;
  value: string;
  description: string;
  type: 'color' | 'gradient' | 'typography' | 'spacing' | 'motion' | 'elevation';
  example?: string;
}

export const DesignTokensDisplay: React.FC<DesignTokensDisplayProps> = ({ themeMode }) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'css' | 'json' | 'scss'>('css');

  const tokenSections: TokenSection[] = [
    {
      name: 'Colors',
      description: 'Core color palette with semantic meaning and accessibility compliance',
      tokens: [
        {
          name: '--lss-sunset-coral',
          value: '#FF6B4A',
          description: 'Primary brand color - warm, approachable, confident',
          type: 'color',
          example: '#FF6B4A'
        },
        {
          name: '--lss-deep-teal',
          value: '#1A8B9D',
          description: 'Secondary accent - cool, professional, trustworthy',
          type: 'color',
          example: '#1A8B9D'
        },
        {
          name: '--lss-soft-lavender',
          value: '#B8A4E3',
          description: 'Creative accent - imaginative, gentle, inspiring',
          type: 'color',
          example: '#B8A4E3'
        },
        {
          name: '--lss-golden-hour',
          value: '#FFB84D',
          description: 'Energetic accent - optimistic, dynamic, warm',
          type: 'color',
          example: '#FFB84D'
        },
        {
          name: '--lss-rich-black',
          value: '#0A0A0A',
          description: 'Primary text and high contrast elements',
          type: 'color',
          example: '#0A0A0A'
        },
        {
          name: '--lss-soft-white',
          value: '#FAF9F6',
          description: 'Primary backgrounds with subtle warmth',
          type: 'color',
          example: '#FAF9F6'
        },
        {
          name: '--lss-warm-grey',
          value: '#7A756F',
          description: 'Secondary text and subtle interface elements',
          type: 'color',
          example: '#7A756F'
        }
      ]
    },
    {
      name: 'Gradients',
      description: 'Cinematic gradient system with atmospheric depth',
      tokens: [
        {
          name: '--lss-gradient-radial',
          value: 'radial-gradient(circle at 50% 50%, rgba(255,107,74,0.08), transparent)',
          description: 'Soft atmospheric glow from center point',
          type: 'gradient',
          example: 'radial-gradient(circle at 50% 50%, rgba(255,107,74,0.08), transparent)'
        },
        {
          name: '--lss-gradient-cropped',
          value: 'linear-gradient(180deg, rgba(255,107,74,0.08) 0%, transparent 100%)',
          description: 'Subtle linear fade with cropped curve',
          type: 'gradient',
          example: 'linear-gradient(180deg, rgba(255,107,74,0.08) 0%, transparent 100%)'
        },
        {
          name: '--lss-gradient-multi',
          value: 'linear-gradient(135deg, #FF6B4A 0%, #FFB84D 50%, #B8A4E3 100%)',
          description: 'Rich sunset blend for maximum expression',
          type: 'gradient',
          example: 'linear-gradient(135deg, #FF6B4A 0%, #FFB84D 50%, #B8A4E3 100%)'
        }
      ]
    },
    {
      name: 'Typography',
      description: 'Carefully selected typefaces for optimal readability and expression',
      tokens: [
        {
          name: '--lss-font-display',
          value: "'Playfair Display', serif",
          description: 'Elegant serif for headlines and brand moments',
          type: 'typography',
          example: 'Playfair Display'
        },
        {
          name: '--lss-font-body',
          value: "'Inter', sans-serif",
          description: 'Highly readable sans-serif for body text',
          type: 'typography',
          example: 'Inter'
        },
        {
          name: '--lss-font-mono',
          value: "'JetBrains Mono', monospace",
          description: 'Code-friendly monospace with excellent legibility',
          type: 'typography',
          example: 'JetBrains Mono'
        }
      ]
    },
    {
      name: 'Spacing',
      description: '8px base grid system for consistent rhythm and hierarchy',
      tokens: [
        {
          name: '--lss-space-xs',
          value: '0.5rem',
          description: '8px - Tight spacing for related elements',
          type: 'spacing'
        },
        {
          name: '--lss-space-sm',
          value: '1rem',
          description: '16px - Standard component padding',
          type: 'spacing'
        },
        {
          name: '--lss-space-md',
          value: '2rem',
          description: '32px - Section spacing and card gaps',
          type: 'spacing'
        },
        {
          name: '--lss-space-lg',
          value: '4rem',
          description: '64px - Major section separation',
          type: 'spacing'
        },
        {
          name: '--lss-space-xl',
          value: '8rem',
          description: '128px - Hero sections and dramatic spacing',
          type: 'spacing'
        }
      ]
    },
    {
      name: 'Motion',
      description: 'Carefully tuned timing and easing for natural interactions',
      tokens: [
        {
          name: '--lss-duration-fast',
          value: '200ms',
          description: 'Quick feedback for hover states and toggles',
          type: 'motion'
        },
        {
          name: '--lss-duration-normal',
          value: '400ms',
          description: 'Standard transitions and state changes',
          type: 'motion'
        },
        {
          name: '--lss-duration-slow',
          value: '800ms',
          description: 'Dramatic entrances and complex animations',
          type: 'motion'
        },
        {
          name: '--lss-easing',
          value: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
          description: 'Natural deceleration curve for smooth motion',
          type: 'motion'
        }
      ]
    }
  ];

  const copyToClipboard = (value: string, name: string) => {
    navigator.clipboard.writeText(value);
    setCopiedToken(name);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const generateExportCode = (format: 'css' | 'json' | 'scss') => {
    const allTokens = tokenSections.flatMap(section => section.tokens);
    
    switch (format) {
      case 'css':
        return `:root {
${allTokens.map(token => `  ${token.name}: ${token.value};`).join('\n')}
}`;
      
      case 'json':
        const jsonTokens = allTokens.reduce((acc, token) => {
          const key = token.name.replace('--lss-', '');
          acc[key] = {
            value: token.value,
            type: token.type,
            description: token.description
          };
          return acc;
        }, {} as Record<string, any>);
        return JSON.stringify({ 'long-story-short': jsonTokens }, null, 2);
      
      case 'scss':
        return allTokens.map(token => `$${token.name.replace('--lss-', 'lss-')}: ${token.value};`).join('\n');
      
      default:
        return '';
    }
  };

  const TokenCard: React.FC<{ token: Token }> = ({ token }) => (
    <div className="token-card" onClick={() => copyToClipboard(token.value, token.name)}>
      <div className="token-header">
        <div className="token-name-section">
          <span className="token-name">{token.name}</span>
          <span className={`token-type ${token.type}`}>{token.type}</span>
        </div>
        <div className="copy-indicator">
          {copiedToken === token.name ? '✓' : '📋'}
        </div>
      </div>
      
      {token.example && (
        <div className="token-example">
          {token.type === 'color' && (
            <div className="color-swatch" style={{ backgroundColor: token.example }} />
          )}
          {token.type === 'gradient' && (
            <div className="gradient-swatch" style={{ background: token.example }} />
          )}
          {token.type === 'typography' && (
            <div className="typography-example" style={{ fontFamily: token.value }}>
              {token.example}
            </div>
          )}
        </div>
      )}
      
      <div className="token-value">
        <code>{token.value}</code>
      </div>
      
      <div className="token-description">
        {token.description}
      </div>
    </div>
  );

  return (
    <div className="design-tokens-display">
      <style>{`
        .design-tokens-display {
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

        .export-section {
          background: var(--lss-surface);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 4rem;
          border: 1px solid rgba(255, 107, 74, 0.1);
        }

        .export-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .export-tabs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          background: rgba(255, 107, 74, 0.1);
          border-radius: 12px;
          padding: 4px;
        }

        .export-tab {
          padding: 12px 24px;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--lss-text-secondary);
          transition: all var(--lss-duration-fast) var(--lss-easing);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .export-tab:hover {
          background: rgba(255, 107, 74, 0.1);
          color: var(--lss-accent);
        }

        .export-tab.active {
          background: var(--lss-accent);
          color: white;
          box-shadow: 0 2px 8px rgba(255, 107, 74, 0.3);
        }

        .export-code {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 1rem;
          position: relative;
          overflow: auto;
          max-height: 400px;
        }

        .export-code pre {
          color: #f8f8f2;
          font-family: var(--lss-font-mono);
          font-size: 0.875rem;
          line-height: 1.6;
          margin: 0;
          white-space: pre-wrap;
        }

        .copy-code-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.75rem;
          transition: all var(--lss-duration-fast) var(--lss-easing);
        }

        .copy-code-btn:hover {
          background: rgba(255, 107, 74, 0.2);
          border-color: var(--lss-accent);
        }

        .token-sections {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .token-section {
          background: var(--lss-surface);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255, 107, 74, 0.1);
        }

        .section-name {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--lss-text-primary);
          margin-bottom: 0.5rem;
          font-family: var(--lss-font-display);
        }

        .section-description {
          font-size: 1rem;
          color: var(--lss-text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .tokens-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .token-card {
          background: var(--lss-bg-primary);
          border: 1px solid rgba(255, 107, 74, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all var(--lss-duration-normal) var(--lss-easing);
        }

        .token-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 107, 74, 0.15);
          border-color: var(--lss-accent);
        }

        .token-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .token-name-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .token-name {
          font-family: var(--lss-font-mono);
          font-size: 0.875rem;
          color: var(--lss-accent);
          font-weight: 600;
        }

        .token-type {
          font-size: 0.75rem;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          align-self: flex-start;
        }

        .token-type.color {
          background: rgba(255, 107, 74, 0.1);
          color: var(--lss-accent);
        }

        .token-type.gradient {
          background: rgba(26, 139, 157, 0.1);
          color: #1A8B9D;
        }

        .token-type.typography {
          background: rgba(184, 164, 227, 0.1);
          color: #B8A4E3;
        }

        .token-type.spacing {
          background: rgba(255, 184, 77, 0.1);
          color: #FFB84D;
        }

        .token-type.motion {
          background: rgba(122, 117, 111, 0.1);
          color: #7A756F;
        }

        .copy-indicator {
          font-size: 1.25rem;
          opacity: 0.5;
          transition: all var(--lss-duration-fast) var(--lss-easing);
        }

        .token-card:hover .copy-indicator {
          opacity: 1;
          transform: scale(1.1);
        }

        .token-example {
          margin-bottom: 1rem;
          height: 40px;
          display: flex;
          align-items: center;
        }

        .color-swatch {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid rgba(255, 107, 74, 0.2);
        }

        .gradient-swatch {
          width: 100%;
          height: 40px;
          border-radius: 8px;
          border: 1px solid rgba(255, 107, 74, 0.2);
        }

        .typography-example {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--lss-text-primary);
        }

        .token-value {
          background: rgba(122, 117, 111, 0.1);
          border-radius: 8px;
          padding: 0.75rem;
          margin-bottom: 1rem;
        }

        .token-value code {
          font-family: var(--lss-font-mono);
          font-size: 0.75rem;
          color: var(--lss-text-primary);
          word-break: break-all;
        }

        .token-description {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.4;
        }

        .design-principles {
          background: linear-gradient(135deg, rgba(255, 107, 74, 0.05), rgba(184, 164, 227, 0.05));
          border-radius: 20px;
          padding: 3rem;
          margin-top: 4rem;
          border: 1px solid rgba(255, 107, 74, 0.1);
        }

        .principles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .principle {
          text-align: center;
          padding: 2rem;
          background: var(--lss-surface);
          border-radius: 16px;
          border: 1px solid rgba(255, 107, 74, 0.1);
        }

        .principle-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .principle-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 0.75rem;
        }

        .principle-description {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .tokens-grid {
            grid-template-columns: 1fr;
          }
          
          .export-tabs {
            flex-wrap: wrap;
          }

          .section-title {
            font-size: 2rem;
          }

          .export-code {
            padding: 1rem;
          }

          .principles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <section className="section-header">
        <h1 className="section-title">Design Tokens</h1>
        <p className="section-subtitle">
          Complete technical specifications for implementing the Long Story Short design system 
          across platforms and frameworks.
        </p>
      </section>

      {/* Export Section */}
      <div className="export-section">
        <div className="export-header">
          <h2 style={{ color: 'var(--lss-text-primary)', marginBottom: '0.5rem' }}>
            Export Tokens
          </h2>
          <p style={{ color: 'var(--lss-text-secondary)' }}>
            Copy and paste tokens in your preferred format
          </p>
        </div>
        
        <div className="export-tabs">
          {(['css', 'json', 'scss'] as const).map((format) => (
            <button
              key={format}
              className={`export-tab ${activeTab === format ? 'active' : ''}`}
              onClick={() => setActiveTab(format)}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="export-code">
          <button 
            className="copy-code-btn"
            onClick={() => copyToClipboard(generateExportCode(activeTab), `${activeTab}-export`)}
          >
            {copiedToken === `${activeTab}-export` ? '✓ Copied!' : 'Copy Code'}
          </button>
          <pre>{generateExportCode(activeTab)}</pre>
        </div>
      </div>

      {/* Token Sections */}
      <div className="token-sections">
        {tokenSections.map((section) => (
          <div key={section.name} className="token-section">
            <h2 className="section-name">{section.name}</h2>
            <p className="section-description">{section.description}</p>
            
            <div className="tokens-grid">
              {section.tokens.map((token) => (
                <TokenCard key={token.name} token={token} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Design Principles */}
      <div className="design-principles">
        <h2 style={{ color: 'var(--lss-text-primary)', textAlign: 'center', marginBottom: '1rem' }}>
          Design System Principles
        </h2>
        <p style={{ color: 'var(--lss-text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>
          Core values guiding every token decision and implementation choice
        </p>
        
        <div className="principles-grid">
          <div className="principle">
            <div className="principle-icon">🎯</div>
            <h3 className="principle-title">Intentional Choices</h3>
            <p className="principle-description">
              Every color, spacing, and timing value serves a specific purpose in the user experience
            </p>
          </div>
          
          <div className="principle">
            <div className="principle-icon">♿</div>
            <h3 className="principle-title">Accessibility First</h3>
            <p className="principle-description">
              All color combinations meet WCAG AA standards for inclusive design
            </p>
          </div>
          
          <div className="principle">
            <div className="principle-icon">🔧</div>
            <h3 className="principle-title">Systematic Consistency</h3>
            <p className="principle-description">
              Mathematical relationships ensure harmonious proportions across all elements
            </p>
          </div>
          
          <div className="principle">
            <div className="principle-icon">🎨</div>
            <h3 className="principle-title">Emotional Resonance</h3>
            <p className="principle-description">
              Each token contributes to the overall cinematic and nostalgic atmosphere
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};