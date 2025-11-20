<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="text-center">
          <div v-if="loading" class="space-y-4">
            <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto"></div>
            <p class="text-text-secondary text-lg">Signing you in...</p>
          </div>
          <div v-else-if="error" class="space-y-4">
            <div class="error-icon mx-auto w-16 h-16 flex items-center justify-center">
              <svg class="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="text-red-600 text-xl mb-4 font-serif font-semibold">{{ error }}</div>
            <Button
              to="/"
              variant="primary"
              size="lg"
            >
              Return to Home
            </Button>
          </div>
          <div v-else class="space-y-4">
            <div class="success-icon mx-auto w-20 h-20 flex items-center justify-center">
              <svg class="w-20 h-20 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="text-green-600 text-2xl mb-2 font-serif font-semibold">Successfully signed in!</div>
            <p class="text-text-secondary text-lg">Redirecting you to the home page...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
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

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #F9F7F4 0%, #EAE8E4 100%);
}

.auth-container {
  width: 100%;
  max-width: 480px;
}

.auth-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 3rem 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.space-y-4 > * + * {
  margin-top: 1.5rem;
}

.success-icon,
.error-icon {
  animation: fadeInScale 0.5s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@media (max-width: 640px) {
  .auth-card {
    padding: 2rem 1.5rem;
  }
}
</style>
