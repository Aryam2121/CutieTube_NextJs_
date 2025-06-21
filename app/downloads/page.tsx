import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { DownloadsPage } from "@/components/downloads-page"

export default function Downloads() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <DownloadsPage />
        </main>
      </div>
    </div>
  )
}
