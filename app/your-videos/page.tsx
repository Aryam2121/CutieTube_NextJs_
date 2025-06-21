import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { YourVideosPage } from "@/components/your-videos-page"

export default function YourVideos() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <YourVideosPage />
        </main>
      </div>
    </div>
  )
}
