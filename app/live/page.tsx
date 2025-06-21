import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { LiveStreaming } from "@/components/live-streaming"

export default function LivePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-6">
          <LiveStreaming />
        </main>
      </div>
    </div>
  )
}
