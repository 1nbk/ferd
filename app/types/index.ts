export interface User {
    id: string
    name: string
    picture?: string | null
}

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
    available: boolean
    rating: number
    reviews: number
    favorites: number
    host: User
    createdAt: string | Date
    updatedAt: string | Date
}
