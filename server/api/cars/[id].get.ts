import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Car ID is required'
        })
    }

    try {
        const car = await prisma.car.findUnique({
            where: { id },
            include: {
                host: {
                    select: {
                        id: true,
                        name: true,
                        picture: true,
                        createdAt: true
                    }
                }
            }
        })

        if (!car) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Car not found'
            })
        }

        return {
            ...car,
            images: JSON.parse(car.images as string),
            features: JSON.parse(car.features as string)
        }
    } catch (error: any) {
        if (error.statusCode) throw error
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch car',
            data: error.message
        })
    }
})
