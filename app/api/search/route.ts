import { type NextRequest, NextResponse } from "next/server"
import { VideoService } from "@/lib/api/videos"
import { UserService } from "@/lib/api/users"
import { supabaseAdmin } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const type = searchParams.get("type") || "videos"
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const category = searchParams.get("category") || undefined

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    // Save search query to history
    const userId = searchParams.get("userId")
    if (userId) {
      await supabaseAdmin.from("search_history").insert({
        user_id: userId,
        query,
      })
    }

    let results: any = []

    switch (type) {
      case "videos":
        results = await VideoService.searchVideos(query, { limit, offset, category })
        break
      case "channels":
        results = await UserService.searchUsers(query, limit)
        break
      case "all":
        const [videos, channels] = await Promise.all([
          VideoService.searchVideos(query, { limit: 10, offset, category }),
          UserService.searchUsers(query, 10),
        ])
        results = { videos, channels }
        break
      default:
        results = await VideoService.searchVideos(query, { limit, offset, category })
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching:", error)
    return NextResponse.json({ error: "Failed to search" }, { status: 500 })
  }
}
