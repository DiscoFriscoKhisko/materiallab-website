import React, { useEffect, ReactNode } from 'react';
import { useLSSTheme } from '../../contexts/LSSThemeContext';

interface ThemeWrapperProps {
  children: ReactNode;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const { themeMode } = useLSSTheme();

  useEffect(() => {
    // Apply theme class to document body and preserve existing classes
    const body = document.body;
    const existingClasses = body.className.split(' ').filter(cls => 
      !['light', 'dark', 'minimal', 'maximal', 'night-interior', 'day-exterior', 
        'golden-hour', 'intimate', 'dramatic', 'memory'].includes(cls)
    );
    body.className = [...existingClasses, themeMode].join(' ');
  }, [themeMode]);

  return (
    <div className={`lss-app min-h-screen transition-all duration-500 ${themeMode}`}>
      {children}
    </div>
  );
};

export default ThemeWrapper;