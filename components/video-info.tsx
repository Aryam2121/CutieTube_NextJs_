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

export function VideoInfo() {
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
    toast.success(subscribed ? "Unsubscribed" : "Subscribed to TechCoder")
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard!")
  }

  const handleDownload = () => {
    toast.info("Download started (simulated)")
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Title + Views */}
        <div>
          <h1 className="text-xl font-bold mb-2">
            Building a Modern YouTube Clone with Next.js and React
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>1,234,567 views</span>
            <span>•</span>
            <span>2 days ago</span>
          </div>
        </div>

        {/* Channel + Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left: Avatar + Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">TechCoder</h3>
              <p className="text-sm text-muted-foreground">2.5M subscribers</p>
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
                    12K
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
            <Badge variant="secondary">Tutorial</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">React</Badge>
          </div>
          <p className="text-sm whitespace-pre-line">
            {showMore
              ? `In this comprehensive tutorial, we'll build a modern YouTube clone from scratch using Next.js, React, and Tailwind CSS. We'll cover everything from setting up the project to implementing video playback, user authentication, and responsive design.\n\nThis is perfect for intermediate developers looking to level up their frontend skills.`
              : `In this comprehensive tutorial, we'll build a modern YouTube clone from scratch using Next.js, React, and Tailwind CSS. We'll cover everything from setting up the project...`}
          </p>
          <Button
            variant="link"
            className="p-0 h-auto mt-2 text-sm"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show less" : "Show more"}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}
