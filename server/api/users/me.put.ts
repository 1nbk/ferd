import prisma from '~/server/utils/db'
import { requireAuth } from '~/server/utils/auth'
import { z } from 'zod'

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  picture: z.string().url().optional()
})

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  try {
    const body = await readBody(event)
    const validated = updateSchema.parse(body)

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: validated,
      select: {
        id: true,
        email: true,
        name: true,
        picture: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return updatedUser
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid user data',
        data: error.errors
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update user',
      data: error.message
    })
  }
})

