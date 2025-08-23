import React, { useState } from 'react';
import { MLCard, MLText, MLHeading } from '../../components/ML';
import { Button } from '../../components/UI/Button';
import { DesignTokens } from './components/DesignTokens';
import { ComponentLibrary } from './components/ComponentLibrary';
import { AntiSlopShowcase } from './components/AntiSlopShowcase';
import { VoiceGuidelines } from './components/VoiceGuidelines';
import { BrandIdentity } from './components/BrandIdentity';
import { ImperfectlyCraftedPreview } from './components/ImperfectlyCraftedPreview';
import './DesignSystem.css';

type SectionType = 'overview' | 'brand' | 'tokens' | 'components' | 'anti-slop' | 'voice' | 'code' | 'imperfect-preview';

interface SidebarItemProps {
  section: SectionType;
  currentSection: SectionType;
  onClick: (section: SectionType) => void;
  children: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ section, currentSection, onClick, children }) => (
  <button
    className={`design-system-sidebar-item ${currentSection === section ? 'active' : ''}`}
    onClick={() => onClick(section)}
  >
    {children}
  </button>
);

const DesignSystem: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<SectionType>('overview');

  const renderContent = () => {
    switch (currentSection) {
      case 'overview':
        return (
          <div className="design-system-content">
            <MLHeading level="1" className="design-system-title">
              MaterialLab Design System
            </MLHeading>
            <MLText className="design-system-subtitle">
              Complete anti-slop design and development guidelines with interactive examples
            </MLText>
            
            <div className="design-system-overview-grid">
              <MLCard className="overview-card">
                <MLHeading level="3">Brand Identity</MLHeading>
                <MLText>
                  Sage-Creator archetype with human-centric AI philosophy. 
                  Visual identity featuring warm humanistic themes and structured dynamism.
                </MLText>
                <Button 
                  variant="primary" 
                  onClick={() => setCurrentSection('brand')}
                  className="mt-4"
                >
                  Explore Brand
                </Button>
              </MLCard>

              <MLCard className="overview-card">
                <MLHeading level="3">Design Tokens</MLHeading>
                <MLText>
                  Comprehensive token system with dual theme support. 
                  Dark-first AI-native theme with Ion Blue and Sunset Coral accents.
                </MLText>
                <Button 
                  variant="primary" 
                  onClick={() => setCurrentSection('tokens')}
                  className="mt-4"
                >
                  View Tokens
                </Button>
              </MLCard>

              <MLCard className="overview-card">
                <MLHeading level="3">Component Library</MLHeading>
                <MLText>
                  React components following atomic design principles with 
                  comprehensive accessibility and MaterialLab brand integration.
                </MLText>
                <Button 
                  variant="primary" 
                  onClick={() => setCurrentSection('components')}
                  className="mt-4"
                >
                  Browse Components
                </Button>
              </MLCard>

              <MLCard className="overview-card">
                <MLHeading level="3">Anti-Slop Guidelines</MLHeading>
                <MLText>
                  Specific patterns to avoid generic AI outputs. 
                  Side-by-side comparisons of generic vs. MaterialLab approaches.
                </MLText>
                <Button 
                  variant="primary" 
                  onClick={() => setCurrentSection('anti-slop')}
                  className="mt-4"
                >
                  See Guidelines
                </Button>
              </MLCard>

              <MLCard className="overview-card">
                <MLHeading level="3">Voice & Copy</MLHeading>
                <MLText>
                  Sage-Creator archetype implementation with contextual tone matrix.
                  Human-empowering messaging that avoids anthropomorphic AI language.
                </MLText>
                <Button 
                  variant="primary" 
                  onClick={() => setCurrentSection('voice')}
                  className="mt-4"
                >
                  Voice Guidelines
                </Button>
              </MLCard>

              <MLCard className="overview-card">
                <MLHeading level="3">Code Standards</MLHeading>
                <MLText>
                  Security-first development with comprehensive documentation patterns.
                  Human-centric error handling and AI transparency implementation.
                </MLText>
                <Button 
                  variant="primary" 
                  onClick={() => setCurrentSection('code')}
                  className="mt-4"
                >
                  Code Standards
                </Button>
              </MLCard>
            </div>

            <div className="design-system-stats">
              <MLCard className="stat-card">
                <MLText className="stat-number">85+</MLText>
                <MLText className="stat-label">Anti-Slop Patterns Identified</MLText>
              </MLCard>
              <MLCard className="stat-card">
                <MLText className="stat-number">4</MLText>
                <MLText className="stat-label">Specialized Sentinel Agents</MLText>
              </MLCard>
              <MLCard className="stat-card">
                <MLText className="stat-number">100%</MLText>
                <MLText className="stat-label">Brand Compliance Target</MLText>
              </MLCard>
              <MLCard className="stat-card">
                <MLText className="stat-number">WCAG 2.1 AA</MLText>
                <MLText className="stat-label">Accessibility Standard</MLText>
              </MLCard>
            </div>
          </div>
        );
        
      case 'brand':
        return <BrandIdentity />;
      case 'tokens':
        return <DesignTokens />;
      case 'components':
        return <ComponentLibrary />;
      case 'anti-slop':
        return <AntiSlopShowcase />;
      case 'voice':
        return <VoiceGuidelines />;
      case 'imperfect-preview':
        return <ImperfectlyCraftedPreview />;
      case 'code':
        return (
          <div className="design-system-content">
            <MLHeading level="1">Code Standards</MLHeading>
            <MLText>
              Coming soon: Interactive code examples and validation patterns.
            </MLText>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="design-system">
      <aside className="design-system-sidebar">
        <div className="design-system-sidebar-header">
          <MLHeading level="3">Design System</MLHeading>
          <MLText className="version-badge">v1.0.0</MLText>
        </div>
        
        <nav className="design-system-sidebar-nav">
          <SidebarItem section="overview" currentSection={currentSection} onClick={setCurrentSection}>
            Overview
          </SidebarItem>
          <SidebarItem section="brand" currentSection={currentSection} onClick={setCurrentSection}>
            Brand Identity
          </SidebarItem>
          <SidebarItem section="tokens" currentSection={currentSection} onClick={setCurrentSection}>
            Design Tokens
          </SidebarItem>
          <SidebarItem section="components" currentSection={currentSection} onClick={setCurrentSection}>
            Components
          </SidebarItem>
          <SidebarItem section="anti-slop" currentSection={currentSection} onClick={setCurrentSection}>
            Anti-Slop Guidelines
          </SidebarItem>
          <SidebarItem section="voice" currentSection={currentSection} onClick={setCurrentSection}>
            Voice & Copy
          </SidebarItem>
          <SidebarItem section="imperfect-preview" currentSection={currentSection} onClick={setCurrentSection}>
            🎨 Imperfect Preview
          </SidebarItem>
          <SidebarItem section="code" currentSection={currentSection} onClick={setCurrentSection}>
            Code Standards
          </SidebarItem>
        </nav>
      </aside>

      <main className="design-system-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default DesignSystem;