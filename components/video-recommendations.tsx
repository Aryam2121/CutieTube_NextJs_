import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const recommendations = [
  {
    id: 1,
    title: "React Hooks Explained in 10 Minutes",
    channel: "ReactMaster",
    views: "856K views",
    time: "3 days ago",
    duration: "10:23",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 2,
    title: "CSS Grid vs Flexbox - Complete Guide",
    channel: "CSSGuru",
    views: "1.2M views",
    time: "1 week ago",
    duration: "15:45",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 3,
    title: "JavaScript ES6 Features You Must Know",
    channel: "JSExpert",
    views: "2.1M views",
    time: "2 weeks ago",
    duration: "22:18",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 4,
    title: "Building REST APIs with Node.js",
    channel: "BackendDev",
    views: "945K views",
    time: "3 weeks ago",
    duration: "18:32",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 5,
    title: "TypeScript for Beginners",
    channel: "TypeScriptPro",
    views: "1.8M views",
    time: "1 month ago",
    duration: "25:14",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

export function VideoRecommendations() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Up next</h2>
      <div className="space-y-3">
        {recommendations.map((video) => (
          <Link key={video.id} href={`/watch?v=${video.id}`} className="block group">
            <div className="flex gap-3">
              <div className="relative flex-shrink-0">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  width={200}
                  height={120}
                  className="rounded-lg object-cover w-40 h-24 group-hover:opacity-80 transition-opacity"
                />
                <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs">{video.duration}</Badge>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {video.title}
                </h3>
                <div className="mt-1 space-y-1">
                  <p className="text-xs text-muted-foreground">{video.channel}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{video.views}</span>
                    <span>•</span>
                    <span>{video.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
