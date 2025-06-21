import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { HistoryPage } from "@/components/history-page"

export default function History() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <HistoryPage />
        </main>
      </div>
    </div>
  )
}
