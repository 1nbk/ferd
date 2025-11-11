<template>
  <header class="bg-white border-b border-[#F9F6F1] sticky top-0 z-50">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="flex items-center">
            <svg class="w-10 h-10 text-[#7A8B74]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            <span class="text-2xl font-bold text-[#7A8B74] ml-2">Ferd</span>
          </div>
        </NuxtLink>
        
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/" class="text-[#3B3029] hover:text-[#7A8B74] transition-colors duration-200 font-medium text-sm">
            Vacation Rentals
          </NuxtLink>
          <NuxtLink to="#properties" class="text-[#3B3029] hover:text-[#7A8B74] transition-colors duration-200 font-medium text-sm">
            Browse
          </NuxtLink>
          <template v-if="isAuthenticated">
            <div class="flex items-center space-x-3">
              <img 
                v-if="user?.picture" 
                :src="user.picture" 
                :alt="user.name"
                class="w-8 h-8 rounded-full"
              />
              <span class="text-[#3B3029] font-medium text-sm">{{ user?.name }}</span>
              <button 
                @click="signOut"
                class="text-[#3B3029] hover:text-[#7A8B74] transition-colors duration-200 font-medium text-sm"
              >
                Sign Out
              </button>
            </div>
          </template>
          <template v-else>
            <button 
              @click="signInWithGoogle"
              class="text-[#3B3029] hover:text-[#7A8B74] transition-colors duration-200 font-medium text-sm"
            >
              Sign In
            </button>
          </template>
          <button class="bg-[#7A8B74] text-white px-4 py-2 rounded-md hover:bg-[#6A7B64] transition-colors duration-200 font-medium text-sm">
            List Your Property
          </button>
        </div>

        <button class="md:hidden text-[#3B3029] p-2 hover:bg-[#F9F6F1] rounded-lg transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
const { user, isAuthenticated, signInWithGoogle, signOut } = useAuth()
</script>
