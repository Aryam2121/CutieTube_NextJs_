import { supabaseAdmin } from "@/lib/database"

export class AnalyticsService {
  static async trackEvent(data: {
    video_id?: string
    user_id?: string
    event_type: "view" | "like" | "share" | "comment" | "watch_time" | "click"
    watch_duration?: number
    device_type?: string
    browser?: string
    country_code?: string
    referrer?: string
  }) {
    const { error } = await supabaseAdmin.from("video_analytics").insert(data)

    if (error) {
      console.error("Failed to track event:", error.message)
    }
  }

  static async getVideoAnalytics(videoId: string, period: "day" | "week" | "month" = "week") {
    const startDate = new Date()
    switch (period) {
      case "day":
        startDate.setDate(startDate.getDate() - 1)
        break
      case "week":
        startDate.setDate(startDate.getDate() - 7)
        break
      case "month":
        startDate.setMonth(startDate.getMonth() - 1)
        break
    }

    const { data, error } = await supabaseAdmin
      .from("video_analytics")
      .select("*")
      .eq("video_id", videoId)
      .gte("timestamp", startDate.toISOString())
      .order("timestamp", { ascending: true })

    if (error) {
      throw new Error(`Failed to fetch analytics: ${error.message}`)
    }

    return data || []
  }

  static async getChannelAnalytics(userId: string, period: "day" | "week" | "month" = "week") {
    const startDate = new Date()
    switch (period) {
      case "day":
        startDate.setDate(startDate.getDate() - 1)
        break
      case "week":
        startDate.setDate(startDate.getDate() - 7)
        break
      case "month":
        startDate.setMonth(startDate.getMonth() - 1)
        break
    }

    const { data, error } = await supabaseAdmin
      .from("video_analytics")
      .select(`
        *,
        videos!inner (user_id)
      `)
      .eq("videos.user_id", userId)
      .gte("timestamp", startDate.toISOString())
      .order("timestamp", { ascending: true })

    if (error) {
      throw new Error(`Failed to fetch channel analytics: ${error.message}`)
    }

    return data || []
  }

  static async updateTrendingVideos() {
    // Calculate trending scores for all videos
    const { data: videos, error } = await supabaseAdmin
      .from("videos")
      .select("id, views, likes, created_at")
      .eq("status", "published")
      .eq("visibility", "public")
      .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()) // Last 7 days

    if (error) {
      throw new Error(`Failed to fetch videos for trending calculation: ${error.message}`)
    }

    const trendingData = videos
      ?.map((video, index) => {
        // Simple trending score calculation
        const hoursOld = (Date.now() - new Date(video.created_at).getTime()) / (1000 * 60 * 60)
        const score = (video.views * 0.6 + video.likes * 10) / Math.max(hoursOld, 1)

        return {
          video_id: video.id,
          score,
          rank: index + 1,
          period: "daily" as const,
          category: null,
        }
      })
      .sort((a, b) => b.score - a.score)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }))

    if (trendingData && trendingData.length > 0) {
      // Clear existing trending data
      await supabaseAdmin.from("trending_videos").delete().eq("period", "daily")

      // Insert new trending data
      const { error: insertError } = await supabaseAdmin.from("trending_videos").insert(trendingData)

      if (insertError) {
        throw new Error(`Failed to update trending videos: ${insertError.message}`)
      }
    }
  }
}
