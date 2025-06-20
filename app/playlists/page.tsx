import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { PlaylistManager } from "@/components/playlist-manager"

export default function PlaylistsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">My Playlists</h1>
            <PlaylistManager />
          </div>
        </main>
      </div>
    </div>
  )
}
