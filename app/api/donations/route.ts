import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const channelId = searchParams.get("channelId")

    const supabase = supabaseServer

    let query = supabase
      .from("donations")
      .select("*")
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(50)

    if (channelId) {
      // Get donations for a specific channel
      const { data: profile } = await supabase.from("profiles").select("user_id").eq("id", channelId).single()

      if (profile) {
        query = query.eq("channel_user_id", profile.user_id)
      }
    } else {
      // Get user's received donations
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      query = query.eq("channel_user_id", user.id)
    }

    const { data: donations, error } = await query

    if (error) {
      console.error("Failed to fetch donations:", error)
      return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
    }

    return NextResponse.json({ donations })
  } catch (error) {
    console.error("Donations API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
