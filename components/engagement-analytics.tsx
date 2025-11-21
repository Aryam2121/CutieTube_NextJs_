"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  TrendingUp,
  Users,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  Clock,
  Target,
  Zap,
  Award,
  BarChart3,
  Download,
  Filter,
  Calendar,
  TrendingDown,
  Minus,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Video {
  id: string
  title: string
  thumbnail: string
  views: number
  likes: number
  comments: number
  shares: number
  watchTime: number // in minutes
  retention: number // percentage
  clickThroughRate: number // percentage
  avgViewDuration: number // in minutes
  impressions: number
  earnings: number
  publishedAt: Date
}

interface EngagementMetrics {
  totalViews: number
  totalLikes: number
  totalComments: number
  totalShares: number
  totalWatchTime: number
  avgEngagementRate: number
  subscriberGrowth: number
  topVideo: Video
  trending: "up" | "down" | "stable"
}

export function EngagementAnalytics() {
  const [timeRange, setTimeRange] = useState<"7d" | "28d" | "90d" | "365d">("28d")
  const [metrics, setMetrics] = useState<EngagementMetrics | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [sortBy, setSortBy] = useState<"views" | "engagement" | "earnings">("views")

  // Mock data
  useEffect(() => {
    const mockVideos: Video[] = [
      {
        id: "1",
        title: "How to Build a Modern Web App in 2024",
        thumbnail: "/placeholder.svg",
        views: 125000,
        likes: 8500,
        comments: 450,
        shares: 1200,
        watchTime: 85000,
        retention: 68,
        clickThroughRate: 12.5,
        avgViewDuration: 8.5,
        impressions: 450000,
        earnings: 850,
        publishedAt: new Date("2024-01-15"),
      },
      {
        id: "2",
        title: "React 19 New Features Explained",
        thumbnail: "/placeholder.svg",
        views: 98000,
        likes: 6800,
        comments: 320,
        shares: 890,
        watchTime: 65000,
        retention: 72,
        clickThroughRate: 11.8,
        avgViewDuration: 7.2,
        impressions: 380000,
        earnings: 680,
        publishedAt: new Date("2024-01-20"),
      },
      {
        id: "3",
        title: "TypeScript Advanced Patterns",
        thumbnail: "/placeholder.svg",
        views: 78000,
        likes: 5200,
        comments: 280,
        shares: 650,
        watchTime: 52000,
        retention: 65,
        clickThroughRate: 10.2,
        avgViewDuration: 6.8,
        impressions: 320000,
        earnings: 520,
        publishedAt: new Date("2024-01-25"),
      },
    ]

    setVideos(mockVideos)

    const mockMetrics: EngagementMetrics = {
      totalViews: mockVideos.reduce((sum, v) => sum + v.views, 0),
      totalLikes: mockVideos.reduce((sum, v) => sum + v.likes, 0),
      totalComments: mockVideos.reduce((sum, v) => sum + v.comments, 0),
      totalShares: mockVideos.reduce((sum, v) => sum + v.shares, 0),
      totalWatchTime: mockVideos.reduce((sum, v) => sum + v.watchTime, 0),
      avgEngagementRate: 8.5,
      subscriberGrowth: 1250,
      topVideo: mockVideos[0],
      trending: "up",
    }

    setMetrics(mockMetrics)
  }, [timeRange])

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "stable":
        return <Minus className="h-4 w-4 text-yellow-500" />
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = Math.floor(minutes % 60)
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  if (!metrics) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Engagement Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your audience engagement and video performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Last {timeRange === "7d" ? "7 days" : timeRange === "28d" ? "28 days" : timeRange === "90d" ? "90 days" : "year"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTimeRange("7d")}>
                Last 7 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("28d")}>
                Last 28 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("90d")}>
                Last 90 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("365d")}>
                Last year
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(metrics.totalViews)}</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                {getTrendIcon(metrics.trending)}
                <span>+12.5% from last period</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.avgEngagementRate.toFixed(1)}%</div>
              <Progress value={metrics.avgEngagementRate * 10} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatDuration(metrics.totalWatchTime)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Avg: {formatDuration(metrics.totalWatchTime / videos.length)} per video
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Subscriber Growth</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{formatNumber(metrics.subscriberGrowth)}
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span>Growing steadily</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Engagement Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{formatNumber(metrics.totalLikes)}</div>
                <p className="text-xs text-muted-foreground">
                  {((metrics.totalLikes / metrics.totalViews) * 100).toFixed(1)}% like rate
                </p>
              </div>
              <ThumbsUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{formatNumber(metrics.totalComments)}</div>
                <p className="text-xs text-muted-foreground">
                  {((metrics.totalComments / metrics.totalViews) * 100).toFixed(2)}% comment rate
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Shares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{formatNumber(metrics.totalShares)}</div>
                <p className="text-xs text-muted-foreground">
                  {((metrics.totalShares / metrics.totalViews) * 100).toFixed(2)}% share rate
                </p>
              </div>
              <Share2 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Video */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Top Performing Video</CardTitle>
              <CardDescription>Your best video this period</CardDescription>
            </div>
            <Award className="h-5 w-5 text-yellow-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <img
              src={metrics.topVideo.thumbnail}
              alt={metrics.topVideo.title}
              className="w-40 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{metrics.topVideo.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Views</p>
                  <p className="font-semibold">{formatNumber(metrics.topVideo.views)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Retention</p>
                  <p className="font-semibold">{metrics.topVideo.retention}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">CTR</p>
                  <p className="font-semibold">{metrics.topVideo.clickThroughRate}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Earnings</p>
                  <p className="font-semibold">${metrics.topVideo.earnings}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Performance Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Video Performance</CardTitle>
              <CardDescription>Detailed metrics for all videos</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Sort by {sortBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy("views")}>
                  Sort by Views
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("engagement")}>
                  Sort by Engagement
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("earnings")}>
                  Sort by Earnings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="p-4 rounded-lg border transition-colors"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-32 h-20 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium mb-2 truncate">{video.title}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Views</p>
                        <p className="font-semibold">{formatNumber(video.views)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Engagement</p>
                        <p className="font-semibold">
                          {(
                            ((video.likes + video.comments + video.shares) / video.views) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Retention</p>
                        <Progress value={video.retention} className="mt-1" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">CTR</p>
                        <p className="font-semibold">{video.clickThroughRate}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-semibold">${video.earnings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
