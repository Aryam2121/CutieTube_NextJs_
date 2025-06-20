"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Play, Trash2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { getSupabaseClient } from "@/lib/supabase"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"

interface Playlist {
  id: string
  title: string
  description: string
  thumbnail_url: string
  video_count: number
  created_at: string
  is_public: boolean
}

export function PlaylistManager() {
  const { user } = useAuth()
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const supabase = getSupabaseClient()

  useEffect(() => {
    if (user) {
      fetchPlaylists()
    }
  }, [user])

  const fetchPlaylists = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from("playlists")
      .select(`
        *,
        playlist_videos (count)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (!error && data) {
      const playlistsWithCount: Playlist[] = data.map((playlist: any) => ({
        id: playlist.id,
        title: playlist.title,
        description: playlist.description,
        thumbnail_url: playlist.thumbnail_url,
        video_count: playlist.playlist_videos?.[0]?.count || 0,
        created_at: playlist.created_at,
        is_public: playlist.is_public,
      }))
      setPlaylists(playlistsWithCount)
    }
    setLoading(false)
  }

  const createPlaylist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const isPublic = formData.get("public") === "on"

    const { error } = await supabase.from("playlists").insert({
      title,
      description,
      user_id: user.id,
      is_public: isPublic,
      thumbnail_url: "/placeholder.svg?height=180&width=320",
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Playlist created successfully!")
      setShowCreateDialog(false)
      fetchPlaylists()
    }
  }

  const deletePlaylist = async (playlistId: string) => {
    const { error } = await supabase.from("playlists").delete().eq("id", playlistId)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Playlist deleted successfully!")
      fetchPlaylists()
    }
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p>Please sign in to manage your playlists</p>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center py-8">Loading playlists...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          {playlists.length} {playlists.length === 1 ? "playlist" : "playlists"}
        </p>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Playlist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Playlist</DialogTitle>
              <DialogDescription>Create a new playlist to organize your favorite videos</DialogDescription>
            </DialogHeader>
            <form onSubmit={createPlaylist} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Playlist title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Describe your playlist" rows={3} />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="public" name="public" />
                <Label htmlFor="public">Make playlist public</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {playlists.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-2">No playlists yet</p>
          <p className="text-muted-foreground mb-4">Create your first playlist to get started</p>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Playlist
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="p-0">
                <div className="relative aspect-video rounded-t-lg overflow-hidden">
                  <Image
                    src={playlist.thumbnail_url || "/placeholder.svg"}
                    alt={playlist.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link href={`/playlist?list=${playlist.id}`}>
                      <Button size="sm" className="gap-2">
                        <Play className="h-4 w-4" />
                        Play all
                      </Button>
                    </Link>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {playlist.video_count} videos
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm line-clamp-2 mb-1">{playlist.title}</CardTitle>
                    {playlist.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">{playlist.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">{playlist.is_public ? "Public" : "Private"}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deletePlaylist(playlist.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
