# Environment Setup for Google Sign-In

## Quick Setup

1. Create a `.env` file in the root of your project (same level as `package.json`)

2. Add the following variables:

```env
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
SITE_URL=http://localhost:3000
```

3. Replace the values with your actual Google OAuth credentials

4. Restart your development server after creating the `.env` file

## Getting Your Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" > "Credentials"
4. Click on your OAuth 2.0 Client ID
5. Copy the Client ID and Client Secret

## Important Notes

- **Never commit the `.env` file to version control**
- The `.env` file is already in `.gitignore`
- For production, set `SITE_URL` to your actual domain (e.g., `https://yourdomain.com`)
- Make sure the redirect URI in Google Cloud Console matches: `http://localhost:3000/auth/callback`

## Testing

After setting up your `.env` file:

1. Restart your dev server: `npm run dev`
2. Click "Sign In" in the header
3. You should be redirected to Google's sign-in page
4. After signing in, you'll be redirected back and logged in

