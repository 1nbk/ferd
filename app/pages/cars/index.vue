<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-bg-primary pt-12 pb-24 sm:pt-16 sm:pb-32 overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="relative z-10">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-text-primary leading-tight mb-6">
              Drive Your <br/>
              <span class="text-accent italic">Dream</span> Car.
            </h1>
            <p class="text-lg sm:text-xl text-text-secondary max-w-lg mb-8 leading-relaxed">
              Explore our premium fleet of rental vehicles. From luxury sedans to spacious SUVs, find the perfect ride for your journey.
            </p>
          </div>
          
          <div class="relative lg:h-[500px] hidden lg:block">
            <div class="absolute inset-0 bg-accent/10 rounded-[3rem] transform -rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=2000&q=80" 
              alt="Luxury Car" 
              class="relative w-full h-full object-cover rounded-[3rem] shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Filters & Grid -->
    <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Filters -->
      <div class="bg-white p-6 rounded-2xl shadow-lg border border-bg-secondary mb-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Search</label>
            <input 
              v-model="filters.search" 
              type="text" 
              placeholder="Make, model..." 
              class="w-full px-4 py-2 bg-bg-primary border-none rounded-lg focus:ring-2 focus:ring-accent text-text-primary"
              @input="debouncedSearch"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Type</label>
            <select 
              v-model="filters.type" 
              class="w-full px-4 py-2 bg-bg-primary border-none rounded-lg focus:ring-2 focus:ring-accent text-text-primary appearance-none"
              @change="loadCars"
            >
              <option value="">All Types</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
              <option value="sports">Sports</option>
              <option value="convertible">Convertible</option>
              <option value="van">Van</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Max Price</label>
            <input 
              v-model.number="filters.maxPrice" 
              type="number" 
              placeholder="Any price" 
              class="w-full px-4 py-2 bg-bg-primary border-none rounded-lg focus:ring-2 focus:ring-accent text-text-primary"
              @input="debouncedSearch"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Seats</label>
            <select 
              v-model.number="filters.seats" 
              class="w-full px-4 py-2 bg-bg-primary border-none rounded-lg focus:ring-2 focus:ring-accent text-text-primary appearance-none"
              @change="loadCars"
            >
              <option :value="0">Any</option>
              <option :value="2">2+</option>
              <option :value="4">4+</option>
              <option :value="5">5+</option>
              <option :value="7">7+</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-24">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
        <p class="text-text-secondary mt-4">Loading fleet...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-24">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <Button @click="loadCars" variant="primary">Try Again</Button>
      </div>

      <!-- Cars Grid -->
      <div v-else-if="cars.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <CarCard
          v-for="car in cars"
          :key="car.id"
          :car="car"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24 bg-white rounded-3xl border border-bg-secondary">
        <div class="max-w-md mx-auto">
          <svg class="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 class="text-xl font-serif font-bold text-text-primary mb-2">No cars found</h3>
          <p class="text-text-secondary mb-8">We couldn't find any cars matching your criteria. Try adjusting your filters.</p>
          <Button @click="resetFilters" variant="outline">Clear all filters</Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchCars } from '~/utils/api'
import Button from '~/components/ui/Button.vue'
import CarCard from '~/components/CarCard.vue'

const cars = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const filters = ref({
  search: '',
  type: '',
  maxPrice: undefined as number | undefined,
  seats: 0
})

let debounceTimer: NodeJS.Timeout

const debouncedSearch = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    loadCars()
  }, 300)
}

const loadCars = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetchCars({
      search: filters.value.search || undefined,
      type: filters.value.type || undefined,
      maxPrice: filters.value.maxPrice || undefined,
      seats: filters.value.seats || undefined
    })
    cars.value = response.cars || []
  } catch (err: any) {
    error.value = err.message || 'Failed to load cars'
    console.error('Error loading cars:', err)
  } finally {
    loading.value = false
  }
}

const resetFilters = () => {
  filters.value = {
    search: '',
    type: '',
    maxPrice: undefined,
    seats: 0
  }
  loadCars()
}

onMounted(() => {
  loadCars()
})

useHead({
  title: 'Car Rentals - Ferd',
  meta: [
    { name: 'description', content: 'Browse our premium fleet of rental cars.' }
  ]
})
</script>
