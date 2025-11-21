"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence, useDragControls } from "framer-motion"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Minimize2,
  SkipBack,
  SkipForward,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MiniPlayerProps {
  videoUrl: string
  title: string
  channel: string
  thumbnail?: string
  isActive: boolean
  onClose: () => void
  onMaximize: () => void
}

export function MiniPlayer({
  videoUrl,
  title,
  channel,
  thumbnail,
  isActive,
  onClose,
  onMaximize,
}: MiniPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([80])
  const [progress, setProgress] = useState([0])
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const dragControls = useDragControls()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      setCurrentTime(video.currentTime)
      setProgress([(video.currentTime / video.duration) * 100])
    }

    const updateDuration = () => {
      setDuration(video.duration)
    }

    video.addEventListener("timeupdate", updateProgress)
    video.addEventListener("loadedmetadata", updateDuration)

    return () => {
      video.removeEventListener("timeupdate", updateProgress)
      video.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.play()
    } else {
      video.pause()
    }
  }, [isPlaying])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    if (videoRef.current) {
      videoRef.current.volume = value[0] / 100
    }
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value)
    if (videoRef.current) {
      videoRef.current.currentTime = (value[0] / 100) * duration
    }
  }

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 10,
        duration
      )
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  if (!isActive) return null

  return (
    <AnimatePresence>
      <motion.div
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false)
          setPosition({ x: info.point.x, y: info.point.y })
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed z-50 shadow-2xl rounded-lg overflow-hidden border-2 border-border bg-background"
        style={{
          width: "400px",
          height: "auto",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            autoPlay
            loop
          />

          {/* Overlay Controls */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80"
              >
                {/* Top Bar */}
                <div className="absolute top-0 left-0 right-0 p-2 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-white text-sm font-semibold truncate">
                      {title}
                    </h4>
                    <p className="text-white/70 text-xs truncate">{channel}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={onMaximize}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={onClose}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-16 w-16 rounded-full bg-black/50 hover:bg-black/70 text-white"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8 ml-1" />
                    )}
                  </Button>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-2 space-y-2">
                  {/* Progress Bar */}
                  <div className="px-2">
                    <Slider
                      value={progress}
                      onValueChange={handleProgressChange}
                      max={100}
                      step={0.1}
                      className="cursor-pointer"
                    />
                    <div className="flex items-center justify-between text-white text-xs mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={skipBackward}
                      >
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4 ml-0.5" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={skipForward}
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white hover:bg-white/20"
                          onClick={toggleMute}
                        >
                          {isMuted ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                        <div className="w-16">
                          <Slider
                            value={volume}
                            onValueChange={handleVolumeChange}
                            max={100}
                            step={1}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Picture-in-Picture Native Browser API Support
export function usePictureInPicture(videoRef: React.RefObject<HTMLVideoElement>) {
  const [isPiP, setIsPiP] = useState(false)

  const enterPiP = async () => {
    if (!videoRef.current) return

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await videoRef.current.requestPictureInPicture()
      }
    } catch (error) {
      console.error("PiP error:", error)
    }
  }

  const exitPiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      }
    } catch (error) {
      console.error("Exit PiP error:", error)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnterPiP = () => setIsPiP(true)
    const handleLeavePiP = () => setIsPiP(false)

    video.addEventListener("enterpictureinpicture", handleEnterPiP)
    video.addEventListener("leavepictureinpicture", handleLeavePiP)

    return () => {
      video.removeEventListener("enterpictureinpicture", handleEnterPiP)
      video.removeEventListener("leavepictureinpicture", handleLeavePiP)
    }
  }, [videoRef])

  return { isPiP, enterPiP, exitPiP }
}
