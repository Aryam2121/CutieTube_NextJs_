"use client"

import { useState, useEffect } from "react"
import { VideoCard } from "./video-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  Users,
  Clock,
  Tag,
  BarChart3,
  Sparkles,
  Target,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Video {
  id: number
  title: string
  channel: string
  channelAvatar?: string
  views: string
  uploadDate: string
  duration: string
  thumbnail: string
  verified?: boolean
  tags?: string[]
  category?: string
}

interface RecommendationReason {
  type: "watch-history" | "trending" | "subscriptions" | "similar-content" | "new-creator" | "popular-topic"
  label: string
  icon: React.ReactNode
  color: string
}

interface SmartRecommendation extends Video {
  score: number
  reasons: RecommendationReason[]
  matchPercentage: number
}

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([])
  const [activeCategory, setActiveCategory] = useState<"for-you" | "trending" | "similar" | "new">("for-you")
  const [userPreferences, setUserPreferences] = useState({
    watchedCategories: ["Technology", "Programming", "Web Development"],
    favoriteChannels: ["CodeMaster", "TechGuru", "ReactExpert"],
    avgWatchTime: "12 minutes",
    engagementScore: 8.5,
  })

  useEffect(() => {
    // Simulate AI-powered recommendations
    const mockRecommendations: SmartRecommendation[] = [
      {
        id: 1,
        title: "Advanced React Patterns You Should Know",
        channel: "ReactExpert",
        channelAvatar: "/placeholder.svg",
        views: "450K views",
        uploadDate: "2 days ago",
        duration: "15:32",
        thumbnail: "/placeholder.svg",
        verified: true,
        tags: ["React", "JavaScript", "Web Dev"],
        category: "Programming",
        score: 9.5,
        matchPercentage: 95,
        reasons: [
          {
            type: "watch-history",
            label: "Based on videos you've watched",
            icon: <Clock className="h-3 w-3" />,
            color: "text-blue-500",
          },
          {
            type: "similar-content",
            label: "Similar to liked videos",
            icon: <Sparkles className="h-3 w-3" />,
            color: "text-purple-500",
          },
        ],
      },
      {
        id: 2,
        title: "Building Scalable Microservices with Node.js",
        channel: "BackendMaster",
        channelAvatar: "/placeholder.svg",
        views: "320K views",
        uploadDate: "1 day ago",
        duration: "22:45",
        thumbnail: "/placeholder.svg",
        verified: true,
        tags: ["Node.js", "Backend", "Architecture"],
        category: "Technology",
        score: 9.2,
        matchPercentage: 92,
        reasons: [
          {
            type: "trending",
            label: "Trending in your area",
            icon: <TrendingUp className="h-3 w-3" />,
            color: "text-green-500",
          },
          {
            type: "popular-topic",
            label: "Popular topic",
            icon: <Target className="h-3 w-3" />,
            color: "text-orange-500",
          },
        ],
      },
      {
        id: 3,
        title: "TypeScript 5.0 - What's New and Exciting",
        channel: "TypeScriptPro",
        channelAvatar: "/placeholder.svg",
        views: "180K views",
        uploadDate: "3 hours ago",
        duration: "18:20",
        thumbnail: "/placeholder.svg",
        verified: false,
        tags: ["TypeScript", "JavaScript", "Programming"],
        category: "Technology",
        score: 8.8,
        matchPercentage: 88,
        reasons: [
          {
            type: "new-creator",
            label: "New creator you might like",
            icon: <Zap className="h-3 w-3" />,
            color: "text-yellow-500",
          },
          {
            type: "watch-history",
            label: "Matches your interests",
            icon: <Tag className="h-3 w-3" />,
            color: "text-pink-500",
          },
        ],
      },
      {
        id: 4,
        title: "CSS Grid and Flexbox - Master Layout",
        channel: "CSSWizard",
        channelAvatar: "/placeholder.svg",
        views: "520K views",
        uploadDate: "1 week ago",
        duration: "25:15",
        thumbnail: "/placeholder.svg",
        verified: true,
        tags: ["CSS", "Web Design", "Frontend"],
        category: "Web Development",
        score: 8.5,
        matchPercentage: 85,
        reasons: [
          {
            type: "subscriptions",
            label: "From channels you follow",
            icon: <Users className="h-3 w-3" />,
            color: "text-red-500",
          },
        ],
      },
      {
        id: 5,
        title: "Machine Learning Basics for Developers",
        channel: "AIGuru",
        channelAvatar: "/placeholder.svg",
        views: "890K views",
        uploadDate: "4 days ago",
        duration: "30:42",
        thumbnail: "/placeholder.svg",
        verified: true,
        tags: ["AI", "Machine Learning", "Python"],
        category: "Technology",
        score: 8.2,
        matchPercentage: 82,
        reasons: [
          {
            type: "trending",
            label: "Trending worldwide",
            icon: <TrendingUp className="h-3 w-3" />,
            color: "text-green-500",
          },
          {
            type: "popular-topic",
            label: "Expanding your interests",
            icon: <Brain className="h-3 w-3" />,
            color: "text-indigo-500",
          },
        ],
      },
    ]

    setRecommendations(mockRecommendations)
  }, [activeCategory])

  const getReasonBadge = (reason: RecommendationReason) => (
    <Badge variant="secondary" className="text-xs">
      <span className={reason.color}>{reason.icon}</span>
      <span className="ml-1">{reason.label}</span>
    </Badge>
  )

  return (
    <div className="space-y-6">
      {/* Header with AI Branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 p-6 border"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                AI-Powered Recommendations
                <Sparkles className="h-5 w-5 text-yellow-500" />
              </h1>
              <p className="text-sm text-muted-foreground">
                Personalized content based on your viewing habits and preferences
              </p>
            </div>
          </div>
        </div>
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 animate-pulse" />
      </motion.div>

      {/* User Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Your Viewing Profile
          </CardTitle>
          <CardDescription>How our AI understands your preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Top Categories</p>
              <div className="flex flex-wrap gap-1">
                {userPreferences.watchedCategories.map((cat) => (
                  <Badge key={cat} variant="outline" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Favorite Channels</p>
              <p className="font-semibold">{userPreferences.favoriteChannels.length} channels</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Watch Time</p>
              <p className="font-semibold">{userPreferences.avgWatchTime}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Engagement Score</p>
              <div className="flex items-center gap-2">
                <p className="font-semibold">{userPreferences.engagementScore}/10</p>
                <Badge variant="secondary" className="text-xs">High</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="for-you">
            <Sparkles className="h-4 w-4 mr-2" />
            For You
          </TabsTrigger>
          <TabsTrigger value="trending">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="similar">
            <Target className="h-4 w-4 mr-2" />
            Similar
          </TabsTrigger>
          <TabsTrigger value="new">
            <Zap className="h-4 w-4 mr-2" />
            New for You
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendations.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Match Score Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <Badge
                    variant="default"
                    className="bg-primary/90 backdrop-blur-sm text-xs font-bold"
                  >
                    <Brain className="h-3 w-3 mr-1" />
                    {video.matchPercentage}% Match
                  </Badge>
                </div>

                {/* Video Card */}
                <VideoCard
                  video={{
                    id: video.id.toString(),
                    title: video.title,
                    thumbnail: video.thumbnail,
                    duration: video.duration,
                    views: parseInt(video.views.replace(/[^0-9]/g, '')) || 0,
                    uploadedAt: video.uploadDate,
                    channel: {
                      name: video.channel,
                      avatar: video.channelAvatar || '/placeholder.svg',
                      isVerified: video.verified,
                    },
                  }}
                  layout="grid"
                />

                {/* Recommendation Reasons */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {video.reasons.slice(0, 2).map((reason, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {getReasonBadge(reason)}
                    </motion.div>
                  ))}
                </div>

                {/* Tags */}
                {video.tags && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {video.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Why These Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How Recommendations Work</CardTitle>
          <CardDescription>Understanding our AI algorithm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Watch History</h4>
                <p className="text-sm text-muted-foreground">
                  Analyzes videos you've watched and completed
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Engagement Patterns</h4>
                <p className="text-sm text-muted-foreground">
                  Tracks likes, comments, and shares
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Trending Topics</h4>
                <p className="text-sm text-muted-foreground">
                  Includes popular content in your interests
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
