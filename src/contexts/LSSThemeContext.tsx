import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LSSThemeMode = 
  | 'light' | 'dark' | 'minimal' | 'maximal'
  | 'night-interior' | 'day-exterior' | 'golden-hour' 
  | 'intimate' | 'dramatic' | 'memory';

interface LSSThemeContextType {
  themeMode: LSSThemeMode;
  setThemeMode: (mode: LSSThemeMode) => void;
  themeModes: {
    key: LSSThemeMode;
    label: string;
    description: string;
    version: 'V1' | 'Film';
    color: string;
  }[];
}

const LSSThemeContext = createContext<LSSThemeContextType | undefined>(undefined);

export const useLSSTheme = () => {
  const context = useContext(LSSThemeContext);
  if (!context) {
    throw new Error('useLSSTheme must be used within an LSSThemeProvider');
  }
  return context;
};

interface LSSThemeProviderProps {
  children: ReactNode;
}

export const LSSThemeProvider: React.FC<LSSThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<LSSThemeMode>('light');

  const themeModes = [
    // V1 Original Modes
    { 
      key: 'light' as const, 
      label: 'Light', 
      description: 'Gallery clarity', 
      version: 'V1' as const,
      color: '#FF6B4A'
    },
    { 
      key: 'dark' as const, 
      label: 'Dark', 
      description: 'Cinematic depth', 
      version: 'V1' as const,
      color: '#B8A4E3'
    },
    { 
      key: 'minimal' as const, 
      label: 'Minimal', 
      description: 'Zen focus', 
      version: 'V1' as const,
      color: '#FF6B4A'
    },
    { 
      key: 'maximal' as const, 
      label: 'Maximal', 
      description: 'Rich abundance', 
      version: 'V1' as const,
      color: '#FFB84D'
    },
    
    // Film-Inspired Modes
    { 
      key: 'night-interior' as const, 
      label: 'Night Interior', 
      description: 'Amber-lit intimacy', 
      version: 'Film' as const,
      color: '#FFA500'
    },
    { 
      key: 'day-exterior' as const, 
      label: 'Day Exterior', 
      description: 'Natural daylight', 
      version: 'Film' as const,
      color: '#87CEEB'
    },
    { 
      key: 'golden-hour' as const, 
      label: 'Golden Hour', 
      description: 'Sunset warmth', 
      version: 'Film' as const,
      color: '#FF8E53'
    },
    { 
      key: 'intimate' as const, 
      label: 'Intimate', 
      description: 'Cozy interior', 
      version: 'Film' as const,
      color: '#D4A574'
    },
    { 
      key: 'dramatic' as const, 
      label: 'Dramatic', 
      description: 'High contrast', 
      version: 'Film' as const,
      color: '#FF4444'
    },
    { 
      key: 'memory' as const, 
      label: 'Memory', 
      description: 'Nostalgic fade', 
      version: 'Film' as const,
      color: '#C9A882'
    }
  ];

  return (
    <LSSThemeContext.Provider value={{
      themeMode,
      setThemeMode,
      themeModes
    }}>
      {children}
    </LSSThemeContext.Provider>
  );
};