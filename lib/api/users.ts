import { supabaseAdmin } from "@/lib/database"
import type { Database } from "@/lib/database"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"]
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"]

export class UserService {
  static async getProfile(userId: string) {
    const { data, error } = await supabaseAdmin.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      throw new Error(`Failed to fetch profile: ${error.message}`)
    }

    return data
  }

  static async createProfile(profile: ProfileInsert) {
    const { data, error } = await supabaseAdmin.from("profiles").insert(profile).select().single()

    if (error) {
      throw new Error(`Failed to create profile: ${error.message}`)
    }

    return data
  }

  static async updateProfile(userId: string, updates: ProfileUpdate) {
    const { data, error } = await supabaseAdmin.from("profiles").update(updates).eq("id", userId).select().single()

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`)
    }

    return data
  }

  static async searchUsers(query: string, limit = 20) {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
      .order("subscriber_count", { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to search users: ${error.message}`)
    }

    return data || []
  }

  static async getSubscriptions(userId: string) {
    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .select(`
        *,
        profiles!subscriptions_channel_id_fkey (
          username,
          avatar_url,
          subscriber_count,
          is_verified
        )
      `)
      .eq("subscriber_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch subscriptions: ${error.message}`)
    }

    return data || []
  }

  static async subscribe(subscriberId: string, channelId: string) {
    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .insert({
        subscriber_id: subscriberId,
        channel_id: channelId,
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to subscribe: ${error.message}`)
    }

    return data
  }

  static async unsubscribe(subscriberId: string, channelId: string) {
    const { error } = await supabaseAdmin
      .from("subscriptions")
      .delete()
      .eq("subscriber_id", subscriberId)
      .eq("channel_id", channelId)

    if (error) {
      throw new Error(`Failed to unsubscribe: ${error.message}`)
    }
  }

  static async isSubscribed(subscriberId: string, channelId: string) {
    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .select("id")
      .eq("subscriber_id", subscriberId)
      .eq("channel_id", channelId)
      .single()

    if (error && error.code !== "PGRST116") {
      throw new Error(`Failed to check subscription: ${error.message}`)
    }

    return !!data
  }
}
