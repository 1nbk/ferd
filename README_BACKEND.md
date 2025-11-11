# 🚀 Backend Setup - Quick Start

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file:
   ```env
   DATABASE_URL="file:./dev.db"
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   SITE_URL=http://localhost:3000
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=7d
   ```

3. **Generate Prisma Client:**
   ```bash
   npm run db:generate
   ```

4. **Create database:**
   ```bash
   npm run db:push
   ```

5. **Seed database:**
   ```bash
   npm run db:seed
   ```

6. **Start server:**
   ```bash
   npm run dev
   ```

## ✅ What's Included

- ✅ **Database**: SQLite with Prisma ORM
- ✅ **Authentication**: Google OAuth + JWT
- ✅ **Properties API**: CRUD operations
- ✅ **Bookings API**: Create, list, update, cancel
- ✅ **Reviews API**: Create and list reviews
- ✅ **Favorites API**: Add/remove favorites
- ✅ **Users API**: Get/update user profile
- ✅ **Validation**: Zod schema validation
- ✅ **Authorization**: Role-based access control
- ✅ **Error Handling**: Comprehensive error handling

## 📚 Full Documentation

See `BACKEND_SETUP.md` for complete documentation.

## 🎉 You're Ready!

The backend is fully functional. Start developing!

