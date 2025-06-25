"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface VideoCardProps {
  video: {
    id: string
    title: string
    thumbnail_url: string
    duration: string
    views: number
    created_at: string
    profiles: {
      username: string
      avatar_url?: string
    }
  }
}

export function VideoCard({ video }: VideoCardProps) {
  const formatViews = (views: number) => {
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`
    return `${views} views`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} week${diffDays > 7 ? "s" : ""} ago`
    return `${Math.ceil(diffDays / 30)} month${diffDays > 30 ? "s" : ""} ago`
  }

  return (
    <Link
      href={`/watch?v=${video.id}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-ring rounded-md"
    >
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow">
          <Image
            src={video.thumbnail_url || "/placeholder.svg"}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <Badge className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
            {video.duration}
          </Badge>
        </div>

        {/* Video Info */}
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={video.profiles.avatar_url || "/placeholder.svg"} />
            <AvatarFallback>{video.profiles.username[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium line-clamp-2 leading-tight text-foreground group-hover:text-blue-600 transition-colors duration-200">
              {video.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{video.profiles.username}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {formatViews(video.views)} • {formatDate(video.created_at)}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
