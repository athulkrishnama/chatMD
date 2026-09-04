import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        whatsappReader: resolve(__dirname, 'src/content/whatsappReader.ts'),
      },
      output: {
        entryFileNames: (assetInfo) => {
          return assetInfo.name === 'whatsappReader'
            ? '[name].js'
            : 'assets/[name]-[hash].js';
        },
      }
    }
  }
})
