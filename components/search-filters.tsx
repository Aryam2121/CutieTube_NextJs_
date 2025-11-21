"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { 
  Filter, 
  Calendar, 
  Clock, 
  Eye,
  Video,
  Users,
  List,
  Film,
  TrendingUp,
  Star,
  ThumbsUp,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchFiltersProps {
  onFilterChange?: (filters: any) => void
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps = {}) {
  const [selectedType, setSelectedType] = useState("all")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null)
  const [selectedSort, setSelectedSort] = useState("relevance")
  const [features, setFeatures] = useState({
    live: false,
    hd: false,
    subtitles: false,
    creative_commons: false,
    "360": false,
    vr180: false,
    "3d": false,
    hdr: false,
    location: false,
    purchased: false,
  })

  const activeFiltersCount = 
    (selectedType !== "all" ? 1 : 0) +
    (selectedDate ? 1 : 0) +
    (selectedDuration ? 1 : 0) +
    (selectedSort !== "relevance" ? 1 : 0) +
    Object.values(features).filter(Boolean).length

  const resetFilters = () => {
    setSelectedType("all")
    setSelectedDate(null)
    setSelectedDuration(null)
    setSelectedSort("relevance")
    setFeatures({
      live: false,
      hd: false,
      subtitles: false,
      creative_commons: false,
      "360": false,
      vr180: false,
      "3d": false,
      hdr: false,
      location: false,
      purchased: false,
    })
    onFilterChange?.({
      type: "all",
      date: null,
      duration: null,
      sort: "relevance",
      features: {},
    })
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Type Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={cn(selectedType !== "all" && "border-primary")}>
            <Filter className="mr-2 h-4 w-4" />
            Type{selectedType !== "all" && ": " + selectedType}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Content Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[
            { value: "all", label: "All", icon: null },
            { value: "video", label: "Videos", icon: Video },
            { value: "channel", label: "Channels", icon: Users },
            { value: "playlist", label: "Playlists", icon: List },
            { value: "short", label: "Shorts", icon: Film },
            { value: "live", label: "Live", icon: Eye },
          ].map((type) => (
            <DropdownMenuItem
              key={type.value}
              onClick={() => {
                setSelectedType(type.value)
                onFilterChange?.({ type: type.value })
              }}
              className={cn(selectedType === type.value && "bg-accent")}
            >
              {type.icon && <type.icon className="mr-2 h-4 w-4" />}
              {type.label}
              {selectedType === type.value && " ✓"}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Upload Date */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={cn(selectedDate && "border-primary")}>
            <Calendar className="mr-2 h-4 w-4" />
            {selectedDate ? selectedDate.charAt(0).toUpperCase() + selectedDate.slice(1) : "Upload date"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Upload Date</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[
            { value: "hour", label: "Last hour" },
            { value: "today", label: "Today" },
            { value: "week", label: "This week" },
            { value: "month", label: "This month" },
            { value: "year", label: "This year" },
          ].map((date) => (
            <DropdownMenuItem
              key={date.value}
              onClick={() => {
                setSelectedDate(date.value)
                onFilterChange?.({ date: date.value })
              }}
              className={cn(selectedDate === date.value && "bg-accent")}
            >
              {date.label}
              {selectedDate === date.value && " ✓"}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Duration */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={cn(selectedDuration && "border-primary")}>
            <Clock className="mr-2 h-4 w-4" />
            {selectedDuration ? 
              (selectedDuration === "short" ? "< 4 min" : 
               selectedDuration === "medium" ? "4-20 min" : 
               "> 20 min") : "Duration"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Duration</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[
            { value: "short", label: "Under 4 minutes" },
            { value: "medium", label: "4-20 minutes" },
            { value: "long", label: "Over 20 minutes" },
          ].map((duration) => (
            <DropdownMenuItem
              key={duration.value}
              onClick={() => {
                setSelectedDuration(duration.value)
                onFilterChange?.({ duration: duration.value })
              }}
              className={cn(selectedDuration === duration.value && "bg-accent")}
            >
              {duration.label}
              {selectedDuration === duration.value && " ✓"}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort By */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={cn(selectedSort !== "relevance" && "border-primary")}>
            <TrendingUp className="mr-2 h-4 w-4" />
            {selectedSort === "relevance" ? "Sort by" : 
             selectedSort === "upload_date" ? "Upload date" :
             selectedSort === "view_count" ? "View count" : "Rating"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[
            { value: "relevance", label: "Relevance", icon: Star },
            { value: "upload_date", label: "Upload Date", icon: Calendar },
            { value: "view_count", label: "View Count", icon: Eye },
            { value: "rating", label: "Rating", icon: ThumbsUp },
          ].map((sort) => (
            <DropdownMenuItem
              key={sort.value}
              onClick={() => {
                setSelectedSort(sort.value)
                onFilterChange?.({ sort: sort.value })
              }}
              className={cn(selectedSort === sort.value && "bg-accent")}
            >
              <sort.icon className="mr-2 h-4 w-4" />
              {sort.label}
              {selectedSort === sort.value && " ✓"}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Features */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className={cn(Object.values(features).some(Boolean) && "border-primary")}
          >
            <Video className="mr-2 h-4 w-4" />
            Features
            {Object.values(features).filter(Boolean).length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                {Object.values(features).filter(Boolean).length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Features</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="p-2 space-y-2">
            {[
              { key: "live", label: "Live" },
              { key: "hd", label: "4K" },
              { key: "hdr", label: "HDR" },
              { key: "subtitles", label: "Subtitles/CC" },
              { key: "creative_commons", label: "Creative Commons" },
              { key: "360", label: "360°" },
              { key: "vr180", label: "VR180" },
              { key: "3d", label: "3D" },
              { key: "location", label: "Location" },
              { key: "purchased", label: "Purchased" },
            ].map((feature) => (
              <div key={feature.key} className="flex items-center space-x-2">
                <Checkbox
                  id={feature.key}
                  checked={features[feature.key as keyof typeof features]}
                  onCheckedChange={(checked) => {
                    const newFeatures = { ...features, [feature.key]: checked as boolean }
                    setFeatures(newFeatures)
                    onFilterChange?.({ features: newFeatures })
                  }}
                />
                <Label 
                  htmlFor={feature.key} 
                  className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {feature.label}
                </Label>
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear All */}
      {activeFiltersCount > 0 && (
        <>
          <Badge variant="secondary" className="h-8 px-3">
            {activeFiltersCount} active
          </Badge>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="mr-1 h-4 w-4" />
            Clear all
          </Button>
        </>
      )}
    </div>
  )
}
