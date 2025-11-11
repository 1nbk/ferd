import prisma from '~/server/utils/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const user = await requireAuth(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Booking ID is required'
    })
  }

  try {
    const booking = await prisma.booking.findUnique({
      where: { id }
    })

    if (!booking) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Booking not found'
      })
    }

    // Only the user who created the booking can cancel it
    if (booking.userId !== user.id) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden'
      })
    }

    await prisma.booking.delete({
      where: { id }
    })

    return {
      success: true,
      message: 'Booking cancelled successfully'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to cancel booking',
      data: error.message
    })
  }
})

