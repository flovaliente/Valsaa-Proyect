import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// En desarrollo, Vite reenvía al server las llamadas a la API y las imágenes.
// Así el client y el server comparten origen y la cookie del login funciona sin configurar CORS.
const SERVER_URL = 'http://localhost:8080'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': SERVER_URL,
      '/img': SERVER_URL,
    },
  },
})
