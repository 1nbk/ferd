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
    jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
    // Public keys (exposed to client-side)
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID || '',
      siteUrl: process.env.SITE_URL || 'http://localhost:3000'
    }
  },
  routeRules: {
    // API routes are handled by the server, not Vue Router
    '/api/**': { ssr: false }
  },
  nitro: {
    // Exclude Prisma from bundling - it needs to be external
    moduleSideEffects: ['@prisma/client'],
  }
})



