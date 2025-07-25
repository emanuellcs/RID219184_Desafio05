import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Set frontend to run on port 3001
    proxy: {
      '/api': 'http://localhost:3002',
    },
  },
})
