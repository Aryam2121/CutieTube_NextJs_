import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, MoreVertical } from "lucide-react"

const comments = [
  {
    id: 1,
    author: "CodeMaster",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "2 hours ago",
    content:
      "Great tutorial! Really helped me understand the concepts better. The explanation was clear and easy to follow.",
    likes: 24,
    replies: 3,
  },
  {
    id: 2,
    author: "WebDevPro",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "5 hours ago",
    content: "This is exactly what I was looking for. Thanks for sharing!",
    likes: 12,
    replies: 1,
  },
  {
    id: 3,
    author: "ReactFan",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "1 day ago",
    content: "Amazing work! Could you make a video about state management next?",
    likes: 8,
    replies: 0,
  },
]

export function Comments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-8">
        <h2 className="text-xl font-semibold">1,234 Comments</h2>
        <Button variant="ghost" className="gap-2">
          Sort by
        </Button>
      </div>

      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea placeholder="Add a comment..." className="min-h-[80px] resize-none" />
          <div className="flex justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button>Comment</Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.avatar || "/placeholder.svg"} />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{comment.author}</span>
                <span className="text-xs text-muted-foreground">{comment.time}</span>
              </div>
              <p className="text-sm">{comment.content}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {comment.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="h-8">
                  Reply
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </div>
              {comment.replies > 0 && (
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  View {comment.replies} {comment.replies === 1 ? "reply" : "replies"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
