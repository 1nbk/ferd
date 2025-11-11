import prisma from '~/server/utils/db'
import { requireAuth, requireRole } from '~/server/utils/auth'
import { z } from 'zod'

const propertySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  price: z.number().positive(),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().int().positive(),
  guests: z.number().int().positive(),
  area: z.number().int().positive(),
  type: z.enum(['apartment', 'house', 'condo', 'villa']),
  images: z.array(z.string().url()),
  amenities: z.array(z.string()),
  available: z.boolean().default(true)
})

export default defineEventHandler(async (event) => {
  const user = await requireRole(event, ['HOST', 'ADMIN'])

  try {
    const body = await readBody(event)
    const validated = propertySchema.parse(body)

    const property = await prisma.property.create({
      data: {
        ...validated,
        images: JSON.stringify(validated.images),
        amenities: JSON.stringify(validated.amenities),
        hostId: user.id
      },
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
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid property data',
        data: error.errors
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create property',
      data: error.message
    })
  }
})

