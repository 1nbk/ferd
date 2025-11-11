<template>
  <NuxtLink :to="`/properties/${property.id}`" class="block h-full">
    <div class="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-200">
      <div class="relative h-56 overflow-hidden bg-gray-200">
        <img
          :src="property.images[0]"
          :alt="property.title"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <button class="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-[#F9F6F1] transition-colors">
          <svg class="w-5 h-5 text-[#C77B57] hover:text-[#B76B47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>
      
      <div class="p-4 flex-1 flex flex-col">
        <div class="flex items-start justify-between mb-2">
          <h3 class="text-lg font-semibold text-[#3B3029] line-clamp-1 flex-1 pr-2">{{ property.title }}</h3>
          <div class="flex items-center text-[#7A8B74] flex-shrink-0">
            <svg class="w-4 h-4 fill-current mr-1" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <span class="text-sm font-semibold">{{ property.rating || 0 }}</span>
          </div>
        </div>
        
        <div class="flex items-center text-[#3B3029] text-sm mb-3">
          <svg class="w-4 h-4 mr-1.5 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="truncate text-[#3B3029]">{{ property.location }}</span>
        </div>
        
        <div class="flex items-center space-x-4 text-xs text-[#3B3029] mb-3">
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span>{{ property.bedrooms }}</span>
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>{{ property.bathrooms }}</span>
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span>{{ property.guests }}</span>
          </div>
        </div>
        
        <div class="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span class="text-lg font-bold text-[#3B3029]">${{ property.price }}</span>
            <span class="text-sm text-[#3B3029]">/night</span>
          </div>
          <span class="text-xs text-gray-500">{{ property.reviewsCount || property.reviews || 0 }} reviews</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Property } from '~/utils/properties'

defineProps<{
  property: Property
}>()
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
