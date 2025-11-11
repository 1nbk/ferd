export default defineNuxtPlugin(() => {
  // Suppress Vue Router warnings for API routes in development
  if (process.dev) {
    const originalWarn = console.warn
    console.warn = (...args: any[]) => {
      // Filter out Vue Router warnings for API routes
      const message = args[0]?.toString() || ''
      if (
        message.includes('Vue Router warn') &&
        message.includes('No match found for location') &&
        message.includes('/api/')
      ) {
        // Suppress this specific warning - API routes are handled by Nitro, not Vue Router
        return
      }
      // Pass through all other warnings
      originalWarn.apply(console, args)
    }
  }
})

