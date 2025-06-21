"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, Trash2, Clock, Filter, Eye, MoreVertical } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const watchHistory = [
  {
    id: "1",
    title: "Advanced React Patterns You Should Know",
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "25:30",
    views: 450000,
    created_at: "2024-01-15T10:00:00Z",
    watchedAt: "2024-01-16T14:30:00Z",
    watchProgress: 85,
    profiles: { username: "ReactMaster", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: "2",
    title: "Building a Full-Stack App with Next.js",
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "45:20",
    views: 680000,
    created_at: "2024-01-14T15:30:00Z",
    watchedAt: "2024-01-15T20:15:00Z",
    watchProgress: 100,
    profiles: { username: "WebDevPro", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: "3",
    title: "CSS Grid vs Flexbox - Complete Guide",
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "18:45",
    views: 320000,
    created_at: "2024-01-13T12:00:00Z",
    watchedAt: "2024-01-14T16:45:00Z",
    watchProgress: 60,
    profiles: { username: "CSSGuru", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
]

export function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const formatWatchTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-green-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Watch History</h1>
          <p className="text-muted-foreground">Keep track of videos you've watched</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Eye className="h-3 w-3" />
            {watchHistory.length} videos watched
          </Badge>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your watch history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All videos</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="partial">Partially watched</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This week</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most recent</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
              <SelectItem value="views">Most viewed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Watch Time</p>
                <p className="text-lg font-semibold">24h 35m</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Videos Watched</p>
                <p className="text-lg font-semibold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-lg font-semibold">12 videos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-lg font-semibold">89%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Trash2 className="h-4 w-4" />
            Clear History
          </Button>
        </div>

        <div className="space-y-4">
          {watchHistory.map((video) => (
            <Card key={video.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={video.thumbnail_url || "/placeholder.svg"}
                      alt={video.title}
                      className="w-40 h-24 object-cover rounded-lg"
                    />
                    <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs">{video.duration}</Badge>
                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 rounded-b-lg">
                      <div
                        className={`h-full ${getProgressColor(video.watchProgress)} rounded-b-lg`}
                        style={{ width: `${video.watchProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-lg line-clamp-2 mb-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{video.profiles.username}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{video.views.toLocaleString()} views</span>
                      <span>•</span>
                      <span>Watched {formatWatchTime(video.watchedAt)}</span>
                      <span>•</span>
                      <span>{video.watchProgress}% completed</span>
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
                        <DropdownMenuItem>Remove from history</DropdownMenuItem>
                        <DropdownMenuItem>Add to Watch Later</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {watchHistory.length === 0 && (
        <div className="text-center py-12">
          <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No watch history yet</h3>
          <p className="text-muted-foreground mb-4">Videos you watch will appear here</p>
          <Button>Explore Videos</Button>
        </div>
      )}
    </div>
  )
}
