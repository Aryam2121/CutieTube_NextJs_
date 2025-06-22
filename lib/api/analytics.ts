import { supabaseAdmin } from "@/lib/database"

export class AnalyticsService {
  /**
   * Low-level method to track a specific event
   */
  static async trackEvent(data: {
    video_id?: string
    user_id?: string
    event_type: "view" | "like" | "share" | "comment" | "watch_time" | "click"
    watch_duration?: number
    device_type?: string
    browser?: string
    country_code?: string
    referrer?: string
    timestamp?: string
  }) {
    const { error } = await supabaseAdmin.from("video_analytics").insert({
      ...data,
      timestamp: data.timestamp || new Date().toISOString(),
    })

    if (error) {
      console.error("Failed to track event:", error.message)
    }
  }

  /**
   * High-level wrapper to track an event using track("view", {...})
   */
  static async track(
    event_type: "view" | "like" | "share" | "comment" | "watch_time" | "click",
    properties: {
      video_id?: string
      user_id?: string
      watch_duration?: number
      device_type?: string
      browser?: string
      country_code?: string
      referrer?: string
      timestamp?: string
    }
  ) {
    await this.trackEvent({
      event_type,
      ...properties,
    })
  }

  /**
   * Record a view event for a video
   */
  static async recordVideoView(videoId: string, meta?: {
    user_id?: string
    device_type?: string
    browser?: string
    country_code?: string
    referrer?: string
  }) {
    const { error } = await supabaseAdmin.from("video_analytics").insert({
      video_id: videoId,
      event_type: "view",
      timestamp: new Date().toISOString(),
      ...meta,
    })

    if (error) {
      console.error("Failed to record video view:", error.message)
      throw new Error("Failed to record video view")
    }
  }

  /**
   * Get total number of view events for a video
   */
  static async getVideoViews(videoId: string): Promise<number> {
    const { count, error } = await supabaseAdmin
      .from("video_analytics")
      .select("*", { count: "exact", head: true })
      .eq("video_id", videoId)
      .eq("event_type", "view")

    if (error) {
      console.error("Failed to fetch video views:", error.message)
      throw new Error("Failed to fetch video views")
    }

    return count || 0
  }

  /**
   * Get all analytics events for a video over a time period
   */
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

  /**
   * Get analytics across all videos of a channel/user over a time period
   */
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

  /**
   * Calculate trending videos based on views, likes, and age
   */
  static async updateTrendingVideos() {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const { data: videos, error } = await supabaseAdmin
      .from("videos")
      .select("id, views, likes, created_at")
      .eq("status", "published")
      .eq("visibility", "public")
      .gte("created_at", oneWeekAgo)

    if (error) {
      throw new Error(`Failed to fetch videos for trending calculation: ${error.message}`)
    }

    const trendingData = videos
      ?.map((video, index) => {
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
      await supabaseAdmin.from("trending_videos").delete().eq("period", "daily")

      const { error: insertError } = await supabaseAdmin.from("trending_videos").insert(trendingData)

      if (insertError) {
        throw new Error(`Failed to update trending videos: ${insertError.message}`)
      }
    }
  }
}
