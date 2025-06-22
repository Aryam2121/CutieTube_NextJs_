import { type NextRequest, NextResponse } from "next/server"
import { VideoService } from "@/lib/api/videos"
import { AnalyticsService } from "@/lib/api/analytics"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const video = await VideoService.getVideoById(params.id)

    // Track view event
    await AnalyticsService.trackEvent({
      video_id: params.id,
      event_type: "view",
    })

    // Increment view count
    await VideoService.incrementViews(params.id)

    return NextResponse.json(video)
  } catch (error) {
    console.error("Error fetching video:", error)
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const video = await VideoService.updateVideo(params.id, body)
    return NextResponse.json(video)
  } catch (error) {
    console.error("Error updating video:", error)
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await VideoService.deleteVideo(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting video:", error)
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 })
  }
}
