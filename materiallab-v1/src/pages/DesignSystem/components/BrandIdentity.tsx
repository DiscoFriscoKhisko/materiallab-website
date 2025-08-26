import React from 'react';
import { MLCard, MLText, MLHeading } from '../../../components/ML';

interface BrandAttributeProps {
  title: string;
  description: string;
  examples: string[];
}

const BrandAttribute: React.FC<BrandAttributeProps> = ({ title, description, examples }) => (
  <MLCard style={{ 
    padding: 'var(--space-6)', 
    background: 'var(--surface-1)',
    border: '1px solid var(--outline)'
  }}>
    <MLHeading level="4" style={{ color: 'var(--primary)', marginBottom: 'var(--space-2)' }}>
      {title}
    </MLHeading>
    <MLText style={{ marginBottom: 'var(--space-3)', color: 'var(--on-surface-variant)' }}>
      {description}
    </MLText>
    <div>
      <MLText style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', marginBottom: 'var(--space-2)' }}>
        Examples:
      </MLText>
      <ul style={{ margin: 0, paddingLeft: 'var(--space-4)' }}>
        {examples.map((example, index) => (
          <li key={index} style={{ marginBottom: 'var(--space-1)' }}>
            <MLText style={{ fontSize: 'var(--text-sm)' }}>{example}</MLText>
          </li>
        ))}
      </ul>
    </div>
  </MLCard>
);

interface ThemeShowcaseProps {
  title: string;
  description: string;
  colorPrimary: string;
  colorSecondary: string;
  characteristics: string[];
  visualStyle: React.CSSProperties;
}

