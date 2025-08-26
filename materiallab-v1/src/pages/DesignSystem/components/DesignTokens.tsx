import React from 'react';
import { MLCard, MLText, MLHeading } from '../../../components/ML';

interface TokenGroupProps {
  title: string;
  children: React.ReactNode;
}

const TokenGroup: React.FC<TokenGroupProps> = ({ title, children }) => (
  <div className="token-group">
    <div className="token-group-header">
      <MLHeading level="3">{title}</MLHeading>
    </div>
    <div className="token-group-content">
      {children}
    </div>
  </div>
);

interface ColorSwatchProps {
  name: string;
  value: string;
  cssVar: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, value, cssVar }) => (
  <div className="color-swatch">
    <div 
      className="color-preview" 
      style={{ backgroundColor: `var(${cssVar})` }}
    />
    <div className="color-info">
      <div className="color-name">{name}</div>
      <div className="color-value">{cssVar}</div>
      <div className="color-value" style={{ fontSize: '0.75rem', opacity: 0.7 }}>
        {value}
      </div>
    </div>
  </div>
);

interface TypographyExampleProps {
  label: string;
  cssClass: string;
  text: string;
}

const TypographyExample: React.FC<TypographyExampleProps> = ({ label, cssClass, text }) => (
  <div className="typography-example">
    <MLText className="typography-label" style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.5rem' }}>
      {label}
    </MLText>
    <div className={cssClass}>{text}</div>
  </div>
);

interface SpacingExampleProps {
  name: string;
  value: string;
  cssVar: string;
}

const SpacingExample: React.FC<SpacingExampleProps> = ({ name, value, cssVar }) => (
  <div className="spacing-example">
    <div 
      className="spacing-visual" 
      style={{ 
        width: `calc(${cssVar} * 4)`, 
        height: cssVar,
        minWidth: '16px',
        minHeight: '4px'
      }}
    />
    <MLText style={{ fontSize: '0.75rem', fontWeight: 600 }}>{name}</MLText>
    <MLText style={{ fontSize: '0.75rem', opacity: 0.7 }}>{value}</MLText>
    <MLText style={{ fontSize: '0.75rem', opacity: 0.7, fontFamily: 'monospace' }}>{cssVar}</MLText>
  </div>
);

