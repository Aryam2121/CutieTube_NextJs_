import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function VideoInfo() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold mb-2">Building a Modern YouTube Clone with Next.js and React</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>1,234,567 views</span>
          <span>•</span>
          <span>2 days ago</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>TC</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">TechCoder</h3>
            <p className="text-sm text-muted-foreground">2.5M subscribers</p>
          </div>
          <Button className="rounded-full">Subscribe</Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted rounded-full">
            <Button variant="ghost" className="rounded-l-full gap-2">
              <ThumbsUp className="h-4 w-4" />
              12K
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" className="rounded-r-full">
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="ghost" className="rounded-full gap-2">
            <Share className="h-4 w-4" />
            Share
          </Button>

          <Button variant="ghost" className="rounded-full gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">Tutorial</Badge>
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">React</Badge>
        </div>
        <p className="text-sm">
          In this comprehensive tutorial, we'll build a modern YouTube clone from scratch using Next.js, React, and
          Tailwind CSS. We'll cover everything from setting up the project to implementing video playback, user
          authentication, and responsive design.
        </p>
        <Button variant="link" className="p-0 h-auto mt-2">
          Show more
        </Button>
      </div>
    </div>
  )
}
