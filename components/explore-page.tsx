"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoCard } from "@/components/video-card"
import {
  TrendingUp,
  FlameIcon as Fire,
  Music,
  Film,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Globe,
  Users,
} from "lucide-react"

const trendingVideos = [
  {
    id: "1",
    title: "The Future of AI in 2024 - Mind-Blowing Predictions",
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "12:45",
    views: 2500000,
    created_at: "2024-01-15T10:00:00Z",
    profiles: { username: "TechVisionary", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: "2",
    title: "Epic Gaming Montage - Best Moments 2024",
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "8:32",
    views: 1800000,
    created_at: "2024-01-14T15:30:00Z",
    profiles: { username: "GameMaster", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: "3",
    title: "Cooking the Perfect Pasta - Italian Chef Secrets",
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "15:20",
    views: 950000,
    created_at: "2024-01-13T12:00:00Z",
    profiles: { username: "ChefMarco", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
]

const categories = [
  { name: "Music", icon: Music, color: "bg-red-500", count: "2.5M videos" },
  { name: "Gaming", icon: Gamepad2, color: "bg-blue-500", count: "1.8M videos" },
  { name: "Movies", icon: Film, color: "bg-purple-500", count: "890K videos" },
  { name: "News", icon: Newspaper, color: "bg-green-500", count: "1.2M videos" },
  { name: "Sports", icon: Trophy, color: "bg-orange-500", count: "750K videos" },
  { name: "Learning", icon: Lightbulb, color: "bg-yellow-500", count: "1.1M videos" },
]

const trendingTopics = [
  { tag: "#AI2024", views: "15M views" },
  { tag: "#GameReview", views: "8.5M views" },
  { tag: "#CookingTips", views: "12M views" },
  { tag: "#TechNews", views: "6.2M views" },
  { tag: "#Fitness", views: "9.8M views" },
  { tag: "#Travel", views: "11M views" },
]

export function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("trending")

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Discover Amazing Content</h1>
          <p className="text-xl opacity-90 mb-6">Explore trending videos, popular creators, and exciting new content</p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Fire className="mr-2 h-5 w-5" />
              What's Trending
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Globe className="mr-2 h-5 w-5" />
              Global Feed
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
          <div className="w-full h-full bg-white rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Categories Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Trending Topics</h2>
        <div className="flex flex-wrap gap-3">
          {trendingTopics.map((topic) => (
            <Badge
              key={topic.tag}
              variant="secondary"
              className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
            >
              {topic.tag} • {topic.views}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="trending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="trending">
            <TrendingUp className="mr-2 h-4 w-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="popular">
            <Fire className="mr-2 h-4 w-4" />
            Popular
          </TabsTrigger>
          <TabsTrigger value="recent">
            <Globe className="mr-2 h-4 w-4" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="creators">
            <Users className="mr-2 h-4 w-4" />
            Creators
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creators" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div>
                      <h3 className="font-semibold">Creator {i}</h3>
                      <p className="text-sm text-muted-foreground">2.5M subscribers</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Creating amazing content about technology, gaming, and lifestyle.
                  </p>
                  <Button className="w-full">Subscribe</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
