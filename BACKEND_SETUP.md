# Backend Setup Guide

## ✅ Backend is Fully Functional!

The backend is now complete with:
- ✅ Database (SQLite with Prisma ORM)
- ✅ Authentication (Google OAuth + JWT)
- ✅ Property API (CRUD operations)
- ✅ Booking API
- ✅ Reviews API
- ✅ Favorites API
- ✅ User API
- ✅ Request validation (Zod)
- ✅ Error handling
- ✅ Authorization middleware

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Prisma ORM
- JWT authentication
- Zod validation
- TypeScript dependencies

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
SITE_URL=http://localhost:3000

# JWT Secret (generate a random string for production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

### 3. Generate Prisma Client

```bash
npm run db:generate
```

### 4. Push Database Schema

```bash
npm run db:push
```

This will create the SQLite database file (`dev.db`) and all tables.

### 5. Seed the Database

```bash
npm run db:seed
```

This will:
- Create a default host user
- Add 6 sample properties
- Set up the initial data

### 6. Start the Development Server

```bash
npm run dev
```

## 📁 Backend Structure

```
server/
├── api/
│   ├── auth/
│   │   └── google.post.ts          # Google OAuth callback
│   ├── properties/
│   │   ├── index.get.ts            # List properties
│   │   ├── index.post.ts           # Create property
│   │   ├── [id].get.ts             # Get property
│   │   ├── [id].put.ts             # Update property
│   │   ├── [id].delete.ts          # Delete property
│   │   └── [id]/
│   │       └── reviews/
│   │           ├── index.get.ts    # Get reviews
│   │           └── index.post.ts   # Create review
│   ├── bookings/
│   │   ├── index.get.ts            # List bookings
│   │   ├── index.post.ts           # Create booking
│   │   ├── [id].put.ts             # Update booking
│   │   └── [id].delete.ts          # Cancel booking
│   ├── favorites/
│   │   ├── index.get.ts            # List favorites
│   │   ├── index.post.ts           # Add favorite
│   │   ├── [id].delete.ts          # Remove favorite
│   │   └── property/
│   │       └── [propertyId].delete.ts  # Remove favorite by property
│   └── users/
│       ├── me.get.ts               # Get current user
│       └── me.put.ts               # Update user
├── middleware/
│   └── auth.ts                     # Authentication middleware
└── utils/
    ├── db.ts                       # Prisma client
    ├── jwt.ts                      # JWT utilities
    └── auth.ts                     # Auth helpers
```

## 🗄️ Database Schema

### Users
- id, email, name, picture, googleId, role, createdAt, updatedAt

### Properties
- id, title, description, location, price, bedrooms, bathrooms, guests, area, type, images, amenities, available, hostId

### Bookings
- id, propertyId, userId, checkIn, checkOut, guests, totalPrice, status

### Reviews
- id, propertyId, userId, rating, comment

### Favorites
- id, propertyId, userId

## 🔐 Authentication

### How It Works

1. User clicks "Sign In" → Redirects to Google OAuth
2. Google redirects to `/auth/callback` with authorization code
3. Backend exchanges code for user info
4. User is created/found in database
5. JWT token is generated and returned
6. Token is stored in localStorage
7. All API requests include token in Authorization header

### Protected Routes

Routes that require authentication:
- `POST /api/properties` - Create property (HOST/ADMIN only)
- `PUT /api/properties/:id` - Update property (owner or ADMIN)
- `DELETE /api/properties/:id` - Delete property (owner or ADMIN)
- `POST /api/bookings` - Create booking (authenticated users)
- `GET /api/bookings` - List bookings (authenticated users)
- `POST /api/favorites` - Add favorite (authenticated users)
- `GET /api/favorites` - List favorites (authenticated users)
- `POST /api/properties/:id/reviews` - Create review (authenticated users)
- `GET /api/users/me` - Get user profile (authenticated users)

## 📝 API Endpoints

### Properties

- `GET /api/properties` - List properties (with filters, pagination)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (HOST/ADMIN)
- `PUT /api/properties/:id` - Update property (owner or ADMIN)
- `DELETE /api/properties/:id` - Delete property (owner or ADMIN)

### Bookings

- `GET /api/bookings` - List user's bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Cancel booking

### Reviews

- `GET /api/properties/:id/reviews` - Get property reviews
- `POST /api/properties/:id/reviews` - Create review

### Favorites

- `GET /api/favorites` - List user's favorites
- `POST /api/favorites` - Add favorite
- `DELETE /api/favorites/property/:propertyId` - Remove favorite

### Users

- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update user profile

## 🛠️ Database Management

### View Data in Prisma Studio

```bash
npm run db:studio
```

This opens a GUI to view and edit your database.

### Reset Database

```bash
# Delete the database file
rm prisma/dev.db

# Push schema again
npm run db:push

# Seed data
npm run db:seed
```

## 🔒 Security Features

- ✅ JWT token authentication
- ✅ Role-based access control (GUEST, HOST, ADMIN)
- ✅ CSRF protection (state parameter in OAuth)
- ✅ Request validation (Zod)
- ✅ Input sanitization
- ✅ Error handling

## 🚨 Troubleshooting

### "Prisma Client not generated"
```bash
npm run db:generate
```

### "Database not found"
```bash
npm run db:push
```

### "No properties showing"
```bash
npm run db:seed
```

### "Authentication not working"
- Check that `.env` file has `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Verify redirect URI in Google Cloud Console: `http://localhost:3000/auth/callback`
- Check that `JWT_SECRET` is set in `.env`

### "Cannot find module '@prisma/client'"
```bash
npm install
npm run db:generate
```

## 📊 Next Steps

1. **Production Database**: Switch from SQLite to PostgreSQL
2. **Image Upload**: Add file upload for property images
3. **Payment Integration**: Add Stripe for booking payments
4. **Email Notifications**: Send booking confirmations
5. **Advanced Search**: Add more search filters
6. **Caching**: Add Redis for performance
7. **Rate Limiting**: Add rate limiting to API routes

## 🎉 You're All Set!

The backend is fully functional. Start the dev server and test the API endpoints!

