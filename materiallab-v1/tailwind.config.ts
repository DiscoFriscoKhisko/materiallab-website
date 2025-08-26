import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Material 3 Primary Colors
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          container: 'var(--primary-container)',
        },
        'on-primary': {
          DEFAULT: 'var(--on-primary)',
          container: 'var(--on-primary-container)',
        },
        
        // Material 3 Secondary Colors
        secondary: {
          DEFAULT: 'var(--secondary)',
          container: 'var(--secondary-container)',
        },
        'on-secondary': {
          DEFAULT: 'var(--on-secondary)',
          container: 'var(--on-secondary-container)',
        },
        
        // Material 3 Tertiary Colors
        tertiary: {
          DEFAULT: 'var(--tertiary)',
          container: 'var(--tertiary-container)',
        },
        'on-tertiary': {
          DEFAULT: 'var(--on-tertiary)',
          container: 'var(--on-tertiary-container)',
        },
        
        // Material 3 Surface Colors
        surface: {
          DEFAULT: 'var(--surface)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          4: 'var(--surface-4)',
          5: 'var(--surface-5)',
        },
        'on-surface': {
          DEFAULT: 'var(--on-surface)',
          variant: 'var(--on-surface-variant)',
        },
        
        // Background
        background: 'var(--background)',
        'on-background': 'var(--on-background)',
        
        // Legacy background support (for backwards compatibility)
        bg: 'var(--background)',
        
        // Outline and borders
        outline: {
          DEFAULT: 'var(--outline)',
          variant: 'var(--outline-variant)',
        },
        
        // Text Hierarchy (legacy support)
        text: {
          DEFAULT: 'var(--text)',
          weak: 'var(--text-weak)',
          weaker: 'var(--text-weaker)',
          inverse: 'var(--text-inverse)'
        },
        
        // Legacy brand colors (mapped to new system)
        coral: 'var(--primary)',
        ion: 'var(--secondary)',
        
        // Semantic Colors
        success: {
          DEFAULT: 'var(--success)',
          container: 'var(--success-container)',
        },
        'on-success': {
          DEFAULT: 'var(--on-success)',
          container: 'var(--on-success-container)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          container: 'var(--warning-container)',
        },
        'on-warning': {
          DEFAULT: 'var(--on-warning)',
          container: 'var(--on-warning-container)',
        },
        error: {
          DEFAULT: 'var(--error)',
          container: 'var(--error-container)',
        },
        'on-error': {
          DEFAULT: 'var(--on-error)',
          container: 'var(--on-error-container)',
        },
        info: 'var(--info)',
        link: 'var(--link)',
      },
      
      fontFamily: {
        primary: 'var(--font-primary)',  // Unified Sora font
        mono: 'var(--font-mono)',
        veo: 'var(--font-veo)',  // Google Sans for Veo components
        // Legacy support - all map to primary
        display: 'var(--font-primary)',
        headline: 'var(--font-primary)',
        body: 'var(--font-primary)'
      },
      
      fontSize: {
        // Role-based type scale
        'display': ['var(--text-display)', { 
          lineHeight: 'var(--text-display-lh)',
          letterSpacing: 'var(--text-display-tracking)'
        }],
        'headline': ['var(--text-headline)', { 
          lineHeight: 'var(--text-headline-lh)',
          letterSpacing: 'var(--text-headline-tracking)'
        }],
        'title': ['var(--text-title)', { 
          lineHeight: 'var(--text-title-lh)',
          letterSpacing: 'var(--text-title-tracking)'
        }],
        'body': ['var(--text-body)', { 
          lineHeight: 'var(--text-body-lh)',
          letterSpacing: 'var(--text-body-tracking)'
        }],
        'body-indic': ['var(--text-body)', { 
          lineHeight: 'var(--text-body-lh-indic)',
          letterSpacing: 'var(--text-body-tracking)'
        }],
        'label': ['var(--text-label)', { 
          lineHeight: 'var(--text-label-lh)',
          letterSpacing: 'var(--text-label-tracking)'
        }],
        
        // Legacy support (mapped to new system)
        'h1': ['var(--text-h1)', { lineHeight: 'var(--text-h1-lh)' }],
        'h2': ['var(--text-h2)', { lineHeight: 'var(--text-h2-lh)' }],
        'h3': ['var(--text-h3)', { lineHeight: 'var(--text-h3-lh)' }],
        'h4': ['var(--text-h4)', { lineHeight: 'var(--text-h4-lh)' }],
        'h5': ['var(--text-h5)', { lineHeight: 'var(--text-h5-lh)' }],
        'body-l': ['var(--text-body-l)', { lineHeight: 'var(--text-body-l-lh)' }],
        'body-m': ['var(--text-body-m)', { lineHeight: 'var(--text-body-m-lh)' }],
        'body-s': ['var(--text-body-s)', { lineHeight: 'var(--text-body-s-lh)' }],
        'caption': ['var(--text-caption)', { lineHeight: 'var(--text-caption-lh)' }],
        
        // Veo typography scale
        'veo-text-hero': ['var(--veo-text-hero)', { lineHeight: '1.1' }],      // 56px
        'veo-text-headline': ['var(--veo-text-headline)', { lineHeight: '1.2' }], // 32px
        'veo-text-title': ['var(--veo-text-title)', { lineHeight: '1.3' }],    // 24px
        'veo-text-body': ['var(--veo-text-body)', { lineHeight: '1.5' }],      // 16px
        'veo-text-caption': ['var(--veo-text-caption)', { lineHeight: '1.4' }]  // 14px
      },
      
      spacing: {
        // 8px grid system
        '1': 'var(--space-1)',   // 8px
        '2': 'var(--space-2)',   // 16px
        '3': 'var(--space-3)',   // 24px
        '4': 'var(--space-4)',   // 32px
        '5': 'var(--space-5)',   // 40px
        '6': 'var(--space-6)',   // 48px
        '7': 'var(--space-7)',   // 56px
        '8': 'var(--space-8)',   // 64px
        '9': 'var(--space-9)',   // 72px
        '10': 'var(--space-10)', // 80px
        '12': 'var(--space-12)', // 96px
        '16': 'var(--space-16)', // 128px
        '20': 'var(--space-20)', // 160px
        
        // Legacy support
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '4xl': 'var(--space-4xl)',
        '5xl': 'var(--space-5xl)'
      },
      
      borderRadius: {
        'sm': 'var(--radius-sm)',   // 8px
        'md': 'var(--radius-md)',   // 12px  
        'lg': 'var(--radius-lg)',   // 16px
        'xl': 'var(--radius-xl)',   // 24px
        'pill': 'var(--radius-pill)' // 999px
      },
      
      boxShadow: {
        'elevation-1': 'var(--elevation-1)',
        'elevation-2': 'var(--elevation-2)',
        'elevation-3': 'var(--elevation-3)',
        'elevation-4': 'var(--elevation-4)',
        'elevation-5': 'var(--elevation-5)'
      },
      
      
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'base': 'var(--duration-base)',
        'slow': 'var(--duration-slow)',
        'xslow': 'var(--duration-xslow)',
        'xxslow': 'var(--duration-xxslow)'
      },
      
      transitionTimingFunction: {
        'standard': 'var(--ease-standard)',
        'enter': 'var(--ease-enter)',
        'exit': 'var(--ease-exit)',
        'bounce': 'var(--ease-bounce)'
      }
    },
  },
  plugins: [],
} satisfies Config