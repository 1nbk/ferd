// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app',
  css: ['./assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    // Private keys (only available on server-side) - will be populated from .env
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    // Public keys (exposed to client-side)
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID || '',
      siteUrl: process.env.SITE_URL || 'http://localhost:3000'
    }
  }
})
