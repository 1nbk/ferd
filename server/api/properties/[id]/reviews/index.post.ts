import prisma from '~/server/utils/db'
import { requireAuth } from '~/server/utils/auth'
import { z } from 'zod'

const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional()
})

export default defineEventHandler(async (event) => {
  const propertyId = getRouterParam(event, 'id')
  const user = await requireAuth(event)

  if (!propertyId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Property ID is required'
    })
  }

  try {
    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId }
    })

    if (!property) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Property not found'
      })
    }

    // Check if user has already reviewed this property
    const existingReview = await prisma.review.findUnique({
      where: {
        propertyId_userId: {
          propertyId,
          userId: user.id
        }
      }
    })

    if (existingReview) {
      throw createError({
        statusCode: 400,
        statusMessage: 'You have already reviewed this property'
      })
    }

    const body = await readBody(event)
    const validated = reviewSchema.parse(body)

    const review = await prisma.review.create({
      data: {
        propertyId,
        userId: user.id,
        rating: validated.rating,
        comment: validated.comment
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            picture: true
          }
        }
      }
    })

    return {
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      user: review.user,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid review data',
        data: error.errors
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create review',
      data: error.message
    })
  }
})

