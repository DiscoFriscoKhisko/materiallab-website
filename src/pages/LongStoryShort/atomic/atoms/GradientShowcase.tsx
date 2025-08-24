import React, { useState } from 'react';
import { MLText, MLHeading } from '../../../../components/ML';

interface GradientShowcaseProps {
  themeMode: 'light' | 'dark' | 'minimal' | 'maximal';
}

interface GradientType {
  name: string;
  description: string;
  css: string;
  example: string;
  usage: string[];
}

interface GradientPairing {
  background: string;
  text: string;
  label: string;
  contrast: string;
}

export const GradientShowcase: React.FC<GradientShowcaseProps> = ({ themeMode }) => {
  const [copiedGradient, setCopiedGradient] = useState<string | null>(null);
  const [activeBuilder, setActiveBuilder] = useState(false);
  const [customGradient, setCustomGradient] = useState({
    type: 'linear',
    angle: 135,
    opacity: 8,
    color1: '#FF6B4A',
    color2: '#FFB84D'
  });

  const gradientTypes: GradientType[] = [
    {
      name: 'Radial Gradient',
      description: 'Pronounced semi-circular curve emanating from center, creating atmospheric glow',
      css: 'radial-gradient(circle at 50% 50%, rgba(255,107,74,0.08), transparent)',
      example: 'radial-gradient(circle at 50% 50%, rgba(255,107,74,0.08), transparent)',
      usage: [
        'Hero backgrounds with depth',
        'Card hover states',
        'Atmospheric overlays',
        'Focus indicators'
      ]
    },
    {
      name: 'Cropped Gradient',
      description: 'Linear fade effect, cropped deeper into curve for subtle sophistication',
      css: 'linear-gradient(180deg, rgba(255,107,74,0.08) 0%, transparent 100%)',
      example: 'linear-gradient(180deg, rgba(255,107,74,0.08) 0%, transparent 100%)',
      usage: [
        'Section dividers',
        'Content fade effects',
        'Navigation backgrounds',
        'Card subtle accents'
      ]
    },
    {
      name: 'Multi-Color Gradient',
      description: 'Sunset-inspired blend transitioning through multiple color stops',
      css: 'linear-gradient(135deg, #FF6B4A 0%, #FFB84D 50%, #B8A4E3 100%)',
      example: 'linear-gradient(135deg, #FF6B4A 0%, #FFB84D 50%, #B8A4E3 100%)',
      usage: [
        'Special hero sections',
        'Brand moments',
        'Creative backgrounds',
        'Call-to-action elements'
      ]
    }
  ];

  const gradientPairings: GradientPairing[] = [
    {
      background: 'radial-gradient(circle at 50% 50%, rgba(255,107,74,0.08), transparent)',
      text: '#0A0A0A',
      label: 'Coral Radial + Rich Black',
      contrast: '18.2:1'
    },
    {
      background: 'linear-gradient(180deg, rgba(26,139,157,0.08) 0%, transparent 100%)',
      text: '#0A0A0A',
      label: 'Teal Linear + Rich Black',
      contrast: '17.8:1'
    },
    {
      background: 'linear-gradient(135deg, rgba(255,107,74,0.05), rgba(255,184,77,0.05))',
      text: '#7A756F',
      label: 'Sunset Blend + Warm Grey',
      contrast: '4.2:1'
    },
    {
      background: 'radial-gradient(circle at 30% 70%, rgba(184,164,227,0.06), transparent)',
      text: '#0A0A0A',
      label: 'Lavender Radial + Rich Black',
      contrast: '19:1'
    }
  ];

  const gradientUsageExamples = [
    {
      title: 'Flat Color on Color',
      background: '#FF6B4A',
      color: '#FFFFFF',
      description: 'High contrast solid combinations'
    },
    {
      title: 'Flat Color on Gradient',
      background: 'radial-gradient(circle, rgba(255,107,74,0.08), transparent)',
      color: '#0A0A0A',
      description: 'Text over subtle gradient backgrounds'
    },
    {
      title: 'Gradient on Flat Color',
      background: '#FAF9F6',
      color: 'linear-gradient(135deg, #FF6B4A, #FFB84D)',
      description: 'Gradient text or elements on solid backgrounds'
    },
    {
      title: 'Gradient on Gradient',
      background: 'linear-gradient(180deg, rgba(255,107,74,0.04), transparent)',
      color: 'linear-gradient(135deg, #1A8B9D, #B8A4E3)',
      description: 'Layered gradients for maximum expression'
    }
  ];

  const copyToClipboard = (value: string, name: string) => {
    navigator.clipboard.writeText(value);
    setCopiedGradient(name);
    setTimeout(() => setCopiedGradient(null), 2000);
  };

  const generateCustomGradient = () => {
    const { type, angle, opacity, color1, color2 } = customGradient;
    const opacity1 = opacity / 100;
    const opacity2 = type === 'radial' ? 0 : opacity / 200;

    if (type === 'radial') {
      return `radial-gradient(circle at 50% 50%, ${color1}${Math.round(opacity1 * 255).toString(16).padStart(2, '0')}, transparent)`;
    } else {
      return `linear-gradient(${angle}deg, ${color1}${Math.round(opacity1 * 255).toString(16).padStart(2, '0')} 0%, ${color2}${Math.round(opacity2 * 255).toString(16).padStart(2, '0')} 100%)`;
    }
  };

  const GradientCard: React.FC<{ gradient: GradientType }> = ({ gradient }) => (
    <div className="lss-card gradient-card">
      <div 
        className="gradient-preview"
        style={{ background: gradient.example }}
        onClick={() => copyToClipboard(gradient.css, gradient.name)}
      >
        <div className="gradient-overlay">
          <span className="copy-text">
            {copiedGradient === gradient.name ? '✓ Copied!' : 'Click to copy'}
          </span>
        </div>
      </div>
      <div className="gradient-info">
        <h3 className="gradient-name">{gradient.name}</h3>
        <p className="gradient-description">{gradient.description}</p>
        <div className="gradient-css" onClick={() => copyToClipboard(gradient.css, gradient.name)}>
          <code>{gradient.css}</code>
        </div>
        <div className="gradient-usage">
          <h4>Best for:</h4>
          <ul>
            {gradient.usage.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="gradient-showcase">
      <style>{`
        .gradient-showcase {
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

        .gradient-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .gradient-card {
          cursor: pointer;
          overflow: hidden;
        }

        .gradient-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(255, 107, 74, 0.2);
        }

        .gradient-preview {
          height: 140px;
          width: 100%;
          position: relative;
          border-radius: 12px 12px 0 0;
          cursor: pointer;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gradient-preview::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--lss-bg-primary);
          z-index: -1;
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .gradient-preview:hover .gradient-overlay {
          opacity: 1;
        }

        .copy-text {
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .gradient-info {
          padding: 1.5rem;
        }

        .gradient-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 0.75rem;
        }

        .gradient-description {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .gradient-css {
          background: rgba(122, 117, 111, 0.1);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .gradient-css:hover {
          background: rgba(255, 107, 74, 0.1);
        }

        .gradient-css code {
          font-family: var(--lss-font-mono);
          font-size: 0.75rem;
          color: var(--lss-text-primary);
          word-break: break-all;
        }

        .gradient-usage h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 0.5rem;
        }

        .gradient-usage ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .gradient-usage li {
          font-size: 0.75rem;
          color: var(--lss-text-secondary);
          padding: 0.25rem 0;
          border-left: 2px solid var(--lss-accent);
          padding-left: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .pairing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .pairing-card {
          overflow: hidden;
        }

        .pairing-preview {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          font-size: 2rem;
          font-weight: 700;
          font-family: var(--lss-font-display);
        }

        .pairing-info {
          padding: 1rem;
        }

        .pairing-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 0.5rem;
        }

        .pairing-contrast {
          font-size: 0.75rem;
          color: var(--lss-text-secondary);
          font-family: var(--lss-font-mono);
        }

        .usage-examples {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 3rem 0;
        }

        .usage-example {
          background: var(--lss-surface);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          border: 1px solid rgba(255, 107, 74, 0.1);
          transition: all var(--lss-duration-normal) var(--lss-easing);
        }

        .usage-example:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 107, 74, 0.15);
        }

        .usage-preview {
          height: 80px;
          border-radius: 12px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          font-family: var(--lss-font-display);
        }

        .usage-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 0.5rem;
        }

        .usage-description {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.4;
        }

        .gradient-builder {
          background: var(--lss-surface);
          border-radius: 20px;
          padding: 2rem;
          margin: 3rem 0;
          border: 1px solid rgba(255, 107, 74, 0.1);
        }

        .builder-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .builder-controls {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .control-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--lss-text-primary);
        }

        .control-input {
          padding: 0.75rem;
          border: 1px solid rgba(255, 107, 74, 0.2);
          border-radius: 8px;
          background: var(--lss-bg-primary);
          color: var(--lss-text-primary);
          font-family: var(--lss-font-body);
        }

        .control-input:focus {
          outline: none;
          border-color: var(--lss-accent);
          box-shadow: 0 0 0 2px rgba(255, 107, 74, 0.1);
        }

        .builder-preview {
          height: 120px;
          border-radius: 16px;
          margin-bottom: 1rem;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .builder-preview:hover {
          transform: scale(1.02);
        }

        .builder-output {
          background: rgba(122, 117, 111, 0.1);
          border-radius: 12px;
          padding: 1rem;
          font-family: var(--lss-font-mono);
          font-size: 0.875rem;
          color: var(--lss-text-primary);
          word-break: break-all;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .builder-output:hover {
          background: rgba(255, 107, 74, 0.1);
        }

        @media (max-width: 768px) {
          .gradient-grid {
            grid-template-columns: 1fr;
          }
          
          .builder-controls {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>

      {/* Header */}
      <section className="section-header">
        <h1 className="section-title">Gradient System</h1>
        <p className="section-subtitle">
          Three distinct gradient styles inspired by cinematic lighting effects. 
          Each serves a specific purpose in creating atmospheric depth and visual hierarchy.
        </p>
      </section>

      {/* Gradient Types */}
      <div className="gradient-grid">
        {gradientTypes.map((gradient) => (
          <GradientCard key={gradient.name} gradient={gradient} />
        ))}
      </div>

      {/* Interactive Builder */}
      <div className="gradient-builder">
        <div className="builder-header">
          <h2 style={{ color: 'var(--lss-text-primary)', marginBottom: '0.5rem' }}>
            Gradient Builder
          </h2>
          <p style={{ color: 'var(--lss-text-secondary)' }}>
            Experiment with custom gradients following our design principles
          </p>
        </div>

        <div className="builder-controls">
          <div className="control-group">
            <label className="control-label">Type</label>
            <select
              className="control-input"
              value={customGradient.type}
              onChange={(e) => setCustomGradient(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </div>

          {customGradient.type === 'linear' && (
            <div className="control-group">
              <label className="control-label">Angle ({customGradient.angle}°)</label>
              <input
                type="range"
                min="0"
                max="360"
                value={customGradient.angle}
                onChange={(e) => setCustomGradient(prev => ({ ...prev, angle: parseInt(e.target.value) }))}
                className="control-input"
              />
            </div>
          )}

          <div className="control-group">
            <label className="control-label">Opacity ({customGradient.opacity}%)</label>
            <input
              type="range"
              min="2"
              max="20"
              value={customGradient.opacity}
              onChange={(e) => setCustomGradient(prev => ({ ...prev, opacity: parseInt(e.target.value) }))}
              className="control-input"
            />
          </div>

          <div className="control-group">
            <label className="control-label">Color 1</label>
            <input
              type="color"
              value={customGradient.color1}
              onChange={(e) => setCustomGradient(prev => ({ ...prev, color1: e.target.value }))}
              className="control-input"
            />
          </div>

          {customGradient.type === 'linear' && (
            <div className="control-group">
              <label className="control-label">Color 2</label>
              <input
                type="color"
                value={customGradient.color2}
                onChange={(e) => setCustomGradient(prev => ({ ...prev, color2: e.target.value }))}
                className="control-input"
              />
            </div>
          )}
        </div>

        <div 
          className="builder-preview"
          style={{ background: generateCustomGradient() }}
          onClick={() => copyToClipboard(generateCustomGradient(), 'Custom Gradient')}
        />

        <div 
          className="builder-output"
          onClick={() => copyToClipboard(generateCustomGradient(), 'Custom Gradient')}
        >
          {generateCustomGradient()}
        </div>
      </div>

      {/* Gradient Pairings */}
      <section className="section-header">
        <h2 className="section-title">Gradient Pairings</h2>
        <p className="section-subtitle">
          Approved gradient-text combinations maintaining accessibility standards
        </p>
      </section>

      <div className="pairing-grid">
        {gradientPairings.map((pairing, index) => (
          <div key={index} className="lss-card pairing-card">
            <div 
              className="pairing-preview"
              style={{ 
                background: pairing.background,
                color: pairing.text
              }}
            >
              Aa
            </div>
            <div className="pairing-info">
              <h4 className="pairing-label">{pairing.label}</h4>
              <p className="pairing-contrast">Contrast: {pairing.contrast}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Usage Spectrum */}
      <section className="section-header">
        <h2 className="section-title">Usage Spectrum</h2>
        <p className="section-subtitle">
          Four application methods from minimal to maximum expression
        </p>
      </section>

      <div className="usage-examples">
        {gradientUsageExamples.map((example, index) => (
          <div key={index} className="usage-example">
            <div 
              className="usage-preview"
              style={{ 
                background: example.background,
                color: example.color
              }}
            >
              Aa
            </div>
            <h4 className="usage-title">{example.title}</h4>
            <p className="usage-description">{example.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};