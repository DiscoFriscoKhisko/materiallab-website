import React from 'react';

interface TypographySpecimenProps {
  className?: string;
}

interface SpecimenItem {
  className: string;
  label: string;
  description: string;
  tokens: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
  };
  brandVoice: 'thoughtful-expert' | 'compelling-presenter' | 'technical';
  exampleText: string;
}

const typographySpecimens: SpecimenItem[] = [
  {
    className: 'typography-display-6xl',
    label: 'Display 6XL',
    description: 'Maximum impact display text - hero moments',
    tokens: {
      fontFamily: 'var(--font-primary)',
      fontSize: 'var(--font-size-6xl) /* 76px */',
      fontWeight: 'var(--font-weight-bold) /* 700 */',
      lineHeight: 'var(--line-height-tight) /* 1.1 */',
      letterSpacing: 'var(--letter-spacing-tighter) /* -0.03em */'
    },
    brandVoice: 'compelling-presenter',
    exampleText: 'Material Lab'
  },
  {
    className: 'typography-display-5xl',
    label: 'Display 5XL',
    description: 'Large impact display text',
    tokens: {
      fontFamily: 'var(--font-primary)',
      fontSize: 'var(--font-size-5xl) /* 61px */',
      fontWeight: 'var(--font-weight-bold) /* 700 */',
      lineHeight: 'var(--line-height-tight) /* 1.1 */',
      letterSpacing: 'var(--letter-spacing-tighter) /* -0.03em */'
    },
    brandVoice: 'compelling-presenter',
    exampleText: 'AI Product Studio'
  },
  {
    className: 'typography-display-4xl',
    label: 'Display 4XL',
    description: 'Hero headlines',
    tokens: {
      fontFamily: 'var(--font-primary)',
      fontSize: 'var(--font-size-4xl) /* 49px */',
      fontWeight: 'var(--font-weight-semibold) /* 600 */',
      lineHeight: 'var(--line-height-snug) /* 1.2 */',
      letterSpacing: 'var(--letter-spacing-tight) /* -0.02em */'
    },
    brandVoice: 'compelling-presenter',
    exampleText: 'White-glove software partnership'
  },
  {
    className: 'typography-heading-3xl',
    label: 'Heading 3XL',
    description: 'Large section headlines',
    tokens: {
      fontFamily: 'var(--font-primary)',
      fontSize: 'var(--font-size-3xl) /* 39px */',
      fontWeight: 'var(--font-weight-semibold) /* 600 */',
      lineHeight: 'var(--line-height-snug) /* 1.2 */',
      letterSpacing: 'var(--letter-spacing-tight) /* -0.02em */'
    },
    brandVoice: 'compelling-presenter',
    exampleText: 'How We Help'
  },
  {
    className: 'typography-heading-2xl',
    label: 'Heading 2XL',
    description: 'Medium section headlines',
    tokens: {
      fontFamily: 'var(--font-primary)',
      fontSize: 'var(--font-size-2xl) /* 31px */',
      fontWeight: 'var(--font-weight-medium) /* 500 */',
      lineHeight: 'var(--line-height-snug) /* 1.2 */',
      letterSpacing: 'var(--letter-spacing-normal) /* 0 */'
    },
    brandVoice: 'compelling-presenter',
    exampleText: 'Strategic Sprint'
  },
  {
    className: 'typography-heading-xl',
    label: 'Heading XL',
    description: 'Small section headlines',
    tokens: {
      fontFamily: 'var(--font-primary)',
      fontSize: 'var(--font-size-xl) /* 25px */',
      fontWeight: 'var(--font-weight-medium) /* 500 */',
      lineHeight: 'var(--line-height-normal) /* 1.5 */',
      letterSpacing: 'var(--letter-spacing-normal) /* 0 */'
    },
    brandVoice: 'compelling-presenter',
    exampleText: 'Product Development'
  },
  {
    className: 'typography-heading-lg',
    label: 'Heading LG',
    description: 'Subsection headlines',
    tokens: {
      fontFamily: 'var(--font-secondary)',
      fontSize: 'var(--font-size-lg) /* 20px */',
      fontWeight: 'var(--font-weight-semibold) /* 600 */',
      lineHeight: 'var(--line-height-normal) /* 1.5 */',
      letterSpacing: 'var(--letter-spacing-wide) /* 0.01em */'
    },
    brandVoice: 'thoughtful-expert',
    exampleText: 'Business Automation'
  },
  {
    className: 'typography-body-large',
    label: 'Body Large',
    description: 'Large body text for emphasis',
    tokens: {
      fontFamily: 'var(--font-secondary)',
      fontSize: 'var(--font-size-lg) /* 20px */',
      fontWeight: 'var(--font-weight-regular) /* 400 */',
      lineHeight: 'var(--line-height-relaxed) /* 1.6 */',
      letterSpacing: 'var(--letter-spacing-wide) /* 0.01em */'
    },
    brandVoice: 'thoughtful-expert',
    exampleText: 'We deliver enterprise-quality software development with the personal touch of a boutique studio.'
  },
  {
    className: 'typography-body-base',
    label: 'Body Base',
    description: 'Standard body text - optimal readability',
    tokens: {
      fontFamily: 'var(--font-secondary)',
      fontSize: 'var(--font-size-base) /* 16px */',
      fontWeight: 'var(--font-weight-regular) /* 400 */',
      lineHeight: 'var(--line-height-normal) /* 1.5 */',
      letterSpacing: 'var(--letter-spacing-normal) /* 0 */'
    },
    brandVoice: 'thoughtful-expert',
    exampleText: 'Material Lab exists to democratize access to enterprise-quality technology for early-stage businesses. We level the playing field by making cutting-edge software development accessible to those who previously couldn\'t afford top-tier technical expertise.'
  },
  {
    className: 'typography-body-small',
    label: 'Body Small',
    description: 'Small body text for secondary content',
    tokens: {
      fontFamily: 'var(--font-secondary)',
      fontSize: 'var(--font-size-sm) /* 14px */',
      fontWeight: 'var(--font-weight-regular) /* 400 */',
      lineHeight: 'var(--line-height-loose) /* 1.7 */',
      letterSpacing: 'var(--letter-spacing-wider) /* 0.02em */'
    },
    brandVoice: 'thoughtful-expert',
    exampleText: 'Supporting text that provides additional context and information while maintaining excellent readability even at smaller sizes.'
  },
  {
    className: 'typography-label-large',
    label: 'Label Large',
    description: 'Large labels and UI text',
    tokens: {
      fontFamily: 'var(--font-secondary)',
      fontSize: 'var(--font-size-sm) /* 14px */',
      fontWeight: 'var(--font-weight-semibold) /* 600 */',
      lineHeight: 'var(--line-height-normal) /* 1.5 */',
      letterSpacing: 'var(--letter-spacing-wider) /* 0.02em */'
    },
    brandVoice: 'thoughtful-expert',
    exampleText: 'Form Label'
  },
  {
    className: 'typography-label-base',
    label: 'Label Base',
    description: 'Standard labels and metadata',
    tokens: {
      fontFamily: 'var(--font-secondary)',
      fontSize: 'var(--font-size-xs) /* 12px */',
      fontWeight: 'var(--font-weight-medium) /* 500 */',
      lineHeight: 'var(--line-height-loose) /* 1.7 */',
      letterSpacing: 'var(--letter-spacing-widest) /* 0.03em */'
    },
    brandVoice: 'thoughtful-expert',
    exampleText: 'Metadata • Last updated'
  },
  {
    className: 'typography-code-base',
    label: 'Code Base',
    description: 'Inline code and technical content',
    tokens: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--font-size-sm) /* 14px */',
      fontWeight: 'var(--font-weight-regular) /* 400 */',
      lineHeight: 'var(--line-height-relaxed) /* 1.6 */',
      letterSpacing: 'var(--letter-spacing-normal) /* 0 */'
    },
    brandVoice: 'technical',
    exampleText: 'const materialLab = new AIStudio();'
  }
];

