import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

/**
 * Hash a plain text password using bcrypt
 * @param password - Plain text password to hash
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

/**
 * Verify a plain text password against a hashed password
 * @param password - Plain text password to verify
 * @param hashedPassword - Hashed password to compare against
 * @returns True if password matches, false otherwise
 */
export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Object with isValid boolean and error message if invalid
 */
export function validatePassword(password: string): {
    isValid: boolean
    error?: string
} {
    if (!password || password.length < 6) {
        return {
            isValid: false,
            error: 'Password must be at least 6 characters long'
        }
    }

    return { isValid: true }
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateEmail(email: string): {
    isValid: boolean
    error?: string
} {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email || !emailRegex.test(email)) {
        return {
            isValid: false,
            error: 'Invalid email format'
        }
    }

    return { isValid: true }
}
