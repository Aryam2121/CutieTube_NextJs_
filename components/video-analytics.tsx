"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Clock, Users, ThumbsUp, MessageSquare, DollarSign } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { useAuth } from "@/components/auth-provider"
import { getSupabaseClient } from "@/lib/supabase"

const viewsData = [
  { date: "2024-01-01", views: 1200, watchTime: 2400, subscribers: 50 },
  { date: "2024-01-02", views: 1800, watchTime: 3200, subscribers: 75 },
  { date: "2024-01-03", views: 2400, watchTime: 4100, subscribers: 120 },
  { date: "2024-01-04", views: 2200, watchTime: 3800, subscribers: 140 },
  { date: "2024-01-05", views: 3200, watchTime: 5200, subscribers: 180 },
  { date: "2024-01-06", views: 2800, watchTime: 4600, subscribers: 220 },
  { date: "2024-01-07", views: 3600, watchTime: 6200, subscribers: 280 },
]

const deviceData = [
  { name: "Mobile", value: 65, color: "#8884d8" },
  { name: "Desktop", value: 30, color: "#82ca9d" },
  { name: "Tablet", value: 5, color: "#ffc658" },
]

const demographicsData = [
  { age: "13-17", male: 15, female: 12 },
  { age: "18-24", male: 28, female: 25 },
  { age: "25-34", male: 22, female: 20 },
  { age: "35-44", male: 12, female: 15 },
  { age: "45-54", male: 8, female: 10 },
  { age: "55+", male: 5, female: 8 },
]

const topVideos = [
  {
    id: 1,
    title: "Building a Modern YouTube Clone",
    views: 125000,
    likes: 5200,
    comments: 380,
    watchTime: 12.5,
    revenue: 245.5,
    thumbnail: "/placeholder.svg?height=90&width=160",
  },
  {
    id: 2,
    title: "React Hooks Complete Guide",
    views: 98000,
    likes: 4100,
    comments: 290,
    watchTime: 8.2,
    revenue: 180.25,
    thumbnail: "/placeholder.svg?height=90&width=160",
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox",
    views: 76000,
    likes: 3200,
    comments: 220,
    watchTime: 6.8,
    revenue: 142.75,
    thumbnail: "/placeholder.svg?height=90&width=160",
  },
]

export function VideoAnalytics() {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState("7d")
  const [totalViews, setTotalViews] = useState(0)
  const [totalWatchTime, setTotalWatchTime] = useState(0)
  const [totalSubscribers, setTotalSubscribers] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const supabase = getSupabaseClient()

  useEffect(() => {
    // Calculate totals from mock data
    const views = viewsData.reduce((sum, day) => sum + day.views, 0)
    const watchTime = viewsData.reduce((sum, day) => sum + day.watchTime, 0)
    const subscribers = viewsData[viewsData.length - 1]?.subscribers || 0
    const revenue = topVideos.reduce((sum, video) => sum + video.revenue, 0)

    setTotalViews(views)
    setTotalWatchTime(watchTime)
    setTotalSubscribers(subscribers)
    setTotalRevenue(revenue)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatWatchTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalViews)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatWatchTime(totalWatchTime)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalSubscribers)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+24.1%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.8%</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Views Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="views" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Watch Time & Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="watchTime" stroke="#82ca9d" name="Watch Time (min)" />
                    <Line type="monotone" dataKey="subscribers" stroke="#ffc658" name="Subscribers" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Device Types</CardTitle>
                <CardDescription>How your audience watches your content</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
                <CardDescription>Age and gender breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={demographicsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="male" fill="#8884d8" name="Male" />
                    <Bar dataKey="female" fill="#82ca9d" name="Female" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Videos</CardTitle>
              <CardDescription>Your most successful content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topVideos.map((video, index) => (
                  <div key={video.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="text-lg font-bold text-muted-foreground w-8">#{index + 1}</div>
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{video.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {formatNumber(video.views)}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {formatNumber(video.likes)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {video.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {video.watchTime}h avg
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${video.revenue}</div>
                      <div className="text-sm text-muted-foreground">Revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Ad Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$486.23</div>
                <p className="text-xs text-muted-foreground">+18.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Channel Memberships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$124.50</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Super Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$89.75</div>
                <p className="text-xs text-muted-foreground">+25.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#8884d8" name="Revenue ($)" dot={{ fill: "#8884d8" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
