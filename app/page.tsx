import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { VideoPlayer } from "@/components/video-player"
import { VideoInfo } from "@/components/video-info"
import { Comments } from "@/components/comments"
import { VideoRecommendations } from "@/components/video-recommendations"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-4">
              <VideoPlayer />
              <VideoInfo />
              <Comments />
            </div>
            <div className="xl:col-span-1">
              <VideoRecommendations />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
