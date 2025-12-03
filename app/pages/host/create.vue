<template>
  <div class="min-h-screen bg-bg-primary py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-serif font-bold text-text-primary mb-2">List Your Property</h1>
          <p class="text-text-secondary">Share your space with the world. Fill out the details below to get started.</p>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-bg-secondary p-8">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Basic Info -->
            <div class="space-y-6">
              <h2 class="text-xl font-serif font-bold text-text-primary border-b border-bg-secondary pb-2">Basic Information</h2>
              
              <Input
                v-model="form.title"
                label="Property Title"
                placeholder="e.g. Luxury Downtown Apartment"
                required
              />

              <div class="space-y-2">
                <label class="block text-sm font-medium text-text-primary">Description</label>
                <textarea
                  v-model="form.description"
                  rows="4"
                  class="w-full px-4 py-3 rounded-xl border-2 border-bg-secondary focus:border-accent focus:ring-0 transition-colors resize-none outline-none"
                  placeholder="Describe your property..."
                  required
                ></textarea>
              </div>

              <Input
                v-model="form.location"
                label="Location"
                placeholder="e.g. New York, NY"
                required
              />
            </div>

            <!-- Details -->
            <div class="space-y-6">
              <h2 class="text-xl font-serif font-bold text-text-primary border-b border-bg-secondary pb-2">Property Details</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-text-primary">Property Type</label>
                  <select
                    v-model="form.type"
                    class="w-full px-4 py-3 rounded-xl border-2 border-bg-secondary focus:border-accent focus:ring-0 transition-colors outline-none bg-white"
                    required
                  >
                    <option value="" disabled>Select a type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-text-primary">Price per Night ($)</label>
                  <input
                    v-model.number="form.price"
                    type="number"
                    min="0"
                    class="w-full px-4 py-3 rounded-xl border-2 border-bg-secondary focus:border-accent focus:ring-0 transition-colors outline-none"
                    required
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-text-primary">Bedrooms</label>
                  <input
                    v-model.number="form.bedrooms"
                    type="number"
                    min="0"
                    class="w-full px-4 py-3 rounded-xl border-2 border-bg-secondary focus:border-accent focus:ring-0 transition-colors outline-none"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-text-primary">Bathrooms</label>
                  <input
                    v-model.number="form.bathrooms"
                    type="number"
                    min="0"
                    class="w-full px-4 py-3 rounded-xl border-2 border-bg-secondary focus:border-accent focus:ring-0 transition-colors outline-none"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-text-primary">Guests</label>
                  <input
                    v-model.number="form.guests"
                    type="number"
                    min="1"
                    class="w-full px-4 py-3 rounded-xl border-2 border-bg-secondary focus:border-accent focus:ring-0 transition-colors outline-none"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-text-primary">Area (sq ft)</label>
                  <input
                    v-model.number="form.area"
                    type="number"
                    min="0"
                    class="w-full px-4 py-3 rounded-xl border-2 border-bg-secondary focus:border-accent focus:ring-0 transition-colors outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- Amenities -->
            <div class="space-y-6">
              <h2 class="text-xl font-serif font-bold text-text-primary border-b border-bg-secondary pb-2">Amenities</h2>
              
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <label v-for="amenity in availableAmenities" :key="amenity" class="flex items-center space-x-3 cursor-pointer group">
                  <div class="relative flex items-center">
                    <input
                      type="checkbox"
                      :value="amenity"
                      v-model="form.amenities"
                      class="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-bg-secondary transition-all checked:border-accent checked:bg-accent hover:border-accent"
                    />
                    <svg
                      class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <span class="text-text-secondary group-hover:text-text-primary transition-colors">{{ amenity }}</span>
                </label>
              </div>
            </div>

            <!-- Images -->
            <div class="space-y-6">
              <h2 class="text-xl font-serif font-bold text-text-primary border-b border-bg-secondary pb-2">Images</h2>
              
              <div class="space-y-2">
                <label class="block text-sm font-medium text-text-primary">Image URLs (one per line)</label>
                <textarea
                  v-model="imageUrls"
                  rows="4"
                  class="w-full px-4 py-3 rounded-xl border-2 border-bg-secondary focus:border-accent focus:ring-0 transition-colors resize-none outline-none font-mono text-sm"
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  required
                ></textarea>
                <p class="text-xs text-text-secondary">Please provide direct links to high-quality images.</p>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
              {{ error }}
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                block
                :disabled="loading"
              >
                <span v-if="loading">Submitting...</span>
                <span v-else>Submit for Review</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { createProperty } from '~/utils/api'
import Input from '~/components/ui/Input.vue'
import Button from '~/components/ui/Button.vue'

const router = useRouter()
const { isAuthenticated } = useAuth()

// Redirect if not authenticated
if (!isAuthenticated.value) {
  router.push('/auth/signin?redirect=/host/create')
}

const loading = ref(false)
const error = ref<string | null>(null)
const imageUrls = ref('')

const availableAmenities = [
  'WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'Pool', 
  'Gym', 'Hot Tub', 'Fireplace', 'Washer/Dryer', 'Beach Access',
  'Mountain View', 'City View', 'Garden', 'Pet Friendly', 'Workspace'
]

const form = ref<{
  title: string
  description: string
  location: string
  price: number
  type: 'apartment' | 'house' | 'condo' | 'villa' | ''
  bedrooms: number
  bathrooms: number
  guests: number
  area: number
  amenities: string[]
}>({
  title: '',
  description: '',
  location: '',
  price: 0,
  type: '',
  bedrooms: 0,
  bathrooms: 0,
  guests: 1,
  area: 0,
  amenities: []
})

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null

    // Parse images
    const images = imageUrls.value
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0)

    if (images.length === 0) {
      throw new Error('Please provide at least one image URL')
    }

    await createProperty({
      ...form.value,
      type: form.value.type as 'apartment' | 'house' | 'condo' | 'villa',
      images
    })

    // Show success and redirect
    alert('Property submitted successfully! It is now pending review by an admin.')
    router.push('/')
  } catch (err: any) {
    console.error('Error creating property:', err)
    error.value = err.message || 'Failed to create property'
  } finally {
    loading.value = false
  }
}
</script>
