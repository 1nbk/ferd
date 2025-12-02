<template>
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-bg-primary">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
      <p class="text-text-secondary mt-4">Loading property...</p>
    </div>
  </div>

  <div v-else-if="error" class="container mx-auto px-4 py-16 text-center">
    <h1 class="text-2xl sm:text-3xl font-serif font-bold mb-4 text-text-primary">Error Loading Property</h1>
    <p class="text-red-600 mb-4">{{ error }}</p>
    <NuxtLink to="/" class="text-accent hover:text-text-primary font-semibold transition-colors">
      Return to search
    </NuxtLink>
  </div>

  <div v-else-if="property" class="pb-16 bg-bg-primary">
    <!-- Property Header -->
    <div class="relative h-[500px] sm:h-[600px] overflow-hidden">
      <img
        :src="property.images[0]"
        :alt="property.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      <div class="absolute top-6 left-6 z-10">
        <NuxtLink
          to="/"
          class="inline-flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white transition-all duration-300 group text-text-primary font-medium text-sm shadow-lg"
        >
          <svg class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to search
        </NuxtLink>
      </div>
      <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-12 text-white">
        <div class="container mx-auto">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight">{{ property.title }}</h1>
          <div class="flex flex-wrap items-center gap-4 text-sm sm:text-base">
            <div class="flex items-center bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 text-accent fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span class="font-bold">{{ property.rating || 0 }}</span>
            </div>
            <span class="text-white/80">{{ property.reviewsCount || 0 }} reviews</span>
            <span class="text-white/40">|</span>
            <div class="flex items-center text-white/90">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{{ property.location }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-12">
          <!-- Property Info -->
          <div class="bg-white rounded-2xl shadow-sm p-8 border border-bg-secondary">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-bg-secondary">
              <div>
                <div class="text-text-secondary text-xs uppercase tracking-wider mb-2">Type</div>
                <div class="font-serif font-semibold text-lg capitalize text-text-primary">{{ property.type }}</div>
              </div>
              <div>
                <div class="text-text-secondary text-xs uppercase tracking-wider mb-2">Bedrooms</div>
                <div class="font-serif font-semibold text-lg text-text-primary">{{ property.bedrooms }}</div>
              </div>
              <div>
                <div class="text-text-secondary text-xs uppercase tracking-wider mb-2">Bathrooms</div>
                <div class="font-serif font-semibold text-lg text-text-primary">{{ property.bathrooms }}</div>
              </div>
              <div>
                <div class="text-text-secondary text-xs uppercase tracking-wider mb-2">Sleeps</div>
                <div class="font-serif font-semibold text-lg text-text-primary">{{ property.guests }}</div>
              </div>
            </div>
            <h2 class="text-2xl sm:text-3xl font-serif font-bold mb-6 text-text-primary">About this stay</h2>
            <p class="text-text-secondary leading-relaxed text-lg">{{ property.description }}</p>
          </div>

          <!-- Image Gallery -->
          <div class="bg-white rounded-2xl shadow-sm p-8 border border-bg-secondary">
            <h2 class="text-2xl sm:text-3xl font-serif font-bold mb-6 text-text-primary">Photos</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img
                v-for="(image, index) in property.images"
                :key="index"
                :src="image"
                :alt="`${property.title} - Image ${index + 1}`"
                class="w-full h-48 sm:h-56 object-cover rounded-xl cursor-pointer hover:opacity-90 transition duration-300"
                @click="openImageGallery(index)"
              />
            </div>
          </div>

          <!-- Amenities -->
          <div class="bg-white rounded-2xl shadow-sm p-8 border border-bg-secondary">
            <h2 class="text-2xl sm:text-3xl font-serif font-bold mb-6 text-text-primary">Amenities</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="amenity in property.amenities"
                :key="amenity"
                class="flex items-center text-text-secondary"
              >
                <div class="w-8 h-8 rounded-full bg-bg-primary flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span>{{ amenity }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar - Booking Form -->
        <div class="lg:col-span-1">
          <BookingForm :property="property" />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container mx-auto px-4 py-16 text-center">
    <h1 class="text-2xl sm:text-3xl font-serif font-bold mb-4 text-text-primary">Vacation Rental Not Found</h1>
    <NuxtLink to="/" class="text-accent hover:text-text-primary font-semibold transition-colors">
      Return to search
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchProperty } from '~/utils/api'
import type { Property } from '~/types'

const route = useRoute()
const property = ref<(Property & { 
  reviews?: any[]
  reviewsCount?: number
  isFavorited?: boolean
  host?: any
}) | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    const data = await fetchProperty(route.params.id as string)
    property.value = data
  } catch (err: any) {
    error.value = err.message || 'Failed to load property'
    console.error('Error loading property:', err)
  } finally {
    loading.value = false
  }
})

const openImageGallery = (index: number) => {
  // Simple image gallery - in a real app, you'd use a modal
  if (property.value) {
    alert(`Viewing image ${index + 1} of ${property.value.images.length}`)
  }
}

useHead({
  title: property.value ? `${property.value.title} - Ferd` : 'Vacation Rental Not Found',
  meta: [
    {
      name: 'description',
      content: property.value ? property.value.description : 'Vacation rental not found'
    }
  ]
})
</script>
