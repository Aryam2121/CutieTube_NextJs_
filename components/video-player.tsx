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
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils" // Optional: Utility for conditional classes

const playbackRates = [0.5, 1, 1.5, 2]
const videoSources = [
  { label: "480p", src: "/placeholder-480.mp4" },
  { label: "720p", src: "/placeholder-720.mp4" },
  { label: "1080p", src: "/placeholder-1080.mp4" },
]

export function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([80])
  const [progress, setProgress] = useState([0])
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showCaptions, setShowCaptions] = useState(true)
  const [selectedQuality, setSelectedQuality] = useState(videoSources[1]) // Default 720p

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

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
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [selectedQuality])

  const handleProgressChange = (value: number[]) => {
    const video = videoRef.current
    if (!video || !duration) return
    video.currentTime = (value[0] / 100) * duration
    setProgress(value)
  }

  const handleFullscreen = () => {
    const video = videoRef.current
    if (video?.requestFullscreen) {
      video.requestFullscreen()
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



  return (
    <div className="relative bg-black rounded-lg overflow-hidden aspect-video group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster="/placeholder.svg?height=480&width=854"
        preload="metadata"
        playsInline
      >
        <source src={selectedQuality.src} type="video/mp4" />
        <track
          src="/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
          default
        />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">

          {/* Progress */}
          <Slider
            value={progress}
            onValueChange={handleProgressChange}
            max={100}
            step={0.1}
          />

          {/* Controls */}
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center gap-2">
              <Button onClick={togglePlay} variant="ghost" size="icon" className="text-white">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <Button onClick={toggleMute} variant="ghost" size="icon" className="text-white">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>

              <div className="w-24">
                <Slider value={volume} onValueChange={setVolume} max={100} />
              </div>

              <span>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">

              {/* Playback Speed */}
              <select
                value={playbackRate}
                onChange={(e) => handlePlaybackRateChange(Number(e.target.value))}
                className="bg-transparent text-white border border-white/30 rounded px-2 py-1 text-xs"
              >
                {playbackRates.map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}x
                  </option>
                ))}
              </select>

              {/* Quality */}
              <select
                value={selectedQuality.label}
                onChange={(e) =>
                  handleQualityChange(
                    videoSources.find((s) => s.label === e.target.value) || selectedQuality
                  )
                }
                className="bg-transparent text-white border border-white/30 rounded px-2 py-1 text-xs"
              >
                {videoSources.map((s) => (
                  <option key={s.label} value={s.label}>
                    {s.label}
                  </option>
                ))}
              </select>

              {/* Captions */}
              <Button onClick={toggleCaptions} variant="ghost" size="icon" className="text-white">
                CC {showCaptions ? "✔️" : "❌"}
              </Button>

              {/* PiP */}
              <Button onClick={handlePiP} variant="ghost" size="icon" className="text-white">
                <PictureInPicture className="h-5 w-5" />
              </Button>

              {/* Fullscreen */}
              <Button onClick={handleFullscreen} variant="ghost" size="icon" className="text-white">
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
