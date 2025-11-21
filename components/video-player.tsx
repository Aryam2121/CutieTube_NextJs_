"use client"

import { useRef, useState, useEffect } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  PictureInPicture,
  SkipBack,
  SkipForward,
  Minimize,
  Repeat,
  Shuffle,
  Cast,
  Download,
  Share2,
  Flag,
  MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
const videoSources = [
  { label: "360p", src: "/placeholder-360.mp4" },
  { label: "480p", src: "/placeholder-480.mp4" },
  { label: "720p", src: "/placeholder-720.mp4" },
  { label: "1080p", src: "/placeholder-1080.mp4" },
  { label: "1440p", src: "/placeholder-1440.mp4" },
  { label: "2160p (4K)", src: "/placeholder-2160.mp4" },
]

interface VideoPlayerProps {
  videoId?: string
  videoUrl?: string
  thumbnailUrl?: string
  title?: string
  autoPlay?: boolean
  onTimeUpdate?: (currentTime: number) => void
  onEnded?: () => void
}

export function VideoPlayer({
  videoId,
  videoUrl,
  thumbnailUrl,
  title = "Video",
  autoPlay = false,
  onTimeUpdate,
  onEnded,
}: VideoPlayerProps = {}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([80])
  const [progress, setProgress] = useState([0])
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showCaptions, setShowCaptions] = useState(true)
  const [selectedQuality, setSelectedQuality] = useState(videoSources[2]) // Default 720p
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isLooping, setIsLooping] = useState(false)
  const [buffered, setBuffered] = useState(0)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
        }, 3000)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", () => setShowControls(false))
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", () => setShowControls(false))
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

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

  const skipForward = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.min(video.currentTime + 10, duration)
  }

  const skipBackward = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.max(video.currentTime - 10, 0)
  }

  const toggleLoop = () => {
    const video = videoRef.current
    if (!video) return
    video.loop = !video.loop
    setIsLooping(video.loop)
    toast.success(video.loop ? "Loop enabled" : "Loop disabled")
  }

  const handleDownload = () => {
    toast.success("Download started")
    // Implement download logic
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  const handleReport = () => {
    toast.info("Report dialog opened")
    // Open report modal
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.volume = volume[0] / 100
  }, [volume])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setProgress([(video.currentTime / video.duration) * 100])
      
      // Calculate buffered
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        setBuffered((bufferedEnd / video.duration) * 100)
      }

      onTimeUpdate?.(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      if (autoPlay) {
        video.play().then(() => setIsPlaying(true))
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onEnded?.()
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleEnded)
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleEnded)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [selectedQuality, autoPlay, onTimeUpdate, onEnded])

  const handleProgressChange = (value: number[]) => {
    const video = videoRef.current
    if (!video || !duration) return
    video.currentTime = (value[0] / 100) * duration
    setProgress(value)
  }

  const handleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

const handlePiP = async () => {
  const video = videoRef.current as HTMLVideoElement & {
    requestPictureInPicture: () => Promise<PictureInPictureWindow>
  }

  if (video && document.pictureInPictureEnabled) {
    await video.requestPictureInPicture()
  }
}


  const toggleCaptions = () => {
    const video = videoRef.current
    if (!video) return

    const track = video.textTracks[0]
    if (track) {
      track.mode = track.mode === "showing" ? "hidden" : "showing"
      setShowCaptions(track.mode === "showing")
    }
  }

  const handlePlaybackRateChange = (rate: number) => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = rate
    setPlaybackRate(rate)
  }

