"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { VideoCard } from "@/components/video-card"
import { getSupabaseClient } from "@/lib/supabase"

interface Video {
  id: string
  title: string
  description: string
  thumbnail_url: string
  video_url: string
  duration: string
  views: number
  created_at: string
  user_id: string
  profiles: {
    username: string
    avatar_url?: string
  }
}

export function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = getSupabaseClient()

  useEffect(() => {
    async function searchVideos() {
      setLoading(true)

      const { data, error } = await supabase
        .from("videos")
        .select(`
          id,
          title,
          description,
          thumbnail_url,
          video_url,
          duration,
          views,
          created_at,
          user_id,
          profiles (
            username,
            avatar_url
          )
        `)
        .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
        .order("created_at", { ascending: false })

      if (!error && data) {
        const validVideos = (data as any[]).filter(
          (v) => v.profiles && typeof v.profiles === "object" && "username" in v.profiles
        ) as Video[]
        setVideos(validVideos)
      }

      setLoading(false)
    }

    if (query) {
      searchVideos()
    }
  }, [query, supabase])

  if (loading) {
    return <div className="text-center py-8">Searching...</div>
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg">No results found for "{query}"</p>
        <p className="text-muted-foreground">Try different keywords or check your spelling</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        About {videos.length} results for "{query}"
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}
