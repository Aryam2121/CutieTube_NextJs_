# 🎬 CutieTube - Modern Video Sharing Platform

<div align="center">
  
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay)](https://razorpay.com/)

  <p align="center">
    A feature-rich, modern video sharing platform built with Next.js, Supabase, and cutting-edge web technologies.
  </p>

  [🚀 Live Demo](https://cutie-tube-next-js-7pbf-7o1s3qvad-aryaman-guptas-projects.vercel.app/) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/Aryam2121/CutieTube_NextJs_/issues) • [✨ Request Feature](https://github.com/Aryam2121/CutieTube_NextJs_/issues)
</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [📱 API Documentation](#-api-documentation)
- [🎨 UI Components](#-ui-components)
- [💳 Payment Integration](#-payment-integration)
- [📊 Analytics](#-analytics)
- [🔐 Authentication](#-authentication)
- [📱 Mobile Support](#-mobile-support)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎥 Core Video Features
- **Video Upload & Streaming** - Support for multiple formats (MP4, WebM, OGG)
- **Advanced Video Player** - Quality selection, playback speed, PiP mode, subtitles
- **Live Streaming** - Real-time streaming with chat and analytics
- **Video Recommendations** - AI-powered content discovery
- **Playlist Management** - Create, edit, and share playlists
- **Video Analytics** - Detailed performance metrics

### 👥 Social Features
- **User Profiles** - Customizable creator profiles
- **Subscriptions** - Follow your favorite creators
- **Comments System** - Nested comments with reactions
- **Like/Dislike System** - Engagement tracking
- **Watch History** - Personal viewing history
- **Watch Later** - Save videos for later viewing

### 💰 Monetization
- **Subscription Tiers** - Multiple subscription plans
- **Donations** - Support creators with tips
- **Ad Revenue** - Integrated advertising system
- **Merchandise** - Creator merchandise integration
- **Revenue Analytics** - Detailed earnings tracking

### 🔍 Discovery & Search
- **Advanced Search** - Full-text search with filters
- **Trending Videos** - Algorithm-based trending content
- **Category Browsing** - Organized content discovery
- **Personalized Feed** - Customized content recommendations

### 📱 Modern UI/UX
- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode** - Theme switching
- **Progressive Web App** - Offline support
- **Accessibility** - WCAG 2.1 compliant
- **Real-time Updates** - Live notifications and updates

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15.3.4](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library

### Backend & Database
- **Database**: [Supabase](https://supabase.com/) - PostgreSQL with real-time subscriptions
- **Authentication**: [Supabase Auth](https://supabase.com/auth) - Complete auth solution
- **Storage**: [Supabase Storage](https://supabase.com/storage) - File storage with CDN
- **Real-time**: [Supabase Realtime](https://supabase.com/realtime) - WebSocket connections

### Payments & Monetization
- **Payment Gateway**: [Razorpay](https://razorpay.com/) - Indian payment processing
- **Subscriptions**: Custom subscription management
- **Donations**: Real-time donation system

### Media Processing
- **Video Player**: [React Player](https://github.com/cookpete/react-player) - Universal video player
- **Video Processing**: [FFmpeg.wasm](https://ffmpegwasm.netlify.app/) - Client-side video processing
- **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/) - High-performance image processing

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript
- **Git Hooks**: Husky (optional)
- **Deployment**: Vercel

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** or **pnpm**
- **Git**
- **Supabase Account** ([Sign up here](https://supabase.com/))
- **Razorpay Account** ([Sign up here](https://razorpay.com/))

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Aryam2121/CutieTube_NextJs_.git
   cd CutieTube_NextJs_
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your environment variables:
   \`\`\`env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Razorpay
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME=CutieTube
   \`\`\`

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL scripts in order:
     \`\`\`bash
     # In your Supabase SQL editor, run these files in order:
     # 1. scripts/create-tables.sql
     # 2. scripts/create-storage-buckets.sql
     # 3. scripts/advanced-features-schema.sql
     # 4. scripts/complete-database-schema.sql
     # 5. scripts/rls-policies.sql
     # 6. scripts/functions-and-triggers.sql
     # 7. scripts/payment-schema.sql
     \`\`\`

5. **Initialize shadcn/ui**
   \`\`\`bash
   npx shadcn@latest init
   \`\`\`

6. **Add required shadcn/ui components**
   \`\`\`bash
   npx shadcn@latest add button card input label textarea avatar badge separator tabs dialog dropdown-menu select slider progress toast accordion alert-dialog checkbox collapsible hover-card menubar navigation-menu popover radio-group scroll-area sheet switch toggle toggle-group tooltip
   \`\`\`

7. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

\`\`\`
CutieTube_NextJs_/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # API Routes
│   │   ├── 📁 analytics/            # Analytics endpoints
│   │   ├── 📁 payments/             # Payment processing
│   │   ├── 📁 search/               # Search functionality
│   │   ├── 📁 users/                # User management
│   │   └── 📁 videos/               # Video operations
│   ├── 📁 analytics/                # Analytics dashboard
│   ├── 📁 downloads/                # Downloads page
│   ├── 📁 explore/                  # Explore page
│   ├── 📁 history/                  # Watch history
│   ├── 📁 liked/                    # Liked videos
│   ├── 📁 live/                     # Live streaming
│   ├── 📁 playlists/                # Playlist management
│   ├── 📁 search/                   # Search results
│   ├── 📁 studio/                   # Creator studio
│   ├── 📁 subscriptions/            # Subscriptions page
│   ├── 📁 watch-later/              # Watch later page
│   ├── 📁 your-videos/              # User's videos
│   ├── 📄 globals.css               # Global styles
│   ├── 📄 layout.tsx                # Root layout
│   └── 📄 page.tsx                  # Home page
├── 📁 components/                   # React components
│   ├── 📁 ui/                       # shadcn/ui components
│   ├── 📄 advanced-video-player.tsx # Video player
│   ├── 📄 auth-dialog.tsx           # Authentication modal
│   ├── 📄 auth-provider.tsx         # Auth context
│   ├── 📄 comments.tsx              # Comments system
│   ├── 📄 header.tsx                # Navigation header
│   ├── 📄 live-streaming.tsx        # Live streaming
│   ├── 📄 monetization.tsx          # Monetization features
│   ├── 📄 sidebar.tsx               # Navigation sidebar
│   ├── 📄 theme-provider.tsx        # Theme context
│   ├── 📄 upload-dialog.tsx         # Video upload
│   ├── 📄 video-analytics.tsx       # Video analytics
│   ├── 📄 video-card.tsx            # Video thumbnail
│   ├── 📄 video-info.tsx            # Video information
│   ├── 📄 video-player.tsx          # Basic video player
│   └── 📄 video-recommendations.tsx # Recommendations
├── 📁 lib/                          # Utility libraries
│   ├── 📁 api/                      # API service layers
│   │   ├── 📄 analytics.ts          # Analytics service
│   │   ├── 📄 users.ts              # User service
│   │   └── 📄 videos.ts             # Video service
│   ├── 📁 hooks/                    # Custom React hooks
│   │   ├── 📄 use-api.ts            # API hooks
│   │   └── 📄 use-payments.ts       # Payment hooks
│   ├── 📄 database.ts               # Database utilities
│   ├── 📄 razorpay.ts               # Payment integration
│   ├── 📄 supabase.ts               # Supabase client
│   ├── 📄 supabase-server.ts        # Server-side Supabase
│   └── 📄 utils.ts                  # General utilities
├── 📁 scripts/                      # Database scripts
│   ├── 📄 advanced-features-schema.sql
│   ├── 📄 complete-database-schema.sql
│   ├── 📄 create-storage-buckets.sql
│   ├── 📄 create-tables.sql
│   ├── 📄 functions-and-triggers.sql
│   ├── 📄 payment-schema.sql
│   └── 📄 rls-policies.sql
├── 📁 public/                       # Static assets
├── 📄 .env.example                  # Environment variables template
├── 📄 .gitignore                    # Git ignore rules
├── 📄 next.config.js                # Next.js configuration
├── 📄 package.json                  # Dependencies and scripts
├── 📄 postcss.config.js             # PostCSS configuration
├── 📄 README.md                     # Project documentation
├── 📄 tailwind.config.ts            # Tailwind CSS configuration
└── 📄 tsconfig.json                 # TypeScript configuration
\`\`\`

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | ✅ |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay key ID | ✅ |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | ✅ |
| `NEXT_PUBLIC_APP_URL` | Application URL | ✅ |
| `NEXT_PUBLIC_APP_NAME` | Application name | ❌ |
| `NEXT_PUBLIC_UPLOAD_MAX_SIZE` | Max upload size in bytes | ❌ |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | ❌ |

### Database Setup

1. **Create Supabase Project**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Create a new project
   - Note down your project URL and API keys

2. **Run Database Scripts**
   Execute the SQL scripts in your Supabase SQL editor in this order:
   \`\`\`sql
   -- 1. Basic tables and RLS
   scripts/create-tables.sql
   
   -- 2. Storage buckets
   scripts/create-storage-buckets.sql
   
   -- 3. Advanced features
   scripts/advanced-features-schema.sql
   
   -- 4. Complete schema
   scripts/complete-database-schema.sql
   
   -- 5. Security policies
   scripts/rls-policies.sql
   
   -- 6. Functions and triggers
   scripts/functions-and-triggers.sql
   
   -- 7. Payment tables
   scripts/payment-schema.sql
   \`\`\`

3. **Configure Storage**
   - Enable storage in your Supabase project
   - Set up CORS policies for file uploads

### Razorpay Setup

1. **Create Razorpay Account**
   - Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Complete KYC verification
   - Generate API keys

2. **Configure Webhooks**
   - Add webhook URL: `https://yourdomain.com/api/payments/webhook`
   - Select events: `payment.captured`, `payment.failed`, `subscription.charged`

---

## 📱 API Documentation

### Authentication
All API routes (except public ones) require authentication via Supabase JWT token.

\`\`\`typescript
// Include in headers
Authorization: Bearer <supabase_jwt_token>
\`\`\`

### Video Endpoints

#### Get Videos
```http
GET /api/videos?page=1&limit=20&category=all
#### Upload Video

```plaintext
POST /api/videos
Content-Type: multipart/form-data

{
  "title": "Video Title",
  "description": "Video Description",
  "video": <file>,
  "thumbnail": <file>
}
```

#### Get Video Details

```plaintext
GET /api/videos/[id]
```

### User Endpoints

#### Get User Profile

```plaintext
GET /api/users/[id]
```

#### Subscribe to User

```plaintext
POST /api/users/[id]/subscriptions
```

### Search Endpoints

#### Search Videos

```plaintext
GET /api/search?q=query&type=videos&page=1&limit=20
```

### Analytics Endpoints

#### Get Video Analytics

```plaintext
GET /api/analytics/videos/[id]
```

#### Get Channel Analytics

```plaintext
GET /api/analytics?timeframe=7d
```

### Payment Endpoints

#### Create Payment Order

```plaintext
POST /api/payments/create-order
{
  "amount": 99900,
  "currency": "INR",
  "type": "subscription"
}
```

#### Verify Payment

```plaintext
POST /api/payments/verify
{
  "razorpay_order_id": "order_id",
  "razorpay_payment_id": "payment_id",
  "razorpay_signature": "signature"
}
```

---

## 🎨 UI Components

### Core Components

- **VideoPlayer** - Advanced video player with controls
- **VideoCard** - Video thumbnail with metadata
- **CommentSystem** - Nested comments with reactions
- **SubscriptionButton** - Subscribe/unsubscribe functionality
- **PlaylistManager** - Create and manage playlists
- **LiveStreaming** - Live streaming interface
- **Analytics Dashboard** - Creator analytics
- **Payment Components** - Subscription and donation forms


### Design System

- **Colors**: Customizable theme with dark/light mode
- **Typography**: Inter font family with responsive sizing
- **Spacing**: Consistent spacing scale (4px base)
- **Breakpoints**: Mobile-first responsive design
- **Animations**: Smooth transitions and micro-interactions


---

## 💳 Payment Integration

### Razorpay Integration

CutieTube uses Razorpay for payment processing in India:

#### Supported Payment Methods

- Credit/Debit Cards
- Net Banking
- UPI
- Wallets (Paytm, PhonePe, etc.)
- EMI options


#### Subscription Plans

```typescript
const subscriptionPlans = [
{
id: 'basic',
name: 'Basic',
price: 99,
features: ['Ad-free viewing', 'HD quality']
},
{
id: 'premium',
name: 'Premium',
price: 199,
features: ['4K quality', 'Offline downloads', 'Early access']
},
{
id: 'creator',
name: 'Creator',
price: 499,
features: ['Analytics', 'Live streaming', 'Monetization']
}
]

```plaintext

#### Donation System
- One-time donations
- Recurring donations
- Custom amounts
- Creator revenue sharing

---

## 📊 Analytics

### Video Analytics
- View count and duration
- Audience retention graphs
- Geographic distribution
- Traffic sources
- Engagement metrics

### Channel Analytics
- Subscriber growth
- Revenue tracking
- Top performing content
- Audience demographics
- Watch time analytics

### Real-time Metrics
- Live viewer count
- Real-time comments
- Concurrent streams
- Revenue updates

---

## 🔐 Authentication

### Supabase Auth Features
- Email/password authentication
- Social login (Google, GitHub, etc.)
- Magic link authentication
- Phone number verification
- Multi-factor authentication

### User Roles
- **Viewer** - Basic viewing permissions
- **Creator** - Upload and monetization features
- **Moderator** - Content moderation tools
- **Admin** - Full platform access

### Security Features
- Row Level Security (RLS)
- JWT token authentication
- CSRF protection
- Rate limiting
- Content moderation

---

## 📱 Mobile Support

### Progressive Web App (PWA)
- Offline video caching
- Push notifications
- App-like experience
- Background sync

### Mobile Features
- Touch gestures for video control
- Picture-in-picture mode
- Mobile-optimized upload
- Responsive design
- Native sharing

### Performance Optimizations
- Lazy loading
- Image optimization
- Video compression
- CDN delivery
- Caching strategies

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   \`\`\`bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   \`\`\`

2. **Environment Variables**
   Add all environment variables in Vercel dashboard

3. **Domain Configuration**
   - Add custom domain
   - Configure DNS settings
   - Enable HTTPS

### Manual Deployment

1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start production server**
   \`\`\`bash
   npm start
   \`\`\`

### Docker Deployment

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🧪 Testing

### Running Tests

```bash

# Unit tests

npm run test

# E2E tests

npm run test:e2e

# Coverage report

npm run test:coverage

```plaintext

### Testing Strategy
- Unit tests for utilities and hooks
- Integration tests for API routes
- E2E tests for critical user flows
- Visual regression testing
- Performance testing

---

## 🔧 Development

### Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking

# Database
npm run db:generate-types  # Generate TypeScript types from Supabase
```

### Development Workflow

1. **Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
```
2. **Make Changes**

1. Follow TypeScript best practices
2. Use consistent naming conventions
3. Add proper error handling
4. Write tests for new features



3. **Test Changes**
```bash
npm run lint
npm run type-check
npm run test
```
4. **Commit Changes**
```bash
git add .
git commit -m "feat: add your feature description"
```
5. **Push and Create PR**
```bash
git push origin feature/your-feature-name
```


---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests if applicable**
5. **Ensure all tests pass**
6. **Submit a pull request**


### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep components small and focused


### Reporting Issues

- Use the issue tracker for bug reports
- Include steps to reproduce
- Provide system information
- Add screenshots if applicable


---

## 📈 Roadmap

### Phase 1 (Current)

- ✅ Core video platform
- ✅ User authentication
- ✅ Payment integration
- ✅ Basic analytics


### Phase 2 (Q2 2024)

- 🔄 Mobile app (React Native)
- 🔄 Advanced AI recommendations
- 🔄 Live streaming enhancements
- 🔄 Creator tools expansion


### Phase 3 (Q3 2024)

- ⏳ Multi-language support
- ⏳ Advanced moderation tools
- ⏳ API for third-party integrations
- ⏳ Enterprise features


### Phase 4 (Q4 2024)

- ⏳ VR/AR content support
- ⏳ Blockchain integration
- ⏳ Advanced analytics ML
- ⏳ Global CDN expansion


---

## 🏆 Performance

### Core Web Vitals

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)


### Optimization Techniques

- Next.js Image Optimization
- Dynamic imports and code splitting
- Service Worker caching
- Database query optimization
- CDN for static assets


---

## 🔒 Security

### Security Measures

- HTTPS everywhere
- Content Security Policy (CSP)
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting
- Input validation and sanitization


### Data Privacy

- GDPR compliant
- User data encryption
- Secure file uploads
- Privacy controls
- Data retention policies


---

## 📞 Support

### Getting Help

- 📖 **Documentation**: Check this README and inline code comments
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Aryam2121/CutieTube_NextJs_/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Aryam2121/CutieTube_NextJs_/discussions)
- 📧 **Email**: [support@cutietube.com](mailto:support@cutietube.com)


### Community

- 🌟 **Star the repo** if you find it useful
- 🐦 **Follow us on Twitter**: [@CutieTube](https://twitter.com/cutietube)
- 💼 **LinkedIn**: [CutieTube](https://linkedin.com/company/cutietube)


---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Supabase](https://supabase.com/) - The open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Razorpay](https://razorpay.com/) - Payment gateway for India
- [Vercel](https://vercel.com/) - Platform for frontend frameworks
---
`<div align="center">
  <p>Made with ❤️ by the CutieTube Team</p>
  <p>
    <a href="https://cutietube.vercel.app">🌐 Website</a> •
    <a href="https://github.com/Aryam2121/CutieTube_NextJs_">📱 GitHub</a> •
    <a href="https://twitter.com/cutietube">🐦 Twitter</a>
  </p>
</div>
````
