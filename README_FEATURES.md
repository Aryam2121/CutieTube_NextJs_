# CutieTube - Full-Fledged YouTube-like Platform

A comprehensive, feature-rich video sharing platform built with Next.js 15, React 19, TypeScript, and Supabase. This application replicates and extends YouTube's functionality with modern web technologies.

## 🚀 Features

### Core Video Features
- **Advanced Video Player**
  - Multiple quality options (360p, 480p, 720p, 1080p, 1440p, 4K)
  - Playback speed controls (0.25x - 2x)
  - Picture-in-Picture (PiP) mode
  - Fullscreen support
  - Keyboard shortcuts (Space/K for play/pause, F for fullscreen, M for mute, Arrow keys for seeking)
  - Volume controls with slider
  - Progress bar with buffering indicator
  - Auto-hiding controls
  - Captions/Subtitles support
  - Loop functionality
  - Chromecast support (coming soon)

### Shorts (TikTok-like Feature)
- **Vertical Video Feed**
  - Swipe navigation (up/down)
  - Full-screen immersive experience
  - Inline interactions (like, comment, share)
  - Auto-play next short
  - Music attribution
  - Subscribe button integration

### Channel Management
- **Complete Channel Pages**
  - Channel banner and avatar
  - Subscriber count and verification badge
  - Multiple tabs: Videos, Shorts, Playlists, Community, About
  - Subscribe with notifications toggle
  - Grid and list view modes
  - Channel statistics
  - Social media links
  - Community posts integration

### Search & Discovery
- **Advanced Search Filters**
  - Content type filters (Videos, Channels, Playlists, Shorts, Live)
  - Upload date filtering
  - Duration filtering
  - Sort options (Relevance, Upload date, View count, Rating)
  - Advanced features (4K, HDR, Subtitles, Creative Commons, 360°, VR180, 3D)
  - Active filter counter
  - Clear all filters option

### Studio/Creator Dashboard
- **Content Management**
  - Channel analytics overview
  - Recent videos performance
  - Subscriber growth tracking
  - Revenue estimates
  - Quick actions (Upload, Create Post, Analytics)
  - Content moderation
  - Comment management
  - Audience insights

### Community Features
- **Posts & Engagement**
  - Text posts
  - Image posts with multiple images
  - Video posts
  - Polls with voting
  - Quiz posts
  - Like, comment, share functionality
  - Bookmarking posts
  - Community engagement metrics
  - Real-time updates

### Notifications System
- **Comprehensive Notification Center**
  - Real-time notifications
  - Multiple notification types:
    - New videos from subscribed channels
    - Live streams
    - Comments on your videos
    - Likes milestones
    - New subscribers
    - Channel milestones
    - Community posts
  - Unread badge counter
  - Mark as read/unread
  - Filter by all/unread
  - Notification settings
  - Clear all functionality

### User Interface
- **Modern, Responsive Design**
  - Dark/Light theme toggle
  - Responsive sidebar navigation
  - Mobile-optimized layouts
  - Smooth animations with Framer Motion
  - Toast notifications with Sonner
  - Beautiful UI components with Radix UI
  - Accessible design patterns
  - Category pills for easy navigation
  - Trending content sections

### Video Cards
- **Rich Video Previews**
  - Thumbnail with duration badge
  - Channel avatar and name
  - Verification badges
  - View count and upload date
  - Hover actions (Watch Later, Add to Playlist)
  - Three-dot menu with options:
    - Download
    - Share
    - Report
    - Add to playlist
    - Watch later
  - Grid and list layouts
  - Error handling for images

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Player** - Video player component
- **date-fns** - Date formatting
- **Sonner** - Toast notifications
- **Zustand** - State management

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Storage for videos and images
  - Row Level Security (RLS)

### Additional Tools
- **FFmpeg** - Video processing
- **WaveSurfer.js** - Audio visualization
- **Recharts** - Analytics charts
- **Razorpay** - Payment processing
- **Socket.io** - Real-time features

## 📁 Project Structure

```
CutieTube_NextJs_/
├── app/
│   ├── page.tsx                 # Homepage with video grid
│   ├── watch/page.tsx           # Individual video page
│   ├── shorts/page.tsx          # Shorts feed
│   ├── studio/page.tsx          # Creator dashboard
│   ├── channel/[id]/page.tsx   # Channel pages
│   ├── search/page.tsx          # Search results
│   ├── analytics/page.tsx       # Analytics dashboard
│   ├── subscriptions/page.tsx   # Subscriptions feed
│   ├── history/page.tsx         # Watch history
│   ├── liked/page.tsx           # Liked videos
│   ├── playlists/page.tsx       # Playlists management
│   └── api/                     # API routes
├── components/
│   ├── header.tsx               # Top navigation
│   ├── sidebar.tsx              # Side navigation
│   ├── video-player.tsx         # Advanced video player
│   ├── video-card.tsx           # Video preview cards
│   ├── shorts-player.tsx        # Shorts player
│   ├── notification-center.tsx  # Notifications
│   ├── community-feed.tsx       # Community posts
│   ├── search-filters.tsx       # Advanced filters
│   ├── auth-provider.tsx        # Authentication
│   ├── comments.tsx             # Comments section
│   ├── video-recommendations.tsx # Related videos
│   └── ui/                      # Reusable UI components
├── lib/
│   ├── supabase.ts              # Supabase client
│   ├── database.ts              # Database types
│   └── utils.ts                 # Utility functions
└── scripts/
    └── complete-database-schema.sql # Database schema
```

## 🗃️ Database Schema

### Key Tables
- **profiles** - User profiles with channel info
- **videos** - Video metadata and URLs
- **playlists** - User-created playlists
- **comments** - Video comments with threading
- **subscriptions** - Channel subscriptions
- **video_likes** - Like/dislike tracking
- **watch_history** - User watch history
- **watch_later** - Saved videos
- **live_streams** - Live streaming data
- **notifications** - User notifications
- **video_analytics** - View tracking and metrics
- **community_posts** - Channel posts
- **trending_videos** - Trending content cache

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CutieTube_NextJs_
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Run database migrations:
```bash
# Execute the SQL scripts in /scripts directory in Supabase SQL editor
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 🎨 Key Features Implementation

### Video Player
The video player includes:
- Quality switching without interruption
- Keyboard shortcuts for accessibility
- Buffer indication
- Custom controls UI
- Responsive design

### Shorts
TikTok-style short videos with:
- Vertical scrolling
- Gesture support
- Inline actions
- Auto-play

### Search
Advanced search with:
- Multiple filter categories
- Active filter tracking
- Clear filter options
- Responsive filter UI

### Notifications
Real-time notifications for:
- New content from subscriptions
- Community interactions
- Channel milestones
- Live streams

## 🎯 Future Enhancements

- [ ] Video upload with transcoding
- [ ] Live streaming capability
- [ ] Advanced analytics dashboard
- [ ] Content moderation tools
- [ ] Mobile apps (React Native)
- [ ] Recommended videos algorithm
- [ ] Video editing tools
- [ ] Premium subscriptions
- [ ] Ad integration
- [ ] Multi-language support
- [ ] Accessibility improvements
- [ ] Progressive Web App (PWA)

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by YouTube's design and functionality
- Built with modern React and Next.js patterns
- Uses Supabase for backend infrastructure
- UI components from Radix UI
- Icons from Lucide React

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ by the CutieTube Team
