import prisma from '../../utils/db'
import { z } from 'zod'

const querySchema = z.object({
  search: z.string().optional(),
  type: z.enum(['apartment', 'house', 'condo', 'villa']).optional(),
  maxPrice: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  guests: z.coerce.number().optional(),
  minPrice: z.coerce.number().optional(),
  available: z.coerce.boolean().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20)
})

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const validated = querySchema.parse(query)

    const where: any = {
      available: validated.available !== false,
      status: 'APPROVED'
    }

    if (validated.search) {
      // SQLite doesn't support case-insensitive mode, so we'll filter in memory if needed
      where.OR = [
        { title: { contains: validated.search } },
        { location: { contains: validated.search } },
        { description: { contains: validated.search } }
      ]
    }

    if (validated.type) {
      where.type = validated.type
    }

    if (validated.maxPrice || validated.minPrice) {
      where.price = {}
      if (validated.maxPrice) where.price.lte = validated.maxPrice
      if (validated.minPrice) where.price.gte = validated.minPrice
    }

    if (validated.bedrooms) {
      where.bedrooms = { gte: validated.bedrooms }
    }

    if (validated.guests) {
      where.guests = { gte: validated.guests }
    }

    const skip = (validated.page - 1) * validated.limit
    const take = validated.limit

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        skip,
        take,
        include: {
          host: {
            select: {
              id: true,
              name: true,
              picture: true
            }
          },
          reviews: {
            select: {
              rating: true
            }
          },
          _count: {
            select: {
              reviews: true,
              favorites: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.property.count({ where })
    ])

    // Calculate ratings and format response
    const formattedProperties = properties.map(property => {
      const reviews = property.reviews
      const rating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0

      return {
        id: property.id,
        title: property.title,
        description: property.description,
        location: property.location,
        price: property.price,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        guests: property.guests,
        area: property.area,
        type: property.type,
        images: property.images as string[],
        amenities: property.amenities as string[],
        available: property.available,
        rating: Math.round(rating * 10) / 10,
        reviews: property._count.reviews,
        favorites: property._count.favorites,
        host: property.host,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt
      }
    })

    return {
      properties: formattedProperties,
      pagination: {
        page: validated.page,
        limit: validated.limit,
        total,
        pages: Math.ceil(total / validated.limit)
      }
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid query parameters',
        data: error.errors
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch properties',
      data: error.message
    })
  }
})

