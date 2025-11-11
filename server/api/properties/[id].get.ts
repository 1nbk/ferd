import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Property ID is required'
    })
  }

  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            picture: true,
            email: true
          }
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                picture: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            reviews: true,
            favorites: true,
            bookings: true
          }
        }
      }
    })

    if (!property) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Property not found'
      })
    }

    // Calculate rating
    const reviews = property.reviews
    const rating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0

    // Check if user has favorited this property
    let isFavorited = false
    if (event.context.user) {
      const favorite = await prisma.favorite.findUnique({
        where: {
          propertyId_userId: {
            propertyId: id,
            userId: event.context.user.id
          }
        }
      })
      isFavorited = !!favorite
    }

    return {
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
      reviews: property.reviews.map(review => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        user: review.user,
        createdAt: review.createdAt
      })),
      reviewsCount: property._count.reviews,
      favoritesCount: property._count.favorites,
      isFavorited,
      host: property.host,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch property',
      data: error.message
    })
  }
})

