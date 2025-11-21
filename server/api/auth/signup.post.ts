import prisma from '../../utils/db'
import { createAuthResponse } from '../../utils/auth'
import { hashPassword, validateEmail, validatePassword } from '../../utils/password'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password, name } = body

    // Validate input
    if (!email || !password || !name) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email, password, and name are required'
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

    // Validate password strength
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
        throw createError({
            statusCode: 400,
            statusMessage: passwordValidation.error
        })
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            throw createError({
                statusCode: 409,
                statusMessage: 'An account with this email already exists'
            })
        }

        // Hash password
        const hashedPassword = await hashPassword(password)

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: 'GUEST'
            }
        })

        // Create JWT token and return response
        return createAuthResponse(user)
    } catch (error: any) {
        // If it's already a createError, just throw it
        if (error.statusCode) {
            throw error
        }

        console.error('Signup error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'An error occurred during sign up'
        })
    }
})
