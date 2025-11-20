<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-bg-primary pt-12 pb-24 sm:pt-16 sm:pb-32 overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="relative z-10">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-text-primary leading-tight mb-6">
              Find Your <br/>
              <span class="text-accent italic">Perfect</span> Home.
            </h1>
            <p class="text-lg sm:text-xl text-text-secondary max-w-lg mb-8 leading-relaxed">
              Discover a curated collection of luxury vacation rentals. From beachfront villas to cozy mountain cabins, find the perfect stay for your next adventure.
            </p>
            
            <!-- Search Bar Wrapper -->
            <div class="bg-white p-2 rounded-2xl shadow-xl border border-bg-secondary max-w-xl">
              <SearchBar @search="handleSearch" @filter="handleFilter" />
            </div>
          </div>
          
          <div class="relative lg:h-[600px] hidden lg:block">
            <div class="absolute inset-0 bg-accent/10 rounded-[3rem] transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80" 
              alt="Modern Home" 
              class="relative w-full h-full object-cover rounded-[3rem] shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-700"
            />
            
            <!-- Floating Reaction Card -->
            <div class="absolute bottom-12 -left-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300">
              <div class="bg-green-100 p-3 rounded-full">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <div>
                <div class="text-sm font-bold text-text-primary">4.98 Rating</div>
                <div class="text-xs text-text-secondary">Based on 2k+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Badges -->
    <section class="bg-white border-y border-bg-secondary py-8">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-8 sm:gap-16 text-text-secondary">
          <div class="flex items-center space-x-3 group">
            <div class="p-2 bg-bg-primary rounded-full group-hover:bg-accent/10 transition-colors">
              <svg class="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="font-medium">Verified Properties</span>
          </div>
          <div class="flex items-center space-x-3 group">
            <div class="p-2 bg-bg-primary rounded-full group-hover:bg-accent/10 transition-colors">
              <svg class="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="font-medium">2M+ Listings</span>
          </div>
          <div class="flex items-center space-x-3 group">
            <div class="p-2 bg-bg-primary rounded-full group-hover:bg-accent/10 transition-colors">
              <svg class="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="font-medium">Secure Payment</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Properties Section -->
    <section id="properties" class="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
        <div>
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-text-primary mb-2">
            Featured Stays
          </h2>
          <p class="text-text-secondary">Handpicked homes for your perfect getaway</p>
        </div>
        <p v-if="!loading && !error" class="text-sm font-medium text-text-secondary bg-bg-secondary px-4 py-2 rounded-full">
          {{ filteredProperties.length }} {{ filteredProperties.length === 1 ? 'rental' : 'rentals' }} found
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-24">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
        <p class="text-text-secondary mt-4">Finding the best spots...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-24">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button 
          @click="loadProperties"
          class="inline-block px-8 py-3 bg-accent text-white rounded-full hover:bg-opacity-90 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Try Again
        </button>
      </div>

      <!-- Properties Grid -->
      <div v-else-if="filteredProperties.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <PropertyCard
          v-for="property in filteredProperties"
          :key="property.id"
          :property="property"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24 bg-white rounded-3xl border border-bg-secondary">
        <div class="max-w-md mx-auto">
          <svg class="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <h3 class="text-xl font-serif font-bold text-text-primary mb-2">No matches found</h3>
          <p class="text-text-secondary mb-8">We couldn't find any properties matching your criteria. Try adjusting your filters.</p>
          <button
            @click="resetFilters"
            class="inline-block px-8 py-3 bg-text-primary text-white rounded-full hover:bg-accent font-medium transition-all duration-300"
          >
            Clear all filters
          </button>
        </div>
      </div>
    </section>

    <!-- Why Choose Section -->
    <section class="bg-bg-secondary py-24">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-text-primary mb-4">
            Why Choose Ferd?
          </h2>
          <p class="text-text-secondary text-lg">We're dedicated to providing the best vacation rental experience possible.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div class="bg-bg-primary w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-3 text-text-primary">Verified Rentals</h3>
            <p class="text-text-secondary leading-relaxed">Every rental is verified and reviewed for quality and safety to ensure your peace of mind.</p>
          </div>
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div class="bg-bg-primary w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-3 text-text-primary">Best Price Guarantee</h3>
            <p class="text-text-secondary leading-relaxed">We guarantee you're getting the best price on your vacation rental, or we'll match it.</p>
          </div>
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div class="bg-bg-primary w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif font-bold mb-3 text-text-primary">24/7 Support</h3>
            <p class="text-text-secondary leading-relaxed">Round-the-clock customer support whenever you need assistance, anywhere in the world.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchProperties } from '~/utils/api'
import type { Property } from '~/utils/properties'

const searchQuery = ref('')
const filters = ref({
  type: '',
  maxPrice: 0,
  bedrooms: 0,
  guests: 0
})

const properties = ref<Property[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const loadProperties = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetchProperties({
      search: searchQuery.value || undefined,
      type: filters.value.type || undefined,
      maxPrice: filters.value.maxPrice || undefined,
      bedrooms: filters.value.bedrooms || undefined,
      guests: filters.value.guests || undefined
    })
    properties.value = response.properties || []
  } catch (err: any) {
    error.value = err.message || 'Failed to load properties'
    console.error('Error loading properties:', err)
  } finally {
    loading.value = false
  }
}

const filteredProperties = computed(() => {
  return properties.value
})

const handleSearch = (query: string) => {
  searchQuery.value = query
  loadProperties()
}

const handleFilter = (newFilters: typeof filters.value) => {
  filters.value = { ...newFilters }
  loadProperties()
}

const resetFilters = () => {
  searchQuery.value = ''
  filters.value = {
    type: '',
    maxPrice: 0,
    bedrooms: 0,
    guests: 0
  }
  loadProperties()
}

onMounted(() => {
  loadProperties()
})
</script>
