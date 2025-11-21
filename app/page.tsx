import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { VideoCard } from "@/components/video-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Flame, TrendingUp, Music, Gamepad2, Film, Newspaper } from "lucide-react"

// Mock data - replace with actual API calls
const categories = [
  { id: "all", label: "All", icon: null },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "music", label: "Music", icon: Music },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "movies", label: "Movies", icon: Film },
  { id: "news", label: "News", icon: Newspaper },
]

const mockVideos = Array.from({ length: 24 }, (_, i) => ({
  id: `video-${i}`,
  title: `Amazing Video Title ${i + 1} - Full Tutorial and Guide`,
  thumbnail: `/placeholder.svg?height=180&width=320&text=Video+${i + 1}`,
  duration: `${Math.floor(Math.random() * 30) + 5}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  views: Math.floor(Math.random() * 1000000),
  uploadedAt: `${Math.floor(Math.random() * 30) + 1} days ago`,
  channel: {
    name: `Channel ${i + 1}`,
    avatar: `/placeholder.svg?height=40&width=40&text=C${i + 1}`,
    isVerified: Math.random() > 0.5,
  },
}))

const trendingVideos = mockVideos.slice(0, 12)
const musicVideos = mockVideos.slice(12, 24)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {/* Category Pills */}
          <div className="sticky top-0 z-40 bg-background border-b">
            <div className="flex gap-3 p-4 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={category.id === "all" ? "default" : "secondary"}
                  className="cursor-pointer whitespace-nowrap hover:bg-primary/90 transition-colors px-4 py-2 text-sm"
                >
                  {category.icon && <category.icon className="h-4 w-4 mr-2" />}
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-4 lg:p-6">
            <Tabs defaultValue="home" className="space-y-6">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="home" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  <Flame className="h-4 w-4 mr-2" />
                  Home
                </TabsTrigger>
                <TabsTrigger 
                  value="trending"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger 
                  value="subscriptions"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Subscriptions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="home" className="mt-0 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Recommended for you</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {mockVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="trending" className="mt-0 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Flame className="h-6 w-6 text-orange-500" />
                    Trending Now
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {trendingVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Music className="h-6 w-6 text-purple-500" />
                    Trending Music
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {musicVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="subscriptions" className="mt-0">
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Sign in to see videos from channels you subscribe to</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
