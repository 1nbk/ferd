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




