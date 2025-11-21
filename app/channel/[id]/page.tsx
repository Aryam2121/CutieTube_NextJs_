"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { VideoCard } from "@/components/video-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  BellOff,
  Share2,
  Flag,
  MoreHorizontal,
  CheckCircle,
  Play,
  Grid3x3,
  List,
  MessageSquare,
  Users,
  Info,
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"

// Mock data
const channelData = {
  id: "channel-1",
  name: "Tech Master",
  handle: "@techmaster",
  avatar: "/placeholder.svg?text=TM",
  banner: "/placeholder.svg?height=200&width=1200&text=Channel+Banner",
  isVerified: true,
  subscribers: 2500000,
  totalVideos: 342,
  totalViews: 125000000,
  description: "Welcome to Tech Master! Your go-to channel for technology tutorials, reviews, and tips. New videos every Tuesday and Friday! 🚀",
  joinedDate: "Jan 2020",
  links: [
    { label: "Website", url: "https://techmaster.com" },
    { label: "Twitter", url: "https://twitter.com/techmaster" },
  ],
}

const mockVideos = Array.from({ length: 12 }, (_, i) => ({
  id: `video-${i}`,
  title: `Amazing Tech Tutorial ${i + 1} - Complete Guide`,
  thumbnail: `/placeholder.svg?height=180&width=320&text=Video+${i + 1}`,
  duration: `${Math.floor(Math.random() * 30) + 5}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  views: Math.floor(Math.random() * 1000000),
  uploadedAt: `${Math.floor(Math.random() * 30) + 1} days ago`,
  channel: {
    name: channelData.name,
    avatar: channelData.avatar,
    isVerified: channelData.isVerified,
  },
}))

const mockPlaylists = [
  {
    id: "playlist-1",
    title: "Complete Programming Course",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Playlist+1",
    videoCount: 42,
    totalViews: 2500000,
  },
  {
    id: "playlist-2",
    title: "Web Development Tutorials",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Playlist+2",
    videoCount: 28,
    totalViews: 1800000,
  },
]

const mockPosts = [
  {
    id: "post-1",
    content: "New video coming tomorrow! Can you guess what it's about? 🤔",
    image: "/placeholder.svg?height=300&width=400&text=Post+Image",
    likes: 15000,
    comments: 342,
    timestamp: "2 hours ago",
  },
  {
    id: "post-2",
    content: "Thank you for 2.5M subscribers! 🎉 Big announcement coming soon!",
    likes: 52000,
    comments: 1240,
    timestamp: "1 day ago",
  },
]

export default function ChannelPage() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [notificationsOn, setNotificationsOn] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
    toast.success(isSubscribed ? "Unsubscribed" : "Subscribed!")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: channelData.name,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {/* Banner */}
          <div className="relative h-32 sm:h-48 md:h-64 bg-muted">
            <Image
              src={channelData.banner}
              alt="Channel banner"
              fill
              className="object-cover"
            />
          </div>

          {/* Channel Info */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 border-b">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Avatar */}
                <Avatar className="h-20 w-20 sm:h-32 sm:w-32 border-4 border-background -mt-10 sm:-mt-16">
                  <AvatarImage src={channelData.avatar} />
                  <AvatarFallback>{channelData.name[0]}</AvatarFallback>
                </Avatar>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                        {channelData.name}
                        {channelData.isVerified && (
                          <CheckCircle className="h-6 w-6 fill-primary text-primary-foreground" />
                        )}
                      </h1>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span>{channelData.handle}</span>
                        <span>•</span>
                        <span>{formatNumber(channelData.subscribers)} subscribers</span>
                        <span>•</span>
                        <span>{channelData.totalVideos} videos</span>
                      </div>
                      <p className="mt-2 text-sm line-clamp-2">{channelData.description}</p>
                      
                      {/* Links */}
                      <div className="flex gap-3 mt-2">
                        {channelData.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.url}
                            className="text-sm text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleSubscribe}
                        variant={isSubscribed ? "outline" : "default"}
                        size="lg"
                        className="gap-2"
                      >
                        {isSubscribed ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Subscribed
                          </>
                        ) : (
                          "Subscribe"
                        )}
                      </Button>

                      {isSubscribed && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setNotificationsOn(!notificationsOn)
                            toast.success(
                              notificationsOn ? "Notifications off" : "All notifications on"
                            )
                          }}
                        >
                          {notificationsOn ? (
                            <Bell className="h-4 w-4" />
                          ) : (
                            <BellOff className="h-4 w-4" />
                          )}
                        </Button>
                      )}

                      <Button variant="outline" size="icon" onClick={handleShare}>
                        <Share2 className="h-4 w-4" />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Flag className="mr-2 h-4 w-4" />
                            Report channel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="videos" className="mt-6">
              <div className="flex items-center justify-between border-b">
                <TabsList className="h-auto p-0 bg-transparent">
                  <TabsTrigger
                    value="videos"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Videos
                  </TabsTrigger>
                  <TabsTrigger
                    value="shorts"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    <Grid3x3 className="h-4 w-4 mr-2" />
                    Shorts
                  </TabsTrigger>
                  <TabsTrigger
                    value="playlists"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    <List className="h-4 w-4 mr-2" />
                    Playlists
                  </TabsTrigger>
                  <TabsTrigger
                    value="community"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Community
                  </TabsTrigger>
                  <TabsTrigger
                    value="about"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    <Info className="h-4 w-4 mr-2" />
                    About
                  </TabsTrigger>
                </TabsList>

                <div className="flex gap-2 py-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="videos" className="py-6">
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-4"
                }>
                  {mockVideos.map((video) => (
                    <VideoCard key={video.id} video={video} layout={viewMode} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shorts" className="py-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Link key={i} href={`/shorts/short-${i}`} className="group">
                      <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-muted">
                        <Image
                          src={`/placeholder.svg?text=Short+${i + 1}`}
                          alt={`Short ${i + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-xs font-semibold line-clamp-2">
                            Amazing short video {i + 1}
                          </p>
                          <p className="text-white/80 text-xs mt-1">
                            {formatNumber(Math.floor(Math.random() * 1000000))} views
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="playlists" className="py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {mockPlaylists.map((playlist) => (
                    <Link key={playlist.id} href={`/playlist/${playlist.id}`} className="group">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-3">
                        <Image
                          src={playlist.thumbnail}
                          alt={playlist.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                          <Play className="h-12 w-12 text-white mb-2" />
                          <p className="text-white text-sm font-semibold">
                            {playlist.videoCount} videos
                          </p>
                        </div>
                      </div>
                      <h3 className="font-semibold line-clamp-2 group-hover:text-primary">
                        {playlist.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatNumber(playlist.totalViews)} views
                      </p>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="community" className="py-6">
                <div className="max-w-2xl space-y-6">
                  {mockPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={channelData.avatar} />
                          <AvatarFallback>{channelData.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{channelData.name}</span>
                            {channelData.isVerified && (
                              <CheckCircle className="h-4 w-4 fill-primary text-primary-foreground" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                          <p className="mt-3">{post.content}</p>
                          {post.image && (
                            <div className="relative mt-4 aspect-video rounded-lg overflow-hidden">
                              <Image
                                src={post.image}
                                alt="Post image"
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                            <button className="flex items-center gap-2 hover:text-foreground">
                              <Users className="h-4 w-4" />
                              {formatNumber(post.likes)}
                            </button>
                            <button className="flex items-center gap-2 hover:text-foreground">
                              <MessageSquare className="h-4 w-4" />
                              {formatNumber(post.comments)}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="about" className="py-6">
                <div className="max-w-3xl space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{channelData.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Channel Stats</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <p className="text-3xl font-bold">{formatNumber(channelData.subscribers)}</p>
                        <p className="text-sm text-muted-foreground">Subscribers</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <p className="text-3xl font-bold">{channelData.totalVideos}</p>
                        <p className="text-sm text-muted-foreground">Videos</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <p className="text-3xl font-bold">{formatNumber(channelData.totalViews)}</p>
                        <p className="text-sm text-muted-foreground">Total Views</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        Joined {channelData.joinedDate}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Links</h3>
                    <div className="flex flex-wrap gap-3">
                      {channelData.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.url}
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
