import prisma from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const propertyId = getRouterParam(event, 'id')

  if (!propertyId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Property ID is required'
    })
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { propertyId },
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
    })

    return reviews.map(review => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      user: review.user,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    }))
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch reviews',
      data: error.message
    })
  }
})

