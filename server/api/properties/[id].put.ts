import prisma from '~/server/utils/db'
import { requireAuth, requireRole } from '~/server/utils/auth'
import { z } from 'zod'

const propertySchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().int().positive().optional(),
  guests: z.number().int().positive().optional(),
  area: z.number().int().positive().optional(),
  type: z.enum(['apartment', 'house', 'condo', 'villa']).optional(),
  images: z.array(z.string().url()).optional(),
  amenities: z.array(z.string()).optional(),
  available: z.boolean().optional()
})

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

    // Only host or admin can update
    if (existingProperty.hostId !== user.id && user.role !== 'ADMIN') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden'
      })
    }

    const body = await readBody(event)
    const validated = propertySchema.parse(body)

    const updateData: any = { ...validated }
    if (validated.images) {
      updateData.images = JSON.stringify(validated.images)
    }
    if (validated.amenities) {
      updateData.amenities = JSON.stringify(validated.amenities)
    }

    const property = await prisma.property.update({
      where: { id },
      data: updateData,
      include: {
        host: {
          select: {
            id: true,
            name: true,
            picture: true
          }
        }
      }
    })

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
      images: JSON.parse(property.images),
      amenities: JSON.parse(property.amenities),
      available: property.available,
      host: property.host,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid property data',
        data: error.errors
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update property',
      data: error.message
    })
  }
})

