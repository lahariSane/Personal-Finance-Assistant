import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  optimizeDeps: {
    exclude: ["pdfjs-dist"]  // ⬅️ Tell Vite not to optimize this
  }
})