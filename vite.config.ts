/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/disney-stars/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    pool: 'forks',
  },
  plugins: [react(), tailwindcss()],
  server: {
    // Proxy in case Disney API has CORS issues.
    // Switch BASE_URL in src/api/disneyApi.ts to '/disney-api' to activate.
    proxy: {
      '/disney-api': {
        target: 'https://api.disneyapi.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/disney-api/, ''),
      },
    },
  },
})
