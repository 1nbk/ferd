<template>
  <NuxtLink :to="`/properties/${property.id}`" class="block h-full group">
    <div class="bg-white rounded-2xl overflow-hidden border border-bg-secondary transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
      <div class="relative h-64 overflow-hidden bg-bg-secondary">
        <img
          :src="property.images[0]"
          :alt="property.title"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
        <button class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm hover:bg-white text-text-secondary hover:text-accent transition-all duration-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
        <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
          <svg class="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
          <span class="text-sm font-bold text-text-primary">{{ property.rating || 0 }}</span>
        </div>
      </div>
      
      <div class="p-6 flex-1 flex flex-col">
        <div class="mb-4">
          <h3 class="text-xl font-serif font-bold text-text-primary mb-1 line-clamp-1 group-hover:text-accent transition-colors duration-300">{{ property.title }}</h3>
          <div class="flex items-center text-text-secondary text-sm">
            <svg class="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span class="truncate">{{ property.location }}</span>
          </div>
        </div>
        
        <div class="flex items-center justify-between mt-auto pt-4 border-t border-bg-secondary/50">
          <div class="flex items-center space-x-4 text-sm text-text-secondary">
            <span class="flex items-center" title="Bedrooms">
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              {{ property.bedrooms }}
            </span>
            <span class="flex items-center" title="Guests">
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              {{ property.guests }}
            </span>
          </div>
          
          <div class="text-right">
            <span class="text-xl font-bold text-text-primary">${{ property.price }}</span>
            <span class="text-xs text-text-secondary block">/night</span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Property } from '~/types'

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
