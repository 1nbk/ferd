import { ref, computed, readonly } from 'vue'

interface User {
  id: string
  name: string
  email: string
  picture?: string
  role?: string
}

const user = ref<User | null>(null)
const isAuthenticated = computed(() => !!user.value)

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

  return {
    user: readonly(user),
    isAuthenticated,
    signInWithGoogle,
    signOut,
    setUser,
    getAuthToken,
    getAuthHeaders
  }
}
