import prisma from '~/server/utils/db'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  try {
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        picture: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            properties: true,
            bookings: true,
            reviews: true,
            favorites: true
          }
        }
      }
    })

    if (!userData) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      role: userData.role,
      stats: {
        properties: userData._count.properties,
        bookings: userData._count.bookings,
        reviews: userData._count.reviews,
        favorites: userData._count.favorites
      },
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch user',
      data: error.message
    })
  }
})

