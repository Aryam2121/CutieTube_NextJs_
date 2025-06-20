import { Suspense } from "react"
import { SearchResults } from "@/components/search-results"
import { SearchFilters } from "@/components/search-filters"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-6">
          <div className="space-y-6">
            <SearchFilters />
            <Suspense fallback={<div>Loading...</div>}>
              <SearchResults />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}
