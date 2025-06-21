"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoCard } from "@/components/video-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, BellOff, Users, Video, Calendar, TrendingUp } from "lucide-react"

const subscriptions = [
  {
    id: "1",
    name: "TechReviewer",
    avatar: "/placeholder.svg?height=40&width=40",
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
    avatar: "/placeholder.svg?height=40&width=40",
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
    avatar: "/placeholder.svg?height=40&width=40",
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
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "18:45",
    views: 850000,
    created_at: "2024-01-15T10:00:00Z",
    profiles: { username: "TechReviewer", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
  {
    id: "2",
    title: "Perfect Homemade Pizza - Step by Step",
    thumbnail_url: "/placeholder.svg?height=180&width=320",
    duration: "12:30",
    views: 420000,
    created_at: "2024-01-14T15:30:00Z",
    profiles: { username: "CookingMaster", avatar_url: "/placeholder.svg?height=40&width=40" },
  },
]

export function SubscriptionsPage() {
  const [notificationStates, setNotificationStates] = useState<Record<string, boolean>>(
    subscriptions.reduce((acc, sub) => ({ ...acc, [sub.id]: sub.isNotificationOn }), {}),
  )

  const toggleNotification = (id: string) => {
    setNotificationStates((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subscriptions</h1>
          <p className="text-muted-foreground">Stay updated with your favorite creators</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Users className="h-3 w-3" />
            {subscriptions.length} subscriptions
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="latest" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="latest">
            <Video className="mr-2 h-4 w-4" />
            Latest
          </TabsTrigger>
          <TabsTrigger value="channels">
            <Users className="mr-2 h-4 w-4" />
            Channels
          </TabsTrigger>
          <TabsTrigger value="activity">
            <TrendingUp className="mr-2 h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="latest" className="space-y-6">
          {/* Quick Access to Subscribed Channels */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Channels</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {subscriptions.map((channel) => (
                <div key={channel.id} className="flex-shrink-0 text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-2">
                    <AvatarImage src={channel.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{channel.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium truncate w-20">{channel.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Videos */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Latest Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <div className="grid gap-4">
            {subscriptions.map((channel) => (
              <Card key={channel.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={channel.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{channel.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{channel.name}</h3>
                        <p className="text-sm text-muted-foreground">{channel.subscribers} subscribers</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Latest: {channel.latestVideo.title} • {channel.latestVideo.views.toLocaleString()} views •{" "}
                          {channel.latestVideo.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleNotification(channel.id)}
                        className={notificationStates[channel.id] ? "text-blue-600" : "text-muted-foreground"}
                      >
                        {notificationStates[channel.id] ? (
                          <Bell className="h-4 w-4" />
                        ) : (
                          <BellOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline">View Channel</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { action: "TechReviewer uploaded a new video", time: "2 hours ago", type: "upload" },
                  { action: "CookingMaster went live", time: "1 day ago", type: "live" },
                  { action: "FitnessGuru posted a community update", time: "2 days ago", type: "post" },
                  { action: "TechReviewer uploaded a new video", time: "3 days ago", type: "upload" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
