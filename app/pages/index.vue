<template>
  <div>
    <!-- Hero Section with Search -->
    <section class="relative bg-gradient-to-br from-[#0071B6] via-[#0099CC] to-[#0071B6] text-white py-12 sm:py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Book beach houses, cabins & condos
          </h1>
          <p class="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Book everything for less with the world's biggest vacation rental site
          </p>
        </div>
        
        <!-- Ferd Style Search Bar -->
        <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-2xl p-4 sm:p-6">
          <SearchBar @search="handleSearch" @filter="handleFilter" />
        </div>
      </div>
    </section>

    <!-- Trust Badges -->
    <section class="bg-gray-50 border-b border-gray-200 py-4">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-sm text-gray-600">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-[#0071B6]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="font-medium">Book with confidence</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-[#0071B6]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
            </svg>
            <span class="font-medium">2M+ vacation rentals</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-[#0071B6]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="font-medium">Secure online payment</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Properties Section -->
    <section id="properties" class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-2">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
          Vacation Rentals
        </h2>
        <p class="text-sm sm:text-base text-gray-600">
          {{ filteredProperties.length }} {{ filteredProperties.length === 1 ? 'rental' : 'rentals' }} found
        </p>
      </div>

      <div v-if="filteredProperties.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <PropertyCard
          v-for="property in filteredProperties"
          :key="property.id"
          :property="property"
        />
      </div>

      <div v-else class="text-center py-16">
        <div class="max-w-md mx-auto">
          <svg class="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <p class="text-gray-600 text-lg mb-4">No vacation rentals found matching your criteria.</p>
          <button
            @click="resetFilters"
            class="inline-block px-6 py-2 bg-[#0071B6] text-white rounded-md hover:bg-[#005a8f] font-semibold transition-colors duration-200"
          >
            Clear filters
          </button>
        </div>
      </div>
    </section>

    <!-- Why Choose Section -->
    <section class="bg-gray-50 py-12 sm:py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
          Why Choose Ferd?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-[#0071B6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Verified Rentals</h3>
            <p class="text-sm text-gray-600">Every rental is verified and reviewed for quality and safety.</p>
          </div>
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-[#0071B6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Best Price Guarantee</h3>
            <p class="text-sm text-gray-600">We guarantee you're getting the best price on your vacation rental.</p>
          </div>
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-[#0071B6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">24/7 Support</h3>
            <p class="text-sm text-gray-600">Round-the-clock customer support whenever you need assistance.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { properties, searchProperties } from '~/utils/properties'

const searchQuery = ref('')
const filters = ref({
  type: '',
  maxPrice: 0,
  bedrooms: 0,
  guests: 0
})

const filteredProperties = computed(() => {
  return searchProperties(searchQuery.value, {
    type: filters.value.type || undefined,
    maxPrice: filters.value.maxPrice || undefined,
    bedrooms: filters.value.bedrooms || undefined,
    guests: filters.value.guests || undefined
  })
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleFilter = (newFilters: typeof filters.value) => {
  filters.value = { ...newFilters }
}

const resetFilters = () => {
  searchQuery.value = ''
  filters.value = {
    type: '',
    maxPrice: 0,
    bedrooms: 0,
    guests: 0
  }
}
</script>
