import prisma from '~/server/utils/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        property: {
          include: {
            host: {
              select: {
                id: true,
                name: true,
                picture: true
              }
            },
            reviews: {
              select: {
                rating: true
              }
            },
            _count: {
              select: {
                reviews: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return favorites.map(favorite => {
      const property = favorite.property
      const reviews = property.reviews
      const rating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0

      return {
        id: favorite.id,
        property: {
          id: property.id,
          title: property.title,
          description: property.description,
          location: property.location,
          price: property.price,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          guests: property.guests,
          area: property.area,
          type: property.type,
          images: JSON.parse(property.images),
          amenities: JSON.parse(property.amenities),
          available: property.available,
          rating: Math.round(rating * 10) / 10,
          reviews: property._count.reviews,
          host: property.host
        },
        createdAt: favorite.createdAt
      }
    })
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch favorites',
      data: error.message
    })
  }
})

