<template>
  <div class="bg-white rounded-2xl overflow-hidden border border-bg-secondary transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group">
    <!-- Image Container -->
    <div class="relative h-64 bg-bg-secondary overflow-hidden">
      <img 
        :src="car.images[0]" 
        :alt="`${car.make} ${car.model}`"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
      
      <!-- Price Badge -->
      <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
        <span class="font-bold text-text-primary">${{ car.price }}</span>
        <span class="text-xs text-text-secondary">/day</span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <div class="flex justify-between items-start mb-2">
        <div>
          <h3 class="font-serif font-bold text-xl text-text-primary group-hover:text-accent transition-colors duration-300">
            {{ car.make }} {{ car.model }}
          </h3>
          <p class="text-text-secondary text-sm">{{ car.year }} • {{ car.type }}</p>
        </div>
      </div>

      <!-- Specs -->
      <div class="flex items-center gap-4 mt-4 pt-4 border-t border-bg-secondary text-sm text-text-secondary">
        <div class="flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{{ car.seats }} Seats</span>
        </div>
        <div class="flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span class="capitalize">{{ car.transmission }}</span>
        </div>
      </div>

      <!-- Action -->
      <div class="mt-4">
        <NuxtLink 
          :to="`/cars/${car.id}`"
          class="block w-full text-center py-2 rounded-full border border-text-primary text-text-primary font-medium hover:bg-text-primary hover:text-white transition-all duration-300"
        >
          View Details
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  car: {
    id: string
    make: string
    model: string
    year: number
    price: number
    type: string
    seats: number
    transmission: string
    images: string[]
  }
}>()
</script>
