"use client"

import { useEffect, useState, useRef } from "react"
import { Play, Shuffle, MoreVertical, Trash2, Share2, Download, Clock, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"

const watchLaterVideos = [
  {
    id: "1",
    title: "Advanced TypeScript Patterns for React",
    thumbnail_url: "/placeholder.svg",
    duration: "32:15",
    views: 245000,
    created_at: "2024-01-15T10:00:00Z",
    addedAt: "2024-01-16T14:30:00Z",
    profiles: { username: "TypeScriptPro", avatar_url: "/placeholder.svg" },
    preview: "/preview1.mp4",
  },
  {
    id: "2",
    title: "Building Scalable Node.js Applications",
    thumbnail_url: "/placeholder.svg",
    duration: "45:30",
    views: 180000,
    created_at: "2024-01-14T15:30:00Z",
    addedAt: "2024-01-15T20:15:00Z",
    profiles: { username: "NodeMaster", avatar_url: "/placeholder.svg" },
    preview: "/preview2.mp4",
  },
  {
    id: "3",
    title: "Docker for Developers - Complete Guide",
    thumbnail_url: "/placeholder.svg",
    duration: "28:45",
    views: 320000,
    created_at: "2024-01-13T12:00:00Z",
    addedAt: "2024-01-14T16:45:00Z",
    profiles: { username: "DevOpsGuru", avatar_url: "/placeholder.svg" },
    preview: "/preview3.mp4",
  },
]

export function WatchLaterPage() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string[]>([])
  const [videos, setVideos] = useState(watchLaterVideos)

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  )

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  const handleRemoveSelected = () => {
    if (selected.length === 0) return toast.error("No videos selected")
    setVideos((prev) => prev.filter((v) => !selected.includes(v.id)))
    toast.success("Removed selected videos")
    setSelected([])
  }

  const totalDuration = videos.reduce((acc, v) => {
    const [min, sec] = v.duration.split(":").map(Number)
    return acc + min + sec / 60
  }, 0)

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60)
    const m = Math.floor(mins % 60)
    return `${h}h ${m}m`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Clock className="h-7 w-7" />
            Watch Later
          </h1>
          <p className="text-muted-foreground">Videos saved for later viewing</p>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Search in watch later..."
            className="w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            {videos.length} videos • {formatDuration(totalDuration)}
          </Badge>
        </div>
      </div>

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="flex justify-between items-center bg-muted px-4 py-3 rounded-md">
          <p className="text-sm">{selected.length} selected</p>
          <Button variant="destructive" size="sm" onClick={handleRemoveSelected}>
            <Trash2 className="w-4 h-4 mr-1" />
            Remove Selected
          </Button>
        </div>
      )}
{/* Select Controls */}
<div className="flex justify-end items-center gap-2">
  <Button
    variant="outline"
    size="sm"
    onClick={() => setSelected(videos.map((v) => v.id))}
    disabled={selected.length === videos.length}
  >
    Select All
  </Button>
  <Button
    variant="outline"
    size="sm"
    onClick={() => setSelected([])}
    disabled={selected.length === 0}
  >
    Deselect All
  </Button>
</div>

      {filteredVideos.length > 0 ? (
        <div className="grid gap-4">
          {filteredVideos.map((video, i) => (
            <Card
              key={video.id}
              className={`transition-shadow duration-200 hover:shadow-md group border ${
                selected.includes(video.id) ? "ring-2 ring-blue-400" : ""
              }`}
              onClick={() => toggleSelect(video.id)}
            >
              <CardContent className="p-4 flex gap-4 items-start cursor-pointer">
                <div className="text-muted-foreground font-mono w-8">{i + 1}</div>
                <div className="relative">
                  <video
                    muted
                    className="rounded-lg w-40 h-24 object-cover transition duration-300 group-hover:brightness-90"
                    onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                    onMouseLeave={(e) => {
                      const video = e.currentTarget as HTMLVideoElement
                      video.pause()
                      video.currentTime = 0
                    }}
                    src={video.preview}
                    poster={video.thumbnail_url}
                  />
                  <Badge className="absolute bottom-1 right-1 bg-black/70 text-white text-xs">
                    {video.duration}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold line-clamp-2 text-lg mb-1">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.profiles.username}</p>
                  <div className="text-sm text-muted-foreground flex gap-2 mt-1">
<span>{video.views.toLocaleString("en-US")} views</span>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(video.addedAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Play className="w-4 h-4 mr-2" />
                      Play now
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => {
                        setVideos((prev) => prev.filter((v) => v.id !== video.id))
                        toast.success("Video removed from Watch Later")
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Clock className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-2xl font-semibold mb-2">No videos saved</h3>
          <p className="text-muted-foreground mb-4">
            You can save videos for later viewing by clicking the "Watch Later" button.
          </p>
          <Button>Explore Videos</Button>
        </div>
      )}
    </div>
  )
}
