<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-5 sm:p-6 lg:sticky lg:top-24">
    <div class="mb-6">
      <div class="flex items-baseline mb-3">
        <span class="text-3xl font-bold text-[#333333]">${{ property.price }}</span>
        <span class="text-lg text-[#333333] ml-1">/night</span>
      </div>
      <div class="flex items-center text-[#333333] text-sm">
        <svg class="w-4 h-4 mr-1.5 text-[#6EC1B6] fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
        <span class="font-semibold text-[#333333]">{{ property.rating }}</span>
        <span class="mx-2 text-gray-400">·</span>
        <span class="text-[#333333]">{{ property.reviews }} reviews</span>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-medium text-[#333333] mb-2">Check-in</label>
          <input
            v-model="checkIn"
            type="date"
            required
            class="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC1B6] focus:border-[#6EC1B6] text-sm text-[#333333]"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-[#333333] mb-2">Check-out</label>
          <input
            v-model="checkOut"
            type="date"
            required
            class="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC1B6] focus:border-[#6EC1B6] text-sm text-[#333333]"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-[#333333] mb-2">Travelers</label>
          <select
            v-model.number="numGuests"
            required
            class="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC1B6] focus:border-[#6EC1B6] text-sm text-[#333333]"
          >
            <option v-for="n in property.guests" :key="n" :value="n">{{ n }} {{ n === 1 ? 'guest' : 'guests' }}</option>
          </select>
        </div>
      </div>

      <div v-if="nights > 0" class="pt-4 border-t border-gray-200 space-y-3">
        <div class="flex justify-between text-sm">
          <span class="text-[#333333]">${{ property.price }} × {{ nights }} {{ nights === 1 ? 'night' : 'nights' }}</span>
          <span class="font-medium text-[#333333]">${{ property.price * nights }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-[#333333]">Service fee</span>
          <span class="font-medium text-[#333333]">${{ Math.round(property.price * nights * 0.1) }}</span>
        </div>
        <div class="flex justify-between text-sm pt-3 border-t border-gray-200">
          <span class="font-semibold text-[#333333]">Total</span>
          <span class="font-bold text-lg text-[#333333]">${{ total }}</span>
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-[#6EC1B6] text-white py-3.5 rounded-md font-semibold hover:bg-[#5BA89F] transition-colors duration-200 text-sm mt-6"
      >
        Book Now
      </button>

      <p class="text-xs text-gray-500 text-center mt-3">
        You won't be charged yet
      </p>
      
      <div class="pt-4 border-t border-gray-200 mt-4">
        <div class="flex items-start space-x-2 text-xs text-[#333333]">
          <svg class="w-4 h-4 text-[#6EC1B6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span>Book with confidence. Secure online payment.</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Property } from '~/utils/properties'

const props = defineProps<{
  property: Property
}>()

const checkIn = ref('')
const checkOut = ref('')
const numGuests = ref(1)

const nights = computed(() => {
  if (!checkIn.value || !checkOut.value) return 0
  const start = new Date(checkIn.value)
  const end = new Date(checkOut.value)
  const diffTime = end.getTime() - start.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
})

const total = computed(() => {
  const base = props.property.price * nights.value
  const serviceFee = Math.round(base * 0.1)
  return base + serviceFee
})

const handleSubmit = () => {
  alert(`Booking request sent for ${props.property.title}!\n\nCheck-in: ${checkIn.value}\nCheck-out: ${checkOut.value}\nGuests: ${numGuests.value}\nTotal: $${total.value}\n\nWe'll contact you soon!`)
}
</script>
