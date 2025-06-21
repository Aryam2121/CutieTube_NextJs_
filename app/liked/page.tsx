import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { LikedVideosPage } from "@/components/liked-videos-page"

export default function LikedVideos() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <LikedVideosPage />
        </main>
      </div>
    </div>
  )
}
