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

const mainItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Compass, label: "Explore", href: "/explore" },
  { icon: PlaySquare, label: "Subscriptions", href: "/subscriptions" },
]

const libraryItems = [
  { icon: History, label: "History", href: "/history" },
  { icon: PlaySquare, label: "Your videos", href: "/your-videos" },
  { icon: Clock, label: "Watch later", href: "/watch-later" },
  { icon: ThumbsUp, label: "Liked videos", href: "/liked" },
  { icon: Download, label: "Downloads", href: "/downloads" },
]

const exploreItems = [
  { icon: Music, label: "Music", href: "/music" },
  { icon: Film, label: "Movies", href: "/movies" },
  { icon: Gamepad2, label: "Gaming", href: "/gaming" },
  { icon: Newspaper, label: "News", href: "/news" },
  { icon: Trophy, label: "Sports", href: "/sports" },
  { icon: Lightbulb, label: "Learning", href: "/learning" },
  { icon: Shirt, label: "Fashion", href: "/fashion" },
]

const moreItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: Flag, label: "Report history", href: "/report" },
  { icon: HelpCircle, label: "Help", href: "/help" },
  { icon: MessageSquare, label: "Send feedback", href: "/feedback" },
]

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 border-r bg-background">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4 space-y-4">
          <nav className="space-y-1">
            {mainItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <Separator />

          <div>
            <h3 className="px-3 py-2 text-sm font-medium text-muted-foreground">Library</h3>
            <nav className="space-y-1">
              {libraryItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <Separator />

          <div>
            <h3 className="px-3 py-2 text-sm font-medium text-muted-foreground">Explore</h3>
            <nav className="space-y-1">
              {exploreItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <Separator />

          <nav className="space-y-1">
            {moreItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </aside>
  )
}
