<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <NuxtLink to="/" class="logo-link">
            <span class="logo-text">Ferd</span>
          </NuxtLink>
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Start your journey with us</p>
        </div>

        <div v-if="authError" class="error-alert">
          {{ authError }}
        </div>

        <form @submit.prevent="handleEmailSignUp" class="auth-form">
          <Input
            v-model="name"
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            :error="errors.name"
            required
          />

          <Input
            v-model="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            :error="errors.email"
            required
          />
          
          <Input
            v-model="password"
            type="password"
            label="Password"
            placeholder="Create a password (min. 6 characters)"
            :error="errors.password"
            required
          />

          <Input
            v-model="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            :error="errors.confirmPassword"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            :disabled="loading"
            block
          >
            {{ loading ? 'Creating Account...' : 'Sign Up with Email' }}
          </Button>
        </form>

        <div class="divider">
          <span>or</span>
        </div>

        <Button
          type="button"
          @click="handleGoogleSignIn"
          variant="outline"
          size="lg"
          block
        >
          <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </Button>

        <p class="auth-footer">
          Already have an account? 
          <NuxtLink to="/auth/signin" class="auth-link">Sign in</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import Input from '~/components/ui/Input.vue'

const { signUpWithEmail, signInWithGoogle, error: authError, isLoading, clearError } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validateForm = () => {
  errors.value = { name: '', email: '', password: '', confirmPassword: '' }
  let isValid = true

  if (!name.value) {
    errors.value.name = 'Name is required'
    isValid = false
  }

  if (!email.value) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Invalid email format'
    isValid = false
  }

  if (!password.value) {
    errors.value.password = 'Password is required'
    isValid = false
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    isValid = false
  }

  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Please confirm your password'
    isValid = false
  } else if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  return isValid
}

const handleEmailSignUp = async () => {
  clearError()
  
  if (!validateForm()) {
    return
  }

  loading.value = true
  await signUpWithEmail(name.value, email.value, password.value)
  loading.value = false
}

const handleGoogleSignIn = () => {
  signInWithGoogle()
}

useHead({
  title: 'Sign Up - Ferd'
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

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-link {
  display: inline-block;
  margin-bottom: 1.5rem;
}

.logo-text {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-accent);
  text-decoration: none;
}

.auth-title {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.auth-subtitle {
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.error-alert {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  font-family: var(--font-sans);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.divider {
  position: relative;
  text-align: center;
  margin: 2rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background-color: var(--color-bg-secondary);
}

.divider span {
  position: relative;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0 1rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-family: var(--font-sans);
}

.google-icon {
  margin-right: 0.75rem;
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.auth-link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.auth-link:hover {
  color: #c27940;
  text-decoration: underline;
}

@media (max-width: 640px) {
  .auth-card {
    padding: 2rem 1.5rem;
  }

  .auth-title {
    font-size: 1.75rem;
  }
}
</style>
