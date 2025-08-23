import React, { useState } from 'react';
import { MLCard, MLText, MLHeading } from '../../../components/ML';
import { Button } from '../../../components/UI/Button';
import { Input } from '../../../components/UI/Input';

interface ComponentShowcaseProps {
  title: string;
  description: string;
  children: React.ReactNode;
  code?: string;
}

const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({ 
  title, 
  description, 
  children, 
  code 
}) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="component-preview">
      <div className="component-preview-header">
        <div>
          <MLHeading level="3" style={{ marginBottom: 'var(--space-1)' }}>
            {title}
          </MLHeading>
          <MLText style={{ color: 'var(--on-surface-variant)' }}>
            {description}
          </MLText>
        </div>
        {code && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </Button>
        )}
      </div>
      
      <div className="component-playground">
        <div style={{ 
          background: 'var(--surface)', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--outline)',
          padding: 'var(--space-6)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          alignItems: 'center'
        }}>
          {children}
        </div>
      </div>

      {code && showCode && (
        <div style={{ 
          background: 'var(--surface-2)',
          border: '1px solid var(--outline)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4)',
          marginTop: 'var(--space-4)',
          overflow: 'auto'
        }}>
          <pre style={{ 
            margin: 0, 
            fontFamily: 'monospace', 
            fontSize: 'var(--text-sm)',
            color: 'var(--on-surface)',
            lineHeight: '1.5'
          }}>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export const ComponentLibrary: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsyncAction = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const buttonCode = `<Button variant="primary" size="md">
  Primary Action
</Button>

<Button variant="secondary" size="md">
  Secondary Action
</Button>

<Button variant="outline" size="md">
  Outline Button
</Button>

<Button variant="text" size="md">
  Text Button
</Button>`;

  const inputCode = `<Input
  placeholder="Enter your email"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  label="Email Address"
  helperText="We'll never share your email"
/>

<Input
  type="password"
  placeholder="Enter password"
  label="Password"
  required
  error={inputValue.length < 8 && inputValue.length > 0}
  helperText={
    inputValue.length < 8 && inputValue.length > 0
      ? "Password must be at least 8 characters"
      : "Choose a strong password"
  }
/>`;

  const cardCode = `<MLCard>
  <MLHeading level="3">Card Title</MLHeading>
  <MLText>
    This is a MaterialLab card component with proper
    spacing, colors, and interactive states.
  </MLText>
  <Button variant="primary" size="sm">
    Action
  </Button>
</MLCard>`;

  return (
    <div className="design-system-content">
      <MLHeading level="1">Component Library</MLHeading>
      <MLText className="design-system-subtitle">
        React components following atomic design principles with MaterialLab branding and comprehensive accessibility
      </MLText>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        <ComponentShowcase
          title="Button Component"
          description="Primary interactive element with multiple variants and states"
          code={buttonCode}
        >
          <Button variant="primary" size="md">
            Primary Action
          </Button>
          <Button variant="secondary" size="md">
            Secondary Action
          </Button>
          <Button variant="outline" size="md">
            Outline Button
          </Button>
          <Button variant="text" size="md">
            Text Button
          </Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button 
            variant="primary" 
            loading={loading}
            onClick={handleAsyncAction}
          >
            {loading ? 'Loading...' : 'Async Action'}
          </Button>
        </ComponentShowcase>

        <ComponentShowcase
          title="Input Component"
          description="Form input with validation states and accessibility features"
          code={inputCode}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%', maxWidth: '400px' }}>
            <Input
              placeholder="Enter your email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              label="Email Address"
              helperText="We'll never share your email"
            />
            <Input
              type="password"
              placeholder="Enter password"
              label="Password"
              required
              error={inputValue.length < 8 && inputValue.length > 0}
              helperText={
                inputValue.length < 8 && inputValue.length > 0
                  ? "Password must be at least 8 characters"
                  : "Choose a strong password"
              }
            />
            <Input
              placeholder="Disabled input"
              label="Disabled Field"
              disabled
            />
          </div>
        </ComponentShowcase>

        <ComponentShowcase
          title="Card Component"
          description="Container component with elevation and consistent spacing"
          code={cardCode}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', width: '100%' }}>
            <MLCard style={{ padding: 'var(--space-6)' }}>
              <MLHeading level="3" style={{ marginBottom: 'var(--space-2)' }}>
                Default Card
              </MLHeading>
              <MLText style={{ marginBottom: 'var(--space-4)' }}>
                This is a MaterialLab card component with proper spacing, colors, and interactive states.
              </MLText>
              <Button variant="primary" size="sm">
                Action
              </Button>
            </MLCard>
            
            <MLCard style={{ padding: 'var(--space-6)', border: '2px solid var(--primary)' }}>
              <MLHeading level="3" style={{ marginBottom: 'var(--space-2)', color: 'var(--primary)' }}>
                Highlighted Card
              </MLHeading>
              <MLText style={{ marginBottom: 'var(--space-4)' }}>
                A card with primary border highlighting for important content or selected states.
              </MLText>
              <Button variant="outline" size="sm">
                Secondary Action
              </Button>
            </MLCard>
          </div>
        </ComponentShowcase>

        <ComponentShowcase
          title="Typography Components"
          description="Text components with consistent styling and accessibility"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%' }}>
            <MLHeading level="1">
              Display Heading (H1)
            </MLHeading>
            <MLHeading level="2">
              Section Heading (H2)
            </MLHeading>
            <MLHeading level="3">
              Subsection Heading (H3)
            </MLHeading>
            <MLText>
              This is standard body text using the MLText component. It follows MaterialLab's typography 
              guidelines for optimal readability and accessibility. The component automatically applies 
              proper line height, letter spacing, and color contrast.
            </MLText>
            <MLText style={{ fontSize: 'var(--text-sm)', color: 'var(--on-surface-variant)' }}>
              This is smaller text often used for captions, metadata, or secondary information. 
              It maintains readability while providing visual hierarchy.
            </MLText>
          </div>
        </ComponentShowcase>

        <MLCard style={{ padding: 'var(--space-6)', background: 'var(--surface-1)', border: '1px solid var(--primary)' }}>
          <MLHeading level="2" style={{ color: 'var(--primary)', marginBottom: 'var(--space-4)' }}>
            Component Guidelines
          </MLHeading>
          
          <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
            <div>
              <MLHeading level="3" style={{ color: 'var(--success)', marginBottom: 'var(--space-2)' }}>
                ✅ Best Practices
              </MLHeading>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', lineHeight: '1.6' }}>
                <li>Use semantic HTML elements for accessibility</li>
                <li>Include proper ARIA labels and descriptions</li>
                <li>Follow the established size and spacing props</li>
                <li>Use design tokens for colors and typography</li>
                <li>Provide loading and disabled states</li>
                <li>Include helpful error messages and validation</li>
                <li>Test keyboard navigation and screen reader compatibility</li>
              </ul>
            </div>
            
            <div>
              <MLHeading level="3" style={{ color: 'var(--error)', marginBottom: 'var(--space-2)' }}>
                ❌ What to Avoid
              </MLHeading>
              <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', lineHeight: '1.6' }}>
                <li>Hard-coding colors or sizes instead of using props</li>
                <li>Creating custom variants without design approval</li>
                <li>Removing accessibility features for visual reasons</li>
                <li>Using generic HTML elements instead of semantic ones</li>
                <li>Forgetting focus states and keyboard interaction</li>
                <li>Omitting error states and user feedback</li>
              </ul>
            </div>
          </div>
        </MLCard>

      </div>
    </div>
  );
};