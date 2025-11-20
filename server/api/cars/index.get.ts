import prisma from '../../utils/db'
import { z } from 'zod'

const querySchema = z.object({
    search: z.string().optional(),
    type: z.enum(['sedan', 'suv', 'luxury', 'sports', 'convertible', 'van']).optional(),
    maxPrice: z.coerce.number().optional(),
    minPrice: z.coerce.number().optional(),
    seats: z.coerce.number().optional(),
    transmission: z.string().optional(),
    available: z.coerce.boolean().optional(),
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(20)
})

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const validated = querySchema.parse(query)

        const where: any = {
            available: validated.available !== false
        }

        if (validated.search) {
            where.OR = [
                { make: { contains: validated.search } },
                { model: { contains: validated.search } },
                { features: { array_contains: validated.search } } // Note: array_contains might be specific to Postgres/Prisma version, check if needed
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

        if (validated.seats) {
            where.seats = { gte: validated.seats }
        }

        if (validated.transmission) {
            where.transmission = validated.transmission
        }

        const skip = (validated.page - 1) * validated.limit
        const take = validated.limit

        const [cars, total] = await Promise.all([
            prisma.car.findMany({
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
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.car.count({ where })
        ])

        const formattedCars = cars.map(car => ({
            ...car,
            images: JSON.parse(car.images as string),
            features: JSON.parse(car.features as string)
        }))

        return {
            cars: formattedCars,
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
            statusMessage: 'Failed to fetch cars',
            data: error.message
        })
    }
})
