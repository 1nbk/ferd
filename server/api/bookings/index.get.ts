import prisma from '../../utils/db'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const query = getQuery(event)

  try {
    const where: any = {
      userId: user.id
    }

    if (query.status) {
      where.status = query.status
    }

    const bookings = await prisma.booking.findMany({
      where,
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return bookings.map(booking => ({
      id: booking.id,
      property: {
        ...booking.property,
        images: JSON.parse(booking.property.images as string)
      },
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      totalPrice: booking.totalPrice,
      status: booking.status,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    }))
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch bookings',
      data: error.message
    })
  }
})

