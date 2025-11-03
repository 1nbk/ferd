<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="flex items-center">
            <svg class="w-10 h-10 text-[#0071B6]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            <span class="text-2xl font-bold text-[#0071B6] ml-2">Vrbo</span>
          </div>
        </NuxtLink>
        
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/" class="text-gray-700 hover:text-[#0071B6] transition-colors duration-200 font-medium text-sm">
            Vacation Rentals
          </NuxtLink>
          <NuxtLink to="#properties" class="text-gray-700 hover:text-[#0071B6] transition-colors duration-200 font-medium text-sm">
            Browse
          </NuxtLink>
          <button class="text-gray-700 hover:text-[#0071B6] transition-colors duration-200 font-medium text-sm">
            Sign In
          </button>
          <button class="bg-[#0071B6] text-white px-4 py-2 rounded-md hover:bg-[#005a8f] transition-colors duration-200 font-medium text-sm">
            List Your Property
          </button>
        </div>

        <button class="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
</script>
