"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VideoCard } from "@/components/video-card"
import { Input } from "@/components/ui/input"
import { ThumbsUp, Play, Shuffle, Search, Filter, Heart } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const likedVideos = [
  {
    id: "1",
    title: "The Art of Clean Code - Programming Best Practices",
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "24:30",
    views: 890000,
    created_at: "2024-01-15T10:00:00Z",
    likedAt: "2024-01-16T14:30:00Z",
    profiles: { username: "CodeArtist", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: "2",
    title: "Machine Learning Explained Simply",
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "18:45",
    views: 1200000,
    created_at: "2024-01-14T15:30:00Z",
    likedAt: "2024-01-15T20:15:00Z",
    profiles: { username: "MLExpert", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: "3",
    title: "Stunning Photography Techniques for Beginners",
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "15:20",
    views: 650000,
    created_at: "2024-01-13T12:00:00Z",
    likedAt: "2024-01-14T16:45:00Z",
    profiles: { username: "PhotoPro", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
]

export function LikedVideosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  const formatLikedTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Liked today"
    if (diffDays === 2) return "Liked yesterday"
    if (diffDays <= 7) return `Liked ${diffDays - 1} days ago`
    return `Liked ${date.toLocaleDateString()}`
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ThumbsUp className="h-8 w-8" />
            Liked Videos
          </h1>
          <p className="text-muted-foreground">Videos you've liked and enjoyed</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Heart className="h-3 w-3" />
            {likedVideos.length} videos liked
          </Badge>
        </div>
      </div>

      {likedVideos.length > 0 ? (
        <>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search liked videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently liked</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="views">Most viewed</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Playlist Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <ThumbsUp className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Liked Videos</h2>
                    <p className="text-muted-foreground">{likedVideos.length} videos you've liked</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="gap-2">
                    <Play className="h-4 w-4" />
                    Play All
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Shuffle className="h-4 w-4" />
                    Shuffle
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {likedVideos.map((video) => (
              <div key={video.id} className="space-y-2">
                <VideoCard video={video} />
                <p className="text-xs text-muted-foreground px-1">{formatLikedTime(video.likedAt)}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <ThumbsUp className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
          <h3 className="text-2xl font-semibold mb-4">No liked videos yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            When you like videos, they'll appear here. Start exploring and like videos you enjoy!
          </p>
          <Button>Discover Videos</Button>
        </div>
      )}
    </div>
  )
}
