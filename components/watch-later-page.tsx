"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Play, Shuffle, MoreVertical, Trash2, Share2, Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const watchLaterVideos = [
  {
    id: "1",
    title: "Advanced TypeScript Patterns for React",
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "32:15",
    views: 245000,
    created_at: "2024-01-15T10:00:00Z",
    addedAt: "2024-01-16T14:30:00Z",
    profiles: { username: "TypeScriptPro", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: "2",
    title: "Building Scalable Node.js Applications",
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "45:30",
    views: 180000,
    created_at: "2024-01-14T15:30:00Z",
    addedAt: "2024-01-15T20:15:00Z",
    profiles: { username: "NodeMaster", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: "3",
    title: "Docker for Developers - Complete Guide",
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "28:45",
    views: 320000,
    created_at: "2024-01-13T12:00:00Z",
    addedAt: "2024-01-14T16:45:00Z",
    profiles: { username: "DevOpsGuru", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
]

export function WatchLaterPage() {
  const [selectedVideos, setSelectedVideos] = useState<string[]>([])

  const totalDuration = watchLaterVideos.reduce((total, video) => {
    const [minutes, seconds] = video.duration.split(":").map(Number)
    return total + minutes + seconds / 60
  }, 0)

  const formatTotalDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = Math.floor(minutes % 60)
    return `${hours}h ${mins}m`
  }

  const formatAddedTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Added today"
    if (diffDays === 2) return "Added yesterday"
    if (diffDays <= 7) return `Added ${diffDays - 1} days ago`
    return `Added ${date.toLocaleDateString()}`
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Clock className="h-8 w-8" />
            Watch Later
          </h1>
          <p className="text-muted-foreground">Videos you've saved for later viewing</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            {watchLaterVideos.length} videos • {formatTotalDuration(totalDuration)}
          </Badge>
        </div>
      </div>

      {watchLaterVideos.length > 0 ? (
        <>
          {/* Playlist Controls */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Watch Later Playlist</h2>
                    <p className="text-muted-foreground">
                      {watchLaterVideos.length} videos • {formatTotalDuration(totalDuration)} total
                    </p>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share playlist
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download all
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear all
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Videos List */}
          <div className="space-y-4">
            {watchLaterVideos.map((video, index) => (
              <Card key={video.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-8 text-muted-foreground font-mono text-sm">
                      {index + 1}
                    </div>

                    <div className="relative flex-shrink-0">
                      <img
                        src={video.thumbnail_url || "/placeholder.svg"}
                        alt={video.title}
                        className="w-40 h-24 object-cover rounded-lg"
                      />
                      <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs">
                        {video.duration}
                      </Badge>
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-lg line-clamp-2 mb-2">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{video.profiles.username}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{video.views.toLocaleString()} views</span>
                        <span>•</span>
                        <span>{formatAddedTime(video.addedAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Play now
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <Clock className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
          <h3 className="text-2xl font-semibold mb-4">No videos saved yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            When you find videos you want to watch later, you can save them here. Look for the "Save to Watch Later"
            option on any video.
          </p>
          <Button>Explore Videos</Button>
        </div>
      )}
    </div>
  )
}
