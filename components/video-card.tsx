"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import {
  Clock,
  ListPlus,
  Share2,
  Flag,
  MoreVertical,
  CheckCircle,
  Download,
  ThumbsUp,
  Eye,
} from "lucide-react"
import { toast } from "sonner"

interface VideoCardProps {
  video: {
    id: string
    title: string
    thumbnail?: string
    thumbnail_url?: string
    duration: string
    views: number
    uploadedAt?: string
    created_at?: string
    channel?: {
      name: string
      avatar: string
      isVerified?: boolean
    }
    profiles?: {
      username: string
      avatar_url?: string
      is_verified?: boolean
    }
  }
  layout?: "grid" | "list"
  showMenu?: boolean
}

export function VideoCard({ video, layout = "grid", showMenu = true }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const formatViews = (views: number) => {
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`
    return `${views} views`
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Recently"
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

  const handleWatchLater = () => {
    toast.success("Added to Watch Later")
  }

  const handleAddToPlaylist = () => {
    toast.success("Added to playlist")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        url: `/watch?v=${video.id}`,
      })
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/watch?v=${video.id}`)
      toast.success("Link copied to clipboard")
    }
  }

  const handleReport = () => {
    toast.info("Report submitted")
  }

  const handleDownload = () => {
    toast.success("Download started")
  }

  const thumbnail = video.thumbnail || video.thumbnail_url || "/placeholder.svg"
  const channelName = video.channel?.name || video.profiles?.username || "Unknown Channel"
  const channelAvatar = video.channel?.avatar || video.profiles?.avatar_url || "/placeholder.svg"
  const isVerified = video.channel?.isVerified || video.profiles?.is_verified || false
  const uploadDate = video.uploadedAt || video.created_at || ""

  if (layout === "list") {
    return (
      <div 
        className="flex gap-4 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/watch?v=${video.id}`} className="flex-shrink-0 w-60">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={imageError ? "/placeholder.svg" : thumbnail}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
            <Badge className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-1.5 py-0.5">
              {video.duration}
            </Badge>
          </div>
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link href={`/watch?v=${video.id}`}>
            <h3 className="text-base font-semibold line-clamp-2 mb-1 group-hover:text-primary">
              {video.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Eye className="h-3 w-3" />
            {formatViews(video.views)} • {formatDate(uploadDate)}
          </div>
          <Link href={`/channel/${video.id}`} className="flex items-center gap-2 mt-2 hover:text-primary">
            <Avatar className="h-6 w-6">
              <AvatarImage src={channelAvatar} />
              <AvatarFallback>{channelName[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm flex items-center gap-1">
              {channelName}
              {isVerified && <CheckCircle className="h-3 w-3 fill-primary text-primary-foreground" />}
            </span>
          </Link>
        </div>

        {showMenu && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("opacity-0 group-hover:opacity-100 transition-opacity", isHovered && "opacity-100")}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleWatchLater}>
                <Clock className="mr-2 h-4 w-4" />
                Watch Later
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAddToPlaylist}>
                <ListPlus className="mr-2 h-4 w-4" />
                Add to Playlist
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleReport}>
                <Flag className="mr-2 h-4 w-4" />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    )
  }

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/watch?v=${video.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-3">
          <Image
            src={imageError ? "/placeholder.svg" : thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            onError={() => setImageError(true)}
          />
          <Badge className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-1.5 py-0.5 font-semibold">
            {video.duration}
          </Badge>
          
          {/* Hover overlay with actions */}
          <div className={cn(
            "absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 transition-opacity",
            isHovered && "opacity-100"
          )}>
            <Button size="sm" variant="secondary" onClick={(e) => { e.preventDefault(); handleWatchLater(); }}>
              <Clock className="h-4 w-4 mr-1" />
              Watch Later
            </Button>
            <Button size="sm" variant="secondary" onClick={(e) => { e.preventDefault(); handleAddToPlaylist(); }}>
              <ListPlus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>

      {/* Video Info */}
      <div className="flex gap-3">
        <Link href={`/channel/${video.id}`} className="flex-shrink-0">
          <Avatar className="h-9 w-9">
            <AvatarImage src={channelAvatar} />
            <AvatarFallback>{channelName[0]}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/watch?v=${video.id}`}>
              <h3 className="text-sm font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                {video.title}
              </h3>
            </Link>
            {showMenu && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("h-8 w-8 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity", isHovered && "opacity-100")}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleWatchLater}>
                    <Clock className="mr-2 h-4 w-4" />
                    Watch Later
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleAddToPlaylist}>
                    <ListPlus className="mr-2 h-4 w-4" />
                    Add to Playlist
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleReport}>
                    <Flag className="mr-2 h-4 w-4" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          
          <Link href={`/channel/${video.id}`} className="hover:text-primary">
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              {channelName}
              {isVerified && <CheckCircle className="h-3 w-3 fill-primary text-primary-foreground" />}
            </p>
          </Link>
          
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            {formatViews(video.views)} • {formatDate(uploadDate)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
