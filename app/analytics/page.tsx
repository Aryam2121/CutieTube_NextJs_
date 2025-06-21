import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { VideoAnalytics } from "@/components/video-analytics"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-6">
          <VideoAnalytics />
        </main>
      </div>
    </div>
  )
}
