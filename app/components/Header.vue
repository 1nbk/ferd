<script setup>
import Button from './ui/Button.vue'
const { user, isAuthenticated, signOut } = useAuth()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="bg-bg-primary border-b border-bg-secondary sticky top-0 z-50 transition-colors duration-300">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <NuxtLink to="/" class="flex items-center space-x-2 group">
          <div class="flex items-center">
            <span class="text-3xl font-serif font-bold text-text-primary group-hover:text-accent transition-colors duration-300">Ferd</span>
          </div>
        </NuxtLink>
        
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-text-secondary hover:text-accent transition-colors duration-200 font-medium text-sm uppercase tracking-wide">
            Vacation Rentals
          </NuxtLink>
          <NuxtLink to="/#properties" class="text-text-secondary hover:text-accent transition-colors duration-200 font-medium text-sm uppercase tracking-wide">
            Browse
          </NuxtLink>
          <NuxtLink to="/cars" class="text-text-secondary hover:text-accent transition-colors duration-200 font-medium text-sm uppercase tracking-wide">
            Car Rentals
          </NuxtLink>
          <template v-if="isAuthenticated">
            <div class="flex items-center space-x-4">
              <img 
                v-if="user?.picture" 
                :src="user.picture" 
                :alt="user.name"
                class="w-8 h-8 rounded-full border border-bg-secondary"
              />
              <span class="text-text-primary font-medium text-sm">{{ user?.name }}</span>
              <Button 
                variant="ghost"
                size="sm"
                @click="signOut"
              >
                Sign Out
              </Button>
            </div>
          </template>
          <template v-else>
            <Button 
              to="/auth/signin"
              variant="ghost"
              size="sm"
            >
              Sign In
            </Button>
          </template>
          <Button variant="primary" size="sm">
            List Your Property
          </Button>
        </div>

        <button 
          @click="toggleMobileMenu"
          class="md:hidden text-text-primary p-2 hover:bg-bg-secondary rounded-lg transition"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              v-if="!mobileMenuOpen"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16" 
            />
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition name="slide">
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden bg-bg-primary border-t border-bg-secondary"
      >
        <div class="container mx-auto px-4 py-6 space-y-4">
          <NuxtLink 
            to="/" 
            @click="closeMobileMenu"
            class="block text-text-secondary hover:text-accent transition-colors duration-200 font-medium text-sm uppercase tracking-wide py-2"
          >
            Vacation Rentals
          </NuxtLink>
          <NuxtLink 
            to="/#properties" 
            @click="closeMobileMenu"
            class="block text-text-secondary hover:text-accent transition-colors duration-200 font-medium text-sm uppercase tracking-wide py-2"
          >
            Browse
          </NuxtLink>
          <NuxtLink 
            to="/cars" 
            @click="closeMobileMenu"
            class="block text-text-secondary hover:text-accent transition-colors duration-200 font-medium text-sm uppercase tracking-wide py-2"
          >
            Car Rentals
          </NuxtLink>
          
          <div class="border-t border-bg-secondary pt-4 space-y-3">
            <template v-if="isAuthenticated">
              <div class="flex items-center space-x-3 pb-3">
                <img 
                  v-if="user?.picture" 
                  :src="user.picture" 
                  :alt="user.name"
                  class="w-10 h-10 rounded-full border border-bg-secondary"
                />
                <span class="text-text-primary font-medium">{{ user?.name }}</span>
              </div>
              <Button 
                variant="ghost"
                size="md"
                @click="signOut"
                block
              >
                Sign Out
              </Button>
            </template>
            <template v-else>
              <Button 
                to="/auth/signin"
                variant="ghost"
                size="md"
                @click="closeMobileMenu"
                block
              >
                Sign In
              </Button>
            </template>
            <Button 
              variant="primary" 
              size="md"
              block
            >
              List Your Property
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
