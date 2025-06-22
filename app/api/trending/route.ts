import { type NextRequest, NextResponse } from "next/server"
import { VideoService } from "@/lib/api/videos"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = (searchParams.get("period") as "daily" | "weekly" | "monthly") || "daily"
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    const videos = await VideoService.getTrendingVideos(period, limit)
    return NextResponse.json(videos)
  } catch (error) {
    console.error("Error fetching trending videos:", error)
    return NextResponse.json({ error: "Failed to fetch trending videos" }, { status: 500 })
  }
}
