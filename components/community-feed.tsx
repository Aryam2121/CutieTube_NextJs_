"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreVertical,
  Image as ImageIcon,
  Video,
  Smile,
  Send,
  CheckCircle,
  Heart,
  Flag,
  Bookmark,
  TrendingUp,
  BarChart3,
} from "lucide-react"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CommunityPost {
  id: string
  type: "text" | "image" | "video" | "poll" | "quiz"
  author: {
    id: string
    name: string
    avatar: string
    isVerified: boolean
  }
  content: string
  media?: {
    type: "image" | "video"
    url: string
    thumbnail?: string
  }[]
  poll?: {
    question: string
    options: {
      id: string
      text: string
      votes: number
    }[]
    totalVotes: number
    endsAt?: Date
  }
  likes: number
  comments: number
  shares: number
  timestamp: Date
  isLiked?: boolean
  isBookmarked?: boolean
}

// Mock data
const mockPosts: CommunityPost[] = [
  {
    id: "1",
    type: "poll",
    author: {
      id: "1",
      name: "Tech Master",
      avatar: "/placeholder.svg?text=TM",
      isVerified: true,
    },
    content: "What topic should I cover in my next video? Your input matters! 🎥",
    poll: {
      question: "Next video topic?",
      options: [
        { id: "1", text: "Advanced React Patterns", votes: 1234 },
        { id: "2", text: "Node.js Performance", votes: 892 },
        { id: "3", text: "Docker & Kubernetes", votes: 2145 },
        { id: "4", text: "GraphQL Best Practices", votes: 678 },
      ],
      totalVotes: 4949,
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    },
    likes: 3420,
    comments: 156,
    shares: 89,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: "2",
    type: "image",
    author: {
      id: "1",
      name: "Tech Master",
      avatar: "/placeholder.svg?text=TM",
      isVerified: true,
    },
    content: "Just finished editing the new tutorial! Can't wait to share it with you all tomorrow at 3 PM 🚀✨\n\n#WebDevelopment #Coding #Tutorial",
    media: [
      {
        type: "image",
        url: "/placeholder.svg?height=400&width=600&text=Preview+Image",
      },
    ],
    likes: 8945,
    comments: 342,
    shares: 234,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "3",
    type: "text",
    author: {
      id: "1",
      name: "Tech Master",
      avatar: "/placeholder.svg?text=TM",
      isVerified: true,
    },
    content: "🎉 THANK YOU for 2.5 MILLION subscribers! 🎉\n\nI couldn't have done this without your support. Big announcement coming this Friday! Stay tuned! 💫",
    likes: 25430,
    comments: 1240,
    shares: 567,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
]

export function CommunityFeed() {
  const [posts, setPosts] = useState<CommunityPost[]>(mockPosts)
  const [newPostContent, setNewPostContent] = useState("")
  const [showCreatePost, setShowCreatePost] = useState(false)

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    )
  }

  const handleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    )
    const post = posts.find((p) => p.id === postId)
    toast.success(post?.isBookmarked ? "Removed from saved" : "Saved to bookmarks")
  }

  const handleShare = (post: CommunityPost) => {
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.author.name}`,
        text: post.content,
        url: `/community/post/${post.id}`,
      })
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/community/post/${post.id}`)
      toast.success("Link copied to clipboard")
    }
  }

  const handleVote = (postId: string, optionId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId || !post.poll) return post
        
        return {
          ...post,
          poll: {
            ...post.poll,
            options: post.poll.options.map((opt) =>
              opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
            ),
            totalVotes: post.poll.totalVotes + 1,
          },
        }
      })
    )
    toast.success("Vote recorded!")
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Create Post */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?text=You" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 justify-start text-muted-foreground">
                  Share something with your subscribers...
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create a post</DialogTitle>
                  <DialogDescription>
                    Share updates, polls, or images with your community
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="What's on your mind?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[150px] resize-none"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Image
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="mr-2 h-4 w-4" />
                      Video
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Poll
                    </Button>
                    <Button variant="outline" size="sm">
                      <Smile className="mr-2 h-4 w-4" />
                      Emoji
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      toast.success("Post created!")
                      setShowCreatePost(false)
                      setNewPostContent("")
                    }}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Post
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Posts Feed */}
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Link href={`/channel/${post.author.id}`}>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/channel/${post.author.id}`}
                      className="font-semibold hover:underline"
                    >
                      {post.author.name}
                    </Link>
                    {post.author.isVerified && (
                      <CheckCircle className="h-4 w-4 fill-primary text-primary-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleBookmark(post.id)}>
                    <Bookmark className="mr-2 h-4 w-4" />
                    {post.isBookmarked ? "Remove from saved" : "Save post"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Flag className="mr-2 h-4 w-4" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Content */}
            <p className="whitespace-pre-wrap">{post.content}</p>

            {/* Media */}
            {post.media && post.media.length > 0 && (
              <div className="grid gap-2">
                {post.media.map((item, idx) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={item.url}
                      alt="Post media"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Poll */}
            {post.poll && (
              <div className="space-y-3 border rounded-lg p-4">
                <h4 className="font-semibold">{post.poll.question}</h4>
                <div className="space-y-2">
                  {post.poll.options.map((option) => {
                    const percentage = ((option.votes / post.poll!.totalVotes) * 100).toFixed(1)
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleVote(post.id, option.id)}
                        className="w-full text-left"
                      >
                        <div className="relative border rounded-lg p-3 hover:bg-muted/50 transition-colors overflow-hidden">
                          <div
                            className="absolute inset-0 bg-primary/10"
                            style={{ width: `${percentage}%` }}
                          />
                          <div className="relative flex items-center justify-between">
                            <span className="font-medium">{option.text}</span>
                            <span className="text-sm text-muted-foreground">
                              {percentage}% ({formatNumber(option.votes)})
                            </span>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatNumber(post.poll.totalVotes)} votes
                  {post.poll.endsAt && (
                    <> • Ends {formatDistanceToNow(post.poll.endsAt, { addSuffix: true })}</>
                  )}
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={cn(post.isLiked && "text-primary")}
              >
                <ThumbsUp className={cn("h-4 w-4 mr-2", post.isLiked && "fill-current")} />
                {formatNumber(post.likes)}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                {formatNumber(post.comments)}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleShare(post)}>
                <Share2 className="h-4 w-4 mr-2" />
                {formatNumber(post.shares)}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <Button variant="outline">
          <TrendingUp className="mr-2 h-4 w-4" />
          Load more posts
        </Button>
      </div>
    </div>
  )
}