const handleQualityChange = (source: typeof selectedQuality) => {
  const video = videoRef.current
  if (!video) return

  const currentTime = video.currentTime
  const wasPaused = video.paused

  // Pause and clear src before switching to ensure a clean change
  video.pause()
  video.removeAttribute("src")
  video.load()

  setSelectedQuality(source)

  // Wait for React to render new <source> before setting up listeners
  setTimeout(() => {
    const newVideo = videoRef.current
    if (!newVideo) return

    const onLoadedData = () => {
      newVideo.currentTime = currentTime

      if (!wasPaused) {
        newVideo.play().catch((err) => {
          console.warn("play() failed after quality switch:", err)
        })
      }

      newVideo.removeEventListener("loadeddata", onLoadedData)
    }

    newVideo.addEventListener("loadeddata", onLoadedData)
    newVideo.load() // reinitialize new source
  }, 50)
}



  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const video = videoRef.current
      if (!video) return

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault()
          togglePlay()
          break
        case "f":
          e.preventDefault()
          handleFullscreen()
          break
        case "m":
          e.preventDefault()
          toggleMute()
          break
        case "arrowleft":
          e.preventDefault()
          skipBackward()
          break
        case "arrowright":
          e.preventDefault()
          skipForward()
          break
        case "j":
          e.preventDefault()
          video.currentTime = Math.max(video.currentTime - 10, 0)
          break
        case "l":
          e.preventDefault()
          video.currentTime = Math.min(video.currentTime + 10, duration)
          break
        case "arrowup":
          e.preventDefault()
          setVolume([Math.min(volume[0] + 5, 100)])
          break
        case "arrowdown":
          e.preventDefault()
          setVolume([Math.max(volume[0] - 5, 0)])
          break
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          e.preventDefault()
          const percent = parseInt(e.key) * 10
          video.currentTime = (percent / 100) * duration
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [volume, duration, isPlaying])

  return (
    <div 
      ref={containerRef}
      className="relative bg-black rounded-lg overflow-hidden aspect-video group cursor-pointer"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={thumbnailUrl || "/placeholder.svg?height=480&width=854"}
        preload="metadata"
        playsInline
        loop={isLooping}
      >
        <source src={videoUrl || selectedQuality.src} type="video/mp4" />
        <track
          src="/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
          default
        />
        Your browser does not support the video tag.
      </video>

      {/* Loading indicator */}
      {!isPlaying && currentTime === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button size="lg" className="rounded-full h-16 w-16" onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
            <Play className="h-8 w-8" />
          </Button>
        </div>
      )}

      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 transition-opacity duration-300",
        showControls || !isPlaying ? "opacity-100" : "opacity-0"
      )}>
        {/* Top controls */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <h3 className="text-white font-semibold truncate">{title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white" onClick={(e) => e.stopPropagation()}>
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3" onClick={(e) => e.stopPropagation()}>

          {/* Progress Bar with Buffer */}
          <div className="relative">
            {/* Buffer indicator */}
            <div 
              className="absolute top-0 left-0 h-full bg-white/30 rounded-full"
              style={{ width: `${buffered}%` }}
            />
            <Slider
              value={progress}
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
              className="relative z-10"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center gap-1">
              <Button onClick={togglePlay} variant="ghost" size="icon" className="text-white h-9 w-9">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <Button onClick={skipBackward} variant="ghost" size="icon" className="text-white h-9 w-9">
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button onClick={skipForward} variant="ghost" size="icon" className="text-white h-9 w-9">
                <SkipForward className="h-4 w-4" />
              </Button>

              <Button onClick={toggleMute} variant="ghost" size="icon" className="text-white h-9 w-9">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>

              <div className="w-20">
                <Slider value={volume} onValueChange={setVolume} max={100} />
              </div>

              <span className="ml-2 min-w-[100px]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-1">
              <Button 
                onClick={toggleLoop} 
                variant="ghost" 
                size="icon" 
                className={cn("text-white h-9 w-9", isLooping && "bg-white/20")}
              >
                <Repeat className="h-4 w-4" />
              </Button>

              {/* Settings Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white h-9 w-9">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="p-2">
                    <p className="text-sm font-semibold mb-2">Playback Speed</p>
                    {playbackRates.map((rate) => (
                      <DropdownMenuItem 
                        key={rate} 
                        onClick={() => handlePlaybackRateChange(rate)}
                        className={cn(playbackRate === rate && "bg-accent")}
                      >
                        {rate}x {playbackRate === rate && "✓"}
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <p className="text-sm font-semibold mb-2">Quality</p>
                    {videoSources.map((s) => (
                      <DropdownMenuItem 
                        key={s.label} 
                        onClick={() => handleQualityChange(s)}
                        className={cn(selectedQuality.label === s.label && "bg-accent")}
                      >
                        {s.label} {selectedQuality.label === s.label && "✓"}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Captions */}
              <Button 
                onClick={toggleCaptions} 
                variant="ghost" 
                size="icon" 
                className={cn("text-white h-9 w-9", showCaptions && "bg-white/20")}
                title="Captions"
              >
                <span className="text-xs font-bold">CC</span>
              </Button>

              {/* Cast */}
              <Button onClick={() => toast.info("Cast feature coming soon")} variant="ghost" size="icon" className="text-white h-9 w-9 hidden md:flex">
                <Cast className="h-4 w-4" />
              </Button>

              {/* PiP */}
              <Button onClick={handlePiP} variant="ghost" size="icon" className="text-white h-9 w-9 hidden md:flex">
                <PictureInPicture className="h-4 w-4" />
              </Button>

              {/* Fullscreen */}
              <Button onClick={handleFullscreen} variant="ghost" size="icon" className="text-white h-9 w-9">
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
