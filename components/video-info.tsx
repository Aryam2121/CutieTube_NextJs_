"use client"

import {
  ThumbsUp,
  ThumbsDown,
  Share,
  Download,
  MoreHorizontal,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface VideoInfoProps {
  video: any
}

export function VideoInfo({ video }: VideoInfoProps) {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    if (!liked) setDisliked(false)
  }

  const handleDislike = () => {
    setDisliked(!disliked)
    if (!disliked) setLiked(false)
  }

  const handleSubscribe = () => {
    setSubscribed(!subscribed)
    toast.success(subscribed ? "Unsubscribed" : `Subscribed to ${video?.channel?.name || 'channel'}`)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard!")
  }

  const handleDownload = () => {
    toast.info("Download started (simulated)")
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Title + Views */}
        <div>
          <h1 className="text-xl font-bold mb-2">
            {video?.title || 'Video Title'}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{formatNumber(video?.views || 0)} views</span>
            <span>•</span>
            <span>{formatDate(video?.uploadedAt || new Date().toISOString())}</span>
          </div>
        </div>

        {/* Channel + Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left: Avatar + Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={video?.channel?.avatar || '/placeholder.svg?height=40&width=40'} />
              <AvatarFallback>{video?.channel?.name?.substring(0, 2).toUpperCase() || 'CH'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{video?.channel?.name || 'Channel Name'}</h3>
              <p className="text-sm text-muted-foreground">
                {formatNumber(video?.channel?.subscribers || 0)} subscribers
              </p>
            </div>
            <Button
              className="rounded-full"
              onClick={handleSubscribe}
              variant={subscribed ? "outline" : "default"}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Like/Dislike */}
            <div className="flex items-center bg-muted rounded-full overflow-hidden">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={liked ? "secondary" : "ghost"}
                    className="rounded-none gap-1"
                    onClick={handleLike}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {formatNumber(video?.likes || 0)}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Like</TooltipContent>
              </Tooltip>

              <Separator orientation="vertical" className="h-6" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={disliked ? "secondary" : "ghost"}
                    className="rounded-none"
                    onClick={handleDislike}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Dislike</TooltipContent>
              </Tooltip>
            </div>

            {/* Share */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full gap-2"
                  onClick={handleShare}
                >
                  <Share className="h-4 w-4" />
                  Share
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy Link</TooltipContent>
            </Tooltip>

            {/* Download */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full gap-2"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </TooltipTrigger>
              <TooltipContent>Simulate Download</TooltipContent>
            </Tooltip>

            {/* More Options Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Save to playlist</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Not interested</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Description */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {video?.tags?.map((tag: string) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            )) || (
              <>
                <Badge variant="secondary">Video</Badge>
              </>
            )}
          </div>
          <p className="text-sm whitespace-pre-line">
            {showMore
              ? video?.description || 'No description available.'
              : (video?.description?.substring(0, 150) || 'No description available.') + (video?.description?.length > 150 ? '...' : '')}
          </p>
          {video?.description && video.description.length > 150 && (
            <Button
              variant="link"
              className="p-0 h-auto mt-2 text-sm"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
            </Button>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
