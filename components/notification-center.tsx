"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  Settings,
  Check,
  X,
  Video,
  Users,
  Heart,
  MessageCircle,
  UserPlus,
  Share2,
  TrendingUp,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface Notification {
  id: string
  type: "video" | "comment" | "like" | "subscribe" | "mention" | "milestone" | "live" | "post"
  title: string
  message: string
  thumbnail?: string
  avatar?: string
  channelName?: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "video",
    title: "New video from Tech Master",
    message: "Ultimate Guide to Next.js 15 - Everything You Need to Know!",
    thumbnail: "/placeholder.svg?text=Video",
    avatar: "/placeholder.svg?text=TM",
    channelName: "Tech Master",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    actionUrl: "/watch?v=123",
  },
  {
    id: "2",
    type: "live",
    title: "GamePro is live now!",
    message: "Playing the new RPG - Join the stream!",
    thumbnail: "/placeholder.svg?text=Live",
    avatar: "/placeholder.svg?text=GP",
    channelName: "GamePro",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    actionUrl: "/watch?v=live123",
  },
  {
    id: "3",
    type: "comment",
    title: "New comment on your video",
    message: "John Doe: This tutorial is amazing! Thanks for sharing.",
    avatar: "/placeholder.svg?text=JD",
    channelName: "John Doe",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    actionUrl: "/studio/comments",
  },
  {
    id: "4",
    type: "like",
    title: "Your video reached 10K likes!",
    message: "React Performance Tips - 2024 Edition",
    thumbnail: "/placeholder.svg?text=10K",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
    actionUrl: "/analytics",
  },
  {
    id: "5",
    type: "subscribe",
    title: "New subscriber",
    message: "Sarah Wilson subscribed to your channel",
    avatar: "/placeholder.svg?text=SW",
    channelName: "Sarah Wilson",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    read: true,
    actionUrl: "/subscribers",
  },
  {
    id: "6",
    type: "milestone",
    title: "Congratulations! 🎉",
    message: "You've reached 100K subscribers!",
    thumbnail: "/placeholder.svg?text=100K",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    actionUrl: "/channel",
  },
  {
    id: "7",
    type: "post",
    title: "New community post from Cooking Master",
    message: "What recipe should I make next? Vote in the poll!",
    avatar: "/placeholder.svg?text=CM",
    channelName: "Cooking Master",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    read: true,
    actionUrl: "/community/post123",
  },
]

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "video":
      return <Video className="h-4 w-4 text-blue-500" />
    case "live":
      return <Play className="h-4 w-4 text-red-500" />
    case "comment":
      return <MessageCircle className="h-4 w-4 text-green-500" />
    case "like":
      return <Heart className="h-4 w-4 text-pink-500" />
    case "subscribe":
      return <UserPlus className="h-4 w-4 text-purple-500" />
    case "mention":
      return <Users className="h-4 w-4 text-orange-500" />
    case "milestone":
      return <TrendingUp className="h-4 w-4 text-yellow-500" />
    case "post":
      return <Share2 className="h-4 w-4 text-cyan-500" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const allNotifications = notifications
  const unreadNotifications = notifications.filter((n) => !n.read)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="h-8 text-xs"
              >
                <Check className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="all" className="flex-1">
              All
              {notifications.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">
              Unread
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[500px]">
            <TabsContent value="all" className="mt-0">
              {allNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y">
                  {allNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "group relative p-4 hover:bg-muted/50 transition-colors cursor-pointer",
                        !notification.read && "bg-primary/5"
                      )}
                      onClick={() => {
                        markAsRead(notification.id)
                        if (notification.actionUrl) {
                          setOpen(false)
                          // Navigate to action URL
                        }
                      }}
                    >
                      <div className="flex gap-3">
                        {/* Avatar or Thumbnail */}
                        <div className="flex-shrink-0 relative">
                          {notification.avatar ? (
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={notification.avatar} />
                              <AvatarFallback>
                                {notification.channelName?.[0] || "?"}
                              </AvatarFallback>
                            </Avatar>
                          ) : notification.thumbnail ? (
                            <div className="h-10 w-16 bg-muted rounded overflow-hidden">
                              <img
                                src={notification.thumbnail}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                              {getNotificationIcon(notification.type)}
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0 flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(notification.id)
                              }}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Unread indicator */}
                        {!notification.read && (
                          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="unread" className="mt-0">
              {unreadNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Check className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y">
                  {unreadNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="group relative p-4 hover:bg-muted/50 transition-colors cursor-pointer bg-primary/5"
                      onClick={() => {
                        markAsRead(notification.id)
                        if (notification.actionUrl) {
                          setOpen(false)
                        }
                      }}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 relative">
                          {notification.avatar ? (
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={notification.avatar} />
                              <AvatarFallback>
                                {notification.channelName?.[0] || "?"}
                              </AvatarFallback>
                            </Avatar>
                          ) : notification.thumbnail ? (
                            <div className="h-10 w-16 bg-muted rounded overflow-hidden">
                              <img
                                src={notification.thumbnail}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                              {getNotificationIcon(notification.type)}
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </p>
                        </div>

                        <div className="flex-shrink-0 flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(notification.id)
                            }}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </ScrollArea>

          {notifications.length > 0 && (
            <>
              <Separator />
              <div className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={clearAll}
                >
                  Clear all notifications
                </Button>
              </div>
            </>
          )}
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
