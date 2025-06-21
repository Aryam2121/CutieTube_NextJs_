import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ExplorePage } from "@/components/explore-page"

export default function Explore() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <ExplorePage />
        </main>
      </div>
    </div>
  )
}
