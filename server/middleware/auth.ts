import { verifyToken, getTokenFromHeader } from '../utils/jwt'

export interface AuthenticatedEvent {
  user?: {
    id: string
    email: string
    role: string
  }
}

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  const token = getTokenFromHeader(authHeader)

  if (token) {
    const payload = verifyToken(token)
    if (payload) {
      event.context.user = {
        id: payload.userId,
        email: payload.email,
        role: payload.role
      }
    }
  }
})

