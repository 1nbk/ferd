# Quick Start - Google Sign-In Setup

## Step 1: Create .env File

Create a `.env` file in the root directory (same folder as `package.json`) with the following content:

```env
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
SITE_URL=http://localhost:3000
```

**Replace `your-client-id-here` and `your-client-secret-here` with your actual Google OAuth credentials.**

## Step 2: Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Click on your OAuth 2.0 Client ID
4. Under "Authorized redirect URIs", add:
   ```
   http://localhost:3000/auth/callback
   ```
5. Save the changes

## Step 3: Restart Your Server

After creating the `.env` file, restart your development server:

```bash
npm run dev
```

## Step 4: Test Sign-In

1. Open your browser to `http://localhost:3000`
2. Click the "Sign In" button in the header
3. You'll be redirected to Google's sign-in page
4. After signing in, you'll be redirected back and logged in
5. Your name and profile picture will appear in the header

## That's It! 🎉

Your Google Sign-In is now ready to use!

## Important URLs

- **Redirect URI for Google Cloud Console:** `http://localhost:3000/auth/callback`
- **Production Redirect URI:** `https://yourdomain.com/auth/callback` (when you deploy)

## Troubleshooting

### "Google Sign-In is not configured"
- Make sure your `.env` file exists in the root directory
- Check that `GOOGLE_CLIENT_ID` is set correctly
- Restart your dev server after creating/modifying `.env`

### "OAuth configuration error"
- Verify `GOOGLE_CLIENT_SECRET` is set in your `.env` file
- Make sure there are no extra spaces or quotes in the `.env` file

### "Redirect URI mismatch"
- Ensure the redirect URI in Google Cloud Console exactly matches: `http://localhost:3000/auth/callback`
- Check for typos or trailing slashes

## Need Help?

Check the `GOOGLE_AUTH_SETUP.md` file for detailed documentation.

