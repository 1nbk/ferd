# Google Sign-In Setup Guide

## Redirect URL for Google Cloud Console

When configuring your Google OAuth credentials in Google Cloud Console, use the following redirect URL:

### Development:
```
http://localhost:3000/auth/callback
```

### Production:
```
https://yourdomain.com/auth/callback
```

**Replace `yourdomain.com` with your actual domain name.**

---

## Setup Instructions

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/auth/callback` (for development)
     - `https://yourdomain.com/auth/callback` (for production)
   - Save your Client ID and Client Secret

### 2. Configure Environment Variables

Create a `.env` file in the root of your project:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Site URL (for OAuth redirect)
# For development: http://localhost:3000
# For production: https://yourdomain.com
SITE_URL=http://localhost:3000
```

### 3. Install Dependencies

The required dependencies are already included in the project. No additional packages are needed.

### 4. Test the Sign-In

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Click the "Sign In" button in the header
3. You'll be redirected to Google's sign-in page
4. After signing in, you'll be redirected back to `/auth/callback`
5. The app will then redirect you to the home page

---

## How It Works

1. User clicks "Sign In" → Redirects to Google OAuth
2. User authenticates with Google → Google redirects to `/auth/callback` with an authorization code
3. The callback page exchanges the code for tokens via the `/api/auth/google` endpoint
4. User data is stored in localStorage and the user is redirected to the home page
5. The header shows the user's name and profile picture when signed in

---

## Files Created

- `app/pages/auth/callback.vue` - OAuth callback handler
- `app/composables/useAuth.ts` - Authentication composable
- `app/server/api/auth/google.post.ts` - Server endpoint for token exchange
- `nuxt.config.ts` - Updated with runtime config for OAuth credentials

---

## Security Notes

- Never commit your `.env` file to version control
- The Client Secret is only used on the server-side
- State parameter is used for CSRF protection
- Tokens are stored in localStorage (consider using httpOnly cookies for production)

---

## Troubleshooting

### "OAuth configuration error"
- Make sure your `.env` file is in the root directory
- Verify that `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set correctly
- Restart your development server after adding environment variables

### "Invalid state parameter"
- This is a CSRF protection feature
- Clear your browser's sessionStorage and try again

### Redirect URI mismatch
- Make sure the redirect URI in Google Cloud Console matches exactly:
  - `http://localhost:3000/auth/callback` (development)
  - `https://yourdomain.com/auth/callback` (production)
- Check for trailing slashes or protocol mismatches

