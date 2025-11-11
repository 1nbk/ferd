import prisma from '../../../utils/db'
import { requireAuth } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const propertyId = getRouterParam(event, 'propertyId')
  const user = await requireAuth(event)

  if (!propertyId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Property ID is required'
    })
  }

  try {
    const favorite = await prisma.favorite.findUnique({
      where: {
        propertyId_userId: {
          propertyId,
          userId: user.id
        }
      }
    })

    if (!favorite) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Favorite not found'
      })
    }

    await prisma.favorite.delete({
      where: {
        propertyId_userId: {
          propertyId,
          userId: user.id
        }
      }
    })

    return {
      success: true,
      message: 'Favorite removed successfully'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to remove favorite',
      data: error.message
    })
  }
})

