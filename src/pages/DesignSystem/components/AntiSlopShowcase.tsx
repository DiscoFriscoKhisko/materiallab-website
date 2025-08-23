import React, { useState } from 'react';
import { MLCard, MLText, MLHeading } from '../../../components/ML';
import { Button } from '../../../components/UI/Button';

interface ComparisonCardProps {
  type: 'bad' | 'good';
  title: string;
  children: React.ReactNode;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ type, title, children }) => (
  <div className={`comparison-card ${type}`}>
    <div className="comparison-header">
      <div className={`comparison-icon ${type}`}>
        {type === 'bad' ? '✕' : '✓'}
      </div>
      <MLHeading level="4" style={{ color: type === 'bad' ? 'var(--error)' : 'var(--success)' }}>
        {title}
      </MLHeading>
    </div>
    {children}
  </div>
);

interface AntiSlopExampleProps {
  title: string;
  description: string;
  category: string;
  badExample: React.ReactNode;
  goodExample: React.ReactNode;
  badTitle?: string;
  goodTitle?: string;
}

const AntiSlopExample: React.FC<AntiSlopExampleProps> = ({
  title,
  description,
  category,
  badExample,
  goodExample,
  badTitle = "Generic AI Pattern",
  goodTitle = "MaterialLab Approach"
}) => (
  <div style={{ marginBottom: 'var(--space-8)' }}>
    <div style={{ marginBottom: 'var(--space-4)' }}>
      <div style={{ 
        display: 'inline-block', 
        background: 'var(--primary)', 
        color: 'var(--on-primary)',
        padding: 'var(--space-1) var(--space-2)',
        borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--font-medium)',
        marginBottom: 'var(--space-2)'
      }}>
        {category}
      </div>
      <MLHeading level="3" style={{ marginBottom: 'var(--space-1)' }}>
        {title}
      </MLHeading>
      <MLText style={{ color: 'var(--on-surface-variant)' }}>
        {description}
      </MLText>
    </div>
    
    <div className="anti-slop-comparison">
      <ComparisonCard type="bad" title={badTitle}>
        {badExample}
      </ComparisonCard>
      <ComparisonCard type="good" title={goodTitle}>
        {goodExample}
      </ComparisonCard>
    </div>
  </div>
);

