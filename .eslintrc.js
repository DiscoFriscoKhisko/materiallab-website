module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jsx-a11y',
    'react-hooks'
  ],
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    },
    // Atomic design system configuration
    'atomic-design': {
      levels: {
        atoms: ['Button', 'Input', 'Typography', 'Icon', 'Avatar', 'Badge', 'Spinner'],
        molecules: ['FormField', 'SearchBox', 'NavItem', 'MediaCard', 'StatusMessage', 'MLCard'],
        organisms: ['Navigation', 'ContactForm', 'Header', 'Footer', 'ServiceGrid', 'VeoHero']
      },
      tokenPatterns: {
        colors: /var\(--color-[\w-]+\)/,
        spacing: /var\(--spacing-[\w-]+\)/,
        typography: /var\(--text-[\w-]+\)/,
        radius: /var\(--radius-[\w-]+\)/,
        shadow: /var\(--shadow-[\w-]+\)/
      }
    }
  },
  rules: {
    // React specific rules
    'react/react-in-jsx-scope': 'off', // React 17+ JSX transform
    'react/prop-types': 'off', // Using TypeScript instead
    'react/display-name': 'warn',
    
    // TypeScript rules
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    
    // Accessibility rules
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    
    // Design system rules (would need custom plugin implementation)
    // 'design-system/no-hardcoded-colors': 'error',
    // 'design-system/no-hardcoded-spacing': 'warn', 
    // 'design-system/atomic-import-restrictions': 'error',
    // 'design-system/require-semantic-tokens': 'error',
    
    // General code quality
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // Import organization
    'sort-imports': ['error', {
      'ignoreCase': false,
      'ignoreDeclarationSort': true,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
      'allowSeparatedGroups': true
    }]
  },
  overrides: [
    {
      // Atoms cannot import molecules or organisms
      files: ['src/components/atoms/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            {
              group: ['../molecules/*', '../../molecules/*', '../organisms/*', '../../organisms/*'],
              message: 'Atoms cannot import molecules or organisms. Use only other atoms and utilities.'
            }
          ]
        }]
      }
    },
    {
      // Molecules cannot import organisms
      files: ['src/components/molecules/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [
            {
              group: ['../organisms/*', '../../organisms/*'],
              message: 'Molecules cannot import organisms. Use atoms and other molecules only.'
            }
          ]
        }]
      }
    },
    {
      // Test files have more relaxed rules
      files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/__tests__/**/*'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off'
      }
    }
  ],
  ignorePatterns: [
    'dist',
    'build',
    'node_modules',
    '*.config.js',
    '*.config.ts'
  ]
};