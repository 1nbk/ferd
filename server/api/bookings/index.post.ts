import prisma from '~/server/utils/db'
import { requireAuth } from '~/server/utils/auth'
import { z } from 'zod'

const bookingSchema = z.object({
  propertyId: z.string(),
  checkIn: z.string().datetime(),
  checkOut: z.string().datetime(),
  guests: z.number().int().positive()
})

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  try {
    const body = await readBody(event)
    const validated = bookingSchema.parse(body)

    // Check if property exists and is available
    const property = await prisma.property.findUnique({
      where: { id: validated.propertyId }
    })

    if (!property) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Property not found'
      })
    }

    if (!property.available) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Property is not available'
      })
    }

    if (validated.guests > property.guests) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Number of guests exceeds property capacity'
      })
    }

    // Check for overlapping bookings
    const checkIn = new Date(validated.checkIn)
    const checkOut = new Date(validated.checkOut)

    if (checkIn >= checkOut) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Check-out date must be after check-in date'
      })
    }

    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        propertyId: validated.propertyId,
        status: {
          in: ['PENDING', 'CONFIRMED']
        },
        OR: [
          {
            checkIn: { lte: checkOut },
            checkOut: { gte: checkIn }
          }
        ]
      }
    })

    if (overlappingBooking) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Property is not available for the selected dates'
      })
    }

    // Calculate total price
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    const totalPrice = property.price * nights

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        propertyId: validated.propertyId,
        userId: user.id,
        checkIn,
        checkOut,
        guests: validated.guests,
        totalPrice,
        status: 'PENDING'
      },
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
      statusMessage: 'Failed to create booking',
      data: error.message
    })
  }
})

