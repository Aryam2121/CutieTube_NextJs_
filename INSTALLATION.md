# Installation Guide - Additional Dependencies

To complete the full-fledged YouTube-like application, you need to install one additional package:

## Required Package

Run this command to install the missing dependency:

```bash
npm install react-swipeable
```

Or with yarn:

```bash
yarn add react-swipeable
```

## What This Package Does

- **react-swipeable**: Enables swipe gestures for the Shorts/Reels feature, allowing users to swipe up/down to navigate between short videos (similar to TikTok/Instagram Reels/YouTube Shorts).

## After Installation

Once installed, all features will work properly including:
- ✅ Shorts player with swipe navigation
- ✅ Mobile-friendly gesture controls
- ✅ Smooth transitions between shorts

## Full Installation Steps

If you're setting up the project from scratch:

1. **Install all dependencies:**
   ```bash
   npm install
   ```

2. **Install the additional package:**
   ```bash
   npm install react-swipeable
   ```

3. **Set up environment variables:**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Run database migrations:**
   Execute the SQL files in `/scripts` directory in your Supabase SQL editor

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Troubleshooting

If you encounter any TypeScript errors after installation:

```bash
npm run type-check
```

If there are any type issues, you may need to install types:

```bash
npm install --save-dev @types/react-swipeable
```

## All Dependencies Overview

The project uses:
- **Framework**: Next.js 15, React 19
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Video**: React Player, FFmpeg
- **Forms**: React Hook Form, Zod
- **Charts**: Recharts
- **Payments**: Razorpay
- **Real-time**: Socket.io
- **Gestures**: react-swipeable, @use-gesture/react
- **Icons**: Lucide React
- **Dates**: date-fns
- **Notifications**: Sonner, React Hot Toast

All other dependencies are already in package.json!
