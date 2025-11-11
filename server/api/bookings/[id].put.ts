import prisma from '../../utils/db'
import { requireAuth } from '../../utils/auth'
import { z } from 'zod'

const updateSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).optional()
})

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
      where: { id },
      include: {
        property: true
      }
    })

    if (!booking) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Booking not found'
      })
    }

    // User can only update their own bookings, or property host can update
    if (booking.userId !== user.id && booking.property.hostId !== user.id) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden'
      })
    }

    const body = await readBody(event)
    const validated = updateSchema.parse(body)

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: validated,
      include: {
        property: {
          select: {
            id: true,
            title: true,
            location: true,
            images: true,
            type: true
          }
        }
      }
    })

    return {
      id: updatedBooking.id,
      property: {
        ...updatedBooking.property,
        images: JSON.parse(updatedBooking.property.images as string)
      },
      checkIn: updatedBooking.checkIn,
      checkOut: updatedBooking.checkOut,
      guests: updatedBooking.guests,
      totalPrice: updatedBooking.totalPrice,
      status: updatedBooking.status,
      createdAt: updatedBooking.createdAt,
      updatedAt: updatedBooking.updatedAt
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid booking data',
        data: error.errors
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update booking',
      data: error.message
    })
  }
})

