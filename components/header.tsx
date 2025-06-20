"use client"

import type React from "react"

import { Search, Bell, Video, Menu, Mic, Sun, Moon, User, LogOut, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth-provider"
import { AuthDialog } from "@/components/auth-dialog"
import { UploadDialog } from "@/components/upload-dialog"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { user, signOut } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
              </div>
              <span className="font-bold text-xl hidden sm:block">CutieTube</span>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="flex-1 relative">
                <Input
                  placeholder="Search videos, channels, playlists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-l-full border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
                />
              </div>
              <Button type="submit" className="rounded-r-full rounded-l-none border-l-0 h-10 px-6">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="ml-2 rounded-full">
                <Mic className="h-4 w-4" />
              </Button>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {user ? (
              <>
                <Button variant="ghost" size="icon" onClick={() => setShowUploadDialog(true)}>
                  <Upload className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback>{user.user_metadata?.username?.[0] || user.email?.[0]}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/playlists">
                        <Video className="mr-2 h-4 w-4" />
                        My Playlists
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button onClick={() => setShowAuthDialog(true)}>Sign In</Button>
            )}
          </div>
        </div>
      </header>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
      <UploadDialog open={showUploadDialog} onOpenChange={setShowUploadDialog} />
    </>
  )
}
