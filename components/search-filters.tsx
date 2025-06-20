"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter, Calendar, Clock, Eye } from "lucide-react"

export function SearchFilters() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>All</DropdownMenuItem>
          <DropdownMenuItem>Videos</DropdownMenuItem>
          <DropdownMenuItem>Channels</DropdownMenuItem>
          <DropdownMenuItem>Playlists</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Upload date
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Last hour</DropdownMenuItem>
          <DropdownMenuItem>Today</DropdownMenuItem>
          <DropdownMenuItem>This week</DropdownMenuItem>
          <DropdownMenuItem>This month</DropdownMenuItem>
          <DropdownMenuItem>This year</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Duration
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Under 4 minutes</DropdownMenuItem>
          <DropdownMenuItem>4-20 minutes</DropdownMenuItem>
          <DropdownMenuItem>Over 20 minutes</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Sort by
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Relevance</DropdownMenuItem>
          <DropdownMenuItem>Upload date</DropdownMenuItem>
          <DropdownMenuItem>View count</DropdownMenuItem>
          <DropdownMenuItem>Rating</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
