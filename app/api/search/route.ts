import { NextResponse } from "next/server"
import { VideoService } from "@/lib/api/videos"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 })
  }

  try {
    const videos = await VideoService.searchVideos(query)
    return NextResponse.json(videos)
  } catch (error) {
    console.error("Error searching videos:", error)
    return NextResponse.json({ error: "Failed to search videos" }, { status: 500 })
  }
}