export const AntiSlopShowcase: React.FC = () => {
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState(false);

  return (
    <div className="design-system-content">
      <MLHeading level="1">Anti-Slop Guidelines</MLHeading>
      <MLText className="design-system-subtitle">
        Specific patterns to eliminate generic AI outputs and maintain MaterialLab's distinctive approach
      </MLText>

      <AntiSlopExample
        title="AI Process Transparency"
        description="Always disclose AI involvement and provide user control over AI-generated content"
        category="UX/UI Pattern"
        badExample={
          <div>
            <MLText style={{ marginBottom: 'var(--space-3)' }}>
              Analysis complete. The system recommends extending your timeline by 1 week.
            </MLText>
            <Button variant="primary" size="sm">
              Apply Recommendation
            </Button>
          </div>
        }
        goodExample={
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--space-2)', 
              marginBottom: 'var(--space-2)',
              padding: 'var(--space-1) var(--space-2)',
              background: 'var(--primary)',
              color: 'var(--on-primary)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-medium)',
              width: 'fit-content'
            }}>
              🤖 AI Analysis (87% confidence)
            </div>
            <MLText style={{ marginBottom: 'var(--space-3)' }}>
              Based on your team's velocity over the last 6 sprints and similar project patterns, 
              extending your timeline by 1 week would significantly improve delivery quality.
            </MLText>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <Button variant="primary" size="sm">
                Apply Recommendation
              </Button>
              <Button variant="outline" size="sm">
                Modify Parameters
              </Button>
              <Button variant="text" size="sm">
                Skip AI Analysis
              </Button>
            </div>
          </div>
        }
      />

      <AntiSlopExample
        title="Copy Voice and Messaging"
        description="Avoid anthropomorphic language and overpromising. Use MaterialLab's Sage-Creator archetype."
        category="Copy Pattern"
        badExample={
          <div>
            <MLHeading level="4" style={{ marginBottom: 'var(--space-2)' }}>
              Revolutionary AI Breakthrough
            </MLHeading>
            <MLText>
              Our AI thinks the best approach is seamless integration that transforms your workflow. 
              The system believes this will eliminate the need for human intervention and deliver 
              magical results effortlessly.
            </MLText>
          </div>
        }
        goodExample={
          <div>
            <MLHeading level="4" style={{ marginBottom: 'var(--space-2)' }}>
              Enhanced Project Intelligence
            </MLHeading>
            <MLText>
              Based on data analysis, thoughtful integration enhances your workflow while maintaining 
              your decision-making authority. The system identifies patterns that support more informed 
              human decisions and amplifies your expertise through transparent AI assistance.
            </MLText>
          </div>
        }
      />

      <AntiSlopExample
        title="Visual Design Patterns"
        description="Avoid generic tech aesthetics and embrace MaterialLab's humanistic intelligence theme"
        category="Visual Pattern"
        badExample={
          <div style={{ 
            background: 'linear-gradient(45deg, #00C2FF, #0080FF)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-md)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M30 0l25.98 15v30L30 60 4.02 45V15z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat',
              opacity: 0.3
            }} />
            <MLText style={{ color: 'white', position: 'relative', zIndex: 1 }}>
              Generic AI Interface
              <br />
              <small style={{ opacity: 0.8 }}>Hexagonal patterns, blue-green gradients, generic tech aesthetics</small>
            </MLText>
          </div>
        }
        goodExample={
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
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
            <MLText style={{ color: 'white', position: 'relative', zIndex: 1 }}>
              MaterialLab Interface
              <br />
              <small style={{ opacity: 0.9 }}>Organic shapes, brand colors, humanistic warmth</small>
            </MLText>
          </div>
        }
      />

      <AntiSlopExample
        title="Error Handling"
        description="Provide helpful, solution-focused error messages that empower users"
        category="UX Pattern"
        badExample={
          <div style={{ 
            background: 'rgba(255, 84, 73, 0.1)',
            border: '1px solid var(--error)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)'
          }}>
            <MLText style={{ color: 'var(--error)', fontWeight: 'var(--font-medium)' }}>
              Error: Upload failed. Please try again.
            </MLText>
          </div>
        }
        goodExample={
          <div style={{ 
            background: 'var(--surface-1)',
            border: '1px solid var(--outline)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)'
          }}>
            <MLText style={{ fontWeight: 'var(--font-medium)', marginBottom: 'var(--space-2)' }}>
              Upload Paused at 67%
            </MLText>
            <MLText style={{ marginBottom: 'var(--space-3)', color: 'var(--on-surface-variant)' }}>
              This usually happens with files over 5MB on slower connections.
            </MLText>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <Button variant="primary" size="sm">
                Resume Upload
              </Button>
              <Button variant="outline" size="sm">
                Try Smaller File
              </Button>
              <Button variant="text" size="sm">
                Email Large Files
              </Button>
            </div>
            <MLText style={{ 
              fontSize: 'var(--text-sm)', 
              color: 'var(--on-surface-variant)',
              marginTop: 'var(--space-2)'
            }}>
              Your data is secure and we'll complete the upload when you're ready.
            </MLText>
          </div>
        }
      />

      <AntiSlopExample
        title="Loading States"
        description="Provide context and user control during AI processing"
        category="UX Pattern"
        badExample={
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-2)',
            padding: 'var(--space-4)',
            background: 'var(--surface-1)',
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid var(--outline)',
              borderTop: '2px solid var(--primary)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <MLText>Loading...</MLText>
          </div>
        }
        goodExample={
          <div style={{ 
            padding: 'var(--space-4)',
            background: 'var(--surface-1)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--outline)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-3)'
            }}>
              <div style={{ 
                display: 'inline-block', 
                background: 'var(--primary)', 
                color: 'var(--on-primary)',
                padding: 'var(--space-1) var(--space-2)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-medium)'
              }}>
                🤖 AI Processing
              </div>
              <MLText style={{ fontWeight: 'var(--font-medium)' }}>
                Analyzing your project data
              </MLText>
            </div>
            <MLText style={{ 
              marginBottom: 'var(--space-3)', 
              color: 'var(--on-surface-variant)',
              fontSize: 'var(--text-sm)'
            }}>
              About 30 seconds remaining • Feel free to continue with other tasks
            </MLText>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setAiAnalysisLoading(false)}
              >
                Skip Analysis
              </Button>
              <Button variant="text" size="sm">
                How This Works
              </Button>
            </div>
          </div>
        }
      />

      <MLCard style={{ 
        padding: 'var(--space-6)', 
        background: 'var(--surface-1)', 
        border: '2px solid var(--primary)',
        marginTop: 'var(--space-8)'
      }}>
        <MLHeading level="2" style={{ color: 'var(--primary)', marginBottom: 'var(--space-4)' }}>
          Anti-Slop Checklist
        </MLHeading>
        
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <div>
            <MLHeading level="3" style={{ marginBottom: 'var(--space-2)' }}>
              Before Publishing Content
            </MLHeading>
            <div style={{ display: 'grid', gap: 'var(--space-1)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" /> AI involvement is clearly disclosed
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" /> No anthropomorphic language ("AI thinks", "system believes")
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" /> User control options are provided
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" /> Error messages are helpful and solution-focused
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" /> Visual design avoids generic tech patterns
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" /> Copy follows MaterialLab's Sage-Creator voice
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input type="checkbox" /> Human expertise is valued and integrated
              </label>
            </div>
          </div>
        </div>
      </MLCard>
    </div>
  );
};