<template>
  <div class="w-full">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
      <div class="md:col-span-2">
        <label class="block text-xs font-medium text-[#333333] mb-1">Where</label>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Destination or property name"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC1B6] focus:border-[#6EC1B6] text-[#333333]"
          @input="$emit('search', searchQuery)"
        />
      </div>
      
      <div>
        <label class="block text-xs font-medium text-[#333333] mb-1">Check-in</label>
        <input
          v-model="checkIn"
          type="date"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC1B6] focus:border-[#6EC1B6] text-[#333333]"
        />
      </div>
      
      <div>
        <label class="block text-xs font-medium text-[#333333] mb-1">Check-out</label>
        <input
          v-model="checkOut"
          type="date"
          class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC1B6] focus:border-[#6EC1B6] text-[#333333]"
        />
      </div>
      
      <div>
        <label class="block text-xs font-medium text-[#333333] mb-1">Travelers</label>
        <div class="flex">
          <select
            v-model.number="guests"
            class="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-[#6EC1B6] focus:border-[#6EC1B6] text-[#333333]"
            @change="$emit('filter', { type: selectedType, maxPrice, bedrooms, guests })"
          >
            <option :value="0">Guests</option>
            <option :value="1">1 guest</option>
            <option :value="2">2 guests</option>
            <option :value="4">4 guests</option>
            <option :value="6">6 guests</option>
            <option :value="8">8+ guests</option>
          </select>
          <button
            type="button"
            class="bg-[#6EC1B6] text-white px-6 py-3 rounded-r-md hover:bg-[#5BA89F] transition-colors duration-200 font-semibold"
            @click="$emit('filter', { type: selectedType, maxPrice, bedrooms, guests })"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
      <div>
        <label class="block text-xs font-medium text-[#333333] mb-1">Property Type</label>
        <select
          v-model="selectedType"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC1B6] focus:border-[#6EC1B6] text-sm text-[#333333]"
          @change="$emit('filter', { type: selectedType, maxPrice, bedrooms, guests })"
        >
          <option value="">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="villa">Villa</option>
        </select>
      </div>
      
      <div>
        <label class="block text-xs font-medium text-[#333333] mb-1">Max Price/night</label>
        <input
          v-model.number="maxPrice"
          type="number"
          placeholder="Any price"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC1B6] focus:border-[#6EC1B6] text-sm text-[#333333]"
          @input="$emit('filter', { type: selectedType, maxPrice, bedrooms, guests })"
        />
      </div>
      
      <div>
        <label class="block text-xs font-medium text-[#333333] mb-1">Bedrooms</label>
        <select
          v-model.number="bedrooms"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC1B6] focus:border-[#6EC1B6] text-sm text-[#333333]"
          @change="$emit('filter', { type: selectedType, maxPrice, bedrooms, guests })"
        >
          <option :value="0">Any</option>
          <option :value="1">1+</option>
          <option :value="2">2+</option>
          <option :value="3">3+</option>
          <option :value="4">4+</option>
        </select>
      </div>
      
      <div>
        <label class="block text-xs font-medium text-[#333333] mb-1">Bathrooms</label>
        <select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC1B6] focus:border-[#6EC1B6] text-sm text-[#333333]">
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const selectedType = ref('')
const maxPrice = ref(0)
const bedrooms = ref(0)
const guests = ref(0)
const checkIn = ref('')
const checkOut = ref('')

defineEmits<{
  search: [query: string]
  filter: [filters: { type: string, maxPrice: number, bedrooms: number, guests: number }]
}>()
</script>
