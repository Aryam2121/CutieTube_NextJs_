"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoCard } from "@/components/video-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, BellOff, Users, Video, Calendar, TrendingUp } from "lucide-react"
import { toast } from "react-hot-toast"

const subscriptions = [
  {
    id: "1",
    name: "TechReviewer",
    avatar: "/placeholder.svg",
    subscribers: "2.5M",
    isNotificationOn: true,
    latestVideo: {
      title: "iPhone 15 Pro Max Review - Is It Worth It?",
      views: 850000,
      uploadedAt: "2 hours ago",
    },
  },
  {
    id: "2",
    name: "CookingMaster",
    avatar: "/placeholder.svg",
    subscribers: "1.8M",
    isNotificationOn: false,
    latestVideo: {
      title: "Perfect Homemade Pizza Recipe",
      views: 420000,
      uploadedAt: "1 day ago",
    },
  },
  {
    id: "3",
    name: "FitnessGuru",
    avatar: "/placeholder.svg",
    subscribers: "3.2M",
    isNotificationOn: true,
    latestVideo: {
      title: "30-Day Transformation Challenge",
      views: 1200000,
      uploadedAt: "3 days ago",
    },
  },
]

const recentVideos = [
  {
    id: "1",
    title: "iPhone 15 Pro Max Review - Complete Analysis",
    thumbnail_url: "/placeholder.svg",
    duration: "18:45",
    views: 850000,
    created_at: "2024-01-15T10:00:00Z",
    profiles: { username: "TechReviewer", avatar_url: "/placeholder.svg" },
  },
  {
    id: "2",
    title: "Perfect Homemade Pizza - Step by Step",
    thumbnail_url: "/placeholder.svg",
    duration: "12:30",
    views: 420000,
    created_at: "2024-01-14T15:30:00Z",
    profiles: { username: "CookingMaster", avatar_url: "/placeholder.svg" },
  },
]

export function SubscriptionsPage() {
  const [notificationStates, setNotificationStates] = useState<Record<string, boolean>>(
    subscriptions.reduce((acc, sub) => ({ ...acc, [sub.id]: sub.isNotificationOn }), {})
  )

  const toggleNotification = (id: string, name: string) => {
    setNotificationStates((prev) => {
      const newState = { ...prev, [id]: !prev[id] }
      toast.success(`${newState[id] ? "Subscribed to" : "Unsubscribed from"} ${name}`)
      return newState
    })
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subscriptions</h1>
          <p className="text-muted-foreground">Get the latest from your favorite creators</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          {subscriptions.length} Subscriptions
        </Badge>
      </div>

      <Tabs defaultValue="latest" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[420px]">
          <TabsTrigger value="latest"><Video className="mr-2 h-4 w-4" /> Latest</TabsTrigger>
          <TabsTrigger value="channels"><Users className="mr-2 h-4 w-4" /> Channels</TabsTrigger>
          <TabsTrigger value="activity"><TrendingUp className="mr-2 h-4 w-4" /> Activity</TabsTrigger>
        </TabsList>

        {/* === LATEST === */}
        <TabsContent value="latest" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Channels</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {subscriptions.map((channel) => (
                <div
                  key={channel.id}
                  className="flex-shrink-0 w-20 text-center transition hover:scale-105 hover:shadow-md"
                >
                  <Avatar className="w-16 h-16 mx-auto mb-2">
                    <AvatarImage src={channel.avatar} alt={channel.name} />
                    <AvatarFallback>{channel.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium truncate">{channel.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Latest Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* === CHANNELS === */}
        <TabsContent value="channels" className="space-y-6">
          <div className="grid gap-4">
            {subscriptions.map((channel) => (
              <Card key={channel.id} className="hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={channel.avatar} />
                        <AvatarFallback>{channel.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{channel.name}</h3>
                        <p className="text-sm text-muted-foreground">{channel.subscribers} subscribers</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {channel.latestVideo.title} • {channel.latestVideo.views.toLocaleString()} views •{" "}
                          {channel.latestVideo.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleNotification(channel.id, channel.name)}
                        className={notificationStates[channel.id] ? "text-blue-600" : "text-muted-foreground"}
                      >
                        {notificationStates[channel.id] ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline">View Channel</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* === ACTIVITY === */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { action: "TechReviewer uploaded a new video", time: "2 hours ago", type: "upload" },
                { action: "CookingMaster went live", time: "1 day ago", type: "live" },
                { action: "FitnessGuru posted a community update", time: "2 days ago", type: "post" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "upload"
                        ? "bg-green-500"
                        : activity.type === "live"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
