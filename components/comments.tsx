"use client"

import {
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
} from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

const initialComments = [
  {
    id: 1,
    author: "CodeMaster",
    avatar: "/placeholder.svg",
    time: "2 hours ago",
    content:
      "Great tutorial! Really helped me understand the concepts better.",
    likes: 24,
    replies: 3,
  },
  {
    id: 2,
    author: "WebDevPro",
    avatar: "/placeholder.svg",
    time: "5 hours ago",
    content: "This is exactly what I was looking for. Thanks for sharing!",
    likes: 12,
    replies: 1,
  },
  {
    id: 3,
    author: "ReactFan",
    avatar: "/placeholder.svg",
    time: "1 day ago",
    content: "Amazing work! Could you make a video about state management next?",
    likes: 8,
    replies: 0,
  },
]

interface CommentsProps {
  videoId: string
}

export function Comments({ videoId }: CommentsProps) {
  const [comments, setComments] = useState(initialComments)
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({})
  const [dislikedMap, setDislikedMap] = useState<Record<number, boolean>>({})
  const [replyOpenMap, setReplyOpenMap] = useState<Record<number, boolean>>({})
  const [newComment, setNewComment] = useState("")
  const [sortBy, setSortBy] = useState<"Top" | "Newest">("Top")

  const toggleLike = (id: number) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }))
    if (!likedMap[id]) {
      setDislikedMap((prev) => ({ ...prev, [id]: false }))
    }
  }

  const toggleDislike = (id: number) => {
    setDislikedMap((prev) => ({ ...prev, [id]: !prev[id] }))
    if (!dislikedMap[id]) {
      setLikedMap((prev) => ({ ...prev, [id]: false }))
    }
  }

  const toggleReplyInput = (id: number) => {
    setReplyOpenMap((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return
    const newEntry = {
      id: comments.length + 1,
      author: "You",
      avatar: "/placeholder.svg",
      time: "Just now",
      content: newComment,
      likes: 0,
      replies: 0,
    }
    setComments([newEntry, ...comments])
    setNewComment("")
    toast.success("Comment added!")
  }

  const sortedComments =
    sortBy === "Top"
      ? [...comments].sort((a, b) => b.likes - a.likes)
      : [...comments].sort((a, b) => b.id - a.id)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {comments.length.toLocaleString()} Comments
        </h2>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-1">
              Sort by: {sortBy}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortBy("Top")}>
              Top Comments
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("Newest")}>
              Newest First
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* New Comment */}
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Add a comment..."
            className="min-h-[80px] resize-none"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setNewComment("")}>
              Cancel
            </Button>
            <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
              Comment
            </Button>
          </div>
        </div>
      </div>

      {/* All Comments */}
      <div className="space-y-6">
        {sortedComments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.avatar} />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">
                  {comment.author}
                </span>
                <span className="text-xs text-muted-foreground">
                  {comment.time}
                </span>
              </div>
              <p className="text-sm">{comment.content}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Button
                    variant={likedMap[comment.id] ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7 gap-1"
                    onClick={() => toggleLike(comment.id)}
                  >
                    <ThumbsUp className="h-3 w-3" />
                    {comment.likes + (likedMap[comment.id] ? 1 : 0)}
                  </Button>

                  <Button
                    variant={dislikedMap[comment.id] ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7"
                    onClick={() => toggleDislike(comment.id)}
                  >
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7"
                  onClick={() => toggleReplyInput(comment.id)}
                >
                  Reply
                </Button>

                {/* More Options */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Report</DropdownMenuItem>
                    <DropdownMenuItem>Save</DropdownMenuItem>
                    <DropdownMenuItem disabled>Edit</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Reply Field */}
              {replyOpenMap[comment.id] && (
                <div className="mt-2 ml-2 space-y-2">
                  <Textarea placeholder="Write a reply..." className="min-h-[60px]" />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => toggleReplyInput(comment.id)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => toast.success("Reply added!")}>
                      Reply
                    </Button>
                  </div>
                </div>
              )}

              {/* View replies */}
              {comment.replies > 0 && (
                <Button
                  variant="link"
                  className="p-0 h-auto text-blue-600 text-xs"
                >
                  View {comment.replies}{" "}
                  {comment.replies === 1 ? "reply" : "replies"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
