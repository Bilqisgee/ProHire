import { fileURLToPath } from "url";
import path from "path";
import { defineConfig } from 'vite';
import { replace } from "react-router-dom";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    replace({
      replacements: [
        {
          from: '"use client";', to: ''
        }
      ]
    })
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          radix: ['@radix-ui/react-select', '@radix-ui/react-toast'],
        },
      },
    },
  },
});
