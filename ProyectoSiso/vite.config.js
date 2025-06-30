import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {  
    alias:{
      '@backend': path.resolve(__dirname, './Backend')
    }
  },
  server: {
    proxy: {
      '/Backend': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/Backend/, '')
      }
    }
  }
})
