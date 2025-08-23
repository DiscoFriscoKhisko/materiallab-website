import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/materiallab-website/' : '/',
  
  // Path aliases for atomic design system
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@organisms': path.resolve(__dirname, 'src/components/organisms'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@design-system': path.resolve(__dirname, 'design-system')
    }
  },
  
  server: {
    port: 3000,
    host: true,
    allowedHosts: [
      'nutrition-demonstrates-language-ca.trycloudflare.com',
      '.trycloudflare.com',
      'localhost',
      '127.0.0.1'
    ]
  },
  
  // Build optimizations for atomic design system
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate atoms, molecules, organisms for better caching
          'design-system-atoms': ['./src/components/atoms/index.ts'],
          'design-system-molecules': ['./src/components/molecules/index.ts'],
          'design-system-organisms': ['./src/components/organisms/index.ts'],
        }
      }
    }
  }
})
