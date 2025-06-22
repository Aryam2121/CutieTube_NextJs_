import { NextResponse } from "next/server"

import { VideoService } from "@/lib/api/videos"

export async function GET(req: Request) {
  try {
    const videos = await VideoService.getVideos()
    return NextResponse.json(videos)
  } catch (error) {
    console.log("[VIDEOS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
