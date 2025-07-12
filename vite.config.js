import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Set frontend to run on port 3001
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Vercel dev server default port
        changeOrigin: true,
      },
    },
  },
})
