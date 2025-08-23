import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

// MaterialLab theme for Storybook
const materialLabTheme = create({
  base: 'light',
  
  // Brand
  brandTitle: 'MaterialLab Design System',
  brandUrl: 'https://materiallab.io',
  brandImage: undefined, // Add logo path if available
  
  // Colors
  colorPrimary: '#EC8B5E', // Energetic Orange from Humanistic Intelligence palette
  colorSecondary: '#141A46', // Deep Navy
  
  // UI
  appBg: '#FBEAEB', // Warm Beige
  appContentBg: '#FFFFFF',
  appBorderColor: 'rgba(51, 51, 51, 0.1)',
  appBorderRadius: 8,
  
  // Typography
  fontBase: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'JetBrains Mono, "SF Mono", Monaco, monospace',
  
  // Text colors
  textColor: '#333333',
  textInverseColor: '#FFFFFF',
  
  // Toolbar default and active colors
  barTextColor: '#333333',
  barSelectedColor: '#EC8B5E',
  barBg: '#FFFFFF',
  
  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: 'rgba(51, 51, 51, 0.2)',
  inputTextColor: '#333333',
  inputBorderRadius: 8,
})

addons.setConfig({
  theme: materialLabTheme,
  panelPosition: 'bottom',
  selectedPanel: 'controls'
})