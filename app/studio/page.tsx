"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { VideoAnalytics } from "@/components/video-analytics"
import { Monetization } from "@/components/monetization"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Video,
  BarChart3,
  DollarSign,
  MessageSquare,
  Users,
  Settings,
  Upload,
  TrendingUp,
  Eye,
  ThumbsUp,
  Clock,
  Plus,
} from "lucide-react"
import Link from "next/link"

// Mock data
const channelStats = {
  subscribers: 2500000,
  totalViews: 125000000,
  totalVideos: 342,
  totalRevenue: 45230.5,
  last28DaysViews: 5420000,
  last28DaysSubscribers: 45000,
  last28DaysRevenue: 3420.75,
}

const recentVideos = [
  {
    id: "1",
    title: "Complete Next.js Tutorial",
    thumbnail: "/placeholder.svg?text=Video1",
    views: 125000,
    likes: 5400,
    comments: 234,
    uploadDate: "2 days ago",
    status: "published",
  },
  {
    id: "2",
    title: "React Performance Tips",
    thumbnail: "/placeholder.svg?text=Video2",
    views: 89000,
    likes: 3200,
    comments: 156,
    uploadDate: "5 days ago",
    status: "published",
  },
  {
    id: "3",
    title: "TypeScript Advanced Patterns",
    thumbnail: "/placeholder.svg?text=Video3",
    views: 67000,
    likes: 2800,
    comments: 98,
    uploadDate: "1 week ago",
    status: "published",
  },
]

export default function StudioPage() {
  const [selectedTab, setSelectedTab] = useState("dashboard")

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="border-b">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Studio</h1>
            <Button asChild>
              <Link href="/upload">
                <Upload className="mr-2 h-4 w-4" />
                Create
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Studio Sidebar */}
        <aside className="hidden lg:block w-64 border-r bg-background h-[calc(100vh-8rem)] sticky top-16">
          <nav className="p-4 space-y-1">
            {[
              { icon: LayoutDashboard, label: "Dashboard", value: "dashboard" },
              { icon: Video, label: "Content", value: "content" },
              { icon: BarChart3, label: "Analytics", value: "analytics" },
              { icon: MessageSquare, label: "Comments", value: "comments" },
              { icon: Users, label: "Audience", value: "audience" },
              { icon: DollarSign, label: "Monetization", value: "monetization" },
              { icon: Settings, label: "Settings", value: "settings" },
            ].map((item) => (
              <Button
                key={item.value}
                variant={selectedTab === item.value ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedTab(item.value)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-[1400px] mx-auto p-6">
            {selectedTab === "dashboard" && (
              <div className="space-y-6">
                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatNumber(channelStats.subscribers)}</div>
                      <p className="text-xs text-muted-foreground">
                        +{formatNumber(channelStats.last28DaysSubscribers)} in last 28 days
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatNumber(channelStats.totalViews)}</div>
                      <p className="text-xs text-muted-foreground">
                        +{formatNumber(channelStats.last28DaysViews)} in last 28 days
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
                      <Video className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{channelStats.totalVideos}</div>
                      <p className="text-xs text-muted-foreground">Across all playlists</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Estimated Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${channelStats.totalRevenue.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        +${channelStats.last28DaysRevenue.toLocaleString()} in last 28 days
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Manage your channel efficiently</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-3">
                    <Button variant="outline" className="h-24 flex-col gap-2" asChild>
                      <Link href="/upload">
                        <Upload className="h-6 w-6" />
                        Upload Video
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2">
                      <Plus className="h-6 w-6" />
                      Create Post
                    </Button>
                    <Button variant="outline" className="h-24 flex-col gap-2">
                      <TrendingUp className="h-6 w-6" />
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Videos */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Videos</CardTitle>
                        <CardDescription>Your latest uploads and their performance</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/studio?tab=content">View All</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentVideos.map((video) => (
                        <div key={video.id} className="flex gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-40 h-24 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold line-clamp-1">{video.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{video.uploadDate}</p>
                              </div>
                              <Badge variant={video.status === "published" ? "default" : "secondary"}>
                                {video.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {formatNumber(video.views)}
                              </span>
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                {formatNumber(video.likes)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                {video.comments}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedTab === "analytics" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Analytics</h2>
                <VideoAnalytics />
              </div>
            )}

            {selectedTab === "monetization" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Monetization</h2>
                <Monetization />
              </div>
            )}

            {selectedTab === "content" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Content Management</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Your Videos</CardTitle>
                    <CardDescription>Manage all your uploaded videos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Video management interface coming soon...</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedTab === "comments" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Comments</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Comments</CardTitle>
                    <CardDescription>View and moderate comments on your videos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Comment moderation interface coming soon...</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedTab === "audience" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Audience</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Audience Insights</CardTitle>
                    <CardDescription>Learn more about your viewers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Audience analytics coming soon...</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Channel Settings</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Manage your channel preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Settings interface coming soon...</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
