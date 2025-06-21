"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Video,
  Eye,
  ThumbsUp,
  MessageSquare,
  MoreVertical,
  Edit,
  Trash2,
  Share2,
  BarChart3,
  Calendar,
  TrendingUp,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const userVideos = [
  {
    id: "1",
    title: "How to Build a YouTube Clone with Next.js",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "28:45",
    views: 125000,
    likes: 5200,
    comments: 380,
    uploadDate: "2024-01-15T10:00:00Z",
    status: "published",
    visibility: "public",
  },
  {
    id: "2",
    title: "React Hooks Complete Tutorial",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "35:20",
    views: 89000,
    likes: 3800,
    comments: 290,
    uploadDate: "2024-01-10T15:30:00Z",
    status: "published",
    visibility: "public",
  },
  {
    id: "3",
    title: "CSS Grid Layout Masterclass",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "22:15",
    views: 67000,
    likes: 2900,
    comments: 180,
    uploadDate: "2024-01-05T12:00:00Z",
    status: "draft",
    visibility: "private",
  },
]

export function YourVideosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500"
      case "draft":
        return "bg-yellow-500"
      case "processing":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Videos</h1>
          <p className="text-muted-foreground">Manage and track your content</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Video
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Videos</p>
                <p className="text-2xl font-bold">{userVideos.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{formatNumber(281000)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Likes</p>
                <p className="text-2xl font-bold">{formatNumber(11900)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Comments</p>
                <p className="text-2xl font-bold">{formatNumber(850)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="videos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="videos">
            <Video className="mr-2 h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="drafts">
            <Edit className="mr-2 h-4 w-4" />
            Drafts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search your videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All videos</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Drafts</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most recent</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="views">Most viewed</SelectItem>
                  <SelectItem value="likes">Most liked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Videos List */}
          <div className="space-y-4">
            {userVideos.map((video) => (
              <Card key={video.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-48 h-28 object-cover rounded-lg"
                      />
                      <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs">
                        {video.duration}
                      </Badge>
                      <div className={`absolute top-2 left-2 w-2 h-2 ${getStatusColor(video.status)} rounded-full`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg line-clamp-2">{video.title}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <Badge variant={video.status === "published" ? "default" : "secondary"}>{video.status}</Badge>
                        <Badge variant="outline">{video.visibility}</Badge>
                        <span>Uploaded {formatDate(video.uploadDate)}</span>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {formatNumber(video.views)} views
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {formatNumber(video.likes)} likes
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {video.comments} comments
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Views this month</span>
                    <span className="font-bold">45,230</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Watch time</span>
                    <span className="font-bold">1,250 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Subscribers gained</span>
                    <span className="font-bold text-green-600">+156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Revenue</span>
                    <span className="font-bold">$234.50</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "Video published", video: "React Hooks Tutorial", time: "2 hours ago" },
                    { action: "Comment received", video: "Next.js Guide", time: "4 hours ago" },
                    { action: "1K views milestone", video: "CSS Grid Layout", time: "1 day ago" },
                    { action: "New subscriber", video: "Channel", time: "2 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 border rounded">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.video} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-6">
          <div className="text-center py-12">
            <Edit className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No drafts yet</h3>
            <p className="text-muted-foreground mb-4">Your draft videos will appear here</p>
            <Button>Create New Video</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
