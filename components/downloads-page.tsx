"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, Play, Pause, Trash2, FolderOpen, HardDrive, Wifi, WifiOff } from "lucide-react"

const downloadedVideos = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2024",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "8:45:30",
    size: "2.4 GB",
    quality: "1080p",
    downloadedAt: "2024-01-15T10:00:00Z",
    status: "completed",
    progress: 100,
  },
  {
    id: "2",
    title: "React Advanced Patterns and Techniques",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "3:25:15",
    size: "1.2 GB",
    quality: "720p",
    downloadedAt: "2024-01-14T15:30:00Z",
    status: "downloading",
    progress: 65,
  },
  {
    id: "3",
    title: "Python for Data Science Masterclass",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "6:15:45",
    size: "1.8 GB",
    quality: "1080p",
    downloadedAt: "2024-01-13T12:00:00Z",
    status: "paused",
    progress: 30,
  },
]

export function DownloadsPage() {
  const [isOnline, setIsOnline] = useState(true)

  const totalSize = downloadedVideos.reduce((total, video) => {
    const size = Number.parseFloat(video.size.split(" ")[0])
    return total + size
  }, 0)

  const completedDownloads = downloadedVideos.filter((video) => video.status === "completed").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "downloading":
        return "text-blue-600"
      case "paused":
        return "text-yellow-600"
      case "failed":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "downloading":
        return <Download className="h-4 w-4 animate-bounce" />
      case "paused":
        return <Pause className="h-4 w-4" />
      case "completed":
        return <Play className="h-4 w-4" />
      default:
        return <Download className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Download className="h-8 w-8" />
            Downloads
          </h1>
          <p className="text-muted-foreground">Manage your offline videos</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isOnline ? "default" : "secondary"} className="gap-1">
            {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </div>
      </div>

      {/* Storage Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">{totalSize.toFixed(1)} GB</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Downloaded</p>
                <p className="text-2xl font-bold">{completedDownloads}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Available Space</p>
                <p className="text-2xl font-bold">45.2 GB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {downloadedVideos.length > 0 ? (
        <>
          {/* Downloads List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Downloads</h2>
              <Button variant="outline" size="sm">
                <FolderOpen className="mr-2 h-4 w-4" />
                Open Folder
              </Button>
            </div>

            {downloadedVideos.map((video) => (
              <Card key={video.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-48 h-28 object-cover rounded-lg"
                      />
                      <Badge className="absolute top-2 left-2 bg-black/80 text-white text-xs">{video.quality}</Badge>
                      <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs">
                        {video.duration}
                      </Badge>
                    </div>

                    <div className="flex-1 min-w-0 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-2">{video.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{video.size}</span>
                          <span>•</span>
                          <span>{video.quality}</span>
                          <span>•</span>
                          <span>Downloaded {new Date(video.downloadedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Progress Bar for downloading/paused videos */}
                      {video.status !== "completed" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className={`flex items-center gap-1 ${getStatusColor(video.status)}`}>
                              {getStatusIcon(video.status)}
                              {video.status === "downloading"
                                ? "Downloading..."
                                : video.status === "paused"
                                  ? "Paused"
                                  : video.status}
                            </span>
                            <span>{video.progress}%</span>
                          </div>
                          <Progress value={video.progress} className="h-2" />
                        </div>
                      )}

                      {/* Status Badge for completed videos */}
                      {video.status === "completed" && (
                        <Badge variant="default" className="w-fit">
                          Ready to watch offline
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {video.status === "completed" ? (
                        <Button className="gap-2">
                          <Play className="h-4 w-4" />
                          Watch
                        </Button>
                      ) : video.status === "downloading" ? (
                        <Button variant="outline" className="gap-2">
                          <Pause className="h-4 w-4" />
                          Pause
                        </Button>
                      ) : (
                        <Button variant="outline" className="gap-2">
                          <Download className="h-4 w-4" />
                          Resume
                        </Button>
                      )}

                      <Button variant="ghost" size="icon" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
          <Download className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
          <h3 className="text-2xl font-semibold mb-4">No downloads yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Download videos to watch them offline. Look for the download button on any video.
          </p>
          <Button>Browse Videos</Button>
        </div>
      )}

      {/* Download Settings */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Download Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Default Quality</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option>1080p (Best Quality)</option>
                <option>720p (Good Quality)</option>
                <option>480p (Data Saver)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Download Location</label>
              <div className="flex mt-1">
                <input
                  type="text"
                  value="/Users/Downloads/CutieTube"
                  className="flex-1 p-2 border rounded-l-md bg-muted"
                  readOnly
                />
                <Button variant="outline" className="rounded-l-none">
                  <FolderOpen className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