export const DesignTokens: React.FC = () => {
  const colors = [
    { name: 'Primary', value: '#55C2FF', cssVar: '--primary' },
    { name: 'Secondary', value: '#FF6F61', cssVar: '--secondary' },
    { name: 'Background', value: '#0B0F1A', cssVar: '--background' },
    { name: 'Surface', value: '#1A1F2E', cssVar: '--surface' },
    { name: 'Surface 1', value: '#242B3D', cssVar: '--surface-1' },
    { name: 'Surface 2', value: '#2E3749', cssVar: '--surface-2' },
    { name: 'On Surface', value: 'rgba(255, 255, 255, 0.87)', cssVar: '--on-surface' },
    { name: 'On Surface Variant', value: 'rgba(255, 255, 255, 0.60)', cssVar: '--on-surface-variant' },
    { name: 'Error', value: '#FF5449', cssVar: '--error' },
    { name: 'Warning', value: '#FFB74D', cssVar: '--warning' },
    { name: 'Success', value: '#81C784', cssVar: '--success' },
  ];

  const typographyStyles = [
    { label: 'Display Large (5xl)', cssClass: 'text-5xl font-display font-bold', text: 'MaterialLab Design System' },
    { label: 'Display Medium (4xl)', cssClass: 'text-4xl font-display font-semibold', text: 'Section Heading' },
    { label: 'Heading Large (3xl)', cssClass: 'text-3xl font-display font-semibold', text: 'Component Title' },
    { label: 'Heading Medium (2xl)', cssClass: 'text-2xl font-primary font-semibold', text: 'Subsection Heading' },
    { label: 'Heading Small (xl)', cssClass: 'text-xl font-primary font-medium', text: 'Card Title' },
    { label: 'Body Large (lg)', cssClass: 'text-lg font-primary font-normal', text: 'Large body text for important content and readability.' },
    { label: 'Body Medium (base)', cssClass: 'text-base font-primary font-normal', text: 'Standard body text for most content. This is the default text size.' },
    { label: 'Body Small (sm)', cssClass: 'text-sm font-primary font-normal', text: 'Smaller text for secondary information and captions.' },
    { label: 'Caption (xs)', cssClass: 'text-xs font-primary font-medium', text: 'Very small text for labels and metadata.' },
  ];

  const spacingTokens = [
    { name: 'Space 1', value: '4px', cssVar: '--space-1' },
    { name: 'Space 2', value: '8px', cssVar: '--space-2' },
    { name: 'Space 3', value: '12px', cssVar: '--space-3' },
    { name: 'Space 4', value: '16px', cssVar: '--space-4' },
    { name: 'Space 5', value: '20px', cssVar: '--space-5' },
    { name: 'Space 6', value: '24px', cssVar: '--space-6' },
    { name: 'Space 8', value: '32px', cssVar: '--space-8' },
    { name: 'Space 10', value: '40px', cssVar: '--space-10' },
    { name: 'Space 12', value: '48px', cssVar: '--space-12' },
    { name: 'Space 16', value: '64px', cssVar: '--space-16' },
    { name: 'Space 20', value: '80px', cssVar: '--space-20' },
    { name: 'Space 24', value: '96px', cssVar: '--space-24' },
  ];

  return (
    <div className="design-system-content">
      <MLHeading level="1">Design Tokens</MLHeading>
      <MLText className="design-system-subtitle">
        MaterialLab's design tokens following dark-first, AI-native principles with dual theme support
      </MLText>

      <div className="design-tokens-section">
        <TokenGroup title="Color System">
          <MLText style={{ marginBottom: 'var(--space-6)', color: 'var(--on-surface-variant)' }}>
            Dark-first color palette with Ion Blue primary and Sunset Coral secondary. 
            Designed for AI-native interfaces with optimal contrast and accessibility.
          </MLText>
          <div className="color-palette">
            {colors.map((color) => (
              <ColorSwatch
                key={color.name}
                name={color.name}
                value={color.value}
                cssVar={color.cssVar}
              />
            ))}
          </div>
        </TokenGroup>

        <TokenGroup title="Typography Scale">
          <MLText style={{ marginBottom: 'var(--space-6)', color: 'var(--on-surface-variant)' }}>
            Google-inspired typography scale using Inter Variable for body text and Sora Variable for display text.
            Optimized for readability across all devices and accessibility compliance.
          </MLText>
          <div className="typography-showcase">
            {typographyStyles.map((style) => (
              <TypographyExample
                key={style.label}
                label={style.label}
                cssClass={style.cssClass}
                text={style.text}
              />
            ))}
          </div>
        </TokenGroup>

        <TokenGroup title="Spacing System">
          <MLText style={{ marginBottom: 'var(--space-6)', color: 'var(--on-surface-variant)' }}>
            8px base grid system inspired by Google Material Design. 
            Consistent spacing ensures visual rhythm and professional layouts.
          </MLText>
          <div className="spacing-grid">
            {spacingTokens.map((spacing) => (
              <SpacingExample
                key={spacing.name}
                name={spacing.name}
                value={spacing.value}
                cssVar={spacing.cssVar}
              />
            ))}
          </div>
        </TokenGroup>

        <TokenGroup title="Border Radius">
          <MLText style={{ marginBottom: 'var(--space-6)', color: 'var(--on-surface-variant)' }}>
            Rounded corners following Material Design 3 specifications for modern, friendly interfaces.
          </MLText>
          <div className="spacing-grid">
            <div className="spacing-example">
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--primary)',
                borderRadius: '4px' 
              }} />
              <MLText style={{ fontSize: '0.75rem', fontWeight: 600 }}>Small</MLText>
              <MLText style={{ fontSize: '0.75rem', opacity: 0.7 }}>4px</MLText>
            </div>
            <div className="spacing-example">
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--primary)',
                borderRadius: '8px' 
              }} />
              <MLText style={{ fontSize: '0.75rem', fontWeight: 600 }}>Medium</MLText>
              <MLText style={{ fontSize: '0.75rem', opacity: 0.7 }}>8px</MLText>
            </div>
            <div className="spacing-example">
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--primary)',
                borderRadius: '12px' 
              }} />
              <MLText style={{ fontSize: '0.75rem', fontWeight: 600 }}>Large</MLText>
              <MLText style={{ fontSize: '0.75rem', opacity: 0.7 }}>12px</MLText>
            </div>
            <div className="spacing-example">
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--primary)',
                borderRadius: '16px' 
              }} />
              <MLText style={{ fontSize: '0.75rem', fontWeight: 600 }}>X-Large</MLText>
              <MLText style={{ fontSize: '0.75rem', opacity: 0.7 }}>16px</MLText>
            </div>
          </div>
        </TokenGroup>

        <TokenGroup title="Usage Guidelines">
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <MLCard style={{ padding: 'var(--space-4)', background: 'var(--surface-1)' }}>
              <MLHeading level="4" style={{ color: 'var(--success)', marginBottom: 'var(--space-2)' }}>
                ✅ Do
              </MLHeading>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-4)' }}>
                <li>Use CSS custom properties exclusively (var(--token-name))</li>
                <li>Follow the 8px spacing grid for layouts</li>
                <li>Use semantic color tokens (--primary, --surface) not raw values</li>
                <li>Test color contrast ratios for accessibility (4.5:1 minimum)</li>
                <li>Stick to the defined typography scale</li>
              </ul>
            </MLCard>
            
            <MLCard style={{ padding: 'var(--space-4)', background: 'var(--surface-1)' }}>
              <MLHeading level="4" style={{ color: 'var(--error)', marginBottom: 'var(--space-2)' }}>
                ❌ Don't
              </MLHeading>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-4)' }}>
                <li>Use hard-coded hex colors (#FF5722, #1976D2)</li>
                <li>Use arbitrary spacing values (15px, 23px, 37px)</li>
                <li>Mix different font families outside the defined system</li>
                <li>Override token values without design system approval</li>
                <li>Use pixel values instead of rem/em for typography</li>
              </ul>
            </MLCard>
          </div>
        </TokenGroup>
      </div>
    </div>
  );
};