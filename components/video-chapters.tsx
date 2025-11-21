"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface VideoChapter {
  id: string
  title: string
  timestamp: number // in seconds
  duration: number // in seconds
  thumbnail?: string
  views?: number
  mostReplayed?: boolean
}

interface VideoChaptersProps {
  chapters: VideoChapter[]
  currentTime: number
  duration: number
  onSeek: (time: number) => void
  className?: string
}

export function VideoChapters({
  chapters,
  currentTime,
  duration,
  onSeek,
  className,
}: VideoChaptersProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const getCurrentChapterIndex = () => {
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (currentTime >= chapters[i].timestamp) {
        return i
      }
    }
    return 0
  }

  const currentChapterIndex = getCurrentChapterIndex()
  const currentChapter = chapters[currentChapterIndex]

  const getProgress = (chapter: VideoChapter, index: number) => {
    if (index < currentChapterIndex) return 100
    if (index > currentChapterIndex) return 0
    
    const chapterEnd = chapters[index + 1]?.timestamp || duration
    const chapterDuration = chapterEnd - chapter.timestamp
    const elapsed = currentTime - chapter.timestamp
    return (elapsed / chapterDuration) * 100
  }

  return (
    <div className={cn("bg-background border rounded-lg", className)}>
      {/* Current Chapter Display */}
      <div className="p-4 border-b">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {formatTime(currentChapter.timestamp)}
              </span>
              {currentChapter.mostReplayed && (
                <Badge variant="secondary" className="text-xs">
                  Most Replayed
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-lg line-clamp-2">
              {currentChapter.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Chapter {currentChapterIndex + 1} of {chapters.length}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Chapters List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ScrollArea className="h-[400px]">
              <div className="p-2">
                {chapters.map((chapter, index) => {
                  const isCurrent = index === currentChapterIndex
                  const progress = getProgress(chapter, index)
                  const isHovered = hoveredChapter === chapter.id

                  return (
                    <motion.div
                      key={chapter.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => onSeek(chapter.timestamp)}
                        onMouseEnter={() => setHoveredChapter(chapter.id)}
                        onMouseLeave={() => setHoveredChapter(null)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg transition-all",
                          "hover:bg-accent group relative overflow-hidden",
                          isCurrent && "bg-accent border-l-4 border-primary"
                        )}
                      >
                        {/* Progress Bar */}
                        {isCurrent && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        )}

                        <div className="flex items-start gap-3">
                          {/* Thumbnail */}
                          {chapter.thumbnail && (
                            <div className="relative w-24 h-16 rounded overflow-hidden flex-shrink-0 bg-muted">
                              <img
                                src={chapter.thumbnail}
                                alt={chapter.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                                {formatTime(chapter.duration)}
                              </div>
                            </div>
                          )}

                          {/* Chapter Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={cn(
                                  "text-sm font-medium",
                                  isCurrent
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                )}
                              >
                                {formatTime(chapter.timestamp)}
                              </span>
                              {chapter.mostReplayed && (
                                <Badge variant="secondary" className="text-xs">
                                  🔥 Most Replayed
                                </Badge>
                              )}
                            </div>
                            <h4
                              className={cn(
                                "font-medium line-clamp-2 transition-colors",
                                isCurrent && "text-primary",
                                isHovered && "text-primary"
                              )}
                            >
                              {chapter.title}
                            </h4>
                            {chapter.views && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {chapter.views.toLocaleString()} views on this chapter
                              </p>
                            )}
                          </div>

                          {/* Play Icon on Hover */}
                          {isHovered && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex-shrink-0"
                            >
                              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-primary-foreground ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter Navigation */}
      {!isExpanded && (
        <div className="p-3 flex items-center justify-between border-t">
          <Button
            variant="outline"
            size="sm"
            disabled={currentChapterIndex === 0}
            onClick={() => onSeek(chapters[currentChapterIndex - 1]?.timestamp || 0)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentChapterIndex + 1} / {chapters.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentChapterIndex === chapters.length - 1}
            onClick={() =>
              onSeek(chapters[currentChapterIndex + 1]?.timestamp || duration)
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

// Mini Timeline with Chapters (for embedding in video player)
interface ChapterTimelineProps {
  chapters: VideoChapter[]
  currentTime: number
  duration: number
  onSeek: (time: number) => void
}

export function ChapterTimeline({
  chapters,
  currentTime,
  duration,
  onSeek,
}: ChapterTimelineProps) {
  const [hoveredTime, setHoveredTime] = useState<number | null>(null)

  const getChapterAtTime = (time: number) => {
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (time >= chapters[i].timestamp) {
        return chapters[i]
      }
    }
    return chapters[0]
  }

  return (
    <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden group cursor-pointer">
      {/* Chapter Segments */}
      {chapters.map((chapter, index) => {
        const nextChapter = chapters[index + 1]
        const start = (chapter.timestamp / duration) * 100
        const end = nextChapter
          ? (nextChapter.timestamp / duration) * 100
          : 100
        const width = end - start

        return (
          <div
            key={chapter.id}
            className="absolute h-full bg-muted-foreground/30 transition-colors hover:bg-muted-foreground/50"
            style={{
              left: `${start}%`,
              width: `${width}%`,
            }}
            onClick={() => onSeek(chapter.timestamp)}
            onMouseEnter={() => setHoveredTime(chapter.timestamp)}
            onMouseLeave={() => setHoveredTime(null)}
          />
        )
      })}

      {/* Progress Bar */}
      <div
        className="absolute h-full bg-primary transition-all"
        style={{ width: `${(currentTime / duration) * 100}%` }}
      />

      {/* Hover Preview */}
      {hoveredTime !== null && (
        <div className="absolute bottom-full mb-2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-popover text-popover-foreground px-2 py-1 rounded text-xs shadow-lg">
            {getChapterAtTime(hoveredTime).title}
          </div>
        </div>
      )}
    </div>
  )
}
