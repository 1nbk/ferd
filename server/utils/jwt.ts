import jwt from 'jsonwebtoken'

const config = useRuntimeConfig()

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn || '7d'
  })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, config.jwtSecret) as JWTPayload
  } catch (error) {
    return null
  }
}

export function getTokenFromHeader(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

