import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Link to the local svg-flags package
      'svg-flags': path.resolve(__dirname, '../src/index.ts')
    }
  },
  assetsInclude: ['**/*.svg'],
  server: {
    port: 3002,
    open: true
  }
})
