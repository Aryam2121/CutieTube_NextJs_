import { type NextRequest, NextResponse } from "next/server"
import { VideoService } from "@/lib/api/videos"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const category = searchParams.get("category")
    const userId = searchParams.get("userId")

    const offset = (page - 1) * limit
    const videos = await VideoService.getVideos({
      offset,
      limit,
      category: category || undefined,
      userId: userId || undefined,
    })

    return NextResponse.json(videos)
  } catch (error) {
    console.error("Error fetching videos:", error)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const video = await VideoService.createVideo(body)
    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    console.error("Error creating video:", error)
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 })
  }
}
