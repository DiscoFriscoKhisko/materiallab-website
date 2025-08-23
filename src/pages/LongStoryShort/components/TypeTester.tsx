import React, { useState, useEffect } from 'react';

interface TypeTesterProps {
  themeMode: string;
}

export const TypeTester: React.FC<TypeTesterProps> = ({ themeMode }) => {
  const [selectedClass, setSelectedClass] = useState('ml-typo-hero');
  const [customText, setCustomText] = useState('Material Lab: White-glove software partnership that turns conversations into elegant solutions');
  const [showSpecs, setShowSpecs] = useState(true);
  const [personalityMode, setPersonalityMode] = useState('none');

  const typographyClasses = [
    { 
      category: 'Display & Hero',
      classes: [
        { name: 'Hero Typography', value: 'ml-typo-hero', description: 'Compelling presenter moments' },
        { name: 'Display 1', value: 'ml-typo-display-1', description: 'Large display text' },
        { name: 'Display 2', value: 'ml-typo-display-2', description: 'Medium display text' },
        { name: 'Display 3', value: 'ml-typo-display-3', description: 'Small display text' }
      ]
    },
    { 
      category: 'Headings',
      classes: [
        { name: 'Heading 1', value: 'ml-typo-h1', description: 'Primary page heading' },
        { name: 'Heading 2', value: 'ml-typo-h2', description: 'Major section heading' },
        { name: 'Heading 3', value: 'ml-typo-h3', description: 'Subsection heading' },
        { name: 'Heading 4', value: 'ml-typo-h4', description: 'Minor section heading' },
        { name: 'Heading 5', value: 'ml-typo-h5', description: 'Small heading' },
        { name: 'Heading 6', value: 'ml-typo-h6', description: 'Smallest heading' }
      ]
    },
    { 
      category: 'Body Text',
      classes: [
        { name: 'Body XL', value: 'ml-typo-body-xl', description: 'Important content' },
        { name: 'Body Large', value: 'ml-typo-body-lg', description: 'Readable content' },
        { name: 'Body Standard', value: 'ml-typo-body', description: 'Default body text' },
        { name: 'Body Small', value: 'ml-typo-body-sm', description: 'Secondary information' },
        { name: 'Caption', value: 'ml-typo-caption', description: 'Labels and metadata' }
      ]
    },
    { 
      category: 'Special',
      classes: [
        { name: 'Code', value: 'ml-typo-code', description: 'Technical content' },
        { name: 'Button', value: 'ml-typo-button', description: 'Interactive buttons' },
        { name: 'Link', value: 'ml-typo-link', description: 'Interactive links' }
      ]
    }
  ];

  const personalityModes = [
    { name: 'None', value: 'none', description: 'Default styling' },
    { name: 'Thoughtful Expert', value: 'typo-expert', description: 'Shy, nerdy, helpful when engaged' },
    { name: 'Compelling Presenter', value: 'typo-presenter', description: 'Confident, compelling, inspiring' }
  ];

  const sampleTexts = [
    "Material Lab: White-glove software partnership that turns conversations into elegant solutions",
    "We exist to democratize access to enterprise-quality technology for early-stage businesses.",
    "Thoughtfully nerdy with moments of compelling charm—that's our brand personality.",
    "Transform your vision into reality with AI-powered product development.",
    "const designSystem = { typography: 'enhanced', accessibility: 'WCAG 2.1 AA' };",
    "Everything we do must move humanity forward, even if incrementally.",
    "Start Building • See Our Work • Learn Our Approach"
  ];

  // Get computed styles for display
  const [computedStyles, setComputedStyles] = useState<Record<string, string>>({});

  useEffect(() => {
    const element = document.createElement('div');
    element.className = `${selectedClass} ${personalityMode !== 'none' ? personalityMode : ''}`;
    document.body.appendChild(element);
    
    const styles = window.getComputedStyle(element);
    setComputedStyles({
      fontFamily: styles.fontFamily,
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      lineHeight: styles.lineHeight,
      letterSpacing: styles.letterSpacing
    });
    
    document.body.removeChild(element);
  }, [selectedClass, personalityMode]);

  const getCurrentClass = () => {
    return `${selectedClass} ${personalityMode !== 'none' ? personalityMode : ''}`.trim();
  };

  return (
    <div className="type-tester">
      <style>{`
        .type-tester {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .tester-header {
          text-align: center;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid var(--lss-accent, #FF6B4A);
        }

        .tester-title {
          font-family: var(--font-primary);
          font-size: 2.5rem;
          font-weight: 600;
          color: var(--lss-text-primary);
          margin-bottom: 1rem;
        }

        .tester-subtitle {
          font-family: var(--font-body);
          font-size: 1.125rem;
          color: var(--lss-text-secondary);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .tester-controls {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .control-section {
          background: var(--lss-surface, rgba(255, 255, 255, 0.9));
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
        }

        .control-title {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--lss-accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .typography-selector {
          margin-bottom: 2rem;
        }

        .category-group {
          margin-bottom: 1.5rem;
        }

        .category-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--lss-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          display: block;
        }

        .class-options {
          display: grid;
          gap: 0.5rem;
        }

        .class-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .class-option:hover {
          background: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.05);
        }

        .class-option input[type="radio"] {
          margin: 0;
        }

        .class-option-content {
          flex: 1;
          min-width: 0;
        }

        .class-option-name {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--lss-text-primary);
          margin-bottom: 0.125rem;
        }

        .class-option-description {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--lss-text-secondary);
        }

        .personality-selector {
          display: grid;
          gap: 0.5rem;
        }

        .personality-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          padding: 0.75rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          border: 1px solid rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
        }

        .personality-option:hover {
          background: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.05);
          border-color: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.2);
        }

        .personality-option.selected {
          background: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
          border-color: var(--lss-accent);
        }

        .text-input-section {
          grid-column: 1 / -1;
        }

        .text-input {
          width: 100%;
          min-height: 120px;
          padding: 1rem;
          border: 1px solid rgba(var(--lss-accent-rgb, 255, 107, 74), 0.2);
          border-radius: 8px;
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.5;
          color: var(--lss-text-primary);
          background: var(--lss-surface, rgba(255, 255, 255, 0.9));
          resize: vertical;
          transition: all 0.2s ease;
        }

        .text-input:focus {
          outline: none;
          border-color: var(--lss-accent);
          box-shadow: 0 0 0 2px rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
        }

        .sample-texts {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .sample-text-btn {
          padding: 0.375rem 0.75rem;
          border: 1px solid rgba(var(--lss-accent-rgb, 255, 107, 74), 0.2);
          border-radius: 20px;
          background: transparent;
          color: var(--lss-text-secondary);
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sample-text-btn:hover {
          background: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
          border-color: var(--lss-accent);
          color: var(--lss-text-primary);
        }

        .preview-section {
          background: var(--lss-surface, rgba(255, 255, 255, 0.9));
          border-radius: 12px;
          padding: 3rem;
          border: 1px solid rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
          margin-bottom: 2rem;
          position: relative;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .preview-text {
          color: var(--lss-text-primary);
          max-width: 100%;
          word-wrap: break-word;
          hyphens: auto;
        }

        .specs-section {
          background: var(--lss-surface, rgba(255, 255, 255, 0.9));
          border-radius: 12px;
          padding: 2rem;
          border: 1px solid rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
          transition: all 0.3s ease;
          max-height: ${showSpecs ? '400px' : '60px'};
          overflow: hidden;
        }

        .specs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: ${showSpecs ? '1.5rem' : '0'};
          cursor: pointer;
        }

        .specs-title {
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          color: var(--lss-text-primary);
        }

        .specs-toggle {
          background: none;
          border: none;
          color: var(--lss-accent);
          cursor: pointer;
          font-size: 1.25rem;
          padding: 0;
          transform: rotate(${showSpecs ? '180deg' : '0deg'});
          transition: transform 0.3s ease;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .spec-item {
          background: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.05);
          padding: 1rem;
          border-radius: 8px;
          border-left: 3px solid var(--lss-accent);
        }

        .spec-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--lss-accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .spec-value {
          font-family: var(--font-code);
          font-size: 0.875rem;
          color: var(--lss-text-primary);
          word-break: break-all;
        }

        .class-info {
          background: rgba(var(--primary-rgb, 85, 194, 255), 0.05);
          padding: 1rem;
          border-radius: 8px;
          border-left: 3px solid var(--primary, #55C2FF);
        }

        .class-name {
          font-family: var(--font-code);
          font-size: 1rem;
          font-weight: 600;
          color: var(--primary, #55C2FF);
          margin-bottom: 0.5rem;
        }

        .class-description {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--lss-text-secondary);
          line-height: 1.5;
        }

        .accessibility-info {
          background: linear-gradient(135deg, 
            rgba(var(--primary-rgb, 85, 194, 255), 0.05),
            rgba(var(--secondary-rgb, 255, 111, 97), 0.05)
          );
          border-radius: 8px;
          padding: 1rem;
          border: 1px solid rgba(var(--primary-rgb, 85, 194, 255), 0.1);
          margin-top: 1rem;
        }

        .accessibility-title {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--primary, #55C2FF);
          margin-bottom: 0.5rem;
        }

        .accessibility-features {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--lss-text-secondary);
          line-height: 1.5;
        }

        .accessibility-features li {
          margin-bottom: 0.25rem;
        }

        @media (max-width: 768px) {
          .type-tester {
            padding: 1rem;
          }
          
          .tester-controls {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .preview-section {
            padding: 2rem 1rem;
          }
          
          .specs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <div className="tester-header">
        <h1 className="tester-title ml-typo-display-1">Typography Tester</h1>
        <p className="tester-subtitle">
          Interactive tool for testing Material Lab's enhanced typography system. 
          Preview different styles, personality modes, and see real-time specifications.
        </p>
      </div>

      {/* Controls */}
      <div className="tester-controls">
        {/* Typography Selection */}
        <div className="control-section">
          <h2 className="control-title">Typography Style</h2>
          <div className="typography-selector">
            {typographyClasses.map((category) => (
              <div key={category.category} className="category-group">
                <span className="category-label">{category.category}</span>
                <div className="class-options">
                  {category.classes.map((classItem) => (
                    <label key={classItem.value} className="class-option">
                      <input
                        type="radio"
                        name="typography"
                        value={classItem.value}
                        checked={selectedClass === classItem.value}
                        onChange={(e) => setSelectedClass(e.target.value)}
                      />
                      <div className="class-option-content">
                        <div className="class-option-name">{classItem.name}</div>
                        <div className="class-option-description">{classItem.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personality Mode Selection */}
        <div className="control-section">
          <h2 className="control-title">Brand Personality Mode</h2>
          <div className="personality-selector">
            {personalityModes.map((mode) => (
              <div 
                key={mode.value} 
                className={`personality-option ${personalityMode === mode.value ? 'selected' : ''}`}
                onClick={() => setPersonalityMode(mode.value)}
              >
                <input
                  type="radio"
                  name="personality"
                  value={mode.value}
                  checked={personalityMode === mode.value}
                  onChange={() => {}} // Controlled by onClick
                  style={{ display: 'none' }}
                />
                <div className="class-option-content">
                  <div className="class-option-name">{mode.name}</div>
                  <div className="class-option-description">{mode.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div className="control-section text-input-section">
          <h2 className="control-title">Custom Text</h2>
          <textarea
            className="text-input"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Enter your text to preview with the selected typography style..."
          />
          <div className="sample-texts">
            {sampleTexts.map((text, index) => (
              <button
                key={index}
                className="sample-text-btn"
                onClick={() => setCustomText(text)}
              >
                Sample {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="preview-section">
        <div className={`preview-text ${getCurrentClass()}`}>
          {customText || 'Enter text to see preview...'}
        </div>
      </div>

      {/* Specifications */}
      <div className="specs-section">
        <div className="specs-header" onClick={() => setShowSpecs(!showSpecs)}>
          <h2 className="specs-title">Typography Specifications</h2>
          <button className="specs-toggle">▼</button>
        </div>
        
        {showSpecs && (
          <>
            <div className="specs-grid">
              <div className="spec-item">
                <div className="spec-label">Font Family</div>
                <div className="spec-value">{computedStyles.fontFamily}</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Font Size</div>
                <div className="spec-value">{computedStyles.fontSize}</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Font Weight</div>
                <div className="spec-value">{computedStyles.fontWeight}</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Line Height</div>
                <div className="spec-value">{computedStyles.lineHeight}</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Letter Spacing</div>
                <div className="spec-value">{computedStyles.letterSpacing}</div>
              </div>
              <div className="spec-item">
                <div className="spec-label">Theme Mode</div>
                <div className="spec-value">{themeMode}</div>
              </div>
            </div>

            <div className="class-info">
              <div className="class-name">
                .{getCurrentClass()}
              </div>
              <div className="class-description">
                {typographyClasses
                  .flatMap(cat => cat.classes)
                  .find(cls => cls.value === selectedClass)?.description || 'Typography class'}
                {personalityMode !== 'none' && ` with ${personalityModes.find(p => p.value === personalityMode)?.name.toLowerCase()} personality`}
              </div>
            </div>

            <div className="accessibility-info">
              <div className="accessibility-title">WCAG 2.1 AA Compliance Features</div>
              <ul className="accessibility-features">
                <li>✓ Text can be resized up to 200% without loss of functionality</li>
                <li>✓ Supports user text spacing overrides (line height, letter spacing)</li>
                <li>✓ Maintains readable contrast ratios in all theme modes</li>
                <li>✓ Respects reduced motion preferences</li>
                <li>✓ Uses semantic font sizes (minimum 16px for body text)</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};