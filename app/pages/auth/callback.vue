<template>
  <div class="min-h-screen flex items-center justify-center bg-[#E7E4DC]">
    <div class="text-center">
      <div v-if="loading" class="space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7A8B74] mx-auto"></div>
        <p class="text-[#3B3029]">Signing you in...</p>
      </div>
      <div v-else-if="error" class="space-y-4">
        <div class="text-red-600 text-xl mb-4">{{ error }}</div>
        <NuxtLink
          to="/"
          class="inline-block px-6 py-2 bg-[#7A8B74] text-white rounded-md hover:bg-[#6A7B64] transition-colors duration-200"
        >
          Return to Home
        </NuxtLink>
      </div>
      <div v-else class="space-y-4">
        <div class="flex items-center justify-center mb-4">
          <svg class="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="text-green-600 text-xl mb-4 font-semibold">Successfully signed in!</div>
        <p class="text-[#3B3029] mb-4">Redirecting you to the home page...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { setUser } = useAuth()
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    // Get the authorization code from the URL
    const code = route.query.code as string
    const state = route.query.state as string
    const authError = route.query.error as string
    
    // Check for OAuth errors
    if (authError) {
      error.value = `Authentication error: ${authError}`
      loading.value = false
      return
    }
    
    if (!code) {
      error.value = 'No authorization code received'
      loading.value = false
      return
    }

    // Verify state (CSRF protection)
    if (process.client) {
      const storedState = sessionStorage.getItem('oauth_state')
      if (state && storedState && state !== storedState) {
        error.value = 'Invalid state parameter. Please try again.'
        loading.value = false
        return
      }
      if (storedState) {
        sessionStorage.removeItem('oauth_state')
      }
    }

    // Exchange the authorization code for tokens
    const response = await $fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        code,
        state
      }
    })

    if (response.success) {
      // Store user data using the auth composable
      setUser(response.user)
      
      if (process.client) {
        // Store JWT token
        if (response.token) {
          localStorage.setItem('auth_token', response.token)
        }
      }
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      error.value = response.error || 'Authentication failed'
      loading.value = false
    }
  } catch (err: any) {
    console.error('Auth callback error:', err)
    error.value = err.message || err.data?.error || 'An error occurred during authentication'
    loading.value = false
  }
})

useHead({
  title: 'Signing In - Ferd'
})
</script>

