import { type NextRequest, NextResponse } from "next/server"
import { VideoService } from "@/lib/api/videos"
import { AnalyticsService } from "@/lib/api/analytics"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const category = searchParams.get("category") || undefined
    const userId = searchParams.get("userId") || undefined
    const orderBy = (searchParams.get("orderBy") as "created_at" | "views" | "likes") || "created_at"
    const orderDirection = (searchParams.get("orderDirection") as "asc" | "desc") || "desc"

    const result = await VideoService.getVideos({
      limit,
      offset,
      category,
      userId,
      orderBy,
      orderDirection,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching videos:", error)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const video = await VideoService.createVideo(body)

    // Track video creation event
    await AnalyticsService.trackEvent({
      video_id: video.id,
      user_id: video.user_id,
      event_type: "click",
    })

    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    console.error("Error creating video:", error)
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 })
  }
}
