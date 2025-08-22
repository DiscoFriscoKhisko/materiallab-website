import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/materiallab-website/' : '/',
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
})
