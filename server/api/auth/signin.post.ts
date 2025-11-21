import prisma from '../../utils/db'
import { createAuthResponse } from '../../utils/auth'
import { verifyPassword, validateEmail } from '../../utils/password'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body

    // Validate input
    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required'
        })
    }

    // Validate email format
    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
        throw createError({
            statusCode: 400,
            statusMessage: emailValidation.error
        })
    }

    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid email or password'
            })
        }

        // Check if user has a password (not just Google OAuth)
        if (!user.password) {
            throw createError({
                statusCode: 401,
                statusMessage: 'This account uses Google sign-in. Please sign in with Google.'
            })
        }

        // Verify password
        const isPasswordValid = await verifyPassword(password, user.password)
        if (!isPasswordValid) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid email or password'
            })
        }

        // Create JWT token and return response
        return createAuthResponse(user)
    } catch (error: any) {
        // If it's already a createError, just throw it
        if (error.statusCode) {
            throw error
        }

        console.error('Signin error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'An error occurred during sign in'
        })
    }
})
