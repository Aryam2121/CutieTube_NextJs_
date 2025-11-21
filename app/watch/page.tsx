"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { VideoPlayer } from "@/components/video-player"
import { VideoInfo } from "@/components/video-info"
import { Comments } from "@/components/comments"
import { VideoRecommendations } from "@/components/video-recommendations"

function WatchPageContent() {
  const searchParams = useSearchParams()
  const videoId = searchParams.get("v")
  const [video, setVideo] = useState<any>(null)

  useEffect(() => {
    // Fetch video data based on videoId
    // This is mock data - replace with actual API call
    if (videoId) {
      setVideo({
        id: videoId,
        title: "Complete Next.js Tutorial - Build a Full Stack App",
        videoUrl: "/placeholder-video.mp4",
        thumbnailUrl: "/placeholder.svg?text=Video",
        views: 1250000,
        likes: 45000,
        dislikes: 1200,
        uploadedAt: "2024-01-15",
        description: "In this comprehensive tutorial, we'll build a full-stack application using Next.js 15. You'll learn about server components, routing, data fetching, and more!",
        channel: {
          id: "channel-1",
          name: "Tech Master",
          avatar: "/placeholder.svg?text=TM",
          subscribers: 2500000,
          isVerified: true,
        },
        tags: ["nextjs", "react", "tutorial", "web development"],
        category: "Education",
      })
    }
  }, [videoId])

  if (!video) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <p className="text-muted-foreground">Loading video...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-[2000px] mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-4">
            <VideoPlayer
              videoId={video.id}
              videoUrl={video.videoUrl}
              thumbnailUrl={video.thumbnailUrl}
              title={video.title}
              autoPlay={true}
            />
            <VideoInfo video={video} />
            <Comments videoId={video.id} />
          </div>

          {/* Sidebar - Recommendations */}
          <div className="xl:col-span-1">
            <VideoRecommendations currentVideoId={video.id} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function WatchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <WatchPageContent />
    </Suspense>
  )
}
