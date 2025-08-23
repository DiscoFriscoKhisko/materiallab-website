import React, { useState } from 'react';
import { MLCard, MLText, MLHeading } from '../../../components/ML';
import { Button } from '../../../components/UI/Button';

interface VoiceExampleProps {
  context: string;
  description: string;
  badExample: string;
  goodExample: string;
  analysis: string[];
}

const VoiceExample: React.FC<VoiceExampleProps> = ({
  context,
  description,
  badExample,
  goodExample,
  analysis
}) => {
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <div style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ 
          display: 'inline-block', 
          background: 'var(--secondary)', 
          color: 'var(--on-secondary)',
          padding: 'var(--space-1) var(--space-2)',
          borderRadius: 'var(--radius-sm)',
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--font-medium)',
          marginBottom: 'var(--space-2)'
        }}>
          {context}
        </div>
        <MLText style={{ color: 'var(--on-surface-variant)' }}>
          {description}
        </MLText>
      </div>
      
      <div className="anti-slop-comparison">
        <div className="comparison-card bad">
          <div className="comparison-header">
            <div className="comparison-icon bad">✕</div>
            <MLHeading level="4" style={{ color: 'var(--error)' }}>
              Generic AI Voice
            </MLHeading>
          </div>
          <MLText style={{ fontStyle: 'italic', lineHeight: '1.6' }}>
            "{badExample}"
          </MLText>
        </div>
        
        <div className="comparison-card good">
          <div className="comparison-header">
            <div className="comparison-icon good">✓</div>
            <MLHeading level="4" style={{ color: 'var(--success)' }}>
              MaterialLab Voice
            </MLHeading>
          </div>
          <MLText style={{ fontStyle: 'italic', lineHeight: '1.6' }}>
            "{goodExample}"
          </MLText>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
        <Button
          variant="text"
          size="sm"
          onClick={() => setShowAnalysis(!showAnalysis)}
        >
          {showAnalysis ? 'Hide Analysis' : 'Show Voice Analysis'}
        </Button>
      </div>

      {showAnalysis && (
        <div style={{ 
          marginTop: 'var(--space-4)',
          padding: 'var(--space-4)',
          background: 'var(--surface-1)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--outline)'
        }}>
          <MLHeading level="4" style={{ marginBottom: 'var(--space-2)', color: 'var(--primary)' }}>
            Voice Analysis
          </MLHeading>
          <ul style={{ margin: 0, paddingLeft: 'var(--space-4)' }}>
            {analysis.map((point, index) => (
              <li key={index} style={{ marginBottom: 'var(--space-1)' }}>
                <MLText>{point}</MLText>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

interface ArchetypeCardProps {
  title: string;
  description: string;
  characteristics: string[];
  color: string;
}

const ArchetypeCard: React.FC<ArchetypeCardProps> = ({ title, description, characteristics, color }) => (
  <MLCard style={{ 
    padding: 'var(--space-6)', 
    border: `2px solid ${color}`,
    background: 'var(--surface-1)'
  }}>
    <MLHeading level="3" style={{ color, marginBottom: 'var(--space-2)' }}>
      {title}
    </MLHeading>
    <MLText style={{ marginBottom: 'var(--space-4)', color: 'var(--on-surface-variant)' }}>
      {description}
    </MLText>
    <div>
      <MLText style={{ fontWeight: 'var(--font-medium)', marginBottom: 'var(--space-2)' }}>
        Key Characteristics:
      </MLText>
      <ul style={{ margin: 0, paddingLeft: 'var(--space-4)' }}>
        {characteristics.map((char, index) => (
          <li key={index} style={{ marginBottom: 'var(--space-1)' }}>
            <MLText>{char}</MLText>
          </li>
        ))}
      </ul>
    </div>
  </MLCard>
);

export const VoiceGuidelines: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState('website_hero');

  const toneMatrix = {
    website_hero: {
      primary: 'Visionary Confident',
      secondary: 'Inspiring Educational',
      description: 'Forward-looking and inspiring while building confidence'
    },
    ui_microcopy: {
      primary: 'Helpful Empowering', 
      secondary: 'Clear Supportive',
      description: 'Concise guidance that empowers user action'
    },
    error_messages: {
      primary: 'Solution-focused Reassuring',
      secondary: 'Helpful Transparent',
      description: 'Blame-free problem solving with clear next steps'
    },
    technical_docs: {
      primary: 'Educational Transparent',
      secondary: 'Precise Accessible',
      description: 'Complex concepts made understandable with full context'
    }
  };

  return (
    <div className="design-system-content">
      <MLHeading level="1">Voice & Copy Guidelines</MLHeading>
      <MLText className="design-system-subtitle">
        MaterialLab's Sage-Creator archetype with contextual tone adaptation and human-empowering messaging
      </MLText>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
        <ArchetypeCard
          title="The Sage"
          description="Driven by desire for truth, knowledge, and wisdom. Seeks to understand the world and share insights."
          characteristics={[
            'Knowledgeable and experienced',
            'Educational without condescending', 
            'Builds trust through transparency',
            'Thoughtful and considered'
          ]}
          color="var(--primary)"
        />
        
        <ArchetypeCard
          title="The Creator"
          description="Passionate about innovation and building enduring value. Envisions new possibilities."
          characteristics={[
            'Innovative and forward-thinking',
            'Inspiring and possibility-focused',
            'Visionary yet practical',
            'Motivates toward better solutions'
          ]}
          color="var(--secondary)"
        />
      </div>

      <MLCard style={{ 
        padding: 'var(--space-6)', 
        background: 'var(--surface-1)', 
        marginBottom: 'var(--space-8)'
      }}>
        <MLHeading level="2" style={{ marginBottom: 'var(--space-4)' }}>
          Contextual Tone Matrix
        </MLHeading>
        
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
          {Object.entries(toneMatrix).map(([key, value]) => (
            <Button
              key={key}
              variant={selectedTone === key ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedTone(key)}
            >
              {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Button>
          ))}
        </div>

        <div style={{ 
          padding: 'var(--space-4)',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--outline)'
        }}>
          <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
            <div>
              <MLText style={{ fontSize: 'var(--text-sm)', color: 'var(--on-surface-variant)' }}>
                Primary Tone
              </MLText>
              <MLText style={{ fontWeight: 'var(--font-semibold)' }}>
                {toneMatrix[selectedTone as keyof typeof toneMatrix].primary}
              </MLText>
            </div>
            <div>
              <MLText style={{ fontSize: 'var(--text-sm)', color: 'var(--on-surface-variant)' }}>
                Secondary Tone  
              </MLText>
              <MLText style={{ fontWeight: 'var(--font-semibold)' }}>
                {toneMatrix[selectedTone as keyof typeof toneMatrix].secondary}
              </MLText>
            </div>
          </div>
          <MLText style={{ color: 'var(--on-surface-variant)' }}>
            {toneMatrix[selectedTone as keyof typeof toneMatrix].description}
          </MLText>
        </div>
      </MLCard>

      <VoiceExample
        context="Website Hero"
        description="Main landing page headline that introduces MaterialLab's value proposition"
        badExample="Revolutionary AI Platform. Leverage cutting-edge artificial intelligence to transform your business with our game-changing solution."
        goodExample="Design Tomorrow, Together. We unite human creativity with AI precision to build products that solve real problems for real people."
        analysis={[
          'Replaces generic "Revolutionary AI" with specific "Design Tomorrow, Together"',
          'Emphasizes collaboration ("Together") rather than AI dominance',
          'Focuses on human outcomes ("real problems for real people")',
          'Avoids overpromising language ("game-changing", "transform")',
          'Positions AI as a tool that enhances human creativity'
        ]}
      />

      <VoiceExample
        context="Error Message"
        description="File upload failure that provides helpful guidance to users"
        badExample="Error: Upload failed. Please try again."
        goodExample="Upload Paused at 67%. This usually happens with files over 5MB on slower connections. You can resume upload (we saved your progress), try with a compressed version, or use our email option for large files. Your data is secure and we'll complete the upload when you're ready."
        analysis={[
          'Provides specific context (67% progress, file size, connection)',
          'Explains the likely cause without blaming the user',
          'Offers multiple solution paths with clear next steps',
          'Reassures about data security and progress preservation',
          'Maintains user agency ("when you\'re ready")'
        ]}
      />

      <VoiceExample
        context="AI Feature Description"
        description="Explaining how AI analysis works in project planning"
        badExample="Our AI thinks the best approach is automatic timeline optimization. The system believes this will eliminate scheduling conflicts and deliver magical results."
        goodExample="AI analysis identifies potential timeline risks by comparing your team's velocity patterns with similar project data. You maintain full control over all scheduling decisions, and can modify or override any suggestions based on your specific context and expertise."
        analysis={[
          'Removes anthropomorphic language ("AI thinks", "system believes")',
          'Explains the actual process and data sources',
          'Emphasizes user control ("You maintain full control")',
          'Acknowledges human expertise as essential',
          'Avoids overpromising ("magical results" → realistic capabilities)'
        ]}
      />

      <VoiceExample
        context="Technical Documentation"
        description="Explaining AI confidence scores to business users"
        badExample="The AI model generates confidence scores using proprietary algorithms to determine recommendation accuracy."
        goodExample="AI confidence scores help you understand how certain our analysis is about a recommendation. A score of 85% means we found strong patterns in your data that support this suggestion, but you should still review it against your specific context and expertise. Scores below 70% usually mean we need more information about your situation, or that human judgment is especially important for this decision."
        analysis={[
          'Starts with user benefit ("help you understand")',
          'Uses concrete examples (85% score explanation)',
          'Relates to user\'s real-world context',
          'Emphasizes human judgment as essential', 
          'Provides actionable guidance for different score ranges',
          'Avoids technical jargon ("proprietary algorithms")'
        ]}
      />

      <MLCard style={{ 
        padding: 'var(--space-6)', 
        background: 'var(--surface-1)', 
        border: '2px solid var(--primary)' 
      }}>
        <MLHeading level="2" style={{ color: 'var(--primary)', marginBottom: 'var(--space-4)' }}>
          Voice Validation Checklist
        </MLHeading>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
          <div>
            <MLHeading level="3" style={{ color: 'var(--success)', marginBottom: 'var(--space-2)' }}>
              ✅ Sage Archetype Check
            </MLHeading>
            <div style={{ display: 'grid', gap: 'var(--space-1)' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <input type="checkbox" style={{ marginTop: '0.125rem' }} />
                <span>Demonstrates knowledge and expertise</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <input type="checkbox" style={{ marginTop: '0.125rem' }} />
                <span>Educational without condescending</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <input type="checkbox" style={{ marginTop: '0.125rem' }} />
                <span>Builds trust through transparency</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <input type="checkbox" style={{ marginTop: '0.125rem' }} />
                <span>Shows thoughtful consideration</span>
              </label>
            </div>
          </div>
          
          <div>
            <MLHeading level="3" style={{ color: 'var(--secondary)', marginBottom: 'var(--space-2)' }}>
              ✅ Creator Archetype Check
            </MLHeading>
            <div style={{ display: 'grid', gap: 'var(--space-1)' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <input type="checkbox" style={{ marginTop: '0.125rem' }} />
                <span>Presents innovative possibilities</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <input type="checkbox" style={{ marginTop: '0.125rem' }} />
                <span>Inspires toward better solutions</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <input type="checkbox" style={{ marginTop: '0.125rem' }} />
                <span>Shows forward-thinking vision</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <input type="checkbox" style={{ marginTop: '0.125rem' }} />
                <span>Focuses on practical outcomes</span>
              </label>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-6)' }}>
          <MLHeading level="3" style={{ color: 'var(--error)', marginBottom: 'var(--space-2)' }}>
            ❌ Anti-Slop Language to Avoid
          </MLHeading>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 'var(--space-2)' 
          }}>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--on-surface-variant)' }}>
              <strong>Anthropomorphic:</strong> "AI thinks", "system believes", "algorithm wants"
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--on-surface-variant)' }}>
              <strong>Overpromising:</strong> "revolutionary", "magical", "effortless", "seamless"
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--on-surface-variant)' }}>
              <strong>Generic Clichés:</strong> "leverage synergies", "paradigm shift", "game-changing"
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--on-surface-variant)' }}>
              <strong>Replacement Language:</strong> "eliminate human intervention", "automate away"
            </div>
          </div>
        </div>
      </MLCard>
    </div>
  );
};