import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/goit-react-hw-03-image-finder/',
  plugins: [react()],
})
