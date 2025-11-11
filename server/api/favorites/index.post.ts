import prisma from '~/server/utils/db'
import { requireAuth } from '~/server/utils/auth'
import { z } from 'zod'

const favoriteSchema = z.object({
  propertyId: z.string()
})

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  try {
    const body = await readBody(event)
    const validated = favoriteSchema.parse(body)

    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id: validated.propertyId }
    })

    if (!property) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Property not found'
      })
    }

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        propertyId_userId: {
          propertyId: validated.propertyId,
          userId: user.id
        }
      }
    })

    if (existingFavorite) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Property is already in favorites'
      })
    }

    const favorite = await prisma.favorite.create({
      data: {
        propertyId: validated.propertyId,
        userId: user.id
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            location: true,
            images: true
          }
        }
      }
    })

    return {
      id: favorite.id,
      property: {
        ...favorite.property,
        images: JSON.parse(favorite.property.images as string)
      },
      createdAt: favorite.createdAt
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid favorite data',
        data: error.errors
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add favorite',
      data: error.message
    })
  }
})

