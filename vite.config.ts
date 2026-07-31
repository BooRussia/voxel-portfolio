import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://boorussia.github.io/voxel-portfolio/
// Local dev keeps base `/`. CI sets VITE_BASE_PATH=/voxel-portfolio/
const base = process.env.VITE_BASE_PATH || '/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
})
