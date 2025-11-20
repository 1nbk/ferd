export interface Property {
  id: string
  title: string
  description: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  guests: number
  area: number
  type: 'apartment' | 'house' | 'condo' | 'villa'
  images: string[]
  amenities: string[]
  rating: number
  reviews: number
  available: boolean
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Downtown Apartment',
    description: 'Stunning modern apartment in the heart of downtown with panoramic city views. Perfect for business travelers and vacationers.',
    location: 'Downtown, New York',
    price: 250,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    area: 1200,
    type: 'apartment',
    images: [
      '/images/modern-studio-apartment-design-with-bedroom-living-space.jpg',
      '/images/luxury-bedroom-suite-resort-high-rise-hotel-with-working-table.jpg',
      '/images/freepik__ultrarealistic-architectural-photography-of-a-mode__318.png'
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'Gym', 'Pool'],
    rating: 4.8,
    reviews: 124,
    available: true
  },
  {
    id: '2',
    title: 'Beachfront Villa',
    description: 'Beautiful beachfront villa with private pool and direct beach access. Ideal for families and groups looking for a luxury getaway.',
    location: 'Malibu, California',
    price: 850,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    area: 3500,
    type: 'villa',
    images: [
      '/images/freepik__ultrarealistic-architectural-photography-of-a-mode__318.png',
      '/images/luxury-bedroom-suite-resort-high-rise-hotel-with-working-table.jpg',
      '/images/airbnb-host-welcoming-guests.jpg'
    ],
    amenities: ['WiFi', 'Private Pool', 'Beach Access', 'Full Kitchen', 'Parking', 'Air Conditioning'],
    rating: 4.9,
    reviews: 89,
    available: true
  },
  {
    id: '3',
    title: 'Cozy Mountain Cabin',
    description: 'Rustic yet modern cabin nestled in the mountains. Perfect for a romantic getaway or small family vacation.',
    location: 'Aspen, Colorado',
    price: 180,
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    area: 900,
    type: 'house',
    images: [
      '/images/luxury-bedroom-suite-resort-high-rise-hotel-with-working-table.jpg',
      '/images/airbnb-host-welcoming-guests.jpg',
      '/images/freepik__ultrarealistic-architectural-photography-of-a-mode__318.png'
    ],
    amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Hot Tub', 'Mountain View', 'Parking'],
    rating: 4.7,
    reviews: 156,
    available: true
  },
  {
    id: '4',
    title: 'Modern City Loft',
    description: 'Stylish loft apartment in trendy neighborhood with exposed brick and high ceilings. Walking distance to restaurants and nightlife.',
    location: 'Brooklyn, New York',
    price: 220,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    area: 800,
    type: 'apartment',
    images: [
      '/images/modern-studio-apartment-design-with-bedroom-living-space.jpg',
      '/images/freepik__ultrarealistic-architectural-photography-of-a-mode__318.png',
      '/images/luxury-bedroom-suite-resort-high-rise-hotel-with-working-table.jpg'
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Washer/Dryer', 'City View'],
    rating: 4.6,
    reviews: 203,
    available: true
  },
  {
    id: '5',
    title: 'Tropical Paradise Condo',
    description: 'Bright and airy condo with ocean views and resort amenities. Located steps from the beach and shopping.',
    location: 'Miami Beach, Florida',
    price: 320,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    area: 1500,
    type: 'condo',
    images: [
      '/images/freepik__ultrarealistic-architectural-photography-of-a-mode__318.png',
      '/images/modern-studio-apartment-design-with-bedroom-living-space.jpg',
      '/images/airbnb-host-welcoming-guests.jpg'
    ],
    amenities: ['WiFi', 'Pool', 'Gym', 'Beach Access', 'Kitchen', 'Parking', 'Air Conditioning'],
    rating: 4.8,
    reviews: 167,
    available: true
  },
  {
    id: '6',
    title: 'Historic Brownstone',
    description: 'Charming historic brownstone with original details and modern updates. Located in a quiet residential neighborhood.',
    location: 'Boston, Massachusetts',
    price: 280,
    bedrooms: 3,
    bathrooms: 2,
    guests: 5,
    area: 1800,
    type: 'house',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800'
    ],
    amenities: ['WiFi', 'Fireplace', 'Full Kitchen', 'Parking', 'Garden', 'Washer/Dryer'],
    rating: 4.9,
    reviews: 98,
    available: true
  }
]

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(p => p.id === id)
}

export const searchProperties = (query: string, filters?: {
  type?: string
  maxPrice?: number
  bedrooms?: number
  guests?: number
}): Property[] => {
  let results = properties

  if (query) {
    const lowerQuery = query.toLowerCase()
    results = results.filter(p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.location.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    )
  }

  if (filters) {
    if (filters.type) {
      results = results.filter(p => p.type === filters.type)
    }
    if (filters.maxPrice) {
      results = results.filter(p => p.price <= filters.maxPrice)
    }
    if (filters.bedrooms) {
      results = results.filter(p => p.bedrooms >= filters.bedrooms)
    }
    if (filters.guests) {
      results = results.filter(p => p.guests >= filters.guests)
    }
  }

  return results
}


