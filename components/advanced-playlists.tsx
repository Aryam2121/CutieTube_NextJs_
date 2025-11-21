"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Trash2,
  Edit,
  Play,
  Lock,
  Globe,
  Users,
  Clock,
  List,
  Grid,
  Shuffle,
  Share2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface PlaylistVideo {
  id: string
  title: string
  channel: string
  thumbnail: string
  duration: string
  addedAt: Date
}

interface Playlist {
  id: string
  name: string
  description: string
  thumbnail?: string
  videos: PlaylistVideo[]
  visibility: "public" | "unlisted" | "private"
  createdAt: Date
  updatedAt: Date
  totalDuration: string
  collaborative: boolean
}

export function AdvancedPlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: "1",
      name: "Web Development Tutorials",
      description: "Complete guide to modern web development",
      thumbnail: "/placeholder.svg",
      videos: [
        {
          id: "1",
          title: "React Hooks Tutorial",
          channel: "CodeMaster",
          thumbnail: "/placeholder.svg",
          duration: "15:30",
          addedAt: new Date(),
        },
        {
          id: "2",
          title: "Next.js 14 Complete Guide",
          channel: "WebDev Pro",
          thumbnail: "/placeholder.svg",
          duration: "45:20",
          addedAt: new Date(),
        },
      ],
      visibility: "public",
      createdAt: new Date(),
      updatedAt: new Date(),
      totalDuration: "1:00:50",
      collaborative: false,
    },
    {
      id: "2",
      name: "Machine Learning Basics",
      description: "Introduction to AI and ML concepts",
      thumbnail: "/placeholder.svg",
      videos: [
        {
          id: "3",
          title: "Python for ML",
          channel: "AI Guru",
          thumbnail: "/placeholder.svg",
          duration: "30:15",
          addedAt: new Date(),
        },
      ],
      visibility: "private",
      createdAt: new Date(),
      updatedAt: new Date(),
      totalDuration: "30:15",
      collaborative: true,
    },
  ])

  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"recent" | "alphabetical" | "duration">("recent")

  const handleCreatePlaylist = () => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: "New Playlist",
      description: "",
      videos: [],
      visibility: "private",
      createdAt: new Date(),
      updatedAt: new Date(),
      totalDuration: "0:00",
      collaborative: false,
    }
    setPlaylists([...playlists, newPlaylist])
    setSelectedPlaylist(newPlaylist)
    setIsCreating(false)
    toast.success("Playlist created!")
  }

  const handleDeletePlaylist = (id: string) => {
    setPlaylists(playlists.filter((p) => p.id !== id))
    toast.success("Playlist deleted")
  }

  const handleUpdatePlaylist = (id: string, updates: Partial<Playlist>) => {
    setPlaylists(
      playlists.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
      )
    )
    toast.success("Playlist updated")
  }

  const handleRemoveVideo = (playlistId: string, videoId: string) => {
    const playlist = playlists.find((p) => p.id === playlistId)
    if (!playlist) return

    const updatedVideos = playlist.videos.filter((v) => v.id !== videoId)
    handleUpdatePlaylist(playlistId, { videos: updatedVideos })
    toast.success("Video removed from playlist")
  }

  const handleSharePlaylist = (playlist: Playlist) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/playlist/${playlist.id}`
    )
    toast.success("Playlist link copied!")
  }

  const getVisibilityIcon = (visibility: Playlist["visibility"]) => {
    switch (visibility) {
      case "public":
        return <Globe className="h-4 w-4" />
      case "unlisted":
        return <Lock className="h-4 w-4" />
      case "private":
        return <Lock className="h-4 w-4" />
    }
  }

  const sortedPlaylists = [...playlists].sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return a.name.localeCompare(b.name)
      case "duration":
        return b.videos.length - a.videos.length
      case "recent":
      default:
        return b.updatedAt.getTime() - a.updatedAt.getTime()
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Playlists</h1>
          <p className="text-muted-foreground mt-1">
            Organize and manage your video collections
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Updated</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
              <SelectItem value="duration">Most Videos</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Playlist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Playlist</DialogTitle>
                <DialogDescription>
                  Add a name and description for your new playlist
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Playlist Name</Label>
                  <Input placeholder="My Awesome Playlist" />
                </div>
                <div>
                  <Label>Description (Optional)</Label>
                  <Textarea placeholder="What's this playlist about?" />
                </div>
                <div>
                  <Label>Visibility</Label>
                  <Select defaultValue="private">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreatePlaylist} className="w-full">
                  Create Playlist
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Playlists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playlists.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {playlists.reduce((sum, p) => sum + p.videos.length, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Public Playlists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {playlists.filter((p) => p.visibility === "public").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collaborative</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {playlists.filter((p) => p.collaborative).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Playlists Grid/List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "space-y-4"
          )}
        >
          {sortedPlaylists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  {viewMode === "grid" ? (
                    <div>
                      {/* Thumbnail */}
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-3">
                        <img
                          src={playlist.thumbnail || "/placeholder.svg"}
                          alt={playlist.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="lg" className="rounded-full">
                            <Play className="h-5 w-5 mr-2" />
                            Play All
                          </Button>
                        </div>
                        <Badge className="absolute top-2 right-2 bg-black/80">
                          {playlist.videos.length} videos
                        </Badge>
                      </div>

                      {/* Info */}
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold line-clamp-2 flex-1">
                            {playlist.name}
                          </h3>
                          <div className="flex-shrink-0">
                            {getVisibilityIcon(playlist.visibility)}
                          </div>
                        </div>
                        {playlist.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {playlist.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{playlist.totalDuration}</span>
                          {playlist.collaborative && (
                            <Badge variant="secondary" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              Collaborative
                            </Badge>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => setSelectedPlaylist(playlist)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSharePlaylist(playlist)}
                          >
                            <Share2 className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePlaylist(playlist.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <img
                        src={playlist.thumbnail || "/placeholder.svg"}
                        alt={playlist.name}
                        className="w-32 h-20 rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="font-semibold">{playlist.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {playlist.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {getVisibilityIcon(playlist.visibility)}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedPlaylist(playlist)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSharePlaylist(playlist)}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePlaylist(playlist.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{playlist.videos.length} videos</span>
                          <span>{playlist.totalDuration}</span>
                          {playlist.collaborative && (
                            <Badge variant="secondary" className="text-xs">
                              Collaborative
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Playlist Editor Dialog */}
      {selectedPlaylist && (
        <Dialog
          open={!!selectedPlaylist}
          onOpenChange={() => setSelectedPlaylist(null)}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Playlist</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Playlist Name</Label>
                  <Input
                    value={selectedPlaylist.name}
                    onChange={(e) =>
                      handleUpdatePlaylist(selectedPlaylist.id, {
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Visibility</Label>
                  <Select
                    value={selectedPlaylist.visibility}
                    onValueChange={(v: any) =>
                      handleUpdatePlaylist(selectedPlaylist.id, { visibility: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={selectedPlaylist.description}
                  onChange={(e) =>
                    handleUpdatePlaylist(selectedPlaylist.id, {
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={selectedPlaylist.collaborative}
                    onCheckedChange={(checked) =>
                      handleUpdatePlaylist(selectedPlaylist.id, {
                        collaborative: checked,
                      })
                    }
                  />
                  <Label>Allow others to add videos</Label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  Videos ({selectedPlaylist.videos.length})
                </h3>
                <div className="space-y-2">
                  {selectedPlaylist.videos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center gap-3 p-3 border rounded-lg group hover:bg-accent"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-24 h-16 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium line-clamp-1">{video.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {video.channel}
                        </p>
                      </div>
                      <Badge variant="secondary">{video.duration}</Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100"
                        onClick={() =>
                          handleRemoveVideo(selectedPlaylist.id, video.id)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
