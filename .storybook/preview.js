import '../src/index.css'
import '../src/styles/tokens.css'

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    // Enable accessibility addon
    a11y: {
      config: {
        rules: [
          {
            // Disable color-contrast rule for design system examples
            id: 'color-contrast',
            enabled: false
          }
        ]
      }
    }
  },
  
  // Global decorators for design system context
  decorators: [
    (Story) => (
      <div className="storybook-wrapper" style={{ 
        fontFamily: 'var(--font-primary, Inter, sans-serif)',
        fontSize: '16px',
        lineHeight: '1.5',
        color: 'var(--color-text-primary, #333333)',
        backgroundColor: 'var(--color-background-surface, #ffffff)',
        padding: '1rem'
      }}>
        <Story />
      </div>
    ),
  ],

  // Global args for all stories
  args: {},

  // Global arg types
  argTypes: {
    // Common design system props
    variant: {
      control: { type: 'select' }
    },
    size: {
      control: { type: 'select' }
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark']
    }
  },

  // Theme switching support
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: ['light', 'dark'],
        showName: true,
      },
    },
  },
}

export default preview