const brandVoiceDescriptions = {
  'thoughtful-expert': {
    title: 'Thoughtful Expert',
    description: 'Professional, clear, detailed - uses primary font with optimal readability',
    characteristics: 'Clean lines, generous spacing, high legibility'
  },
  'compelling-presenter': {
    title: 'Compelling Presenter',
    description: 'Bold, impactful, confident - uses secondary font with strong hierarchy',
    characteristics: 'Geometric shapes, tight spacing, commanding presence'
  },
  'technical': {
    title: 'Technical',
    description: 'Precise, nerdy, detailed - uses monospace font for technical content',
    characteristics: 'Fixed-width, consistent spacing, technical accuracy'
  }
};

export const TypographySpecimen: React.FC<TypographySpecimenProps> = ({ 
  className = '' 
}) => {
  const [selectedBrandVoice, setSelectedBrandVoice] = React.useState<string>('all');

  const filteredSpecimens = selectedBrandVoice === 'all' 
    ? typographySpecimens 
    : typographySpecimens.filter(specimen => specimen.brandVoice === selectedBrandVoice);

  return (
    <div className={`typography-specimen ${className}`}>
      <div className="mb-8">
        <h2 className="typography-heading-2xl mb-4">Typography Specimen</h2>
        <p className="typography-body-base mb-6">
          Complete typography system showcasing MaterialLab's flexible brand voice from 
          <em className="brand-voice-thoughtful-expert"> thoughtful expert</em> to 
          <em className="brand-voice-compelling-presenter"> compelling presenter</em>.
        </p>
        
        {/* Brand Voice Filter */}
        <div className="mb-6">
          <label className="typography-label-large mb-2 block">
            Filter by Brand Voice:
          </label>
          <select 
            value={selectedBrandVoice}
            onChange={(e) => setSelectedBrandVoice(e.target.value)}
            className="typography-body-base p-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="all">All Voices</option>
            <option value="thoughtful-expert">Thoughtful Expert</option>
            <option value="compelling-presenter">Compelling Presenter</option>
            <option value="technical">Technical</option>
          </select>
        </div>

        {/* Brand Voice Descriptions */}
        {selectedBrandVoice !== 'all' && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="typography-heading-lg mb-2">
              {brandVoiceDescriptions[selectedBrandVoice as keyof typeof brandVoiceDescriptions].title}
            </h3>
            <p className="typography-body-base mb-2">
              {brandVoiceDescriptions[selectedBrandVoice as keyof typeof brandVoiceDescriptions].description}
            </p>
            <p className="typography-body-small text-gray-600">
              <strong>Characteristics:</strong> {brandVoiceDescriptions[selectedBrandVoice as keyof typeof brandVoiceDescriptions].characteristics}
            </p>
          </div>
        )}
      </div>

      {/* Typography Specimens */}
      <div className="grid gap-6">
        {filteredSpecimens.map((specimen, index) => (
          <div key={index} className="typography-specimen-item">
            {/* Label and Description */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="typography-specimen-label">
                  {specimen.label}
                </span>
                <p className="typography-body-small text-gray-600 mt-1">
                  {specimen.description}
                </p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
                  specimen.brandVoice === 'thoughtful-expert' ? 'bg-blue-100 text-blue-800' :
                  specimen.brandVoice === 'compelling-presenter' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {brandVoiceDescriptions[specimen.brandVoice].title}
                </span>
              </div>
            </div>

            {/* Example Text */}
            <div className="mb-4">
              <p className={`typography-specimen-example ${specimen.className}`}>
                {specimen.exampleText}
              </p>
            </div>

            {/* Token Information */}
            <details className="typography-specimen-tokens">
              <summary className="cursor-pointer typography-label-base text-gray-700 mb-2">
                View CSS Tokens
              </summary>
              <pre className="typography-code-base text-xs mt-2 overflow-x-auto">
{`.${specimen.className.replace(' ', '.')} {
  font-family: ${specimen.tokens.fontFamily};
  font-size: ${specimen.tokens.fontSize};
  font-weight: ${specimen.tokens.fontWeight};
  line-height: ${specimen.tokens.lineHeight};
  letter-spacing: ${specimen.tokens.letterSpacing};
}`}
              </pre>
            </details>
          </div>
        ))}
      </div>

      {/* WCAG Compliance Notice */}
      <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="typography-heading-lg text-green-800 mb-3">
          WCAG 2.1 AA Compliance
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="typography-label-large text-green-700 mb-2">
              Text Resize Support (1.4.4)
            </h4>
            <p className="typography-body-small text-green-700">
              All text can be resized up to 200% without loss of content or functionality. 
              Try zooming your browser to test this capability.
            </p>
          </div>
          <div>
            <h4 className="typography-label-large text-green-700 mb-2">
              Text Spacing (1.4.12)
            </h4>
            <p className="typography-body-small text-green-700">
              Content remains legible when users override line height (1.5x), 
              paragraph spacing (2x), letter spacing (0.12x), and word spacing (0.16x).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographySpecimen;