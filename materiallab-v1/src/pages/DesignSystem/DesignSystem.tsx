import React, { useState } from 'react';
import { MLCard, MLText, MLHeading } from '../../components/ML';
import { Button } from '../../components/UI/Button';
import { DesignTokens } from './components/DesignTokens';
import { ComponentLibrary } from './components/ComponentLibrary';
import { BrandIdentity } from './components/BrandIdentity';
import { TypographySpecimen } from '../../components/Typography/TypographySpecimen';
import './DesignSystem.css';

type SectionType = 'overview' | 'brand' | 'typography' | 'tokens' | 'components';

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
                <MLHeading level="3">Typography System</MLHeading>
                <MLText>
                  Complete typography system with dual brand personality support. 
                  Inter and Space Grotesk fonts with WCAG 2.1 AA compliance.
                </MLText>
                <Button 
                  variant="primary" 
                  onClick={() => setCurrentSection('typography')}
                  className="mt-4"
                >
                  View Typography
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
            </div>

            <div className="design-system-stats">
              <MLCard className="stat-card">
                <MLText className="stat-number">13</MLText>
                <MLText className="stat-label">Typography Styles</MLText>
              </MLCard>
              <MLCard className="stat-card">
                <MLText className="stat-number">3</MLText>
                <MLText className="stat-label">Brand Voices</MLText>
              </MLCard>
              <MLCard className="stat-card">
                <MLText className="stat-number">10</MLText>
                <MLText className="stat-label">Theme Modes</MLText>
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
      case 'typography':
        return (
          <div className="design-system-content">
            <MLHeading level="1">Typography System</MLHeading>
            <MLText className="mb-6">
              Complete typography system with dual brand personality support, 
              WCAG 2.1 AA compliance, and MaterialLab voice guidelines.
            </MLText>
            <TypographySpecimen />
          </div>
        );
      case 'tokens':
        return <DesignTokens />;
      case 'components':
        return <ComponentLibrary />;
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
          <SidebarItem section="typography" currentSection={currentSection} onClick={setCurrentSection}>
            Typography
          </SidebarItem>
          <SidebarItem section="tokens" currentSection={currentSection} onClick={setCurrentSection}>
            Design Tokens
          </SidebarItem>
          <SidebarItem section="components" currentSection={currentSection} onClick={setCurrentSection}>
            Components
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