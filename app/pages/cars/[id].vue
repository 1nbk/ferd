<template>
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-bg-primary">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
      <p class="text-text-secondary mt-4">Loading car details...</p>
    </div>
  </div>

  <div v-else-if="error" class="container mx-auto px-4 py-16 text-center">
    <h1 class="text-2xl sm:text-3xl font-serif font-bold mb-4 text-text-primary">Error Loading Car</h1>
    <p class="text-red-600 mb-4">{{ error }}</p>
    <Button to="/cars" variant="primary">Return to fleet</Button>
  </div>

  <div v-else-if="car" class="pb-16 bg-bg-primary">
    <!-- Car Header -->
    <div class="relative h-[500px] sm:h-[600px] overflow-hidden">
      <img
        :src="car.images[0]"
        :alt="`${car.make} ${car.model}`"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      <div class="absolute top-6 left-6 z-10">
        <Button
          to="/cars"
          variant="ghost"
          class="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
        >
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to fleet
          </div>
        </Button>
      </div>
      <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-12 text-white">
        <div class="container mx-auto">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight">
            {{ car.make }} {{ car.model }}
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-lg">
            <span class="bg-accent px-3 py-1 rounded-full font-bold text-sm">{{ car.year }}</span>
            <span class="capitalize">{{ car.type }}</span>
            <span class="text-white/40">|</span>
            <span>${{ car.price }}/day</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-12">
          <!-- Specs -->
          <div class="bg-white rounded-2xl shadow-sm p-8 border border-bg-secondary">
            <h2 class="text-2xl sm:text-3xl font-serif font-bold mb-8 text-text-primary">Specifications</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="text-center p-4 bg-bg-primary rounded-xl">
                <div class="text-text-secondary text-xs uppercase tracking-wider mb-2">Transmission</div>
                <div class="font-bold text-lg capitalize text-text-primary">{{ car.transmission }}</div>
              </div>
              <div class="text-center p-4 bg-bg-primary rounded-xl">
                <div class="text-text-secondary text-xs uppercase tracking-wider mb-2">Seats</div>
                <div class="font-bold text-lg text-text-primary">{{ car.seats }}</div>
              </div>
              <div class="text-center p-4 bg-bg-primary rounded-xl">
                <div class="text-text-secondary text-xs uppercase tracking-wider mb-2">Type</div>
                <div class="font-bold text-lg capitalize text-text-primary">{{ car.type }}</div>
              </div>
              <div class="text-center p-4 bg-bg-primary rounded-xl">
                <div class="text-text-secondary text-xs uppercase tracking-wider mb-2">Year</div>
                <div class="font-bold text-lg text-text-primary">{{ car.year }}</div>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="bg-white rounded-2xl shadow-sm p-8 border border-bg-secondary">
            <h2 class="text-2xl sm:text-3xl font-serif font-bold mb-6 text-text-primary">Features</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="feature in car.features"
                :key="feature"
                class="flex items-center text-text-secondary"
              >
                <div class="w-8 h-8 rounded-full bg-bg-primary flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span>{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Image Gallery -->
          <div class="bg-white rounded-2xl shadow-sm p-8 border border-bg-secondary">
            <h2 class="text-2xl sm:text-3xl font-serif font-bold mb-6 text-text-primary">Gallery</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img
                v-for="(image, index) in car.images"
                :key="index"
                :src="image"
                :alt="`${car.make} ${car.model} - Image ${index + 1}`"
                class="w-full h-48 sm:h-56 object-cover rounded-xl cursor-pointer hover:opacity-90 transition duration-300"
                @click="openImageGallery(index)"
              />
            </div>
          </div>
        </div>

        <!-- Sidebar - Booking -->
        <div class="lg:col-span-1">
          <div class="bg-white border border-bg-secondary rounded-2xl shadow-lg p-6 lg:sticky lg:top-24">
            <div class="mb-6">
              <div class="flex items-baseline mb-3">
                <span class="text-3xl font-serif font-bold text-text-primary">${{ car.price }}</span>
                <span class="text-lg text-text-secondary ml-1">/day</span>
              </div>
              <p class="text-sm text-text-secondary">Free cancellation up to 24h before pickup</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Pick-up Date</label>
                  <input
                    v-model="pickupDate"
                    type="date"
                    required
                    class="w-full px-3 py-2.5 bg-bg-primary border-none rounded-lg focus:ring-2 focus:ring-accent text-sm text-text-primary"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Drop-off Date</label>
                  <input
                    v-model="dropoffDate"
                    type="date"
                    required
                    class="w-full px-3 py-2.5 bg-bg-primary border-none rounded-lg focus:ring-2 focus:ring-accent text-sm text-text-primary"
                  />
                </div>
              </div>

              <div v-if="days > 0" class="pt-4 border-t border-bg-secondary space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-text-secondary">${{ car.price }} × {{ days }} days</span>
                  <span class="font-medium text-text-primary">${{ car.price * days }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-text-secondary">Insurance</span>
                  <span class="font-medium text-text-primary">$50</span>
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
                Book This Car
              </Button>

              <p class="text-xs text-text-secondary text-center mt-3">
                You won't be charged yet
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchCar } from '~/utils/api'
import Button from '~/components/ui/Button.vue'

const route = useRoute()
const car = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const pickupDate = ref('')
const dropoffDate = ref('')

const days = computed(() => {
  if (!pickupDate.value || !dropoffDate.value) return 0
  const start = new Date(pickupDate.value)
  const end = new Date(dropoffDate.value)
  const diffTime = end.getTime() - start.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
})

const total = computed(() => {
  return (car.value?.price * days.value) + 50
})

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    const data = await fetchCar(route.params.id as string)
    car.value = data
  } catch (err: any) {
    error.value = err.message || 'Failed to load car'
    console.error('Error loading car:', err)
  } finally {
    loading.value = false
  }
})

const openImageGallery = (index: number) => {
  alert(`Viewing image ${index + 1}`)
}

const handleSubmit = () => {
  alert(`Booking request sent for ${car.value.make} ${car.value.model}!\n\nPickup: ${pickupDate.value}\nDropoff: ${dropoffDate.value}\nTotal: $${total.value}`)
}

useHead({
  title: computed(() => car.value ? `${car.value.make} ${car.value.model} - Ferd` : 'Car Not Found')
})
</script>
