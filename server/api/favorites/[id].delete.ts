import prisma from '~/server/utils/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const user = await requireAuth(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Favorite ID is required'
    })
  }

  try {
    const favorite = await prisma.favorite.findUnique({
      where: { id }
    })

    if (!favorite) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Favorite not found'
      })
    }

    if (favorite.userId !== user.id) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden'
      })
    }

    await prisma.favorite.delete({
      where: { id }
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

