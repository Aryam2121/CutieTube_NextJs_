import { type NextRequest, NextResponse } from "next/server"
import { VideoService } from "@/lib/api/videos"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const video = await VideoService.getVideoById(params.id)

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    return NextResponse.json(video)
  } catch (error) {
    console.error("Error fetching video:", error)
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const body = await request.json()
    const video = await VideoService.updateVideo(params.id, body)
    return NextResponse.json(video)
  } catch (error) {
    console.error("Error updating video:", error)
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    await VideoService.deleteVideo(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting video:", error)
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 })
  }
}
