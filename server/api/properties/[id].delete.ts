import prisma from '../../utils/db'
import { requireAuth, requireRole } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const user = await requireAuth(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Property ID is required'
    })
  }

  try {
    // Check if property exists and user has permission
    const existingProperty = await prisma.property.findUnique({
      where: { id }
    })

    if (!existingProperty) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Property not found'
      })
    }

    // Only host or admin can delete
    if (existingProperty.hostId !== user.id && user.role !== 'ADMIN') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden'
      })
    }

    await prisma.property.delete({
      where: { id }
    })

    return {
      success: true,
      message: 'Property deleted successfully'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete property',
      data: error.message
    })
  }
})

