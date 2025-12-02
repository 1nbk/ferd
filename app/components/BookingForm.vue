<template>
  <div class="bg-white border border-bg-secondary rounded-2xl shadow-lg p-6 lg:sticky lg:top-24">
    <div class="mb-6">
      <div class="flex items-baseline mb-3">
        <span class="text-3xl font-serif font-bold text-text-primary">${{ property.price }}</span>
        <span class="text-lg text-text-secondary ml-1">/night</span>
      </div>
      <div class="flex items-center text-text-secondary text-sm">
        <svg class="w-4 h-4 mr-1.5 text-accent fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
        <span class="font-semibold text-text-primary">{{ property.rating }}</span>
        <span class="mx-2 text-gray-300">·</span>
        <span class="text-text-secondary">{{ property.reviews }} reviews</span>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Check-in</label>
            <input
              v-model="checkIn"
              type="date"
              required
              class="w-full px-3 py-2.5 bg-bg-primary border-none rounded-lg focus:ring-2 focus:ring-accent text-sm text-text-primary"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Check-out</label>
            <input
              v-model="checkOut"
              type="date"
              required
              class="w-full px-3 py-2.5 bg-bg-primary border-none rounded-lg focus:ring-2 focus:ring-accent text-sm text-text-primary"
            />
          </div>
        </div>
        <div>
          <label class="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Travelers</label>
          <select
            v-model.number="numGuests"
            required
            class="w-full px-3 py-2.5 bg-bg-primary border-none rounded-lg focus:ring-2 focus:ring-accent text-sm text-text-primary appearance-none"
          >
            <option v-for="n in property.guests" :key="n" :value="n">{{ n }} {{ n === 1 ? 'guest' : 'guests' }}</option>
          </select>
        </div>
      </div>

      <div v-if="nights > 0" class="pt-4 border-t border-bg-secondary space-y-3">
        <div class="flex justify-between text-sm">
          <span class="text-text-secondary">${{ property.price }} × {{ nights }} {{ nights === 1 ? 'night' : 'nights' }}</span>
          <span class="font-medium text-text-primary">${{ property.price * nights }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-text-secondary">Service fee</span>
          <span class="font-medium text-text-primary">${{ Math.round(property.price * nights * 0.1) }}</span>
        </div>
        <div class="flex justify-between text-sm pt-3 border-t border-bg-secondary">
          <span class="font-serif font-bold text-text-primary">Total</span>
          <span class="font-bold text-lg text-text-primary">${{ total }}</span>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        block
        class="mt-6"
      >
        Book Now
      </Button>

      <p class="text-xs text-text-secondary text-center mt-3">
        You won't be charged yet
      </p>
      
      <div class="pt-4 border-t border-bg-secondary mt-4">
        <div class="flex items-start space-x-2 text-xs text-text-secondary">
          <svg class="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
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
import type { Property } from '~/types'
import Button from './ui/Button.vue'

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
