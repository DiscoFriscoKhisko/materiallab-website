import React from 'react';
import { Sidebar } from './Sidebar';

interface DocsLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
  themeMode: string;
  onThemeChange: (theme: string) => void;
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({
  children,
  activeSection,
  onSectionChange,
  themeMode,
  onThemeChange
}) => {
  return (
    <div className="docs-layout">
      <style>{`
        .docs-layout {
          display: flex;
          min-height: 100vh;
          background: var(--lss-bg-primary, #FAF9F6);
          color: var(--lss-text-primary, #0A0A0A);
        }

        .docs-content {
          flex: 1;
          margin-left: 300px; /* Space for sidebar */
          padding: 2rem;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .docs-content {
            margin-left: 0;
            padding: 1rem;
          }
        }
      `}</style>

      <Sidebar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        themeMode={themeMode}
        onThemeChange={onThemeChange}
      />

      <main className="docs-content">
        {children}
      </main>
    </div>
  );
};