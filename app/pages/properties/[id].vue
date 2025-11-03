<template>
  <div v-if="property" class="pb-16">
    <!-- Property Header -->
    <div class="relative h-[400px] sm:h-[500px] overflow-hidden">
      <img
        :src="property.images[0]"
        :alt="property.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div class="absolute top-4 left-4 z-10">
        <NuxtLink
          to="/"
          class="inline-flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-md hover:bg-white transition-colors duration-200 group text-gray-900 font-medium text-sm"
        >
          <svg class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to search
        </NuxtLink>
      </div>
      <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
        <div class="container mx-auto">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">{{ property.title }}</h1>
          <div class="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base">
            <div class="flex items-center">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span class="font-semibold">{{ property.rating }}</span>
            </div>
            <span class="mx-1 sm:mx-2">·</span>
            <span>{{ property.reviews }} reviews</span>
            <span class="mx-1 sm:mx-2">·</span>
            <div class="flex items-center">
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

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6 sm:space-y-8">
          <!-- Property Info -->
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-5 sm:p-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-gray-200">
              <div>
                <div class="text-gray-500 text-xs sm:text-sm mb-1">Property Type</div>
                <div class="font-semibold text-base sm:text-lg capitalize text-gray-900">{{ property.type }}</div>
              </div>
              <div>
                <div class="text-gray-500 text-xs sm:text-sm mb-1">Bedrooms</div>
                <div class="font-semibold text-base sm:text-lg text-gray-900">{{ property.bedrooms }}</div>
              </div>
              <div>
                <div class="text-gray-500 text-xs sm:text-sm mb-1">Bathrooms</div>
                <div class="font-semibold text-base sm:text-lg text-gray-900">{{ property.bathrooms }}</div>
              </div>
              <div>
                <div class="text-gray-500 text-xs sm:text-sm mb-1">Sleeps</div>
                <div class="font-semibold text-base sm:text-lg text-gray-900">{{ property.guests }}</div>
              </div>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">About this vacation rental</h2>
            <p class="text-gray-700 leading-relaxed text-sm sm:text-base">{{ property.description }}</p>
          </div>

          <!-- Image Gallery -->
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-5 sm:p-6">
            <h2 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Photos</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <img
                v-for="(image, index) in property.images"
                :key="index"
                :src="image"
                :alt="`${property.title} - Image ${index + 1}`"
                class="w-full h-40 sm:h-48 object-cover rounded-md cursor-pointer hover:opacity-90 transition border border-gray-200"
                @click="openImageGallery(index)"
              />
            </div>
          </div>

          <!-- Amenities -->
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-5 sm:p-6">
            <h2 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Amenities</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div
                v-for="amenity in property.amenities"
                :key="amenity"
                class="flex items-center text-sm sm:text-base text-gray-700"
              >
                <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[#0071B6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
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
    <h1 class="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Vacation Rental Not Found</h1>
    <NuxtLink to="/" class="text-[#0071B6] hover:text-[#005a8f] font-semibold transition-colors">
      Return to search
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { getPropertyById } from '~/utils/properties'

const route = useRoute()
const property = getPropertyById(route.params.id as string)

const openImageGallery = (index: number) => {
  // Simple image gallery - in a real app, you'd use a modal
  alert(`Viewing image ${index + 1} of ${property?.images.length}`)
}

useHead({
  title: property ? `${property.title} - Vrbo` : 'Vacation Rental Not Found',
  meta: [
    {
      name: 'description',
      content: property ? property.description : 'Vacation rental not found'
    }
  ]
})
</script>
