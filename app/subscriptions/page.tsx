import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { SubscriptionsPage } from "@/components/subscriptions-page"

export default function Subscriptions() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <SubscriptionsPage />
        </main>
      </div>
    </div>
  )
}
