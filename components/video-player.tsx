"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState([30])
  const [volume, setVolume] = useState([80])

  return (
    <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
      <video
        className="w-full h-full object-cover"
        poster="/placeholder.svg?height=480&width=854"
        preload="metadata"
        playsInline
      >
        <source src="/placeholder-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Controls Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider value={progress} onValueChange={setProgress} max={100} step={1} className="w-full" />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <div className="w-20">
                  <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
                </div>
              </div>

              <span className="text-white text-sm">2:30 / 10:45</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
