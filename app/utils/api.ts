import type { Property } from './properties'

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  properties?: T[]
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Properties API
export async function fetchProperties(params?: {
  search?: string
  type?: string
  maxPrice?: number
  bedrooms?: number
  guests?: number
  page?: number
  limit?: number
}): Promise<PaginatedResponse<Property>> {
  const queryParams = new URLSearchParams()
  if (params?.search) queryParams.append('search', params.search)
  if (params?.type) queryParams.append('type', params.type)
  if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString())
  if (params?.bedrooms) queryParams.append('bedrooms', params.bedrooms.toString())
  if (params?.guests) queryParams.append('guests', params.guests.toString())
  if (params?.page) queryParams.append('page', params.page.toString())
  if (params?.limit) queryParams.append('limit', params.limit.toString())

  const response = await $fetch<PaginatedResponse<Property>>(`/api/properties?${queryParams.toString()}`)
  return response
}

export async function fetchProperty(id: string): Promise<Property & {
  reviews?: any[]
  reviewsCount?: number
  isFavorited?: boolean
  host?: any
}> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  }

  if (process.client) {
    const token = localStorage.getItem('auth_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const response = await $fetch<Property & {
    reviews?: any[]
    reviewsCount?: number
    isFavorited?: boolean
    host?: any
  }>(`/api/properties/${id}`, {
    headers
  })
  return response
}

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  }

  if (process.client) {
    const token = localStorage.getItem('auth_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  return headers
}

export async function createProperty(property: Partial<Property>): Promise<Property> {
  const headers = getAuthHeaders()

  const response = await $fetch<Property>('/api/properties', {
    method: 'POST',
    headers,
    body: property
  })
  return response
}

export async function updateProperty(id: string, property: Partial<Property>): Promise<Property> {
  const headers = getAuthHeaders()

  const response = await $fetch<Property>(`/api/properties/${id}`, {
    method: 'PUT',
    headers,
    body: property
  })
  return response
}

export async function deleteProperty(id: string): Promise<void> {
  const headers = getAuthHeaders()

  await $fetch(`/api/properties/${id}`, {
    method: 'DELETE',
    headers
  })
}

// Bookings API
export async function createBooking(booking: {
  propertyId: string
  checkIn: string
  checkOut: string
  guests: number
}): Promise<any> {
  const headers = getAuthHeaders()

  const response = await $fetch('/api/bookings', {
    method: 'POST',
    headers,
    body: booking
  })
  return response
}

export async function fetchBookings(): Promise<any[]> {
  const headers = getAuthHeaders()

  const response = await $fetch<any[]>('/api/bookings', {
    headers
  })
  return response
}

// Favorites API
export async function addFavorite(propertyId: string): Promise<any> {
  const headers = getAuthHeaders()

  const response = await $fetch('/api/favorites', {
    method: 'POST',
    headers,
    body: { propertyId }
  })
  return response
}

export async function removeFavorite(propertyId: string): Promise<void> {
  const headers = getAuthHeaders()

  await $fetch(`/api/favorites/property/${propertyId}`, {
    method: 'DELETE',
    headers
  })
}

export async function fetchFavorites(): Promise<any[]> {
  const headers = getAuthHeaders()

  const response = await $fetch<any[]>('/api/favorites', {
    headers
  })
  return response
}

// Reviews API
export async function createReview(propertyId: string, review: {
  rating: number
  comment?: string
}): Promise<any> {
  const headers = getAuthHeaders()

  const response = await $fetch(`/api/properties/${propertyId}/reviews`, {
    method: 'POST',
    headers,
    body: review
  })
  return response
}

export async function fetchReviews(propertyId: string): Promise<any[]> {
  const response = await $fetch<any[]>(`/api/properties/${propertyId}/reviews`)
  return response
}

// User API
export async function fetchUser(): Promise<any> {
  const headers = getAuthHeaders()

  const response = await $fetch<any>('/api/users/me', {
    headers
  })
  return response
}

export async function updateUser(user: {
  name?: string
  picture?: string
}): Promise<any> {
  const headers = getAuthHeaders()

  const response = await $fetch<any>('/api/users/me', {
    method: 'PUT',
    headers,
    body: user
  })
  return response
}

// Cars API
export async function fetchCars(params?: {
  search?: string
  type?: string
  maxPrice?: number
  minPrice?: number
  seats?: number
  transmission?: string
  page?: number
  limit?: number
}): Promise<any> {
  const queryParams = new URLSearchParams()
  if (params?.search) queryParams.append('search', params.search)
  if (params?.type) queryParams.append('type', params.type)
  if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString())
  if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString())
  if (params?.seats) queryParams.append('seats', params.seats.toString())
  if (params?.transmission) queryParams.append('transmission', params.transmission)
  if (params?.page) queryParams.append('page', params.page.toString())
  if (params?.limit) queryParams.append('limit', params.limit.toString())

  const response = await $fetch(`/api/cars?${queryParams.toString()}`)
  return response
}

export async function fetchCar(id: string): Promise<any> {
  const response = await $fetch(`/api/cars/${id}`)
  return response
}
