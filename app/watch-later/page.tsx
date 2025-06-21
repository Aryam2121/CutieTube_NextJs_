import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { WatchLaterPage } from "@/components/watch-later-page"

export default function WatchLater() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <WatchLaterPage />
        </main>
      </div>
    </div>
  )
}