const ThemeShowcase: React.FC<ThemeShowcaseProps> = ({
  title,
  description,
  colorPrimary,
  colorSecondary,
  characteristics,
  visualStyle
}) => (
  <div style={{
    border: '1px solid var(--outline)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    background: 'var(--surface-1)'
  }}>
    <div style={{
      ...visualStyle,
      height: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <MLText style={{ 
        color: 'white', 
        fontWeight: 'var(--font-semibold)',
        textAlign: 'center',
        zIndex: 1,
        position: 'relative'
      }}>
        {title}
      </MLText>
    </div>
    <div style={{ padding: 'var(--space-6)' }}>
      <MLText style={{ marginBottom: 'var(--space-4)', lineHeight: '1.6' }}>
        {description}
      </MLText>
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: colorPrimary,
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--outline)'
        }} />
        <div style={{
          width: '40px', 
          height: '40px',
          backgroundColor: colorSecondary,
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--outline)'
        }} />
      </div>
      <div>
        <MLText style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', marginBottom: 'var(--space-2)' }}>
          Visual Characteristics:
        </MLText>
        <ul style={{ margin: 0, paddingLeft: 'var(--space-4)' }}>
          {characteristics.map((char, index) => (
            <li key={index} style={{ marginBottom: 'var(--space-1)' }}>
              <MLText style={{ fontSize: 'var(--text-sm)' }}>{char}</MLText>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export const BrandIdentity: React.FC = () => {
  return (
    <div className="design-system-content">
      <MLHeading level="1">Brand Identity</MLHeading>
      <MLText className="design-system-subtitle">
        MaterialLab's distinctive brand built on Sage-Creator archetype with human-centric AI philosophy
      </MLText>

      <div style={{ marginBottom: 'var(--space-12)' }}>
        <MLCard style={{ 
          padding: 'var(--space-8)', 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%)',
            borderRadius: '50%'
          }} />
          <MLHeading level="2" style={{ 
            color: 'white', 
            marginBottom: 'var(--space-4)',
            position: 'relative',
            zIndex: 1
          }}>
            Mission Statement
          </MLHeading>
          <MLText style={{ 
            fontSize: 'var(--text-xl)', 
            lineHeight: 'var(--leading-relaxed)',
            color: 'rgba(255, 255, 255, 0.95)',
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1
          }}>
            We design AI-enhanced products that amplify human creativity and decision-making, 
            ensuring technology serves people rather than replacing them. Through transparent, 
            ethical AI integration, we build tools that make complex problems more approachable 
            while preserving human agency and expertise.
          </MLText>
        </MLCard>
      </div>

      <div style={{ marginBottom: 'var(--space-12)' }}>
        <MLHeading level="2" style={{ marginBottom: 'var(--space-6)' }}>
          Core Values
        </MLHeading>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 'var(--space-6)' 
        }}>
          <BrandAttribute
            title="Human-Centric"
            description="Technology should enhance human capabilities, not replace human judgment and creativity."
            examples={[
              "AI provides analysis; humans make decisions",
              "User control over all AI-generated suggestions",
              "Transparent AI processes and limitations",
              "Respect for human expertise and context"
            ]}
          />
          <BrandAttribute
            title="Transparent"
            description="Clear communication about how AI works, what it can and cannot do, and how decisions are made."
            examples={[
              "Always disclose AI involvement",
              "Explain confidence levels and reasoning",
              "Acknowledge limitations and uncertainties",
              "Provide access to underlying data and methods"
            ]}
          />
          <BrandAttribute
            title="Empowering"
            description="Give users the knowledge and tools they need to make informed decisions and grow their capabilities."
            examples={[
              "Educational explanations of AI processes",
              "Skills development through AI collaboration",
              "User agency in all interactions",
              "Learning opportunities embedded in workflows"
            ]}
          />
          <BrandAttribute
            title="Meticulous"
            description="Attention to detail in design, development, and user experience ensures quality and reliability."
            examples={[
              "Comprehensive testing and validation",
              "Consistent design patterns and interactions",
              "Accessible interfaces for all users",
              "Security-first development practices"
            ]}
          />
        </div>
      </div>

      <div style={{ marginBottom: 'var(--space-12)' }}>
        <MLHeading level="2" style={{ marginBottom: 'var(--space-6)' }}>
          Visual Themes
        </MLHeading>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: 'var(--space-6)' 
        }}>
          <ThemeShowcase
            title="Humanistic Intelligence"
            description="Warm, collaborative aesthetic that emphasizes the partnership between human creativity and AI precision. Uses organic shapes, flowing lines, and approachable colors to create an inviting, human-centered experience."
            colorPrimary="#EC8B5E"
            colorSecondary="#8BD8BD"
            characteristics={[
              "Organic shapes and flowing lines",
              "Warm color temperatures",
              "Soft shadows and natural gradients", 
              "Hand-crafted illustration style",
              "Authentic photography with real people"
            ]}
            visualStyle={{
              background: 'linear-gradient(135deg, #EC8B5E, #8BD8BD)',
              position: 'relative'
            }}
          />
          
          <ThemeShowcase
            title="Structured Dynamism"
            description="Clean, systematic aesthetic that conveys technical precision and analytical capability. Features geometric patterns, high contrast, and structured layouts that inspire confidence in complex data analysis."
            colorPrimary="#C1F73A"
            colorSecondary="#00FFFF"
            characteristics={[
              "Geometric precision and clean lines",
              "High contrast and clarity",
              "Grid-based systematic layouts",
              "Technical diagram aesthetics",
              "Sharp corners and defined edges"
            ]}
            visualStyle={{
              background: 'linear-gradient(45deg, #1A1A1A 25%, transparent 25%), linear-gradient(-45deg, #1A1A1A 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #C1F73A 75%), linear-gradient(-45deg, transparent 75%, #00FFFF 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
              backgroundColor: '#1A1A1A'
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: 'var(--space-8)' }}>
        <MLHeading level="2" style={{ marginBottom: 'var(--space-6)' }}>
          Personality Traits
        </MLHeading>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-6)'
        }}>
          <div>
            <MLHeading level="3" style={{ color: 'var(--primary)', marginBottom: 'var(--space-4)' }}>
              How We Sound
            </MLHeading>
            <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
              <MLText>✓ Knowledgeable and experienced</MLText>
              <MLText>✓ Innovative and forward-thinking</MLText>
              <MLText>✓ Transparent and honest</MLText>
              <MLText>✓ Educational and empowering</MLText>
              <MLText>✓ Collaborative and inclusive</MLText>
              <MLText>✓ Practical and actionable</MLText>
            </div>
          </div>
          <div>
            <MLHeading level="3" style={{ color: 'var(--error)', marginBottom: 'var(--space-4)' }}>
              How We Don't Sound
            </MLHeading>
            <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
              <MLText>✗ Condescending or patronizing</MLText>
              <MLText>✗ Overpromising or hyped</MLText>
              <MLText>✗ Mystical or "magical" about AI</MLText>
              <MLText>✗ Cold or purely technical</MLText>
              <MLText>✗ Dismissive of human expertise</MLText>
              <MLText>✗ Generic or template-driven</MLText>
            </div>
          </div>
        </div>
      </div>

      <MLCard style={{ 
        padding: 'var(--space-6)', 
        background: 'var(--surface-1)', 
        border: '2px solid var(--primary)' 
      }}>
        <MLHeading level="2" style={{ color: 'var(--primary)', marginBottom: 'var(--space-4)' }}>
          Brand Application Guidelines
        </MLHeading>
        
        <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
          <div>
            <MLHeading level="3" style={{ marginBottom: 'var(--space-2)' }}>
              Design Applications
            </MLHeading>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <MLText style={{ fontWeight: 'var(--font-medium)', marginBottom: 'var(--space-2)' }}>
                  ✅ Do
                </MLText>
                <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                  <li>Use authentic photography with real people</li>
                  <li>Show human-AI collaboration scenarios</li>
                  <li>Apply consistent design tokens</li>
                  <li>Maintain visual hierarchy and accessibility</li>
                  <li>Choose theme based on content purpose</li>
                </ul>
              </div>
              <div>
                <MLText style={{ fontWeight: 'var(--font-medium)', marginBottom: 'var(--space-2)' }}>
                  ❌ Don't
                </MLText>
                <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                  <li>Use generic tech stock photography</li>
                  <li>Show AI replacing human roles</li>
                  <li>Mix color palettes between themes</li>
                  <li>Create layouts without user testing</li>
                  <li>Apply themes arbitrarily</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <MLHeading level="3" style={{ marginBottom: 'var(--space-2)' }}>
              Communication Applications
            </MLHeading>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <MLText style={{ fontWeight: 'var(--font-medium)', marginBottom: 'var(--space-2)' }}>
                  ✅ Do
                </MLText>
                <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                  <li>Lead with human benefits and outcomes</li>
                  <li>Explain AI processes transparently</li>
                  <li>Provide user control and override options</li>
                  <li>Use contextually appropriate tone</li>
                  <li>Include confidence levels and limitations</li>
                </ul>
              </div>
              <div>
                <MLText style={{ fontWeight: 'var(--font-medium)', marginBottom: 'var(--space-2)' }}>
                  ❌ Don't
                </MLText>
                <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                  <li>Use anthropomorphic AI language</li>
                  <li>Overpromise AI capabilities</li>
                  <li>Hide how AI systems work</li>
                  <li>Use generic marketing clichés</li>
                  <li>Position AI as infallible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </MLCard>
    </div>
  );
};