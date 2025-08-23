import React from 'react';
import { MLCard, MLText, MLHeading } from '../../../components/ML';

export const ImperfectlyCraftedPreview: React.FC = () => {
  return (
    <div style={{ 
      padding: '4rem 2rem', 
      textAlign: 'center',
      background: 'linear-gradient(135deg, #FF6B4A10, #FFB84D10, #B8A4E310)',
      borderRadius: '20px',
      border: '2px solid #FF6B4A30'
    }}>
      <MLHeading level="1" style={{ marginBottom: '2rem' }}>
        🚀 System Migrated
      </MLHeading>
      <MLText style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.8 }}>
        The enhanced design system has been moved to Long Story Short.
        <br />
        Visit <strong>/long-story-short</strong> for the complete four-mode design system.
      </MLText>
      <a 
        href="/long-story-short" 
        style={{
          display: 'inline-block',
          padding: '16px 32px',
          background: '#FF6B4A',
          color: '#FFFFFF',
          textDecoration: 'none',
          borderRadius: '12px',
          fontWeight: '700',
          fontSize: '1.125rem',
          transition: 'all 200ms ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 74, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        → Go to Long Story Short Design System
      </a>
    </div>
  );
};