"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TooltipProvider } from "@/components/ui/tooltip"
import { toast } from "sonner"
import { Clock, ListPlus, MoreVertical } from "lucide-react"

interface Video {
  id: number
  title: string
  channel: string
  views: string
  time: string
  duration: string
  thumbnail: string
  preview?: string // video preview
}

export function VideoRecommendations() {
  const [videos, setVideos] = useState<Video[]>([])
  const [autoplay, setAutoplay] = useState(true)
  const isLoggedIn = true // mock auth

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVideos([
      {
    id: 1,
    title: "React Hooks Explained in 10 Minutes",
    channel: "ReactMaster",
    views: "856K views",
    time: "3 days ago",
    duration: "10:23",
    thumbnail: "/placeholder.svg",
    preview: "/preview1.mp4",
  },
  {
    id: 2,
    title: "CSS Grid vs Flexbox - Complete Guide",
    channel: "CSSGuru",
    views: "1.2M views",
    time: "1 week ago",
    duration: "15:45",
    thumbnail: "/placeholder.svg",
    preview: "/preview2.mp4",
  },
  {
    id: 3,
    title: "JavaScript ES6 Features You Must Know",
    channel: "JSExpert",
    views: "2.1M views",
    time: "2 weeks ago",
    duration: "22:18",
    thumbnail: "/placeholder.svg",
    preview: "/preview3.mp4",
  },
  {
    id: 4,
    title: "TypeScript Crash Course for Beginners",
    channel: "CodeWithTS",
    views: "980K views",
    time: "5 days ago",
    duration: "19:10",
    thumbnail: "/placeholder.svg",
    preview: "/preview4.mp4",
  },
  {
    id: 5,
    title: "Node.js REST API Tutorial – CRUD Basics",
    channel: "BackendDev",
    views: "1.1M views",
    time: "1 month ago",
    duration: "13:45",
    thumbnail: "/placeholder.svg",
    preview: "/preview5.mp4",
  },
  {
    id: 6,
    title: "Building a Todo App with React and Tailwind",
    channel: "FrontendFusion",
    views: "420K views",
    time: "2 weeks ago",
    duration: "11:55",
    thumbnail: "/placeholder.svg",
    preview: "/preview6.mp4",
  },
  {
    id: 7,
    title: "Top 10 VS Code Extensions for Web Devs",
    channel: "DevSetup",
    views: "650K views",
    time: "3 days ago",
    duration: "9:40",
    thumbnail: "/placeholder.svg",
    preview: "/preview7.mp4",
  },
  {
    id: 8,
    title: "React Performance Optimization Tips",
    channel: "ReactWizard",
    views: "1.6M views",
    time: "1 week ago",
    duration: "17:35",
    thumbnail: "/placeholder.svg",
    preview: "/preview8.mp4",
  },
  {
    id: 9,
    title: "MongoDB Tutorial for Beginners",
    channel: "DBMastery",
    views: "800K views",
    time: "2 months ago",
    duration: "20:10",
    thumbnail: "/placeholder.svg",
    preview: "/preview9.mp4",
  },
  {
    id: 10,
    title: "Building Netflix UI with Next.js 14",
    channel: "UICloner",
    views: "2.9M views",
    time: "4 days ago",
    duration: "27:20",
    thumbnail: "/placeholder.svg",
    preview: "/preview10.mp4",
  },
      ])
    }, 500)
  }, [])

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Up next</h2>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Autoplay</span>
            <Button
              size="sm"
              variant="outline"
              className="h-6 px-2 text-xs"
              onClick={() => setAutoplay(!autoplay)}
            >
              {autoplay ? "On" : "Off"}
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {videos.map((video) => (
            <HoverVideoCard key={video.id} video={video} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}

function HoverVideoCard({ video, isLoggedIn }: { video: Video; isLoggedIn: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {})
  }

  const handleMouseLeave = () => {
    videoRef.current?.pause()
    videoRef.current!.currentTime = 0
  }

  const handleWatchLater = () => {
    if (!isLoggedIn) return toast.error("Please log in to save videos")
    toast.success("Added to Watch Later")
  }

  const handleSavePlaylist = () => {
    if (!isLoggedIn) return toast.error("Login required to save")
    toast.success("Saved to Playlist")
  }

  return (
    <div className="flex gap-3 group relative">
      <Link
        href={`/watch?v=${video.id}`}
        className="flex-shrink-0 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-40 h-24 relative rounded-lg overflow-hidden">
          {video.preview ? (
            <video
              ref={videoRef}
              muted
              preload="metadata"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              src={video.preview}
            />
          ) : (
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover rounded-lg"
            />
          )}
        </div>
        <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs">
          {video.duration}
        </Badge>
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/watch?v=${video.id}`}>
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
            {video.title}
          </h3>
        </Link>
        <div className="mt-1 space-y-1">
          <p className="text-xs text-muted-foreground">{video.channel}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{video.views}</span>
            <span>•</span>
            <span>{video.time}</span>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleWatchLater}>
              <Clock className="h-4 w-4 mr-2" /> Watch later
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSavePlaylist}>
              <ListPlus className="h-4 w-4 mr-2" /> Save to playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
