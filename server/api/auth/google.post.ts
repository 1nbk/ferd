import { findOrCreateUser, createAuthResponse } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { code, state } = body

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No authorization code provided'
    })
  }

  if (!config.googleClientId || !config.googleClientSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OAuth configuration error'
    })
  }

  try {
    // Exchange authorization code for tokens
    const tokenParams = new URLSearchParams({
      code,
      client_id: config.googleClientId,
      client_secret: config.googleClientSecret,
      redirect_uri: `${config.public.siteUrl}/auth/callback`,
      grant_type: 'authorization_code'
    })

    const tokenResponse = await $fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: tokenParams.toString()
    }) as any

    const { access_token, id_token } = tokenResponse

    if (!access_token) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Failed to obtain access token'
      })
    }

    // Get user info from Google
    const userInfo = await $fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }) as any

    // Find or create user in database
    const user = await findOrCreateUser({
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
      googleId: userInfo.id
    })

    // Create JWT token and return response
    return createAuthResponse(user)
  } catch (error: any) {
    console.error('Google OAuth error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.error_description || error.message || 'Authentication failed'
    })
  }
})

