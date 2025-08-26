import React, { useState } from 'react';
import contentTokens from '../../tokens/content-tokens.json';
import microcopyLibrary from '../../tokens/microcopy-library.json';
import inclusiveLanguage from '../../tokens/inclusive-language.json';
import './Sandbox.css';

type SectionType = 
  | 'overview'
  | 'typography' 
  | 'spacing'
  | 'grid'
  | 'colors'
  | 'components'
  | 'voice-tone'
  | 'microcopy'
  | 'inclusive'
  | 'tokens';

const Sandbox: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('overview');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const sections = [
    { key: 'overview' as const, label: 'Overview', icon: '📋' },
    { key: 'typography' as const, label: 'Typography', icon: '✍️' },
    { key: 'spacing' as const, label: 'Spacing', icon: '📏' },
    { key: 'grid' as const, label: 'Grid', icon: '⚏' },
    { key: 'colors' as const, label: 'Colors', icon: '🎨' },
    { key: 'components' as const, label: 'Components', icon: '🧩' },
    { key: 'voice-tone' as const, label: 'Voice & Tone', icon: '🗣️' },
    { key: 'microcopy' as const, label: 'Microcopy', icon: '✏️' },
    { key: 'inclusive' as const, label: 'Inclusive Language', icon: '🤝' },
    { key: 'tokens' as const, label: 'CSS Tokens', icon: '⚙️' }
  ];

  const copyToClipboard = (text: string, token: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const TokenRow = ({ name, value, description }: { name: string; value: string; description?: string }) => (
    <div className="token-row">
      <div className="token-info">
        <code className="token-name">{name}</code>
        {description && <span className="token-description">{description}</span>}
      </div>
      <div className="token-value">
        <code className="token-code">{value}</code>
        <button
          className={`copy-btn ${copiedToken === name ? 'copied' : ''}`}
          onClick={() => copyToClipboard(value, name)}
        >
          {copiedToken === name ? '✓' : '📋'}
        </button>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="sandbox-section">
      <h2 className="section-title">MaterialLab Design System</h2>
      <p className="section-description">
        Quick reference for MaterialLab's design system. Use this sandbox to find tokens, 
        guidelines, and examples for consistent design implementation.
      </p>
      
      <div className="overview-grid">
        <div className="overview-card">
          <div className="card-icon">🎨</div>
          <h3>Visual Foundation</h3>
          <p>Typography, spacing, colors, and visual tokens</p>
        </div>
        <div className="overview-card">
          <div className="card-icon">🧩</div>
          <h3>Components</h3>
          <p>Reusable UI components with consistent styling</p>
        </div>
        <div className="overview-card">
          <div className="card-icon">✍️</div>
          <h3>Content Guidelines</h3>
          <p>Voice, tone, microcopy, and inclusive language</p>
        </div>
        <div className="overview-card">
          <div className="card-icon">⚙️</div>
          <h3>CSS Tokens</h3>
          <p>Complete list of design tokens for development</p>
        </div>
      </div>
    </div>
  );

  const renderTypography = () => (
    <div className="sandbox-section">
      <h2 className="section-title">Typography System</h2>
      <p className="section-description">
        Responsive typography scale with clamp() values for fluid sizing.
      </p>

      <div className="typography-showcase">
        <div className="type-sample" style={{ fontSize: 'var(--ml-text-7xl)' }}>
          Display 7XL
          <span className="type-token">var(--ml-text-7xl)</span>
        </div>
        <div className="type-sample" style={{ fontSize: 'var(--ml-text-6xl)' }}>
          Display 6XL
          <span className="type-token">var(--ml-text-6xl)</span>
        </div>
        <div className="type-sample" style={{ fontSize: 'var(--ml-text-5xl)' }}>
          Display 5XL
          <span className="type-token">var(--ml-text-5xl)</span>
        </div>
        <div className="type-sample" style={{ fontSize: 'var(--ml-text-4xl)' }}>
          Display 4XL
          <span className="type-token">var(--ml-text-4xl)</span>
        </div>
        <div className="type-sample" style={{ fontSize: 'var(--ml-text-3xl)' }}>
          Heading 3XL
          <span className="type-token">var(--ml-text-3xl)</span>
        </div>
        <div className="type-sample" style={{ fontSize: 'var(--ml-text-2xl)' }}>
          Heading 2XL
          <span className="type-token">var(--ml-text-2xl)</span>
        </div>
        <div className="type-sample" style={{ fontSize: 'var(--ml-text-xl)' }}>
          Heading XL
          <span className="type-token">var(--ml-text-xl)</span>
        </div>
        <div className="type-sample" style={{ fontSize: 'var(--ml-text-lg)' }}>
          Body Large
          <span className="type-token">var(--ml-text-lg)</span>
        </div>
        <div className="type-sample" style={{ fontSize: 'var(--ml-text-base)' }}>
          Body Base
          <span className="type-token">var(--ml-text-base)</span>
        </div>
        <div className="type-sample" style={{ fontSize: 'var(--ml-text-sm)' }}>
          Body Small
          <span className="type-token">var(--ml-text-sm)</span>
        </div>
        <div className="type-sample" style={{ fontSize: 'var(--ml-text-xs)' }}>
          Caption XS
          <span className="type-token">var(--ml-text-xs)</span>
        </div>
      </div>
    </div>
  );

  const renderSpacing = () => (
    <div className="sandbox-section">
      <h2 className="section-title">Spacing System</h2>
      <p className="section-description">
        8px-based spacing scale with responsive modifiers and semantic tokens.
      </p>

      <div className="spacing-showcase">
        <h3>Base Scale</h3>
        <div className="spacing-grid">
          {[
            { name: '--ml-space-0', value: '0px' },
            { name: '--ml-space-1', value: '8px' },
            { name: '--ml-space-2', value: '16px' },
            { name: '--ml-space-3', value: '24px' },
            { name: '--ml-space-4', value: '32px' },
            { name: '--ml-space-5', value: '40px' },
            { name: '--ml-space-6', value: '48px' },
            { name: '--ml-space-8', value: '64px' },
            { name: '--ml-space-10', value: '80px' },
            { name: '--ml-space-12', value: '96px' },
            { name: '--ml-space-16', value: '128px' },
            { name: '--ml-space-20', value: '160px' },
            { name: '--ml-space-24', value: '192px' },
            { name: '--ml-space-32', value: '256px' }
          ].map((space) => (
            <div key={space.name} className="spacing-item">
              <div 
                className="spacing-visual" 
                style={{ width: space.value, height: '24px' }}
              ></div>
              <div className="spacing-info">
                <code>{space.name}</code>
                <span>{space.value}</span>
              </div>
            </div>
          ))}
        </div>

        <h3>Utility Classes</h3>
        <div className="utility-examples">
          <code>.ml-m-4</code> - margin: var(--ml-space-4)<br/>
          <code>.ml-p-6</code> - padding: var(--ml-space-6)<br/>
          <code>.ml-gap-3</code> - gap: var(--ml-space-3)<br/>
          <code>.ml-space-y-2</code> - vertical spacing between children
        </div>
      </div>
    </div>
  );

  const renderGrid = () => (
    <div className="sandbox-section">
      <h2 className="section-title">Grid System</h2>
      <p className="section-description">
        12-column grid system with responsive breakpoints and flexbox utilities.
      </p>

      <div className="grid-showcase">
        <h3>Breakpoints</h3>
        <div className="token-list">
          <TokenRow name="--ml-bp-sm" value="640px" description="Small screens" />
          <TokenRow name="--ml-bp-md" value="768px" description="Medium screens" />
          <TokenRow name="--ml-bp-lg" value="1024px" description="Large screens" />
          <TokenRow name="--ml-bp-xl" value="1280px" description="Extra large" />
          <TokenRow name="--ml-bp-2xl" value="1536px" description="2x extra large" />
        </div>

        <h3>Grid Examples</h3>
        <div className="grid-example">
          <div className="ml-grid ml-grid-cols-12 ml-gap-4">
            <div className="ml-col-12 grid-item">12 columns</div>
            <div className="ml-col-6 grid-item">6 columns</div>
            <div className="ml-col-6 grid-item">6 columns</div>
            <div className="ml-col-4 grid-item">4 columns</div>
            <div className="ml-col-4 grid-item">4 columns</div>
            <div className="ml-col-4 grid-item">4 columns</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVoiceTone = () => (
    <div className="sandbox-section">
      <h2 className="section-title">Voice & Tone</h2>
      <p className="section-description">
        MaterialLab's brand voice guidelines and contextual tone adaptations.
      </p>

      <div className="voice-tone-showcase">
        <h3>Core Voice Attributes</h3>
        <div className="voice-attributes">
          {Object.entries(contentTokens.voice.core_attributes).map(([key, attr]) => (
            <div key={key} className="voice-attribute">
              <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
              <p>{attr.definition}</p>
              <div className="example-pair">
                <div className="good-example">
                  <strong>Good:</strong> {attr.example}
                </div>
                <div className="avoid-example">
                  <strong>Avoid:</strong> {attr.avoid}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3>Tone Spectrum</h3>
        <div className="tone-spectrum">
          {Object.entries(contentTokens.tone.spectrum).map(([key, tone]) => (
            <div key={key} className="tone-mode">
              <h4>{tone.when_to_use}</h4>
              <div className="tone-characteristics">
                {tone.characteristics.map((char: string, idx: number) => (
                  <span key={idx} className="characteristic-tag">{char}</span>
                ))}
              </div>
              <p className="tone-example">"{tone.example}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMicrocopy = () => (
    <div className="sandbox-section">
      <h2 className="section-title">Microcopy Library</h2>
      <p className="section-description">
        Pre-approved copy patterns and CTA taxonomy for consistent messaging.
      </p>

      <div className="microcopy-showcase">
        <h3>CTA Taxonomy</h3>
        <div className="cta-grid">
          {Object.entries(microcopyLibrary.cta_taxonomy).map(([key, category]) => (
            <div key={key} className={`cta-category cta-${key}`}>
              <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
              <p>{category.description}</p>
              <div className="cta-examples">
                {Object.values(category.examples).map((example: string, idx: number) => (
                  <span key={idx} className="cta-example">{example}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3>Error Messages</h3>
        <div className="error-examples">
          {Object.entries(microcopyLibrary.component_library.errors).map(([key, error]) => (
            <div key={key} className="error-example">
              <div className="error-preview">
                <h5>{error.title}</h5>
                <p>{error.message}</p>
                <button className="error-action">{error.action}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInclusive = () => (
    <div className="sandbox-section">
      <h2 className="section-title">Inclusive Language</h2>
      <p className="section-description">
        Guidelines for creating accessible, inclusive content that respects all users.
      </p>

      <div className="inclusive-showcase">
        <h3>Core Principles</h3>
        <div className="principles-grid">
          {Object.entries(inclusiveLanguage.principles).map(([key, principle]) => (
            <div key={key} className="principle-card">
              <h4>{key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h4>
              <p>{principle.description}</p>
              <div className="language-examples">
                <div className="good-examples">
                  <strong>Use:</strong>
                  {principle.examples.good.map((example: string, idx: number) => (
                    <span key={idx} className="example-tag good">{example}</span>
                  ))}
                </div>
                <div className="avoid-examples">
                  <strong>Avoid:</strong>
                  {principle.examples.avoid.map((example: string, idx: number) => (
                    <span key={idx} className="example-tag avoid">{example}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3>Word Replacements</h3>
        <div className="replacements-list">
          {Object.entries(inclusiveLanguage.word_replacements).map(([category, words]) => (
            <div key={category} className="replacement-category">
              <h4>{category.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h4>
              {Object.entries(words).map(([word, replacement]) => (
                <div key={word} className="replacement-row">
                  <div className="word-avoid">
                    <strong>{word}</strong>
                  </div>
                  <div className="word-alternatives">
                    {replacement.alternatives.map((alt: string, idx: number) => (
                      <span key={idx} className="alternative">{alt}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTokens = () => (
    <div className="sandbox-section">
      <h2 className="section-title">CSS Design Tokens</h2>
      <p className="section-description">
        Complete reference of CSS custom properties for development.
      </p>

      <div className="tokens-showcase">
        <h3>Spacing Tokens</h3>
        <div className="token-list">
          <TokenRow name="--ml-space-1" value="8px" description="Base spacing unit" />
          <TokenRow name="--ml-space-2" value="16px" description="Small spacing" />
          <TokenRow name="--ml-space-3" value="24px" description="Medium spacing" />
          <TokenRow name="--ml-space-4" value="32px" description="Large spacing" />
          <TokenRow name="--ml-space-6" value="48px" description="Extra large" />
          <TokenRow name="--ml-space-8" value="64px" description="2x extra large" />
        </div>

        <h3>Typography Tokens</h3>
        <div className="token-list">
          <TokenRow name="--ml-text-base" value="clamp(1rem, 0.95rem + 0.25vw, 1.125rem)" />
          <TokenRow name="--ml-text-lg" value="clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem)" />
          <TokenRow name="--ml-text-xl" value="clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)" />
          <TokenRow name="--ml-text-2xl" value="clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem)" />
        </div>

        <h3>Color Tokens</h3>
        <div className="token-list">
          <TokenRow name="--ml-brand-sunset-coral" value="#FF6F61" />
          <TokenRow name="--ml-brand-ion-blue" value="#55C2FF" />
          <TokenRow name="--ml-brand-deep-space" value="#0B0F1A" />
          <TokenRow name="--ml-brand-aurora-green" value="#4AFF88" />
        </div>

        <h3>Component Tokens</h3>
        <div className="token-list">
          <TokenRow name="--ml-button-height-md" value="40px" description="Default button height" />
          <TokenRow name="--ml-card-padding-md" value="var(--ml-space-lg)" description="Card padding" />
          <TokenRow name="--ml-input-border-radius" value="var(--ml-radius-md)" description="Input border radius" />
          <TokenRow name="--ml-modal-backdrop" value="rgba(0, 0, 0, 0.5)" description="Modal backdrop" />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'typography': return renderTypography();
      case 'spacing': return renderSpacing();
      case 'grid': return renderGrid();
      case 'voice-tone': return renderVoiceTone();
      case 'microcopy': return renderMicrocopy();
      case 'inclusive': return renderInclusive();
      case 'tokens': return renderTokens();
      default: return renderOverview();
    }
  };

  return (
    <div className="sandbox">
      <header className="sandbox-header">
        <h1 className="sandbox-title">Design System Sandbox</h1>
        <p className="sandbox-subtitle">MaterialLab Design System Reference</p>
      </header>

      <div className="sandbox-layout">
        <nav className="sandbox-nav">
          <ul className="nav-list">
            {sections.map((section) => (
              <li key={section.key}>
                <button
                  className={`nav-button ${activeSection === section.key ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.key)}
                >
                  <span className="nav-icon">{section.icon}</span>
                  <span className="nav-label">{section.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="sandbox-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Sandbox;