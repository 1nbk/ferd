<template>
  <div class="w-full">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-3">
      <div class="lg:col-span-4">
        <label class="block text-xs font-medium text-[#3B3029] mb-1">Where</label>
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Destination or property name"
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7A8B74] focus:border-[#7A8B74] text-[#3B3029] bg-gray-50"
            @input="$emit('search', searchQuery)"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>
      
      <div class="lg:col-span-3">
        <label class="block text-xs font-medium text-[#3B3029] mb-1">Check-in</label>
        <div class="relative">
          <input
            v-model="checkIn"
            type="text"
            placeholder="Add dates"
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7A8B74] focus:border-[#7A8B74] text-[#3B3029] bg-gray-50 cursor-pointer"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
      </div>
      
      <div class="lg:col-span-3">
        <label class="block text-xs font-medium text-[#3B3029] mb-1">Check-out</label>
        <div class="relative">
          <input
            v-model="checkOut"
            type="text"
            placeholder="Add dates"
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7A8B74] focus:border-[#7A8B74] text-[#3B3029] bg-gray-50 cursor-pointer"
          />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
      </div>
      
      <div class="lg:col-span-2 flex items-end">
        <button
          type="button"
          class="w-full bg-[#7A8B74] text-white px-6 py-3 rounded-xl hover:bg-[#6A7B64] transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          @click="$emit('filter', { type: selectedType, maxPrice, bedrooms, guests })"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <span>Search</span>
        </button>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
      <div>
        <label class="block text-xs font-medium text-[#3B3029] mb-1">Property Type</label>
        <select
          v-model="selectedType"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7A8B74] focus:border-[#7A8B74] text-sm text-[#3B3029]"
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
        <label class="block text-xs font-medium text-[#3B3029] mb-1">Max Price/night</label>
        <input
          v-model.number="maxPrice"
          type="number"
          placeholder="Any price"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7A8B74] focus:border-[#7A8B74] text-sm text-[#3B3029]"
          @input="$emit('filter', { type: selectedType, maxPrice, bedrooms, guests })"
        />
      </div>
      
      <div>
        <label class="block text-xs font-medium text-[#3B3029] mb-1">Bedrooms</label>
        <select
          v-model.number="bedrooms"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7A8B74] focus:border-[#7A8B74] text-sm text-[#3B3029]"
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
        <label class="block text-xs font-medium text-[#3B3029] mb-1">Bathrooms</label>
        <select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7A8B74] focus:border-[#7A8B74] text-sm text-[#3B3029]">
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
