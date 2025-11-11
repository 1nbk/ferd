export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { code, state } = body

  if (!code) {
    return {
      success: false,
      error: 'No authorization code provided'
    }
  }

  if (!config.googleClientId || !config.googleClientSecret) {
    console.error('Google OAuth credentials are not configured')
    return {
      success: false,
      error: 'OAuth configuration error'
    }
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
    })

    const { access_token, id_token } = tokenResponse as any

    if (!access_token) {
      return {
        success: false,
        error: 'Failed to obtain access token'
      }
    }

    // Get user info from Google
    const userInfo = await $fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }) as any

    // Return user data and token
    return {
      success: true,
      user: {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture
      },
      access_token,
      id_token
    }
  } catch (error: any) {
    console.error('Google OAuth error:', error)
    return {
      success: false,
      error: error.data?.error_description || error.message || 'Authentication failed'
    }
  }
})

