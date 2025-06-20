import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`
    }
    return `${views} views`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  return (
    <Link href={`/watch?v=${video.id}`} className="block group">
      <div className="space-y-3">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src={video.thumbnail_url || "/placeholder.svg"}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <Badge className="absolute bottom-2 right-2 bg-black/80 text-white text-xs">{video.duration}</Badge>
        </div>
        <div className="flex gap-3">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarImage src={video.profiles.avatar_url || "/placeholder.svg"} />
            <AvatarFallback>{video.profiles.username[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
              {video.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{video.profiles.username}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>{formatViews(video.views)}</span>
              <span>•</span>
              <span>{formatDate(video.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
