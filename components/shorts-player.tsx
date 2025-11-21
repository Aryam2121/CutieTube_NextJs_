"use client"

import { useRef, useState, useEffect } from "react"
import { useSwipeable } from "react-swipeable"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Music,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import Link from "next/link"

interface Short {
  id: string
  videoUrl: string
  title: string
  description: string
  likes: number
  comments: number
  shares: number
  channel: {
    name: string
    avatar: string
    isVerified: boolean
  }
  music?: {
    name: string
    artist: string
  }
}

interface ShortsPlayerProps {
  shorts: Short[]
  initialIndex?: number
}

export function ShortsPlayer({ shorts, initialIndex = 0 }: ShortsPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentShort = shorts[currentIndex]

  const handlers = useSwipeable({
    onSwipedUp: () => {
      if (currentIndex < shorts.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      }
    },
    onSwipedDown: () => {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1)
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.load()
    if (isPlaying) {
      video.play()
    }
  }, [currentIndex])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      if (currentIndex < shorts.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        setCurrentIndex(0) // Loop back to first
      }
    }

    video.addEventListener("ended", handleEnded)
    return () => video.removeEventListener("ended", handleEnded)
  }, [currentIndex, shorts.length])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast.success(isLiked ? "Removed from liked" : "Added to liked")
  }

  const handleComment = () => {
    toast.info("Comments feature coming soon")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentShort.title,
        url: `/shorts/${currentShort.id}`,
      })
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/shorts/${currentShort.id}`)
      toast.success("Link copied to clipboard")
    }
  }

  return (
    <div 
      {...handlers}
      ref={containerRef}
      className="relative h-screen w-full max-w-md mx-auto bg-black overflow-hidden snap-y snap-mandatory"
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={currentShort.videoUrl}
        loop={false}
        playsInline
        autoPlay
        muted={isMuted}
        onClick={togglePlay}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-white">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </Button>
        </Link>
        <span className="text-white font-semibold">Shorts</span>
        <Button variant="ghost" size="icon" className="text-white">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 z-10 flex gap-4">
        {/* Left side - Info */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Channel */}
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={currentShort.channel.avatar} />
              <AvatarFallback>{currentShort.channel.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-white font-semibold">{currentShort.channel.name}</span>
            <Button size="sm" variant="secondary" className="h-7">
              Subscribe
            </Button>
          </div>

          {/* Description */}
          <p className="text-white text-sm line-clamp-2">{currentShort.description}</p>

          {/* Music */}
          {currentShort.music && (
            <div className="flex items-center gap-2 text-white text-xs">
              <Music className="h-4 w-4" />
              <span className="truncate">
                {currentShort.music.name} - {currentShort.music.artist}
              </span>
            </div>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex flex-col items-center gap-6">
          {/* Like */}
          <button onClick={handleLike} className="flex flex-col items-center gap-1">
            <div className={cn(
              "rounded-full p-3 transition-colors",
              isLiked ? "bg-red-500" : "bg-white/20"
            )}>
              <Heart className={cn("h-6 w-6 text-white", isLiked && "fill-white")} />
            </div>
            <span className="text-white text-xs font-semibold">
              {(currentShort.likes + (isLiked ? 1 : 0)).toLocaleString()}
            </span>
          </button>

          {/* Comment */}
          <button onClick={handleComment} className="flex flex-col items-center gap-1">
            <div className="rounded-full bg-white/20 p-3">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xs font-semibold">
              {currentShort.comments.toLocaleString()}
            </span>
          </button>

          {/* Share */}
          <button onClick={handleShare} className="flex flex-col items-center gap-1">
            <div className="rounded-full bg-white/20 p-3">
              <Share2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xs font-semibold">
              {currentShort.shares.toLocaleString()}
            </span>
          </button>

          {/* Volume */}
          <button onClick={toggleMute} className="flex flex-col items-center gap-1">
            <div className="rounded-full bg-white/20 p-3">
              {isMuted ? (
                <VolumeX className="h-6 w-6 text-white" />
              ) : (
                <Volume2 className="h-6 w-6 text-white" />
              )}
            </div>
          </button>

          {/* Play/Pause indicator */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Play className="h-16 w-16 text-white/80" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation indicators */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1">
        {shorts.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-1 h-8 rounded-full transition-all",
              index === currentIndex ? "bg-white" : "bg-white/30"
            )}
          />
        ))}
      </div>
    </div>
  )
}
