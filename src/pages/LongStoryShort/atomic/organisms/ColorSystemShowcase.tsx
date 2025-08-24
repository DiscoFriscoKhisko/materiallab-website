import React, { useState } from 'react';
import { MLText, MLHeading } from '../../../../components/ML';

interface ColorSystemShowcaseProps {
  themeMode: 'light' | 'dark' | 'minimal' | 'maximal';
}

interface ColorInfo {
  name: string;
  hex: string;
  rgb: string;
  hsb: string;
  usage: string;
  category: 'core' | 'secondary';
  contrast?: string;
}

interface ColorPairing {
  background: string;
  foreground: string;
  label: string;
  contrast: string;
  approved: boolean;
}

export const ColorSystemShowcase: React.FC<ColorSystemShowcaseProps> = ({ themeMode }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const coreColors: ColorInfo[] = [
    {
      name: 'Sunset Coral',
      hex: '#FF6B4A',
      rgb: 'rgb(255, 107, 74)',
      hsb: 'hsb(11°, 71%, 100%)',
      usage: 'Primary brand color - 80% of color usage',
      category: 'core',
      contrast: '4.5:1'
    },
    {
      name: 'Soft White',
      hex: '#FAF9F6',
      rgb: 'rgb(250, 249, 246)',
      hsb: 'hsb(40°, 3%, 98%)',
      usage: 'Primary backgrounds, extensive whitespace',
      category: 'core'
    },
    {
      name: 'Rich Black',
      hex: '#0A0A0A',
      rgb: 'rgb(10, 10, 10)',
      hsb: 'hsb(0°, 0%, 4%)',
      usage: 'Primary text, high contrast elements',
      category: 'core',
      contrast: '19:1'
    },
    {
      name: 'Warm Grey',
      hex: '#7A756F',
      rgb: 'rgb(122, 117, 111)',
      hsb: 'hsb(30°, 10%, 48%)',
      usage: 'Secondary text, subtle elements',
      category: 'core',
      contrast: '2.8:1'
    }
  ];

  const secondaryColors: ColorInfo[] = [
    {
      name: 'Deep Teal',
      hex: '#1A8B9D',
      rgb: 'rgb(26, 139, 157)',
      hsb: 'hsb(188°, 83%, 62%)',
      usage: 'Accent color, interactive elements - 20% usage',
      category: 'secondary',
      contrast: '3.2:1'
    },
    {
      name: 'Soft Lavender',
      hex: '#B8A4E3',
      rgb: 'rgb(184, 164, 227)',
      hsb: 'hsb(254°, 28%, 89%)',
      usage: 'Creative contexts, very limited use',
      category: 'secondary',
      contrast: '2.1:1'
    },
    {
      name: 'Golden Hour',
      hex: '#FFB84D',
      rgb: 'rgb(255, 184, 77)',
      hsb: 'hsb(36°, 70%, 100%)',
      usage: 'Energetic accents, warning states',
      category: 'secondary',
      contrast: '1.8:1'
    }
  ];

  const approvedPairings: ColorPairing[] = [
    {
      background: '#FAF9F6',
      foreground: '#0A0A0A',
      label: 'Soft White + Rich Black',
      contrast: '19:1',
      approved: true
    },
    {
      background: '#FF6B4A',
      foreground: '#FAF9F6',
      label: 'Sunset Coral + Soft White',
      contrast: '4.5:1',
      approved: true
    },
    {
      background: '#0A0A0A',
      foreground: '#FAF9F6',
      label: 'Rich Black + Soft White',
      contrast: '19:1',
      approved: true
    },
    {
      background: '#1A8B9D',
      foreground: '#FAF9F6',
      label: 'Deep Teal + Soft White',
      contrast: '5.2:1',
      approved: true
    }
  ];

  const forbiddenPairings: ColorPairing[] = [
    {
      background: '#FF6B4A',
      foreground: '#FFB84D',
      label: 'Color on Color',
      contrast: '1.2:1',
      approved: false
    },
    {
      background: '#FAF9F6',
      foreground: '#B8A4E3',
      label: 'Light Color on White',
      contrast: '2.1:1',
      approved: false
    },
    {
      background: '#7A756F',
      foreground: '#0A0A0A',
      label: 'Dark Color on Dark',
      contrast: '2.8:1',
      approved: false
    }
  ];

  const copyToClipboard = (value: string, colorName: string) => {
    navigator.clipboard.writeText(value);
    setCopiedColor(colorName);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const ColorCard: React.FC<{ color: ColorInfo }> = ({ color }) => (
    <div className="lss-card color-card">
      <div 
        className="color-swatch"
        style={{ backgroundColor: color.hex }}
        onClick={() => copyToClipboard(color.hex, color.name)}
      >
        <div className="color-overlay">
          <span className="copy-text">
            {copiedColor === color.name ? '✓ Copied!' : 'Click to copy'}
          </span>
        </div>
      </div>
      <div className="color-info">
        <h3 className="color-name">{color.name}</h3>
        <div className="color-values">
          <div className="color-value" onClick={() => copyToClipboard(color.hex, color.name)}>
            <span className="value-label">HEX:</span>
            <span className="value-text">{color.hex}</span>
          </div>
          <div className="color-value" onClick={() => copyToClipboard(color.rgb, color.name)}>
            <span className="value-label">RGB:</span>
            <span className="value-text">{color.rgb}</span>
          </div>
          <div className="color-value" onClick={() => copyToClipboard(color.hsb, color.name)}>
            <span className="value-label">HSB:</span>
            <span className="value-text">{color.hsb}</span>
          </div>
          {color.contrast && (
            <div className="color-value">
              <span className="value-label">Contrast:</span>
              <span className="value-text">{color.contrast}</span>
            </div>
          )}
        </div>
        <p className="color-usage">{color.usage}</p>
      </div>
    </div>
  );

  const PairingCard: React.FC<{ pairing: ColorPairing }> = ({ pairing }) => (
    <div className={`lss-card pairing-card ${!pairing.approved ? 'forbidden' : ''}`}>
      <div 
        className="pairing-preview"
        style={{ 
          backgroundColor: pairing.background,
          color: pairing.foreground
        }}
      >
        <span className="pairing-text">Aa</span>
        <div className="pairing-status">
          {pairing.approved ? '✓' : '✗'}
        </div>
      </div>
      <div className="pairing-info">
        <h4 className="pairing-label">{pairing.label}</h4>
        <p className="pairing-contrast">Contrast: {pairing.contrast}</p>
        <p className={`pairing-status-text ${pairing.approved ? 'approved' : 'forbidden'}`}>
          {pairing.approved ? 'WCAG AA Compliant' : 'Not Recommended'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="color-system-showcase">
      <style>{`
        .color-system-showcase {
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

        .color-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .color-card {
          cursor: pointer;
          overflow: hidden;
        }

        .color-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(255, 107, 74, 0.2);
        }

        .color-swatch {
          height: 120px;
          width: 100%;
          position: relative;
          border-radius: 12px 12px 0 0;
          cursor: pointer;
          overflow: hidden;
        }

        .color-overlay {
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

        .color-swatch:hover .color-overlay {
          opacity: 1;
        }

        .copy-text {
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .color-info {
          padding: 1.5rem;
        }

        .color-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 1rem;
        }

        .color-values {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .color-value {
          display: flex;
          justify-content: space-between;
          padding: 0.25rem 0;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }

        .color-value:hover {
          background: rgba(255, 107, 74, 0.05);
        }

        .value-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--lss-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .value-text {
          font-size: 0.875rem;
          font-family: var(--lss-font-mono);
          color: var(--lss-text-primary);
        }

        .color-usage {
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.4;
        }

        .pairing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .pairing-card {
          overflow: hidden;
        }

        .pairing-card.forbidden {
          border-color: #EF4444;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), transparent);
        }

        .pairing-preview {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          font-size: 2rem;
          font-weight: 700;
        }

        .pairing-text {
          font-family: var(--lss-font-display);
        }

        .pairing-status {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
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
          margin-bottom: 0.5rem;
        }

        .pairing-status-text {
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .pairing-status-text.approved {
          color: #10B981;
        }

        .pairing-status-text.forbidden {
          color: #EF4444;
        }

        .usage-ratio {
          background: var(--lss-surface);
          border-radius: 16px;
          padding: 2rem;
          margin: 3rem 0;
          text-align: center;
          border: 1px solid rgba(255, 107, 74, 0.1);
        }

        .ratio-visual {
          display: flex;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          margin: 1.5rem 0;
        }

        .ratio-core {
          background: linear-gradient(90deg, #FF6B4A, #FAF9F6, #0A0A0A, #7A756F);
          flex: 8;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .ratio-secondary {
          background: linear-gradient(90deg, #1A8B9D, #B8A4E3, #FFB84D);
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .ratio-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }

        .ratio-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--lss-text-secondary);
        }

        @media (max-width: 768px) {
          .color-grid {
            grid-template-columns: 1fr;
          }
          
          .pairing-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>

      {/* Core Palette Section */}
      <section className="section-header">
        <h1 className="section-title">Core Color Palette</h1>
        <p className="section-subtitle">
          Four foundational colors forming 80% of our visual language. Each color serves a specific 
          purpose in creating emotional depth and visual hierarchy.
        </p>
      </section>

      <div className="color-grid">
        {coreColors.map((color) => (
          <ColorCard key={color.name} color={color} />
        ))}
      </div>

      {/* Usage Ratio */}
      <div className="usage-ratio">
        <h3 style={{ color: 'var(--lss-text-primary)', marginBottom: '1rem' }}>
          80/20 Color Usage Rule
        </h3>
        <p style={{ color: 'var(--lss-text-secondary)', marginBottom: '1.5rem' }}>
          Core palette dominates the design, secondary colors provide strategic accents
        </p>
        <div className="ratio-visual">
          <div className="ratio-core">Core Colors - 80%</div>
          <div className="ratio-secondary">Secondary - 20%</div>
        </div>
        <div className="ratio-labels">
          <span className="ratio-label">Foundation & Structure</span>
          <span className="ratio-label">Accents & Energy</span>
        </div>
      </div>

      {/* Secondary Palette Section */}
      <section className="section-header">
        <h2 className="section-title">Secondary Palette</h2>
        <p className="section-subtitle">
          Expressive accent colors for emotional moments, interactive feedback, 
          and creative expression. Use sparingly for maximum impact.
        </p>
      </section>

      <div className="color-grid">
        {secondaryColors.map((color) => (
          <ColorCard key={color.name} color={color} />
        ))}
      </div>

      {/* Approved Pairings */}
      <section className="section-header">
        <h2 className="section-title">Approved Color Pairings</h2>
        <p className="section-subtitle">
          WCAG AA compliant combinations ensuring accessibility and visual clarity
        </p>
      </section>

      <div className="pairing-grid">
        {approvedPairings.map((pairing, index) => (
          <PairingCard key={index} pairing={pairing} />
        ))}
      </div>

      {/* Forbidden Pairings */}
      <section className="section-header">
        <h2 className="section-title">Pairings to Avoid</h2>
        <p className="section-subtitle">
          These combinations create accessibility issues or visual confusion
        </p>
      </section>

      <div className="pairing-grid">
        {forbiddenPairings.map((pairing, index) => (
          <PairingCard key={index} pairing={pairing} />
        ))}
      </div>
    </div>
  );
};