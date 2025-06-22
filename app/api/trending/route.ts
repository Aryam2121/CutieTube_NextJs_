import { NextResponse } from "next/server"
import { VideoService } from "@/lib/api/videos"

export async function GET(request: Request) {
  try {
    const videos = await VideoService.getTrendingVideos()
    return NextResponse.json(videos)
  } catch (error) {
    console.error("Error fetching trending videos:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
