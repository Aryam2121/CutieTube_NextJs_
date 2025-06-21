import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Monetization } from "@/components/monetization"

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-6">
          <Monetization />
        </main>
      </div>
    </div>
  )
}
