import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://dakota1450.github.io/loopwork/ on GitHub Pages, so the
// production build needs the /loopwork/ base. Dev stays at root.
// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/loopwork/' : '/',
}))
