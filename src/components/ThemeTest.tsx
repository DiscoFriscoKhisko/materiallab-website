import React from 'react';
import { useLSSTheme } from '../contexts/LSSThemeContext';

export const ThemeTest: React.FC = () => {
  const { themeMode, themeModes } = useLSSTheme();
  
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '120px', 
      right: '20px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 1000,
      maxWidth: '200px'
    }}>
      <div>Current Theme: <strong>{themeMode}</strong></div>
      <div>Total Modes: <strong>{themeModes.length}</strong></div>
      <div>Available: {themeModes.map(m => m.key).join(', ')}</div>
    </div>
  );
};