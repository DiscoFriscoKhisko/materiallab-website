import { MLText } from '../ML/Typography';
import { MLCard } from '../ML/Card';

export const TypeSpecimen = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="text-center mb-12">
        <MLText variant="headline" className="mb-4">
          Typography Specimen
        </MLText>
        <MLText variant="body" color="weak" className="max-line-length mx-auto">
          Role-based type scale with Sora for headlines, Inter for body text, and multilingual support
        </MLText>
      </div>

      <div className="grid gap-8">
        {/* Display */}
        <MLCard variant="elevated" padding="lg">
          <div className="space-y-4">
            <MLText variant="title" color="primary">Display (Hero)</MLText>
            <MLText variant="display" className="heading-spacing-tight">
              Build products people love—fast
            </MLText>
            <div className="text-sm text-on-surface-variant font-mono">
              Sora 700 • 3rem (48px) • 1.15 line-height • -0.01em tracking
            </div>
          </div>
        </MLCard>

        {/* Headline */}
        <MLCard variant="elevated" padding="lg">
          <div className="space-y-4">
            <MLText variant="title" color="primary">Headline (Sections)</MLText>
            <MLText variant="headline" className="heading-spacing-tight">
              What We Do
            </MLText>
            <div className="text-sm text-on-surface-variant font-mono">
              Sora 600 • 2.25rem (36px) • 1.2 line-height • -0.005em tracking
            </div>
          </div>
        </MLCard>

        {/* Title */}
        <MLCard variant="elevated" padding="lg">
          <div className="space-y-4">
            <MLText variant="title" color="primary">Title (Cards)</MLText>
            <MLText variant="title" className="heading-spacing-tight">
              From MVP to V1, fast
            </MLText>
            <div className="text-sm text-on-surface-variant font-mono">
              Sora 600 • 1.5rem (24px) • 1.25 line-height • 0 tracking
            </div>
          </div>
        </MLCard>

        {/* Body */}
        <MLCard variant="elevated" padding="lg">
          <div className="space-y-4">
            <MLText variant="title" color="primary">Body (Paragraphs)</MLText>
            <MLText variant="body" className="paragraph-spacing max-line-length">
              Research, design, engineering, and AI working together to turn ideas into working businesses. Our integrated approach combines deep user research with rapid prototyping and modern development practices. We've helped startups ship MVPs in weeks, not months, with products that scale from day one.
            </MLText>
            <div className="text-sm text-on-surface-variant font-mono">
              Inter 400 • 1rem (16px) • 1.6 line-height • 0 tracking • 75ch max width
            </div>
          </div>
        </MLCard>

        {/* Label */}
        <MLCard variant="elevated" padding="lg">
          <div className="space-y-4">
            <MLText variant="title" color="primary">Label (Buttons/Inputs)</MLText>
            <MLText variant="label">
              Book a call
            </MLText>
            <div className="text-sm text-on-surface-variant font-mono">
              Inter 500 • 0.875rem (14px) • 1.4 line-height • 0.02em tracking
            </div>
          </div>
        </MLCard>

        {/* Multilingual Support */}
        <MLCard variant="outlined" padding="lg">
          <div className="space-y-6">
            <MLText variant="title" color="secondary">Multilingual Support</MLText>
            
            {/* Hindi Sample */}
            <div className="space-y-2">
              <MLText variant="label" className="text-tertiary">Hindi (Devanagari)</MLText>
              <MLText variant="body" lang="hi" className="paragraph-spacing">
                हम उत्पाद बनाते हैं जिन्हें लोग पसंद करते हैं। अनुसंधान, डिज़ाइन, इंजीनियरिंग और AI मिलकर विचारों को कामकाजी व्यवसायों में बदलते हैं।
              </MLText>
              <div className="text-sm text-on-surface-variant font-mono">
                Inter + Noto Sans Devanagari • 1.7 line-height for better readability
              </div>
            </div>

            {/* Kannada Sample */}
            <div className="space-y-2">
              <MLText variant="label" className="text-tertiary">Kannada</MLText>
              <MLText variant="body" lang="kn" className="paragraph-spacing">
                ನಾವು ಜನರು ಇಷ್ಟಪಡುವ ಉತ್ಪನ್ನಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೇವೆ. ಸಂಶೋಧನೆ, ವಿನ್ಯಾಸ, ಇಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು AI ಒಟ್ಟಾಗಿ ಕೆಲಸ ಮಾಡಿ ವಿಚಾರಗಳನ್ನು ಕೆಲಸದ ವ್ಯವಹಾರಗಳಾಗಿ ಪರಿವರ್ತಿಸುತ್ತವೆ.
              </MLText>
              <div className="text-sm text-on-surface-variant font-mono">
                Inter + Noto Sans Kannada • 1.7 line-height for better readability
              </div>
            </div>
          </div>
        </MLCard>

        {/* Spacing Examples */}
        <MLCard variant="outlined" padding="lg">
          <div className="space-y-6">
            <MLText variant="title" color="secondary">Spacing & Hierarchy</MLText>
            
            <div>
              <MLText variant="headline" className="heading-spacing-tight">
                Section with tight spacing
              </MLText>
              <MLText variant="body" className="paragraph-spacing max-line-length">
                This paragraph follows a heading with tight spacing (0.5em margin). The text flows naturally with optimal line length and proper paragraph spacing below.
              </MLText>
              <MLText variant="body" className="max-line-length">
                Second paragraph demonstrates the air around long-form content. Notice how the spacing creates a comfortable reading rhythm without feeling cramped or too loose.
              </MLText>
            </div>
          </div>
        </MLCard>
      </div>
    </div>
  );
};