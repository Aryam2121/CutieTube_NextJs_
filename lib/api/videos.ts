import { supabaseAdmin } from "@/lib/database"
import type { Database } from "@/lib/database"

type Video = Database["public"]["Tables"]["videos"]["Row"]
type VideoInsert = Database["public"]["Tables"]["videos"]["Insert"]
type VideoUpdate = Database["public"]["Tables"]["videos"]["Update"]

export class VideoService {
  static async getVideos(
    options: {
      limit?: number
      offset?: number
      category?: string
      userId?: string
      status?: string
      visibility?: string
      orderBy?: "created_at" | "views" | "likes"
      orderDirection?: "asc" | "desc"
    } = {},
  ) {
    const {
      limit = 20,
      offset = 0,
      category,
      userId,
      status = "published",
      visibility = "public",
      orderBy = "created_at",
      orderDirection = "desc",
    } = options

    let query = supabaseAdmin
      .from("videos")
      .select(`
        *,
        profiles (
          username,
          avatar_url,
          is_verified
        )
      `)
      .eq("status", status)
      .eq("visibility", visibility)
      .order(orderBy, { ascending: orderDirection === "asc" })
      .range(offset, offset + limit - 1)

    if (category) {
      query = query.eq("category", category)
    }

    if (userId) {
      query = query.eq("user_id", userId)
    }

    const { data, error, count } = await query

    if (error) {
      throw new Error(`Failed to fetch videos: ${error.message}`)
    }

    return { videos: data || [], total: count || 0 }
  }

  static async getVideoById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("videos")
      .select(`
        *,
        profiles (
          username,
          avatar_url,
          is_verified,
          subscriber_count
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      throw new Error(`Failed to fetch video: ${error.message}`)
    }

    return data
  }

  static async createVideo(video: VideoInsert) {
    const { data, error } = await supabaseAdmin.from("videos").insert(video).select().single()

    if (error) {
      throw new Error(`Failed to create video: ${error.message}`)
    }

    return data
  }

  static async updateVideo(id: string, updates: VideoUpdate) {
    const { data, error } = await supabaseAdmin.from("videos").update(updates).eq("id", id).select().single()

    if (error) {
      throw new Error(`Failed to update video: ${error.message}`)
    }

    return data
  }

  static async deleteVideo(id: string) {
    const { error } = await supabaseAdmin.from("videos").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete video: ${error.message}`)
    }
  }

  static async incrementViews(videoId: string) {
    // Fetch current views
    const { data, error: fetchError } = await supabaseAdmin
      .from("videos")
      .select("views")
      .eq("id", videoId)
      .single()

    if (fetchError) {
      throw new Error(`Failed to fetch current views: ${fetchError.message}`)
    }

    const currentViews = data?.views ?? 0

    const { error: updateError } = await supabaseAdmin
      .from("videos")
      .update({ views: currentViews + 1 })
      .eq("id", videoId)

    if (updateError) {
      throw new Error(`Failed to increment views: ${updateError.message}`)
    }
  }

  static async searchVideos(
    query: string,
    options: {
      limit?: number
      offset?: number
      category?: string
    } = {},
  ) {
    const { limit = 20, offset = 0, category } = options

    let searchQuery = supabaseAdmin
      .from("videos")
      .select(`
        *,
        profiles (
          username,
          avatar_url,
          is_verified
        )
      `)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .eq("status", "published")
      .eq("visibility", "public")
      .order("views", { ascending: false })
      .range(offset, offset + limit - 1)

    if (category) {
      searchQuery = searchQuery.eq("category", category)
    }

    const { data, error } = await searchQuery

    if (error) {
      throw new Error(`Failed to search videos: ${error.message}`)
    }

    return data || []
  }

  static async getTrendingVideos(period: "daily" | "weekly" | "monthly" = "daily", limit = 20) {
    const { data, error } = await supabaseAdmin
      .from("trending_videos")
      .select(`
        video_id,
        score,
        rank,
        videos (
          *,
          profiles (
            username,
            avatar_url,
            is_verified
          )
        )
      `)
      .eq("period", period)
      .order("rank", { ascending: true })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to fetch trending videos: ${error.message}`)
    }

    return data?.map((item) => item.videos).filter(Boolean) || []
  }

  static async getRecommendedVideos(userId?: string, limit = 20) {
    // Simple recommendation based on user's watch history and popular videos
    if (userId) {
      // Get user's watched categories
      const { data: watchHistory } = await supabaseAdmin
        .from("watch_history")
        .select(`
          videos (category)
        `)
        .eq("user_id", userId)
        .limit(50)

      const categories = watchHistory?.map((item) => item.videos && (item.videos as { category?: any }).category).filter(Boolean) || []

      if (categories.length > 0) {
        const { data, error } = await supabaseAdmin
          .from("videos")
          .select(`
            *,
            profiles (
              username,
              avatar_url,
              is_verified
            )
          `)
          .in("category", categories)
          .eq("status", "published")
          .eq("visibility", "public")
          .order("views", { ascending: false })
          .limit(limit)

        if (!error && data) {
          return data
        }
      }
    }

    // Fallback to popular videos
    return this.getVideos({ limit, orderBy: "views" }).then((result) => result.videos)
  }
}
