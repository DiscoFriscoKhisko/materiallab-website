import React from 'react';

interface DocumentationDisplayProps {
  themeMode: string;
}

export const DocumentationDisplay: React.FC<DocumentationDisplayProps> = ({ themeMode }) => {
  return (
    <div className={`documentation-display ${themeMode}`}>
      <style>{`
        .documentation-display {
          padding: var(--lss-space-2xl);
          background: var(--lss-surface, rgba(255, 255, 255, 0.02));
          border: 1px solid var(--lss-outline, rgba(255, 255, 255, 0.1));
          border-radius: var(--lss-radius-lg);
          backdrop-filter: var(--lss-glass-blur-md);
        }
        
        .doc-header {
          margin-bottom: var(--lss-space-xl);
          padding-bottom: var(--lss-space-lg);
          border-bottom: 1px solid var(--lss-outline-variant);
        }
        
        .doc-title {
          font-family: var(--font-display);
          font-size: var(--lss-text-3xl);
          font-weight: 600;
          color: var(--lss-accent);
          margin: 0 0 var(--lss-space-md) 0;
        }
        
        .doc-subtitle {
          font-size: var(--lss-text-lg);
          color: var(--lss-text-secondary);
          margin: 0;
        }
        
        .doc-section {
          margin-bottom: var(--lss-space-2xl);
        }
        
        .doc-section-title {
          font-family: var(--font-primary);
          font-size: var(--lss-text-xl);
          font-weight: 600;
          color: var(--lss-text-primary);
          margin: 0 0 var(--lss-space-md) 0;
          display: flex;
          align-items: center;
          gap: var(--lss-space-sm);
        }
        
        .doc-content {
          font-size: var(--lss-text-base);
          line-height: 1.6;
          color: var(--lss-text-secondary);
        }
        
        .doc-code {
          background: rgba(0, 0, 0, 0.1);
          border: 1px solid var(--lss-outline-variant);
          border-radius: var(--lss-radius-md);
          padding: var(--lss-space-md);
          font-family: 'Source Code Pro', monospace;
          font-size: var(--lss-text-sm);
          white-space: pre-wrap;
          overflow-x: auto;
          margin: var(--lss-space-md) 0;
        }
        
        .doc-list {
          list-style: none;
          padding: 0;
          margin: var(--lss-space-md) 0;
        }
        
        .doc-list li {
          padding: var(--lss-space-sm) 0;
          padding-left: var(--lss-space-lg);
          position: relative;
        }
        
        .doc-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--lss-accent);
          font-weight: 600;
        }
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: var(--lss-space-xs) var(--lss-space-sm);
          border-radius: var(--lss-radius-full);
          font-size: var(--lss-text-xs);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .status-badge.experimental {
          background: linear-gradient(135deg, #FF6F61, #FFB84D);
          color: white;
        }
        
        .status-badge.production {
          background: linear-gradient(135deg, #4CAF50, #8BC34A);
          color: white;
        }
      `}</style>

      <div className="doc-header">
        <h1 className="doc-title">Long Story Short Documentation</h1>
        <p className="doc-subtitle">Experimental Design System & Component Library</p>
      </div>

      <div className="doc-section">
        <h2 className="doc-section-title">
          🏗️ System Architecture
        </h2>
        <div className="doc-content">
          <p>LSS serves as an experimental testbed for Material Lab components. Our workflow:</p>
          <ul className="doc-list">
            <li><strong>Experiment</strong> - Build and test components in LSS</li>
            <li><strong>Validate</strong> - Test across all 10 theme modes</li>
            <li><strong>Approve</strong> - Components pass quality gates</li>
            <li><strong>Promote</strong> - Copy approved components to Material Lab</li>
          </ul>
        </div>
      </div>

      <div className="doc-section">
        <h2 className="doc-section-title">
          🧱 Atomic Design Structure
        </h2>
        <div className="doc-content">
          <div className="doc-code">{`src/pages/LongStoryShort/atomic/
├── atoms/           # Basic elements
│   ├── GradientShowcase.tsx
│   ├── DesignTokensDisplay.tsx
│   └── TypographyPlayground.tsx
├── molecules/       # Combined atoms
│   ├── TypeTester.tsx
│   └── ModeShowcase.tsx
└── organisms/       # Complex sections
    ├── ColorSystemShowcase.tsx
    ├── LivePreview.tsx
    └── MoodBoardSection.tsx`}</div>
        </div>
      </div>

      <div className="doc-section">
        <h2 className="doc-section-title">
          🎨 10 Theme Modes
        </h2>
        <div className="doc-content">
          <p><strong>V1 Original Modes:</strong></p>
          <ul className="doc-list">
            <li>Light - Gallery clarity</li>
            <li>Dark - Cinematic depth</li>
            <li>Minimal - Zen focus</li>
            <li>Maximal - Rich abundance</li>
          </ul>
          
          <p><strong>Film-Inspired Modes:</strong></p>
          <ul className="doc-list">
            <li>Night Interior - Amber-lit intimacy</li>
            <li>Day Exterior - Natural daylight</li>
            <li>Golden Hour - Sunset warmth</li>
            <li>Intimate - Cozy interior</li>
            <li>Dramatic - High contrast</li>
            <li>Memory - Nostalgic fade</li>
          </ul>
        </div>
      </div>

      <div className="doc-section">
        <h2 className="doc-section-title">
          🚀 Copy System
        </h2>
        <div className="doc-content">
          <p>Use the copy script to promote approved components:</p>
          <div className="doc-code">{`# Copy specific component
node scripts/copy-to-material-lab.cjs atoms/TypographyPlayground.tsx

# Copy experimental tokens
node scripts/copy-to-material-lab.cjs tokens

# Copy all approved components
node scripts/copy-to-material-lab.cjs all`}</div>
        </div>
      </div>

      <div className="doc-section">
        <h2 className="doc-section-title">
          📊 Component Status
        </h2>
        <div className="doc-content">
          <p>Current component promotion status:</p>
          <ul className="doc-list">
            <li>Typography System <span className="status-badge experimental">Experimental</span></li>
            <li>Color System <span className="status-badge experimental">Experimental</span></li>
            <li>Design Tokens <span className="status-badge experimental">Experimental</span></li>
            <li>Theme Modes <span className="status-badge experimental">Experimental</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};