import { ref, computed, readonly } from 'vue'

interface User {
  id: string
  name: string
  email: string
  picture?: string
  role?: string
}

interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
}

const user = ref<User | null>(null)
const isAuthenticated = computed(() => !!user.value)
const isLoading = ref(false)
const error = ref<string>('')

// Load user from localStorage on client side
if (process.client) {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (e) {
      console.error('Error parsing user data:', e)
    }
  }
}

export const useAuth = () => {
  const signInWithGoogle = () => {
    if (process.client) {
      try {
        const config = useRuntimeConfig()
        const clientId = config.public.googleClientId

        if (!clientId) {
          console.error('Google Client ID is not configured. Please check your .env file.')
          alert('Google Sign-In is not configured. Please contact the administrator.')
          return
        }

        // Validate Client ID format (basic check)
        if (!clientId.includes('.apps.googleusercontent.com')) {
          console.error('Invalid Google Client ID format. It should end with .apps.googleusercontent.com')
          alert('Invalid Google Client ID configuration. Please check your .env file.')
          return
        }

        const redirectUri = `${window.location.origin}/auth/callback`
        const scope = 'openid email profile'
        const responseType = 'code'
        const state = Math.random().toString(36).substring(7) + Date.now().toString(36) // Enhanced state for CSRF protection

        // Store state for verification
        sessionStorage.setItem('oauth_state', state)

        // Build Google OAuth URL
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
          `client_id=${encodeURIComponent(clientId)}&` +
          `redirect_uri=${encodeURIComponent(redirectUri)}&` +
          `response_type=${responseType}&` +
          `scope=${encodeURIComponent(scope)}&` +
          `state=${encodeURIComponent(state)}&` +
          `access_type=offline&` +
          `prompt=consent`

        // Redirect to Google OAuth
        window.location.href = authUrl
      } catch (error) {
        console.error('Error initiating Google Sign-In:', error)
        alert('An error occurred while signing in. Please try again.')
      }
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    if (!process.client) return

    isLoading.value = true
    error.value = ''

    try {
      const response = await $fetch<AuthResponse>('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          email,
          password
        }
      })

      if (response.success && response.user) {
        setUser(response.user)

        if (response.token) {
          localStorage.setItem('auth_token', response.token)
        }

        // Redirect to home page
        navigateTo('/')
      } else {
        error.value = response.error || 'Sign in failed'
      }
    } catch (err: any) {
      console.error('Email sign in error:', err)
      error.value = err.data?.statusMessage || err.message || 'An error occurred during sign in'
    } finally {
      isLoading.value = false
    }
  }

  const signUpWithEmail = async (name: string, email: string, password: string) => {
    if (!process.client) return

    isLoading.value = true
    error.value = ''

    try {
      const response = await $fetch<AuthResponse>('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          name,
          email,
          password
        }
      })

      if (response.success && response.user) {
        setUser(response.user)

        if (response.token) {
          localStorage.setItem('auth_token', response.token)
        }

        // Redirect to home page
        navigateTo('/')
      } else {
        error.value = response.error || 'Sign up failed'
      }
    } catch (err: any) {
      console.error('Email sign up error:', err)
      error.value = err.data?.statusMessage || err.message || 'An error occurred during sign up'
    } finally {
      isLoading.value = false
    }
  }

  const signOut = () => {
    if (process.client) {
      user.value = null
      localStorage.removeItem('user')
      localStorage.removeItem('auth_token')
      sessionStorage.removeItem('oauth_state')
      // Redirect to home page
      navigateTo('/')
    }
  }

  const setUser = (userData: User | null) => {
    user.value = userData
    if (process.client) {
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        localStorage.removeItem('user')
      }
    }
  }

  const getAuthToken = (): string | null => {
    if (process.client) {
      return localStorage.getItem('auth_token')
    }
    return null
  }

  const getAuthHeaders = (): HeadersInit => {
    const token = getAuthToken()
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    user: readonly(user),
    isAuthenticated,
    isLoading: readonly(isLoading),
    error: readonly(error),
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    setUser,
    getAuthToken,
    getAuthHeaders,
    clearError
  }
}

