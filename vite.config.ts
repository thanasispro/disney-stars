import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
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
