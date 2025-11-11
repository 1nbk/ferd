import prisma from './db'
import { generateToken } from './jwt'

export async function requireAuth(event: any) {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
  return event.context.user
}

export async function requireRole(event: any, roles: string[]) {
  const user = await requireAuth(event)
  if (!roles.includes(user.role)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }
  return user
}

export async function findOrCreateUser(userData: {
  email: string
  name: string
  picture?: string
  googleId?: string
}) {
  let user = await prisma.user.findUnique({
    where: { email: userData.email }
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        googleId: userData.googleId,
        role: 'GUEST'
      }
    })
  } else {
    // Update user if Google ID is missing or picture changed
    if (userData.googleId && !user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: userData.googleId,
          picture: userData.picture || user.picture
        }
      })
    } else if (userData.picture && userData.picture !== user.picture) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { picture: userData.picture }
      })
    }
  }

  return user
}

export function createAuthResponse(user: any) {
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role
  })

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      role: user.role
    },
    token
  }
}

