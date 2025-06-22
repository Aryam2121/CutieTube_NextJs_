import { VideoService } from "@/lib/api/videos"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const videoId = params.id

    if (!videoId) {
      return new NextResponse("Video ID is required", { status: 400 })
    }

    const video = await VideoService.getVideoById(videoId)

    if (!video) {
      return new NextResponse("Video not found", { status: 404 })
    }

    return NextResponse.json(video)
  } catch (error) {
    console.log("[VIDEO_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const videoId = params.id
    const values = await req.json()

    if (!videoId) {
      return new NextResponse("Video ID is required", { status: 400 })
    }

    const video = await VideoService.updateVideo(videoId, values)

    return NextResponse.json(video)
  } catch (error) {
    console.log("[VIDEO_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const videoId = params.id

    if (!videoId) {
      return new NextResponse("Video ID is required", { status: 400 })
    }

    await VideoService.deleteVideo(videoId)

    return new NextResponse("Video deleted", { status: 200 })
  } catch (error) {
    console.log("[VIDEO_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
