import React, { useState } from 'react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  themeMode: string;
  onThemeChange: (theme: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
  themeMode,
  onThemeChange
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sections = [
    { key: 'colors', label: 'Colors', icon: '🎨', category: 'Foundation' },
    { key: 'typography', label: 'Typography', icon: '✍️', category: 'Foundation' },
    { key: 'gradients', label: 'Gradients', icon: '🌈', category: 'Foundation' },
    { key: 'tokens', label: 'Tokens', icon: '⚙️', category: 'Foundation' },
    { key: 'modes', label: 'Theme Modes', icon: '🎭', category: 'Themes' },
    { key: 'type-tester', label: 'Type Tester', icon: '🔍', category: 'Tools' },
    { key: 'mood', label: 'Mood Board', icon: '📋', category: 'Tools' },
    { key: 'preview', label: 'Live Preview', icon: '👁️', category: 'Tools' },
    { key: 'docs', label: 'Documentation', icon: '📚', category: 'System' }
  ];

  const themeModes = [
    // V1 Original Modes
    { 
      key: 'light', 
      label: 'Light', 
      description: 'Gallery clarity', 
      version: 'V1',
      color: '#FF6B4A'
    },
    { 
      key: 'dark', 
      label: 'Dark', 
      description: 'Cinematic depth', 
      version: 'V1',
      color: '#B8A4E3'
    },
    { 
      key: 'minimal', 
      label: 'Minimal', 
      description: 'Zen focus', 
      version: 'V1',
      color: '#FF6B4A'
    },
    { 
      key: 'maximal', 
      label: 'Maximal', 
      description: 'Rich abundance', 
      version: 'V1',
      color: '#FFB84D'
    },
    
    // Film-Inspired Modes
    { 
      key: 'night-interior', 
      label: 'Night Interior', 
      description: 'Amber-lit intimacy', 
      version: 'Film',
      color: '#FFA500'
    },
    { 
      key: 'day-exterior', 
      label: 'Day Exterior', 
      description: 'Natural daylight', 
      version: 'Film',
      color: '#87CEEB'
    },
    { 
      key: 'golden-hour', 
      label: 'Golden Hour', 
      description: 'Sunset warmth', 
      version: 'Film',
      color: '#FF8E53'
    },
    { 
      key: 'intimate', 
      label: 'Intimate', 
      description: 'Cozy interior', 
      version: 'Film',
      color: '#D4A574'
    },
    { 
      key: 'dramatic', 
      label: 'Dramatic', 
      description: 'High contrast', 
      version: 'Film',
      color: '#FF4444'
    },
    { 
      key: 'memory', 
      label: 'Memory', 
      description: 'Nostalgic fade', 
      version: 'Film',
      color: '#C9A882'
    }
  ];

  const groupedSections = sections.reduce((acc, section) => {
    if (!acc[section.category]) acc[section.category] = [];
    acc[section.category].push(section);
    return acc;
  }, {} as Record<string, typeof sections>);

  const v1Modes = themeModes.filter(mode => mode.version === 'V1');
  const filmModes = themeModes.filter(mode => mode.version === 'Film');

  return (
    <>
      <aside className={`lss-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <style>{`
          .lss-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 300px;
            height: 100vh;
            background: var(--lss-surface, rgba(255, 255, 255, 0.95));
            backdrop-filter: blur(20px);
            border-right: 1px solid rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
            padding: 0;
            overflow-y: auto;
            z-index: 100;
            transition: all 0.3s ease;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          }

          .lss-sidebar.collapsed {
            width: 60px;
          }

          .sidebar-header {
            padding: 1.5rem;
            border-bottom: 1px solid rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
            position: sticky;
            top: 0;
            background: inherit;
            z-index: 10;
          }

          .sidebar-title {
            font-family: var(--font-primary, 'Space Grotesk Variable');
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--lss-text-primary);
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .collapse-toggle {
            background: none;
            border: none;
            color: var(--lss-text-secondary);
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: all 0.2s ease;
          }

          .collapse-toggle:hover {
            background: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
            color: var(--lss-accent);
          }

          .sidebar-content {
            padding: 1rem 0;
          }

          .sidebar-section {
            margin-bottom: 2rem;
          }

          .section-title {
            font-family: var(--font-body);
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--lss-text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0 1.5rem;
            margin-bottom: 0.75rem;
          }

          .sidebar.collapsed .section-title {
            display: none;
          }

          .section-items {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .sidebar-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
            border-right: 3px solid transparent;
            font-family: var(--font-body);
            font-size: 0.875rem;
            color: var(--lss-text-primary);
          }

          .sidebar-item:hover {
            background: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.05);
            color: var(--lss-accent);
          }

          .sidebar-item.active {
            background: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
            border-right-color: var(--lss-accent);
            color: var(--lss-accent);
            font-weight: 500;
          }

          .sidebar-item-icon {
            font-size: 1rem;
            flex-shrink: 0;
          }

          .sidebar-item-label {
            flex: 1;
            min-width: 0;
          }

          .sidebar.collapsed .sidebar-item-label {
            display: none;
          }

          .theme-modes {
            padding: 1rem 1.5rem;
            border-top: 1px solid rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
          }

          .theme-group {
            margin-bottom: 1.5rem;
          }

          .theme-group-title {
            font-family: var(--font-body);
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--lss-text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.75rem;
          }

          .theme-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }

          .sidebar.collapsed .theme-buttons {
            grid-template-columns: 1fr;
          }

          .theme-button {
            padding: 0.5rem 0.75rem;
            border: 1px solid rgba(var(--lss-accent-rgb, 255, 107, 74), 0.2);
            border-radius: 6px;
            background: transparent;
            color: var(--lss-text-primary);
            font-size: 0.75rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            line-height: 1.2;
          }

          .theme-button:hover {
            border-color: var(--lss-accent);
            background: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.05);
            transform: translateY(-1px);
          }

          .theme-button.active {
            border-color: var(--lss-accent);
            background: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.1);
            color: var(--lss-accent);
            font-weight: 600;
          }

          .theme-button::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: var(--theme-color, var(--lss-accent));
            opacity: 0.3;
            transition: opacity 0.2s ease;
          }

          .theme-button.active::before {
            opacity: 1;
          }

          .sidebar.collapsed .theme-button {
            padding: 0.5rem;
            font-size: 0.625rem;
          }

          .experimental-badge {
            background: linear-gradient(135deg, #FF6F61, #FFB84D);
            color: white;
            font-size: 0.625rem;
            font-weight: 600;
            padding: 0.125rem 0.375rem;
            border-radius: 10px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-left: auto;
            flex-shrink: 0;
          }

          .sidebar.collapsed .experimental-badge {
            display: none;
          }

          @media (max-width: 768px) {
            .lss-sidebar {
              transform: translateX(-100%);
            }
            
            .lss-sidebar.collapsed {
              transform: translateX(0);
              width: 100%;
              height: auto;
              position: relative;
            }
          }

          /* Scrollbar styling */
          .lss-sidebar::-webkit-scrollbar {
            width: 4px;
          }

          .lss-sidebar::-webkit-scrollbar-track {
            background: transparent;
          }

          .lss-sidebar::-webkit-scrollbar-thumb {
            background: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.3);
            border-radius: 2px;
          }

          .lss-sidebar::-webkit-scrollbar-thumb:hover {
            background: rgba(var(--lss-accent-rgb, 255, 107, 74), 0.5);
          }
        `}</style>

        {/* Header */}
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            {!isCollapsed && 'LSS Design System'}
            <button 
              className="collapse-toggle"
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? '→' : '←'}
            </button>
          </h2>
        </div>

        <div className="sidebar-content">
          {/* Navigation Sections */}
          {Object.entries(groupedSections).map(([category, items]) => (
            <div key={category} className="sidebar-section">
              <h3 className="section-title">{category}</h3>
              <div className="section-items">
                {items.map((section) => (
                  <div 
                    key={section.key}
                    className={`sidebar-item ${activeSection === section.key ? 'active' : ''}`}
                    onClick={() => onSectionChange(section.key)}
                  >
                    <span className="sidebar-item-icon">{section.icon}</span>
                    <span className="sidebar-item-label">{section.label}</span>
                    {section.key === 'modes' && !isCollapsed && (
                      <span className="experimental-badge">New</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Theme Mode Buttons */}
        <div className="theme-modes">
          {/* V1 Modes */}
          <div className="theme-group">
            <h3 className="theme-group-title">V1 Original</h3>
            <div className="theme-buttons">
              {v1Modes.map((mode) => (
                <button
                  key={mode.key}
                  className={`theme-button ${themeMode === mode.key ? 'active' : ''}`}
                  onClick={() => onThemeChange(mode.key)}
                  title={mode.description}
                  style={{ '--theme-color': mode.color } as React.CSSProperties}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Film Modes */}
          <div className="theme-group">
            <h3 className="theme-group-title">
              Film Inspired
              {!isCollapsed && <span className="experimental-badge">Experimental</span>}
            </h3>
            <div className="theme-buttons">
              {filmModes.map((mode) => (
                <button
                  key={mode.key}
                  className={`theme-button ${themeMode === mode.key ? 'active' : ''}`}
                  onClick={() => onThemeChange(mode.key)}
                  title={mode.description}
                  style={{ '--theme-color': mode.color } as React.CSSProperties}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsCollapsed(true)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 99,
            display: 'none'
          }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .sidebar-overlay {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};