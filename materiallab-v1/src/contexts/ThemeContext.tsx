import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeId = 'light' | 'dark' | 'sunset' | 'ocean' | 'aurora';

interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  color: string;
  gradient: string;
}

const THEMES: Record<ThemeId, Theme> = {
  light: {
    id: 'light',
    name: 'Laboratory',
    description: 'Clean precision',
    color: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)'
  },
  dark: {
    id: 'dark', 
    name: 'Deep Space',
    description: 'Infinite depth',
    color: '#000000',
    gradient: 'linear-gradient(135deg, #000000 0%, #212529 100%)'
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Coral',
    description: 'Warm embrace',
    color: '#FF6B5D',
    gradient: 'linear-gradient(135deg, #FF6B5D 0%, #FFB84D 100%)'
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Depths', 
    description: 'Cool clarity',
    color: '#4DA6FF',
    gradient: 'linear-gradient(135deg, #4DA6FF 0%, #52E5B7 100%)'
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora',
    description: 'Northern lights',
    color: '#B8A4E3',
    gradient: 'linear-gradient(135deg, #B8A4E3 0%, #FFE55C 50%, #52E5B7 100%)'
  }
};

interface ThemeContextType {
  theme: ThemeId;
  themeData: Theme;
  setTheme: (theme: ThemeId) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    // Check localStorage first
    const stored = localStorage.getItem('materiallab-theme') as ThemeId;
    if (stored && THEMES[stored]) return stored;
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    
    // Default to dark (Ex Machina aesthetic)
    return 'dark';
  });

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    localStorage.setItem('materiallab-theme', newTheme);
  };

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all existing theme attributes
    root.removeAttribute('data-lss-theme');
    root.removeAttribute('data-theme');
    
    // Apply new theme
    root.setAttribute('data-theme', theme);
    
    // Apply theme-specific classes to body
    const body = document.body;
    body.className = body.className.replace(/theme-\w+/g, '');
    body.classList.add(`theme-${theme}`);
  }, [theme]);

  const value = {
    theme,
    themeData: THEMES[theme],
    setTheme,
    themes: Object.values(THEMES)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};