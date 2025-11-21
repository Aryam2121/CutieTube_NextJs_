"use client"

import {
  Home,
  Compass,
  PlaySquare,
  Clock,
  ThumbsUp,
  Download,
  History,
  Music,
  Film,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
  Settings,
  Flag,
  HelpCircle,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const sidebarSections = [
  {
    title: null,
    items: [
      { icon: Home, label: "Home", href: "/" },
      { icon: Compass, label: "Explore", href: "/explore" },
      { icon: PlaySquare, label: "Subscriptions", href: "/subscriptions" },
      { icon: Film, label: "Shorts", href: "/shorts" },
    ],
  },
  {
    title: "Library",
    items: [
      { icon: History, label: "History", href: "/history" },
      { icon: PlaySquare, label: "Your videos", href: "/your-videos" },
      { icon: Clock, label: "Watch later", href: "/watch-later" },
      { icon: ThumbsUp, label: "Liked videos", href: "/liked" },
      { icon: Download, label: "Downloads", href: "/downloads" },
    ],
  },
  {
    title: "Explore",
    items: [
      { icon: Music, label: "Music", href: "/music" },
      { icon: Film, label: "Movies", href: "/movies" },
      { icon: Gamepad2, label: "Gaming", href: "/gaming" },
      { icon: Newspaper, label: "News", href: "/news" },
      { icon: Trophy, label: "Sports", href: "/sports" },
      { icon: Lightbulb, label: "Learning", href: "/learning" },
      { icon: Shirt, label: "Fashion", href: "/fashion" },
    ],
  },
  {
    title: "More",
    items: [
      { icon: Settings, label: "Settings", href: "/settings" },
      { icon: Flag, label: "Report history", href: "/report" },
      { icon: HelpCircle, label: "Help", href: "/help" },
      { icon: MessageSquare, label: "Send feedback", href: "/feedback" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:block w-64 border-r bg-background">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4 space-y-4">
          <TooltipProvider>
            {sidebarSections.map((section, idx) => (
              <div key={idx}>
                {section.title && (
                  <h3 className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    {section.title}
                  </h3>
                )}
                <nav className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Tooltip key={item.href}>
                        <TooltipTrigger asChild>
                          <Link href={item.href} aria-label={item.label}>
                            <Button
                              variant={isActive ? "secondary" : "ghost"}
                              className={cn(
                                "w-full justify-start gap-3 h-10 transition-colors",
                                isActive && "font-semibold"
                              )}
                            >
                              <item.icon className="h-5 w-5" />
                              {item.label}
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">{item.label}</TooltipContent>
                      </Tooltip>
                    )
                  })}
                </nav>
                {idx !== sidebarSections.length - 1 && <Separator className="my-3" />}
              </div>
            ))}
          </TooltipProvider>
        </div>
      </ScrollArea>
    </aside>
  )
}
